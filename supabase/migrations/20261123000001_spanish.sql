-- Spanish for students whose profiles.settings.studyLang is 'es' (wordTrack 'spanish'):
-- public.spanish_bank holds the student's own words first, then an A1–A2 course from zero,
-- loaded by the next migration.
--
-- Typing only: for a student with settings.typingOnly = true the recall card of a new word
-- (template 0: word -> translation) is created suspended, so the student always types the
-- word (template 1: translation -> word), for new words and on every review.

create table if not exists public.spanish_bank (like public.word_bank including defaults);
alter table public.spanish_bank add primary key (position);
create unique index if not exists spanish_bank_word_idx on public.spanish_bank (lower(word));
alter table public.spanish_bank enable row level security;

create or replace view public.word_bank_all with (security_invoker = true) as
  select *, 'beginner'::text as track from public.word_bank
  union all
  select *, 'ielts'::text as track from public.ielts_bank
  union all
  select *, 'everyday'::text as track from public.everyday_bank
  union all
  select *, 'italian'::text as track from public.italian_bank
  union all
  select *, 'spanish'::text as track from public.spanish_bank;
revoke all on public.word_bank_all from anon, authenticated;

create or replace function public.notes_create_cards()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  typing_only boolean := coalesce(
    (select (settings ->> 'typingOnly')::boolean from public.profiles where id = new.student_id), false);
begin
  insert into public.cards (note_id, deck_id, student_id, template, due, queue)
  values
    (new.id, new.deck_id, new.student_id, 0, new.position * 2, case when typing_only then -1 else 0 end),
    (new.id, new.deck_id, new.student_id, 1, new.position * 2 + 1, 0);
  return new;
end;
$$;
