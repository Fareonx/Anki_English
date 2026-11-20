import type { Lesson } from '../types';

// Unit 3 "Scrivere e telefonare": preposizioni articolate e partitivo, c'è / ci sono, aggettivi possessivi.
export const lessons: Lesson[] = [
  {
    id: 'u03-articolate',
    unit: 3,
    title: 'Слитные предлоги — preposizioni articolate; партитив',
    goal: 'Сливать предлог с артиклем (al bar, nella borsa, dal medico) и говорить «немного хлеба» — del pane.',
    sections: [
      {
        title: 'Предлог + артикль = одно слово',
        text: `Когда после предлогов **di, a, da, in, su** стоит определённый артикль, они **сливаются** в одно слово:
a + il bar → **al** bar; in + la borsa → **nella** borsa; di + lo studente → **dello** studente.

Правило сборки простое:
- **di → de-**, **in → ne-**, остальные (a, da, su) не меняются.
- Если артикль начинается на **l** (lo, la, l’, le), **l удваивается**: della, alla, nello, sulle, dall’.
- **il → -l**, **i → -i**: del, al, dal, nel, sul; dei, ai, dai, nei, sui.

То есть не нужно зубрить 35 форм: выберите артикль (как в уроке об артикле) и «приклейте» предлог.

**con, per, tra/fra** не сливаются: con il professore, per la mamma, tra gli amici (в речи иногда col = con il).`,
        tables: [
          {
            title: 'Слитные предлоги',
            head: ['', 'il', 'lo', 'l’', 'la', 'i', 'gli', 'le'],
            rows: [
              ['di', 'del', 'dello', 'dell’', 'della', 'dei', 'degli', 'delle'],
              ['a', 'al', 'allo', 'all’', 'alla', 'ai', 'agli', 'alle'],
              ['da', 'dal', 'dallo', 'dall’', 'dalla', 'dai', 'dagli', 'dalle'],
              ['in', 'nel', 'nello', 'nell’', 'nella', 'nei', 'negli', 'nelle'],
              ['su', 'sul', 'sullo', 'sull’', 'sulla', 'sui', 'sugli', 'sulle'],
            ],
          },
        ],
        examples: [
          {
            it: 'Vado al bar dell’università con gli amici.',
            ru: 'Я иду в университетский бар с друзьями.',
            az: 'Dostlarla universitetin barına gedirəm.',
          },
          {
            it: 'Il telefono è nello zaino, le chiavi sono sul tavolo.',
            ru: 'Телефон в рюкзаке, ключи на столе.',
            az: 'Telefon çantadadır, açarlar masanın üstündədir.',
          },
          {
            it: 'Torno dalla biblioteca alle sette.',
            ru: 'Я возвращаюсь из библиотеки в семь.',
            az: 'Kitabxanadan saat yeddidə qayıdıram.',
          },
        ],
      },
      {
        title: 'Когда сливать, а когда нет',
        text: `Сливаем, когда **нужен артикль**. Сравните:
- vado **a** Bologna (город — без артикля), но vado **al** bar, **alla** stazione, **all’**università;
- studio **in** biblioteca (устойчивое выражение), но il libro è **nella** biblioteca **del** dipartimento (конкретная библиотека с уточнением);
- vado **da** Marco (имя — без артикля), но vado **dal** medico, **dalla** professoressa.

Время: **alle** otto, **all’**una, **dalle** nove **alle** cinque — тоже слитные (le ore!).

Ошибка, которую делают почти все: «vado a il bar» или «nel Bologna». Город — без артикля, бар — с артиклем.`,
        examples: [
          {
            it: 'Stasera andiamo al cinema e poi da Marco.',
            ru: 'Вечером идём в кино, а потом к Марко.',
            az: 'Bu axşam kinoya, sonra Markogilə gedirik.',
          },
          {
            it: 'Il treno arriva alla stazione di Bologna alle nove.',
            ru: 'Поезд прибывает на вокзал Болоньи в девять.',
            az: 'Qatar Bolonya vağzalına saat doqquzda çatır.',
          },
        ],
      },
      {
        title: 'Партитив: del pane, dei libri',
        text: `**di + артикль** означает ещё и «немного, некоторое количество»:
- с неисчисляемым (ед. ч.): **del** pane (хлеба), **della** pizza, **dell’**acqua, **dello** zucchero — «немного»;
- с исчисляемым (мн. ч.): **dei** libri, **degli** amici, **delle** amiche — «несколько», это как бы множественное число от un/una.

Vorrei **del** pane = Я бы хотел хлеба. Ho **degli** amici a Bologna = У меня есть (несколько) друзей в Болонье.

В отрицании партитив обычно опускают: Non ho pane. Non ho amici.

Подсказка: **un amico → degli amici, una ragazza → delle ragazze, un libro → dei libri**.`,
        examples: [
          {
            it: 'Compro del pane e dell’acqua al supermercato.',
            ru: 'Я покупаю хлеб и воду в супермаркете.',
            az: 'Supermarketdən bir az çörək və su alıram.',
          },
          {
            it: 'In classe ci sono degli studenti spagnoli.',
            ru: 'В классе есть несколько студентов-испанцев.',
            az: 'Sinifdə bir neçə ispan tələbə var.',
          },
        ],
      },
    ],
    drills: [
      { prompt: 'di + il', answer: 'del', hint: 'di → de- + l.' },
      { prompt: 'a + lo', answer: 'allo', hint: 'l удваивается: allo.' },
      { prompt: 'da + la', answer: 'dalla', hint: 'l удваивается: dalla.' },
      { prompt: "in + l'", answer: "nell'", hint: 'in → ne- + ll’.' },
      { prompt: 'su + i', answer: 'sui', hint: 'su + i = sui.' },
      { prompt: 'di + gli', answer: 'degli', hint: 'di → de- + gli.' },
      { prompt: 'a + le', answer: 'alle', hint: 'l удваивается: alle.' },
      { prompt: 'in + il', answer: 'nel', hint: 'in → ne- + l.' },
      { prompt: 'Il libro è ___ (su) tavolo.', answer: 'sul', hint: 'il tavolo → su + il = sul.' },
      { prompt: 'Vado ___ (a) bar.', answer: 'al', hint: 'il bar → a + il = al.' },
      { prompt: 'Studio ___ (a) università.', answer: "all'", hint: 'l’università → a + l’ = all’.' },
      { prompt: 'La borsa ___ (di) professoressa.', answer: 'della', hint: 'la professoressa → di + la = della.' },
      { prompt: 'Il telefono è ___ (in) zaino.', answer: 'nello', hint: 'lo zaino → in + lo = nello.' },
      { prompt: 'Torno ___ (da) stazione.', answer: 'dalla', hint: 'la stazione → da + la = dalla.' },
      { prompt: 'Domani vado ___ (da) medico.', answer: 'dal', hint: '«К врачу» — da + il = dal.' },
      { prompt: 'Torno a casa ___ (a) otto.', answer: 'alle', hint: 'Часы — le ore: alle otto.' },
      { prompt: 'Партитив: Vorrei ___ pane.', answer: 'del', hint: 'il pane → del pane.' },
      { prompt: 'Партитив: Ho ___ amici a Bologna.', answer: 'degli', hint: 'gli amici → degli amici.' },
      { prompt: 'Партитив: Compro ___ acqua.', answer: "dell'", hint: 'l’acqua → dell’acqua.' },
      { prompt: 'Mio cugino vive ___ (in) Stati Uniti.', answer: 'negli', hint: 'gli Stati Uniti → in + gli = negli.' },
    ],
  },
  {
    id: 'u03-ce',
    unit: 3,
    title: 'C’è / ci sono; где что находится',
    goal: 'Говорить «есть / имеется» и описывать, где что находится: «Accanto alla stazione c’è un bar».',
    sections: [
      {
        title: 'C’è и ci sono',
        text: `**c’è** (= ci è) — «есть, имеется» + **единственное число**: In via Zamboni **c’è** un bar.
**ci sono** — «есть, имеются» + **множественное число**: In aula **ci sono** venti studenti.

Отрицание: **non c’è / non ci sono**. Вопрос — интонацией: **C’è** Marco? (Марко здесь?) — No, non c’è.

**c’è или è?**
- **C’è** сообщает, что что-то **существует** где-то — обычно с неопределённым словом: C’è **una** farmacia qui vicino?
- **Dov’è / è** — ищем **известный** предмет, с определённым артиклем: **Dov’è la** farmacia? La farmacia **è** in piazza.

Мнемоника: русское «есть ли здесь…?» = **c’è…?**, «где…?» = **dov’è…?**`,
        tables: [
          {
            title: 'c’è / ci sono',
            head: ['', 'утверждение', 'отрицание'],
            rows: [
              ['ед. ч.', 'C’è un bar.', 'Non c’è un bar.'],
              ['мн. ч.', 'Ci sono due bar.', 'Non ci sono bar.'],
            ],
          },
        ],
        examples: [
          {
            it: 'Scusi, c’è una fermata dell’autobus qui vicino?',
            ru: 'Извините, здесь рядом есть автобусная остановка?',
            az: 'Bağışlayın, buralarda avtobus dayanacağı var?',
          },
          {
            it: 'A Bologna ci sono molti portici.',
            ru: 'В Болонье много портиков.',
            az: 'Bolonyada çoxlu portik (tağlı qalereya) var.',
          },
          {
            it: 'Pronto, c’è Giulia? — No, non c’è, è a lezione.',
            ru: 'Алло, Джулия дома? — Нет, её нет, она на занятии.',
            az: 'Alo, Culiya oradadır? — Xeyr, yoxdur, dərsdədir.',
          },
        ],
      },
      {
        title: 'Выражения места',
        text: `Многие выражения места требуют **a** или **da** — и тогда предлог сливается с артиклем:
- **davanti a** — перед: davanti **alla** stazione
- **accanto a** — рядом с: accanto **al** bar
- **vicino a** — близко к: vicino **all’**università
- **di fronte a** — напротив: di fronte **alla** chiesa
- **in mezzo a** — посередине: in mezzo **alla** piazza
- **lontano da** — далеко от: lontano **dal** centro

Без предлога: **sopra** (на, над), **sotto** (под), **dietro** (за; можно dietro a), **dentro** (внутри), **fuori** (снаружи), **tra / fra** (между).
Направо / налево: **a destra (di)**, **a sinistra (di)**.

Ошибка: «vicino la stazione» — в литературной речи нужен a: **vicino alla stazione**.`,
        examples: [
          {
            it: 'La banca è davanti alla stazione, accanto al bar.',
            ru: 'Банк перед вокзалом, рядом с баром.',
            az: 'Bank vağzalın qarşısında, barın yanındadır.',
          },
          {
            it: 'Il gatto dorme sotto il letto.',
            ru: 'Кот спит под кроватью.',
            az: 'Pişik çarpayının altında yatır.',
          },
          {
            it: 'Il mio appartamento non è lontano dal centro.',
            ru: 'Моя квартира недалеко от центра.',
            az: 'Mənim mənzilim mərkəzdən uzaq deyil.',
          },
        ],
      },
    ],
    drills: [
      { prompt: 'In piazza ___ un bar.', answer: "c'è", hint: 'Единственное число → c’è.' },
      { prompt: 'In aula ___ molti studenti.', answer: 'ci sono', hint: 'Множественное число → ci sono.' },
      { prompt: 'Non ___ latte in frigo.', answer: "c'è", hint: 'latte — ед. ч.' },
      { prompt: 'Nell’appartamento ___ due bagni?', answer: 'ci sono', hint: 'due bagni — мн. ч.' },
      { prompt: 'In via Zamboni ___ molte librerie.', answer: 'ci sono', hint: 'molte librerie — мн. ч.' },
      { prompt: 'Scusi, ___ una farmacia qui vicino?', answer: "c'è", hint: 'Есть ли (неизвестная) аптека? → c’è.' },
      { prompt: 'Scusi, ___ la stazione? (где)', answer: "dov'è", hint: 'Ищем известное место → dov’è.' },
      { prompt: 'Pronto, ___ Marco? — No, non c’è.', answer: "c'è", hint: 'Здесь ли человек? → c’è.' },
      { prompt: 'La banca è davanti ___ stazione.', answer: 'alla', hint: 'davanti a + la = alla.' },
      { prompt: 'Il bar è accanto ___ biblioteca.', answer: 'alla', hint: 'accanto a + la = alla.' },
      { prompt: 'La mensa è vicino ___ università.', answer: "all'", hint: 'vicino a + l’ = all’.' },
      { prompt: 'Abito lontano ___ centro.', answer: 'dal', hint: 'lontano da + il = dal.' },
      { prompt: 'Il gatto è ___ il tavolo. (под)', answer: 'sotto', hint: '«Под» — sotto.' },
      { prompt: 'Il libro è ___ lo zaino. (внутри)', answer: 'dentro', hint: '«Внутри» — dentro.' },
      { prompt: 'Il bagno è a ___. (справа)', answer: 'destra', hint: 'Справа — a destra.' },
      { prompt: 'La chiesa è di fronte ___ museo.', answer: 'al', hint: 'di fronte a + il = al.' },
    ],
  },
  {
    id: 'u03-possessivi',
    unit: 3,
    title: 'Притяжательные — aggettivi possessivi',
    goal: 'Говорить «мой, твой, его, наш…» с правильным артиклем: il mio libro, la sua casa, mia madre.',
    sections: [
      {
        title: 'Формы и артикль',
        text: `Притяжательное прилагательное обычно стоит **с артиклем**: **il mio** libro, **la tua** borsa, **i nostri** amici. По-русски «моя книга», по-итальянски «la mia книга».

Главное правило: притяжательное согласуется **с предметом, а не с владельцем!**
- **il suo** libro = его книга И её книга (libro — м. р.)
- **la sua** casa = его дом И её дом (casa — ж. р.)

Это ломает русскую логику: Marco e **la sua** ragazza (Марко и его девушка) — sua женского рода, потому что ragazza. Anna e **il suo** ragazzo (Анна и её парень).

**loro** («их») **не меняется**: il loro libro, la loro casa, i loro amici, le loro amiche.

Вежливое «Ваш» — **Suo** (как Lei): Signora, è **la Sua** borsa?

Неопределённое «один из моих» — с un/una: **un mio amico** (мой друг, один из).`,
        tables: [
          {
            title: 'Притяжательные с артиклем',
            head: ['', 'м. ед.', 'ж. ед.', 'м. мн.', 'ж. мн.'],
            rows: [
              ['io', 'il mio', 'la mia', 'i miei', 'le mie'],
              ['tu', 'il tuo', 'la tua', 'i tuoi', 'le tue'],
              ['lui / lei', 'il suo', 'la sua', 'i suoi', 'le sue'],
              ['Lei', 'il Suo', 'la Sua', 'i Suoi', 'le Sue'],
              ['noi', 'il nostro', 'la nostra', 'i nostri', 'le nostre'],
              ['voi', 'il vostro', 'la vostra', 'i vostri', 'le vostre'],
              ['loro', 'il loro', 'la loro', 'i loro', 'le loro'],
            ],
          },
        ],
        examples: [
          {
            it: 'Il mio appartamento è piccolo, ma la mia camera è bella.',
            ru: 'Моя квартира маленькая, но моя комната красивая.',
            az: 'Mənim mənzilim kiçikdir, amma otağım gözəldir.',
          },
          {
            it: 'Marco e la sua ragazza studiano Lettere.',
            ru: 'Марко и его девушка учатся на филологическом.',
            az: 'Marko və onun sevgilisi filologiya oxuyurlar.',
          },
          {
            it: 'I miei amici e le mie amiche vengono alla festa.',
            ru: 'Мои друзья и подруги придут на вечеринку.',
            az: 'Dostlarım və rəfiqələrim şənliyə gəlirlər.',
          },
        ],
      },
      {
        title: 'Семья: без артикля',
        text: `С названиями **родственников в единственном числе** артикль **не ставится**: **mio** padre, **mia** madre, **tuo** fratello, **sua** sorella, **nostro** zio.

Артикль **возвращается**, если:
- **множественное число**: **i miei** fratelli, **le mie** sorelle;
- **loro**: **la loro** madre, **il loro** padre;
- есть **прилагательное** или **уменьшительная** форма: **la mia** sorella minore, **il mio** fratellino;
- ласковые слова: **la mia** mamma, **il mio** papà.

Мнемоника: **«одна мама — без артикля, много братьев — с артиклем, их мама — с артиклем»**.

Типичные ошибки: «il mio padre» (нужно mio padre) и «miei genitori» (нужно i miei genitori — genitori во мн. ч.).`,
        examples: [
          {
            it: 'Mia madre è insegnante e mio padre fa il medico.',
            ru: 'Моя мама учительница, а папа работает врачом.',
            az: 'Anam müəllimədir, atam isə həkimdir.',
          },
          {
            it: 'I miei genitori abitano a Baku con mia sorella.',
            ru: 'Мои родители живут в Баку с моей сестрой.',
            az: 'Valideynlərim bacımla birlikdə Bakıda yaşayırlar.',
          },
          {
            it: 'Luca e Paolo? La loro madre è di Bologna.',
            ru: 'Лука и Паоло? Их мама из Болоньи.',
            az: 'Luka ilə Paolo? Onların anası Bolonyadandır.',
          },
        ],
      },
    ],
    drills: [
      { prompt: '(io) ___ libro', answer: 'il mio', hint: 'libro — м. ед.: il mio.' },
      { prompt: '(tu) ___ borsa', answer: 'la tua', hint: 'borsa — ж. ед.: la tua.' },
      { prompt: '(lei) ___ zaino', answer: 'il suo', hint: 'Согласуем с zaino (м. р.), а не с «она»!' },
      { prompt: '(lui) ___ casa', answer: 'la sua', hint: 'Согласуем с casa (ж. р.), а не с «он»!' },
      { prompt: '(noi) ___ professori', answer: 'i nostri', hint: 'м. мн.: i nostri.' },
      { prompt: '(voi) ___ amiche', answer: 'le vostre', hint: 'ж. мн.: le vostre.' },
      { prompt: '(loro) ___ appartamento', answer: 'il loro', hint: 'loro не меняется, артикль нужен.' },
      { prompt: '(io) ___ amici', answer: 'i miei', hint: 'м. мн.: i miei.' },
      { prompt: '(tu) ___ libri', answer: 'i tuoi', hint: 'м. мн.: i tuoi.' },
      { prompt: '(io) ___ madre', answer: 'mia', hint: 'Родственник в ед. ч. — без артикля.' },
      { prompt: '(io) ___ fratello', answer: 'mio', hint: 'Родственник в ед. ч. — без артикля.' },
      { prompt: '(lui) ___ sorelle', answer: 'le sue', hint: 'Мн. ч. — артикль возвращается.' },
      { prompt: '(loro) ___ padre', answer: 'il loro', hint: 'С loro артикль всегда.' },
      { prompt: '(tu) ___ genitori', answer: 'i tuoi', hint: 'genitori — мн. ч., с артиклем.' },
      { prompt: '(noi) ___ città', answer: 'la nostra', hint: 'città — ж. р.: la nostra.' },
      { prompt: 'Signora, è ___ borsa? (Ваша)', answer: 'la Sua', also: ['la sua'], hint: 'Вежливо: la Sua.' },
      { prompt: 'Marco e ___ ragazza (его девушка)', answer: 'la sua', hint: 'ragazza — ж. р.: la sua.' },
      { prompt: 'Anna e ___ ragazzo (её парень)', answer: 'il suo', hint: 'ragazzo — м. р.: il suo.' },
    ],
  },
];
