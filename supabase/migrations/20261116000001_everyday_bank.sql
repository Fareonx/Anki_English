-- Everyday track: frequent words for everyday life (public.everyday_bank), for students who
-- should learn common words rather than exam vocabulary. A track can now be set per student
-- in profiles.settings.wordTrack ('beginner' | 'ielts' | 'everyday'); without it the track
-- still follows from the first course. Adding the days moves to add_bank_days(), which
-- top_up_words() calls when the student is about to run out and the admin may call directly.

create table if not exists public.everyday_bank (like public.word_bank including defaults);
alter table public.everyday_bank add primary key (position);
create unique index if not exists everyday_bank_word_idx on public.everyday_bank (lower(word));
alter table public.everyday_bank enable row level security;

create or replace view public.word_bank_all with (security_invoker = true) as
  select *, 'beginner'::text as track from public.word_bank
  union all
  select *, 'ielts'::text as track from public.ielts_bank
  union all
  select *, 'everyday'::text as track from public.everyday_bank;
revoke all on public.word_bank_all from anon, authenticated;

create or replace function public.student_track(p_student uuid)
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(
    (select nullif(settings ->> 'wordTrack', '') from public.profiles where id = p_student),
    case
      when exists (select 1 from public.decks where student_id = p_student and parent_id is null and name = '1. Начало A1')
        then 'beginner'
      when exists (select 1 from public.decks where student_id = p_student and parent_id is null and name = '1. Основа B1')
        then 'ielts'
    end
  );
$$;

-- Adds the next p_days days of words from the student's track, whatever their stock.
create or replace function public.add_bank_days(p_student uuid, p_days int default 14)
returns int
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_track text := public.student_track(p_student);
  per_day int;
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
  if v_track is null then
    return 0;
  end if;

  select coalesce(nullif(settings ->> 'newPerDay', '')::int, 20) into per_day
  from public.profiles where id = p_student and role = 'student';
  if per_day is null or per_day <= 0 then
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
      from public.word_bank_all w
      where w.track = v_track
        and not exists (
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
      select topic, min(position) as first_pos from public.word_bank_all b
      where b.track = v_track and position between chunk.first_pos and chunk.last_pos
      group by topic
    ) t;

    insert into public.decks (student_id, parent_id, name)
      values (p_student, root, 'День ' || lpad(day_no::text, 2, '0') || ' · ' || topics)
      returning id into sub;

    insert into public.notes (deck_id, student_id, word, translation_ru, translation_az, example, ipa, pos, synonyms)
      select sub, p_student, w.word, w.translation_ru, w.translation_az, w.example, w.ipa, w.pos, w.synonyms
      from public.word_bank_all w
      where w.track = v_track
        and w.position between chunk.first_pos and chunk.last_pos
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

-- Tops up a student on a track who is about to run out of fresh words.
create or replace function public.top_up_words(p_student uuid, p_days int default 14)
returns int
language plpgsql
security definer
set search_path = ''
as $$
declare
  per_day int;
  fresh int;
begin
  if public.student_track(p_student) is null then
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

  return public.add_bank_days(p_student, p_days);
end;
$$;

revoke all on function public.add_bank_days(uuid, int) from anon, authenticated, public;
revoke all on function public.top_up_words(uuid, int) from anon, authenticated, public;
