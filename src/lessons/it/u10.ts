import type { Lesson } from '../types';

// Unit 10 "Cosa c'è stasera in TV?": pronomi indiretti, imperativo (regolare e irregolare).
export const lessons: Lesson[] = [
  {
    id: 'u10-indiretti',
    unit: 10,
    title: 'Косвенные местоимения: mi, ti, gli, le…',
    goal: 'Говорить «кому»: «Le telefono stasera», «Gli ho scritto ieri».',
    sections: [
      {
        title: 'Формы и глаголы с «a»',
        text: `Косвенное местоимение отвечает на вопрос **кому?** (дательный падеж) и заменяет **a + человек**: «Telefono **a Marco**» → «**Gli** telefono».

**gli** — ему, **le** — ей, **Le** — Вам (вежливо), **gli** — им (в разговоре; в книжном стиле «loro» после глагола: «Telefono loro»).

Место — как у прямых: **перед глаголом**, с отрицанием: «Non **gli** rispondo».

Глаголы, которые в итальянском требуют **a** (будьте внимательны: в русском иногда по-другому!):
telefonare **a** (звонить кому), scrivere **a**, dire **a**, dare **a**, regalare **a**, chiedere **a** (спрашивать кого!), rispondere **a**, insegnare **a**, mandare **a**, piacere **a**, sembrare **a**.

Ловушка: «спросить Марко» → «chiedere **a** Marco» → «**Gli** chiedo» (не «lo chiedo»).

Как отличить от прямых? mi, ti, ci, vi — одинаковые. Разница только в 3-м лице: прямые **lo / la / li / le** vs косвенные **gli / le / gli**.`,
        tables: [
          {
            title: 'Прямые и косвенные рядом',
            head: ['лицо', 'прямое (кого?)', 'косвенное (кому?)'],
            rows: [
              ['io', 'mi', 'mi'],
              ['tu', 'ti', 'ti'],
              ['lui', 'lo', 'gli'],
              ['lei', 'la', 'le'],
              ['Lei (Вы)', 'La', 'Le'],
              ['noi', 'ci', 'ci'],
              ['voi', 'vi', 'vi'],
              ['loro', 'li / le', 'gli (loro)'],
            ],
          },
        ],
        examples: [
          {
            it: 'Domani è il compleanno di Sara: le regalo un libro.',
            ru: 'Завтра у Сары день рождения: я подарю ей книгу.',
            az: 'Sabah Saranın ad günüdür: ona kitab hədiyyə edirəm.',
          },
          {
            it: 'Ho visto Marco e gli ho chiesto gli appunti.',
            ru: 'Я видел Марко и попросил у него конспекты.',
            az: 'Markonu gördüm və ondan qeydləri istədim.',
          },
          {
            it: 'Professore, Le posso fare una domanda?',
            ru: 'Профессор, можно задать Вам вопрос?',
            az: 'Professor, Sizə bir sual verə bilərəmmi?',
          },
        ],
      },
      {
        title: 'В passato prossimo и с модальными',
        text: `**Passato prossimo:** косвенное местоимение стоит перед avere, но **причастие НЕ согласуется** (в отличие от lo/la/li/le!):
«Ho telefonato a Giulia» → «**Le** ho telefonat**o**» (не «telefonata»).
«Ho scritto ai miei genitori» → «**Gli** ho scritt**o**».

Сравните — очень полезная пара:
«**Le** ho scritt**o**» — я написал **ей** (косвенное, без согласования);
«**Le** ho scritt**e**» — я написал **их** (lettere — прямое, согласование).

**Gli** не сокращается перед гласной: «Gli ho detto», а **le** тоже обычно не сокращается: «Le ho detto».

**С модальными** — те же два варианта: «**Gli** devo parlare» = «Devo parlar**gli**»; «**Le** voglio telefonare» = «Voglio telefonar**le**».`,
        examples: [
          {
            it: 'Hai scritto ai tuoi genitori? — Sì, gli ho scritto ieri.',
            ru: 'Ты написал родителям? — Да, написал им вчера.',
            az: 'Valideynlərinə yazmısan? — Bəli, dünən onlara yazdım.',
          },
          {
            it: 'Anna mi ha mandato un messaggio, ma non le ho ancora risposto.',
            ru: 'Анна прислала мне сообщение, но я ей ещё не ответил.',
            az: 'Anna mənə mesaj göndərdi, amma hələ ona cavab verməmişəm.',
          },
          {
            it: 'Devo parlargli prima dell’esame. = Gli devo parlare prima dell’esame.',
            ru: 'Мне нужно поговорить с ним до экзамена.',
            az: 'İmtahandan əvvəl onunla danışmalıyam.',
          },
        ],
      },
    ],
    drills: [
      { prompt: 'Telefoni a Marco? — Sì, ___ telefono stasera.', answer: 'gli', hint: 'a lui → gli' },
      { prompt: 'Scrivi a Giulia? — Sì, ___ scrivo una email.', answer: 'le', hint: 'a lei → le' },
      { prompt: 'Cosa regali ai tuoi genitori? — ___ regalo un viaggio.', answer: 'Gli', hint: 'a loro → gli' },
      { prompt: 'Signora, ___ porto un caffè? (Вам)', answer: 'Le', hint: 'вежливо → Le' },
      { prompt: 'Mi presti la penna? — Sì, ___ presto la penna.', answer: 'ti', hint: 'тебе → ti' },
      { prompt: 'Ci spieghi la regola? — Sì, ___ spiego tutto.', answer: 'vi', hint: 'вам → vi' },
      { prompt: 'Chiedi a Paolo? — Sì, ___ chiedo l’indirizzo.', answer: 'gli', hint: 'chiedere a → gli' },
      { prompt: 'Conosci Marco? — Sì, ___ conosco.', answer: 'lo', hint: 'conoscere кого → прямое lo' },
      { prompt: 'Hai telefonato a Sara? — Sì, le ho ___ (telefonare).', answer: 'telefonato', hint: 'косвенное → без согласования' },
      { prompt: 'Hai risposto al professore? — Sì, ___ ho risposto.', answer: 'gli', hint: 'al professore → gli' },
      { prompt: 'Hai scritto le lettere? — Sì, le ho ___ (scrivere).', answer: 'scritte', hint: 'le = их (прямое) → scritte' },
      { prompt: 'Hai scritto a Laura? — Sì, le ho ___ (scrivere).', answer: 'scritto', hint: 'le = ей (косвенное) → scritto' },
      { prompt: 'Devo parlare a Luca. = Devo ___.', answer: 'parlargli', hint: 'parlar + gli' },
      { prompt: 'Voglio telefonare a mia madre. = ___ voglio telefonare.', answer: 'Le', hint: 'a lei → le' },
      { prompt: 'Ti piace il film? — Sì, ___ piace molto. (мне)', answer: 'mi', hint: 'мне → mi' },
      { prompt: 'Cosa hai detto ai ragazzi? — ___ ho detto di venire alle otto.', answer: 'Gli', hint: 'ai ragazzi → gli' },
    ],
  },
  {
    id: 'u10-imperativo',
    unit: 10,
    title: 'Повелительное наклонение (tu, noi, voi)',
    goal: 'Давать советы и указания: «Guarda!», «Prendi l’ombrello!», «Non parlare!».',
    sections: [
      {
        title: 'Правильные глаголы',
        text: `Хорошая новость: **noi** и **voi** в императиве = **presente**: parliamo! parlate! prendiamo! prendete!

Думать нужно только о **tu**:
— глаголы на **-are** → **-a**: parl**a**!, guard**a**!, ascolt**a**!;
— глаголы на **-ere / -ire** → **-i** (как в presente): prend**i**!, dorm**i**!, sent**i**!, fin**isci**!

Мнемоника «наоборот»: в presente «tu parl**i**», а в императиве «parl**a**!» — у -are гласные «меняются местами». У -ere и -ire императив tu = presente tu.

**Noi**-форма = «давайте…»: «**Andiamo**!» — Пошли! «**Mangiamo** fuori stasera!» — Давайте поужинаем в ресторане!`,
        tables: [
          {
            title: 'guardare · prendere · sentire · finire',
            head: ['', 'guardare', 'prendere', 'sentire', 'finire'],
            rows: [
              ['tu', 'guarda!', 'prendi!', 'senti!', 'finisci!'],
              ['noi', 'guardiamo!', 'prendiamo!', 'sentiamo!', 'finiamo!'],
              ['voi', 'guardate!', 'prendete!', 'sentite!', 'finite!'],
            ],
          },
        ],
        examples: [
          {
            it: 'Guarda, stasera c’è un film di Sorrentino in TV!',
            ru: 'Смотри, сегодня вечером по телевизору фильм Соррентино!',
            az: 'Bax, bu axşam televizorda Sorrentinonun filmi var!',
          },
          {
            it: 'Ragazzi, ascoltate bene e scrivete le risposte.',
            ru: 'Ребята, слушайте внимательно и пишите ответы.',
            az: 'Uşaqlar, diqqətlə qulaq asın və cavabları yazın.',
          },
          {
            it: 'Prendi l’ombrello, a Bologna piove spesso!',
            ru: 'Возьми зонт, в Болонье часто идёт дождь!',
            az: 'Çətiri götür, Bolonyada tez-tez yağış yağır!',
          },
        ],
      },
      {
        title: 'Отрицательный императив',
        text: `Для **tu**: **non + инфинитив**: «**Non parlare**!», «**Non prendere** freddo!», «**Non dormire** in classe!»

Для **noi** и **voi**: просто **non + обычная форма**: «Non parliamo!», «**Non parlate**!»

Типичная ошибка: «Non parla!» (это «он не говорит») или «Non parli!» (это вежливая форма для Lei). Для «ты» — только **non + инфинитив**.

Мнемоника: «запрещаем тебе — даём инфинитив», как на табличках: «Non toccare» (не трогать).`,
        tables: [
          {
            title: 'Утверждение и отрицание',
            head: ['', 'да', 'нет'],
            rows: [
              ['tu', 'mangia!', 'non mangiare!'],
              ['tu', 'scrivi!', 'non scrivere!'],
              ['noi', 'usciamo!', 'non usciamo!'],
              ['voi', 'aspettate!', 'non aspettate!'],
            ],
          },
        ],
        examples: [
          {
            it: 'Non guardare il telefono mentre mangi!',
            ru: 'Не смотри в телефон, когда ешь!',
            az: 'Yemək yeyəndə telefona baxma!',
          },
          {
            it: 'Non cambiate canale, adesso comincia il telegiornale!',
            ru: 'Не переключайте канал, сейчас начинаются новости!',
            az: 'Kanalı dəyişməyin, indi xəbərlər başlayır!',
          },
        ],
      },
    ],
    drills: [
      { prompt: '(imperativo) parlare · tu', answer: 'parla', hint: '-are → -a' },
      { prompt: '(imperativo) prendere · tu', answer: 'prendi', hint: '-ere → -i' },
      { prompt: '(imperativo) dormire · tu', answer: 'dormi', hint: '-ire → -i' },
      { prompt: '(imperativo) finire · tu', answer: 'finisci', hint: 'с -isc-: finisci' },
      { prompt: '(imperativo) ascoltare · voi', answer: 'ascoltate', hint: 'voi = presente' },
      { prompt: '(imperativo) scrivere · voi', answer: 'scrivete', hint: 'voi = presente' },
      { prompt: '(imperativo) mangiare · noi', answer: 'mangiamo', hint: 'noi = presente' },
      { prompt: '(imperativo) aspettare · tu', answer: 'aspetta', hint: '-are → -a' },
      { prompt: '(imperativo) aprire · tu', answer: 'apri', hint: '-ire → -i' },
      { prompt: '(imperativo) pulire · tu', answer: 'pulisci', hint: 'с -isc-: pulisci' },
      { prompt: '(imperativo) leggere · voi', answer: 'leggete', hint: 'voi = presente' },
      { prompt: '(imperativo, нет) parlare · tu', answer: 'non parlare', hint: 'non + инфинитив' },
      { prompt: '(imperativo, нет) prendere · tu', answer: 'non prendere', hint: 'non + инфинитив' },
      { prompt: '(imperativo, нет) mangiare · voi', answer: 'non mangiate', hint: 'non + voi-форма' },
      { prompt: '(imperativo, нет) guardare · tu', answer: 'non guardare', hint: 'non + инфинитив' },
      { prompt: 'Marco, (chiudere) ___ la finestra, per favore!', answer: 'chiudi', hint: '-ere → -i' },
      { prompt: 'Ragazzi, (studiare) ___ per l’esame!', answer: 'studiate', hint: 'voi = presente' },
    ],
  },
  {
    id: 'u10-imperativo-irregolari',
    unit: 10,
    title: 'Неправильный императив; императив с местоимениями',
    goal: 'Говорить «Va’ dritto!», «Dimmi!», «Fallo subito!» и объяснять дорогу.',
    sections: [
      {
        title: 'Неправильные формы',
        text: `**Пять коротких глаголов** имеют для tu две формы — краткую с апострофом и длинную (= presente):
**andare** → va' / vai, **dare** → da' / dai, **fare** → fa' / fai, **stare** → sta' / stai, **dire** → **di'** (только одна!).

**essere** и **avere** — особые: **sii**, siamo, **siate**; **abbi**, abbiamo, **abbiate**. Также **sapere** → sappi, sappiamo, sappiate.
«**Sii** gentile!» — Будь вежлив! «**Abbi** pazienza!» — Имей терпение!

Остальные «неправильные» просто берут tu из presente: **vieni**!, **esci**!, **tieni**!, **bevi**!, **scegli**!

noi и voi — как в presente (кроме essere, avere, sapere: siate, abbiate, sappiate).`,
        tables: [
          {
            title: 'Неправильный императив',
            head: ['', 'tu', 'noi', 'voi'],
            rows: [
              ['andare', "va' / vai", 'andiamo', 'andate'],
              ['dare', "da' / dai", 'diamo', 'date'],
              ['fare', "fa' / fai", 'facciamo', 'fate'],
              ['stare', "sta' / stai", 'stiamo', 'state'],
              ['dire', "di'", 'diciamo', 'dite'],
              ['essere', 'sii', 'siamo', 'siate'],
              ['avere', 'abbi', 'abbiamo', 'abbiate'],
              ['venire', 'vieni', 'veniamo', 'venite'],
              ['uscire', 'esci', 'usciamo', 'uscite'],
            ],
          },
        ],
        examples: [
          {
            it: 'Sta’ tranquillo, l’esame andrà bene!',
            ru: 'Не волнуйся, экзамен пройдёт хорошо!',
            az: 'Narahat olma, imtahan yaxşı keçəcək!',
          },
          {
            it: 'Vieni anche tu stasera? Dai, esci con noi!',
            ru: 'Ты тоже придёшь вечером? Ну давай, пошли с нами!',
            az: 'Bu axşam sən də gələcəksən? Hadi, bizimlə çıx!',
          },
        ],
      },
      {
        title: 'Императив + местоимение',
        text: `В утвердительном императиве (tu, noi, voi) местоимения **приклеиваются в конец**: «Prendi**lo**!», «Mangiamo**la**!», «Scrivete**mi**!»

С короткими формами **va', da', fa', sta', di'** первая согласная местоимения **удваивается** (апостроф исчезает):
di' + mi → **Dimmi**! fa' + lo → **Fallo**! da' + mi → **Dammi**! fa' + mi → **Fammi** vedere! di' + lo → **Dillo**!
Исключение: gli не удваивается: **Digli** la verità!

**Dammelo!** (дай мне это) = da' + **me** + lo: mi перед lo превращается в **me**. Так же: «Dimmelo!» — Скажи мне это!

С отрицанием — два варианта: «**Non farlo**!» = «**Non lo fare**!»`,
        examples: [
          {
            it: 'Dimmi la verità: ti piace questo programma?',
            ru: 'Скажи мне правду: тебе нравится эта передача?',
            az: 'Mənə düzünü de: bu veriliş xoşuna gəlir?',
          },
          {
            it: 'Il telecomando? Dammelo, per favore!',
            ru: 'Пульт? Дай его мне, пожалуйста!',
            az: 'Pult? Onu mənə ver, zəhmət olmasa!',
          },
          {
            it: 'È un film bellissimo: guardalo!',
            ru: 'Это прекрасный фильм: посмотри его!',
            az: 'Çox gözəl filmdir: ona bax!',
          },
        ],
      },
      {
        title: 'Как объяснить дорогу',
        text: `Императив нужен, чтобы объяснить дорогу. Полезные фразы:
**va' / vai dritto** — иди прямо; **gira a destra / a sinistra** — поверни направо / налево; **prendi la prima (strada) a destra** — первый поворот направо; **attraversa** la piazza — перейди площадь; **continua fino al semaforo** — иди до светофора; **sali / scendi** — поднимись / спустись.

Вежливо (к незнакомому человеку, Lei) говорят: «Vada dritto, giri a destra» — эти формы будут позже; пока используйте tu с друзьями.`,
        examples: [
          {
            it: 'Per andare in Piazza Maggiore, va’ dritto per via Rizzoli e poi gira a sinistra.',
            ru: 'Чтобы попасть на Пьяцца Маджоре, иди прямо по виа Риццоли, а потом поверни налево.',
            az: 'Macore meydanına getmək üçün Rizzoli küçəsi ilə düz get, sonra sola dön.',
          },
          {
            it: 'Prendi la seconda a destra e attraversa il ponte.',
            ru: 'Сверни на второй поворот направо и перейди мост.',
            az: 'Sağdan ikinci döngəyə dön və körpünü keç.',
          },
        ],
      },
    ],
    drills: [
      { prompt: '(imperativo) andare · tu', answer: 'vai', also: ["va'"], hint: "va' / vai" },
      { prompt: '(imperativo) fare · tu', answer: 'fai', also: ["fa'"], hint: "fa' / fai" },
      { prompt: '(imperativo) dire · tu', answer: "di'", hint: "только di'" },
      { prompt: '(imperativo) essere · tu', answer: 'sii', hint: 'essere → sii' },
      { prompt: '(imperativo) avere · tu', answer: 'abbi', hint: 'avere → abbi' },
      { prompt: '(imperativo) essere · voi', answer: 'siate', hint: 'essere → siate' },
      { prompt: '(imperativo) avere · voi', answer: 'abbiate', hint: 'avere → abbiate' },
      { prompt: '(imperativo) venire · tu', answer: 'vieni', hint: 'как presente: vieni' },
      { prompt: '(imperativo) uscire · tu', answer: 'esci', hint: 'как presente: esci' },
      { prompt: '(imperativo) stare · tu', answer: 'stai', also: ["sta'"], hint: "sta' / stai" },
      { prompt: '(imperativo) fare · noi', answer: 'facciamo', hint: 'noi = presente' },
      { prompt: '(imperativo) dire · voi', answer: 'dite', hint: 'voi = presente' },
      { prompt: 'di\' + mi = ___!', answer: 'dimmi', hint: 'удвоение: dimmi' },
      { prompt: 'fa\' + lo = ___!', answer: 'fallo', hint: 'удвоение: fallo' },
      { prompt: 'da\' + mi + lo = ___!', answer: 'dammelo', hint: 'mi → me: dammelo' },
      { prompt: 'Il libro? (prendere, tu + lo) ___!', answer: 'prendilo', hint: 'prendi + lo' },
      { prompt: 'La lettera? (scrivere, voi + la) ___ subito!', answer: 'scrivetela', hint: 'scrivete + la' },
      { prompt: '(нет) farlo · tu → Non ___!', answer: 'farlo', also: ['lo fare'], hint: 'non + farlo / non lo fare' },
      { prompt: 'Per la stazione, (girare, tu) ___ a destra.', answer: 'gira', hint: '-are → -a' },
      { prompt: 'Al semaforo (andare, tu) ___ dritto.', answer: 'vai', also: ["va'"], hint: "va' / vai dritto" },
    ],
  },
];
