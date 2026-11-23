import type { Lesson } from '../types';

// Unit 11 "El pasado (2)": indefinido irregular, imperfecto, indefinido vs imperfecto.
export const lessons: Lesson[] = [
  {
    id: 'es-u11-indefinido-irregular',
    unit: 11,
    title: 'Неправильные глаголы в indefinido — fui, tuve, hice, dije',
    goal: 'Рассказывать о прошлом с самыми частыми глаголами: «Ayer fui al cine», «¿Qué hiciste?», «No pude venir».',
    sections: [
      {
        title: 'ser = ir, dar, ver',
        text: `**ser** и **ir** в indefinido **полностью совпадают**: fui, fuiste, fue, fuimos, fuisteis, fueron.
**Fui** a Sevilla. — Я ездил в Севилью. **Fue** un día increíble. — Это был невероятный день.
Различаем по смыслу: после **fui** идёт «a + место» — значит, это **ir**.

**dar** спрягается как глагол на **-er**: di, diste, dio, dimos, disteis, dieron.
**ver**: vi, viste, vio, vimos, visteis, vieron.

Важно: у этих коротких форм **нет знака ударения**: fui, fue, di, dio, vi, vio (не «fué» ✗, не «dió» ✗).`,
        tables: [
          {
            title: 'ser / ir · dar · ver',
            head: ['', 'ser / ir', 'dar', 'ver'],
            rows: [
              ['yo', 'fui', 'di', 'vi'],
              ['tú', 'fuiste', 'diste', 'viste'],
              ['él / ella / usted', 'fue', 'dio', 'vio'],
              ['nosotros', 'fuimos', 'dimos', 'vimos'],
              ['vosotros', 'fuisteis', 'disteis', 'visteis'],
              ['ellos / ellas / ustedes', 'fueron', 'dieron', 'vieron'],
            ],
          },
        ],
        examples: [
          {
            it: 'El verano pasado fuimos a la playa.',
            ru: 'Прошлым летом мы ездили на пляж.',
            az: 'Keçən yay çimərliyə getdik.',
          },
          {
            it: 'La fiesta fue muy divertida.',
            ru: 'Праздник был очень весёлым.',
            az: 'Ziyafət çox əyləncəli oldu.',
          },
          {
            it: 'Anoche vi una película y le di las gracias a mi amigo por recomendarla.',
            ru: 'Вчера вечером я посмотрел фильм и поблагодарил друга за совет.',
            az: 'Dünən axşam bir film izlədim və onu tövsiyə etdiyi üçün dostuma təşəkkür etdim.',
          },
        ],
      },
      {
        title: 'Сильные основы: estuve, tuve, hice, pude, puse, quise, vine',
        text: `У этих глаголов **новая основа** и **особые окончания без ударения**:
**-e, -iste, -o, -imos, -isteis, -ieron**.

- estar → **estuv-**: estuve
- tener → **tuv-**: tuve
- poder → **pud-**: pude
- poner → **pus-**: puse
- hacer → **hic-**: hice (но él **hizo** — c → z перед o)
- querer → **quis-**: quise
- venir → **vin-**: vine

Мнемоника: **«-U-» в основе**: est**u**ve, t**u**ve, p**u**de, p**u**se; **«-I-» в основе**: h**i**ce, qu**i**se, v**i**ne.

Ошибка: «tuvó» ✗, «hició» ✗. В yo — **-e**, в él — **-o**, **без знака ударения**: tuve, tuvo; hice, hizo.`,
        tables: [
          {
            title: 'estar · tener · poder · poner',
            head: ['', 'estar', 'tener', 'poder', 'poner'],
            rows: [
              ['yo', 'estuve', 'tuve', 'pude', 'puse'],
              ['tú', 'estuviste', 'tuviste', 'pudiste', 'pusiste'],
              ['él / ella / usted', 'estuvo', 'tuvo', 'pudo', 'puso'],
              ['nosotros', 'estuvimos', 'tuvimos', 'pudimos', 'pusimos'],
              ['vosotros', 'estuvisteis', 'tuvisteis', 'pudisteis', 'pusisteis'],
              ['ellos / ellas / ustedes', 'estuvieron', 'tuvieron', 'pudieron', 'pusieron'],
            ],
          },
          {
            title: 'hacer · querer · venir',
            head: ['', 'hacer', 'querer', 'venir'],
            rows: [
              ['yo', 'hice', 'quise', 'vine'],
              ['tú', 'hiciste', 'quisiste', 'viniste'],
              ['él / ella / usted', 'hizo', 'quiso', 'vino'],
              ['nosotros', 'hicimos', 'quisimos', 'vinimos'],
              ['vosotros', 'hicisteis', 'quisisteis', 'vinisteis'],
              ['ellos / ellas / ustedes', 'hicieron', 'quisieron', 'vinieron'],
            ],
          },
        ],
        examples: [
          {
            it: '¿Qué hiciste el fin de semana? — Estuve en casa de mis padres.',
            ru: 'Что ты делал на выходных? — Был у родителей.',
            az: 'Həftəsonu nə etdin? — Valideynlərimin evində idim.',
          },
          {
            it: 'Ayer no pude ir a clase porque tuve fiebre.',
            ru: 'Вчера я не смог пойти на занятия, потому что у меня была температура.',
            az: 'Dünən dərsə gedə bilmədim, çünki qızdırmam var idi.',
          },
          {
            it: 'Mis primos vinieron a Bakú en mayo.',
            ru: 'Мои двоюродные братья приехали в Баку в мае.',
            az: 'Əmim oğlanları may ayında Bakıya gəldilər.',
          },
        ],
      },
      {
        title: 'Основа на -j: dije, traje — и ellos на -eron',
        text: `**decir → dij-**, **traer → traj-**. Окончания те же (-e, -iste, -o…), но в **ellos** после **j** пропадает **i**:
**dijeron**, **trajeron** (не «dijieron» ✗).

Мнемоника: **j «съедает» i**.`,
        tables: [
          {
            title: 'decir · traer',
            head: ['', 'decir', 'traer'],
            rows: [
              ['yo', 'dije', 'traje'],
              ['tú', 'dijiste', 'trajiste'],
              ['él / ella / usted', 'dijo', 'trajo'],
              ['nosotros', 'dijimos', 'trajimos'],
              ['vosotros', 'dijisteis', 'trajisteis'],
              ['ellos / ellas / ustedes', 'dijeron', 'trajeron'],
            ],
          },
        ],
        examples: [
          {
            it: 'Me dijeron que la tienda estaba cerrada.',
            ru: 'Мне сказали, что магазин закрыт.',
            az: 'Mənə dedilər ki, mağaza bağlı idi.',
          },
          {
            it: 'Mi madre trajo un pastel para todos.',
            ru: 'Мама принесла торт для всех.',
            az: 'Anam hamı üçün tort gətirdi.',
          },
        ],
      },
      {
        title: 'Глаголы на -ir: pidió, durmió',
        text: `Глаголы на **-ir** с изменением основы меняются в indefinido **только в 3-м лице** (él и ellos):
**e → i**: pedir → p**i**dió, p**i**dieron; также sentir (sintió), servir (sirvió), repetir (repitió), preferir (prefirió), seguir (siguió).
**o → u**: dormir → d**u**rmió, d**u**rmieron; morir → m**u**rió, m**u**rieron.

Остальные лица — правильные: pedí, pediste, pedimos; dormí, dormiste, dormimos.
Мнемоника: **меняются «они» — él и ellos** (третьи лица — «чужие», им можно быть странными).`,
        tables: [
          {
            title: 'pedir · dormir',
            head: ['', 'pedir', 'dormir'],
            rows: [
              ['yo', 'pedí', 'dormí'],
              ['tú', 'pediste', 'dormiste'],
              ['él / ella / usted', 'pidió', 'durmió'],
              ['nosotros', 'pedimos', 'dormimos'],
              ['vosotros', 'pedisteis', 'dormisteis'],
              ['ellos / ellas / ustedes', 'pidieron', 'durmieron'],
            ],
          },
        ],
        examples: [
          {
            it: 'En el restaurante ella pidió una paella.',
            ru: 'В ресторане она заказала паэлью.',
            az: 'Restoranda o, paelya sifariş etdi.',
          },
          {
            it: 'Los niños durmieron diez horas.',
            ru: 'Дети проспали десять часов.',
            az: 'Uşaqlar on saat yatdılar.',
          },
        ],
      },
    ],
    drills: [
      { prompt: '(indefinido) ir · yo', answer: 'fui', hint: 'ser / ir → fui.' },
      { prompt: '(indefinido) ser · él', answer: 'fue', hint: 'fue — без знака ударения.' },
      { prompt: '(indefinido) estar · nosotros', answer: 'estuvimos', hint: 'Основа estuv- + -imos.' },
      { prompt: '(indefinido) tener · tú', answer: 'tuviste', hint: 'Основа tuv- + -iste.' },
      { prompt: '(indefinido) hacer · yo', answer: 'hice', hint: 'Основа hic- + -e.' },
      { prompt: '(indefinido) hacer · él', answer: 'hizo', hint: 'c → z перед o: hizo.' },
      { prompt: '(indefinido) poder · ellos', answer: 'pudieron', hint: 'Основа pud- + -ieron.' },
      { prompt: '(indefinido) poner · yo', answer: 'puse', hint: 'Основа pus- + -e.' },
      { prompt: '(indefinido) querer · ella', answer: 'quiso', hint: 'Основа quis- + -o.' },
      { prompt: '(indefinido) venir · vosotros', answer: 'vinisteis', hint: 'Основа vin- + -isteis.' },
      { prompt: '(indefinido) decir · ellos', answer: 'dijeron', hint: 'После j — -eron, без i.' },
      { prompt: '(indefinido) traer · yo', answer: 'traje', hint: 'Основа traj- + -e.' },
      { prompt: '(indefinido) dar · él', answer: 'dio', hint: 'dar → dio, без ударения.' },
      { prompt: '(indefinido) ver · yo', answer: 'vi', hint: 'ver → vi.' },
      { prompt: '(indefinido) pedir · ella', answer: 'pidió', hint: '3-е лицо: e → i.' },
      { prompt: '(indefinido) dormir · ellos', answer: 'durmieron', hint: '3-е лицо: o → u.' },
      { prompt: 'Ayer yo ___ (ir) al cine.', answer: 'fui', hint: 'ir · yo → fui.' },
      { prompt: 'El sábado ___ (nosotros, tener) una fiesta.', answer: 'tuvimos', hint: 'tuv- + -imos.' },
      { prompt: '¿Qué ___ (tú, hacer) el fin de semana?', answer: 'hiciste', hint: 'hic- + -iste.' },
      { prompt: 'Mis amigos no ___ (venir) a la cena.', answer: 'vinieron', hint: 'vin- + -ieron.' },
    ],
  },
  {
    id: 'es-u11-imperfecto',
    unit: 11,
    title: 'Imperfecto — hablaba, comía',
    goal: 'Описывать прошлое и привычки: «Cuando era niño, vivía en Bakú y jugaba en la calle».',
    sections: [
      {
        title: 'Формы: самое лёгкое время',
        text: `**Imperfecto** — почти без исключений!

- **-ar → -aba**: hablaba, hablabas, hablaba, habl**á**bamos, hablabais, hablaban
- **-er / -ir → -ía**: comía, comías, comía, comíamos, comíais, comían

Ударение: у -ar знак только в **nosotros** (habl**á**bamos), у -er/-ir — **во всех формах** на **í**.

**Нет изменения основы**: quería, podía, tenía, dormía, pedía, hacía. Даже estar → estaba, tener → tenía.

Внимание: формы **yo и él совпадают** (hablaba, comía). Если неясно, добавьте местоимение: **yo** comía / **él** comía.`,
        tables: [
          {
            title: 'hablar · comer · vivir',
            head: ['', 'hablar', 'comer', 'vivir'],
            rows: [
              ['yo', 'hablaba', 'comía', 'vivía'],
              ['tú', 'hablabas', 'comías', 'vivías'],
              ['él / ella / usted', 'hablaba', 'comía', 'vivía'],
              ['nosotros', 'hablábamos', 'comíamos', 'vivíamos'],
              ['vosotros', 'hablabais', 'comíais', 'vivíais'],
              ['ellos / ellas / ustedes', 'hablaban', 'comían', 'vivían'],
            ],
          },
        ],
        examples: [
          {
            it: 'Antes trabajaba en un banco.',
            ru: 'Раньше я работал в банке.',
            az: 'Əvvəllər bankda işləyirdim.',
          },
          {
            it: 'Mi abuela siempre nos hacía dolma los domingos.',
            ru: 'Бабушка всегда готовила нам долму по воскресеньям.',
            az: 'Nənəm bazar günləri bizə həmişə dolma bişirirdi.',
          },
        ],
      },
      {
        title: 'Только три неправильных: ser, ir, ver',
        text: `Во всём испанском языке в imperfecto неправильных глаголов **всего три**:
**ser → era**, **ir → iba**, **ver → veía**.

Мнемоника: **«Era — iba — veía»** — «Была (одна история), шла я и видела…». Произнесите это как начало сказки.

**Ser в imperfecto** — для описаний и времени: **Era** un chico alto. **Eran** las tres. — Было три часа.`,
        tables: [
          {
            title: 'ser · ir · ver',
            head: ['', 'ser', 'ir', 'ver'],
            rows: [
              ['yo', 'era', 'iba', 'veía'],
              ['tú', 'eras', 'ibas', 'veías'],
              ['él / ella / usted', 'era', 'iba', 'veía'],
              ['nosotros', 'éramos', 'íbamos', 'veíamos'],
              ['vosotros', 'erais', 'ibais', 'veíais'],
              ['ellos / ellas / ustedes', 'eran', 'iban', 'veían'],
            ],
          },
        ],
        examples: [
          {
            it: 'Cuando era niño, iba al colegio a pie.',
            ru: 'Когда я был ребёнком, я ходил в школу пешком.',
            az: 'Uşaq olanda məktəbə piyada gedirdim.',
          },
          {
            it: 'Veíamos dibujos animados todas las mañanas.',
            ru: 'Мы смотрели мультфильмы каждое утро.',
            az: 'Hər səhər cizgi filmlərinə baxırdıq.',
          },
        ],
      },
      {
        title: 'Когда использовать',
        text: `Imperfecto ≈ русский **несовершенный вид в прошлом**: «делал, бывало, раньше».

1. **Привычки в прошлом**: **siempre**, **todos los días**, **a menudo**, **antes**, **de niño / de pequeño**, **cuando era joven**.
2. **Описание**: люди, места, погода, чувства — **Hacía** sol. La casa **era** grande. **Estaba** cansado.
3. **Время и возраст**: **Eran** las diez. **Tenía** veinte años.
4. **Фон, процесс**: Llovía y la gente **esperaba** el autobús.

Совет: если по-русски можно сказать «бывало» или «обычно» — почти наверняка imperfecto.`,
        examples: [
          {
            it: 'Hacía frío y todos llevaban abrigo.',
            ru: 'Было холодно, и все были в пальто.',
            az: 'Hava soyuq idi və hamı palto geyinmişdi.',
          },
          {
            it: 'Cuando tenía diez años, quería ser piloto.',
            ru: 'Когда мне было десять лет, я хотел быть пилотом.',
            az: 'On yaşım olanda pilot olmaq istəyirdim.',
          },
        ],
      },
    ],
    drills: [
      { prompt: '(imperfecto) hablar · yo', answer: 'hablaba', hint: '-ar → -aba.' },
      { prompt: '(imperfecto) trabajar · nosotros', answer: 'trabajábamos', hint: '-ábamos — с ударением.' },
      { prompt: '(imperfecto) jugar · tú', answer: 'jugabas', hint: 'Без изменения основы: jugabas.' },
      { prompt: '(imperfecto) comer · ellos', answer: 'comían', hint: '-er → -ían.' },
      { prompt: '(imperfecto) vivir · vosotros', answer: 'vivíais', hint: '-ir → -íais.' },
      { prompt: '(imperfecto) tener · él', answer: 'tenía', hint: 'Правильный: ten- + -ía.' },
      { prompt: '(imperfecto) querer · yo', answer: 'quería', hint: 'Без ie: quería.' },
      { prompt: '(imperfecto) hacer · ella', answer: 'hacía', hint: 'hac- + -ía.' },
      { prompt: '(imperfecto) estar · vosotros', answer: 'estabais', hint: 'estar — на -ar: -abais.' },
      { prompt: '(imperfecto) ser · yo', answer: 'era', hint: 'ser → era.' },
      { prompt: '(imperfecto) ser · nosotros', answer: 'éramos', hint: 'éramos — с ударением на é.' },
      { prompt: '(imperfecto) ir · tú', answer: 'ibas', hint: 'ir → iba.' },
      { prompt: '(imperfecto) ir · nosotros', answer: 'íbamos', hint: 'íbamos — с ударением на í.' },
      { prompt: '(imperfecto) ver · ellos', answer: 'veían', hint: 've- + -ían.' },
      { prompt: 'Cuando ___ (yo, ser) niño, vivía en Bakú.', answer: 'era', hint: 'Описание прошлого: era.' },
      { prompt: 'Antes mi abuela ___ (cocinar) todos los domingos.', answer: 'cocinaba', hint: 'Привычка → imperfecto.' },
      { prompt: 'De pequeños, ___ (nosotros, ir) a la playa cada verano.', answer: 'íbamos', hint: 'ir · nosotros → íbamos.' },
      { prompt: '___ (hacer) mucho frío y llovía.', answer: 'hacía', hint: 'Погода → hacía.' },
      { prompt: 'Mi casa ___ (tener) un jardín grande.', answer: 'tenía', hint: 'Описание → tenía.' },
      { prompt: 'Eran las diez y los niños ___ (dormir).', answer: 'dormían', hint: 'Фон, процесс → dormían.' },
    ],
  },
  {
    id: 'es-u11-indefinido-imperfecto',
    unit: 11,
    title: 'Indefinido или imperfecto?',
    goal: 'Рассказывать историю, правильно выбирая время: «Llovía cuando salí de casa».',
    sections: [
      {
        title: 'Сюжет и декорации',
        text: `Представьте фильм:
- **imperfecto — декорации**: погода, время, как выглядели люди, что обычно происходило, что было в процессе. «Как было?»
- **indefinido — сюжет**: события, которые произошли и закончились. «Что случилось?»

**Era** de noche, **llovía** y no **había** nadie en la calle. De repente **sonó** el teléfono.
(декорации — imperfecto) (событие — indefinido)

Мнемоника: **imperfecto — фон, indefinido — факт**.`,
        tables: [
          {
            title: 'Слова-подсказки',
            head: ['indefinido', 'imperfecto'],
            rows: [
              ['ayer, anoche', 'siempre, normalmente'],
              ['el lunes pasado, el año pasado', 'todos los días, cada verano'],
              ['en 2015, hace tres años', 'antes, de niño, cuando era joven'],
              ['de repente, una vez', 'a menudo, a veces'],
              ['durante dos horas, tres años', 'mientras'],
            ],
          },
        ],
        examples: [
          {
            it: 'Hacía sol, así que fuimos a la playa.',
            ru: 'Было солнечно, поэтому мы поехали на пляж.',
            az: 'Hava günəşli idi, buna görə çimərliyə getdik.',
          },
          {
            it: 'De niño iba al parque todos los días, pero ayer fui al museo.',
            ru: 'В детстве я каждый день ходил в парк, а вчера пошёл в музей.',
            az: 'Uşaqlıqda hər gün parka gedirdim, amma dünən muzeyə getdim.',
          },
        ],
      },
      {
        title: 'Прерванное действие: estaba … cuando …',
        text: `Длинное действие в процессе — **imperfecto**, короткое, которое его прервало — **indefinido**:
**Leía** un libro **cuando llegó** mi hermano. — Я читал книгу, когда пришёл брат.
**Mientras** yo **cocinaba**, **sonó** el timbre.

Процесс можно подчеркнуть через **estaba + gerundio**: **Estaba durmiendo cuando** me **llamaste**.

**mientras** («пока, в то время как») почти всегда с imperfecto: Mientras ellos **hablaban**, yo **escuchaba**.`,
        examples: [
          {
            it: 'Estaba en la ducha cuando sonó el teléfono.',
            ru: 'Я был в душе, когда зазвонил телефон.',
            az: 'Telefon zəng çalanda duşda idim.',
          },
          {
            it: 'Mientras paseábamos, empezó a llover.',
            ru: 'Пока мы гуляли, пошёл дождь.',
            az: 'Biz gəzərkən yağış yağmağa başladı.',
          },
        ],
      },
      {
        title: 'Ловушки для русскоговорящих',
        text: `**1. Ограниченный срок → indefinido**, даже если по-русски несовершенный вид:
«Вчера я **два часа читал**» → Ayer **leí** dos horas. «Я **жил** в Москве пять лет» → **Viví** cinco años en Moscú.
Если указано, **сколько** длилось и это закончилось — indefinido.

**2. Оценка целиком → indefinido**: El viaje **fue** fantástico. (вся поездка, итог)
**Описание в процессе → imperfecto**: El hotel **era** bonito. (как он выглядел)

**3. Время по часам — всегда imperfecto**: **Eran** las once cuando volvimos (не «fueron las once» ✗).`,
        examples: [
          {
            it: 'Ayer estudié tres horas.',
            ru: 'Вчера я занимался три часа.',
            az: 'Dünən üç saat dərs oxudum.',
          },
          {
            it: 'La película fue muy buena, pero el cine era muy pequeño.',
            ru: 'Фильм был очень хороший, но кинотеатр был совсем маленький.',
            az: 'Film çox yaxşı idi, amma kinoteatr çox kiçik idi.',
          },
        ],
      },
    ],
    drills: [
      { prompt: 'Ayer ___ (yo, ir) al médico.', answer: 'fui', hint: 'ayer, одно событие → indefinido.' },
      { prompt: 'Cuando era pequeño, ___ (yo, ir) al parque todos los días.', answer: 'iba', hint: 'Привычка → imperfecto.' },
      { prompt: 'Mientras yo ___ (ducharse), sonó el teléfono.', answer: 'me duchaba', hint: 'Процесс, который прервали → imperfecto.' },
      { prompt: 'Yo leía cuando ___ (llegar) mi hermano.', answer: 'llegó', hint: 'Прерывающее событие → indefinido.' },
      { prompt: '___ (hacer) sol y la gente paseaba por la playa.', answer: 'hacía', hint: 'Погода, фон → imperfecto.' },
      { prompt: 'De repente ___ (empezar) a llover.', answer: 'empezó', hint: 'de repente → indefinido.' },
      { prompt: 'Antes ___ (nosotros, vivir) en un piso pequeño.', answer: 'vivíamos', hint: 'antes → imperfecto.' },
      { prompt: 'En 2015 ___ (nosotros, vivir) un año en Madrid.', answer: 'vivimos', hint: 'Ограниченный срок (un año) → indefinido.' },
      { prompt: 'Anoche ___ (yo, dormir) mal.', answer: 'dormí', hint: 'anoche → indefinido.' },
      { prompt: 'La casa de mis abuelos ___ (ser) grande y antigua.', answer: 'era', hint: 'Описание → imperfecto.' },
      { prompt: 'El viaje ___ (ser) fantástico. (оценка целиком)', answer: 'fue', hint: 'Итог, оценка → indefinido.' },
      { prompt: '___ (ser) las once cuando volvimos a casa.', answer: 'eran', hint: 'Время по часам → imperfecto.' },
      { prompt: 'Ayer ___ (yo, estudiar) tres horas.', answer: 'estudié', hint: 'Ограниченный срок → indefinido.' },
      { prompt: 'Mi padre siempre ___ (decir) que el trabajo es lo primero.', answer: 'decía', hint: 'siempre → imperfecto.' },
      { prompt: 'Cuando ___ (yo, tener) diez años, aprendí a nadar.', answer: 'tenía', hint: 'Возраст → imperfecto.' },
      { prompt: 'El sábado pasado ___ (nosotros, ver) una película muy buena.', answer: 'vimos', hint: 'Законченное событие → indefinido.' },
      { prompt: 'Los niños jugaban mientras sus padres ___ (hablar).', answer: 'hablaban', hint: 'mientras → imperfecto.' },
      { prompt: '¿Qué ___ (tú, hacer) ayer por la tarde?', answer: 'hiciste', hint: 'ayer → indefinido: hiciste.' },
    ],
  },
];
