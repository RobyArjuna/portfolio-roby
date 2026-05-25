import React from 'react';
import { renderSafeMarkdown } from '../utils/markdown';

function formatTime(value) {
  return new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[86%] rounded-xl border px-4 py-3 shadow-lg ${
          isUser
            ? 'border-primary-container/40 bg-primary-container text-on-primary'
            : 'border-glass-border bg-glass-surface/90 text-on-surface backdrop-blur-xl'
        }`}
      >
        {message.pending && !message.content ? (
          <div className="flex items-center gap-1.5 py-1" aria-label="Roby AI is typing">
            <span className="h-2 w-2 rounded-full bg-primary-container animate-bounce" />
            <span className="h-2 w-2 rounded-full bg-primary-container animate-bounce [animation-delay:120ms]" />
            <span className="h-2 w-2 rounded-full bg-primary-container animate-bounce [animation-delay:240ms]" />
          </div>
        ) : (
          <div
            className={`ai-markdown text-sm leading-relaxed ${isUser ? 'text-on-primary' : 'text-on-surface'}`}
            dangerouslySetInnerHTML={{ __html: renderSafeMarkdown(message.content) }}
          />
        )}

        <div
          className={`mt-2 text-[10px] font-label-code uppercase ${
            isUser ? 'text-on-primary/70' : 'text-on-surface-variant'
          }`}
        >
          {formatTime(message.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
