import React from 'react';
import { SUGGESTED_QUESTIONS } from '../prompts/suggestedQuestions';

const SuggestedQuestions = ({ disabled, onSelect }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {SUGGESTED_QUESTIONS.map((question) => (
        <button
          key={question}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(question)}
          className="shrink-0 rounded-full border border-primary-container/30 bg-aurora-cyan/20 px-3 py-2 text-left text-[11px] font-label-code text-primary-container transition-all hover:border-primary-container hover:bg-aurora-cyan/40 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {question}
        </button>
      ))}
    </div>
  );
};

export default SuggestedQuestions;
