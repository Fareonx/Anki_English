#!/usr/bin/env python3
"""Builds src/lessons/it/verbs.ts: conjugations of the main verbs of "Nuovo Progetto
italiano 1" for the verb trainer. The forms come from verbecc (pip install verbecc);
the verb list, translations and the unit where each tense is taught are kept here.

    python3 scripts/build_verbs.py > src/lessons/it/verbs.ts
"""

import json
import logging

logging.disable(logging.CRITICAL)
from verbecc import CompleteConjugator  # noqa: E402

# (infinitive, Russian, Azerbaijani, group shown in the trainer)
VERBS = [
    ('essere', 'быть', 'olmaq', 'irregular'),
    ('avere', 'иметь', 'malik olmaq, var olmaq', 'irregular'),
    ('chiamarsi', 'называться, зваться', 'adlanmaq', 'reflexive'),
    ('parlare', 'говорить', 'danışmaq', 'are'),
    ('lavorare', 'работать', 'işləmək', 'are'),
    ('abitare', 'жить, проживать', 'yaşamaq, qalmaq', 'are'),
    ('studiare', 'учиться, изучать', 'oxumaq, öyrənmək', 'are'),
    ('mangiare', 'есть, кушать', 'yemək', 'are'),
    ('cercare', 'искать', 'axtarmaq', 'are'),
    ('pagare', 'платить', 'ödəmək', 'are'),
    ('comprare', 'покупать', 'almaq (satın)', 'are'),
    ('arrivare', 'приезжать, прибывать', 'gəlmək, çatmaq', 'are'),
    ('tornare', 'возвращаться', 'qayıtmaq', 'are'),
    ('aspettare', 'ждать', 'gözləmək', 'are'),
    ('prendere', 'брать', 'götürmək, almaq', 'ere'),
    ('leggere', 'читать', 'oxumaq', 'ere'),
    ('scrivere', 'писать', 'yazmaq', 'ere'),
    ('vivere', 'жить', 'yaşamaq', 'ere'),
    ('vedere', 'видеть', 'görmək', 'ere'),
    ('mettere', 'класть, ставить', 'qoymaq', 'ere'),
    ('chiedere', 'спрашивать, просить', 'soruşmaq, xahiş etmək', 'ere'),
    ('rispondere', 'отвечать', 'cavab vermək', 'ere'),
    ('conoscere', 'знать (кого-то), знакомиться', 'tanımaq', 'ere'),
    ('dormire', 'спать', 'yatmaq', 'ire'),
    ('partire', 'уезжать', 'yola düşmək', 'ire'),
    ('sentire', 'слышать, чувствовать', 'eşitmək, hiss etmək', 'ire'),
    ('aprire', 'открывать', 'açmaq', 'ire'),
    ('capire', 'понимать', 'başa düşmək', 'isc'),
    ('finire', 'заканчивать', 'bitirmək', 'isc'),
    ('preferire', 'предпочитать', 'üstün tutmaq', 'isc'),
    ('andare', 'идти, ехать', 'getmək', 'irregular'),
    ('venire', 'приходить, приезжать', 'gəlmək', 'irregular'),
    ('fare', 'делать', 'etmək, eləmək', 'irregular'),
    ('stare', 'находиться, быть (о состоянии)', 'olmaq, qalmaq', 'irregular'),
    ('dare', 'давать', 'vermək', 'irregular'),
    ('dire', 'говорить, сказать', 'demək', 'irregular'),
    ('uscire', 'выходить', 'çıxmaq', 'irregular'),
    ('sapere', 'знать, уметь', 'bilmək', 'irregular'),
    ('bere', 'пить', 'içmək', 'irregular'),
    ('rimanere', 'оставаться', 'qalmaq', 'irregular'),
    ('potere', 'мочь', 'bacarmaq, ola bilmək', 'modal'),
    ('volere', 'хотеть', 'istəmək', 'modal'),
    ('dovere', 'быть должным', 'məcbur olmaq, -malı olmaq', 'modal'),
    ('alzarsi', 'вставать', 'qalxmaq, durmaq', 'reflexive'),
    ('svegliarsi', 'просыпаться', 'oyanmaq', 'reflexive'),
    ('vestirsi', 'одеваться', 'geyinmək', 'reflexive'),
    ('divertirsi', 'веселиться, развлекаться', 'əylənmək', 'reflexive'),
]

# Tense id -> (verbecc mood, verbecc tense, unit of the textbook where it is taught).
TENSES = {
    'presente': ('indicativo', 'presente', 1),
    'passato': ('indicativo', 'passato-prossimo', 4),
    'futuro': ('indicativo', 'futuro', 5),
    'imperfetto': ('indicativo', 'imperfetto', 7),
    'condizionale': ('condizionale', 'presente', 11),
}
PERSONS = ['io', 'tu', 'lui', 'noi', 'voi', 'loro']
# Archaic or literary variants verbecc lists next to the usual form; a learner never needs them.
ARCHAIC = {'fo', 'vò', 'vo', 'debbo', 'debbono', 'rimaso', 'rimasa', 'rimasi', 'rimase'}
PRONOUN_PREFIX = ('io ', 'tu ', 'lui ', 'lei ', 'noi ', 'voi ', 'loro ')


def strip(form: str) -> str:
    for p in PRONOUN_PREFIX:
        if form.startswith(p):
            return form[len(p):]
    return form


def cell(rows: list[dict], person: str) -> list[str]:
    """All forms for a person: variants ("devo/debbo") and both genders, masculine first."""
    forms: list[tuple[int, str]] = []
    for r in rows:
        # "lui" stands for lui/lei: è andato, è andata.
        if r['pr'] != person and not (person == 'lui' and r['pr'] == 'lei'):
            continue
        feminine = 1 if r.get('g') == 'f' else 0
        for c in r['c']:
            for variant in strip(c).split('/'):
                variant = variant.strip()
                if variant not in ARCHAIC:
                    forms.append((feminine, variant))
    out: list[str] = []
    for _, f in sorted(forms, key=lambda x: x[0]):
        if f not in out:
            out.append(f)
    return out


def main() -> None:
    conj = CompleteConjugator('it')
    out = []
    for inf, ru, az, group in VERBS:
        moods = json.loads(str(conj.conjugate(inf)))['moods']
        tenses = {}
        for tid, (mood, tense, _) in TENSES.items():
            rows = moods[mood][tense]
            tenses[tid] = [cell(rows, p) for p in PERSONS]
        if group == 'modal':
            # potere, volere, dovere have no imperative in everyday Italian.
            tenses['imperativo'] = [[], [], [], [], [], []]
        elif group == 'reflexive':
            # The pronoun is joined to the end: alza + ti = alzati, alziamoci, alzatevi.
            base = json.loads(str(conj.conjugate(inf[:-2] + 'e')))['moods']['imperativo']['affermativo']
            tenses['imperativo'] = [
                [], [f + 'ti' for f in cell(base, 'tu')], [], [f + 'ci' for f in cell(base, 'noi')],
                [f + 'vi' for f in cell(base, 'voi')], [],
            ]
        else:
            imp = moods['imperativo']['affermativo']
            # "fa" next to "fa'": only the apostrophe form is right in the imperative.
            tu = [f for f in cell(imp, 'tu') if f + "'" not in cell(imp, 'tu')]
            tenses['imperativo'] = [[], tu, [], cell(imp, 'noi'), cell(imp, 'voi'), []]
        out.append({'inf': inf, 'ru': ru, 'az': az, 'group': group, 'forms': tenses})
    units = {tid: unit for tid, (_, _, unit) in TENSES.items()}
    units['imperativo'] = 10
    print('// Generated by scripts/build_verbs.py (forms from verbecc). Do not edit by hand.')
    print("import type { Verb, TenseId } from './verbTypes';\n")
    print(f'export const TENSE_UNIT: Record<TenseId, number> = {json.dumps(units, ensure_ascii=False)};\n')
    print('export const VERBS: Verb[] = [')
    for v in out:
        forms = ',\n'.join(f'      {t}: {json.dumps(cells, ensure_ascii=False)}' for t, cells in v['forms'].items())
        head = json.dumps({k: v[k] for k in ('inf', 'ru', 'az', 'group')}, ensure_ascii=False)[1:-1]
        print(f'  {{ {head},\n    forms: {{\n{forms},\n    }},\n  }},')
    print('];')


if __name__ == '__main__':
    main()
