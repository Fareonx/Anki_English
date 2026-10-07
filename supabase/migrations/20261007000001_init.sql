-- Core schema for the Anki-style IELTS vocabulary app.
-- Mirrors Anki's internal model: decks -> notes -> cards, plus a review log (revlog).

-- ---------------------------------------------------------------------------
-- Profiles & roles
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null default '',
  role text not null default 'student' check (role in ('admin', 'student')),
  -- Scheduler options for a student (overrides of the app defaults).
  settings jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles where id = (select auth.uid()) and role = 'admin'
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, name)
  values (new.id, coalesce(nullif(new.raw_user_meta_data ->> 'name', ''), split_part(new.email, '@', 1)));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Decks (categories). Nested via parent_id, like "IELTS::Day 01".
-- ---------------------------------------------------------------------------
create table public.decks (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles (id) on delete cascade,
  parent_id uuid references public.decks (id) on delete cascade,
  name text not null check (length(trim(name)) > 0),
  created_by uuid references public.profiles (id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  unique nulls not distinct (student_id, parent_id, name)
);
create index decks_student_idx on public.decks (student_id);
create index decks_parent_idx on public.decks (parent_id);

create or replace function public.check_deck_parent()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.parent_id is not null and not exists (
    select 1 from public.decks where id = new.parent_id and student_id = new.student_id
  ) then
    raise exception 'Parent deck belongs to another student';
  end if;
  return new;
end;
$$;

create trigger decks_check_parent
  before insert or update of parent_id, student_id on public.decks
  for each row execute function public.check_deck_parent();

-- ---------------------------------------------------------------------------
-- Notes (one word with all its fields). Each note produces two cards.
-- ---------------------------------------------------------------------------
create sequence public.note_position_seq;

create table public.notes (
  id uuid primary key default gen_random_uuid(),
  deck_id uuid not null references public.decks (id) on delete cascade,
  student_id uuid not null references public.profiles (id) on delete cascade,
  word text not null check (length(trim(word)) > 0),
  ipa text not null default '',
  pos text not null default '',
  translation_ru text not null default '',
  translation_az text not null default '',
  definition text not null default '',
  example text not null default '',
  synonyms text not null default '',
  tags text[] not null default '{}',
  -- Order in which new cards are introduced (Anki's "due" for new cards).
  position bigint not null default nextval('public.note_position_seq'),
  added_by uuid references public.profiles (id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index notes_deck_idx on public.notes (deck_id);
create index notes_student_idx on public.notes (student_id);

-- The owner of a note is always the owner of its deck.
create or replace function public.notes_set_student()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  select student_id into new.student_id from public.decks where id = new.deck_id;
  if new.student_id is null then
    raise exception 'Deck not found';
  end if;
  new.updated_at := now();
  return new;
end;
$$;

create trigger notes_set_student
  before insert or update on public.notes
  for each row execute function public.notes_set_student();

-- ---------------------------------------------------------------------------
-- Cards. Field meanings follow Anki:
--   ctype: 0 new, 1 learning, 2 review, 3 relearning
--   queue: -1 suspended, 0 new, 1 intraday learning (due = epoch seconds),
--          2 review (due = day number), 3 interday learning (due = day number)
--   due:   new -> position; queue 1 -> epoch seconds; queue 2/3 -> day number
--   ivl:   interval in days; factor: ease in permille (2500 = 250%)
-- ---------------------------------------------------------------------------
create table public.cards (
  id uuid primary key default gen_random_uuid(),
  note_id uuid not null references public.notes (id) on delete cascade,
  deck_id uuid not null references public.decks (id) on delete cascade,
  student_id uuid not null references public.profiles (id) on delete cascade,
  template smallint not null check (template in (0, 1)), -- 0: EN -> RU/AZ, 1: RU/AZ -> EN
  ctype smallint not null default 0 check (ctype between 0 and 3),
  queue smallint not null default 0 check (queue between -1 and 3),
  due bigint not null default 0,
  ivl integer not null default 0,
  factor integer not null default 0,
  reps integer not null default 0,
  lapses integer not null default 0,
  step integer not null default 0,
  leech boolean not null default false,
  modified_at timestamptz not null default now(),
  unique (note_id, template)
);
create index cards_student_queue_idx on public.cards (student_id, queue, due);
create index cards_deck_idx on public.cards (deck_id);

create or replace function public.notes_create_cards()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.cards (note_id, deck_id, student_id, template, due)
  values
    (new.id, new.deck_id, new.student_id, 0, new.position * 2),
    (new.id, new.deck_id, new.student_id, 1, new.position * 2 + 1);
  return new;
end;
$$;

create trigger notes_create_cards
  after insert on public.notes
  for each row execute function public.notes_create_cards();

create or replace function public.notes_move_cards()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.deck_id is distinct from old.deck_id then
    update public.cards set deck_id = new.deck_id, student_id = new.student_id where note_id = new.id;
  end if;
  return new;
end;
$$;

create trigger notes_move_cards
  after update of deck_id on public.notes
  for each row execute function public.notes_move_cards();

-- ---------------------------------------------------------------------------
-- Review log, same semantics as Anki's revlog:
--   ease: 1 Again, 2 Hard, 3 Good, 4 Easy
--   ivl / last_ivl: positive = days, negative = seconds (learning steps)
--   rtype: 0 learn, 1 review, 2 relearn, 3 cram
-- ---------------------------------------------------------------------------
create table public.revlog (
  id bigint generated always as identity primary key,
  card_id uuid not null references public.cards (id) on delete cascade,
  student_id uuid not null references public.profiles (id) on delete cascade,
  reviewed_at timestamptz not null default now(),
  ease smallint not null check (ease between 1 and 4),
  ivl integer not null,
  last_ivl integer not null,
  factor integer not null,
  time_ms integer not null default 0 check (time_ms >= 0),
  rtype smallint not null check (rtype between 0 and 3)
);
create index revlog_student_time_idx on public.revlog (student_id, reviewed_at);
create index revlog_card_idx on public.revlog (card_id);

-- ---------------------------------------------------------------------------
-- Sentences the student writes with a word.
-- ---------------------------------------------------------------------------
create table public.sentences (
  id uuid primary key default gen_random_uuid(),
  note_id uuid not null references public.notes (id) on delete cascade,
  student_id uuid not null references public.profiles (id) on delete cascade,
  text text not null check (length(trim(text)) > 0),
  created_at timestamptz not null default now()
);
create index sentences_student_idx on public.sentences (student_id, created_at);
create index sentences_note_idx on public.sentences (note_id);

-- ---------------------------------------------------------------------------
-- Answering a card: update the card and write the log entry atomically.
-- Runs with the caller's rights, so RLS applies.
-- ---------------------------------------------------------------------------
create or replace function public.answer_card(
  p_card_id uuid,
  p_ctype smallint,
  p_queue smallint,
  p_due bigint,
  p_ivl integer,
  p_factor integer,
  p_reps integer,
  p_lapses integer,
  p_step integer,
  p_leech boolean,
  p_ease smallint,
  p_log_ivl integer,
  p_last_ivl integer,
  p_time_ms integer,
  p_rtype smallint
)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_student uuid;
begin
  update public.cards
     set ctype = p_ctype, queue = p_queue, due = p_due, ivl = p_ivl, factor = p_factor,
         reps = p_reps, lapses = p_lapses, step = p_step, leech = p_leech, modified_at = now()
   where id = p_card_id
  returning student_id into v_student;

  if v_student is null then
    raise exception 'Card not found';
  end if;

  insert into public.revlog (card_id, student_id, ease, ivl, last_ivl, factor, time_ms, rtype)
  values (p_card_id, v_student, p_ease, p_log_ivl, p_last_ivl, p_factor, least(greatest(p_time_ms, 0), 600000), p_rtype);
end;
$$;

-- ---------------------------------------------------------------------------
-- Row level security
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.decks enable row level security;
alter table public.notes enable row level security;
alter table public.cards enable row level security;
alter table public.revlog enable row level security;
alter table public.sentences enable row level security;

create policy "profiles: read own or admin" on public.profiles
  for select to authenticated
  using (id = (select auth.uid()) or (select public.is_admin()));

create policy "profiles: update own or admin" on public.profiles
  for update to authenticated
  using (id = (select auth.uid()) or (select public.is_admin()))
  with check (id = (select auth.uid()) or (select public.is_admin()));

-- Nobody can change roles from the client.
revoke update on public.profiles from authenticated, anon;
grant update (name, settings) on public.profiles to authenticated;

create policy "decks: owner or admin" on public.decks
  for all to authenticated
  using (student_id = (select auth.uid()) or (select public.is_admin()))
  with check (student_id = (select auth.uid()) or (select public.is_admin()));

create policy "notes: owner or admin" on public.notes
  for all to authenticated
  using (student_id = (select auth.uid()) or (select public.is_admin()))
  with check (student_id = (select auth.uid()) or (select public.is_admin()));

create policy "cards: read owner or admin" on public.cards
  for select to authenticated
  using (student_id = (select auth.uid()) or (select public.is_admin()));

create policy "cards: update owner or admin" on public.cards
  for update to authenticated
  using (student_id = (select auth.uid()) or (select public.is_admin()))
  with check (student_id = (select auth.uid()) or (select public.is_admin()));

create policy "revlog: read owner or admin" on public.revlog
  for select to authenticated
  using (student_id = (select auth.uid()) or (select public.is_admin()));

create policy "revlog: insert owner" on public.revlog
  for insert to authenticated
  with check (student_id = (select auth.uid()));

create policy "sentences: read owner or admin" on public.sentences
  for select to authenticated
  using (student_id = (select auth.uid()) or (select public.is_admin()));

create policy "sentences: insert owner" on public.sentences
  for insert to authenticated
  with check (student_id = (select auth.uid()));

create policy "sentences: delete owner or admin" on public.sentences
  for delete to authenticated
  using (student_id = (select auth.uid()) or (select public.is_admin()));

revoke all on function public.answer_card from anon, public;
grant execute on function public.answer_card to authenticated;
revoke all on function public.is_admin from anon, public;
grant execute on function public.is_admin to authenticated;
revoke all on function public.handle_new_user from anon, authenticated, public;
revoke all on function public.notes_create_cards from anon, authenticated, public;
revoke all on function public.notes_move_cards from anon, authenticated, public;
