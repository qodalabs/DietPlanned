-- Supabase schema for DietPlanned
-- Run in Supabase SQL editor or via migrations

-- Profiles table linked to Supabase Auth users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  age int not null,
  sex text not null check (sex in ('male','female')),
  height_cm int not null,
  weight_kg int not null,
  activity text not null check (activity in ('sedentary','light','moderate','active','very_active')),
  goal text not null check (goal in ('lose','maintain','gain')),
  bmi numeric not null,
  bmr int not null,
  recommended_calories int not null,
  summary text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.diet_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  summary text not null,
  days jsonb not null,
  meta jsonb,
  created_at timestamptz not null default now()
);

-- Basic RLS setup (optional: adjust policies as needed)
alter table public.profiles enable row level security;
alter table public.assessments enable row level security;
alter table public.diet_plans enable row level security;

-- Development-friendly policies for anon key usage. Tighten for production.
do $$ begin
  create policy if not exists "profiles read"
    on public.profiles for select
    using (true);
exception when others then null; end $$;

do $$ begin
  create policy if not exists "profiles upsert"
    on public.profiles for insert with check (true);
exception when others then null; end $$;

do $$ begin
  create policy if not exists "profiles update"
    on public.profiles for update using (true) with check (true);
exception when others then null; end $$;

do $$ begin
  create policy if not exists "assessments read"
    on public.assessments for select
    using (true);
exception when others then null; end $$;

do $$ begin
  create policy if not exists "assessments insert"
    on public.assessments for insert
    with check (true);
exception when others then null; end $$;

do $$ begin
  create policy if not exists "plans read"
    on public.diet_plans for select
    using (true);
exception when others then null; end $$;

do $$ begin
  create policy if not exists "plans insert"
    on public.diet_plans for insert
    with check (true);
exception when others then null; end $$;

-- NOTE: For production, replace permissive policies with auth.uid() based policies.
