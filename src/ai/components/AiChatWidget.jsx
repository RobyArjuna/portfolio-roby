import React, { useEffect, useRef, useState } from 'react';
import { HiPaperAirplane, HiSparkles, HiStop, HiTrash, HiX } from 'react-icons/hi';
import { useAiChat } from '../hooks/useAiChat';
import { MAX_MESSAGE_LENGTH, sanitizeMessage } from '../utils/sanitizeInput';
import ChatMessage from './ChatMessage';
import SuggestedQuestions from './SuggestedQuestions';

const AiChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const { clearChat, error, isStreaming, messages, sendMessage, stopStreaming } = useAiChat();

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      window.setTimeout(() => inputRef.current?.focus(), 180);
    }
  }, [isOpen]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const clean = sanitizeMessage(input);
    if (!clean) return;
    setInput('');
    await sendMessage(clean);
  };

  const handleSuggestedQuestion = async (question) => {
    setInput('');
    await sendMessage(question);
  };

  return (
    <>
      {/* Floating Chat Panel — bottom right */}
      <div
        className={`fixed bottom-[84px] right-4 sm:bottom-[96px] sm:right-6 z-50 flex w-[calc(100vw-2rem)] max-w-[400px] origin-bottom-right flex-col overflow-hidden rounded-xl border border-primary-container/25 bg-background/95 shadow-[0_4px_30px_rgba(217,119,6,0.15)] backdrop-blur-2xl transition-all duration-300 sm:w-[400px] ${
          isOpen
            ? 'translate-y-0 scale-100 opacity-100 pointer-events-auto'
            : 'pointer-events-none translate-y-4 scale-95 opacity-0'
        }`}
        style={{ height: 'min(420px, calc(100vh - 160px))' }}
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="relative flex-shrink-0 border-b border-glass-border bg-glass-surface/80 px-4 py-4">
          <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary-container to-transparent" />
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary-container/40 bg-aurora-cyan shadow-[0_0_15px_rgba(217,119,6,0.2)]">
                <HiSparkles className="text-xl text-primary-container" />
              </div>
              <div className="min-w-0">
                <h2 className="truncate font-headline-md text-base font-semibold text-primary">
                  Roby AI Assistant
                </h2>
                <p className="text-xs text-on-surface-variant">
                  Grounded on CV and profile context
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={clearChat}
                className="rounded-lg border border-glass-border bg-surface-container/60 p-2 text-on-surface-variant transition-colors hover:border-status-error/50 hover:text-status-error"
                aria-label="Clear chat"
                title="Clear chat"
              >
                <HiTrash />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg border border-glass-border bg-surface-container/60 p-2 text-on-surface-variant transition-colors hover:border-primary-container/50 hover:text-primary-container"
                aria-label="Close chat"
                title="Close chat"
              >
                <HiX />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={listRef}
          className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 py-4"
        >
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>

        {/* Input Footer */}
        <div className="flex-shrink-0 border-t border-glass-border bg-background/90 px-4 pt-2 pb-4">
          <SuggestedQuestions disabled={isStreaming} onSelect={handleSuggestedQuestion} />

          {error && (
            <div className="mt-2 rounded-lg border border-status-error/30 bg-status-error/10 px-3 py-2 text-xs text-secondary">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-2 flex items-end gap-2">
            <label className="sr-only" htmlFor="roby-ai-message">
              Ask Roby AI
            </label>
            <textarea
              ref={inputRef}
              id="roby-ai-message"
              value={input}
              maxLength={MAX_MESSAGE_LENGTH}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  handleSubmit(event);
                }
              }}
              rows={1}
              placeholder="Ask about Roby's skills, projects, or experience..."
              className="max-h-20 min-h-[40px] flex-1 resize-none rounded-lg border border-glass-border bg-surface-container-low/80 px-3 py-2.5 text-sm text-primary outline-none transition-colors placeholder:text-on-surface-variant focus:border-primary-container"
            />
            {isStreaming ? (
              <button
                type="button"
                onClick={stopStreaming}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-status-error/40 bg-status-error/15 text-status-error transition-transform active:scale-95"
                aria-label="Stop response"
                title="Stop response"
              >
                <HiStop />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!sanitizeMessage(input)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-container text-on-primary shadow-[0_0_12px_rgba(217,119,6,0.3)] transition-transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Send message"
                title="Send message"
              >
                <HiPaperAirplane />
              </button>
            )}
          </form>

          <div className="mt-1.5 flex justify-between text-[10px] font-label-code uppercase text-on-surface-variant">
            <span>CV-grounded answers only</span>
            <span>{sanitizeMessage(input).length}/{MAX_MESSAGE_LENGTH}</span>
          </div>
        </div>
      </div>

      {/* Floating Toggle Button — bottom right */}
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="group fixed bottom-4 right-4 z-[60] sm:bottom-6 sm:right-6 flex h-14 w-14 items-center justify-center rounded-xl border border-primary-container/40 bg-background/95 text-primary-container shadow-[0_4px_20px_rgba(217,119,6,0.2)] backdrop-blur-xl transition-all hover:scale-105 hover:border-primary-container active:scale-95"
        aria-label={isOpen ? 'Close Roby AI Assistant' : 'Open Roby AI Assistant'}
      >
        <span className="absolute h-14 w-14 rounded-xl bg-aurora-cyan opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
        {isOpen ? <HiX className="relative text-2xl" /> : <HiSparkles className="relative text-2xl" />}
      </button>
    </>
  );
};

export default AiChatWidget;
