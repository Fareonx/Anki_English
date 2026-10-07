-- The first account ever registered becomes the admin (the person who adds words
-- and watches progress). Everyone after that is a student.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, name, role)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data ->> 'name', ''), split_part(new.email, '@', 1)),
    case when exists (select 1 from public.profiles where role = 'admin') then 'student' else 'admin' end
  );
  return new;
end;
$$;
