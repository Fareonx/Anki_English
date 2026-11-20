-- Italian for students whose profiles.settings.studyLang is 'it' (wordTrack 'italian'):
-- public.italian_bank holds the words in the order of the textbook "Nuovo Progetto
-- italiano 1" (unit 0 "Benvenuti!" .. unit 11), loaded by the next migration.
-- public.lesson_progress keeps the best result of each grammar lesson ("Уроки" tab).

create table if not exists public.italian_bank (like public.word_bank including defaults);
alter table public.italian_bank add primary key (position);
create unique index if not exists italian_bank_word_idx on public.italian_bank (lower(word));
alter table public.italian_bank enable row level security;

create or replace view public.word_bank_all with (security_invoker = true) as
  select *, 'beginner'::text as track from public.word_bank
  union all
  select *, 'ielts'::text as track from public.ielts_bank
  union all
  select *, 'everyday'::text as track from public.everyday_bank
  union all
  select *, 'italian'::text as track from public.italian_bank;
revoke all on public.word_bank_all from anon, authenticated;

create table if not exists public.lesson_progress (
  student_id uuid not null references public.profiles (id) on delete cascade,
  lesson_id text not null,
  best int not null,
  total int not null,
  done_at timestamptz not null default now(),
  primary key (student_id, lesson_id)
);
alter table public.lesson_progress enable row level security;

create policy "lesson_progress: read owner or admin" on public.lesson_progress
  for select to authenticated
  using (student_id = (select auth.uid()) or (select public.is_admin()));

create policy "lesson_progress: insert owner" on public.lesson_progress
  for insert to authenticated
  with check (student_id = (select auth.uid()));

create policy "lesson_progress: update owner" on public.lesson_progress
  for update to authenticated
  using (student_id = (select auth.uid()))
  with check (student_id = (select auth.uid()));
