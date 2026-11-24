#!/usr/bin/env python3
"""Builds the SQL that loads public.word_bank from content/*/day-*.csv.

Courses go easiest first; inside a course the days and the lines keep their order.
Words already used earlier (case-insensitive) are skipped, so every word appears once.
Days are cut by each student's daily limit later, so topics may have any size. Usage:

    python3 scripts/build_word_bank.py > supabase/migrations/<timestamp>_word_bank_data.sql
    python3 scripts/build_word_bank.py --tsv > content/word_bank.tsv   # same data, one row per line
"""

import glob
import re
import os
import sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
# (folder, course, track). Inside a track the order is the learning order, easiest first.
COURSES = [
    ('content/a1-start', '1. Начало A1', 'beginner'),
    ('content/a2-next', '2. Дальше A2', 'beginner'),
    ('content/a2-confident', '3. Уверенный A2', 'beginner'),
    ('content/towards-b1', '4. Путь к B1', 'beginner'),
    ('content/b1-level', '5. Уровень B1', 'beginner'),
    # IELTS students start with content/b1-core ("1. Основа B1"), loaded separately.
    ('content/ielts-b1plus', '2. IELTS B1+', 'ielts'),
    ('content/ielts-b2', '3. IELTS B2', 'ielts'),
    ('content/ielts-academic', '4. IELTS Academic', 'ielts'),
    # Everyday track: frequent words for everyday life, the most used first (see EVERYDAY_MIN_ZIPF).
    ('content/everyday', '3. Фразы на каждый день', 'everyday'),
    ('content/towards-b1', '4. Каждый день B1', 'everyday'),
    ('content/b1-level', '5. Каждый день B1+', 'everyday'),
    ('content/a2-confident', '6. Каждый день A2', 'everyday'),
    # Italian from zero, in the order of the textbook "Nuovo Progetto italiano 1"; the
    # Bologna and university words come right after unit 2.
    ('content/it/u00', 'Unità 0 · Benvenuti!', 'italian'),
    ('content/it/u01', 'Unità 1 · Un nuovo inizio', 'italian'),
    ('content/it/u02', 'Unità 2 · Tempo libero', 'italian'),
    ('content/it/bologna', 'Unità 2 · Tempo libero', 'italian'),
    ('content/it/u03', 'Unità 3 · Scrivere e telefonare', 'italian'),
    ('content/it/u04', 'Unità 4 · Al bar', 'italian'),
    ('content/it/u05', 'Unità 5 · Feste e viaggi', 'italian'),
    ('content/it/u06', 'Unità 6 · A cena fuori', 'italian'),
    ('content/it/u07', 'Unità 7 · Al cinema', 'italian'),
    ('content/it/u08', 'Unità 8 · Fare la spesa', 'italian'),
    ('content/it/u09', 'Unità 9 · In giro per i negozi', 'italian'),
    ('content/it/u10', "Unità 10 · Cosa c'è in TV?", 'italian'),
    ('content/it/u11', 'Unità 11 · Un concerto', 'italian'),
    # Spanish from zero: the student's own words first, then an A1–A2 course by topics.
    ('content/es/mis-palabras', '0. Mis palabras', 'spanish'),
    ('content/es/u01', 'Unidad 1 · Hola', 'spanish'),
    ('content/es/u02', 'Unidad 2 · Personas', 'spanish'),
    ('content/es/u03', 'Unidad 3 · La casa', 'spanish'),
    ('content/es/u04', 'Unidad 4 · El día a día', 'spanish'),
    ('content/es/u05', 'Unidad 5 · La comida', 'spanish'),
    ('content/es/u06', 'Unidad 6 · La ciudad', 'spanish'),
    ('content/es/u07', 'Unidad 7 · Ropa y compras', 'spanish'),
    ('content/es/u08', 'Unidad 8 · El cuerpo y la salud', 'spanish'),
    ('content/es/u09', 'Unidad 9 · El tiempo libre', 'spanish'),
    ('content/es/u10', 'Unidad 10 · Viajes', 'spanish'),
    ('content/es/u11', 'Unidad 11 · Trabajo y estudios', 'spanish'),
    ('content/es/u12', 'Unidad 12 · Sentimientos y opiniones', 'spanish'),
]
# Words an IELTS student already has from their first course.
IELTS_START = 'content/b1-core'
# First position of each track, so positions never clash.
FIRST_POSITION = {'beginner': 1, 'ielts': 10001, 'everyday': 20001, 'italian': 30001, 'spanish': 40001}
# Everyday track: words rarer than this Zipf frequency (wordfreq; 3.0 is roughly the 30 000
# most used English words; a phrase counts as its rarest word) are left out, as are the words
# in EVERYDAY_SKIP and whole topics that are not everyday talk (science, economy, ecology...).
EVERYDAY_MIN_ZIPF = 3.0
# Single words this frequent (just, because, busy, famous...) a B1 student already knows.
EVERYDAY_MAX_ZIPF = 5.0
EVERYDAY_SKIP = {
    'either ... or', 'neither ... nor', 'operating system', 'interest rate', 'exchange rate', 'invoice',
    'mortgage', 'dormitory', 'kilo', "butcher's", "florist's", 'touchscreen', 'enrol', 'memorise',
}
EVERYDAY_SKIP_TOPICS = {'Наука', 'Экономика', 'Экология', 'Культура и искусство'}
# Other correct answers accepted when typing (see starter_synonyms migration).
SYNONYMS = {
    'hello': 'hi, hey', 'goodbye': 'bye, bye-bye', 'thank you': 'thanks', 'mother': 'mom, mum, mommy, mummy',
    'father': 'dad, daddy', 'child': 'kid', 'color': 'colour', 'grey': 'gray', 'stomach': 'belly, tummy',
    'T-shirt': 'tshirt, tee', 'trousers': 'pants', 'sweater': 'jumper, pullover', 'sofa': 'couch', 'shop': 'store',
    'taxi': 'cab', 'plane': 'airplane, aeroplane', 'bicycle': 'bike', 'big': 'large', 'small': 'little',
    'fast': 'quick', 'difficult': 'hard', 'happy': 'glad', 'exam': 'test, examination', 'car': 'automobile',
}


def q(s: str) -> str:
    return "'" + s.replace("'", "''") + "'"


def words_in(folder: str) -> set[str]:
    out = set()
    for path in glob.glob(os.path.join(ROOT, folder, 'day-*.csv')):
        for line in open(path, encoding='utf-8').read().strip().split('\n')[1:]:
            out.add(line.split(';')[0].strip().lower())
    return out


def everyday_order(topics, skipped: list[str]):
    """Drops rare and too basic words and puts the most used first: topics by median frequency, then words."""
    from statistics import median

    from wordfreq import zipf_frequency

    def freq(word: str) -> float:
        # A phrase is as rare as its rarest word.
        return min(zipf_frequency(w, 'en') for w in word.replace('...', ' ').split())

    out = []
    for path, topic, entries in topics:
        if topic in EVERYDAY_SKIP_TOPICS:
            skipped.extend(f'rare:{fields[0]}' for fields in entries)
            continue
        kept = []
        for fields in entries:
            word = fields[0]
            if word.lower() in EVERYDAY_SKIP or freq(word) < EVERYDAY_MIN_ZIPF:
                skipped.append(f'rare:{word}')
                continue
            if ' ' not in word and freq(word) >= EVERYDAY_MAX_ZIPF:
                skipped.append(f'known:{word}')
                continue
            kept.append((freq(word), fields))
        if kept:
            kept.sort(key=lambda x: -x[0])
            out.append((median(f for f, _ in kept), path, topic, [fields for _, fields in kept]))
    out.sort(key=lambda x: -x[0])
    return [(path, topic, entries) for _, path, topic, entries in out]


def main() -> None:
    seen: dict[str, set[str]] = {'beginner': set(), 'ielts': words_in(IELTS_START), 'everyday': set(), 'italian': set(), 'spanish': set()}
    next_pos = dict(FIRST_POSITION)
    rows: list[tuple[str, str]] = []
    tsv: list[str] = []
    skipped: list[str] = []
    for folder, course, track in COURSES:
        if not os.path.isdir(os.path.join(ROOT, folder)):
            print(f'warning: {folder} is missing', file=sys.stderr)
            continue
        files = sorted(glob.glob(os.path.join(ROOT, folder, 'day-*.csv')), key=lambda f: int(f.rsplit('-', 1)[1][:-4]))
        topics: list[tuple[str, str, list[list[str]]]] = []
        for path in files:
            lines = open(path, encoding='utf-8').read().strip().split('\n')
            topic = lines[0].lstrip('#').split('|')[0].strip()
            entries = []
            for line in lines[1:]:
                fields = [f.strip() for f in line.split(';')]
                if len(fields) != 6 or not all(fields[:3]):
                    raise SystemExit(f'{path}: bad line: {line}')
                entries.append(fields)
            topics.append((path, topic, entries))
        if track == 'everyday':
            topics = everyday_order(topics, skipped)
        for path, topic, entries in topics:
            for fields in entries:
                line = ';'.join(fields)
                word, ru, az, example, ipa, pos = fields
                key = word.lower()
                if track == 'italian':
                    # "il libro" and "libro" are the same word.
                    key = re.sub(r"^(il|lo|la|i|gli|le)\s+|^l'", '', key)
                elif track == 'spanish':
                    # "¡hola!" and "hola" are the same word; the article stays, because
                    # "mañana" (tomorrow) and "la mañana" (morning) are two words.
                    key = key.strip('¡!¿?. ')
                if key in seen[track]:
                    skipped.append(f'{os.path.basename(folder)}/{os.path.basename(path)}:{word}')
                    continue
                seen[track].add(key)
                position = next_pos[track]
                next_pos[track] += 1
                values = [course, topic, word, ru, az, example, ipa, pos, SYNONYMS.get(word, '')]
                if '\t' in ''.join(values):
                    raise SystemExit(f'{path}: tab in line: {line}')
                tsv.append('\t'.join([str(position), *values, track]))
                rows.append((track, f"  ({position}, {', '.join(q(v) for v in values)})"))
    if skipped:
        print(f'skipped repeats: {", ".join(skipped)}', file=sys.stderr)
    print(f'{len(rows)} words', file=sys.stderr)
    if '--tsv' in sys.argv:
        print('\n'.join(tsv))
        return
    print('-- Generated by scripts/build_word_bank.py from content/*/day-*.csv. Do not edit by hand.')
    # Each track has its own table: word_bank (beginner), ielts_bank, everyday_bank, italian_bank, spanish_bank.
    tables = (
        ('beginner', 'word_bank'), ('ielts', 'ielts_bank'), ('everyday', 'everyday_bank'),
        ('italian', 'italian_bank'), ('spanish', 'spanish_bank'),
    )
    for track, table in tables:
        part = [r for t, r in rows if t == track]
        print(f'delete from public.{table};')
        if part:
            print(f'insert into public.{table} (position, course, topic, word, translation_ru, translation_az, example, ipa, pos, synonyms) values')
            print(',\n'.join(part) + ';')


if __name__ == '__main__':
    main()
