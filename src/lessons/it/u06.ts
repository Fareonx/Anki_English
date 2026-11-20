import type { Lesson } from '../types';

// Unit 6 "A cena fuori": possessivi, piacere, quello/bello, volerci/metterci.
export const lessons: Lesson[] = [
  {
    id: 'u06-possessivi',
    unit: 6,
    title: 'Притяжательные: полная таблица и семья',
    goal: 'Правильно говорить «мой, твой, их…» и знать, когда с родственниками нет артикля.',
    sections: [
      {
        title: 'Полная таблица',
        text: `Притяжательное слово согласуется **с предметом, а не с владельцем**: «la sua macchina» — это и «его машина», и «её машина» (macchina — ж.р.). Как русское «свой»: смотрим на то, чем владеют.

Обычно перед притяжательным стоит **артикль**: il mio libro, la tua casa, i nostri amici.

**loro** — неизменяемое: il loro professore, la loro casa, i loro amici, le loro amiche.

Вежливое **Suo** (Ваш) пишется с большой буквы в письмах: «Signora, ecco il Suo caffè».`,
        tables: [
          {
            title: 'Притяжательные с артиклем',
            head: ['', 'м.р. ед.', 'ж.р. ед.', 'м.р. мн.', 'ж.р. мн.'],
            rows: [
              ['io', 'il mio', 'la mia', 'i miei', 'le mie'],
              ['tu', 'il tuo', 'la tua', 'i tuoi', 'le tue'],
              ['lui / lei / Lei', 'il suo', 'la sua', 'i suoi', 'le sue'],
              ['noi', 'il nostro', 'la nostra', 'i nostri', 'le nostre'],
              ['voi', 'il vostro', 'la vostra', 'i vostri', 'le vostre'],
              ['loro', 'il loro', 'la loro', 'i loro', 'le loro'],
            ],
          },
        ],
        examples: [
          {
            it: 'Marco ha perso le sue chiavi.',
            ru: 'Марко потерял свои ключи.',
            az: 'Marko açarlarını itirib.',
          },
          {
            it: 'Anna e Paolo mi hanno invitato a casa loro: la loro cucina è fantastica.',
            ru: 'Анна и Паоло пригласили меня к себе: их кухня потрясающая.',
            az: 'Anna və Paolo məni evlərinə dəvət etdilər: onların mətbəxi əladır.',
          },
          {
            it: 'Questi sono i miei compagni di corso.',
            ru: 'Это мои однокурсники.',
            az: 'Bunlar mənim kurs yoldaşlarımdır.',
          },
        ],
      },
      {
        title: 'Родственники: когда без артикля',
        text: `С названиями родственников **в единственном числе без определений** артикль **не ставится**: **mio** padre, **mia** madre, **tuo** fratello, **sua** sorella, **nostro** zio.

Артикль **возвращается**, если:
1. **множественное число:** **i miei** genitori, **le mie** sorelle, **i tuoi** cugini;
2. есть **прилагательное** или **уменьшительная** форма: **la mia** sorella maggiore, **il mio** fratellino, **la mia** nonnina;
3. ласковые слова **mamma, papà** — обычно с артиклем: **la mia** mamma, **il mio** papà;
4. **loro** — всегда с артиклем: **il loro** padre, **la loro** madre.

Мнемоника: «Одна близкая родня — без артикля. Много, ласково, с прилагательным или «loro» — с артиклем».`,
        tables: [
          {
            title: 'Сравните',
            head: ['без артикля', 'с артиклем'],
            rows: [
              ['mio padre', 'i miei genitori'],
              ['mia sorella', 'la mia sorella minore'],
              ['tuo fratello', 'il tuo fratellino'],
              ['sua madre', 'la sua mamma'],
              ['nostro nonno', 'il loro nonno'],
            ],
          },
        ],
        examples: [
          {
            it: 'Mia madre vive a Baku, mio fratello studia a Mosca.',
            ru: 'Моя мама живёт в Баку, мой брат учится в Москве.',
            az: 'Anam Bakıda yaşayır, qardaşım Moskvada oxuyur.',
          },
          {
            it: 'I miei genitori verranno a Bologna a Natale.',
            ru: 'Мои родители приедут в Болонью на Рождество.',
            az: 'Valideynlərim Milad bayramında Bolonyaya gələcəklər.',
          },
          {
            it: 'Il loro figlio fa l’Erasmus a Bologna.',
            ru: 'Их сын учится в Болонье по Эразмусу.',
            az: 'Onların oğlu Bolonyada Erasmus proqramı ilə oxuyur.',
          },
        ],
      },
    ],
    drills: [
      { prompt: '___ libro (io)', answer: 'il mio', hint: 'м.р. ед.: il mio' },
      { prompt: '___ amiche (tu)', answer: 'le tue', hint: 'ж.р. мн.: le tue' },
      { prompt: '___ amici (io)', answer: 'i miei', hint: 'м.р. мн.: i miei' },
      { prompt: 'Lucia e ___ fratello (lei)', answer: 'suo', hint: 'родственник в ед.ч. — без артикля' },
      { prompt: 'Marco e ___ macchina (lui)', answer: 'la sua', hint: 'согласуем с macchina (ж.р.)' },
      { prompt: '___ madre (io) è medico.', answer: 'Mia', hint: 'родственник в ед.ч. — без артикля' },
      { prompt: '___ genitori (io) abitano a Baku.', answer: 'I miei', hint: 'мн.ч. — с артиклем' },
      { prompt: '___ padre (loro) è italiano.', answer: 'Il loro', hint: 'loro — всегда с артиклем' },
      { prompt: '___ sorella maggiore (tu) studia?', answer: 'La tua', hint: 'есть прилагательное → артикль' },
      { prompt: '___ mamma (io) cucina benissimo.', answer: 'La mia', also: ['Mia'], hint: 'mamma — обычно с артиклем' },
      { prompt: '___ professori (noi) sono simpatici.', answer: 'I nostri', hint: 'м.р. мн.: i nostri' },
      { prompt: '___ casa (voi) è vicino all’università?', answer: 'La vostra', hint: 'ж.р. ед.: la vostra' },
      { prompt: '___ cugini (lui) vivono a Napoli.', answer: 'I suoi', hint: 'мн.ч. → i suoi' },
      { prompt: '___ fratellino (io) ha sei anni.', answer: 'Il mio', hint: 'уменьшительное → артикль' },
      { prompt: 'Signora, questo è ___ cappotto (Lei)?', answer: 'il Suo', also: ['il suo'], hint: 'вежливое Lei → il Suo' },
    ],
  },
  {
    id: 'u06-piacere',
    unit: 6,
    title: 'Mi piace / mi piacciono; vorrei; preferire',
    goal: 'Говорить, что нравится, что хочется заказать и что предпочитаешь.',
    sections: [
      {
        title: 'Как устроен piacere',
        text: `Piacere работает **как русское «нравится»**: подлежащее — то, что нравится, а человек стоит в дательном падеже (**мне** нравится).

**Mi piace** + ед.ч. или инфинитив: mi piace la pizza, mi piace cucinare.
**Mi piacciono** + мн.ч.: mi piacciono i tortellini.

Ошибка №1: «Io piaccio la pizza» — неверно! Это значит «я нравлюсь пицце».
Ошибка №2: «Mi piace i tortellini» — нужно **piacciono**.

С именем или ударной формой используется предлог **a**: **A Marco** piace il calcio. **A me** piace il caffè, **e a te**? — **Anche a me** / **A me no**.

Отрицание: **Non mi piace** il pesce.`,
        tables: [
          {
            title: 'Кому нравится',
            head: ['безударная', 'ударная', '+ ед.ч.', '+ мн.ч.'],
            rows: [
              ['mi', 'a me', 'mi piace', 'mi piacciono'],
              ['ti', 'a te', 'ti piace', 'ti piacciono'],
              ['gli', 'a lui', 'gli piace', 'gli piacciono'],
              ['le', 'a lei', 'le piace', 'le piacciono'],
              ['Le', 'a Lei', 'Le piace', 'Le piacciono'],
              ['ci', 'a noi', 'ci piace', 'ci piacciono'],
              ['vi', 'a voi', 'vi piace', 'vi piacciono'],
              ['gli', 'a loro', 'gli piace', 'gli piacciono'],
            ],
          },
        ],
        examples: [
          {
            it: 'Mi piacciono molto le tagliatelle al ragù.',
            ru: 'Мне очень нравится тальятелле с рагу.',
            az: 'Raqulu talyatelle mənim çox xoşuma gəlir.',
          },
          {
            it: 'A Sara non piace il pesce, ma le piacciono le verdure.',
            ru: 'Саре не нравится рыба, но нравятся овощи.',
            az: 'Sara balığı sevmir, amma tərəvəzləri xoşlayır.',
          },
          {
            it: 'Ti piace studiare in biblioteca? — Sì, mi piace molto.',
            ru: 'Тебе нравится заниматься в библиотеке? — Да, очень.',
            az: 'Kitabxanada oxumaq xoşuna gəlir? — Bəli, çox xoşuma gəlir.',
          },
        ],
      },
      {
        title: 'Vorrei и preferire',
        text: `**Vorrei** (я хотел бы) — вежливая форма от volere. В ресторане и в магазине говорите **vorrei**, а не «voglio» (звучит грубо): «Vorrei un caffè, per favore».

**Preferire** — глагол на -ire с вставкой **-isc-** (как finire): preferisco, preferisci, preferisce, preferiamo, preferite, preferiscono. -isc- нет только в noi и voi.

Конструкции: preferisco **il vino rosso**; preferisco **restare** a casa; preferisco il tè **al** caffè (= чай кофе).`,
        tables: [
          {
            title: 'preferire (presente)',
            head: ['', 'preferire'],
            rows: [
              ['io', 'preferisco'],
              ['tu', 'preferisci'],
              ['lui / lei', 'preferisce'],
              ['noi', 'preferiamo'],
              ['voi', 'preferite'],
              ['loro', 'preferiscono'],
            ],
          },
        ],
        examples: [
          {
            it: 'Vorrei un tavolo per due, per favore.',
            ru: 'Мне бы столик на двоих, пожалуйста.',
            az: 'İki nəfərlik masa istərdim, zəhmət olmasa.',
          },
          {
            it: 'Preferisci la carne o il pesce? — Preferisco il pesce.',
            ru: 'Ты предпочитаешь мясо или рыбу? — Рыбу.',
            az: 'Ət, yoxsa balıq üstün tutursan? — Balığı.',
          },
          {
            it: 'I miei amici preferiscono mangiare in trattoria.',
            ru: 'Мои друзья предпочитают есть в траттории.',
            az: 'Dostlarım trattoriyada yeməyi üstün tuturlar.',
          },
        ],
      },
    ],
    drills: [
      { prompt: 'Mi ___ la pizza.', answer: 'piace', hint: 'la pizza — ед.ч.' },
      { prompt: 'Mi ___ i tortellini.', answer: 'piacciono', hint: 'мн.ч. → piacciono' },
      { prompt: 'Ti ___ ballare?', answer: 'piace', hint: 'инфинитив → piace' },
      { prompt: '(a lui) ___ piace il calcio.', answer: 'Gli', hint: 'a lui = gli' },
      { prompt: '(a lei) ___ piacciono i gatti.', answer: 'Le', hint: 'a lei = le' },
      { prompt: '(a noi) ___ piace Bologna.', answer: 'Ci', hint: 'a noi = ci' },
      { prompt: '(a voi) ___ piacciono le lasagne?', answer: 'Vi', hint: 'a voi = vi' },
      { prompt: 'A Marco non ___ le verdure.', answer: 'piacciono', hint: 'le verdure — мн.ч.' },
      { prompt: 'A me piace il caffè. E a te? — ___ a me!', answer: 'Anche', hint: 'Мне тоже = Anche a me' },
      { prompt: '(volere, вежливо) ___ un bicchiere d’acqua, per favore.', answer: 'Vorrei', hint: 'вежливо: vorrei' },
      { prompt: '(preferire) preferire · io', answer: 'preferisco', hint: '-isc-: preferisco' },
      { prompt: '(preferire) preferire · noi', answer: 'preferiamo', hint: 'в noi нет -isc-' },
      { prompt: '(preferire) preferire · loro', answer: 'preferiscono', hint: 'preferiscono' },
      { prompt: '(preferire) preferire · lei', answer: 'preferisce', hint: 'preferisce' },
      { prompt: '(preferire) preferire · voi', answer: 'preferite', hint: 'в voi нет -isc-' },
      { prompt: 'Signora, Le ___ questi dolci?', answer: 'piacciono', hint: 'questi dolci — мн.ч.' },
    ],
  },
  {
    id: 'u06-quello-bello',
    unit: 6,
    title: 'Quello и bello; ci vuole / ci metto',
    goal: 'Говорить «тот ресторан», «красивый город» и «нужно 10 минут / я трачу 10 минут».',
    sections: [
      {
        title: 'Quello и bello ведут себя как артикль',
        text: `Перед существительным **quello** (тот) и **bello** (красивый) меняют окончание **точно как определённый артикль**:
il → **quel / bel**; lo → **quello / bello**; l' → **quell' / bell'**; la → **quella / bella**; i → **quei / bei**; gli → **quegli / begli**; le → **quelle / belle**.

Секрет: подставьте артикль и «приклейте» его к que-/be-: **il** ragazzo → que**l** ragazzo; **gli** studenti → que**gli** studenti; **i** posti → be**i** posti.

Если quello/bello стоит **после** существительного или отдельно, формы обычные: «Il ristorante è **bello**», «Quale libro? — **Quello** rosso».`,
        tables: [
          {
            title: 'Формы перед существительным',
            head: ['артикль', 'quello', 'bello', 'пример'],
            rows: [
              ['il', 'quel', 'bel', 'quel / bel ristorante'],
              ['lo', 'quello', 'bello', 'quello / bello zaino'],
              ["l'", "quell'", "bell'", "quell' / bell'albergo"],
              ['la', 'quella', 'bella', 'quella / bella piazza'],
              ['i', 'quei', 'bei', 'quei / bei portici'],
              ['gli', 'quegli', 'begli', 'quegli / begli occhi'],
              ['le', 'quelle', 'belle', 'quelle / belle torri'],
            ],
          },
        ],
        examples: [
          {
            it: 'Conosci quel ristorante vicino alle Due Torri?',
            ru: 'Знаешь тот ресторан рядом с Двумя башнями?',
            az: 'İki Qüllənin yanındakı o restoranı tanıyırsan?',
          },
          {
            it: 'Bologna ha dei bei portici e delle belle piazze.',
            ru: 'В Болонье красивые портики и красивые площади.',
            az: 'Bolonyanın gözəl qalereyaları və gözəl meydanları var.',
          },
          {
            it: 'Chi sono quegli studenti? — Sono i miei compagni.',
            ru: 'Кто те студенты? — Это мои однокурсники.',
            az: 'O tələbələr kimdir? — Kurs yoldaşlarımdır.',
          },
        ],
      },
      {
        title: 'Volerci и metterci',
        text: `**Ci vuole / ci vogliono** = «нужно, требуется» (безлично). Глагол согласуется с тем, **что** нужно: **ci vuole** un'ora, **ci vogliono** due ore / tre uova.

**Metterci** = «тратить (время), у кого-то уходит» — спрягается по лицам: (io) **ci metto** dieci minuti, (tu) **ci metti**, (lui) **ci mette**, (noi) **ci mettiamo**, (voi) **ci mettete**, (loro) **ci mettono**.

Как различать: **ci vuole** — объективно (сколько нужно вообще), **ci metto** — субъективно (сколько трачу я).
«Per arrivare in centro **ci vuole** mezz'ora, ma io in bici **ci metto** dieci minuti».

В passato prossimo: **c'è voluta** un'ora, **ci sono voluti** due giorni (essere!); **ci ho messo** venti minuti (avere).`,
        tables: [
          {
            title: 'metterci (presente)',
            head: ['', 'metterci'],
            rows: [
              ['io', 'ci metto'],
              ['tu', 'ci metti'],
              ['lui / lei', 'ci mette'],
              ['noi', 'ci mettiamo'],
              ['voi', 'ci mettete'],
              ['loro', 'ci mettono'],
            ],
          },
        ],
        examples: [
          {
            it: 'Per fare il ragù ci vogliono almeno tre ore.',
            ru: 'Чтобы приготовить рагу, нужно минимум три часа.',
            az: 'Raqu hazırlamaq üçün ən azı üç saat lazımdır.',
          },
          {
            it: 'Quanto ci metti da casa all’università? — Ci metto un quarto d’ora a piedi.',
            ru: 'Сколько ты добираешься от дома до университета? — Пятнадцать минут пешком.',
            az: 'Evdən universitetə nə qədər vaxta gedirsən? — Piyada on beş dəqiqəyə.',
          },
          {
            it: 'Da Bologna a Firenze in treno ci vogliono 40 minuti.',
            ru: 'От Болоньи до Флоренции на поезде 40 минут.',
            az: 'Bolonyadan Florensiyaya qatarla 40 dəqiqə lazımdır.',
          },
        ],
      },
    ],
    drills: [
      { prompt: '(quello) ___ ragazzo', answer: 'quel', hint: 'il ragazzo → quel' },
      { prompt: '(quello) ___ studente', answer: 'quello', hint: 'lo studente → quello' },
      { prompt: '(quello) ___ amica', answer: "quell'", also: ['quella'], hint: "l'amica → quell'" },
      { prompt: '(quello) ___ libri', answer: 'quei', hint: 'i libri → quei' },
      { prompt: '(quello) ___ zaini', answer: 'quegli', hint: 'gli zaini → quegli' },
      { prompt: '(quello) ___ ragazze', answer: 'quelle', hint: 'le ragazze → quelle' },
      { prompt: '(bello) un ___ film', answer: 'bel', hint: 'il film → bel' },
      { prompt: '(bello) un ___ albergo', answer: "bell'", hint: "l'albergo → bell'" },
      { prompt: '(bello) dei ___ occhi', answer: 'begli', hint: 'gli occhi → begli' },
      { prompt: '(bello) dei ___ posti', answer: 'bei', hint: 'i posti → bei' },
      { prompt: '(bello) uno ___ spettacolo', answer: 'bello', hint: 'lo spettacolo → bello' },
      { prompt: 'Questo ristorante è molto ___ (bello).', answer: 'bello', hint: 'после существительного — обычная форма' },
      { prompt: 'Per arrivare a Roma ___ due ore. (volerci)', answer: 'ci vogliono', hint: 'due ore — мн.ч.' },
      { prompt: 'Per fare la pizza ___ un’ora. (volerci)', answer: 'ci vuole', hint: "un'ora — ед.ч." },
      { prompt: 'Io ___ dieci minuti per arrivare. (metterci)', answer: 'ci metto', hint: 'io → ci metto' },
      { prompt: 'Quanto tempo ___ voi per cucinare? (metterci)', answer: 'ci mettete', hint: 'voi → ci mettete' },
      { prompt: 'Ieri (io) ___ un’ora per tornare a casa. (metterci, passato)', answer: 'ci ho messo', hint: 'metterci + avere: ci ho messo' },
    ],
  },
];
