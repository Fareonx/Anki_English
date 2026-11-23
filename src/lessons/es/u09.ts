import type { Lesson } from '../types';

// Unit 9 "Pronombres": complemento directo (lo, la, los, las…), indirecto (le, les, se lo), posición con infinitivo y gerundio.
export const lessons: Lesson[] = [
  {
    id: 'es-u09-directos',
    unit: 9,
    title: 'Прямые местоимения — lo, la, los, las, me, te, nos, os',
    goal: 'Не повторять существительное: «¿Tienes el billete? — Sí, lo tengo».',
    sections: [
      {
        title: 'Формы: кого? что?',
        text: `Прямое местоимение заменяет ответ на вопрос **«кого? что?»** (русский винительный падеж).

**me** (меня), **te** (тебя), **lo** (его — м. р., а также вас — usted м. р.), **la** (её — ж. р., вас — usted ж. р.),
**nos** (нас), **os** (вас — vosotros), **los** (их — м. р.), **las** (их — ж. р.).

Для вещей — то же самое по роду: el libro → **lo**, la mesa → **la**, los libros → **los**, las mesas → **las**.

Мнемоника: **lo / la / los / las — как артикли el / la / los / las**, только el превращается в **lo**.

**Нейтральное lo** — «это» (о целой мысли): **No lo sé.** — Я этого не знаю. **Lo entiendo.** — Понимаю.

Примечание: в Испании о мужчине часто говорят **le** вместо lo: Le veo = Lo veo (оба варианта правильные).`,
        tables: [
          {
            title: 'Прямые местоимения',
            head: ['', 'местоимение', 'пример'],
            rows: [
              ['yo', 'me', 'Ana me llama.'],
              ['tú', 'te', 'Te veo.'],
              ['él / ella / usted', 'lo / la', 'Lo compro. / La compro.'],
              ['nosotros', 'nos', 'Nos invitan.'],
              ['vosotros', 'os', 'Os espero.'],
              ['ellos / ellas / ustedes', 'los / las', 'Los tengo. / Las tengo.'],
            ],
          },
        ],
        examples: [
          {
            it: '¿Dónde está mi móvil? No lo encuentro.',
            ru: 'Где мой телефон? Не могу его найти.',
            az: 'Telefonum haradadır? Onu tapa bilmirəm.',
          },
          {
            it: '¿Conoces a Lucía? — Sí, la conozco bien.',
            ru: 'Ты знаешь Лусию? — Да, я её хорошо знаю.',
            az: 'Lusiyanı tanıyırsan? — Bəli, onu yaxşı tanıyıram.',
          },
          {
            it: 'Te quiero mucho.',
            ru: 'Я тебя очень люблю.',
            az: 'Səni çox sevirəm.',
          },
        ],
      },
      {
        title: 'Место: перед глаголом',
        text: `Местоимение стоит **перед спрягаемым глаголом**, а «no» — ещё раньше:
**Lo** compro. — **No lo** compro. Ошибка: «Compro lo» ✗, «Lo no compro» ✗.
Формула: **(no) + местоимение + глагол**.

**Ловушка для русскоговорящих**: некоторые глаголы в испанском требуют **прямого** дополнения, хотя в русском — «кому»:
**ayudar** (помогать): **Te** ayudo. — Я помогаю **тебе**.
**llamar** (звонить): **La** llamo. — Я звоню **ей**.
**esperar** (ждать) и **escuchar** (слушать) — тоже прямые: **Os** espero. **Lo** escucho.

Если дополнение стоит в начале фразы, его повторяют местоимением: **El pan lo** compro yo. — Хлеб покупаю я.`,
        examples: [
          {
            it: '¿Me ayudas con la maleta? — Claro, te ayudo.',
            ru: 'Поможешь мне с чемоданом? — Конечно, помогу (тебе).',
            az: 'Çamadanla mənə kömək edərsən? — Əlbəttə, sənə kömək edirəm.',
          },
          {
            it: 'Llamo a mi madre cada día: la llamo por la noche.',
            ru: 'Я звоню маме каждый день: звоню ей вечером.',
            az: 'Hər gün anama zəng edirəm: ona axşam zəng edirəm.',
          },
          {
            it: '¿Dónde está Juan? — No lo sé.',
            ru: 'Где Хуан? — Не знаю.',
            az: 'Xuan haradadır? — Bilmirəm.',
          },
        ],
      },
    ],
    drills: [
      { prompt: '¿Compras el pan? — Sí, ___ compro.', answer: 'lo', hint: 'el pan → lo.' },
      { prompt: '¿Ves la película? — Sí, ___ veo.', answer: 'la', hint: 'la película → la.' },
      { prompt: '¿Tienes los billetes? — Sí, ___ tengo.', answer: 'los', hint: 'los billetes → los.' },
      { prompt: '¿Lavas las camisas? — Sí, ___ lavo.', answer: 'las', hint: 'las camisas → las.' },
      { prompt: '¿Bebes café? — Sí, ___ bebo cada día.', answer: 'lo', hint: 'el café → lo.' },
      { prompt: '¿Me oyes? — Sí, ___ oigo.', answer: 'te', hint: 'Меня? — Тебя: te.' },
      { prompt: '¿Nos llamas mañana? — Sí, ___ llamo.', answer: 'os', hint: 'Нас? — Вас (vosotros): os.' },
      { prompt: '¿Conoces a María? — Sí, ___ conozco.', answer: 'la', hint: 'María (ж. р.) → la.' },
      { prompt: '¿Conoces a Pedro? — Sí, ___ conozco.', answer: 'lo', also: ['le'], hint: 'Pedro (м. р.) → lo (в Испании и le).' },
      { prompt: '¿Llamas a tu madre? — Sí, ___ llamo.', answer: 'la', hint: 'llamar — прямое дополнение: la.' },
      { prompt: '¿Invitas a Carmen y a Lucía? — Sí, ___ invito.', answer: 'las', hint: 'Две женщины → las.' },
      { prompt: '¿Esperas a tus amigos? — Sí, ___ espero.', answer: 'los', hint: 'esperar — прямое: los.' },
      { prompt: '¿Me ayudas? — Sí, ___ ayudo.', answer: 'te', hint: 'ayudar — прямое: te ayudo.' },
      { prompt: 'Ana ___ quiere mucho. (меня)', answer: 'me', hint: 'Меня — me.' },
      { prompt: 'Mis padres ___ visitan los domingos. (нас)', answer: 'nos', hint: 'Нас — nos.' },
      { prompt: 'Señor, ¿___ ayudo? (вас, usted)', answer: 'lo', also: ['le'], hint: 'usted м. р. → lo (или le).' },
      { prompt: '¿Dónde está Juan? — No ___ sé.', answer: 'lo', hint: 'Нейтральное «это» — lo.' },
      { prompt: '¿Quién tiene las llaves? — ___ tengo yo.', answer: 'las', hint: 'las llaves → las.' },
    ],
  },
  {
    id: 'es-u09-indirectos',
    unit: 9,
    title: 'Косвенные местоимения le / les, se lo и место местоимений',
    goal: 'Говорить «кому» и ставить два местоимения: «Le doy el libro → Se lo doy», «Voy a comprarlo».',
    sections: [
      {
        title: 'le, les — «кому?»',
        text: `Косвенное местоимение отвечает на вопрос **«кому?»** (русский дательный падеж).

**me** (мне), **te** (тебе), **le** (ему, ей, вам — usted), **nos** (нам), **os** (вам — vosotros), **les** (им, вам — ustedes).

Отличаются от прямых только **3-м лицом**: «кого?» — lo / la, «кому?» — **le / les** (без рода!).
Типичные глаголы: **dar** (давать), **decir** (говорить), **escribir**, **mandar** (посылать), **regalar** (дарить), **preguntar** (спрашивать), **explicar**, а также **gustar** (из урока 6).

Испанцы любят **дублировать**: **Le** doy el libro **a Ana**. **Les** escribo **a mis padres**. Местоимение здесь не лишнее — так говорят все.`,
        tables: [
          {
            title: 'Прямые и косвенные',
            head: ['', 'прямые (кого?)', 'косвенные (кому?)'],
            rows: [
              ['yo', 'me', 'me'],
              ['tú', 'te', 'te'],
              ['él / ella / usted', 'lo / la', 'le'],
              ['nosotros', 'nos', 'nos'],
              ['vosotros', 'os', 'os'],
              ['ellos / ellas / ustedes', 'los / las', 'les'],
            ],
          },
        ],
        examples: [
          {
            it: 'Le doy el libro a Ana.',
            ru: 'Я даю книгу Ане.',
            az: 'Kitabı Anaya verirəm.',
          },
          {
            it: '¿Qué les regalas a tus padres?',
            ru: 'Что ты даришь своим родителям?',
            az: 'Valideynlərinə nə hədiyyə edirsən?',
          },
          {
            it: 'Mi hermano me dice siempre la verdad.',
            ru: 'Брат всегда говорит мне правду.',
            az: 'Qardaşım mənə həmişə doğrunu deyir.',
          },
        ],
      },
      {
        title: 'Два местоимения: me lo, te la, se lo',
        text: `Если есть оба — **сначала «кому», потом «что»**: **me lo**, **te la**, **nos los**, **os las**.
Me das el libro → **Me lo** das.

Главное правило: **le / les + lo / la / los / las → se lo / se la / se los / se las**.
Le doy el libro → «Le lo doy» ✗ → **Se lo doy**.
Les mando las fotos → **Se las** mando.

Мнемоника: **«ле-ло» звучит смешно — испанцы говорят «се-ло»**.
Порядок запоминается так: **сначала человек, потом вещь** (кому → что).`,
        examples: [
          {
            it: '¿Me prestas tu bici? — Sí, te la presto.',
            ru: 'Одолжишь мне велосипед? — Да, одолжу.',
            az: 'Velosipedini mənə borc verərsən? — Bəli, verirəm.',
          },
          {
            it: '¿Le has dado las llaves a Pablo? — Sí, se las he dado.',
            ru: 'Ты дал ключи Пабло? — Да, дал (их ему).',
            az: 'Açarları Pabloya vermisən? — Bəli, vermişəm.',
          },
        ],
      },
      {
        title: 'С инфинитивом и герундием: два места',
        text: `С **инфинитивом** и **герундием** местоимение можно поставить:
1) **перед спрягаемым глаголом**: **Lo** voy a comprar. **Te lo** quiero decir. **Lo** estoy leyendo.
2) или **приклеить в конец** инфинитива / герундия: Voy a comprar**lo**. Quiero decír**telo**. Estoy leyéndo**lo**.
Оба варианта одинаково правильные! Ошибка — ставить в середину: «Voy lo a comprar» ✗.

**Ударение**: когда слово становится длиннее, пишем знак ударения, чтобы сохранить звучание:
- герундий + 1 местоимение: leyendo → **leyéndolo**, diciendo → **diciéndome**
- инфинитив + 2 местоимения: decir → **decírtelo**, dar → **dármelo**, explicar → **explicárselo**
- инфинитив + 1 — без знака: comprar**lo**, escribir**le**.`,
        examples: [
          {
            it: 'Quiero comprarle un regalo a mi novia.',
            ru: 'Я хочу купить подарок своей девушке.',
            az: 'Sevgilimə hədiyyə almaq istəyirəm.',
          },
          {
            it: 'El informe lo estoy escribiendo ahora. = Estoy escribiéndolo ahora.',
            ru: 'Отчёт я пишу сейчас.',
            az: 'Hesabatı indi yazıram.',
          },
          {
            it: 'Es un secreto, pero te lo voy a decir. = Voy a decírtelo.',
            ru: 'Это секрет, но я тебе его скажу.',
            az: 'Bu sirdir, amma onu sənə deyəcəyəm.',
          },
        ],
      },
    ],
    drills: [
      { prompt: '¿Qué ___ das a tu madre? (ей)', answer: 'le', hint: 'Кому? — ей: le.' },
      { prompt: 'Escribo a mis amigos → ___ escribo un mensaje.', answer: 'les', hint: 'Кому? — им: les.' },
      { prompt: '¿___ dices la verdad? (мне)', answer: 'me', hint: 'Мне — me.' },
      { prompt: 'Pregunto a la profesora → ___ pregunto.', answer: 'le', hint: 'preguntar a alguien — le.' },
      { prompt: 'A mis padres ___ gusta viajar.', answer: 'les', hint: 'gustar: им — les.' },
      { prompt: 'Le doy el libro → ___ doy.', answer: 'se lo', hint: 'le + lo → se lo.' },
      { prompt: 'Les mando las fotos → ___ mando.', answer: 'se las', hint: 'les + las → se las.' },
      { prompt: 'Te doy la llave → ___ doy.', answer: 'te la', hint: 'Кому (te) + что (la).' },
      { prompt: '¿Me compras el pan? → ¿___ compras?', answer: 'me lo', hint: 'me + lo.' },
      { prompt: 'Os explico las reglas → ___ explico.', answer: 'os las', hint: 'os + las.' },
      { prompt: 'Le regalo unos libros → ___ regalo.', answer: 'se los', hint: 'le + los → se los.' },
      { prompt: 'Lo voy a comprar → Voy a ___.', answer: 'comprarlo', hint: 'Приклеиваем к инфинитиву.' },
      { prompt: 'Lo tengo que hacer → Tengo que ___.', answer: 'hacerlo', hint: 'hacer + lo.' },
      { prompt: 'Le voy a escribir → Voy a ___.', answer: 'escribirle', hint: 'escribir + le, без знака ударения.' },
      { prompt: 'Lo estoy leyendo → Estoy ___.', answer: 'leyéndolo', hint: 'Герундий + lo: ударение на é.' },
      { prompt: 'Te lo quiero explicar → Quiero ___.', answer: 'explicártelo', hint: 'Инфинитив + 2 местоимения: ударение на á.' },
      { prompt: 'Se lo estoy diciendo → Estoy ___.', answer: 'diciéndoselo', hint: 'Герундий + se + lo, ударение на é.' },
      { prompt: 'Quiero decirte una cosa → ___ quiero decir una cosa.', answer: 'te', hint: 'Можно поставить перед quiero.' },
    ],
  },
];
