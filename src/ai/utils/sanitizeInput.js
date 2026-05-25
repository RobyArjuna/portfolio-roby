export const MAX_MESSAGE_LENGTH = 900;

const PROMPT_INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?previous\s+instructions/i,
  /system\s+prompt/i,
  /developer\s+message/i,
  /hidden\s+instructions/i,
  /reveal\s+(your\s+)?prompt/i,
  /show\s+(me\s+)?embeddings/i,
];

function stripControlChars(value) {
  return Array.from(value)
    .filter((char) => {
      const code = char.charCodeAt(0);
      return code === 9 || code === 10 || code === 13 || (code >= 32 && code !== 127);
    })
    .join('');
}

export function sanitizeMessage(value) {
  return stripControlChars(String(value || ''))
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_MESSAGE_LENGTH);
}

export function looksLikePromptInjection(value) {
  const normalized = sanitizeMessage(value);
  return PROMPT_INJECTION_PATTERNS.some((pattern) => pattern.test(normalized));
}

export function detectLanguage(value) {
  const text = sanitizeMessage(value).toLowerCase();
  const englishHints = /\b(what|where|who|tell|does|is|are|project|projects|experience|skills|built|use|uses|have|has)\b/i;
  const indonesianHints =
    /\b(apa|siapa|dimana|di mana|ceritakan|pengalaman|proyek|keahlian|tentang|bisa|punya|memiliki|adalah|dibuat|menggunakan|halo|hai|aku|gue|saya)\b/i;

  if (englishHints.test(text)) return 'en';
  return indonesianHints.test(text) ? 'id' : 'en';
}
