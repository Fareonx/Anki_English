-- Other correct answers for the beginner course (hi for hello, mom for mother...).
-- When typing a word, an answer from the note's synonyms counts as correct.

alter table public.starter_words add column if not exists synonyms text not null default '';

update public.starter_words w set synonyms = v.synonyms
from (values
  ('hello', 'hi, hey'),
  ('goodbye', 'bye, bye-bye'),
  ('thank you', 'thanks'),
  ('mother', 'mom, mum, mommy, mummy'),
  ('father', 'dad, daddy'),
  ('child', 'kid'),
  ('color', 'colour'),
  ('grey', 'gray'),
  ('stomach', 'belly, tummy'),
  ('T-shirt', 'tshirt, tee'),
  ('trousers', 'pants'),
  ('sweater', 'jumper, pullover'),
  ('sofa', 'couch'),
  ('shop', 'store'),
  ('taxi', 'cab'),
  ('plane', 'airplane, aeroplane'),
  ('bicycle', 'bike'),
  ('big', 'large'),
  ('small', 'little'),
  ('fast', 'quick'),
  ('difficult', 'hard'),
  ('happy', 'glad'),
  ('exam', 'test, examination'),
  ('car', 'automobile')
) as v(word, synonyms)
where w.word = v.word;

-- Words already copied to students (only empty synonyms are filled).
update public.notes n set synonyms = w.synonyms
from public.decks d, public.decks r, public.starter_words w
where n.deck_id = d.id and d.parent_id = r.id and r.name = '1. Начало A1' and r.parent_id is null
  and n.word = w.word and n.synonyms = '' and w.synonyms <> '';

create or replace function public.seed_starter_course(p_student uuid)
returns int
language plpgsql
security definer
set search_path = ''
as $$
declare
  root uuid;
  sub uuid;
  t record;
  added int := 0;
  n int;
begin
  if not exists (select 1 from public.starter_words)
     or exists (select 1 from public.decks where student_id = p_student and parent_id is null and name = '1. Начало A1') then
    return 0;
  end if;
  insert into public.decks (student_id, name) values (p_student, '1. Начало A1') returning id into root;
  for t in select day, min(topic) as topic from public.starter_words group by day order by day loop
    insert into public.decks (student_id, parent_id, name)
      values (p_student, root, 'День ' || lpad(t.day::text, 2, '0') || ' · ' || t.topic)
      returning id into sub;
    insert into public.notes (deck_id, student_id, word, translation_ru, translation_az, example, ipa, pos, synonyms)
      select sub, p_student, w.word, w.translation_ru, w.translation_az, w.example, w.ipa, w.pos, w.synonyms
      from public.starter_words w where w.day = t.day order by w.position;
    get diagnostics n = row_count;
    added := added + n;
  end loop;
  update public.profiles
    set settings = jsonb_build_object('newPerDay', 20) || settings
    where id = p_student;
  return added;
end;
$$;

revoke all on function public.seed_starter_course(uuid) from anon, authenticated, public;
