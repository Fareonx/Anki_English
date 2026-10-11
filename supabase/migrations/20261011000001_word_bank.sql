-- Automatic word top-up for beginners.
--
-- public.word_bank holds an ordered list of words, easiest first (A1 -> A2 -> B1), split
-- into courses ("1. Начало A1", "2. Дальше A2", ...). Every morning at 04:05 Baku
-- (00:05 UTC, right after the study day starts) top_up_all() checks every beginner
-- (a student with the "1. Начало A1" course): when fewer than two days of fresh words
-- are left, the next 14 days of words they do not have yet are added as new "День NN"
-- decks under the course they belong to. Each top-up is logged in public.word_topups.
-- The words themselves are loaded by the next migration (from content/*/day-*.csv).

create table public.word_bank (
  position int primary key,
  course text not null,
  topic text not null,
  word text not null,
  translation_ru text not null,
  translation_az text not null,
  example text not null default '',
  ipa text not null default '',
  pos text not null default '',
  synonyms text not null default ''
);
create unique index word_bank_word_idx on public.word_bank (lower(word));
-- Read only by the security definer functions below.
alter table public.word_bank enable row level security;

create table public.word_topups (
  id bigserial primary key,
  student_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  words int not null,
  first_day int not null,
  last_day int not null,
  courses text not null
);
create index word_topups_student_idx on public.word_topups (student_id, created_at);
alter table public.word_topups enable row level security;
create policy "word_topups: own or admin" on public.word_topups
  for select using (student_id = (select auth.uid()) or (select public.is_admin()));

-- Words of the bank the student does not have yet.
create or replace function public.bank_remaining(p_student uuid)
returns int
language sql
stable
security definer
set search_path = ''
as $$
  select count(*)::int from public.word_bank w
  where not exists (select 1 from public.notes n where n.student_id = p_student and lower(n.word) = lower(w.word));
$$;

-- Adds the next p_days days of words for a beginner who is about to run out.
create or replace function public.top_up_words(p_student uuid, p_days int default 14)
returns int
language plpgsql
security definer
set search_path = ''
as $$
declare
  per_day int;
  fresh int;
  day_no int;
  first_day int;
  chunk record;
  root uuid;
  sub uuid;
  topics text;
  added int := 0;
  n int;
  courses text[] := '{}';
begin
  -- Only beginners: students who started with the A1 course.
  if not exists (
    select 1 from public.decks where student_id = p_student and parent_id is null and name = '1. Начало A1'
  ) then
    return 0;
  end if;

  select coalesce(nullif(settings ->> 'newPerDay', '')::int, 20) into per_day
  from public.profiles where id = p_student and role = 'student';
  if per_day is null or per_day <= 0 then
    return 0;
  end if;

  -- Fresh words: neither card started yet. Two days' worth or more is enough.
  select count(*) into fresh from public.notes nt
  where nt.student_id = p_student
    and not exists (select 1 from public.cards c where c.note_id = nt.id and c.ctype <> 0);
  if fresh >= 2 * per_day then
    return 0;
  end if;

  select coalesce(max(substring(name from '^День\s+(\d+)')::int), 0) into day_no
  from public.decks where student_id = p_student;
  first_day := day_no + 1;

  for chunk in
    select chunk_no, min(position) as first_pos, max(position) as last_pos,
           (array_agg(course order by position))[1] as course
    from (
      select w.position, w.course, (row_number() over (order by w.position) - 1) / per_day as chunk_no
      from public.word_bank w
      where not exists (
        select 1 from public.notes nt where nt.student_id = p_student and lower(nt.word) = lower(w.word)
      )
      order by w.position
      limit p_days * per_day
    ) picked
    group by chunk_no
    order by chunk_no
  loop
    day_no := day_no + 1;

    select id into root from public.decks
    where student_id = p_student and parent_id is null and name = chunk.course;
    if root is null then
      insert into public.decks (student_id, name) values (p_student, chunk.course) returning id into root;
    end if;
    if not chunk.course = any (courses) then
      courses := courses || chunk.course;
    end if;

    select string_agg(topic, ' / ' order by first_pos) into topics
    from (
      select topic, min(position) as first_pos from public.word_bank
      where position between chunk.first_pos and chunk.last_pos
      group by topic
    ) t;

    insert into public.decks (student_id, parent_id, name)
      values (p_student, root, 'День ' || lpad(day_no::text, 2, '0') || ' · ' || topics)
      returning id into sub;

    insert into public.notes (deck_id, student_id, word, translation_ru, translation_az, example, ipa, pos, synonyms)
      select sub, p_student, w.word, w.translation_ru, w.translation_az, w.example, w.ipa, w.pos, w.synonyms
      from public.word_bank w
      where w.position between chunk.first_pos and chunk.last_pos
        and not exists (
          select 1 from public.notes nt where nt.student_id = p_student and lower(nt.word) = lower(w.word)
        )
      order by w.position;
    get diagnostics n = row_count;
    added := added + n;
    root := null;
  end loop;

  if added > 0 then
    insert into public.word_topups (student_id, words, first_day, last_day, courses)
      values (p_student, added, first_day, day_no, array_to_string(courses, ', '));
  end if;
  return added;
end;
$$;

-- Runs the top-up for every student; one failing student never stops the others.
create or replace function public.top_up_all()
returns int
language plpgsql
security definer
set search_path = ''
as $$
declare
  s record;
  total int := 0;
begin
  for s in select id from public.profiles where role = 'student' loop
    begin
      total := total + public.top_up_words(s.id);
    exception when others then
      raise warning 'top_up_words failed for %: %', s.id, sqlerrm;
    end;
  end loop;
  return total;
end;
$$;

revoke all on function public.bank_remaining(uuid) from anon, authenticated, public;
revoke all on function public.top_up_words(uuid, int) from anon, authenticated, public;
revoke all on function public.top_up_all() from anon, authenticated, public;
grant execute on function public.bank_remaining(uuid) to service_role;

select cron.unschedule('top-up-words') where exists (select 1 from cron.job where jobname = 'top-up-words');
select cron.schedule('top-up-words', '5 0 * * *', $$select public.top_up_all()$$);
