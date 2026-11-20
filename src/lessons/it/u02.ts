import type { Lesson } from '../types';

// Unit 2 "Come passi il tempo libero?": verbi irregolari, verbi modali, preposizioni semplici, giorni e ore.
export const lessons: Lesson[] = [
  {
    id: 'u02-irregolari',
    unit: 2,
    title: 'Неправильные глаголы в presente',
    goal: 'Уверенно спрягать andare, venire, fare, stare, dare, dire, uscire, sapere, bere, rimanere, salire, tenere.',
    sections: [
      {
        title: 'Короткие глаголы: andare, fare, stare, dare, sapere',
        text: `Самые частые глаголы — самые неправильные. Хорошая новость: у них общий «ритм».

**loro на -anno**: v**anno**, f**anno**, st**anno**, d**anno**, s**anno** — как h**anno** у avere. Запомните «пятёрку на -anno».

**voi почти всегда правильный**: andate, fate, state, date, sapete — образуется от инфинитива.

**andare** — «идти / ехать» (любым способом!): vado a piedi, vado in treno. Основа меняется: **vad-/va-** в io, tu, lui, loro и **and-** в noi, voi.
**fare** — «делать»: Che cosa fai? Faccio colazione (завтракаю), fa caldo (жарко).
**stare** — «находиться, чувствовать себя»: Come stai? — Sto bene.
**dare** — «давать». **dà** (даёт) пишется с ударением, чтобы отличать от предлога **da**.
**sapere** — «знать (факт), уметь»: Non so. Sai nuotare?`,
        tables: [
          {
            title: 'andare · fare · stare',
            head: ['', 'andare', 'fare', 'stare'],
            rows: [
              ['io', 'vado', 'faccio', 'sto'],
              ['tu', 'vai', 'fai', 'stai'],
              ['lui / lei', 'va', 'fa', 'sta'],
              ['noi', 'andiamo', 'facciamo', 'stiamo'],
              ['voi', 'andate', 'fate', 'state'],
              ['loro', 'vanno', 'fanno', 'stanno'],
            ],
          },
          {
            title: 'dare · sapere',
            head: ['', 'dare', 'sapere'],
            rows: [
              ['io', 'do', 'so'],
              ['tu', 'dai', 'sai'],
              ['lui / lei', 'dà', 'sa'],
              ['noi', 'diamo', 'sappiamo'],
              ['voi', 'date', 'sapete'],
              ['loro', 'danno', 'sanno'],
            ],
          },
        ],
        examples: [
          {
            it: 'Stasera andiamo al cinema. Vieni anche tu?',
            ru: 'Сегодня вечером мы идём в кино. Ты тоже пойдёшь?',
            az: 'Bu axşam kinoya gedirik. Sən də gəlirsən?',
          },
          {
            it: 'Che cosa fai nel tempo libero? — Faccio sport.',
            ru: 'Что ты делаешь в свободное время? — Занимаюсь спортом.',
            az: 'Boş vaxtında nə edirsən? — İdmanla məşğul oluram.',
          },
          {
            it: 'Sai dov’è la biblioteca? — No, non lo so.',
            ru: 'Знаешь, где библиотека? — Нет, не знаю.',
            az: 'Kitabxananın harada olduğunu bilirsən? — Xeyr, bilmirəm.',
          },
        ],
      },
      {
        title: 'Глаголы с -g-: venire, tenere, rimanere, salire',
        text: `У этой группы в **io** и **loro** появляется **-g-**: ven**g**o / ven**g**ono, ten**g**o / ten**g**ono, riman**g**o / riman**g**ono, sal**g**o / sal**g**ono.

Мнемоника: **«g живёт по краям»** — в первой и последней строке таблицы.

У **venire** и **tenere** ещё и **e → ie** под ударением в tu и lui: v**ie**ni, v**ie**ne; t**ie**ni, t**ie**ne. В noi/voi основа обычная: veniamo, venite.

**venire** — «приходить / приезжать» (к говорящему): Vengo da Baku. Vieni con noi?
**andare** — «уходить / идти туда». Русское «Я иду к тебе!» — по-итальянски **Vengo!** (движение к собеседнику).
**rimanere** — «оставаться», **salire** — «подниматься, садиться (в автобус)», **tenere** — «держать».`,
        tables: [
          {
            title: 'venire · tenere',
            head: ['', 'venire', 'tenere'],
            rows: [
              ['io', 'vengo', 'tengo'],
              ['tu', 'vieni', 'tieni'],
              ['lui / lei', 'viene', 'tiene'],
              ['noi', 'veniamo', 'teniamo'],
              ['voi', 'venite', 'tenete'],
              ['loro', 'vengono', 'tengono'],
            ],
          },
          {
            title: 'rimanere · salire',
            head: ['', 'rimanere', 'salire'],
            rows: [
              ['io', 'rimango', 'salgo'],
              ['tu', 'rimani', 'sali'],
              ['lui / lei', 'rimane', 'sale'],
              ['noi', 'rimaniamo', 'saliamo'],
              ['voi', 'rimanete', 'salite'],
              ['loro', 'rimangono', 'salgono'],
            ],
          },
        ],
        examples: [
          {
            it: "Vengo all'università in bici.",
            ru: 'Я приезжаю в университет на велосипеде.',
            az: 'Universitetə velosipedlə gəlirəm.',
          },
          {
            it: 'Sabato rimango a casa e studio.',
            ru: 'В субботу я остаюсь дома и учусь.',
            az: 'Şənbə günü evdə qalıram və dərs oxuyuram.',
          },
          {
            it: 'Saliamo sulla torre degli Asinelli?',
            ru: 'Поднимемся на башню Азинелли?',
            az: 'Asinelli qülləsinə qalxaq?',
          },
        ],
      },
      {
        title: 'dire, uscire, bere',
        text: `Эти три глагола спрягаются от «старой» основы:

**dire** (говорить, сказать) ← dicere: **dic-**: dico, dici, dice, diciamo, dicono. Только voi — **dite**.
**bere** (пить) ← bevere: **bev-** во всех формах, и дальше как обычный -ere: bevo, bevi, beve, beviamo, bevete, bevono.
**uscire** (выходить): под ударением **esc-**, без ударения **usc-**: esco, esci, esce, escono, но usciamo, uscite.

Мнемоника для uscire: в «ботинке» (io, tu, lui, loro) — **e**, снаружи (noi, voi) — **u**, как в инфинитиве.

Не путайте: **dire** = сказать (Dico di sì), **parlare** = говорить, разговаривать (Parlo con Marco).`,
        tables: [
          {
            title: 'dire · uscire · bere',
            head: ['', 'dire', 'uscire', 'bere'],
            rows: [
              ['io', 'dico', 'esco', 'bevo'],
              ['tu', 'dici', 'esci', 'bevi'],
              ['lui / lei', 'dice', 'esce', 'beve'],
              ['noi', 'diciamo', 'usciamo', 'beviamo'],
              ['voi', 'dite', 'uscite', 'bevete'],
              ['loro', 'dicono', 'escono', 'bevono'],
            ],
          },
        ],
        examples: [
          {
            it: 'Il venerdì sera esco con i miei amici.',
            ru: 'По пятницам вечером я гуляю с друзьями.',
            az: 'Cümə günləri axşam dostlarımla çölə çıxıram.',
          },
          {
            it: 'Che cosa bevete? — Beviamo uno spritz.',
            ru: 'Что вы пьёте? — Мы пьём шприц.',
            az: 'Nə içirsiniz? — Spritz içirik.',
          },
          {
            it: 'Come si dice «спасибо» in italiano? — Si dice «grazie».',
            ru: 'Как сказать «спасибо» по-итальянски? — «Grazie».',
            az: '«Sağ ol» italyanca necə deyilir? — «Grazie» deyilir.',
          },
        ],
      },
    ],
    drills: [
      { prompt: 'andare · io', answer: 'vado', hint: 'io vado.' },
      { prompt: 'andare · loro', answer: 'vanno', hint: 'Пятёрка на -anno: vanno.' },
      { prompt: 'andare · noi', answer: 'andiamo', hint: 'В noi основа and-.' },
      { prompt: 'fare · io', answer: 'faccio', hint: 'Двойное cc: faccio.' },
      { prompt: 'fare · voi', answer: 'fate', hint: 'voi fate (не «facete»).' },
      { prompt: 'stare · tu', answer: 'stai', hint: 'Come stai?' },
      { prompt: 'dare · lui', answer: 'dà', hint: 'С ударением, чтобы отличать от предлога da.' },
      { prompt: 'sapere · noi', answer: 'sappiamo', hint: 'Двойное pp: sappiamo.' },
      { prompt: 'venire · tu', answer: 'vieni', hint: 'e → ie: vieni.' },
      { prompt: 'venire · loro', answer: 'vengono', hint: '-g- по краям: vengono.' },
      { prompt: 'tenere · io', answer: 'tengo', hint: '-g- в io: tengo.' },
      { prompt: 'rimanere · loro', answer: 'rimangono', hint: '-g- в loro: rimangono.' },
      { prompt: 'salire · io', answer: 'salgo', hint: '-g- в io: salgo.' },
      { prompt: 'dire · noi', answer: 'diciamo', hint: 'Основа dic-: diciamo.' },
      { prompt: 'dire · voi', answer: 'dite', hint: 'Единственная форма без dic-: dite.' },
      { prompt: 'uscire · lei', answer: 'esce', hint: 'Под ударением esc-: esce.' },
      { prompt: 'uscire · noi', answer: 'usciamo', hint: 'noi — снаружи «ботинка»: usc-.' },
      { prompt: 'bere · loro', answer: 'bevono', hint: 'Основа bev-: bevono.' },
      { prompt: "Io ___ (venire) all'università in bici.", answer: 'vengo', hint: 'venire · io.' },
      { prompt: 'Ragazzi, che cosa ___ (fare) stasera?', answer: 'fate', hint: 'fare · voi.' },
    ],
  },
  {
    id: 'u02-modali',
    unit: 2,
    title: 'Модальные глаголы: potere, volere, dovere',
    goal: 'Говорить, что вы можете, хотите и должны сделать: «Devo studiare», «Posso entrare?».',
    sections: [
      {
        title: 'Формы',
        text: `Три глагола, без которых не прожить дня:
- **potere** — мочь (есть возможность, разрешение): Posso entrare?
- **volere** — хотеть: Voglio un caffè.
- **dovere** — быть должным: Devo studiare.

Все три **неправильные**. Обратите внимание:
- potere: **po-/pu-** → posso, puoi, può (с ударением!), possono.
- volere: **vogl-** в io, noi, loro (voglio, vogliamo, vogliono) — звук [ль]; **vu-** в tu, lui (vuoi, vuole).
- dovere: **dev-** в io, tu, lui, loro; **dobbiamo** — запомнить отдельно!

**voi правильный** у всех трёх: potete, volete, dovete.`,
        tables: [
          {
            title: 'potere · volere · dovere',
            head: ['', 'potere', 'volere', 'dovere'],
            rows: [
              ['io', 'posso', 'voglio', 'devo'],
              ['tu', 'puoi', 'vuoi', 'devi'],
              ['lui / lei', 'può', 'vuole', 'deve'],
              ['noi', 'possiamo', 'vogliamo', 'dobbiamo'],
              ['voi', 'potete', 'volete', 'dovete'],
              ['loro', 'possono', 'vogliono', 'devono'],
            ],
          },
        ],
      },
      {
        title: 'Модальный глагол + инфинитив',
        text: `После модального глагола идёт **инфинитив без предлога**: Devo **andare**, posso **venire**, voglio **mangiare**. Никаких «devo di andare» или «voglio a mangiare»!

**Отрицание** — перед модальным глаголом: **Non posso** venire stasera.

**volere** с существительным — «хочу что-то»: Voglio una pizza. В баре и магазине вежливее сказать **vorrei** («я бы хотел»): Vorrei un cappuccino, per favore. «Voglio» продавцу звучит грубовато.

**potere или sapere?** «Уметь» (навык) — **sapere**: So nuotare. «Мочь» (обстоятельства) — **potere**: Oggi non posso nuotare, piove.

Вежливая просьба: **Può** ripetere, per favore? (Lei) / **Puoi** ripetere? (tu).`,
        examples: [
          {
            it: 'Stasera non posso uscire: devo studiare.',
            ru: 'Сегодня вечером я не могу пойти гулять: мне нужно заниматься.',
            az: 'Bu axşam çölə çıxa bilmərəm: dərs oxumalıyam.',
          },
          {
            it: 'Vuoi prendere un caffè con me?',
            ru: 'Хочешь выпить со мной кофе?',
            az: 'Mənimlə qəhvə içmək istəyirsən?',
          },
          {
            it: 'Dobbiamo essere in aula alle nove.',
            ru: 'Мы должны быть в аудитории в девять.',
            az: 'Saat doqquzda auditoriyada olmalıyıq.',
          },
          {
            it: 'Professoressa, può ripetere, per favore?',
            ru: 'Профессор, можете повторить, пожалуйста?',
            az: 'Müəllimə, zəhmət olmasa, təkrar edə bilərsiniz?',
          },
        ],
      },
    ],
    drills: [
      { prompt: 'potere · io', answer: 'posso', hint: 'Двойное ss: posso.' },
      { prompt: 'potere · tu', answer: 'puoi', hint: 'tu puoi.' },
      { prompt: 'potere · lei', answer: 'può', hint: 'С ударением: può.' },
      { prompt: 'potere · loro', answer: 'possono', hint: 'Ударение на первый слог: POS-so-no.' },
      { prompt: 'volere · io', answer: 'voglio', hint: 'gli = [ль]: voglio.' },
      { prompt: 'volere · tu', answer: 'vuoi', hint: 'tu vuoi.' },
      { prompt: 'volere · lui', answer: 'vuole', hint: 'lui vuole.' },
      { prompt: 'volere · noi', answer: 'vogliamo', hint: 'noi vogliamo.' },
      { prompt: 'dovere · io', answer: 'devo', hint: 'Основа dev-.' },
      { prompt: 'dovere · noi', answer: 'dobbiamo', hint: 'Особая форма: dobbiamo.' },
      { prompt: 'dovere · loro', answer: 'devono', hint: 'Основа dev-: devono.' },
      { prompt: 'dovere · voi', answer: 'dovete', hint: 'voi правильный: dovete.' },
      { prompt: 'Stasera io non ___ (potere) uscire.', answer: 'posso', hint: 'potere · io.' },
      { prompt: 'Marco ___ (dovere) studiare per l’esame.', answer: 'deve', hint: 'dovere · lui.' },
      { prompt: 'Ragazzi, ___ (volere) venire al bar?', answer: 'volete', hint: 'volere · voi.' },
      { prompt: 'Signora, ___ (potere) ripetere, per favore?', answer: 'può', hint: 'Lei → форма 3 л.: può.' },
      { prompt: 'Al bar, вежливо: ___ un cappuccino, per favore.', answer: 'vorrei', hint: 'Вежливое «я бы хотел» — vorrei.' },
      { prompt: 'Io ___ nuotare. (умею плавать)', answer: 'so', hint: 'Уметь (навык) — sapere: so.' },
    ],
  },
  {
    id: 'u02-preposizioni',
    unit: 2,
    title: 'Простые предлоги: di, a, da, in, con, su, per, tra/fra',
    goal: 'Правильно говорить «в Болонье», «в Италии», «к Марко», «на поезде», «из Баку».',
    sections: [
      {
        title: 'Город или страна? a и in',
        text: `**a** + **город**: abito **a** Bologna, vado **a** Roma, sono **a** Baku.
**in** + **страна, регион, остров**: abito **in** Italia, vado **in** Emilia-Romagna, **in** Azerbaigian, **in** Russia.

Мнемоника: **«a — маленькая буква для маленького места, in — для большого»**.

Важно: в итальянском **один и тот же предлог** для «где» и «куда»: Sono a Bologna (я в Болонье) — Vado a Bologna (еду в Болонью).

**a** без артикля в устойчивых выражениях: **a casa, a scuola, a letto, a teatro, a lezione, a piedi**, a pranzo, a cena.
**in** без артикля: **in biblioteca, in banca, in centro, in piazza, in ufficio, in mensa, in montagna, in vacanza** (много слов на -ia/-eria: in pizzeria, in libreria).
**Транспорт** — **in**: in treno, in autobus, in bici, in macchina. Но **a piedi** (пешком)!`,
        tables: [
          {
            title: 'a или in',
            head: ['a', 'in'],
            rows: [
              ['a Bologna, a Baku', 'in Italia, in Azerbaigian'],
              ['a casa, a scuola, a letto', 'in biblioteca, in banca, in centro'],
              ['a teatro, a lezione', 'in piazza, in ufficio, in mensa'],
              ['a piedi', 'in treno, in bici, in autobus'],
            ],
          },
        ],
        examples: [
          {
            it: 'Abito a Bologna, ma la mia famiglia è in Azerbaigian.',
            ru: 'Я живу в Болонье, а моя семья в Азербайджане.',
            az: 'Mən Bolonyada yaşayıram, ailəm isə Azərbaycandadır.',
          },
          {
            it: 'Oggi vado in biblioteca in bici, non a piedi.',
            ru: 'Сегодня я еду в библиотеку на велосипеде, а не пешком.',
            az: 'Bu gün kitabxanaya piyada yox, velosipedlə gedirəm.',
          },
        ],
      },
      {
        title: 'di и da',
        text: `**di** — «из» (происхождение с essere), «чей», «о чём»:
- Sono **di** Baku (я родом из Баку).
- Il libro **di** Marco (книга Марко).
- Una lezione **di** italiano, un bicchiere **di** vino.

**da** — «от, из (откуда движение)», «к (кому-то)», «с (какого времени)»:
- Vengo **da** Baku (приезжаю из Баку). Сравните: **sono di** Baku, но **vengo da** Baku!
- Vado **da** Marco (иду к Марко домой), vado **dal** medico (к врачу) — **«к человеку» всегда da**, не a!
- Studio italiano **da** tre mesi (уже три месяца — действие продолжается, глагол в настоящем).

Типичная ошибка: «Vado a Marco». Правильно: **Vado da Marco**.`,
        examples: [
          {
            it: 'Sono di Baku, ma vengo da Mosca.',
            ru: 'Я родом из Баку, но приехал из Москвы.',
            az: 'Mən Bakıdanam, amma Moskvadan gəlirəm.',
          },
          {
            it: 'Stasera andiamo da Giulia a cena.',
            ru: 'Сегодня вечером мы идём ужинать к Джулии.',
            az: 'Bu axşam şama Culiyagilə gedirik.',
          },
          {
            it: 'Studio italiano da due mesi.',
            ru: 'Я учу итальянский уже два месяца.',
            az: 'İki aydır italyan dilini öyrənirəm.',
          },
        ],
      },
      {
        title: 'con, su, per, tra/fra',
        text: `**con** — «с»: Esco **con** gli amici. Un caffè **con** latte.
**su** — «на (поверхности)», «о (теме)»: Il libro è **sul** tavolo; un film **su** Bologna.
**per** — «для», «чтобы», «на (срок)», «в направлении»: Un regalo **per** te. Studio **per** l’esame. Parto **per** Roma (уезжаю в Рим). Resto **per** due settimane.
**tra / fra** — «между» и «через (время)»: **tra** la stazione e il centro; la lezione comincia **tra** dieci minuti. Tra и fra — полные синонимы, выбирают по благозвучию (fra tre giorni, но tra fratelli).

Ловушка: «через 10 минут» — **tra** dieci minuti, а не «dopo dieci minuti».`,
        examples: [
          {
            it: 'Tra mezz’ora vado al bar con Luca.',
            ru: 'Через полчаса я иду в бар с Лукой.',
            az: 'Yarım saatdan sonra Luka ilə bara gedirəm.',
          },
          {
            it: 'Domani parto per Firenze per tre giorni.',
            ru: 'Завтра я уезжаю во Флоренцию на три дня.',
            az: 'Sabah üç günlüyə Florensiyaya gedirəm.',
          },
        ],
      },
    ],
    drills: [
      { prompt: 'Abito ___ Bologna.', answer: 'a', hint: 'Город → a.' },
      { prompt: 'Studio ___ Italia.', answer: 'in', hint: 'Страна → in.' },
      { prompt: 'Sono ___ Baku. (родом)', answer: 'di', hint: 'essere di + город (происхождение).' },
      { prompt: 'Vengo ___ Baku. (приезжаю)', answer: 'da', hint: 'venire da — движение «откуда».' },
      { prompt: 'Stasera vado ___ Marco.', answer: 'da', hint: '«К человеку» — da.' },
      { prompt: 'Torno ___ casa alle sei.', answer: 'a', hint: 'a casa — без артикля.' },
      { prompt: 'Oggi studio ___ biblioteca.', answer: 'in', hint: 'in biblioteca.' },
      { prompt: "Vado all'università ___ bici.", answer: 'in', hint: 'Транспорт — in.' },
      { prompt: 'Vado a lezione ___ piedi.', answer: 'a', hint: 'Пешком — a piedi.' },
      { prompt: 'Esco ___ gli amici.', answer: 'con', hint: '«с» — con.' },
      { prompt: 'Il libro ___ Marco è nuovo. (книга Марко)', answer: 'di', hint: 'Принадлежность — di.' },
      { prompt: 'Studio italiano ___ tre mesi. (уже три месяца)', answer: 'da', hint: 'Действие длится с прошлого до сейчас — da.' },
      { prompt: 'La lezione comincia ___ dieci minuti. (через)', answer: 'tra', also: ['fra'], hint: '«Через (время)» — tra / fra.' },
      { prompt: 'Questo caffè è ___ te.', answer: 'per', hint: '«Для» — per.' },
      { prompt: 'Domani parto ___ Roma.', answer: 'per', hint: 'partire per + место назначения.' },
      { prompt: 'La mia famiglia abita ___ Azerbaigian.', answer: 'in', hint: 'Страна → in.' },
      { prompt: 'Bologna è ___ Milano e Firenze. (между)', answer: 'tra', also: ['fra'], hint: '«Между» — tra / fra.' },
      { prompt: 'Lavoro ___ centro.', answer: 'in', hint: 'in centro — без артикля.' },
    ],
  },
  {
    id: 'u02-ore',
    unit: 2,
    title: 'Дни недели, время, числа до 2000, порядковые',
    goal: 'Спросить и сказать, какой сегодня день и который час, назвать любое число до 2000.',
    sections: [
      {
        title: 'Дни недели',
        text: `**lunedì, martedì, mercoledì, giovedì, venerdì, sabato, domenica.** Пишутся **с маленькой буквы**. Все мужского рода, кроме **la domenica**.

Названия с понедельника по пятницу кончаются на **-dì** («день», с ударением!) — они не меняются во множественном.

**Che giorno è oggi?** — Oggi è martedì.
**lunedì** (без артикля) = в этот понедельник: Lunedì ho un esame.
**il lunedì** (с артиклем) = по понедельникам, каждый понедельник: Il lunedì vado in palestra.
Предлог «в» перед днём **не нужен**: «в субботу» = sabato (не «in sabato»).`,
        examples: [
          {
            it: 'Il sabato mattina dormo fino a tardi.',
            ru: 'По субботам утром я сплю допоздна.',
            az: 'Şənbə səhərləri gec saata qədər yatıram.',
          },
          {
            it: 'Che giorno è oggi? — Oggi è giovedì.',
            ru: 'Какой сегодня день? — Сегодня четверг.',
            az: 'Bu gün həftənin hansı günüdür? — Bu gün cümə axşamıdır.',
          },
        ],
      },
      {
        title: 'Который час?',
        text: `Спросить можно двумя способами: **Che ora è?** или **Che ore sono?** — оба правильны.

Отвечаем: **Sono le** + число (часы — женского рода мн. ч.: le ore): Sono le tre, sono le otto.
Три исключения в **единственном числе**: **È l’una** (час), **È mezzogiorno** (полдень), **È mezzanotte** (полночь).

Минуты: **e** (плюс) или **meno** (минус):
- 8:15 — sono le otto **e un quarto** (или e quindici)
- 8:30 — sono le otto **e mezza** (или e mezzo, e trenta)
- 8:45 — sono le nove **meno un quarto** (или le otto e quarantacinque)
- 8:50 — sono le nove **meno dieci**

**В котором часу?** — **A che ora?** — **Alle** otto, **all’**una, **a** mezzogiorno. С… до… — **dalle** nove **alle** tredici.

В расписаниях используют 24 часа: il treno parte alle 18:40 (diciotto e quaranta).`,
        tables: [
          {
            title: 'Время',
            head: ['', 'Che ore sono?', 'A che ora?'],
            rows: [
              ['1:00', 'È l’una.', 'all’una'],
              ['12:00', 'È mezzogiorno.', 'a mezzogiorno'],
              ['3:00', 'Sono le tre.', 'alle tre'],
              ['7:15', 'Sono le sette e un quarto.', 'alle sette e un quarto'],
              ['7:30', 'Sono le sette e mezza.', 'alle sette e mezza'],
              ['7:45', 'Sono le otto meno un quarto.', 'alle otto meno un quarto'],
            ],
          },
        ],
        examples: [
          {
            it: 'A che ora comincia la lezione? — Alle nove e mezza.',
            ru: 'Во сколько начинается занятие? — В половине десятого.',
            az: 'Dərs saat neçədə başlayır? — Doqquz yarımda.',
          },
          {
            it: 'La biblioteca è aperta dalle otto alle ventitré.',
            ru: 'Библиотека открыта с восьми до двадцати трёх.',
            az: 'Kitabxana saat səkkizdən iyirmi üçə qədər açıqdır.',
          },
        ],
      },
      {
        title: 'Числа до 2000 и порядковые',
        text: `**Десятки**: 30 trenta, 40 quaranta, 50 cinquanta, 60 sessanta, 70 settanta, 80 ottanta, 90 novanta, 100 cento.
Как и с venti, перед **uno** и **otto** конечная гласная выпадает: trent**uno**, quarant**otto**. С **tre** — ударение: trentatré.

**Сотни**: 200 duecento, 300 trecento… **cento** не меняется. 101 centouno, 180 centottanta.
**Тысячи**: 1000 **mille**, но 2000 **duemila** (мн. ч. — mila!). 1999 — millenovecentonovantanove: числа пишутся **одним словом**.

**Порядковые**: primo, secondo, terzo, quarto, quinto, sesto, settimo, ottavo, nono, decimo. Дальше — отбрасываем гласную и добавляем **-esimo**: undicesimo, ventesimo, centesimo (у ventitré e сохраняется: ventitreesimo).
Порядковые — **прилагательные**, согласуются: il prim**o** giorno, la prim**a** lezione, le prim**e** settimane.`,
        tables: [
          {
            title: 'Порядковые числительные',
            head: ['', 'м.', 'ж.'],
            rows: [
              ['1°', 'primo', 'prima'],
              ['2°', 'secondo', 'seconda'],
              ['3°', 'terzo', 'terza'],
              ['4°', 'quarto', 'quarta'],
              ['5°', 'quinto', 'quinta'],
              ['10°', 'decimo', 'decima'],
            ],
          },
        ],
        examples: [
          {
            it: "L'Università di Bologna è nata nel 1088: milleottantotto!",
            ru: 'Болонский университет основан в 1088 году!',
            az: 'Bolonya Universiteti 1088-ci ildə yaranıb!',
          },
          {
            it: 'Abito al terzo piano, in via Zamboni 45.',
            ru: 'Я живу на третьем этаже, на виа Дзамбони, 45.',
            az: 'Zamboni küçəsi 45-də, üçüncü mərtəbədə yaşayıram.',
          },
        ],
      },
    ],
    drills: [
      { prompt: 'Che ore sono? (3:00)', answer: 'sono le tre', hint: 'Sono le + число.' },
      { prompt: 'Che ore sono? (1:00)', answer: "è l'una", hint: 'Час — единственное число: È l’una.' },
      { prompt: 'Che ore sono? (12:00, день)', answer: 'è mezzogiorno', hint: 'Полдень — mezzogiorno, глагол è.' },
      { prompt: 'Che ore sono? (8:30)', answer: 'sono le otto e mezza', also: ['sono le otto e mezzo', 'sono le otto e trenta'], hint: 'Половина — e mezza.' },
      { prompt: 'Che ore sono? (9:15)', answer: 'sono le nove e un quarto', also: ['sono le nove e quindici'], hint: 'Четверть — un quarto.' },
      { prompt: 'Che ore sono? (6:45)', answer: 'sono le sette meno un quarto', also: ['sono le sei e quarantacinque'], hint: 'Без четверти семь — le sette meno un quarto.' },
      { prompt: 'La lezione comincia ___ dieci.', answer: 'alle', hint: 'В котором часу — alle.' },
      { prompt: 'Il film comincia ___ una.', answer: "all'", hint: 'a + l’ = all’una.' },
      { prompt: 'Che giorno è oggi? Oggi ___ giovedì.', answer: 'è', hint: 'Oggi è + день.' },
      { prompt: 'День после lunedì', answer: 'martedì', hint: 'lunedì → martedì.' },
      { prompt: 'День после venerdì', answer: 'sabato', hint: 'venerdì → sabato.' },
      { prompt: 'Число: 45', answer: 'quarantacinque', hint: 'quaranta + cinque.' },
      { prompt: 'Число: 68', answer: 'sessantotto', hint: 'Перед otto гласная выпадает: sessantotto.' },
      { prompt: 'Число: 100', answer: 'cento', hint: '100 = cento.' },
      { prompt: 'Число: 250', answer: 'duecentocinquanta', hint: 'Одним словом: duecento + cinquanta.' },
      { prompt: 'Число: 2000', answer: 'duemila', hint: 'Во множественном — mila.' },
      { prompt: 'Число: 1999', answer: 'millenovecentonovantanove', hint: 'mille + novecento + novanta + nove.' },
      { prompt: 'Порядковое: 3°', answer: 'terzo', hint: '3° = terzo.' },
      { prompt: 'La ___ (1ª) lezione è facile.', answer: 'prima', hint: 'Женский род: prima.' },
      { prompt: 'Abito al ___ (5°) piano.', answer: 'quinto', hint: '5° = quinto.' },
    ],
  },
];
