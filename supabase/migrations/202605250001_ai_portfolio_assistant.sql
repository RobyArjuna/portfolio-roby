create extension if not exists vector;
create extension if not exists pgcrypto;

create table if not exists public.ai_documents (
  id uuid primary key default gen_random_uuid(),
  source_type text not null check (source_type in ('cv_pdf', 'profile_context')),
  source_name text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.ai_profile_chunks (
  id uuid primary key default gen_random_uuid(),
  document_id uuid references public.ai_documents(id) on delete cascade,
  chunk_index integer not null,
  content text not null,
  content_hash text not null,
  token_estimate integer not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  embedding vector(768) not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (document_id, content_hash)
);

create table if not exists public.ai_chat_sessions (
  session_id text primary key,
  visitor_id text,
  language text check (language in ('id', 'en')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now()
);

create table if not exists public.ai_chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id text not null references public.ai_chat_sessions(session_id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.ai_rate_limits (
  fingerprint text primary key,
  window_start timestamptz not null default now(),
  request_count integer not null default 0,
  updated_at timestamptz not null default now()
);

create index if not exists ai_profile_chunks_embedding_hnsw_idx
  on public.ai_profile_chunks using hnsw (embedding vector_cosine_ops);

create index if not exists ai_profile_chunks_document_idx
  on public.ai_profile_chunks (document_id, chunk_index);

create index if not exists ai_chat_messages_session_created_idx
  on public.ai_chat_messages (session_id, created_at);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists ai_profile_chunks_touch_updated_at on public.ai_profile_chunks;
create trigger ai_profile_chunks_touch_updated_at
before update on public.ai_profile_chunks
for each row execute function public.touch_updated_at();

create or replace function public.match_portfolio_chunks(
  query_embedding vector(768),
  match_count integer default 6,
  similarity_threshold double precision default 0.68
)
returns table (
  id uuid,
  content text,
  metadata jsonb,
  similarity double precision
)
language sql
stable
as $$
  select
    c.id,
    c.content,
    c.metadata,
    1 - (c.embedding <=> query_embedding) as similarity
  from public.ai_profile_chunks c
  where 1 - (c.embedding <=> query_embedding) >= similarity_threshold
  order by c.embedding <=> query_embedding
  limit match_count;
$$;

alter table public.ai_documents enable row level security;
alter table public.ai_profile_chunks enable row level security;
alter table public.ai_chat_sessions enable row level security;
alter table public.ai_chat_messages enable row level security;
alter table public.ai_rate_limits enable row level security;

revoke all on public.ai_documents from anon, authenticated;
revoke all on public.ai_profile_chunks from anon, authenticated;
revoke all on public.ai_chat_sessions from anon, authenticated;
revoke all on public.ai_chat_messages from anon, authenticated;
revoke all on public.ai_rate_limits from anon, authenticated;

grant execute on function public.match_portfolio_chunks(vector, integer, double precision) to service_role;
