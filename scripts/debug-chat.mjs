import dotenv from 'dotenv';
import process from 'node:process';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY;
const message = process.argv.slice(2).join(' ') || 'Does Roby have Flutter experience?';
const sessionId = `debug-${Date.now()}`;
const debugId = `cli-${Date.now()}`;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('SUPABASE_URL/REACT_APP_SUPABASE_URL and SUPABASE_ANON_KEY/REACT_APP_SUPABASE_ANON_KEY are required.');
}

const endpoint = `${SUPABASE_URL}/functions/v1/portfolio-chat`;

console.log('[debug-chat] endpoint:', endpoint);
console.log('[debug-chat] debugId:', debugId);
console.log('[debug-chat] message:', message);

const response = await fetch(endpoint, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    apikey: SUPABASE_ANON_KEY,
    'Content-Type': 'application/json',
    Accept: 'text/event-stream',
    'x-ai-debug-id': debugId,
  },
  body: JSON.stringify({
    message,
    sessionId,
    messages: [],
    debugId,
  }),
});

console.log('[debug-chat] status:', response.status, response.statusText);
console.log('[debug-chat] content-type:', response.headers.get('content-type'));

if (!response.ok || !response.body) {
  console.log(await response.text());
  process.exit(1);
}

const reader = response.body.getReader();
const decoder = new TextDecoder();
let buffer = '';
let answer = '';

while (true) {
  const { value, done } = await reader.read();
  if (done) break;

  buffer += decoder.decode(value, { stream: true });
  const events = buffer.split('\n\n');
  buffer = events.pop() || '';

  for (const event of events) {
    const dataLine = event.split('\n').find((line) => line.startsWith('data:'));
    if (!dataLine) continue;

    const payload = JSON.parse(dataLine.replace(/^data:\s*/, ''));
    console.log('[debug-chat] chunk:', payload);
    if (payload.type === 'delta') answer += payload.text || '';
  }
}

console.log('\n[debug-chat] final answer:\n');
console.log(answer || '(empty)');
