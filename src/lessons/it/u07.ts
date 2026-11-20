import type { Lesson } from '../types';

// Unit 7 "Al cinema": imperfetto, imperfetto vs passato prossimo, trapassato prossimo.
export const lessons: Lesson[] = [
  {
    id: 'u07-imperfetto',
    unit: 7,
    title: 'Прошедшее несовершенное — imperfetto',
    goal: 'Описывать прошлое: как было, что делал обычно, что происходило фоном.',
    sections: [
      {
        title: 'Правильные глаголы',
        text: `Imperfetto — самое «послушное» время итальянского. Берём инфинитив, убираем **-re** и добавляем **-vo, -vi, -va, -vamo, -vate, -vano**:
parla-re → parla**vo**, prende-re → prende**vo**, dormi-re → dormi**vo**.

Гласная спряжения (a / e / i) сохраняется во всех лицах. Даже **avere** правильный: ave**vo**, ave**vi**…

Ударение: в loro оно на третьем слоге с конца — par**la**vano, pren**de**vano (не «parlavАно»).

По смыслу imperfetto близко к русскому **несовершенному виду**: «делал, жил, бывало».`,
        tables: [
          {
            title: 'parlare · prendere · dormire',
            head: ['', 'parlare', 'prendere', 'dormire'],
            rows: [
              ['io', 'parlavo', 'prendevo', 'dormivo'],
              ['tu', 'parlavi', 'prendevi', 'dormivi'],
              ['lui / lei', 'parlava', 'prendeva', 'dormiva'],
              ['noi', 'parlavamo', 'prendevamo', 'dormivamo'],
              ['voi', 'parlavate', 'prendevate', 'dormivate'],
              ['loro', 'parlavano', 'prendevano', 'dormivano'],
            ],
          },
        ],
        examples: [
          {
            it: 'Da bambino abitavo a Baku e giocavo a calcio ogni giorno.',
            ru: 'В детстве я жил в Баку и каждый день играл в футбол.',
            az: 'Uşaq olanda Bakıda yaşayırdım və hər gün futbol oynayırdım.',
          },
          {
            it: 'Il film finiva tardi, ma noi non avevamo sonno.',
            ru: 'Фильм заканчивался поздно, но нам не хотелось спать.',
            az: 'Film gec bitirdi, amma bizim yuxumuz gəlmirdi.',
          },
        ],
      },
      {
        title: 'Неправильные и модальные',
        text: `Неправильных совсем мало. **essere** — особый: **ero, eri, era, eravamo, eravate, erano**.

Остальные берут **старую латинскую основу** (ту же, что в presente: facc-io, dic-o, bev-o, traduc-o):
fare → **face**vo, dire → **dice**vo, bere → **beve**vo, tradurre → **traduce**vo (и все на -durre: produrre → producevo).

Мнемоника: «**FA**re — **FACE**vo, **DI**re — **DICE**vo, **BE**re — **BEVE**vo»: короткий инфинитив «вспоминает» полную латинскую форму (facere, dicere, bevere).

**Модальные** в imperfetto правильные: volevo, potevo, dovevo, sapevo. Они очень частотны: «**Volevo** un caffè» (вежливо = «я хотел бы»), «**Dovevo** studiare, ma sono uscito» (должен был).`,
        tables: [
          {
            title: 'essere · fare · dire · bere · tradurre',
            head: ['', 'essere', 'fare', 'dire', 'bere', 'tradurre'],
            rows: [
              ['io', 'ero', 'facevo', 'dicevo', 'bevevo', 'traducevo'],
              ['tu', 'eri', 'facevi', 'dicevi', 'bevevi', 'traducevi'],
              ['lui / lei', 'era', 'faceva', 'diceva', 'beveva', 'traduceva'],
              ['noi', 'eravamo', 'facevamo', 'dicevamo', 'bevevamo', 'traducevamo'],
              ['voi', 'eravate', 'facevate', 'dicevate', 'bevevate', 'traducevate'],
              ['loro', 'erano', 'facevano', 'dicevano', 'bevevano', 'traducevano'],
            ],
          },
          {
            title: 'volere · potere · dovere',
            head: ['', 'volere', 'potere', 'dovere'],
            rows: [
              ['io', 'volevo', 'potevo', 'dovevo'],
              ['tu', 'volevi', 'potevi', 'dovevi'],
              ['lui / lei', 'voleva', 'poteva', 'doveva'],
              ['noi', 'volevamo', 'potevamo', 'dovevamo'],
              ['voi', 'volevate', 'potevate', 'dovevate'],
              ['loro', 'volevano', 'potevano', 'dovevano'],
            ],
          },
        ],
        examples: [
          {
            it: 'Era una bella serata e faceva caldo.',
            ru: 'Был прекрасный вечер, и было жарко.',
            az: 'Gözəl axşam idi və isti idi.',
          },
          {
            it: 'Al liceo traducevo i testi latini senza dizionario.',
            ru: 'В лицее я переводил латинские тексты без словаря.',
            az: 'Liseydə latın mətnlərini lüğətsiz tərcümə edirdim.',
          },
          {
            it: 'Volevamo vedere un film, ma il cinema era chiuso.',
            ru: 'Мы хотели посмотреть фильм, но кинотеатр был закрыт.',
            az: 'Film izləmək istəyirdik, amma kinoteatr bağlı idi.',
          },
        ],
      },
    ],
    drills: [
      { prompt: '(imperfetto) parlare · io', answer: 'parlavo', hint: 'parla- + -vo' },
      { prompt: '(imperfetto) prendere · noi', answer: 'prendevamo', hint: 'prende- + -vamo' },
      { prompt: '(imperfetto) dormire · loro', answer: 'dormivano', hint: 'dormi- + -vano' },
      { prompt: '(imperfetto) avere · tu', answer: 'avevi', hint: 'avere правильный: avevi' },
      { prompt: '(imperfetto) essere · io', answer: 'ero', hint: 'essere: ero, eri, era…' },
      { prompt: '(imperfetto) essere · noi', answer: 'eravamo', hint: 'eravamo' },
      { prompt: '(imperfetto) essere · loro', answer: 'erano', hint: 'erano' },
      { prompt: '(imperfetto) fare · loro', answer: 'facevano', hint: 'основа face-' },
      { prompt: '(imperfetto) fare · io', answer: 'facevo', hint: 'основа face-' },
      { prompt: '(imperfetto) dire · lui', answer: 'diceva', hint: 'основа dice-' },
      { prompt: '(imperfetto) bere · voi', answer: 'bevevate', hint: 'основа beve-' },
      { prompt: '(imperfetto) tradurre · io', answer: 'traducevo', hint: 'основа traduce-' },
      { prompt: '(imperfetto) volere · noi', answer: 'volevamo', hint: 'правильный: vole- + -vamo' },
      { prompt: '(imperfetto) potere · tu', answer: 'potevi', hint: 'pote- + -vi' },
      { prompt: '(imperfetto) dovere · lei', answer: 'doveva', hint: 'dove- + -va' },
      { prompt: '(imperfetto) capire · voi', answer: 'capivate', hint: 'без -isc-: capi- + -vate' },
      { prompt: 'Da piccolo (io, andare) ___ al mare ogni estate.', answer: 'andavo', hint: 'привычка в прошлом' },
      { prompt: 'Quando ero bambina, mia nonna mi (dire) ___ sempre: «Studia!»', answer: 'diceva', hint: 'dire → diceva' },
    ],
  },
  {
    id: 'u07-imperf-vs-pp',
    unit: 7,
    title: 'Imperfetto или passato prossimo?',
    goal: 'Выбирать правильное прошедшее время в рассказе о прошлом.',
    sections: [
      {
        title: 'Главное правило',
        text: `Представьте рассказ как **фильм**.
**Imperfetto** — это **декорации и фон**: погода, время, возраст, внешность, чувства, что происходило, что делали обычно. Вопрос: «**Каким было? Что происходило?**»
**Passato prossimo** — это **события сюжета**: что случилось один раз, с началом и концом. Вопрос: «**Что произошло?**»

Подсказка через русский: imperfetto ≈ несовершенный вид (**делал**), passato prossimo ≈ совершенный (**сделал**). Работает в 80% случаев.

Сигнальные слова:
— **imperfetto:** di solito, sempre, ogni giorno, spesso, da bambino, mentre;
— **passato prossimo:** ieri, una volta, all'improvviso, a un certo punto, poi, per due ore (законченный отрезок!).`,
        tables: [
          {
            title: 'Сравните',
            head: ['imperfetto (фон / привычка)', 'passato prossimo (событие)'],
            rows: [
              ['Ogni sabato andavo al cinema.', 'Sabato scorso sono andato al cinema.'],
              ['Pioveva e faceva freddo.', 'All’improvviso ha cominciato a piovere.'],
              ['Ero stanco.', 'Ho dormito dieci ore.'],
              ['Avevo vent’anni.', 'Ho compiuto vent’anni a maggio.'],
            ],
          },
        ],
      },
      {
        title: 'Mentre и прерванное действие',
        text: `1. **Два фона одновременно** — оба в imperfetto: «**Mentre** io **cucinavo**, Marco **apparecchiava** la tavola».

2. **Фон прерван событием**: фон — imperfetto, событие — passato prossimo. «**Mentre guardavo** il film, **è squillato** il telefono». Длинная линия (смотрел) и точка на ней (зазвонил).

3. **Цепочка событий** — все в passato prossimo: «Sono entrato, ho salutato e mi sono seduto».

Ловушка: «per due ore», «tutta la sera» — законченный период → **passato prossimo**: «Ieri **ho studiato** per tre ore» (не «studiavo»).

Ещё ловушка — модальные: «**Dovevo** studiare» (должен был, неизвестно, сделал ли) vs «**Ho dovuto** studiare» (пришлось и сделал).`,
        examples: [
          {
            it: 'Mentre aspettavo l’autobus, ho incontrato Giulia.',
            ru: 'Пока я ждал автобус, я встретил Джулию.',
            az: 'Avtobus gözləyərkən Culiya ilə rastlaşdım.',
          },
          {
            it: 'Di solito cenavamo alle otto, ma ieri abbiamo cenato alle dieci.',
            ru: 'Обычно мы ужинали в восемь, а вчера поужинали в десять.',
            az: 'Adətən saat səkkizdə şam edirdik, amma dünən onda şam etdik.',
          },
          {
            it: 'Il film era noioso, così siamo usciti prima della fine.',
            ru: 'Фильм был скучный, поэтому мы ушли до конца.',
            az: 'Film darıxdırıcı idi, ona görə də sonundan əvvəl çıxdıq.',
          },
          {
            it: 'Mentre il professore spiegava, gli studenti prendevano appunti.',
            ru: 'Пока профессор объяснял, студенты конспектировали.',
            az: 'Professor izah edərkən tələbələr qeyd aparırdılar.',
          },
        ],
      },
    ],
    drills: [
      { prompt: 'Da bambino (io, giocare) ___ sempre in giardino.', answer: 'giocavo', hint: 'sempre, da bambino → imperfetto' },
      { prompt: 'Ieri sera (noi, vedere) ___ un film di Fellini.', answer: 'abbiamo visto', also: ['abbiamo veduto'], hint: 'ieri, одно событие → passato prossimo' },
      { prompt: 'Mentre (io, studiare) ___, è arrivato Marco.', answer: 'studiavo', hint: 'фон при mentre → imperfetto' },
      { prompt: 'Mentre studiavo, (arrivare) ___ Marco.', answer: 'è arrivato', hint: 'событие прерывает фон → passato prossimo' },
      { prompt: 'Quando ero piccola, (avere) ___ i capelli lunghi.', answer: 'avevo', hint: 'описание → imperfetto' },
      { prompt: 'All’improvviso (cominciare) ___ a piovere.', answer: 'è cominciato', also: ['ha cominciato'], hint: "all'improvviso → passato prossimo" },
      { prompt: 'Ieri (fare) ___ freddo, così sono rimasto a casa.', answer: 'faceva', hint: 'погода как фон → imperfetto' },
      { prompt: 'Di solito Anna (prendere) ___ l’autobus delle otto.', answer: 'prendeva', hint: 'di solito → imperfetto' },
      { prompt: 'Sabato scorso Anna (prendere) ___ il treno per Milano.', answer: 'ha preso', hint: 'один раз → passato prossimo' },
      { prompt: 'Ieri (io, dormire) ___ per dieci ore!', answer: 'ho dormito', hint: 'законченный период → passato prossimo' },
      { prompt: 'Mentre Luca cucinava, io (apparecchiare) ___ la tavola.', answer: 'apparecchiavo', hint: 'два параллельных фона → imperfetto' },
      { prompt: 'Il cinema (essere) ___ pieno, e non c’erano posti liberi.', answer: 'era', hint: 'описание → imperfetto' },
      { prompt: 'Quando sono entrato, tutti (ridere) ___.', answer: 'ridevano', hint: 'что происходило в тот момент → imperfetto' },
      { prompt: 'Quando (io, entrare) ___, tutti ridevano.', answer: 'sono entrato', also: ['sono entrata'], hint: 'событие → passato prossimo с essere' },
      { prompt: 'Nel 2020 (noi, abitare) ___ ancora a Baku.', answer: 'abitavamo', hint: 'состояние, фон → imperfetto' },
      { prompt: 'Ieri non sono uscito perché (dovere) ___ studiare.', answer: 'dovevo', also: ['ho dovuto'], hint: 'причина-фон → dovevo' },
    ],
  },
  {
    id: 'u07-trapassato',
    unit: 7,
    title: 'Давнопрошедшее — trapassato prossimo',
    goal: 'Говорить о том, что случилось ещё раньше другого прошлого события.',
    sections: [
      {
        title: 'Образование',
        text: `Trapassato prossimo = **imperfetto от essere/avere + participio passato**: avevo visto, ero partito.

Правила те же, что в passato prossimo: тот же выбор вспомогательного глагола и то же согласование с essere (Anna **era** già **uscita**).

Подсказка: возьмите passato prossimo и поставьте вспомогательный глагол в imperfetto: ho visto → **avevo** visto, sono partito → **ero** partito.`,
        tables: [
          {
            title: 'vedere (avere) · partire (essere)',
            head: ['', 'vedere', 'partire'],
            rows: [
              ['io', 'avevo visto', 'ero partito/a'],
              ['tu', 'avevi visto', 'eri partito/a'],
              ['lui / lei', 'aveva visto', 'era partito/a'],
              ['noi', 'avevamo visto', 'eravamo partiti/e'],
              ['voi', 'avevate visto', 'eravate partiti/e'],
              ['loro', 'avevano visto', 'erano partiti/e'],
            ],
          },
        ],
      },
      {
        title: 'Когда употреблять',
        text: `Смысл: **«прошлое в прошлом»**. Если на шкале времени есть точка в прошлом (passato prossimo или imperfetto), то то, что было **ещё раньше**, — trapassato.
«Quando sono arrivato al cinema, il film **era** già **cominciato**». Сначала начался фильм, потом я пришёл.

Слова-помощники: **già** (уже), **prima** (раньше), **non… mai** (никогда до этого), **perché** (объяснение причины).

Ошибка русскоязычных: в русском нет отдельного «давнопрошедшего», поэтому хочется сказать «Quando sono arrivato, il treno è partito». Но это значит «когда я пришёл, поезд (тогда) ушёл» — порядок событий теряется. Нужно: «il treno **era partito**».`,
        examples: [
          {
            it: 'Non sono andato al cinema perché avevo già visto quel film.',
            ru: 'Я не пошёл в кино, потому что уже видел этот фильм.',
            az: 'Kinoya getmədim, çünki o filmə artıq baxmışdım.',
          },
          {
            it: 'Quando siamo arrivati alla stazione, il treno era già partito.',
            ru: 'Когда мы приехали на вокзал, поезд уже ушёл.',
            az: 'Vağzala çatanda qatar artıq yola düşmüşdü.',
          },
          {
            it: 'Prima di venire a Bologna, non avevo mai mangiato i tortellini.',
            ru: 'До приезда в Болонью я никогда не ел тортеллини.',
            az: 'Bolonyaya gəlməmişdən əvvəl heç vaxt tortellini yeməmişdim.',
          },
          {
            it: 'Giulia era stanca perché aveva lavorato tutto il giorno.',
            ru: 'Джулия устала, потому что работала весь день.',
            az: 'Culiya yorğun idi, çünki bütün günü işləmişdi.',
          },
        ],
      },
    ],
    drills: [
      { prompt: '(trapassato) vedere · io', answer: 'avevo visto', also: ['avevo veduto'], hint: 'avevo + visto' },
      { prompt: '(trapassato) mangiare · noi', answer: 'avevamo mangiato', hint: 'avevamo + mangiato' },
      { prompt: '(trapassato) partire · lui', answer: 'era partito', hint: 'era + partito' },
      { prompt: '(trapassato) uscire · lei', answer: 'era uscita', hint: 'essere → согласование: uscita' },
      { prompt: '(trapassato) fare · tu', answer: 'avevi fatto', hint: 'fare → fatto' },
      { prompt: '(trapassato) arrivare · loro (ragazzi)', answer: 'erano arrivati', hint: 'erano + arrivati' },
      { prompt: '(trapassato) leggere · voi', answer: 'avevate letto', hint: 'leggere → letto' },
      { prompt: '(trapassato) essere · io (Anna)', answer: 'ero stata', hint: 'essere → essere + stata' },
      { prompt: '(trapassato) prendere · lei', answer: 'aveva preso', hint: 'prendere → preso' },
      { prompt: '(trapassato) venire · noi (ragazze)', answer: 'eravamo venute', hint: 'essere + venute' },
      { prompt: 'Quando sono arrivato al cinema, il film (cominciare) ___.', answer: 'era cominciato', also: ['aveva cominciato'], hint: 'раньше другого прошлого → trapassato' },
      { prompt: 'Ero stanco perché (dormire) ___ poco.', answer: 'avevo dormito', hint: 'причина раньше → avevo dormito' },
      { prompt: 'Non avevo fame perché (mangiare) ___ un panino.', answer: 'avevo mangiato', hint: 'avevo + mangiato' },
      { prompt: 'Marco mi ha detto che (perdere) ___ le chiavi.', answer: 'aveva perso', also: ['aveva perduto'], hint: 'perdere → perso' },
      { prompt: 'Prima di allora non (io, vedere) ___ mai la neve.', answer: 'avevo visto', also: ['avevo veduto'], hint: 'non… mai раньше → trapassato' },
    ],
  },
];
