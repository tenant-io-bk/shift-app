-- Run this in your Supabase SQL editor

-- Profiles: extends auth.users for both workers and employers
create table profiles (
  id          uuid references auth.users on delete cascade primary key,
  role        text not null check (role in ('worker', 'employer')),
  first_name  text,
  last_name   text,
  phone       text,
  avatar_url  text,
  created_at  timestamptz default now()
);

-- Venues: employer's business info
create table venues (
  id          uuid primary key default gen_random_uuid(),
  owner_id    uuid references profiles(id) on delete cascade not null,
  name        text not null,
  address     text,
  neighborhood text,
  created_at  timestamptz default now()
);

-- Shifts: job postings created by employers
create table shifts (
  id          uuid primary key default gen_random_uuid(),
  venue_id    uuid references venues(id) on delete cascade not null,
  role        text not null,
  date        date not null,
  start_time  time not null,
  end_time    time not null,
  rate        numeric(6,2) not null,
  workers_needed int not null default 1,
  brief       text,
  tasks       text[],
  bring       jsonb,
  status      text not null default 'open' check (status in ('open', 'filled', 'active', 'completed', 'cancelled')),
  created_at  timestamptz default now()
);

-- Applications: workers applying to shifts
create table applications (
  id          uuid primary key default gen_random_uuid(),
  shift_id    uuid references shifts(id) on delete cascade not null,
  worker_id   uuid references profiles(id) on delete cascade not null,
  status      text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'no_show')),
  applied_at  timestamptz default now(),
  unique(shift_id, worker_id)
);

-- Ratings: post-shift reviews (bidirectional)
create table ratings (
  id          uuid primary key default gen_random_uuid(),
  shift_id    uuid references shifts(id) on delete cascade not null,
  rater_id    uuid references profiles(id) not null,
  ratee_id    uuid references profiles(id) not null,
  score       int not null check (score between 1 and 5),
  comment     text,
  created_at  timestamptz default now(),
  unique(shift_id, rater_id, ratee_id)
);

-- Row Level Security
alter table profiles    enable row level security;
alter table venues      enable row level security;
alter table shifts      enable row level security;
alter table applications enable row level security;
alter table ratings     enable row level security;

-- Profiles: users can read all profiles, only update their own
create policy "profiles_select" on profiles for select using (true);
create policy "profiles_insert" on profiles for insert with check (auth.uid() = id);
create policy "profiles_update" on profiles for update using (auth.uid() = id);

-- Venues: public read, owner write
create policy "venues_select" on venues for select using (true);
create policy "venues_insert" on venues for insert with check (auth.uid() = owner_id);
create policy "venues_update" on venues for update using (auth.uid() = owner_id);

-- Shifts: public read (for browsing), owner write
create policy "shifts_select" on shifts for select using (true);
create policy "shifts_insert" on shifts for insert with check (
  exists (select 1 from venues where id = venue_id and owner_id = auth.uid())
);
create policy "shifts_update" on shifts for update using (
  exists (select 1 from venues where id = venue_id and owner_id = auth.uid())
);

-- Applications: workers apply, employers see applications for their shifts
create policy "applications_select" on applications for select using (
  worker_id = auth.uid() or
  exists (select 1 from shifts s join venues v on s.venue_id = v.id where s.id = shift_id and v.owner_id = auth.uid())
);
create policy "applications_insert" on applications for insert with check (auth.uid() = worker_id);
create policy "applications_update" on applications for update using (
  exists (select 1 from shifts s join venues v on s.venue_id = v.id where s.id = shift_id and v.owner_id = auth.uid())
);

-- Ratings: participants only
create policy "ratings_select" on ratings for select using (rater_id = auth.uid() or ratee_id = auth.uid());
create policy "ratings_insert" on ratings for insert with check (auth.uid() = rater_id);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, phone, role)
  values (new.id, new.phone, 'worker');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();
