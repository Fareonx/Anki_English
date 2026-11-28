-- Every student types the word: only the typing card (template 1: translation -> word) is
-- studied, for new words and on every review. The recall card (template 0: word ->
-- translation) of new words is created suspended unless a student's settings say
-- typingOnly: false, and the recall cards that already exist are suspended. Nothing is
-- deleted: the recall cards keep their history.

create or replace function public.notes_create_cards()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  typing_only boolean := coalesce(
    (select (settings ->> 'typingOnly')::boolean from public.profiles where id = new.student_id), true);
begin
  insert into public.cards (note_id, deck_id, student_id, template, due, queue)
  values
    (new.id, new.deck_id, new.student_id, 0, new.position * 2, case when typing_only then -1 else 0 end),
    (new.id, new.deck_id, new.student_id, 1, new.position * 2 + 1, 0);
  return new;
end;
$$;

update public.profiles set settings = settings || '{"typingOnly": true}' where role = 'student';
update public.cards set queue = -1 where template = 0 and queue <> -1;
