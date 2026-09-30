-- ============================================================
-- WORST UI FOR ANY WEB BROWSER - SUPABASE DATABASE MIGRATION
-- Production PostgreSQL Schema & Row Level Security (RLS)
-- ============================================================

-- 1. Profiles Table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  token_balance integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. AI Conversations Table
create table if not exists public.ai_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3. AI Messages Table
create table if not exists public.ai_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.ai_conversations(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz not null default now()
);

-- 4. Demo Payment Events Table (SIMULATION ONLY)
create table if not exists public.demo_payment_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  amount numeric(10,2) not null,
  status text not null default 'simulated',
  created_at timestamptz not null default now()
);

-- Enable Row Level Security (RLS) on all tables
alter table public.profiles enable row level security;
alter table public.ai_conversations enable row level security;
alter table public.ai_messages enable row level security;
alter table public.demo_payment_events enable row level security;

-- Policies for Profiles
drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Policies for AI Conversations
drop policy if exists "Users can read own conversations" on public.ai_conversations;
create policy "Users can read own conversations"
  on public.ai_conversations for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own conversations" on public.ai_conversations;
create policy "Users can insert own conversations"
  on public.ai_conversations for insert
  with check (auth.uid() = user_id);

-- Policies for AI Messages
drop policy if exists "Users can read own messages" on public.ai_messages;
create policy "Users can read own messages"
  on public.ai_messages for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own messages" on public.ai_messages;
create policy "Users can insert own messages"
  on public.ai_messages for insert
  with check (auth.uid() = user_id);

-- Policies for Demo Payment Events
drop policy if exists "Users can read own demo payments" on public.demo_payment_events;
create policy "Users can read own demo payments"
  on public.demo_payment_events for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own demo payments" on public.demo_payment_events;
create policy "Users can insert own demo payments"
  on public.demo_payment_events for insert
  with check (auth.uid() = user_id);

-- Profile trigger on new auth user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name, token_balance)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)), 0)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
