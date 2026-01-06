create or replace function delete_user_avatar() returns trigger
language plpgsql
security definer
set search_path = storage, public
as $$
begin
  delete from storage.objects
  where bucket_id = 'avatars'
    and name = old.id || '/avatar';

  return old;
end;
$$;

create trigger on_auth_user_deleted_delete_avatar after delete on auth.users for each row execute function delete_user_avatar();
