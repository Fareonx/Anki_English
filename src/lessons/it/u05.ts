import type { Lesson } from '../types';

// Unit 5 "Feste e viaggi": futuro semplice, futuro composto.
export const lessons: Lesson[] = [
  {
    id: 'u05-futuro',
    unit: 5,
    title: 'Будущее время — futuro semplice',
    goal: 'Говорить о планах и предположениях: «Domani andrò a Firenze», «Sarà a casa».',
    sections: [
      {
        title: 'Правильные глаголы',
        text: `Futuro строится от инфинитива: отбрасываем последнюю **-e** и добавляем окончания **-ò, -ai, -à, -emo, -ete, -anno**. Окончания одинаковы для всех трёх спряжений.

Важная деталь: у глаголов на **-are** гласная **a** превращается в **e**: parl**a**re → parl**e**rò (а не «parlarò»). Глаголы на -ere и -ire сохраняют свою гласную: prend**e**rò, dorm**i**rò.

**Ударение всегда на окончании** в io и lui/lei: parlerò, parlerà — графический акцент обязателен! Без него «parlera» — ошибка.

Подсказка-мнемоника: окончания futuro — это почти формы avere в presente: (h)o, (h)ai, (h)a, (abbi)amo… → -ò, -ai, -à. Будущее = «инфинитив + имею».`,
        tables: [
          {
            title: 'parlare · prendere · partire',
            head: ['', 'parlare', 'prendere', 'partire'],
            rows: [
              ['io', 'parlerò', 'prenderò', 'partirò'],
              ['tu', 'parlerai', 'prenderai', 'partirai'],
              ['lui / lei', 'parlerà', 'prenderà', 'partirà'],
              ['noi', 'parleremo', 'prenderemo', 'partiremo'],
              ['voi', 'parlerete', 'prenderete', 'partirete'],
              ['loro', 'parleranno', 'prenderanno', 'partiranno'],
            ],
          },
          {
            title: 'Орфография: -care/-gare, -ciare/-giare',
            head: ['инфинитив', 'io', 'почему'],
            rows: [
              ['cercare', 'cercherò', '+h, чтобы сохранить звук [к]'],
              ['pagare', 'pagherò', '+h, чтобы сохранить звук [г]'],
              ['mangiare', 'mangerò', 'i больше не нужна: ge = [дже]'],
              ['cominciare', 'comincerò', 'i больше не нужна: ce = [че]'],
            ],
          },
        ],
        examples: [
          {
            it: 'Sabato prenderemo il treno per Firenze.',
            ru: 'В субботу мы поедем поездом во Флоренцию.',
            az: 'Şənbə günü Florensiyaya qatarla gedəcəyik.',
          },
          {
            it: 'Chi pagherà il conto stasera?',
            ru: 'Кто заплатит по счёту сегодня вечером?',
            az: 'Bu axşam hesabı kim ödəyəcək?',
          },
          {
            it: "L'anno prossimo studierò Medicina a Bologna.",
            ru: 'В следующем году я буду учиться на медицинском в Болонье.',
            az: 'Gələn il Bolonyada tibb oxuyacağam.',
          },
        ],
      },
      {
        title: 'Неправильные глаголы',
        text: `Окончания у неправильных глаголов те же, меняется только **основа**. Выучите основу — и весь глагол готов.

**Три группы, чтобы легче запомнить:**
1. Основа «без гласной»: andare → **andr-**, avere → **avr-**, dovere → **dovr-**, potere → **potr-**, sapere → **sapr-**, vedere → **vedr-**, vivere → **vivr-**.
2. Двойная **rr**: volere → **vorr-**, venire → **verr-**, rimanere → **rimarr-**, bere → **berr-**.
3. Короткие глаголы сохраняют **a**: fare → **far-**, stare → **star-**, dare → **dar-**; dire → **dir-**. И особый essere → **sar-**.

Типичная ошибка: «anderò», «poterò», «venirò». Правильно: **andrò, potrò, verrò**.`,
        tables: [
          {
            title: 'essere · avere · andare · fare',
            head: ['', 'essere', 'avere', 'andare', 'fare'],
            rows: [
              ['io', 'sarò', 'avrò', 'andrò', 'farò'],
              ['tu', 'sarai', 'avrai', 'andrai', 'farai'],
              ['lui / lei', 'sarà', 'avrà', 'andrà', 'farà'],
              ['noi', 'saremo', 'avremo', 'andremo', 'faremo'],
              ['voi', 'sarete', 'avrete', 'andrete', 'farete'],
              ['loro', 'saranno', 'avranno', 'andranno', 'faranno'],
            ],
          },
          {
            title: 'venire · volere · potere · dovere',
            head: ['', 'venire', 'volere', 'potere', 'dovere'],
            rows: [
              ['io', 'verrò', 'vorrò', 'potrò', 'dovrò'],
              ['tu', 'verrai', 'vorrai', 'potrai', 'dovrai'],
              ['lui / lei', 'verrà', 'vorrà', 'potrà', 'dovrà'],
              ['noi', 'verremo', 'vorremo', 'potremo', 'dovremo'],
              ['voi', 'verrete', 'vorrete', 'potrete', 'dovrete'],
              ['loro', 'verranno', 'vorranno', 'potranno', 'dovranno'],
            ],
          },
          {
            title: 'Остальные: форма io (дальше по образцу)',
            head: ['инфинитив', 'io', 'loro'],
            rows: [
              ['stare', 'starò', 'staranno'],
              ['dare', 'darò', 'daranno'],
              ['dire', 'dirò', 'diranno'],
              ['sapere', 'saprò', 'sapranno'],
              ['vedere', 'vedrò', 'vedranno'],
              ['vivere', 'vivrò', 'vivranno'],
              ['bere', 'berrò', 'berranno'],
              ['rimanere', 'rimarrò', 'rimarranno'],
            ],
          },
        ],
        examples: [
          {
            it: 'Per Capodanno andremo a Roma e faremo una festa.',
            ru: 'На Новый год мы поедем в Рим и устроим вечеринку.',
            az: 'Yeni ildə Romaya gedəcəyik və şənlik edəcəyik.',
          },
          {
            it: 'Verrai alla festa di Giulia?',
            ru: 'Ты придёшь на вечеринку к Джулии?',
            az: 'Culiyanın şənliyinə gələcəksən?',
          },
          {
            it: 'Rimarrò a Bologna per tutta l’estate.',
            ru: 'Я останусь в Болонье на всё лето.',
            az: 'Bütün yay Bolonyada qalacağam.',
          },
        ],
      },
      {
        title: 'Когда употреблять futuro',
        text: `1. **Планы и прогнозы:** Domani pioverà. L'anno prossimo vivrò da solo.

В разговоре о ближайшем будущем итальянцы часто используют **presente**: «Stasera vado al cinema». Это нормально и не ошибка.

2. **Предположение о настоящем** (русское «наверное»): — Dov'è Marco? — **Sarà** a casa. (= Наверное, он дома.) — Che ore sono? — **Saranno** le otto. (= Сейчас, наверное, около восьми.)

3. **Условие I типа (реальное):** **Se** + presente/futuro, futuro/presente. «Se piove, resto a casa» = «Se pioverà, resterò a casa». Оба варианта правильные; главное — логика: реальное условие в будущем.

Ошибка русскоязычных: после **se** и **quando** в будущем смысле итальянцы спокойно ставят futuro: «Quando arriverò, ti chiamerò» (в русском тоже «когда приеду»).`,
        examples: [
          {
            it: 'Non risponde al telefono: sarà in biblioteca.',
            ru: 'Не отвечает на телефон — наверное, он в библиотеке.',
            az: 'Telefona cavab vermir: yəqin kitabxanadadır.',
          },
          {
            it: 'Se domani farà bel tempo, andremo ai Giardini Margherita.',
            ru: 'Если завтра будет хорошая погода, пойдём в парк Маргерита.',
            az: 'Sabah hava yaxşı olsa, Marqerita bağına gedəcəyik.',
          },
          {
            it: 'Quanti anni ha il professore? — Avrà cinquant’anni.',
            ru: 'Сколько лет профессору? — Наверное, лет пятьдесят.',
            az: 'Professor neçə yaşındadır? — Yəqin əlli yaşı var.',
          },
        ],
      },
    ],
    drills: [
      { prompt: '(futuro) parlare · io', answer: 'parlerò', hint: '-are → -er-: parl-er-ò' },
      { prompt: '(futuro) prendere · noi', answer: 'prenderemo', hint: 'prender- + -emo' },
      { prompt: '(futuro) partire · loro', answer: 'partiranno', hint: 'partir- + -anno' },
      { prompt: '(futuro) cercare · tu', answer: 'cercherai', hint: '-care → -cher-' },
      { prompt: '(futuro) pagare · voi', answer: 'pagherete', hint: '-gare → -gher-' },
      { prompt: '(futuro) mangiare · lui', answer: 'mangerà', hint: 'i исчезает: manger-' },
      { prompt: '(futuro) essere · noi', answer: 'saremo', hint: 'основа sar-' },
      { prompt: '(futuro) avere · loro', answer: 'avranno', hint: 'основа avr-' },
      { prompt: '(futuro) andare · io', answer: 'andrò', hint: 'основа andr- (не «anderò»)' },
      { prompt: '(futuro) fare · tu', answer: 'farai', hint: 'основа far-' },
      { prompt: '(futuro) venire · lei', answer: 'verrà', hint: 'основа verr-' },
      { prompt: '(futuro) volere · voi', answer: 'vorrete', hint: 'основа vorr-' },
      { prompt: '(futuro) potere · io', answer: 'potrò', hint: 'основа potr-' },
      { prompt: '(futuro) sapere · noi', answer: 'sapremo', hint: 'основа sapr-' },
      { prompt: '(futuro) bere · loro', answer: 'berranno', hint: 'основа berr-' },
      { prompt: '(futuro) rimanere · io', answer: 'rimarrò', hint: 'основа rimarr-' },
      { prompt: '(futuro) dire · tu', answer: 'dirai', hint: 'основа dir-' },
      { prompt: '— Dov’è Luca? — Non lo so, ___ (essere) in mensa.', answer: 'sarà', hint: 'предположение → futuro: sarà' },
      { prompt: 'Se domani piove, (noi, rimanere) ___ a casa.', answer: 'rimarremo', also: ['rimaniamo'], hint: 'futuro: rimarremo (можно и presente)' },
      { prompt: '(futuro) vedere · voi', answer: 'vedrete', hint: 'основа vedr-' },
    ],
  },
  {
    id: 'u05-futuro-composto',
    unit: 5,
    title: 'Предбудущее — futuro composto',
    goal: 'Говорить о действии, которое завершится до другого в будущем: «Quando avrò finito, uscirò».',
    sections: [
      {
        title: 'Образование',
        text: `Futuro composto = **futuro от essere/avere + participio passato**. Выбор вспомогательного глагола — как в passato prossimo: ho mangiato → **avrò mangiato**; sono partito → **sarò partito**.

С **essere** причастие согласуется с подлежащим: Giulia sarà arrivat**a**, i ragazzi saranno partit**i**.

Подсказка: просто «переведите» passato prossimo в будущее — ho → avrò, sono → sarò.`,
        tables: [
          {
            title: 'finire (avere) · arrivare (essere)',
            head: ['', 'finire', 'arrivare'],
            rows: [
              ['io', 'avrò finito', 'sarò arrivato/a'],
              ['tu', 'avrai finito', 'sarai arrivato/a'],
              ['lui / lei', 'avrà finito', 'sarà arrivato/a'],
              ['noi', 'avremo finito', 'saremo arrivati/e'],
              ['voi', 'avrete finito', 'sarete arrivati/e'],
              ['loro', 'avranno finito', 'saranno arrivati/e'],
            ],
          },
        ],
      },
      {
        title: 'Употребление',
        text: `1. **Действие, которое закончится раньше другого будущего действия.** Обычно после **quando, dopo che, appena** (как только): «**Quando avrò finito** l'esame, **andrò** in vacanza». Сначала закончу (futuro composto), потом поеду (futuro semplice).

2. **Предположение о прошлом** (русское «наверное, уже…»): «Marco non è venuto: **avrà perso** il treno» = наверное, опоздал на поезд. «Sono le dieci, Anna **sarà già uscita**».

Сравните: «Sarà a casa» — наверное, он дома (сейчас). «Sarà tornato a casa» — наверное, он вернулся домой (уже).

Типичная ошибка: «Quando finirò, andrò…» — грамматически допустимо, но если важно, что действие **уже будет завершено**, нужен futuro composto.`,
        examples: [
          {
            it: 'Appena avrò trovato casa, ti darò il mio nuovo indirizzo.',
            ru: 'Как только найду жильё, дам тебе свой новый адрес.',
            az: 'Ev tapan kimi sənə yeni ünvanımı verəcəyəm.',
          },
          {
            it: 'Dopo che avremo mangiato, faremo una passeggiata in Piazza Maggiore.',
            ru: 'После того как поедим, прогуляемся по Пьяцца Маджоре.',
            az: 'Yeməkdən sonra Macore meydanında gəzəcəyik.',
          },
          {
            it: 'Giulia non risponde: sarà già partita per Napoli.',
            ru: 'Джулия не отвечает: наверное, она уже уехала в Неаполь.',
            az: 'Culiya cavab vermir: yəqin artıq Napoliyə yola düşüb.',
          },
          {
            it: 'Il treno avrà avuto un ritardo.',
            ru: 'Наверное, поезд опоздал.',
            az: 'Yəqin qatar gecikib.',
          },
        ],
      },
    ],
    drills: [
      { prompt: '(futuro composto) finire · io', answer: 'avrò finito', hint: 'avrò + finito' },
      { prompt: '(futuro composto) mangiare · noi', answer: 'avremo mangiato', hint: 'avremo + mangiato' },
      { prompt: '(futuro composto) arrivare · lei', answer: 'sarà arrivata', hint: 'essere + согласование: arrivata' },
      { prompt: '(futuro composto) partire · loro (ragazzi)', answer: 'saranno partiti', hint: 'saranno + partiti' },
      { prompt: '(futuro composto) fare · tu', answer: 'avrai fatto', hint: 'fare → fatto' },
      { prompt: '(futuro composto) scrivere · voi', answer: 'avrete scritto', hint: 'scrivere → scritto' },
      { prompt: '(futuro composto) tornare · io (Marco)', answer: 'sarò tornato', hint: 'sarò + tornato' },
      { prompt: '(futuro composto) leggere · lui', answer: 'avrà letto', hint: 'leggere → letto' },
      { prompt: '(futuro composto) uscire · noi (ragazze)', answer: 'saremo uscite', hint: 'женский мн.ч.: uscite' },
      { prompt: '(futuro composto) vedere · loro', answer: 'avranno visto', also: ['avranno veduto'], hint: 'vedere → visto' },
      { prompt: 'Quando (io, finire) ___ gli esami, andrò al mare.', answer: 'avrò finito', hint: 'сначала закончу → futuro composto' },
      { prompt: 'Appena (noi, arrivare) ___ a Bologna, ti chiameremo.', answer: 'saremo arrivati', also: ['saremo arrivate'], hint: 'arrivare → essere: saremo arrivati' },
      { prompt: 'Marco non è qui: (perdere) ___ l’autobus.', answer: 'avrà perso', hint: 'предположение о прошлом: avrà perso' },
      { prompt: 'Dopo che (tu, leggere) ___ il libro, me lo presti?', answer: 'avrai letto', hint: 'avrai + letto' },
      { prompt: 'Sono le undici: Anna (andare) ___ già a letto.', answer: 'sarà andata', hint: 'essere + andata (Anna — ж.р.)' },
    ],
  },
];
