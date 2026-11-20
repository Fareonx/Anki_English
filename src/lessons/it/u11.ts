import type { Lesson } from '../types';

// Unit 11 "Un concerto": condizionale semplice e composto, futuro nel passato.
export const lessons: Lesson[] = [
  {
    id: 'u11-condizionale',
    unit: 11,
    title: 'Условное наклонение — condizionale semplice',
    goal: 'Вежливо просить, мечтать и советовать: «Vorrei un biglietto», «Dovresti riposarti».',
    sections: [
      {
        title: 'Правильные глаголы',
        text: `Condizionale — это русское «**бы**»: parlerei = я говорил **бы**.

**Основа та же, что в futuro!** parler-ò → parler-**ei**; prender-ò → prender-**ei**; partir-ò → partir-**ei**. Если вы знаете futuro — вы уже знаете половину condizionale.

Окончания: **-ei, -esti, -ebbe, -emmo, -este, -ebbero**.

Те же орфографические правила: cercare → cer**ch**erei, pagare → pa**gh**erei, mangiare → mang**e**rei.

**Не путайте** noi: futuro parler**emo** (одна m) — condizionale parler**emmo** (две m). Одна буква меняет смысл: «будем говорить» vs «говорили бы».`,
        tables: [
          {
            title: 'parlare · prendere · partire',
            head: ['', 'parlare', 'prendere', 'partire'],
            rows: [
              ['io', 'parlerei', 'prenderei', 'partirei'],
              ['tu', 'parleresti', 'prenderesti', 'partiresti'],
              ['lui / lei', 'parlerebbe', 'prenderebbe', 'partirebbe'],
              ['noi', 'parleremmo', 'prenderemmo', 'partiremmo'],
              ['voi', 'parlereste', 'prendereste', 'partireste'],
              ['loro', 'parlerebbero', 'prenderebbero', 'partirebbero'],
            ],
          },
        ],
      },
      {
        title: 'Неправильные — те же основы, что в futuro',
        text: `Ничего нового учить не надо: берём **основу futuro** и добавляем окончания condizionale.
sar-ò → **sarei**; avr-ò → **avrei**; andr-ò → **andrei**; far-ò → **farei**; vorr-ò → **vorrei**; potr-ò → **potrei**; dovr-ò → **dovrei**; verr-ò → **verrei**; berr-ò → **berrei**; sapr-ò → **saprei**; vedr-ò → **vedrei**; vivr-ò → **vivrei**; rimarr-ò → **rimarrei**; star-ò → **starei**; dar-ò → **darei**; dir-ò → **direi**.

Ошибка: «volerei», «poterei», «anderei». Правильно: **vorrei, potrei, andrei**.`,
        tables: [
          {
            title: 'essere · avere · volere · potere · dovere',
            head: ['', 'essere', 'avere', 'volere', 'potere', 'dovere'],
            rows: [
              ['io', 'sarei', 'avrei', 'vorrei', 'potrei', 'dovrei'],
              ['tu', 'saresti', 'avresti', 'vorresti', 'potresti', 'dovresti'],
              ['lui / lei', 'sarebbe', 'avrebbe', 'vorrebbe', 'potrebbe', 'dovrebbe'],
              ['noi', 'saremmo', 'avremmo', 'vorremmo', 'potremmo', 'dovremmo'],
              ['voi', 'sareste', 'avreste', 'vorreste', 'potreste', 'dovreste'],
              ['loro', 'sarebbero', 'avrebbero', 'vorrebbero', 'potrebbero', 'dovrebbero'],
            ],
          },
          {
            title: 'andare · fare · venire · bere',
            head: ['', 'andare', 'fare', 'venire', 'bere'],
            rows: [
              ['io', 'andrei', 'farei', 'verrei', 'berrei'],
              ['tu', 'andresti', 'faresti', 'verresti', 'berresti'],
              ['lui / lei', 'andrebbe', 'farebbe', 'verrebbe', 'berrebbe'],
              ['noi', 'andremmo', 'faremmo', 'verremmo', 'berremmo'],
              ['voi', 'andreste', 'fareste', 'verreste', 'berreste'],
              ['loro', 'andrebbero', 'farebbero', 'verrebbero', 'berrebbero'],
            ],
          },
        ],
      },
      {
        title: 'Когда употреблять',
        text: `1. **Вежливая просьба:** «**Vorrei** due biglietti per il concerto», «**Potrebbe** ripetere, per favore?», «Mi **daresti** una mano?»
2. **Желание, мечта:** «**Andrei** volentieri al concerto di Vasco», «Che bello, **vivrei** sempre a Bologna!»
3. **Совет:** «**Dovresti** dormire di più» (тебе бы следовало), «Al posto tuo **prenderei** il treno» (на твоём месте я бы…).
4. **Мнение, смягчение:** «**Direi** che è una buona idea», «Io **preferirei** restare».
5. **Непроверенная информация** (как в новостях, «якобы»): «Il cantante **sarebbe** malato» — Певец, по слухам, болен.

Мнемоника: condizionale = «смягчитель». Хотите звучать вежливо — переводите глагол в condizionale: voglio → vorrei, puoi → potresti.`,
        examples: [
          {
            it: 'Vorrei due biglietti per il concerto di sabato, per favore.',
            ru: 'Мне бы два билета на концерт в субботу, пожалуйста.',
            az: 'Şənbə günkü konsertə iki bilet istərdim, zəhmət olmasa.',
          },
          {
            it: 'Scusi, potrebbe dirmi dov’è l’ingresso?',
            ru: 'Извините, не могли бы Вы сказать, где вход?',
            az: 'Bağışlayın, girişin harada olduğunu deyə bilərdinizmi?',
          },
          {
            it: 'Sei stanco: dovresti andare a letto presto.',
            ru: 'Ты устал: тебе бы лечь спать пораньше.',
            az: 'Yorğunsan: tez yatmalısan.',
          },
          {
            it: 'Con più soldi, andremmo a tutti i concerti dell’estate.',
            ru: 'Будь у нас больше денег, мы бы ходили на все летние концерты.',
            az: 'Daha çox pulumuz olsaydı, yayın bütün konsertlərinə gedərdik.',
          },
        ],
      },
    ],
    drills: [
      { prompt: '(condizionale) parlare · io', answer: 'parlerei', hint: 'основа futuro parler- + -ei' },
      { prompt: '(condizionale) prendere · tu', answer: 'prenderesti', hint: 'prender- + -esti' },
      { prompt: '(condizionale) partire · lui', answer: 'partirebbe', hint: 'partir- + -ebbe' },
      { prompt: '(condizionale) mangiare · noi', answer: 'mangeremmo', hint: 'manger- + -emmo (две m)' },
      { prompt: '(condizionale) pagare · voi', answer: 'paghereste', hint: 'pagher- + -este' },
      { prompt: '(condizionale) volere · io', answer: 'vorrei', hint: 'основа vorr-' },
      { prompt: '(condizionale) potere · lei', answer: 'potrebbe', hint: 'основа potr-' },
      { prompt: '(condizionale) dovere · tu', answer: 'dovresti', hint: 'основа dovr-' },
      { prompt: '(condizionale) essere · noi', answer: 'saremmo', hint: 'основа sar- + -emmo' },
      { prompt: '(condizionale) avere · loro', answer: 'avrebbero', hint: 'основа avr- + -ebbero' },
      { prompt: '(condizionale) andare · io', answer: 'andrei', hint: 'основа andr-' },
      { prompt: '(condizionale) fare · voi', answer: 'fareste', hint: 'основа far-' },
      { prompt: '(condizionale) venire · loro', answer: 'verrebbero', hint: 'основа verr-' },
      { prompt: '(condizionale) bere · io', answer: 'berrei', hint: 'основа berr-' },
      { prompt: '(condizionale) sapere · tu', answer: 'sapresti', hint: 'основа sapr-' },
      { prompt: '(condizionale) stare · lui', answer: 'starebbe', hint: 'основа star-' },
      { prompt: 'Scusi, (potere, Lei) ___ aiutarmi?', answer: 'potrebbe', hint: 'вежливая просьба → potrebbe' },
      { prompt: 'Sei sempre stanco: (dovere, tu) ___ dormire di più.', answer: 'dovresti', hint: 'совет → dovresti' },
      { prompt: '(volere, io, вежливо) ___ un posto in prima fila.', answer: 'Vorrei', hint: 'вежливо → vorrei' },
      { prompt: 'Al posto tuo (io, rimanere) ___ a casa.', answer: 'rimarrei', hint: 'основа rimarr-' },
    ],
  },
  {
    id: 'u11-condizionale-composto',
    unit: 11,
    title: 'Condizionale composto; будущее в прошлом',
    goal: 'Говорить о несбывшемся: «Sarei venuto, ma…» и передавать чужие обещания: «Ha detto che sarebbe venuto».',
    sections: [
      {
        title: 'Образование и «несбывшееся»',
        text: `Condizionale composto = **condizionale от essere/avere + participio passato**: avrei comprato, sarei andato/a.

Вспомогательный глагол и согласование — как в passato prossimo: «Anna **sarebbe venuta**», «I ragazzi **sarebbero rimasti**».

Главный смысл — **желание или возможность в прошлом, которые не осуществились**: «**Sarei andato** al concerto, **ma** non avevo il biglietto» (я бы пошёл, но…). Часто рядом стоит **ma**.

Русское «я бы хотел (тогда)» → «**avrei voluto**»; «тебе следовало бы» → «**avresti dovuto**»: «**Avresti dovuto** dirmelo prima!» (Надо было сказать мне раньше!)`,
        tables: [
          {
            title: 'comprare (avere) · andare (essere)',
            head: ['', 'comprare', 'andare'],
            rows: [
              ['io', 'avrei comprato', 'sarei andato/a'],
              ['tu', 'avresti comprato', 'saresti andato/a'],
              ['lui / lei', 'avrebbe comprato', 'sarebbe andato/a'],
              ['noi', 'avremmo comprato', 'saremmo andati/e'],
              ['voi', 'avreste comprato', 'sareste andati/e'],
              ['loro', 'avrebbero comprato', 'sarebbero andati/e'],
            ],
          },
        ],
        examples: [
          {
            it: 'Sarei venuto al concerto, ma dovevo studiare.',
            ru: 'Я бы пришёл на концерт, но мне надо было заниматься.',
            az: 'Konsertə gələrdim, amma dərs oxumalı idim.',
          },
          {
            it: 'Avrei voluto comprare i biglietti, ma erano finiti.',
            ru: 'Я хотел купить билеты, но они закончились.',
            az: 'Biletləri almaq istəyirdim, amma qurtarmışdı.',
          },
          {
            it: 'Avresti dovuto vedere il concerto: era fantastico!',
            ru: 'Тебе надо было видеть этот концерт: он был потрясающий!',
            az: 'O konserti görməli idin: möhtəşəm idi!',
          },
        ],
      },
      {
        title: 'Будущее в прошлом',
        text: `Когда пересказываем **в прошлом** чьи-то слова о будущем, итальянец использует **condizionale composto** (а не semplice, как можно подумать!):

«Marco dice: “Verrò”» → «Marco **ha detto** che **sarebbe venuto**».
По-русски: «Марко сказал, что придёт» — русский оставляет будущее, а итальянский требует **sarebbe venuto**.

Ошибка русскоязычных: «Ha detto che verrà» (в разговоре встречается, но грамматически правильно — **sarebbe venuto**) и «Ha detto che verrebbe» (неправильно!).

Схема: **ha detto / ha scritto / pensavo / sapevo che** + condizionale composto.`,
        examples: [
          {
            it: 'Giulia ha detto che sarebbe arrivata alle otto, ma non è ancora qui.',
            ru: 'Джулия сказала, что придёт в восемь, но её ещё нет.',
            az: 'Culiya saat səkkizdə gələcəyini dedi, amma hələ burada deyil.',
          },
          {
            it: 'Pensavo che il concerto sarebbe finito prima.',
            ru: 'Я думал, что концерт закончится раньше.',
            az: 'Düşünürdüm ki, konsert daha tez bitəcək.',
          },
          {
            it: 'Mi avevi promesso che mi avresti aiutato!',
            ru: 'Ты же обещал, что поможешь мне!',
            az: 'Mənə kömək edəcəyinə söz vermişdin!',
          },
        ],
      },
    ],
    drills: [
      { prompt: '(condizionale composto) comprare · io', answer: 'avrei comprato', hint: 'avrei + comprato' },
      { prompt: '(condizionale composto) andare · tu', answer: 'saresti andato', also: ['saresti andata'], hint: 'saresti + andato/a' },
      { prompt: '(condizionale composto) venire · lei', answer: 'sarebbe venuta', hint: 'essere → venuta' },
      { prompt: '(condizionale composto) fare · noi', answer: 'avremmo fatto', hint: 'avremmo + fatto' },
      { prompt: '(condizionale composto) volere · voi', answer: 'avreste voluto', hint: 'avreste + voluto' },
      { prompt: '(condizionale composto) dovere · tu', answer: 'avresti dovuto', hint: 'avresti + dovuto' },
      { prompt: '(condizionale composto) partire · loro (ragazzi)', answer: 'sarebbero partiti', hint: 'sarebbero + partiti' },
      { prompt: '(condizionale composto) restare · io (Anna)', answer: 'sarei restata', also: ['sarei rimasta'], hint: 'ж.р. → restata' },
      { prompt: '(condizionale composto) vedere · lui', answer: 'avrebbe visto', also: ['avrebbe veduto'], hint: 'vedere → visto' },
      { prompt: '(condizionale composto) bere · noi', answer: 'avremmo bevuto', hint: 'bere → bevuto' },
      { prompt: '(Io) ___ (venire) volentieri, ma ero malato.', answer: 'sarei venuto', hint: 'несбывшееся → sarei venuto' },
      { prompt: '(Tu) ___ (dovere) dirmelo prima!', answer: 'avresti dovuto', hint: 'упрёк → avresti dovuto' },
      { prompt: 'Marco ha detto che ___ (venire) alla festa.', answer: 'sarebbe venuto', hint: 'будущее в прошлом → condizionale composto' },
      { prompt: 'Le ragazze hanno scritto che ___ (arrivare) domani.', answer: 'sarebbero arrivate', hint: 'ж.р. мн. → arrivate' },
      { prompt: 'Pensavo che tu ___ (capire).', answer: 'avresti capito', hint: 'pensavo che + condizionale composto' },
      { prompt: 'Mi hai promesso che ___ (comprare) i biglietti!', answer: 'avresti comprato', hint: 'tu → avresti comprato' },
      { prompt: 'Sapevo che il concerto ___ (essere) bellissimo.', answer: 'sarebbe stato', hint: 'essere → sarebbe stato' },
    ],
  },
];
