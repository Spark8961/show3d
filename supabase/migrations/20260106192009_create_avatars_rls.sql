create policy "everyone can see all avatars" 
on storage.objects 
for select
to anon, authenticated 
using (bucket_id = 'avatars' and name like '%/avatar');

create policy "user can create own avatar" 
on storage.objects 
for insert 
to authenticated 
with check (bucket_id = 'avatars' and owner = auth.uid() and name = auth.uid() || '/avatar');

create policy "user can update own avatar" 
on storage.objects 
for update
to authenticated 
using (bucket_id = 'avatars' and owner = auth.uid() and name = auth.uid() || '/avatar')
with check (bucket_id = 'avatars' and owner = auth.uid() and name = auth.uid() || '/avatar');

create policy "user can delete own avatar" 
on storage.objects 
for delete
to authenticated 
using (bucket_id = 'avatars' and owner = auth.uid() and name = auth.uid() || '/avatar')