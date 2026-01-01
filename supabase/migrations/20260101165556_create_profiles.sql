create table public.profiles (
    user_id uuid primary key references auth.users(id) on delete cascade,
    username text not null,
    handle text unique not null
);

alter table public.profiles add constraint handle_lowercase check(handle = lower(handle));
alter table public.profiles add constraint handle_characters check(handle ~ '^[a-z0-9_]+$');
alter table public.profiles add constraint handle_length check(length(handle) between 3 and 30);

alter table public.profiles enable row level security;

create policy "user can create own profile" on public.profiles for insert with check(auth.uid() = user_id)
create policy "user can view all profiles" on public.profiles for select using(true)
create policy "user can edit own profile" on public.profiles for update using(auth.uid() = user_id)