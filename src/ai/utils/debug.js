const DEBUG_FLAG = 'roby-ai-debug';

export function isAiDebugEnabled() {
  return process.env.REACT_APP_AI_DEBUG === 'true' || localStorage.getItem(DEBUG_FLAG) === 'true';
}

export function createAiDebugId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `debug-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function aiDebugLog(label, details = {}) {
  if (!isAiDebugEnabled()) return;
  console.log(`[RobyAI] ${label}`, details);
}

export function enableAiDebug() {
  localStorage.setItem(DEBUG_FLAG, 'true');
}

export function disableAiDebug() {
  localStorage.removeItem(DEBUG_FLAG);
}
