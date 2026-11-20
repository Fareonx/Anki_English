import type { Lesson } from '../types';

// Unit 0 "Benvenuti!": alfabeto e pronuncia, nomi e aggettivi, essere, articolo determinativo, avere e numeri.
export const lessons: Lesson[] = [
  {
    id: 'u00-alfabeto',
    unit: 0,
    title: 'Алфавит и произношение — alfabeto e pronuncia',
    goal: 'Правильно читать и писать итальянские слова: c/g, ch/gh, gn, gl, sc, z, двойные согласные, ударение.',
    sections: [
      {
        title: 'Алфавит: 21 буква',
        text: `В итальянском алфавите **21 буква**: a, b, c, d, e, f, g, h, i, l, m, n, o, p, q, r, s, t, u, v, z. Буквы **j, k, w, x, y** встречаются только в иностранных словах (jeans, karaoke, wi-fi, taxi, yogurt).

Главная радость: **как пишется — так и читается**. Почти все буквы читаются одинаково всегда, сложности дают только несколько сочетаний.

**h** никогда не читается: ho = [о], hanno = [анно]. Она нужна только для «служебной» работы — например, чтобы сделать c твёрдым (chi = [ки]).

**qu** читается [кв]: quattro [кваттро], questo [квэсто].

**r** — раскатистое, как в русском, а не картавое. **l** — мягче русского, почти [ль]: la = [ла] со «светлым» л.`,
        examples: [
          {
            it: 'Ciao, sono a Bologna!',
            ru: 'Привет, я в Болонье!',
            az: 'Salam, mən Bolonyadayam!',
          },
          {
            it: 'Ho quattro amici italiani.',
            ru: 'У меня четыре друга-итальянца.',
            az: 'Mənim dörd italyan dostum var.',
          },
        ],
      },
      {
        title: 'C и G: твёрдо или мягко?',
        text: `Правило одно для обеих букв — всё решает **следующая гласная**:

**c / g + a, o, u** → твёрдо: casa [каза], Colosseo, cultura; gatto [гатто], gola, gusto.
**c / g + e, i** → мягко: cena [чена], ciao [чао]; gelato [джелато], giorno [джорно].

Хотите **твёрдый звук перед e, i** — вставьте **h**: chi [ки], perché [перкэ], spaghetti [спагэтти], laghi [лаги].
Хотите **мягкий звук перед a, o, u** — вставьте **i** (она не читается): ciao [чао], cioccolata, giallo [джалло], giorno.

Мнемоника: **H делает твёрдым, I делает мягким**. Русское «ч» = ci/ce, «дж» = gi/ge, «к» перед e/i = chi/che, «г» перед e/i = ghi/ghe.`,
        tables: [
          {
            title: 'Таблица звуков C / G',
            head: ['', '+ a, o, u', '+ e, i'],
            rows: [
              ['c', 'ca, co, cu = [ка, ко, ку]', 'ce, ci = [че, чи]'],
              ['ch', '—', 'che, chi = [ке, ки]'],
              ['ci + гласная', 'cia, cio, ciu = [ча, чо, чу]', '—'],
              ['g', 'ga, go, gu = [га, го, гу]', 'ge, gi = [дже, джи]'],
              ['gh', '—', 'ghe, ghi = [ге, ги]'],
              ['gi + гласная', 'gia, gio, giu = [джа, джо, джу]', '—'],
            ],
          },
        ],
        examples: [
          {
            it: 'Un caffè e un cornetto, per favore.',
            ru: 'Кофе и круассан, пожалуйста.',
            az: 'Bir qəhvə və bir kruasan, zəhmət olmasa.',
          },
          {
            it: 'Chi è? — È Giorgio.',
            ru: 'Кто это? — Это Джорджо.',
            az: 'Bu kimdir? — Bu Corcodur.',
          },
        ],
      },
      {
        title: 'Gn, gl, sc, z, s',
        text: `**gn** = [нь]: Bologna [болонья], lasagne [лазанье], signora [синьора].
**gli** = мягкое [ль]: figlio [фильо], famiglia [фамилья], biglietto [бильетто].
**sc + e, i** = [ш]: pesce [пеше], scienza [шенца]; **sc + a, o, u** = [ск]: scuola [скуола], scusa. Твёрдое [ск] перед e/i — **sch**: schema [скема], tedeschi.
**z** = [ц] или [дз]: pizza [пицца], piazza; zero [дзэро], zaino [дзаино].
**s** между гласными звучит как [з]: casa [каза], rosa; в начале слова перед гласной — [с]: sole, sera.

Типичная ошибка русскоговорящих: читать **gl** как «гл». Figlio — это [фильо], а не «фиглио»!`,
        examples: [
          {
            it: 'La mia famiglia abita a Baku.',
            ru: 'Моя семья живёт в Баку.',
            az: 'Mənim ailəm Bakıda yaşayır.',
          },
          {
            it: 'Scusi, dov’è la piazza?',
            ru: 'Простите, где площадь?',
            az: 'Bağışlayın, meydan haradadır?',
          },
        ],
      },
      {
        title: 'Двойные согласные, ударение, апостроф',
        text: `**Двойные согласные** произносятся дольше, с лёгкой «задержкой»: anno [ан-но] — «год», а ano — «задний проход». Pala/palla, caro/carro, sete/sette — разные слова! Тренируйте паузу: pizza, caffè, cappuccino, tutto.

**Ударение** чаще всего падает на **предпоследний** слог: ra-GAZ-zo, stu-DEN-te. Если ударение на **последней гласной**, его **обязательно пишут знаком**: città, università, caffè, perché, lunedì, però, più. Знак **è** (открытое э) и **é** (закрытое е, в perché, né); остальные гласные пишут с грависом: à, ì, ò, ù.

Очень важно: **e** = «и», **è** = «является / есть» (Marco è italiano).

**Апостроф** заменяет выпавшую гласную перед другой гласной: lo + amico → **l’amico**, la + università → **l’università**, dove + è → **dov’è**.`,
        tables: [
          {
            title: 'Пары-ловушки',
            head: ['одна согласная', 'двойная'],
            rows: [
              ['ano', 'anno — год'],
              ['caro — дорогой', 'carro — повозка'],
              ['sete — жажда', 'sette — семь'],
              ['papa — папа римский', 'pappa — каша'],
            ],
          },
        ],
        examples: [
          {
            it: "L’università di Bologna è molto antica.",
            ru: 'Болонский университет очень древний.',
            az: 'Bolonya universiteti çox qədimdir.',
          },
          {
            it: 'Lunedì prendo un caffè in città.',
            ru: 'В понедельник я пью кофе в городе.',
            az: 'Bazar ertəsi şəhərdə qəhvə içirəm.',
          },
        ],
      },
    ],
    drills: [
      { prompt: 'Звук [ч]: ___ao! (привет)', answer: 'ciao', hint: '[ч] перед a = ci + a.' },
      { prompt: 'Звук [кь]: ___ave (ключ)', answer: 'chiave', hint: 'Твёрдое [к] перед i = chi.' },
      { prompt: 'Звук [дж]: ___elato (мороженое)', answer: 'gelato', hint: 'g + e = [дже].' },
      { prompt: 'Звук [г] перед e: spa___etti', answer: 'spaghetti', hint: 'Твёрдое [г] перед e/i = gh.' },
      { prompt: 'Звук [дж] перед o: ___orno (день)', answer: 'giorno', hint: '[джо] = gio, i не читается.' },
      { prompt: 'Звук [нь]: Bolo___a', answer: 'Bologna', hint: '[нь] = gn.' },
      { prompt: 'Звук [ль]: fi___o (сын)', answer: 'figlio', hint: 'Мягкое [ль] = gli.' },
      { prompt: 'Звук [ш]: pe___e (рыба)', answer: 'pesce', hint: 'sc + e = [ш].' },
      { prompt: 'Звук [ск]: ___uola (школа)', answer: 'scuola', hint: 'sc + u = [ск].' },
      { prompt: 'Звук [ц]: pi___a', answer: 'pizza', hint: 'Двойное zz = [цц].' },
      { prompt: 'Звук [кв]: ___attro (четыре)', answer: 'quattro', hint: '[кв] = qu.' },
      { prompt: 'Звук [чо]: ___ccolata (шоколад)', answer: 'cioccolata', hint: '[чо] = cio.' },
      { prompt: 'Двойная согласная: «год» = a___o', answer: 'anno', hint: 'Год — anno (две n). Ano — совсем другое слово!' },
      { prompt: 'Апостроф: lo + amico', answer: "l'amico", hint: 'Перед гласной lo → l’.' },
      { prompt: 'Апостроф: la + università', answer: "l'università", hint: 'Перед гласной la → l’.' },
      { prompt: 'Напиши с ударением: universita', answer: 'università', hint: 'Ударение на последней гласной всегда пишется: -tà.' },
      { prompt: 'Напиши с ударением: caffe', answer: 'caffè', hint: 'Ударное конечное e пишется è.' },
      { prompt: 'e или è? Marco ___ di Bologna.', answer: 'è', hint: 'è = «является», e = «и».' },
    ],
  },
  {
    id: 'u00-nomi',
    unit: 0,
    title: 'Существительные и прилагательные: род и число',
    goal: 'Определять род слова, ставить его во множественное число и согласовывать прилагательное.',
    sections: [
      {
        title: 'Род и множественное число',
        text: `В итальянском **два рода**: мужской и женский (среднего нет). Род почти всегда виден по окончанию:

**-o** → обычно мужской: il libro, il ragazzo. Множественное: **-o → -i** (libri, ragazzi).
**-a** → обычно женский: la casa, la ragazza. Множественное: **-a → -e** (case, ragazze).
**-e** → может быть и мужским, и женским: lo studente (м.), la lezione (ж.). Множественное **всегда -i**: studenti, lezioni.

Подсказка: слова на **-zione, -sione, -tà, -tù** — женские (la stazione, la città). Слова на **-ore** — мужские (il professore, il colore).

**Не меняются во множественном**: слова с ударением на конце (il caffè → i caffè, la città → le città), слова на согласную (il bar → i bar, lo sport → gli sport), сокращения (la foto → le foto, la bici → le bici).

Исключения, которые встречаются сразу: **la foto, la moto, la radio, la mano** — женские, хоть и на -o; **il problema, il programma, il cinema** — мужские, хоть и на -a.`,
        tables: [
          {
            title: 'Окончания существительных',
            head: ['единственное', 'множественное', 'пример'],
            rows: [
              ['-o (м.)', '-i', 'il libro → i libri'],
              ['-a (ж.)', '-e', 'la penna → le penne'],
              ['-e (м.)', '-i', 'il professore → i professori'],
              ['-e (ж.)', '-i', 'la lezione → le lezioni'],
              ['-à, -è, -ù / согласная', 'не меняется', 'la città → le città; il bar → i bar'],
              ['-ca / -ga', '-che / -ghe', 'l’amica → le amiche; la riga → le righe'],
            ],
          },
        ],
        examples: [
          {
            it: 'Il ragazzo e le ragazze sono a lezione.',
            ru: 'Парень и девушки на занятии.',
            az: 'Oğlan və qızlar dərsdədirlər.',
          },
          {
            it: 'A Bologna ci sono molti bar e due università.',
            ru: 'В Болонье много баров и два университета.',
            az: 'Bolonyada çoxlu bar və iki universitet var.',
          },
        ],
      },
      {
        title: 'Прилагательные и согласование',
        text: `Прилагательное **согласуется** с существительным в роде и числе и обычно стоит **после** него: un ragazzo simpatico, una città bella.

Два типа прилагательных:
1) **-o / -a / -i / -e** (четыре формы): italiano, italiana, italiani, italiane.
2) **-e / -i** (две формы, одинаковые для м. и ж.): inglese → inglesi, gentile → gentili.

Если в группе есть хотя бы один мужчина — используем **мужской род**: Marco e Anna sono simpatic**i**.

Типичная ошибка: «la ragazza inglesa». Нет! Inglese не меняется по родам: **la ragazza inglese**.`,
        tables: [
          {
            title: 'Два типа прилагательных',
            head: ['', 'м. ед.', 'ж. ед.', 'м. мн.', 'ж. мн.'],
            rows: [
              ['тип -o', 'russo', 'russa', 'russi', 'russe'],
              ['тип -o', 'simpatico', 'simpatica', 'simpatici', 'simpatiche'],
              ['тип -e', 'inglese', 'inglese', 'inglesi', 'inglesi'],
              ['тип -e', 'gentile', 'gentile', 'gentili', 'gentili'],
            ],
          },
        ],
        examples: [
          {
            it: 'Sofia è una studentessa russa.',
            ru: 'Софья — русская студентка.',
            az: 'Sofiya rus tələbədir.',
          },
          {
            it: 'I professori sono gentili.',
            ru: 'Преподаватели вежливые.',
            az: 'Müəllimlər nəzakətlidirlər.',
          },
          {
            it: 'Le lezioni sono interessanti.',
            ru: 'Занятия интересные.',
            az: 'Dərslər maraqlıdır.',
          },
        ],
      },
    ],
    drills: [
      { prompt: 'Множественное: libro', answer: 'libri', hint: '-o → -i.' },
      { prompt: 'Множественное: ragazza', answer: 'ragazze', hint: '-a → -e.' },
      { prompt: 'Множественное: studente', answer: 'studenti', hint: '-e → -i.' },
      { prompt: 'Множественное: lezione', answer: 'lezioni', hint: '-e → -i, даже у женского рода.' },
      { prompt: 'Множественное: caffè', answer: 'caffè', hint: 'Ударное окончание не меняется.' },
      { prompt: 'Множественное: città', answer: 'città', hint: 'Ударное окончание не меняется.' },
      { prompt: 'Множественное: bar', answer: 'bar', hint: 'Слова на согласную не меняются.' },
      { prompt: 'Множественное: amica', answer: 'amiche', hint: '-ca → -che, чтобы сохранить звук [к].' },
      { prompt: 'Множественное: amico', answer: 'amici', hint: 'Исключение: amico → amici [амичи].' },
      { prompt: 'Множественное: foto', answer: 'foto', hint: 'Сокращение от fotografia — не меняется.' },
      { prompt: 'Женский род: italiano', answer: 'italiana', hint: '-o → -a.' },
      { prompt: 'Una ragazza ___ (simpatico).', answer: 'simpatica', hint: 'Женский род единственного числа: -a.' },
      { prompt: 'Due ragazzi ___ (inglese).', answer: 'inglesi', hint: 'Тип -e: во множественном -i.' },
      { prompt: 'Le studentesse ___ (russo).', answer: 'russe', hint: 'Женский род множественного: -e.' },
      { prompt: 'Anna è ___ (francese).', answer: 'francese', hint: 'Francese одинаково для м. и ж.' },
      { prompt: 'Marco e Anna sono ___ (simpatico).', answer: 'simpatici', hint: 'Смешанная группа → мужской род: -ci.' },
      { prompt: 'Il libro ___ (nuovo).', answer: 'nuovo', hint: 'Мужской род единственного: -o.' },
    ],
  },
  {
    id: 'u00-essere',
    unit: 0,
    title: 'Личные местоимения и глагол essere',
    goal: 'Говорить, кто вы и откуда: «Sono russo, sono di Baku, sono studente».',
    sections: [
      {
        title: 'Личные местоимения',
        text: `**io** — я, **tu** — ты, **lui** — он, **lei** — она, **Lei** — Вы (вежливо, с большой буквы), **noi** — мы, **voi** — вы (несколько человек), **loro** — они.

Главная особенность: **местоимение обычно опускают** — форма глагола и так показывает лицо. «Sono studente» звучит естественнее, чем «Io sono studente». Местоимение ставят для контраста: Io sono russo, **lui** è italiano.

**io** пишется с маленькой буквы (в отличие от английского I).`,
        tables: [
          {
            title: 'Местоимения',
            head: ['лицо', 'ед. число', 'мн. число'],
            rows: [
              ['1', 'io — я', 'noi — мы'],
              ['2', 'tu — ты', 'voi — вы'],
              ['3', 'lui — он, lei — она, Lei — Вы', 'loro — они'],
            ],
          },
        ],
      },
      {
        title: 'Глагол essere — «быть»',
        text: `Самый важный глагол. В русском «быть» в настоящем времени пропускают («я студент»), а в итальянском **essere обязателен**: «Io studente» — ошибка, нужно **Io sono studente**.

Обратите внимание: **sono** = и «я есть», и «они есть». Различаем по контексту: (io) sono di Baku / (loro) sono di Roma.

**è** (с ударением) = «он/она есть»; **e** без знака = «и».

**Откуда вы?** — essere **di** + город: Sono di Baku. Di dove sei? — Sono di Mosca.
**Отрицание**: **non** ставится прямо перед глаголом: Non sono italiano.
**Вопрос** строится интонацией, порядок слов тот же: Sei studente? Sei studente.`,
        tables: [
          {
            title: 'essere (presente)',
            head: ['', 'essere'],
            rows: [
              ['io', 'sono'],
              ['tu', 'sei'],
              ['lui / lei / Lei', 'è'],
              ['noi', 'siamo'],
              ['voi', 'siete'],
              ['loro', 'sono'],
            ],
          },
        ],
        examples: [
          {
            it: 'Sono di Baku, ma adesso sono a Bologna.',
            ru: 'Я из Баку, но сейчас я в Болонье.',
            az: 'Mən Bakıdanam, amma indi Bolonyadayam.',
          },
          {
            it: 'Noi siamo studenti, voi siete professori?',
            ru: 'Мы студенты, а вы преподаватели?',
            az: 'Biz tələbəyik, siz müəllimsiniz?',
          },
          {
            it: 'Marco non è a casa, è al bar.',
            ru: 'Марко не дома, он в баре.',
            az: 'Marko evdə deyil, bardadır.',
          },
          {
            it: 'Di dove sei? — Sono russo.',
            ru: 'Откуда ты? — Я русский.',
            az: 'Haralısan? — Mən rusam.',
          },
        ],
      },
    ],
    drills: [
      { prompt: 'essere · io', answer: 'sono', hint: 'io sono.' },
      { prompt: 'essere · tu', answer: 'sei', hint: 'tu sei — как число «шесть».' },
      { prompt: 'essere · lui', answer: 'è', hint: 'С ударением: è.' },
      { prompt: 'essere · noi', answer: 'siamo', hint: 'noi siamo.' },
      { prompt: 'essere · voi', answer: 'siete', hint: 'voi siete.' },
      { prompt: 'essere · loro', answer: 'sono', hint: 'Как у io: loro sono.' },
      { prompt: 'Io ___ di Baku.', answer: 'sono', hint: 'essere · io.' },
      { prompt: 'Tu ___ russo?', answer: 'sei', hint: 'essere · tu.' },
      { prompt: 'Marco e Anna ___ italiani.', answer: 'sono', hint: 'Два человека = loro.' },
      { prompt: 'Noi ___ studenti.', answer: 'siamo', hint: 'essere · noi.' },
      { prompt: 'Voi ___ di Bologna?', answer: 'siete', hint: 'essere · voi.' },
      { prompt: 'Anna ___ simpatica.', answer: 'è', hint: 'Anna = lei → è.' },
      { prompt: 'Отрицание: Io ___ ___ italiano. (я не итальянец)', answer: 'non sono', hint: 'non + глагол.' },
      { prompt: 'Местоимение: ___ siamo a Bologna.', answer: 'noi', hint: 'siamo — форма для «мы».' },
      { prompt: 'Местоимение: ___ siete in classe.', answer: 'voi', hint: 'siete — форма для «вы».' },
      { prompt: 'Di dove ___ (tu)?', answer: 'sei', hint: 'Откуда ты? — Di dove sei?' },
    ],
  },
  {
    id: 'u00-articolo',
    unit: 0,
    title: 'Определённый артикль — articolo determinativo',
    goal: 'Безошибочно выбирать il, lo, l’, la, i, gli, le.',
    sections: [
      {
        title: 'Семь форм артикля',
        text: `Артикль стоит перед почти каждым существительным: **il libro, la casa**. Он зависит от рода, числа и **первой буквы следующего слова**.

**Мужской род:**
- **il** → перед обычной согласной: il libro, il bar, il caffè.
- **lo** → перед **s + согласная, z, gn, ps, y, x**: lo studente, lo zaino, lo gnocco, lo psicologo, lo yogurt.
- **l’** → перед гласной: l’amico, l’orologio.
- Множественное: il → **i** (i libri); lo и l’ → **gli** (gli studenti, gli amici).

**Женский род:**
- **la** → перед согласной: la casa, la studentessa.
- **l’** → перед гласной: l’amica, l’università.
- Множественное: всегда **le** (le case, le amiche, le università). Перед le апостроф не ставится!

Мнемоника: **«lo-семья»** — lo, l’ (м.) и gli — нужна, когда слово начинается «неудобно»: со стечения s+согласная, z или гласной. Всё «удобное» — il / i.`,
        tables: [
          {
            title: 'Определённый артикль',
            head: ['', 'ед. число', 'мн. число', 'когда'],
            rows: [
              ['м.', 'il', 'i', 'согласная: il libro → i libri'],
              ['м.', 'lo', 'gli', 's+согл., z, gn, ps, y: lo zaino → gli zaini'],
              ['м.', 'l’', 'gli', 'гласная: l’amico → gli amici'],
              ['ж.', 'la', 'le', 'согласная: la casa → le case'],
              ['ж.', 'l’', 'le', 'гласная: l’amica → le amiche'],
            ],
          },
        ],
        examples: [
          {
            it: 'Lo studente è in biblioteca.',
            ru: 'Студент в библиотеке.',
            az: 'Tələbə kitabxanadadır.',
          },
          {
            it: "L’amico di Marco è di Baku.",
            ru: 'Друг Марко — из Баку.',
            az: 'Markonun dostu Bakıdandır.',
          },
          {
            it: 'Gli studenti e le studentesse sono in aula.',
            ru: 'Студенты и студентки в аудитории.',
            az: 'Tələbələr auditoriyadadırlar.',
          },
        ],
      },
      {
        title: 'Типичные ошибки',
        text: `1) **«il studente»** — нет! s + согласная → **lo studente**, во мн. ч. **gli studenti**.
2) **«i amici»** — нет! Перед гласной во мн. ч. мужского рода → **gli amici**.
3) **«l’amiche»** — нет! Во мн. ч. женского рода всегда **le**: le amiche.
4) Артикль выбирается по **соседнему слову**, а не по существительному: lo studente, но **il** bravo studente; l’amico, но **il** mio amico... (притяжательные — позже).

Название языка обычно с артиклем: **l’italiano** è bello. Но после parlare/studiare артикль можно опустить: parlo italiano.`,
        examples: [
          {
            it: 'Il caffè e il cornetto, per favore.',
            ru: 'Кофе и круассан, пожалуйста.',
            az: 'Qəhvə və kruasan, zəhmət olmasa.',
          },
          {
            it: "L’università e la stazione sono vicine.",
            ru: 'Университет и вокзал рядом.',
            az: 'Universitet və vağzal yaxındır.',
          },
        ],
      },
    ],
    drills: [
      { prompt: 'Артикль: ___ libro', answer: 'il', hint: 'Мужской род, обычная согласная → il.' },
      { prompt: 'Артикль: ___ studente', answer: 'lo', hint: 's + согласная → lo.' },
      { prompt: 'Артикль: ___ zaino', answer: 'lo', hint: 'z → lo.' },
      { prompt: 'Артикль: ___ amico', answer: "l'", hint: 'Мужской род перед гласной → l’.' },
      { prompt: 'Артикль: ___ amici', answer: 'gli', hint: 'Мн. ч. от l’ → gli.' },
      { prompt: 'Артикль: ___ studenti', answer: 'gli', hint: 'Мн. ч. от lo → gli.' },
      { prompt: 'Артикль: ___ libri', answer: 'i', hint: 'Мн. ч. от il → i.' },
      { prompt: 'Артикль: ___ ragazza', answer: 'la', hint: 'Женский род, согласная → la.' },
      { prompt: 'Артикль: ___ università (ед. ч.)', answer: "l'", hint: 'Женский род перед гласной → l’.' },
      { prompt: 'Артикль: ___ università (мн. ч.)', answer: 'le', hint: 'Женский род мн. ч. — всегда le.' },
      { prompt: 'Артикль: ___ amiche', answer: 'le', hint: 'Женский род мн. ч. — le, без апострофа.' },
      { prompt: 'Артикль: ___ psicologo', answer: 'lo', hint: 'ps → lo.' },
      { prompt: 'Артикль: ___ gnocchi', answer: 'gli', hint: 'gn → lo / gli.' },
      { prompt: 'Артикль: ___ caffè', answer: 'il', hint: 'Мужской род, согласная c → il.' },
      { prompt: 'Артикль: ___ zii', answer: 'gli', hint: 'z → gli во мн. ч.' },
      { prompt: 'Артикль: ___ yogurt', answer: 'lo', hint: 'y → lo.' },
      { prompt: 'Артикль: ___ professori', answer: 'i', hint: 'Мн. ч., согласная → i.' },
      { prompt: 'Артикль: ___ orologio', answer: "l'", hint: 'Мужской род перед гласной → l’.' },
    ],
  },
  {
    id: 'u00-avere',
    unit: 0,
    title: 'Глагол avere, chiamarsi, числа 0–30',
    goal: 'Представиться, назвать возраст («Ho 19 anni») и считать до 30.',
    sections: [
      {
        title: 'Глагол avere — «иметь»',
        text: `**avere** = «иметь», но переводится чаще как «у меня есть»: Ho un fratello — У меня есть брат.

Буква **h** не читается: ho = [о], hai = [аи], ha = [а], hanno = [анно]. Она нужна, чтобы отличать слова на письме: **ho** (имею) / **o** (или); **ha** (имеет) / **a** (в, к); **hanno** (имеют) / **anno** (год).

**Возраст — через avere!** Quanti anni hai? — **Ho** diciannove anni. Типичная ошибка русскоговорящих: «Sono 19 anni» — так нельзя.

Ещё выражения с avere, где в русском другие конструкции: **avere fame** (быть голодным), **avere sete** (хотеть пить), **avere freddo / caldo** (мёрзнуть / жарко), **avere sonno** (хотеть спать), **avere fretta** (спешить), **avere ragione** (быть правым).`,
        tables: [
          {
            title: 'avere (presente)',
            head: ['', 'avere'],
            rows: [
              ['io', 'ho'],
              ['tu', 'hai'],
              ['lui / lei / Lei', 'ha'],
              ['noi', 'abbiamo'],
              ['voi', 'avete'],
              ['loro', 'hanno'],
            ],
          },
        ],
        examples: [
          {
            it: 'Quanti anni hai? — Ho diciannove anni.',
            ru: 'Сколько тебе лет? — Мне девятнадцать.',
            az: 'Neçə yaşın var? — On doqquz yaşım var.',
          },
          {
            it: 'Ho fame: andiamo a mangiare?',
            ru: 'Я голоден: пойдём поедим?',
            az: 'Acmışam: gedək yemək yeyək?',
          },
          {
            it: 'Marco e Luca hanno una casa in centro.',
            ru: 'У Марко и Луки есть дом в центре.',
            az: 'Marko ilə Lukanın mərkəzdə evi var.',
          },
        ],
      },
      {
        title: 'Chiamarsi — «зваться»',
        text: `«Как тебя зовут?» по-итальянски буквально «Как ты себя называешь?» — **Come ti chiami?** — **Mi chiamo** Ali.

Это **возвратный** глагол: перед формой стоит частица mi / ti / si / ci / vi / si. Сам глагол спрягается как обычный на -are (chiamare).

Вежливо: **Come si chiama?** (Как Вас зовут?). Тот же вопрос значит и «Как его/её зовут?».

Ошибка: «Io chiamo Ali» = «Я зову Али». Без **mi** смысл меняется!`,
        tables: [
          {
            title: 'chiamarsi (presente)',
            head: ['', 'chiamarsi'],
            rows: [
              ['io', 'mi chiamo'],
              ['tu', 'ti chiami'],
              ['lui / lei / Lei', 'si chiama'],
              ['noi', 'ci chiamiamo'],
              ['voi', 'vi chiamate'],
              ['loro', 'si chiamano'],
            ],
          },
        ],
        examples: [
          {
            it: 'Ciao, come ti chiami? — Mi chiamo Elena.',
            ru: 'Привет, как тебя зовут? — Меня зовут Елена.',
            az: 'Salam, adın nədir? — Mənim adım Yelenadır.',
          },
          {
            it: 'La professoressa si chiama Giulia Bianchi.',
            ru: 'Преподавательницу зовут Джулия Бьянки.',
            az: 'Müəllimənin adı Culiya Byankidir.',
          },
        ],
      },
      {
        title: 'Числа 0–30',
        text: `Запомните группы:
- **0–10**: zero, uno, due, tre, quattro, cinque, sei, sette, otto, nove, dieci.
- **11–16** оканчиваются на **-dici**: undici, dodici, tredici, quattordici, quindici, sedici.
- **17–19** начинаются с **dicia-**: diciassette, diciotto, diciannove.
- **20–29**: venti + единица. Перед **uno** и **otto** (гласная!) конечная -i выпадает: **ventuno, ventotto**. **ventitré** пишется с ударением.
- **30**: trenta.

Совет: числа 11–16 — «единица + dici», 17–19 — «dicia + единица». Порядок меняется на 17!`,
        tables: [
          {
            title: 'Числа',
            head: ['', '', '', ''],
            rows: [
              ['0 zero', '8 otto', '16 sedici', '24 ventiquattro'],
              ['1 uno', '9 nove', '17 diciassette', '25 venticinque'],
              ['2 due', '10 dieci', '18 diciotto', '26 ventisei'],
              ['3 tre', '11 undici', '19 diciannove', '27 ventisette'],
              ['4 quattro', '12 dodici', '20 venti', '28 ventotto'],
              ['5 cinque', '13 tredici', '21 ventuno', '29 ventinove'],
              ['6 sei', '14 quattordici', '22 ventidue', '30 trenta'],
              ['7 sette', '15 quindici', '23 ventitré', ''],
            ],
          },
        ],
        examples: [
          {
            it: 'Nella mia classe ci sono diciotto studenti.',
            ru: 'В моём классе восемнадцать студентов.',
            az: 'Mənim sinfimdə on səkkiz tələbə var.',
          },
          {
            it: 'Mia sorella ha ventitré anni.',
            ru: 'Моей сестре двадцать три года.',
            az: 'Bacımın iyirmi üç yaşı var.',
          },
        ],
      },
    ],
    drills: [
      { prompt: 'avere · io', answer: 'ho', hint: 'h не читается: ho = [о].' },
      { prompt: 'avere · tu', answer: 'hai', hint: 'tu hai.' },
      { prompt: 'avere · lei', answer: 'ha', hint: 'lei ha.' },
      { prompt: 'avere · noi', answer: 'abbiamo', hint: 'Двойное bb: abbiamo.' },
      { prompt: 'avere · voi', answer: 'avete', hint: 'voi avete.' },
      { prompt: 'avere · loro', answer: 'hanno', hint: 'С h! anno без h = «год».' },
      { prompt: 'chiamarsi · io', answer: 'mi chiamo', hint: 'mi + chiamo.' },
      { prompt: 'chiamarsi · tu', answer: 'ti chiami', hint: 'ti + chiami.' },
      { prompt: 'chiamarsi · lei', answer: 'si chiama', hint: 'si + chiama.' },
      { prompt: 'Quanti anni hai? — ___ diciannove anni.', answer: 'ho', hint: 'Возраст — через avere, не essere!' },
      { prompt: 'Marco ___ (avere) ventidue anni.', answer: 'ha', hint: 'avere · lui.' },
      { prompt: 'Io ___ fame. (я голоден)', answer: 'ho', hint: 'avere fame.' },
      { prompt: 'Число: 17', answer: 'diciassette', hint: '17–19 начинаются с dicia-.' },
      { prompt: 'Число: 14', answer: 'quattordici', hint: '11–16 оканчиваются на -dici.' },
      { prompt: 'Число: 21', answer: 'ventuno', hint: 'venti + uno: i выпадает.' },
      { prompt: 'Число: 28', answer: 'ventotto', hint: 'venti + otto: i выпадает.' },
      { prompt: 'Число: 23', answer: 'ventitré', hint: 'Ударение на конце пишется: -tré.' },
      { prompt: 'Число: 15', answer: 'quindici', hint: '15 = quindici.' },
      { prompt: 'Come ___ (chiamarsi) voi?', answer: 'vi chiamate', hint: 'vi + chiamate.' },
    ],
  },
];
