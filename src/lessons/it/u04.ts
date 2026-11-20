import type { Lesson } from '../types';

// Unit 4 "Al bar": passato prossimo (avere / essere), participi irregolari, ci, avverbi di tempo, modali al passato.
export const lessons: Lesson[] = [
  {
    id: 'u04-passato',
    unit: 4,
    title: 'Прошедшее время — passato prossimo с avere',
    goal: 'Рассказывать, что вы сделали: «Ieri ho studiato, ho mangiato in mensa e ho dormito poco».',
    sections: [
      {
        title: 'Как строится',
        text: `**Passato prossimo** — главное прошедшее время разговорной речи: «я сделал / делал» о законченном действии.

Формула: **avere (в presente) + причастие (participio passato)**.
ho mangiato, hai mangiato, ha mangiato, abbiamo mangiato, avete mangiato, hanno mangiato.

Причастие правильных глаголов:
- **-are → -ato**: parlare → parl**ato**, mangiare → mangi**ato**
- **-ere → -uto**: ricevere → ricev**uto**, avere → av**uto**
- **-ire → -ito**: dormire → dorm**ito**, capire → cap**ito** (тип -isc- здесь не важен)

Мнемоника: **«A-U-I»** — гласная причастия: -**a**re → -**a**to, -**e**re → -**u**to, -**i**re → -**i**to.

С avere причастие **не меняется** (всегда на -o): Anna **ha mangiato**, le ragazze **hanno mangiato**.`,
        tables: [
          {
            title: 'mangiare · ricevere · dormire',
            head: ['', 'mangiare', 'ricevere', 'dormire'],
            rows: [
              ['io', 'ho mangiato', 'ho ricevuto', 'ho dormito'],
              ['tu', 'hai mangiato', 'hai ricevuto', 'hai dormito'],
              ['lui / lei', 'ha mangiato', 'ha ricevuto', 'ha dormito'],
              ['noi', 'abbiamo mangiato', 'abbiamo ricevuto', 'abbiamo dormito'],
              ['voi', 'avete mangiato', 'avete ricevuto', 'avete dormito'],
              ['loro', 'hanno mangiato', 'hanno ricevuto', 'hanno dormito'],
            ],
          },
          {
            title: 'capire · avere',
            head: ['', 'capire', 'avere'],
            rows: [
              ['io', 'ho capito', 'ho avuto'],
              ['tu', 'hai capito', 'hai avuto'],
              ['lui / lei', 'ha capito', 'ha avuto'],
              ['noi', 'abbiamo capito', 'abbiamo avuto'],
              ['voi', 'avete capito', 'avete avuto'],
              ['loro', 'hanno capito', 'hanno avuto'],
            ],
          },
        ],
        examples: [
          {
            it: 'Ieri ho studiato tutto il giorno in biblioteca.',
            ru: 'Вчера я весь день занимался в библиотеке.',
            az: 'Dünən bütün günü kitabxanada dərs oxudum.',
          },
          {
            it: 'Abbiamo mangiato le tagliatelle in una trattoria.',
            ru: 'Мы ели тальятелле в траттории.',
            az: 'Bir trattoriyada tağlyatelle yedik.',
          },
          {
            it: 'Hai ricevuto il mio messaggio?',
            ru: 'Ты получил моё сообщение?',
            az: 'Mənim mesajımı aldın?',
          },
        ],
      },
      {
        title: 'Отрицание, вопросы, слова-маркеры',
        text: `**Отрицание** — перед вспомогательным глаголом: **Non ho capito.** (а не «ho non capito»).

**Вопрос** — интонацией: Hai finito? Che cosa avete fatto?

Слова, которые «зовут» passato prossimo:
**ieri** (вчера), **l’altro ieri** (позавчера), **ieri sera** (вчера вечером), **stamattina** (сегодня утром), **la settimana scorsa** (на прошлой неделе), **l’anno scorso** (в прошлом году), **due giorni fa** (два дня назад), **un’ora fa** (час назад).

**fa** = «назад» и стоит **после** срока: tre mesi **fa** — три месяца назад.

Совет: **Non ho capito** — самая полезная фраза первых недель в Болонье. Выучите её наизусть!`,
        examples: [
          {
            it: 'Scusi, non ho capito. Può ripetere?',
            ru: 'Извините, я не понял. Можете повторить?',
            az: 'Bağışlayın, başa düşmədim. Təkrar edə bilərsiniz?',
          },
          {
            it: 'Due giorni fa ho conosciuto una ragazza di Napoli.',
            ru: 'Два дня назад я познакомился с девушкой из Неаполя.',
            az: 'İki gün əvvəl Neapoldan bir qızla tanış oldum.',
          },
          {
            it: 'Stamattina abbiamo pagato noi il caffè.',
            ru: 'Сегодня утром за кофе заплатили мы.',
            az: 'Bu səhər qəhvənin pulunu biz ödədik.',
          },
        ],
      },
    ],
    drills: [
      { prompt: '(passato) mangiare · io', answer: 'ho mangiato', hint: 'ho + -ato.' },
      { prompt: '(passato) parlare · tu', answer: 'hai parlato', hint: 'hai + -ato.' },
      { prompt: '(passato) studiare · noi', answer: 'abbiamo studiato', hint: 'abbiamo + -ato.' },
      { prompt: '(passato) lavorare · loro', answer: 'hanno lavorato', hint: 'hanno + -ato.' },
      { prompt: '(passato) ricevere · lei', answer: 'ha ricevuto', hint: '-ere → -uto.' },
      { prompt: '(passato) vendere · io', answer: 'ho venduto', hint: '-ere → -uto.' },
      { prompt: '(passato) dormire · voi', answer: 'avete dormito', hint: '-ire → -ito.' },
      { prompt: '(passato) capire · io', answer: 'ho capito', hint: '-ire → -ito, без -isc-.' },
      { prompt: '(passato) finire · noi', answer: 'abbiamo finito', hint: '-ire → -ito.' },
      { prompt: '(passato) pagare · tu', answer: 'hai pagato', hint: 'В причастии h не нужна: pagato.' },
      { prompt: '(passato) avere · io', answer: 'ho avuto', hint: 'avere → avuto.' },
      { prompt: '(passato) sentire · loro', answer: 'hanno sentito', hint: '-ire → -ito.' },
      { prompt: '(passato) conoscere · io', answer: 'ho conosciuto', hint: 'conoscere → conosciuto (с i!).' },
      { prompt: 'Ieri io ___ (comprare) un libro.', answer: 'ho comprato', hint: 'avere · io + comprato.' },
      { prompt: 'Marco ___ (pulire) la casa.', answer: 'ha pulito', hint: 'avere · lui + pulito.' },
      { prompt: 'Noi non ___ (capire) la domanda.', answer: 'abbiamo capito', hint: 'non + abbiamo capito.' },
      { prompt: 'Che cosa ___ (tu, mangiare) a pranzo?', answer: 'hai mangiato', hint: 'avere · tu + mangiato.' },
      { prompt: 'Anna e Sara ___ (ascoltare) la lezione.', answer: 'hanno ascoltato', hint: 'С avere причастие не меняется.' },
      { prompt: 'Tre mesi ___ ho cominciato a studiare italiano. (назад)', answer: 'fa', hint: '«Назад» — fa, после срока.' },
    ],
  },
  {
    id: 'u04-essere-avere',
    unit: 4,
    title: 'Essere или avere? Неправильные причастия',
    goal: 'Выбирать вспомогательный глагол, согласовывать причастие с essere и знать главные неправильные причастия.',
    sections: [
      {
        title: 'Когда essere',
        text: `Большинство глаголов берут **avere**. **essere** берут глаголы, которые **не имеют прямого дополнения** и обозначают:
- **движение** с направлением: **andare, venire, arrivare, partire, tornare, entrare, uscire, salire, scendere, cadere**;
- **состояние / пребывание**: **essere, stare, restare, rimanere**;
- **изменение**: **nascere, morire, diventare, crescere**;
- а также **piacere, succedere, costare** и все возвратные (это будет позже: mi sono alzato).

Мнемоника: представьте **«дом жизни»**: в него **входят и выходят** (entrare, uscire), **поднимаются и спускаются** (salire, scendere), **приходят и уходят** (venire, andare, arrivare, partire, tornare), **остаются** (stare, restare, rimanere), **рождаются и умирают** (nascere, morire). Все жильцы дома — с essere.

Но! Глаголы движения **без направления** — с avere: **ho camminato, ho viaggiato, ho corso, ho nuotato**.

**cominciare, finire** — двойные: с дополнением **avere** (Ho finito **il libro**), без дополнения — **essere** (La lezione **è finita**).`,
        tables: [
          {
            title: 'andare (passato prossimo)',
            head: ['', 'andare'],
            rows: [
              ['io', 'sono andato / andata'],
              ['tu', 'sei andato / andata'],
              ['lui / lei', 'è andato / è andata'],
              ['noi', 'siamo andati / andate'],
              ['voi', 'siete andati / andate'],
              ['loro', 'sono andati / andate'],
            ],
          },
        ],
        examples: [
          {
            it: 'Ieri sono andato in centro e sono tornato tardi.',
            ru: 'Вчера я ходил в центр и вернулся поздно.',
            az: 'Dünən mərkəzə getdim və gec qayıtdım.',
          },
          {
            it: 'Sono nato a Baku nel 2006.',
            ru: 'Я родился в Баку в 2006 году.',
            az: 'Mən 2006-cı ildə Bakıda doğulmuşam.',
          },
        ],
      },
      {
        title: 'Согласование причастия с essere',
        text: `С **essere** причастие ведёт себя как **прилагательное** и согласуется с подлежащим в роде и числе:
- Marco è andat**o**, Anna è andat**a**
- Marco e Luca sono andat**i**, Anna e Sara sono andat**e**
- Marco e Anna sono andat**i** (смешанная группа → мужской род)

Говорит девушка — «io sono andat**a**». Говорит парень — «io sono andat**o**».

С **avere** — **никакого согласования**: Anna ha mangiat**o** (не «ha mangiata»).

Типичная ошибка: «ho andato». Запомните пару: **sono andato — ho mangiato**.

Причастие **essere** и **stare** одно и то же: **stato**. Sono **stato** a Roma = Я был в Риме.`,
        tables: [
          {
            title: 'essere (passato prossimo)',
            head: ['', 'essere'],
            rows: [
              ['io', 'sono stato / stata'],
              ['tu', 'sei stato / stata'],
              ['lui / lei', 'è stato / è stata'],
              ['noi', 'siamo stati / state'],
              ['voi', 'siete stati / state'],
              ['loro', 'sono stati / state'],
            ],
          },
        ],
        examples: [
          {
            it: 'Anna e Sara sono arrivate a Bologna ieri sera.',
            ru: 'Анна и Сара приехали в Болонью вчера вечером.',
            az: 'Anna ilə Sara dünən axşam Bolonyaya gəldilər.',
          },
          {
            it: 'Siete mai stati a Venezia?',
            ru: 'Вы когда-нибудь были в Венеции?',
            az: 'Siz heç Venesiyada olmusunuz?',
          },
        ],
      },
      {
        title: 'Неправильные причастия',
        text: `Многие частые глаголы (особенно на **-ere**) имеют неправильное причастие. Их нужно выучить — без них не рассказать ни одной истории.

Группы для запоминания:
- **-tto**: fatto, detto, scritto, letto
- **-so**: preso, messo, chiuso, perso, speso, corso
- **-sto**: visto, rimasto, risposto, chiesto
- **-rto**: aperto, morto
- **разные**: venuto, stato, nato, bevuto, scelto, vissuto

Совет: учите причастие **вместе со вспомогательным глаголом**: ho fatto, sono venuto, ho preso, sono rimasto.

**vivere**: ho vissuto / sono vissuto — допустимы оба (в разговоре чаще ho vissuto).`,
        tables: [
          {
            title: 'Неправильные причастия',
            head: ['инфинитив', 'причастие', 'пример'],
            rows: [
              ['fare', 'fatto', 'ho fatto'],
              ['dire', 'detto', 'ho detto'],
              ['scrivere', 'scritto', 'ho scritto'],
              ['leggere', 'letto', 'ho letto'],
              ['prendere', 'preso', 'ho preso'],
              ['mettere', 'messo', 'ho messo'],
              ['vedere', 'visto', 'ho visto'],
              ['aprire', 'aperto', 'ho aperto'],
              ['chiudere', 'chiuso', 'ho chiuso'],
              ['venire', 'venuto', 'sono venuto/a'],
              ['essere / stare', 'stato', 'sono stato/a'],
              ['nascere', 'nato', 'sono nato/a'],
              ['morire', 'morto', 'è morto/a'],
              ['bere', 'bevuto', 'ho bevuto'],
              ['rimanere', 'rimasto', 'sono rimasto/a'],
              ['scegliere', 'scelto', 'ho scelto'],
              ['vivere', 'vissuto', 'ho vissuto'],
              ['correre', 'corso', 'ho corso'],
              ['rispondere', 'risposto', 'ho risposto'],
              ['chiedere', 'chiesto', 'ho chiesto'],
              ['perdere', 'perso', 'ho perso'],
              ['spendere', 'speso', 'ho speso'],
            ],
          },
          {
            title: 'fare (passato prossimo)',
            head: ['', 'fare'],
            rows: [
              ['io', 'ho fatto'],
              ['tu', 'hai fatto'],
              ['lui / lei', 'ha fatto'],
              ['noi', 'abbiamo fatto'],
              ['voi', 'avete fatto'],
              ['loro', 'hanno fatto'],
            ],
          },
        ],
        examples: [
          {
            it: 'Al bar ho preso un cappuccino e ho letto il giornale.',
            ru: 'В баре я взял капучино и почитал газету.',
            az: 'Barda bir kapuçino aldım və qəzet oxudum.',
          },
          {
            it: 'Che cosa hai fatto nel fine settimana? — Ho visto un film.',
            ru: 'Что ты делал на выходных? — Посмотрел фильм.',
            az: 'Həftə sonu nə etdin? — Bir film izlədim.',
          },
          {
            it: 'Ho perso le chiavi e sono rimasto fuori casa!',
            ru: 'Я потерял ключи и остался за дверью!',
            az: 'Açarları itirdim və evdən çöldə qaldım!',
          },
        ],
      },
    ],
    drills: [
      { prompt: '(passato) andare · io', answer: 'sono andato', also: ['sono andata'], hint: 'Движение → essere; причастие согласуется.' },
      { prompt: '(passato) venire · lei', answer: 'è venuta', hint: 'essere + venuta (ж. р.).' },
      { prompt: '(passato) uscire · noi', answer: 'siamo usciti', also: ['siamo uscite'], hint: 'essere + -i / -e.' },
      { prompt: '(passato) partire · loro', answer: 'sono partiti', also: ['sono partite'], hint: 'essere + -i / -e.' },
      { prompt: '(passato) fare · io', answer: 'ho fatto', hint: 'fare → fatto.' },
      { prompt: '(passato) dire · tu', answer: 'hai detto', hint: 'dire → detto.' },
      { prompt: '(passato) scrivere · lui', answer: 'ha scritto', hint: 'scrivere → scritto.' },
      { prompt: '(passato) leggere · noi', answer: 'abbiamo letto', hint: 'leggere → letto.' },
      { prompt: '(passato) prendere · voi', answer: 'avete preso', hint: 'prendere → preso.' },
      { prompt: '(passato) vedere · loro', answer: 'hanno visto', also: ['hanno veduto'], hint: 'vedere → visto.' },
      { prompt: '(passato) bere · io', answer: 'ho bevuto', hint: 'bere → bevuto (от bev-).' },
      { prompt: '(passato) aprire · tu', answer: 'hai aperto', hint: 'aprire → aperto.' },
      { prompt: '(passato) chiudere · lei', answer: 'ha chiuso', hint: 'chiudere → chiuso.' },
      { prompt: '(passato) essere · noi', answer: 'siamo stati', also: ['siamo state'], hint: 'essere → stato, с essere.' },
      { prompt: 'Anna ___ (rimanere) a casa.', answer: 'è rimasta', hint: 'rimanere → rimasto, с essere; Anna → -a.' },
      { prompt: 'Io ___ (nascere) a Baku.', answer: 'sono nato', also: ['sono nata'], hint: 'nascere → nato, с essere.' },
      { prompt: 'Quanto ___ (tu, spendere) al mercato?', answer: 'hai speso', hint: 'spendere → speso.' },
      { prompt: 'Marco ___ (rispondere) subito.', answer: 'ha risposto', hint: 'rispondere → risposto.' },
      { prompt: 'Voi ___ (scegliere) il ristorante?', answer: 'avete scelto', hint: 'scegliere → scelto.' },
      { prompt: 'Ieri ___ (io, perdere) l’autobus.', answer: 'ho perso', also: ['ho perduto'], hint: 'perdere → perso.' },
    ],
  },
  {
    id: 'u04-ci-avverbi',
    unit: 4,
    title: 'Наречие ci; già, ancora, appena, mai, sempre; модальные в passato',
    goal: 'Говорить «Ci vado domani», «Non ho ancora finito», «Sono dovuto partire».',
    sections: [
      {
        title: 'Ci = «туда, там»',
        text: `**ci** заменяет уже названное место (a/in + место) и значит «туда / там»:
— Vai **a Bologna**? — Sì, **ci** vado domani. (= vado a Bologna)
— Quando torni **in Azerbaigian**? — **Ci** torno ad agosto.

Место **ci** — **перед спрягаемым глаголом**: ci vado, non ci vado, ci sono stato.
С инфинитивом — **приклеивается** в конец (без последней -e) или стоит перед модальным глаголом:
**Devo andarci** = **Ci devo andare** (оба верны).

Классическая фраза: **Ci sono stato** (Я там был). Sei mai stato a Roma? — Sì, ci sono stato due volte.

Не путайте с **ci sono** = «есть, имеются» (урок 14) — это то же слово ci, но в устойчивом выражении.`,
        examples: [
          {
            it: "Vai all'università oggi? — Sì, ci vado alle dieci.",
            ru: 'Ты сегодня идёшь в университет? — Да, иду в десять.',
            az: 'Bu gün universitetə gedirsən? — Bəli, saat onda gedirəm.',
          },
          {
            it: 'Sei mai stato a Firenze? — No, non ci sono mai stato.',
            ru: 'Ты когда-нибудь был во Флоренции? — Нет, ни разу там не был.',
            az: 'Heç Florensiyada olmusan? — Xeyr, heç orada olmamışam.',
          },
        ],
      },
      {
        title: 'Наречия с passato prossimo',
        text: `**già, ancora, appena, mai, sempre** ставятся **между вспомогательным глаголом и причастием**:
- **già** — уже: Ho **già** mangiato.
- **non… ancora** — ещё не: **Non** ho **ancora** finito.
- **appena** — только что: Sono **appena** arrivato.
- **(non…) mai** — (никогда не), когда-нибудь: **Non** sono **mai** stato a Napoli. Sei **mai** stato a Napoli?
- **sempre** — всегда: Ho **sempre** amato la pasta.

Мнемоника: **«бутерброд»** — avere/essere — **наречие** — причастие.

**Двойное отрицание** нормально: **Non** ho **mai** visto — дословно «не никогда видел». В русском так же: «я никогда не видел».

Ответ «ещё нет» — **Non ancora**: Hai finito? — Non ancora.`,
        tables: [
          {
            title: 'Порядок слов',
            head: ['', 'вспом. глагол', 'наречие', 'причастие'],
            rows: [
              ['', 'Ho', 'già', 'mangiato.'],
              ['Non', 'ho', 'ancora', 'finito.'],
              ['', 'Sono', 'appena', 'arrivato.'],
              ['Non', 'sono', 'mai', 'stato a Roma.'],
              ['', 'Ho', 'sempre', 'studiato.'],
            ],
          },
        ],
        examples: [
          {
            it: 'Hai già fatto colazione? — No, non ancora.',
            ru: 'Ты уже позавтракал? — Нет, ещё нет.',
            az: 'Artıq səhər yeməyi yemisən? — Xeyr, hələ yox.',
          },
          {
            it: 'La lezione è appena finita.',
            ru: 'Занятие только что закончилось.',
            az: 'Dərs indicə bitdi.',
          },
        ],
      },
      {
        title: 'Модальные глаголы в passato prossimo',
        text: `**potere, volere, dovere** «копируют» вспомогательный глагол **инфинитива**, который за ними стоит:
- studiare → **ho** studiato ⇒ **ho dovuto** studiare
- mangiare → **ho** mangiato ⇒ **ho voluto** mangiare
- andare → **sono** andato ⇒ **sono dovuto** andare
- partire → **sono** partito ⇒ Anna **è dovuta** partire (согласование, как с essere!)

В разговорной речи итальянцы часто используют **avere** и с глаголами движения: **ho dovuto andare** — это тоже допустимо. Но форма с essere считается «образцовой».

Если после модального стоит сам **essere**, берём **avere**: **Ho dovuto essere** paziente (Мне пришлось быть терпеливым).

Мнемоника: модальный глагол — **«хамелеон»**, он берёт цвет (вспомогательный глагол) следующего глагола.`,
        tables: [
          {
            title: 'dovere + andare (passato prossimo)',
            head: ['', 'dovere andare'],
            rows: [
              ['io', 'sono dovuto / dovuta andare'],
              ['tu', 'sei dovuto / dovuta andare'],
              ['lui / lei', 'è dovuto / è dovuta andare'],
              ['noi', 'siamo dovuti / dovute andare'],
              ['voi', 'siete dovuti / dovute andare'],
              ['loro', 'sono dovuti / dovute andare'],
            ],
          },
          {
            title: 'potere + studiare (passato prossimo)',
            head: ['', 'potere studiare'],
            rows: [
              ['io', 'ho potuto studiare'],
              ['tu', 'hai potuto studiare'],
              ['lui / lei', 'ha potuto studiare'],
              ['noi', 'abbiamo potuto studiare'],
              ['voi', 'avete potuto studiare'],
              ['loro', 'hanno potuto studiare'],
            ],
          },
        ],
        examples: [
          {
            it: 'Ieri non sono potuto venire a lezione: ho avuto la febbre.',
            ru: 'Вчера я не смог прийти на занятие: у меня была температура.',
            az: 'Dünən dərsə gələ bilmədim: qızdırmam vardı.',
          },
          {
            it: 'Abbiamo dovuto aspettare l’autobus per mezz’ora.',
            ru: 'Нам пришлось ждать автобус полчаса.',
            az: 'Avtobusu yarım saat gözləməli olduq.',
          },
          {
            it: 'Giulia è voluta tornare a casa presto.',
            ru: 'Джулия захотела вернуться домой пораньше.',
            az: 'Culiya evə tez qayıtmaq istədi.',
          },
        ],
      },
    ],
    drills: [
      { prompt: 'Vai in biblioteca oggi? — Sì, ___ vado.', answer: 'ci', hint: 'ci = туда (in biblioteca).' },
      { prompt: 'Sei mai stato a Venezia? — No, non ___ sono mai stato.', answer: 'ci', hint: 'ci = там (a Venezia).' },
      { prompt: 'Quando vai a Roma? — ___ vado sabato.', answer: 'ci', hint: 'ci перед глаголом.' },
      { prompt: 'Devo andare in banca. → Devo ___. (andare + ci)', answer: 'andarci', also: ['ci devo andare'], hint: 'С инфинитивом ci приклеивается: andarci.' },
      { prompt: 'Riscrivi con ci: Vado a Bologna domani.', answer: 'ci vado domani', hint: 'a Bologna → ci, перед глаголом.' },
      { prompt: 'Ho ___ mangiato. (уже)', answer: 'già', hint: '«Уже» — già.' },
      { prompt: 'Non ho ___ finito. (ещё не)', answer: 'ancora', hint: 'non… ancora = ещё не.' },
      { prompt: 'Sono ___ arrivato. (только что)', answer: 'appena', hint: '«Только что» — appena.' },
      { prompt: 'Non sono ___ stato a Napoli. (никогда)', answer: 'mai', hint: 'non… mai = никогда не.' },
      { prompt: 'Ho ___ amato Bologna. (всегда)', answer: 'sempre', hint: '«Всегда» — sempre.' },
      { prompt: 'Порядок слов: già / ho / mangiato', answer: 'ho già mangiato', hint: 'Наречие — между avere и причастием.' },
      { prompt: 'Hai ___ visto il film? — No, non ancora.', answer: 'già', hint: 'Вопрос «уже?» — già.' },
      { prompt: '(passato) dovere studiare · io', answer: 'ho dovuto studiare', hint: 'studiare → avere, значит ho dovuto.' },
      { prompt: '(passato) dovere partire · Anna', answer: 'è dovuta partire', also: ['ha dovuto partire'], hint: 'partire → essere, согласуем: dovuta.' },
      { prompt: 'Ieri noi non ___ venire. (potere, passato)', answer: 'siamo potuti', also: ['siamo potute', 'abbiamo potuto'], hint: 'venire → essere: siamo potuti.' },
      { prompt: '(passato) volere mangiare · loro', answer: 'hanno voluto mangiare', hint: 'mangiare → avere: hanno voluto.' },
      { prompt: '(passato) volere uscire · tu (Marco)', answer: 'sei voluto uscire', also: ['hai voluto uscire'], hint: 'uscire → essere: sei voluto.' },
      { prompt: '(passato) potere leggere · voi', answer: 'avete potuto leggere', hint: 'leggere → avere: avete potuto.' },
    ],
  },
];
