-- Paisa Pulse database schema
-- Run once: Supabase dashboard → SQL Editor → New query → paste this file → Run.
-- Safe to run again; it only creates what is missing.
-- Money is stored as integer minor units (paise), never as decimals.
-- Every table is locked with row-level security: a signed-in user can only
-- read and write rows where user_id is their own id.

-- ---------- core tables (used by the app today) ----------

create table if not exists public.profiles (
  id              uuid primary key references auth.users (id) on delete cascade,
  name            text not null default '',
  base_currency   text not null default 'INR',
  budget_minor    bigint not null default 0 check (budget_minor >= 0),
  last_account_id text,
  onboarded       boolean not null default false,
  timezone        text not null default 'Asia/Kolkata',
  week_start      smallint not null default 1,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create table if not exists public.accounts (
  user_id       uuid not null default auth.uid() references auth.users (id) on delete cascade,
  id            text not null,
  name          text not null,
  type          text not null check (type in ('cash', 'bank', 'upi', 'card', 'wallet')),
  last4         text,
  opening_minor bigint not null default 0,
  sort          int not null default 0,
  created_at    timestamptz not null default now(),
  primary key (user_id, id)
);

create table if not exists public.categories (
  user_id    uuid not null default auth.uid() references auth.users (id) on delete cascade,
  id         text not null,
  name       text not null,
  icon       text not null default 'other',
  color      text not null default '#8a8178',
  kind       text not null check (kind in ('expense', 'income')),
  parent_id  text,
  sort       int not null default 0,
  created_at timestamptz not null default now(),
  primary key (user_id, id)
);

-- Monthly limit per category; repeats every month.
create table if not exists public.budgets (
  user_id     uuid not null default auth.uid() references auth.users (id) on delete cascade,
  category_id text not null,
  limit_minor bigint not null check (limit_minor > 0),
  primary key (user_id, category_id)
);

create table if not exists public.transactions (
  user_id       uuid not null default auth.uid() references auth.users (id) on delete cascade,
  id            text not null,
  type          text not null check (type in ('debit', 'credit', 'transfer')),
  amount_minor  bigint not null check (amount_minor > 0),
  currency      text not null default 'INR',
  category_id   text,
  account_id    text not null,
  to_account_id text,
  merchant      text not null default '',
  note          text not null default '',
  tags          text[] not null default '{}',
  occurred_on   date not null,
  created_ms    bigint not null default 0,
  source        text not null default 'manual' check (source in ('manual', 'gmail', 'csv', 'receipt', 'sample')),
  status        text not null default 'confirmed' check (status in ('confirmed', 'review')),
  external_hash text,
  is_sample     boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  primary key (user_id, id)
);
create index if not exists transactions_user_date on public.transactions (user_id, occurred_on desc);
-- Dedupe for Gmail / statement imports (one row per source message).
create unique index if not exists transactions_user_hash on public.transactions (user_id, external_hash) where external_hash is not null;

-- ---------- tables for the next phases (Gmail import, rules, goals) ----------

create table if not exists public.recurring_rules (
  user_id    uuid not null default auth.uid() references auth.users (id) on delete cascade,
  id         text not null,
  template   jsonb not null,
  rrule      text not null,
  next_run   date,
  created_at timestamptz not null default now(),
  primary key (user_id, id)
);

create table if not exists public.category_rules (
  user_id     uuid not null default auth.uid() references auth.users (id) on delete cascade,
  id          text not null,
  match_field text not null default 'merchant',
  pattern     text not null,
  category_id text not null,
  priority    int not null default 0,
  primary key (user_id, id)
);

-- Tokens the Gmail Apps Script uses to post parsed alerts. Only hashes are stored.
create table if not exists public.import_tokens (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null default auth.uid() references auth.users (id) on delete cascade,
  token_hash text not null unique,
  label      text not null default 'Gmail',
  created_at timestamptz not null default now(),
  last_used  timestamptz,
  revoked_at timestamptz
);

create table if not exists public.import_log (
  id            bigint generated always as identity primary key,
  user_id       uuid not null default auth.uid() references auth.users (id) on delete cascade,
  external_hash text not null,
  received_at   timestamptz not null default now(),
  parse_status  text not null default 'ok'
);

create table if not exists public.goals (
  user_id      uuid not null default auth.uid() references auth.users (id) on delete cascade,
  id           text not null,
  name         text not null,
  target_minor bigint not null check (target_minor > 0),
  target_date  date,
  saved_minor  bigint not null default 0,
  primary key (user_id, id)
);

-- ---------- updated_at ----------

create or replace function public.touch_updated_at() returns trigger
language plpgsql as $$ begin new.updated_at = now(); return new; end $$;

drop trigger if exists profiles_touch on public.profiles;
create trigger profiles_touch before update on public.profiles for each row execute function public.touch_updated_at();
drop trigger if exists transactions_touch on public.transactions;
create trigger transactions_touch before update on public.transactions for each row execute function public.touch_updated_at();

-- ---------- row-level security: each user sees only their own rows ----------

alter table public.profiles enable row level security;
drop policy if exists "own profile" on public.profiles;
create policy "own profile" on public.profiles for all to authenticated
  using (id = (select auth.uid())) with check (id = (select auth.uid()));

do $$
declare t text;
begin
  foreach t in array array['accounts','categories','budgets','transactions','recurring_rules','category_rules','import_tokens','import_log','goals'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "own rows" on public.%I', t);
    execute format('create policy "own rows" on public.%I for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()))', t);
  end loop;
end $$;

-- Lightweight table the nightly GitHub Action reads to keep the free project awake.
create table if not exists public.heartbeat (id int primary key, at timestamptz not null default now());
insert into public.heartbeat (id) values (1) on conflict do nothing;
alter table public.heartbeat enable row level security;
drop policy if exists "anyone can read" on public.heartbeat;
create policy "anyone can read" on public.heartbeat for select to anon, authenticated using (true);
