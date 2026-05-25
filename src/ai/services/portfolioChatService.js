import { aiDebugLog, createAiDebugId } from '../utils/debug';

const STREAM_ENDPOINT = '/functions/v1/portfolio-chat';

function getSupabaseFunctionUrl() {
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;

  if (!supabaseUrl) {
    throw new Error('REACT_APP_SUPABASE_URL is not configured.');
  }

  return `${supabaseUrl}${STREAM_ENDPOINT}`;
}

function getPublicHeaders() {
  const anonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

  if (!anonKey) {
    throw new Error('REACT_APP_SUPABASE_ANON_KEY is not configured.');
  }

  return {
    Authorization: `Bearer ${anonKey}`,
    apikey: anonKey,
    'Content-Type': 'application/json',
    Accept: 'text/event-stream',
  };
}

export async function streamPortfolioAnswer({ message, messages, sessionId, language, onChunk, signal }) {
  const debugId = createAiDebugId();
  const endpoint = getSupabaseFunctionUrl();
  const history = messages
    .filter((item) => item.role && item.content && !item.pending)
    .slice(-8)
    .map((item) => ({
      role: item.role,
      content: item.content,
    }));

  aiDebugLog('request:start', {
    debugId,
    endpoint,
    sessionId,
    language,
    messageLength: message.length,
    historyCount: history.length,
  });

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      ...getPublicHeaders(),
      'x-ai-debug-id': debugId,
    },
    body: JSON.stringify({
      message,
      sessionId,
      language,
      debugId,
      messages: history,
    }),
    signal,
  });

  aiDebugLog('request:response', {
    debugId,
    ok: response.ok,
    status: response.status,
    contentType: response.headers.get('content-type'),
  });

  if (!response.ok || !response.body) {
    const detail = await response.text();
    aiDebugLog('request:error-response', { debugId, detail });
    throw new Error(detail || 'The AI assistant is unavailable.');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  const handleEvent = (event) => {
    const dataLines = event
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.startsWith('data:'))
      .map((line) => line.replace(/^data:\s*/, ''));

    if (!dataLines.length) return;

    const data = dataLines.join('');
    if (!data || data === '[DONE]') return;

    try {
      const payload = JSON.parse(data);
      aiDebugLog('stream:chunk', {
        debugId,
        type: payload.type,
        textLength: payload.text?.length || 0,
        message: payload.message,
        contextCount: payload.contextCount,
        requestId: payload.requestId,
      });
      onChunk(payload);
    } catch (error) {
      console.warn('Unable to parse AI stream chunk', error);
    }
  };

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const events = buffer.split(/\r?\n\r?\n/);
    buffer = events.pop() || '';

    events.forEach(handleEvent);
  }

  if (buffer.trim()) {
    handleEvent(buffer);
  }

  aiDebugLog('request:complete', { debugId });
}
