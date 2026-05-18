-- ─── Run this in the Supabase SQL editor ─────────────────────────────────────
-- The Marqet — full schema

-- Profiles (extends auth.users)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  display_name text,
  bio text,
  website text,
  github_url text,
  avatar_url text,
  is_verified boolean default false,
  is_admin boolean default false,
  stripe_account_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id, username, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'full_name'),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- Skills
create table if not exists skills (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  title text not null,
  slug text unique not null,
  short_description text not null,
  long_description text,
  category text not null check (category in ('claude_skill','mcp_server','prompt_pack','workflow','template','bundle')),
  tags text[] default '{}',
  price_gbp numeric(10,2) default 0 check (price_gbp >= 0),
  repo_url text,
  version text default '1.0.0',
  changelog text,
  compatibility text[] default '{claude}',
  author_id uuid references auth.users(id) on delete cascade,
  status text default 'pending' check (status in ('pending','approved','flagged','rejected')),
  install_count int default 0,
  file_path text,
  skill_content text,
  license text default 'MIT',
  admin_notes text,
  featured boolean default false
);

-- Increment install count safely
create or replace function increment_install(skill_id uuid)
returns void language sql security definer as $$
  update skills set install_count = install_count + 1 where id = skill_id;
$$;

-- Reviews
create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  skill_id uuid references skills(id) on delete cascade not null,
  reviewer_id uuid references auth.users(id) on delete cascade not null,
  rating int not null check (rating between 1 and 5),
  body text,
  developer_response text,
  unique(skill_id, reviewer_id)
);

-- Installs
create table if not exists installs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  skill_id uuid references skills(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  version_installed text,
  unique(skill_id, user_id)
);

-- Waitlist (already may exist)
create table if not exists waitlist (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  email text unique not null,
  role text default 'both'
);

-- Contact / commission requests
create table if not exists contact_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  company text,
  request_type text default 'custom_build',
  description text not null,
  budget_range text,
  status text default 'new' check (status in ('new','responded','closed'))
);

-- Reports
create table if not exists reports (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  skill_id uuid references skills(id) on delete cascade not null,
  reporter_id uuid references auth.users(id),
  reason text not null,
  details text,
  status text default 'pending' check (status in ('pending','reviewed','dismissed'))
);

-- ─── Row Level Security ───────────────────────────────────────────────────────

alter table profiles enable row level security;
alter table skills enable row level security;
alter table reviews enable row level security;
alter table installs enable row level security;
alter table waitlist enable row level security;
alter table contact_requests enable row level security;
alter table reports enable row level security;

-- Profiles: anyone can read; only owner can update
create policy "profiles_read" on profiles for select using (true);
create policy "profiles_insert" on profiles for insert with check (auth.uid() = id);
create policy "profiles_update" on profiles for update using (auth.uid() = id);

-- Skills: approved are public; author can see own; admin can see all
create policy "skills_read_approved" on skills for select using (status = 'approved' or auth.uid() = author_id);
create policy "skills_insert" on skills for insert with check (auth.uid() = author_id);
create policy "skills_update_author" on skills for update using (auth.uid() = author_id and status in ('pending','flagged'));

-- Reviews: public read; authenticated insert; reviewer can update own
create policy "reviews_read" on reviews for select using (true);
create policy "reviews_insert" on reviews for insert with check (auth.uid() = reviewer_id);
create policy "reviews_update" on reviews for update using (auth.uid() = reviewer_id);

-- Installs: owner can read own
create policy "installs_read" on installs for select using (auth.uid() = user_id);
create policy "installs_insert" on installs for insert with check (auth.uid() = user_id);

-- Waitlist: anyone can insert; no reads
create policy "waitlist_insert" on waitlist for insert with check (true);

-- Contact requests: anyone can insert; no reads (admin reads via service role)
create policy "contact_insert" on contact_requests for insert with check (true);

-- Reports: authenticated can insert
create policy "reports_insert" on reports for insert with check (auth.uid() is not null);

-- ─── Storage bucket ───────────────────────────────────────────────────────────
-- Create in Supabase dashboard: Storage > New bucket > "skill-files" > public: false
-- Then add policy: allow authenticated uploads

-- ─── Admin helpers (run as service role / postgres) ──────────────────────────
-- To make a user admin:
-- update profiles set is_admin = true where username = 'your-username';
