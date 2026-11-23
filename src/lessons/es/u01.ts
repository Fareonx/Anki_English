import type { Lesson } from '../types';

// Unit 1 "Hola": alfabeto y pronunciación, género y número, artículos.
export const lessons: Lesson[] = [
  {
    id: 'es-u01-alfabeto',
    unit: 1,
    title: 'Алфавит и произношение — el alfabeto',
    goal: 'Правильно читать любое испанское слово и ставить ударение по правилам и по знаку tilde.',
    sections: [
      {
        title: 'Читаем как пишется — почти',
        text: `Испанский — один из самых «честных» языков: **как написано, так и читается**. Гласные a, e, i, o, u всегда звучат чётко, **без редукции**: «o» никогда не превращается в «а», как в русском «молоко». Говорите **to-ma-te**, а не «тамати».

Ловушки для русскоговорящих:
- **h** — всегда немая: **h**ola [ола], a**h**ora [аора]. Это буква-призрак.
- **ñ** — как русское «нь»: espa**ñ**a [эспанья], ma**ñ**ana [маньяна].
- **ll** и **y** — как мягкое «й» (в Латинской Америке часто «ж/ш»): **ll**amo [йамо], **y**o [йо]. Отдельное **y** («и») читается [и].
- **v** и **b** звучат **одинаково** — как мягкое [б]: **v**ino [бино], **V**alencia [баленсья]. Не произносите русское «в»!
- **j** (и **g** перед e, i) — хриплое [х], как в «хорошо», только глубже: **j**amón [хамон], **g**ente [хэнтэ].
- **r** в середине — один удар [р]: pe**r**o («но»). **rr** и **r** в начале слова — раскатистое [ррр]: pe**rr**o («собака»), **r**osa. Pero ≠ perro!`,
        tables: [
          {
            title: 'Буквы с двумя «лицами»',
            head: ['', 'перед a, o, u', 'перед e, i'],
            rows: [
              ['c', '[к]: casa, cosa, Cuba', '[θ] (Испания) / [с]: cena, cine'],
              ['g', '[г]: gato, gol, gusto', '[х]: gente, gimnasio'],
              ['z', '[θ] / [с]: zapato, zona, zumo', 'почти не встречается — пишут c: cero, cine'],
              ['qu', '—', '[к]: queso, quiero (u не читается)'],
              ['gu', '—', '[г]: guerra, guitarra (u не читается)'],
              ['gü', '—', '[гу]: pingüino, bilingüe'],
            ],
          },
        ],
        examples: [
          { it: 'Hola, me llamo Javier.', ru: 'Привет, меня зовут Хавьер.', az: 'Salam, mənim adım Xavyerdir.' },
          { it: 'El perro come pero no bebe.', ru: 'Собака ест, но не пьёт.', az: 'İt yeyir, amma içmir.' },
          { it: 'Mañana voy a Valencia.', ru: 'Завтра я еду в Валенсию.', az: 'Sabah Valensiyaya gedirəm.' },
          { it: 'Quiero queso y jamón.', ru: 'Я хочу сыр и хамон.', az: 'Pendir və jamon istəyirəm.' },
        ],
      },
      {
        title: 'Ударение и знак tilde',
        text: `Ударение в испанском подчиняется **двум простым правилам**:
1. Слово кончается на **гласную, -n или -s** → ударение на **предпоследний** слог: **CA**-sa, ha-**BLA**-mos, **JO**-ven.
2. Слово кончается на **другую согласную** → ударение на **последний** слог: ha-**BLAR**, ciu-**DAD**, es-pa-**ÑOL**.

Если слово **нарушает** правило — над ударной гласной ставится **tilde** (´): ca-**FÉ**, a-**DIÓS**, ár-bol, **MÉ**-di-co, ca-**MIÓN**. Мнемоника: **«Tilde = исключение»**. Видишь значок — дави туда, не видишь — работают правила.

Tilde ещё различает слова-близнецы: **tú** (ты) — tu (твой), **él** (он) — el (артикль), **sí** (да) — si (если), **más** (больше) — mas. Во всех вопросительных словах tilde обязательна: **¿qué?, ¿cómo?, ¿dónde?**

**¿ ¡** — перевёрнутые знаки в **начале** вопроса и восклицания: ¿Cómo estás? ¡Qué bien! Испанец заранее «слышит» интонацию.`,
        tables: [
          {
            title: 'Где ударение?',
            head: ['', 'слово', 'почему'],
            rows: [
              ['1', 'CA-sa, HA-blan, LU-nes', 'гласная / -n / -s → предпоследний слог'],
              ['2', 'ha-BLAR, re-LOJ, Ma-DRID', 'другая согласная → последний слог'],
              ['3', 'ca-FÉ, a-DIÓS, ÁR-bol', 'нарушение правила → tilde'],
              ['4', 'te-LÉ-fo-no, MÚ-si-ca', 'третий слог от конца → всегда tilde'],
            ],
          },
        ],
        examples: [
          { it: '¿Cómo te llamas?', ru: 'Как тебя зовут?', az: 'Adın nədir?' },
          { it: '¡Qué bonito!', ru: 'Как красиво!', az: 'Nə gözəldir!' },
          { it: 'Tú tienes tu libro y él tiene el café.', ru: 'У тебя твоя книга, а у него — кофе.', az: 'Sənin öz kitabın var, onun isə qəhvəsi.' },
        ],
      },
    ],
    drills: [
      { prompt: 'Напишите по-испански: «да» (с tilde)', answer: 'sí', hint: 'sí = да, si = если.' },
      { prompt: 'Напишите по-испански: «ты» (с tilde)', answer: 'tú', hint: 'tú = ты, tu = твой.' },
      { prompt: 'Напишите по-испански: «он» (с tilde)', answer: 'él', hint: 'él = он, el = артикль.' },
      { prompt: 'Напишите слово целиком, вставив букву: ma_ana (завтра)', answer: 'mañana', hint: 'ñ = «нь».' },
      { prompt: 'Напишите слово целиком, вставив букву: Espa_a', answer: 'España', hint: 'ñ = «нь».' },
      { prompt: 'Напишите слово целиком, вставив немую букву: _ola', answer: 'hola', hint: 'h не читается, но пишется.' },
      { prompt: 'Напишите слово целиком, вставив qu или c: ___eso (сыр)', answer: 'queso', hint: 'Звук [к] перед e пишется qu.' },
      { prompt: 'Напишите слово целиком, вставив c или qu: ___asa (дом)', answer: 'casa', hint: 'Перед a звук [к] пишется c.' },
      { prompt: 'Напишите слово целиком, вставив g или gu: ___itarra (гитара)', answer: 'guitarra', hint: 'Твёрдое [г] перед i пишется gu.' },
      { prompt: 'Напишите слово целиком, вставив j или g: ___ente (люди) — [хэнтэ]', answer: 'gente', hint: 'gente пишется с g: g перед e = [х].' },
      { prompt: 'Напишите слово целиком, вставив r или rr: pe___o (собака)', answer: 'perro', hint: 'Раскатистое [ррр] между гласными = rr.' },
      { prompt: 'Напишите слово целиком, вставив r или rr: pe___o (но)', answer: 'pero', hint: 'pero (но) — одно r.' },
      { prompt: 'Поставьте tilde: cafe', answer: 'café', hint: 'Ударение на последний слог при конце на гласную → tilde.' },
      { prompt: 'Поставьте tilde: adios', answer: 'adiós', hint: 'Кончается на -s, но ударение на последний слог → tilde.' },
      { prompt: 'Поставьте tilde: telefono', answer: 'teléfono', hint: 'Ударение на третий слог от конца → всегда tilde.' },
      { prompt: 'Поставьте tilde: musica', answer: 'música', hint: 'MÚ-si-ca: третий слог от конца.' },
      { prompt: 'Поставьте tilde: arbol (дерево)', answer: 'árbol', hint: 'Кончается на -l, но ударение на первый слог → tilde.' },
      { prompt: 'Нужна ли tilde? ciudad — напишите слово правильно', answer: 'ciudad', hint: 'Кончается на -d, ударение на последний слог по правилу → tilde не нужна.' },
      { prompt: 'Вопросительное слово с tilde: ¿___ te llamas? (как)', answer: 'cómo', hint: 'Вопросительные слова всегда с tilde: cómo.' },
    ],
  },
  {
    id: 'es-u01-genero',
    unit: 1,
    title: 'Род, число и артикли — el, la, un, una',
    goal: 'Определять род существительного, образовывать множественное число и ставить правильный артикль.',
    sections: [
      {
        title: 'Мужской и женский род',
        text: `В испанском **два рода**: мужской и женский. Среднего рода у существительных нет — русское «окно» по-испански женского рода — **la** ventana, а «машина» — мужского: **el** coche. Род в русском и испанском часто не совпадает! Поэтому **учите слово сразу с артиклем**.

Общее правило:
- на **-o** → обычно мужской: el libro, el chico.
- на **-a** → обычно женский: la casa, la chica.
- на **-ción, -sión, -dad, -tad, -tud** → всегда женский: la canción, la ciudad, la libertad.
- на **-or, -aje, -ma** (греческие слова) → чаще мужской: el amor, el viaje, **el problema, el idioma, el tema, el sistema**.

Исключения, которые надо выучить: **el día** (день), **el mapa**, **el problema**; **la mano** (рука), **la foto**, **la moto**, **la radio**.

**Прилагательное согласуется** с существительным: un chico alt**o**, una chica alt**a**. Прилагательные на **-e** и на согласную не меняются по роду: un libro interesant**e** / una casa interesant**e**, un coche azul / una casa azul. Но национальности добавляют -a: español → español**a**, alemán → alem**ana**.`,
        tables: [
          {
            title: 'Определённый и неопределённый артикль',
            head: ['', 'мужской', 'женский'],
            rows: [
              ['ед. ч., определённый', 'el libro', 'la casa'],
              ['мн. ч., определённый', 'los libros', 'las casas'],
              ['ед. ч., неопределённый', 'un libro', 'una casa'],
              ['мн. ч., неопределённый', 'unos libros', 'unas casas'],
            ],
          },
        ],
        examples: [
          { it: 'El chico es alto y la chica es alta.', ru: 'Парень высокий, и девушка высокая.', az: 'Oğlan hündürdür, qız da hündürdür.' },
          { it: 'Tengo un problema con el mapa.', ru: 'У меня проблема с картой.', az: 'Xəritə ilə bağlı problemim var.' },
          { it: 'La ciudad es muy grande.', ru: 'Город очень большой.', az: 'Şəhər çox böyükdür.' },
        ],
      },
      {
        title: 'Множественное число',
        text: `Всего три правила:
1. На **гласную** → **+s**: libro → libro**s**, casa → casa**s**, café → café**s**.
2. На **согласную** → **+es**: ciudad → ciudad**es**, profesor → profesor**es**, ordenador → ordenador**es**.
3. На **-z** → **z меняется на c** + es: lápiz → lápi**ces**, vez → ve**ces**, luz → lu**ces**.

Осторожно с tilde: она может **исчезнуть или появиться**: canción → canci**o**nes, alemán → alem**a**nes, но joven → j**ó**venes. Ударение остаётся на том же слоге, а правила чтения меняются.

**Мужской род «побеждает»**: el padre + la madre = **los padres** (родители), el hermano + la hermana = **los hermanos** (брат и сестра).`,
        examples: [
          { it: 'Los lápices están en la mesa.', ru: 'Карандаши на столе.', az: 'Karandaşlar masanın üstündədir.' },
          { it: 'Mis padres son profesores.', ru: 'Мои родители — преподаватели.', az: 'Valideynlərim müəllimdir.' },
          { it: 'Hay unas canciones bonitas.', ru: 'Есть несколько красивых песен.', az: 'Bir neçə gözəl mahnı var.' },
        ],
      },
      {
        title: 'Особый случай: el agua',
        text: `Женские слова, которые начинаются с **ударного a- / ha-**, в единственном числе берут артикль **el / un** — просто чтобы не было «la-a»: **el agua** (вода), **el águila** (орёл), **el aula** (аудитория), **el hambre** (голод).

Важно: слово **остаётся женским**! Прилагательное — в женском роде: **el agua fría** (холодная вода), а во множественном числе снова **las**: **las aguas**, **las aulas**.

Типичная ошибка русскоговорящих: «el agua frío». Правильно — **el agua fría**.

Ещё два слияния: **a + el = al** (Voy **al** cine), **de + el = del** (la casa **del** profesor). С la, los, las слияния нет: a la playa, de los chicos.`,
        examples: [
          { it: 'El agua está fría.', ru: 'Вода холодная.', az: 'Su soyuqdur.' },
          { it: 'Vamos al aula 5.', ru: 'Идём в аудиторию 5.', az: '5 nömrəli auditoriyaya gedirik.' },
          { it: 'Es el coche del profesor.', ru: 'Это машина преподавателя.', az: 'Bu müəllimin maşınıdır.' },
        ],
      },
    ],
    drills: [
      { prompt: 'Определённый артикль: ___ libro', answer: 'el', hint: '-o → мужской род → el.' },
      { prompt: 'Определённый артикль: ___ casa', answer: 'la', hint: '-a → женский род → la.' },
      { prompt: 'Определённый артикль: ___ problema', answer: 'el', hint: 'Слова на -ma греческого происхождения — мужского рода.' },
      { prompt: 'Определённый артикль: ___ mano', answer: 'la', hint: 'Исключение: la mano — женский род.' },
      { prompt: 'Определённый артикль: ___ día', answer: 'el', hint: 'Исключение: el día — мужской род.' },
      { prompt: 'Определённый артикль: ___ ciudad', answer: 'la', hint: '-dad → всегда женский.' },
      { prompt: 'Определённый артикль: ___ canción', answer: 'la', hint: '-ción → всегда женский.' },
      { prompt: 'Определённый артикль: ___ agua', answer: 'el', hint: 'Ударное a- в начале → el, хотя слово женское.' },
      { prompt: 'Неопределённый артикль: ___ chica', answer: 'una', hint: 'Женский род → una.' },
      { prompt: 'Неопределённый артикль (мн. ч.): ___ libros', answer: 'unos', hint: 'Мужской род, множественное → unos.' },
      { prompt: 'Определённый артикль (мн. ч.): ___ casas', answer: 'las', hint: 'Женский род, множественное → las.' },
      { prompt: 'Множественное число: el profesor → los ___', answer: 'profesores', hint: 'На согласную → +es.' },
      { prompt: 'Множественное число: el lápiz → los ___', answer: 'lápices', hint: 'z → c + es.' },
      { prompt: 'Множественное число: la canción → las ___', answer: 'canciones', hint: '+es, и tilde исчезает: canciones.' },
      { prompt: 'Множественное число: el café → los ___', answer: 'cafés', hint: 'На гласную → +s.' },
      { prompt: 'Множественное число: el joven → los ___', answer: 'jóvenes', hint: '+es и появляется tilde: JÓ-ve-nes.' },
      { prompt: 'Согласуйте: el agua ___ (frío)', answer: 'fría', hint: 'agua — женский род: el agua fría.' },
      { prompt: 'Согласуйте: una chica ___ (español)', answer: 'española', hint: 'Национальности добавляют -a.' },
      { prompt: 'Voy ___ cine. (a + el)', answer: 'al', hint: 'a + el = al.' },
      { prompt: 'Es la casa ___ profesor. (de + el)', answer: 'del', hint: 'de + el = del.' },
    ],
  },
];
