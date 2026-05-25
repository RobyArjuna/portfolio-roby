import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { detectLanguage, looksLikePromptInjection, sanitizeMessage } from '../utils/sanitizeInput';
import { streamPortfolioAnswer } from '../services/portfolioChatService';
import { aiDebugLog } from '../utils/debug';

const STORAGE_KEY = 'roby-ai-chat-session';
const FALLBACK_ID = 'Maaf, informasi tersebut belum tersedia di data CV saya.';
const FALLBACK_EN = 'Sorry, that information is not available in my current CV data.';

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function createSessionId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return createId('session');
}

function createWelcomeMessage() {
  return {
    id: 'welcome',
    role: 'assistant',
    content:
      "Hi, I'm Roby's AI assistant. Ask me about Roby's experience, skills, projects, or professional background.",
    createdAt: new Date().toISOString(),
  };
}

function loadStoredSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.sessionId || !Array.isArray(parsed.messages)) return null;
    return {
      ...parsed,
      messages: parsed.messages.filter((message) => {
        if (message.pending) return false;
        if (message.role === 'assistant' && !sanitizeMessage(message.content)) return false;
        return true;
      }),
    };
  } catch {
    return null;
  }
}

export function useAiChat() {
  const storedSession = useMemo(loadStoredSession, []);
  const [sessionId] = useState(storedSession?.sessionId || createSessionId);
  const [messages, setMessages] = useState(storedSession?.messages || [createWelcomeMessage()]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState('');
  const abortRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        sessionId,
        messages: messages.slice(-20),
      }),
    );
  }, [messages, sessionId]);

  const clearChat = useCallback(() => {
    abortRef.current?.abort();
    setMessages([createWelcomeMessage()]);
    setError('');
  }, []);

  const sendMessage = useCallback(
    async (rawMessage) => {
      const cleanMessage = sanitizeMessage(rawMessage);
      if (!cleanMessage || isStreaming) return;

      const language = detectLanguage(cleanMessage);
      const fallback = language === 'id' ? FALLBACK_ID : FALLBACK_EN;

      aiDebugLog('chat:send', {
        sessionId,
        language,
        messageLength: cleanMessage.length,
        existingMessages: messages.length,
      });

      if (looksLikePromptInjection(cleanMessage)) {
        setMessages((current) => [
          ...current,
          {
            id: createId('user'),
            role: 'user',
            content: cleanMessage,
            createdAt: new Date().toISOString(),
          },
          {
            id: createId('assistant'),
            role: 'assistant',
            content: fallback,
            createdAt: new Date().toISOString(),
          },
        ]);
        return;
      }

      const userMessage = {
        id: createId('user'),
        role: 'user',
        content: cleanMessage,
        createdAt: new Date().toISOString(),
      };
      const assistantMessage = {
        id: createId('assistant'),
        role: 'assistant',
        content: '',
        pending: true,
        createdAt: new Date().toISOString(),
      };

      setMessages((current) => [...current, userMessage, assistantMessage]);
      setError('');
      setIsStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        await streamPortfolioAnswer({
          message: cleanMessage,
          messages: [...messages, userMessage],
          sessionId,
          language,
          signal: controller.signal,
          onChunk: (chunk) => {
            if (chunk.type === 'delta') {
              setMessages((current) =>
                current.map((item) =>
                  item.id === assistantMessage.id
                    ? { ...item, pending: false, content: `${item.content}${chunk.text || ''}` }
                    : item,
                ),
              );
            }

            if (chunk.type === 'done') {
              aiDebugLog('chat:done', {
                requestId: chunk.requestId,
                contextCount: chunk.contextCount,
              });
              setMessages((current) =>
                current.map((item) =>
                  item.id === assistantMessage.id
                    ? {
                        ...item,
                        pending: false,
                        content: sanitizeMessage(item.content) ? item.content : fallback,
                      }
                    : item,
                ),
              );
            }

            if (chunk.type === 'error') {
              aiDebugLog('chat:error-chunk', {
                requestId: chunk.requestId,
                message: chunk.message,
              });
              setError(chunk.message || 'The AI assistant is unavailable.');
              setMessages((current) =>
                current.map((item) =>
                  item.id === assistantMessage.id
                    ? { ...item, pending: false, content: chunk.message || fallback, error: chunk.message }
                    : item,
                ),
              );
            }
          },
        });
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          aiDebugLog('chat:request-error', {
            name: requestError.name,
            message: requestError.message,
          });
          const message = requestError.message || fallback;
          setError(message);
          setMessages((current) =>
            current.map((item) =>
              item.id === assistantMessage.id
                ? { ...item, pending: false, content: message || fallback, error: message }
                : item,
            ),
          );
        }
      } finally {
        setMessages((current) =>
          current.map((item) =>
            item.id === assistantMessage.id && item.pending
              ? {
                  ...item,
                  pending: false,
                  content: sanitizeMessage(item.content) ? item.content : fallback,
                }
              : item,
          ),
        );
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [isStreaming, messages, sessionId],
  );

  const stopStreaming = useCallback(() => {
    abortRef.current?.abort();
    setIsStreaming(false);
  }, []);

  return {
    clearChat,
    error,
    isStreaming,
    messages,
    sendMessage,
    sessionId,
    stopStreaming,
  };
}
