drop policy "user can view all profiles" on public.profiles;
drop policy "user can edit own profile" on public.profiles;

create policy "user can view public profiles" on public.profiles for select using(is_public = true);
create policy "user can view own profiles" on public.profiles for select using(auth.uid() = user_id);
create policy "user can edit own profile" on public.profiles for update using(auth.uid() = user_id) with check(auth.uid() = user_id);