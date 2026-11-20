import type { Lesson } from '../types';

// Unit 9 "In giro per i negozi": verbi riflessivi, riflessivi al passato, si impersonale.
export const lessons: Lesson[] = [
  {
    id: 'u09-riflessivi',
    unit: 9,
    title: 'Возвратные глаголы (presente)',
    goal: 'Рассказывать о своём дне: «Mi sveglio alle sette, mi lavo, mi vesto…».',
    sections: [
      {
        title: 'Как спрягать',
        text: `Возвратный глагол — как русский глагол на **-ся**: одевать**ся** = vestir**si**. Только итальянское «-ся» меняется по лицам и стоит **перед** глаголом:
**mi** lavo, **ti** lavi, **si** lava, **ci** laviamo, **vi** lavate, **si** lavano.

Сам глагол спрягается как обычно (lavare → lavo, lavi…). Нужно только не забыть местоимение.

Внимание: русское и итальянское не всегда совпадают!
— **chiamarsi**: «Mi chiamo Elvin» (меня зовут; буквально «я себя зову»);
— **svegliarsi** (просыпаться), **alzarsi** (вставать), **sentirsi** (чувствовать себя), **divertirsi** (веселиться), **riposarsi** (отдыхать), **sbrigarsi** (торопиться), **laurearsi** (окончить вуз).

Ошибка: «Io alzo alle sette» — значит «я поднимаю (что-то) в семь». Нужно «**Mi** alzo».

Отрицание: «**Non mi** sveglio presto» (non перед местоимением).`,
        tables: [
          {
            title: 'svegliarsi · mettersi · vestirsi',
            head: ['', 'svegliarsi', 'mettersi', 'vestirsi'],
            rows: [
              ['io', 'mi sveglio', 'mi metto', 'mi vesto'],
              ['tu', 'ti svegli', 'ti metti', 'ti vesti'],
              ['lui / lei', 'si sveglia', 'si mette', 'si veste'],
              ['noi', 'ci svegliamo', 'ci mettiamo', 'ci vestiamo'],
              ['voi', 'vi svegliate', 'vi mettete', 'vi vestite'],
              ['loro', 'si svegliano', 'si mettono', 'si vestono'],
            ],
          },
          {
            title: 'alzarsi · chiamarsi',
            head: ['', 'alzarsi', 'chiamarsi'],
            rows: [
              ['io', 'mi alzo', 'mi chiamo'],
              ['tu', 'ti alzi', 'ti chiami'],
              ['lui / lei', 'si alza', 'si chiama'],
              ['noi', 'ci alziamo', 'ci chiamiamo'],
              ['voi', 'vi alzate', 'vi chiamate'],
              ['loro', 'si alzano', 'si chiamano'],
            ],
          },
        ],
        examples: [
          {
            it: 'La mattina mi sveglio alle sette, ma mi alzo alle sette e mezza.',
            ru: 'По утрам я просыпаюсь в семь, но встаю в полвосьмого.',
            az: 'Səhərlər saat yeddidə oyanıram, amma yeddi yarımda qalxıram.',
          },
          {
            it: 'In questo negozio mi provo sempre tante cose, ma non compro niente.',
            ru: 'В этом магазине я всегда примеряю много вещей, но ничего не покупаю.',
            az: 'Bu mağazada həmişə çox şey geyinib baxıram, amma heç nə almıram.',
          },
          {
            it: 'Come ti chiami? — Mi chiamo Elvin, e tu?',
            ru: 'Как тебя зовут? — Меня зовут Эльвин, а тебя?',
            az: 'Adın nədir? — Mənim adım Elvindir, bəs sənin?',
          },
        ],
      },
      {
        title: 'Взаимные глаголы',
        text: `Во множественном числе **ci, vi, si** могут значить «**друг друга**»:
«**Ci vediamo** domani!» — Увидимся завтра! (= увидим друг друга)
«Marco e Anna **si conoscono** da anni» — знают друг друга.
«**Vi scrivete** spesso?» — Вы часто переписываетесь?

Частые взаимные: vedersi, sentirsi (созваниваться), conoscersi, incontrarsi, salutarsi, baciarsi, sposarsi.

Фраза-выручалочка на каждый день: «**Ci vediamo!**», «**Ci sentiamo!**» (= созвонимся).`,
        examples: [
          {
            it: 'Ci vediamo alle sei sotto le Due Torri?',
            ru: 'Встретимся в шесть у Двух башен?',
            az: 'Saat altıda İki Qüllənin altında görüşək?',
          },
          {
            it: 'Io e mia sorella ci sentiamo ogni domenica.',
            ru: 'Мы с сестрой созваниваемся каждое воскресенье.',
            az: 'Bacımla hər bazar günü danışırıq.',
          },
        ],
      },
    ],
    drills: [
      { prompt: '(presente) svegliarsi · io', answer: 'mi sveglio', hint: 'mi + sveglio' },
      { prompt: '(presente) alzarsi · tu', answer: 'ti alzi', hint: 'ti + alzi' },
      { prompt: '(presente) vestirsi · lei', answer: 'si veste', hint: 'si + veste' },
      { prompt: '(presente) chiamarsi · noi', answer: 'ci chiamiamo', hint: 'ci + chiamiamo' },
      { prompt: '(presente) mettersi · voi', answer: 'vi mettete', hint: 'vi + mettete' },
      { prompt: '(presente) lavarsi · loro', answer: 'si lavano', hint: 'si + lavano' },
      { prompt: '(presente) divertirsi · noi', answer: 'ci divertiamo', hint: 'ci + divertiamo' },
      { prompt: '(presente) sentirsi · tu', answer: 'ti senti', hint: 'ti + senti' },
      { prompt: '(presente) riposarsi · lui', answer: 'si riposa', hint: 'si + riposa' },
      { prompt: '(presente) svegliarsi · loro', answer: 'si svegliano', hint: 'si + svegliano' },
      { prompt: '(presente) laurearsi · io', answer: 'mi laureo', hint: 'mi + laureo' },
      { prompt: 'Come ___ chiami?', answer: 'ti', hint: 'tu → ti' },
      { prompt: 'Io non ___ alzo mai prima delle otto.', answer: 'mi', hint: 'non + mi + глагол' },
      { prompt: 'Domani ___ vediamo in biblioteca! (друг друга, мы)', answer: 'ci', hint: 'взаимное: ci vediamo' },
      { prompt: 'Paolo e Giulia ___ conoscono da due anni.', answer: 'si', hint: 'loro → si' },
      { prompt: 'Ragazzi, perché non (sbrigarsi) ___? Il treno parte!', answer: 'vi sbrigate', hint: 'voi → vi sbrigate' },
      { prompt: 'Signora, come si ___? (sentirsi, Lei)', answer: 'sente', hint: 'Lei → si sente' },
    ],
  },
  {
    id: 'u09-riflessivi-passato',
    unit: 9,
    title: 'Возвратные в passato prossimo и с модальными',
    goal: 'Говорить «Mi sono alzato tardi», «Devo alzarmi presto».',
    sections: [
      {
        title: 'Passato prossimo: всегда essere',
        text: `Возвратные глаголы в сложных временах **всегда** спрягаются с **essere**. Значит, причастие **согласуется** с подлежащим:
Marco **si è svegliato**, Anna **si è svegliata**, i ragazzi **si sono svegliati**, le ragazze **si sono svegliate**.

Порядок: **местоимение + essere + причастие**: mi sono / ti sei / si è / ci siamo / vi siete / si sono + alzato/a/i/e.

Ошибка русскоязычных: «Mi ho alzato». Так нельзя! Запомните: «**Si** → **sono**» (оба на s).

Для студентки: «Mi sono alzat**a**», для студента: «Mi sono alzat**o**».`,
        tables: [
          {
            title: 'alzarsi (passato prossimo)',
            head: ['', 'alzarsi'],
            rows: [
              ['io', 'mi sono alzato/a'],
              ['tu', 'ti sei alzato/a'],
              ['lui / lei', 'si è alzato / si è alzata'],
              ['noi', 'ci siamo alzati/e'],
              ['voi', 'vi siete alzati/e'],
              ['loro', 'si sono alzati/e'],
            ],
          },
        ],
        examples: [
          {
            it: 'Ieri mi sono svegliato tardi e mi sono vestito in cinque minuti.',
            ru: 'Вчера я проснулся поздно и оделся за пять минут.',
            az: 'Dünən gec oyandım və beş dəqiqəyə geyindim.',
          },
          {
            it: 'Giulia si è laureata a Bologna nel 2024.',
            ru: 'Джулия окончила университет в Болонье в 2024 году.',
            az: 'Culiya 2024-cü ildə Bolonyada universiteti bitirib.',
          },
          {
            it: 'Alla festa ci siamo divertiti moltissimo.',
            ru: 'На вечеринке мы очень повеселились.',
            az: 'Şənlikdə çox əyləndik.',
          },
        ],
      },
      {
        title: 'С модальными глаголами',
        text: `С dovere, potere, volere местоимение опять имеет **два места**:
1. **перед модальным:** «**Mi** devo alzare presto»;
2. **на конце инфинитива** (без -e): «Devo alzar**mi** presto».

Главное — местоимение **соответствует подлежащему**: «Devi alzar**ti**», «Dobbiamo sbrigar**ci**», «Vogliono riposar**si**». Ошибка: «Devo alzarsi» — нет! Для io нужно **-mi**.

В passato prossimo вспомогательный глагол зависит от места местоимения:
— местоимение впереди → **essere**: «**Mi sono** dovuto alzare»;
— местоимение на конце → **avere**: «**Ho** dovuto alzar**mi**».`,
        tables: [
          {
            title: 'dovere + alzarsi',
            head: ['', 'вариант 1', 'вариант 2'],
            rows: [
              ['io', 'mi devo alzare', 'devo alzarmi'],
              ['tu', 'ti devi alzare', 'devi alzarti'],
              ['lui / lei', 'si deve alzare', 'deve alzarsi'],
              ['noi', 'ci dobbiamo alzare', 'dobbiamo alzarci'],
              ['voi', 'vi dovete alzare', 'dovete alzarvi'],
              ['loro', 'si devono alzare', 'devono alzarsi'],
            ],
          },
        ],
        examples: [
          {
            it: 'Domani ho un esame: devo svegliarmi alle sei.',
            ru: 'Завтра у меня экзамен: мне нужно проснуться в шесть.',
            az: 'Sabah imtahanım var: saat altıda oyanmalıyam.',
          },
          {
            it: 'Ti vuoi riposare un po’? = Vuoi riposarti un po’?',
            ru: 'Хочешь немного отдохнуть?',
            az: 'Bir az dincəlmək istəyirsən?',
          },
        ],
      },
    ],
    drills: [
      { prompt: '(passato prossimo) alzarsi · io (Marco)', answer: 'mi sono alzato', hint: 'всегда essere: mi sono alzato' },
      { prompt: '(passato prossimo) alzarsi · io (Anna)', answer: 'mi sono alzata', hint: 'девушка → alzata' },
      { prompt: '(passato prossimo) svegliarsi · tu', answer: 'ti sei svegliato', also: ['ti sei svegliata'], hint: 'ti sei + svegliato/a' },
      { prompt: '(passato prossimo) vestirsi · lei', answer: 'si è vestita', hint: 'lei → vestita' },
      { prompt: '(passato prossimo) divertirsi · noi (ragazzi)', answer: 'ci siamo divertiti', hint: 'ci siamo + divertiti' },
      { prompt: '(passato prossimo) riposarsi · voi', answer: 'vi siete riposati', also: ['vi siete riposate'], hint: 'vi siete + riposati/e' },
      { prompt: '(passato prossimo) laurearsi · loro (ragazze)', answer: 'si sono laureate', hint: 'ж.р. мн. → laureate' },
      { prompt: '(passato prossimo) mettersi · lui', answer: 'si è messo', hint: 'mettere → messo' },
      { prompt: '(passato prossimo) sentirsi · io (Anna)', answer: 'mi sono sentita', hint: 'ж.р. → sentita' },
      { prompt: '(passato prossimo) incontrarsi · loro (Marco e Sara)', answer: 'si sono incontrati', hint: 'смешанная группа → -i' },
      { prompt: 'Devo alzarmi presto. = ___ devo alzare presto.', answer: 'Mi', hint: 'mi перед модальным' },
      { prompt: 'Ti devi sbrigare! = Devi ___!', answer: 'sbrigarti', hint: 'sbrigar + ti' },
      { prompt: 'Vogliamo riposarci. = ___ vogliamo riposare.', answer: 'Ci', hint: 'noi → ci' },
      { prompt: 'Domani dovete (svegliarsi) ___ presto.', answer: 'svegliarvi', hint: 'voi → svegliar-vi' },
      { prompt: 'Ieri (io, Marco) mi ___ dovuto alzare alle sei.', answer: 'sono', hint: 'mi впереди → essere' },
      { prompt: 'Ieri (io) ___ dovuto alzarmi alle sei.', answer: 'ho', hint: 'mi на конце → avere' },
    ],
  },
  {
    id: 'u09-si-impersonale',
    unit: 9,
    title: 'Безличное si; bisogna, è necessario',
    goal: 'Говорить обобщённо: «A Bologna si mangia bene», «Bisogna prenotare».',
    sections: [
      {
        title: 'Si + глагол в 3-м лице',
        text: `**Si** + глагол в 3-м лице = русское **неопределённо-личное**: «**Si mangia** bene» — Здесь хорошо едят / кормят. «Come **si dice**…?» — Как говорится…? «Qui non **si fuma**» — Здесь не курят.

**Si + множественное число:** если после глагола идёт существительное во мн.ч., глагол тоже во мн.ч.:
«In questo negozio **si vende** frutta» → «**si vendono** scarpe».
«**Si parla** italiano» → «**Si parlano** molte lingue».

Мнемоника: смотрите **на то, что после глагола** — ед.ч. → глагол в ед.ч., мн.ч. → во мн.ч.

С прилагательным — множественное число: «Quando **si è** giovan**i**…» (Когда молод…), «**Si è** stanch**i** dopo l'esame».

Возвратный глагол в безличной форме: **ci si** (не «si si»!): «La mattina **ci si alza** presto».`,
        examples: [
          {
            it: 'A Bologna si mangia benissimo e si spende poco.',
            ru: 'В Болонье очень хорошо кормят и тратишь немного.',
            az: 'Bolonyada çox yaxşı yemək olur və az pul xərclənir.',
          },
          {
            it: 'In via Indipendenza si vendono vestiti di tutti i prezzi.',
            ru: 'На виа Индипенденца продаётся одежда на любой кошелёк.',
            az: 'İndipendensa küçəsində hər qiymətə paltar satılır.',
          },
          {
            it: 'Come si dice «скидка» in italiano? — Si dice «sconto».',
            ru: 'Как по-итальянски «скидка»? — «Sconto».',
            az: 'İtalyanca «endirim» necə deyilir? — «Sconto».',
          },
          {
            it: 'In vacanza ci si sveglia tardi.',
            ru: 'В отпуске просыпаются поздно.',
            az: 'Tətildə gec oyanırlar.',
          },
        ],
      },
      {
        title: 'Bisogna и è necessario',
        text: `**Bisogna** + инфинитив = «нужно, надо» (безлично, для всех): «**Bisogna** prenotare il tavolo». Это неизменяемая форма — никаких «bisogno» или «bisognano» в этом значении!

**È necessario** + инфинитив — то же, чуть официальнее: «**È necessario** portare un documento».

Похожие: **è importante**, **è meglio** (лучше), **è vietato** (запрещено) + инфинитив.

Сравните: «**Ho bisogno di** un caffè» (мне нужен кофе — лично) vs «**Bisogna** studiare» (надо заниматься — всем).`,
        examples: [
          {
            it: 'Per entrare in biblioteca bisogna avere la tessera.',
            ru: 'Чтобы войти в библиотеку, нужен читательский билет.',
            az: 'Kitabxanaya girmək üçün kart lazımdır.',
          },
          {
            it: 'Durante i saldi è meglio andare nei negozi la mattina.',
            ru: 'Во время распродаж лучше ходить по магазинам утром.',
            az: 'Endirim vaxtı mağazalara səhər getmək daha yaxşıdır.',
          },
        ],
      },
    ],
    drills: [
      { prompt: 'In Italia ___ (mangiare) bene.', answer: 'si mangia', hint: 'si + 3-е лицо ед.ч.' },
      { prompt: 'Qui ___ (parlare) italiano.', answer: 'si parla', hint: 'si parla' },
      { prompt: 'In questo negozio ___ (vendere) scarpe.', answer: 'si vendono', hint: 'scarpe — мн.ч. → si vendono' },
      { prompt: 'Come ___ (dire) «спасибо» in italiano?', answer: 'si dice', hint: 'si dice' },
      { prompt: 'A Bologna ___ (vivere) bene.', answer: 'si vive', hint: 'si vive' },
      { prompt: 'Al mercato ___ (trovare) prodotti freschi.', answer: 'si trovano', hint: 'prodotti — мн.ч.' },
      { prompt: 'In biblioteca non ___ (potere) mangiare.', answer: 'si può', hint: 'si può + инфинитив' },
      { prompt: 'Qui ___ (fare) un ottimo caffè.', answer: 'si fa', hint: 'un caffè — ед.ч.' },
      { prompt: 'In Italia ___ (bere) molti caffè al giorno.', answer: 'si bevono', hint: 'molti caffè — мн.ч.' },
      { prompt: 'La domenica ___ alza tardi. (безлично, alzarsi)', answer: 'ci si', hint: 'возвратный безлично → ci si' },
      { prompt: 'Quando si è ___ (giovane), si ha molta energia.', answer: 'giovani', hint: 'si è + прилагательное во мн.ч.' },
      { prompt: '___ prenotare il ristorante il sabato. (надо)', answer: 'Bisogna', hint: 'bisogna + инфинитив' },
      { prompt: 'È ___ portare il passaporto. (необходимо)', answer: 'necessario', hint: 'è necessario' },
      { prompt: 'In questo negozio ___ (accettare) carte di credito?', answer: 'si accettano', hint: 'carte — мн.ч.' },
      { prompt: 'Per andare in centro ___ prendere l’autobus 27. (надо)', answer: 'bisogna', also: ['si deve'], hint: 'bisogna + инфинитив' },
    ],
  },
];
