import type { Lesson } from '../types';

// Unit 1 "Un nuovo inizio": presente dei verbi regolari, articolo indeterminativo, forma di cortesia.
export const lessons: Lesson[] = [
  {
    id: 'u01-presente',
    unit: 1,
    title: 'Настоящее время — presente (-are, -ere, -ire)',
    goal: 'Спрягать любой правильный глагол в настоящем времени, включая тип -isc- (capisco, finisco).',
    sections: [
      {
        title: 'Три спряжения',
        text: `Все глаголы делятся на три группы по окончанию инфинитива: **-are** (parlare), **-ere** (vivere), **-ire** (dormire). Отбрасываем окончание — получаем основу (parl-, viv-, dorm-) — и добавляем окончания лица.

Окончания **io -o, tu -i, noi -iamo** одинаковы у всех трёх групп! Различаются только lui/lei, voi и loro:
- **-are**: parl**a**, parl**ate**, parl**ano**
- **-ere**: viv**e**, viv**ete**, viv**ono**
- **-ire**: dorm**e**, dorm**ite**, dorm**ono**

Мнемоника: в voi всегда «звучит» гласная инфинитива — parl**a**te, viv**e**te, dorm**i**te.

**Ударение в loro** падает на основу, а не на окончание: **PAR**lano, **VI**vono, **DOR**mono. Не говорите «parLAno»!`,
        tables: [
          {
            title: 'parlare · vivere · dormire',
            head: ['', 'parlare', 'vivere', 'dormire'],
            rows: [
              ['io', 'parlo', 'vivo', 'dormo'],
              ['tu', 'parli', 'vivi', 'dormi'],
              ['lui / lei', 'parla', 'vive', 'dorme'],
              ['noi', 'parliamo', 'viviamo', 'dormiamo'],
              ['voi', 'parlate', 'vivete', 'dormite'],
              ['loro', 'parlano', 'vivono', 'dormono'],
            ],
          },
        ],
        examples: [
          {
            it: 'Abito a Bologna e studio Ingegneria.',
            ru: 'Я живу в Болонье и учусь на инженерном.',
            az: 'Bolonyada yaşayıram və mühəndislik oxuyuram.',
          },
          {
            it: 'Parli italiano? — Sì, un po’.',
            ru: 'Ты говоришь по-итальянски? — Да, немного.',
            az: 'İtalyanca danışırsan? — Bəli, bir az.',
          },
          {
            it: 'La sera leggiamo e dormiamo presto.',
            ru: 'Вечером мы читаем и рано ложимся спать.',
            az: 'Axşam oxuyuruq və tez yatırıq.',
          },
        ],
      },
      {
        title: 'Глаголы -ire с -isc-: capire, finire, preferire',
        text: `Многие глаголы на -ire вставляют **-isc-** между основой и окончанием — но **только в io, tu, lui/lei и loro**. В noi и voi вставки нет!

Мнемоника: **«ботинок»** — если обвести формы с -isc- в таблице, получится контур ботинка (1, 2, 3 лицо ед. ч. + loro), а noi/voi остаются снаружи.

Произношение: cap**isco** [каписко], cap**isci** [капиши], cap**isce** [капише], cap**iscono** [каписконо] — правило sc + e/i = [ш].

Частые глаголы этого типа: capire, finire, preferire, pulire, spedire, costruire. А вот dormire, partire, aprire, sentire, offrire — **без** -isc-. Это просто нужно запомнить.`,
        tables: [
          {
            title: 'capire · finire · preferire',
            head: ['', 'capire', 'finire', 'preferire'],
            rows: [
              ['io', 'capisco', 'finisco', 'preferisco'],
              ['tu', 'capisci', 'finisci', 'preferisci'],
              ['lui / lei', 'capisce', 'finisce', 'preferisce'],
              ['noi', 'capiamo', 'finiamo', 'preferiamo'],
              ['voi', 'capite', 'finite', 'preferite'],
              ['loro', 'capiscono', 'finiscono', 'preferiscono'],
            ],
          },
        ],
        examples: [
          {
            it: 'Scusi, non capisco. Può ripetere?',
            ru: 'Извините, я не понимаю. Можете повторить?',
            az: 'Bağışlayın, başa düşmürəm. Təkrar edə bilərsiniz?',
          },
          {
            it: 'La lezione finisce alle undici.',
            ru: 'Занятие заканчивается в одиннадцать.',
            az: 'Dərs saat on birdə bitir.',
          },
          {
            it: 'Preferisco il tè, ma i miei amici preferiscono il caffè.',
            ru: 'Я предпочитаю чай, а мои друзья предпочитают кофе.',
            az: 'Mən çayı üstün tuturam, dostlarım isə qəhvəni.',
          },
        ],
      },
      {
        title: 'Орфография: -care/-gare и -iare',
        text: `**-care / -gare** (cercare, pagare): перед окончаниями на **-i** (tu, noi) добавляем **h**, чтобы сохранить твёрдый звук: cer**chi**, cer**chiamo**; pa**ghi**, pa**ghiamo**. Без h было бы «cerci» [черчи] — другой звук!

**-iare** (studiare, mangiare, cominciare): в tu и noi **не удваиваем i**: tu studi (не «studii»), noi studiamo, tu mangi, noi mangiamo, tu cominci, noi cominciamo.

Остальные формы — как обычно: io cerco, lui paga, voi studiate, loro mangiano.`,
        tables: [
          {
            title: 'cercare · pagare',
            head: ['', 'cercare', 'pagare'],
            rows: [
              ['io', 'cerco', 'pago'],
              ['tu', 'cerchi', 'paghi'],
              ['lui / lei', 'cerca', 'paga'],
              ['noi', 'cerchiamo', 'paghiamo'],
              ['voi', 'cercate', 'pagate'],
              ['loro', 'cercano', 'pagano'],
            ],
          },
          {
            title: 'studiare · mangiare · cominciare',
            head: ['', 'studiare', 'mangiare', 'cominciare'],
            rows: [
              ['io', 'studio', 'mangio', 'comincio'],
              ['tu', 'studi', 'mangi', 'cominci'],
              ['lui / lei', 'studia', 'mangia', 'comincia'],
              ['noi', 'studiamo', 'mangiamo', 'cominciamo'],
              ['voi', 'studiate', 'mangiate', 'cominciate'],
              ['loro', 'studiano', 'mangiano', 'cominciano'],
            ],
          },
        ],
        examples: [
          {
            it: 'Cerchi casa a Bologna? È difficile!',
            ru: 'Ищешь жильё в Болонье? Это трудно!',
            az: 'Bolonyada ev axtarırsan? Çətindir!',
          },
          {
            it: 'Oggi paghiamo noi il caffè.',
            ru: 'Сегодня за кофе платим мы.',
            az: 'Bu gün qəhvənin pulunu biz ödəyirik.',
          },
          {
            it: 'Dove mangi a pranzo? — Mangio in mensa.',
            ru: 'Где ты обедаешь? — В столовой.',
            az: 'Nahar harada yeyirsən? — Yeməkxanada yeyirəm.',
          },
        ],
      },
    ],
    drills: [
      { prompt: 'parlare · noi', answer: 'parliamo', hint: 'noi: -iamo во всех спряжениях.' },
      { prompt: 'abitare · io', answer: 'abito', hint: 'io: -o. Ударение на первый слог: A-bi-to.' },
      { prompt: 'vivere · loro', answer: 'vivono', hint: '-ere, loro: -ono.' },
      { prompt: 'prendere · tu', answer: 'prendi', hint: 'tu: -i.' },
      { prompt: 'dormire · voi', answer: 'dormite', hint: '-ire, voi: -ite.' },
      { prompt: 'aprire · lei', answer: 'apre', hint: '-ire без -isc-, lui/lei: -e.' },
      { prompt: 'capire · io', answer: 'capisco', hint: 'Тип -isc-: cap-isc-o.' },
      { prompt: 'capire · noi', answer: 'capiamo', hint: 'В noi вставки -isc- нет!' },
      { prompt: 'finire · loro', answer: 'finiscono', hint: 'loro — внутри «ботинка»: -iscono.' },
      { prompt: 'preferire · tu', answer: 'preferisci', hint: 'tu: -isci.' },
      { prompt: 'cercare · tu', answer: 'cerchi', hint: '+h перед i: cerchi.' },
      { prompt: 'pagare · noi', answer: 'paghiamo', hint: '+h перед i: paghiamo.' },
      { prompt: 'studiare · tu', answer: 'studi', hint: 'Одна i: studi.' },
      { prompt: 'mangiare · noi', answer: 'mangiamo', hint: 'Не удваиваем i: mangiamo.' },
      { prompt: "Io ___ (studiare) all'Università di Bologna.", answer: 'studio', hint: 'studiare · io.' },
      { prompt: 'Anna ___ (lavorare) in un bar.', answer: 'lavora', hint: '-are, lei: -a.' },
      { prompt: 'Voi ___ (leggere) il giornale?', answer: 'leggete', hint: '-ere, voi: -ete.' },
      { prompt: 'Loro ___ (partire) domani.', answer: 'partono', hint: 'partire без -isc-: partono.' },
      { prompt: "Tu ___ (capire) l'italiano?", answer: 'capisci', hint: 'capire · tu: capisci [капиши].' },
      { prompt: 'Noi ___ (cominciare) alle nove.', answer: 'cominciamo', hint: 'Одна i: cominciamo.' },
    ],
  },
  {
    id: 'u01-articolo-indet',
    unit: 1,
    title: 'Неопределённый артикль — un, uno, una, un’',
    goal: 'Говорить «один / какой-то»: un caffè, uno studente, una ragazza, un’amica; согласовывать прилагательные на -e.',
    sections: [
      {
        title: 'Четыре формы',
        text: `Неопределённый артикль = «один, какой-то». Он вводит **новый** предмет: Ho **un** amico a Bologna. Когда предмет уже известен — определённый: **L’**amico si chiama Luca.

**Мужской род:**
- **un** → перед согласной **и перед гласной**: un libro, un amico, un caffè.
- **uno** → там же, где lo: **s + согласная, z, gn, ps, y**: uno studente, uno zaino, uno psicologo, uno sport.

**Женский род:**
- **una** → перед согласной: una ragazza, una studentessa.
- **un’** (с апострофом!) → перед гласной: un’amica, un’università.

Множественного числа у этого артикля нет (вместо него — партитив dei, degli, delle, это будет в разделе 3).`,
        tables: [
          {
            title: 'Определённый и неопределённый артикль',
            head: ['', 'неопределённый', 'определённый', 'пример'],
            rows: [
              ['м. + согласная', 'un', 'il', 'un libro / il libro'],
              ['м. + s+согл., z, ps, gn, y', 'uno', 'lo', 'uno studente / lo studente'],
              ['м. + гласная', 'un', 'l’', 'un amico / l’amico'],
              ['ж. + согласная', 'una', 'la', 'una casa / la casa'],
              ['ж. + гласная', 'un’', 'l’', 'un’amica / l’amica'],
            ],
          },
        ],
        examples: [
          {
            it: 'Prendo un caffè e una brioche.',
            ru: 'Я возьму кофе и бриошь.',
            az: 'Bir qəhvə və bir briyoş alıram.',
          },
          {
            it: "Ho un amico e un’amica a Bologna.",
            ru: 'У меня в Болонье есть друг и подруга.',
            az: 'Bolonyada bir dostum və bir rəfiqəm var.',
          },
          {
            it: 'Luca è uno studente di Medicina.',
            ru: 'Лука — студент-медик.',
            az: 'Luka tibb tələbəsidir.',
          },
        ],
      },
      {
        title: 'Апостроф: только для женского рода!',
        text: `Главная ловушка: **un amico** — без апострофа, а **un’amica** — с апострофом.

Почему? Мужской артикль **un** — полная форма, ей нечего «терять». А **un’** — это **una**, у которой выпала **a** перед гласной. Апостроф показывает пропавшую букву.

Проверка: замените на прилагательное перед словом. Если в женском роде получится **una** (una bella amica) — без прилагательного будет **un’amica**.`,
      },
      {
        title: 'Прилагательные на -e',
        text: `Прилагательные на **-e** имеют только две формы: **-e** в единственном и **-i** во множественном, **одинаково для мужского и женского рода**.

un ragazzo inglese — una ragazza inglese — due ragazzi inglesi — due ragazze inglesi.

Частые: inglese, francese, cinese, giapponese, gentile, interessante, intelligente, grande, felice, difficile, facile, importante.

Сравните с прилагательными на -o: russo/russa/russi/russe, italiano/italiana. Для Азербайджана: **azero / azera** (или azerbaigiano / azerbaigiana).`,
        tables: [
          {
            title: 'Тип -e',
            head: ['', 'ед. число', 'мн. число'],
            rows: [
              ['м.', 'un libro interessante', 'due libri interessanti'],
              ['ж.', 'una lezione interessante', 'due lezioni interessanti'],
            ],
          },
        ],
        examples: [
          {
            it: 'Sara è una ragazza francese molto gentile.',
            ru: 'Сара — очень любезная девушка-француженка.',
            az: 'Sara çox nəzakətli fransız qızıdır.',
          },
          {
            it: 'Bologna è una città grande e interessante.',
            ru: 'Болонья — большой и интересный город.',
            az: 'Bolonya böyük və maraqlı şəhərdir.',
          },
        ],
      },
    ],
    drills: [
      { prompt: 'Артикль: ___ libro', answer: 'un', hint: 'Мужской род, согласная → un.' },
      { prompt: 'Артикль: ___ studente', answer: 'uno', hint: 's + согласная → uno.' },
      { prompt: 'Артикль: ___ zaino', answer: 'uno', hint: 'z → uno.' },
      { prompt: 'Артикль: ___ amico', answer: 'un', hint: 'Мужской род перед гласной → un, без апострофа!' },
      { prompt: 'Артикль: ___ amica', answer: "un'", hint: 'Женский род перед гласной → un’ (с апострофом).' },
      { prompt: 'Артикль: ___ ragazza', answer: 'una', hint: 'Женский род, согласная → una.' },
      { prompt: 'Артикль: ___ università', answer: "un'", hint: 'Женский род перед гласной → un’.' },
      { prompt: 'Артикль: ___ caffè', answer: 'un', hint: 'Мужской род, согласная → un.' },
      { prompt: 'Артикль: ___ psicologo', answer: 'uno', hint: 'ps → uno.' },
      { prompt: 'Артикль: ___ aula', answer: "un'", hint: 'aula — женский род, гласная → un’.' },
      { prompt: 'Артикль: ___ sport', answer: 'uno', hint: 's + согласная → uno.' },
      { prompt: 'Артикль: ___ euro', answer: 'un', hint: 'Мужской род перед гласной → un.' },
      { prompt: 'Артикль: ___ lezione', answer: 'una', hint: '-zione — женский род → una.' },
      { prompt: 'Anna è una ragazza ___ (inglese).', answer: 'inglese', hint: 'Inglese одинаково для м. и ж.' },
      { prompt: 'Marco è un ragazzo ___ (gentile).', answer: 'gentile', hint: 'Ед. ч.: -e.' },
      { prompt: 'Le lezioni sono ___ (interessante).', answer: 'interessanti', hint: 'Мн. ч.: -i, и для женского рода тоже.' },
      { prompt: 'Aysel è una studentessa ___ (azero).', answer: 'azera', hint: 'Тип -o: женский род -a.' },
      { prompt: 'Ho ___ amico a Bologna.', answer: 'un', hint: 'amico — мужской род: un, без апострофа.' },
    ],
  },
  {
    id: 'u01-lei',
    unit: 1,
    title: 'Вежливая форма Lei — tu или Lei?',
    goal: 'Вежливо обращаться к преподавателю и незнакомым людям: «Come si chiama? Di dov’è?».',
    sections: [
      {
        title: 'Lei = «Вы» в 3-м лице',
        text: `В русском вежливое «Вы» — это форма 2-го лица множественного числа. В итальянском всё иначе: вежливо обращаются через **Lei** — местоимение 3-го лица **единственного числа** (буквально «она»).

Значит, глагол стоит **в форме lui/lei**: Lei **è** di Bologna? Lei **parla** inglese? Come **si chiama**?

Это работает и для мужчины, и для женщины: Professore, Lei è italiano? — Signora, Lei è italiana? (прилагательное согласуется с реальным полом собеседника).

В письме Lei часто пишут **с большой буквы**, чтобы отличать от lei = «она». В речи различаем по контексту.

Мнемоника: **«Вы — это он/она»**. Говорите с преподавателем так, будто рассказываете о нём.`,
        tables: [
          {
            title: 'tu → Lei',
            head: ['', 'tu (на ты)', 'Lei (на Вы)'],
            rows: [
              ['essere', 'sei', 'è'],
              ['avere', 'hai', 'ha'],
              ['chiamarsi', 'ti chiami', 'si chiama'],
              ['parlare', 'parli', 'parla'],
              ['abitare', 'abiti', 'abita'],
              ['capire', 'capisci', 'capisce'],
            ],
          },
        ],
        examples: [
          {
            it: 'Buongiorno, professore. Come sta?',
            ru: 'Здравствуйте, профессор. Как Вы поживаете?',
            az: 'Sabahınız xeyir, professor. Necəsiniz?',
          },
          {
            it: 'Signora, Lei di dov’è?',
            ru: 'Синьора, откуда Вы?',
            az: 'Xanım, Siz haralısınız?',
          },
          {
            it: 'Scusi, Lei parla inglese?',
            ru: 'Извините, Вы говорите по-английски?',
            az: 'Bağışlayın, Siz ingiliscə danışırsınız?',
          },
        ],
      },
      {
        title: 'Когда tu, а когда Lei',
        text: `**tu** — друзья, однокурсники, ровесники, семья, дети. Среди студентов в Болонье все сразу на «tu».
**Lei** — преподаватели, сотрудники университета и банка, продавцы, пожилые люди, незнакомые взрослые.
**voi** — обращение к нескольким людям (и на «ты», и вежливо): Ragazzi, voi siete pronti?

Приветствия тоже меняются:
- неформально: **Ciao!** (и привет, и пока), Come stai? Scusa!
- формально: **Buongiorno / Buonasera, ArrivederLa / Arrivederci**, Come sta? **Scusi!**

Типичная ошибка: сказать преподавателю «Ciao, come stai?». Правильно: **Buongiorno, come sta?** Если сомневаетесь — начинайте с Lei; итальянец сам предложит: «Diamoci del tu!» (Давай на ты!).`,
        examples: [
          {
            it: 'Ciao Luca, come stai? — Bene, grazie, e tu?',
            ru: 'Привет, Лука, как дела? — Хорошо, спасибо, а у тебя?',
            az: 'Salam Luka, necəsən? — Yaxşıyam, sağ ol, bəs sən?',
          },
          {
            it: 'Buonasera, signor Rossi. Lei abita qui?',
            ru: 'Добрый вечер, синьор Росси. Вы здесь живёте?',
            az: 'Axşamınız xeyir, cənab Rossi. Siz burada yaşayırsınız?',
          },
        ],
      },
    ],
    drills: [
      { prompt: '(tu) Come ti chiami? → (Lei) Come ___?', answer: 'si chiama', hint: 'Lei = форма lui/lei: si chiama.' },
      { prompt: 'tu sei → Lei ___', answer: 'è', hint: 'essere · lui/lei.' },
      { prompt: 'tu hai → Lei ___', answer: 'ha', hint: 'avere · lui/lei.' },
      { prompt: 'tu parli → Lei ___', answer: 'parla', hint: '-are, 3 л. ед. ч.: -a.' },
      { prompt: 'tu abiti → Lei ___', answer: 'abita', hint: '-are, 3 л. ед. ч.: -a.' },
      { prompt: 'tu capisci → Lei ___', answer: 'capisce', hint: 'capire · lui/lei: capisce.' },
      { prompt: 'tu prendi → Lei ___', answer: 'prende', hint: '-ere, 3 л. ед. ч.: -e.' },
      { prompt: 'Professore, Lei ___ (essere) di Bologna?', answer: 'è', hint: 'Lei + форма 3 л. ед. ч.' },
      { prompt: 'Signora, ___ (avere) un minuto?', answer: 'ha', hint: 'Вежливо: avere · Lei = ha.' },
      { prompt: 'Signor Rossi, Lei ___ (lavorare) qui?', answer: 'lavora', hint: 'lavorare · Lei.' },
      { prompt: '(tu) Come stai? → (Lei) Come ___?', answer: 'sta', hint: 'stare · Lei = sta.' },
      { prompt: '(tu) Di dove sei? → (Lei) Di dove ___?', answer: 'è', hint: 'essere · Lei.' },
      { prompt: '(tu) Quanti anni hai? → (Lei) Quanti anni ___?', answer: 'ha', hint: 'avere · Lei.' },
      { prompt: 'Профессору (извините): Scusa или Scusi?', answer: 'scusi', hint: 'Scusi — вежливо (Lei), scusa — на «ты».' },
      { prompt: 'Утром преподавателю: ___! (не ciao)', answer: 'buongiorno', also: ['buondì'], hint: 'Формальное приветствие днём — buongiorno.' },
      { prompt: 'Ragazzi, voi ___ (essere) pronti?', answer: 'siete', hint: 'Несколько людей → voi: siete.' },
    ],
  },
];
