import type { Lesson } from '../types';

// Unit 10 "El pasado (1)": pretérito perfecto, participios irregulares, pretérito indefinido regular.
export const lessons: Lesson[] = [
  {
    id: 'es-u10-perfecto',
    unit: 10,
    title: 'Pretérito perfecto — he hablado',
    goal: 'Рассказывать, что вы сделали сегодня и вообще в жизни: «Hoy he trabajado mucho», «¿Has estado en México?».',
    sections: [
      {
        title: 'haber + причастие',
        text: `**Pretérito perfecto** = **haber (в presente) + participio**.

Причастие правильных глаголов:
- **-ar → -ado**: habl**ar** → habl**ado**
- **-er / -ir → -ido**: com**er** → com**ido**, viv**ir** → viv**ido**

Причастие **никогда не меняется** (ни по роду, ни по числу): ella ha hablad**o**, ellos han comid**o**.

**haber и причастие — неразлучная пара**: между ними ничего не ставим. Отрицание и местоимения — **перед haber**:
**No lo he visto.** (не «He no visto» ✗, не «He lo visto» ✗). **Me he levantado** a las siete.

Не путайте **haber** («вспомогательный») с **tener** («иметь»): «Tengo comido» ✗ → **He comido**.
Причастия на -ído с ударением: le**ído**, o**ído**, tra**ído**, cre**ído**.`,
        tables: [
          {
            title: 'haber + hablado / comido / vivido',
            head: ['', 'haber', 'hablar', 'comer', 'vivir'],
            rows: [
              ['yo', 'he', 'he hablado', 'he comido', 'he vivido'],
              ['tú', 'has', 'has hablado', 'has comido', 'has vivido'],
              ['él / ella / usted', 'ha', 'ha hablado', 'ha comido', 'ha vivido'],
              ['nosotros', 'hemos', 'hemos hablado', 'hemos comido', 'hemos vivido'],
              ['vosotros', 'habéis', 'habéis hablado', 'habéis comido', 'habéis vivido'],
              ['ellos / ellas / ustedes', 'han', 'han hablado', 'han comido', 'han vivido'],
            ],
          },
        ],
        examples: [
          {
            it: 'Hoy he trabajado mucho y estoy cansado.',
            ru: 'Сегодня я много работал и устал.',
            az: 'Bu gün çox işləmişəm və yorğunam.',
          },
          {
            it: '¿Has comido ya? — No, todavía no he comido.',
            ru: 'Ты уже поел? — Нет, ещё не ел.',
            az: 'Artıq yemək yemisən? — Xeyr, hələ yeməmişəm.',
          },
          {
            it: 'Nunca he estado en Argentina.',
            ru: 'Я никогда не был в Аргентине.',
            az: 'Heç vaxt Argentinada olmamışam.',
          },
        ],
      },
      {
        title: 'Неправильные причастия',
        text: `Их немного — выучите как стихотворение:
**hacer → hecho**, **decir → dicho**, **ver → visto**, **escribir → escrito**, **poner → puesto**, **volver → vuelto**, **abrir → abierto**, **romper → roto**, **morir → muerto**.
Также: descubrir → descubierto, resolver → resuelto, devolver → devuelto.

Мнемоника по окончаниям:
- **-cho**: he**cho**, di**cho** (сделал, сказал — «чо сделал, чо сказал»)
- **-to**: vis**to**, escri**to**, pues**to**, vuel**to**, abier**to**, ro**to**, muer**to**

**ser → sido**, **ir → ido**, **estar → estado** — правильные!`,
        tables: [
          {
            title: 'hacer · decir · ver',
            head: ['', 'hacer', 'decir', 'ver'],
            rows: [
              ['yo', 'he hecho', 'he dicho', 'he visto'],
              ['tú', 'has hecho', 'has dicho', 'has visto'],
              ['él / ella / usted', 'ha hecho', 'ha dicho', 'ha visto'],
              ['nosotros', 'hemos hecho', 'hemos dicho', 'hemos visto'],
              ['vosotros', 'habéis hecho', 'habéis dicho', 'habéis visto'],
              ['ellos / ellas / ustedes', 'han hecho', 'han dicho', 'han visto'],
            ],
          },
          {
            title: 'escribir · poner · volver',
            head: ['', 'escribir', 'poner', 'volver'],
            rows: [
              ['yo', 'he escrito', 'he puesto', 'he vuelto'],
              ['tú', 'has escrito', 'has puesto', 'has vuelto'],
              ['él / ella / usted', 'ha escrito', 'ha puesto', 'ha vuelto'],
              ['nosotros', 'hemos escrito', 'hemos puesto', 'hemos vuelto'],
              ['vosotros', 'habéis escrito', 'habéis puesto', 'habéis vuelto'],
              ['ellos / ellas / ustedes', 'han escrito', 'han puesto', 'han vuelto'],
            ],
          },
          {
            title: 'abrir · romper · morir',
            head: ['', 'abrir', 'romper', 'morir'],
            rows: [
              ['yo', 'he abierto', 'he roto', 'he muerto'],
              ['tú', 'has abierto', 'has roto', 'has muerto'],
              ['él / ella / usted', 'ha abierto', 'ha roto', 'ha muerto'],
              ['nosotros', 'hemos abierto', 'hemos roto', 'hemos muerto'],
              ['vosotros', 'habéis abierto', 'habéis roto', 'habéis muerto'],
              ['ellos / ellas / ustedes', 'han abierto', 'han roto', 'han muerto'],
            ],
          },
        ],
        examples: [
          {
            it: '¿Qué has hecho este fin de semana?',
            ru: 'Что ты делал в эти выходные?',
            az: 'Bu həftəsonu nə etmisən?',
          },
          {
            it: 'Los niños han roto la ventana.',
            ru: 'Дети разбили окно.',
            az: 'Uşaqlar pəncərəni sındırıblar.',
          },
          {
            it: '¿Dónde has puesto mis gafas?',
            ru: 'Куда ты положил мои очки?',
            az: 'Eynəyimi hara qoymusan?',
          },
        ],
      },
      {
        title: 'Когда использовать',
        text: `Perfecto — прошлое, **связанное с настоящим**:
- период **ещё не закончился**: **hoy** (сегодня), **esta mañana**, **esta semana**, **este mes**, **este año**;
- **опыт в жизни**: **alguna vez** (когда-нибудь), **nunca** (никогда), **ya** (уже), **todavía no** (ещё не);
- только что: **Acabo de** llegar = **He llegado** ahora mismo.

Внимание: так говорят **в Испании**. В Латинской Америке в этих случаях чаще используют indefinido (следующий урок): «¿Ya comiste?» вместо «¿Ya has comido?». Оба поймут!`,
        examples: [
          {
            it: 'Esta semana hemos visto tres películas.',
            ru: 'На этой неделе мы посмотрели три фильма.',
            az: 'Bu həftə üç film izləmişik.',
          },
          {
            it: '¿Alguna vez has probado el gazpacho?',
            ru: 'Ты когда-нибудь пробовал гаспачо?',
            az: 'Heç qaspaço dadmısan?',
          },
        ],
      },
    ],
    drills: [
      { prompt: '(perfecto) hablar · yo', answer: 'he hablado', hint: 'he + -ado.' },
      { prompt: '(perfecto) comer · tú', answer: 'has comido', hint: 'has + -ido.' },
      { prompt: '(perfecto) vivir · nosotros', answer: 'hemos vivido', hint: 'hemos + -ido.' },
      { prompt: '(perfecto) trabajar · ellos', answer: 'han trabajado', hint: 'han + -ado.' },
      { prompt: '(perfecto) estar · vosotros', answer: 'habéis estado', hint: 'habéis + estado.' },
      { prompt: '(perfecto) ir · ella', answer: 'ha ido', hint: 'ir → ido (правильное).' },
      { prompt: '(perfecto) hacer · yo', answer: 'he hecho', hint: 'hacer → hecho.' },
      { prompt: '(perfecto) decir · tú', answer: 'has dicho', hint: 'decir → dicho.' },
      { prompt: '(perfecto) ver · nosotros', answer: 'hemos visto', hint: 'ver → visto.' },
      { prompt: '(perfecto) escribir · usted', answer: 'ha escrito', hint: 'escribir → escrito.' },
      { prompt: '(perfecto) poner · ellos', answer: 'han puesto', hint: 'poner → puesto.' },
      { prompt: '(perfecto) volver · vosotros', answer: 'habéis vuelto', hint: 'volver → vuelto.' },
      { prompt: '(perfecto) abrir · él', answer: 'ha abierto', hint: 'abrir → abierto.' },
      { prompt: '(perfecto) romper · yo', answer: 'he roto', hint: 'romper → roto.' },
      { prompt: '(perfecto) leer · tú', answer: 'has leído', hint: 'leer → leído (с ударением).' },
      { prompt: 'participio: morir', answer: 'muerto', hint: 'morir → muerto.' },
      { prompt: 'Hoy ___ (yo, levantarse) a las siete.', answer: 'me he levantado', hint: 'Местоимение перед haber: me he…' },
      { prompt: '¿___ (tú, estar) alguna vez en México?', answer: 'has estado', hint: 'Опыт: has + estado.' },
      { prompt: 'Todavía no ___ (nosotros, terminar).', answer: 'hemos terminado', hint: 'hemos + -ado.' },
      { prompt: 'Este año mis padres ___ (viajar) mucho.', answer: 'han viajado', hint: 'Период не закончился → perfecto.' },
    ],
  },
  {
    id: 'es-u10-indefinido',
    unit: 10,
    title: 'Pretérito indefinido правильных глаголов — hablé, comí, viví',
    goal: 'Рассказывать о законченных событиях: «Ayer cené con amigos», «En 2020 viví en Madrid».',
    sections: [
      {
        title: 'Окончания',
        text: `**Indefinido** (pretérito perfecto simple) — простое прошедшее: одно слово без haber.

- **-ar**: -é, -aste, -ó, -amos, -asteis, -aron
- **-er и -ir** (одинаковые!): -í, -iste, -ió, -imos, -isteis, -ieron

**Ударение решает всё!** habl**o** — «я говорю», habl**ó** — «он сказал». Знак на **-é / -í / -ó / -ió** обязателен.

Формы **nosotros** у -ar и -ir совпадают с presente: hablamos, vivimos. Смысл подскажет контекст: **Ayer** hablamos.

Мнемоника: у ellos всегда **-ron** («рон» — как стук закрытой двери: дело сделано).`,
        tables: [
          {
            title: 'hablar · comer · vivir',
            head: ['', 'hablar', 'comer', 'vivir'],
            rows: [
              ['yo', 'hablé', 'comí', 'viví'],
              ['tú', 'hablaste', 'comiste', 'viviste'],
              ['él / ella / usted', 'habló', 'comió', 'vivió'],
              ['nosotros', 'hablamos', 'comimos', 'vivimos'],
              ['vosotros', 'hablasteis', 'comisteis', 'vivisteis'],
              ['ellos / ellas / ustedes', 'hablaron', 'comieron', 'vivieron'],
            ],
          },
        ],
        examples: [
          {
            it: 'Ayer cené con mis amigos en un restaurante.',
            ru: 'Вчера я ужинал с друзьями в ресторане.',
            az: 'Dünən dostlarımla restoranda şam yeməyi yedim.',
          },
          {
            it: 'Mis abuelos vivieron muchos años en Ganja.',
            ru: 'Мои бабушка и дедушка много лет жили в Гяндже.',
            az: 'Nənəmlə babam uzun illər Gəncədə yaşadılar.',
          },
          {
            it: '¿Escribiste a tu profesor?',
            ru: 'Ты написал своему преподавателю?',
            az: 'Müəlliminə yazdın?',
          },
        ],
      },
      {
        title: 'Орфография: busqué, llegué, empecé, leyó',
        text: `Только в форме **yo** некоторые глаголы меняют букву, чтобы сохранить звук:
- **-car → -qué**: buscar → **busqué**, tocar → **toqué**, sacar → **saqué**
- **-gar → -gué**: llegar → **llegué**, pagar → **pagué**, jugar → **jugué**
- **-zar → -cé**: empezar → **empecé**, almorzar → **almorcé**, cruzar → **crucé**
Остальные лица обычные: buscaste, llegó, empezamos.

**leer, creer, oír**: в 3-м лице **i → y**: leyó, leyeron; creyó, creyeron; oyó, oyeron.

Хорошая новость: глаголы на **-ar и -er** с изменением основы в indefinido **не меняются**: pensé, volví, empezó, entendieron. (Глаголы на -ir — в следующем уроке.)`,
        tables: [
          {
            title: 'llegar · buscar · empezar · leer',
            head: ['', 'llegar', 'buscar', 'empezar', 'leer'],
            rows: [
              ['yo', 'llegué', 'busqué', 'empecé', 'leí'],
              ['tú', 'llegaste', 'buscaste', 'empezaste', 'leíste'],
              ['él / ella / usted', 'llegó', 'buscó', 'empezó', 'leyó'],
              ['nosotros', 'llegamos', 'buscamos', 'empezamos', 'leímos'],
              ['vosotros', 'llegasteis', 'buscasteis', 'empezasteis', 'leísteis'],
              ['ellos / ellas / ustedes', 'llegaron', 'buscaron', 'empezaron', 'leyeron'],
            ],
          },
        ],
        examples: [
          {
            it: 'Llegué a Madrid el lunes pasado.',
            ru: 'Я приехал в Мадрид в прошлый понедельник.',
            az: 'Keçən bazar ertəsi Madridə gəldim.',
          },
          {
            it: 'Empecé a estudiar español hace un año.',
            ru: 'Я начал учить испанский год назад.',
            az: 'Bir il əvvəl ispan dilini öyrənməyə başladım.',
          },
        ],
      },
      {
        title: 'Indefinido или perfecto?',
        text: `**Период закрыт → indefinido. Период ещё открыт → perfecto.**

Слова для indefinido: **ayer** (вчера), **anoche** (вчера вечером), **anteayer** (позавчера), **el lunes pasado**, **la semana pasada**, **el año pasado**, **en 2015**, **hace dos años** (два года назад).
Слова для perfecto: **hoy**, **esta mañana**, **esta semana**, **este año**, **ya**, **nunca**.

**Ayer comí** paella, pero **hoy he comido** pescado.

**hace** + срок = «назад»: hace tres días — три дня назад. Ошибка: «tres días atrás» понятно, но **hace tres días** — естественнее.`,
        examples: [
          {
            it: 'El año pasado viajamos a Italia; este año hemos viajado a Grecia.',
            ru: 'В прошлом году мы ездили в Италию, а в этом — в Грецию.',
            az: 'Keçən il İtaliyaya səyahət etdik, bu il isə Yunanıstana səyahət etmişik.',
          },
          {
            it: 'Anoche no dormí bien.',
            ru: 'Прошлой ночью я плохо спал.',
            az: 'Dünən gecə yaxşı yatmadım.',
          },
        ],
      },
    ],
    drills: [
      { prompt: '(indefinido) hablar · yo', answer: 'hablé', hint: '-ar · yo → -é.' },
      { prompt: '(indefinido) trabajar · él', answer: 'trabajó', hint: '-ar · él → -ó (с ударением!).' },
      { prompt: '(indefinido) comer · tú', answer: 'comiste', hint: '-er · tú → -iste.' },
      { prompt: '(indefinido) vivir · ellos', answer: 'vivieron', hint: '-ir · ellos → -ieron.' },
      { prompt: '(indefinido) escribir · nosotros', answer: 'escribimos', hint: '-ir · nosotros → -imos.' },
      { prompt: '(indefinido) beber · vosotros', answer: 'bebisteis', hint: '-er · vosotros → -isteis.' },
      { prompt: '(indefinido) estudiar · ustedes', answer: 'estudiaron', hint: '-ar · ellos/ustedes → -aron.' },
      { prompt: '(indefinido) volver · ella', answer: 'volvió', hint: 'В indefinido основа -er не меняется: volvió.' },
      { prompt: '(indefinido) abrir · yo', answer: 'abrí', hint: '-ir · yo → -í.' },
      { prompt: '(indefinido) llegar · yo', answer: 'llegué', hint: '-gar → -gué.' },
      { prompt: '(indefinido) buscar · yo', answer: 'busqué', hint: '-car → -qué.' },
      { prompt: '(indefinido) empezar · yo', answer: 'empecé', hint: '-zar → -cé.' },
      { prompt: '(indefinido) pagar · tú', answer: 'pagaste', hint: 'Только yo меняется (pagué); tú — pagaste.' },
      { prompt: '(indefinido) leer · él', answer: 'leyó', hint: 'i → y: leyó.' },
      { prompt: 'Ayer ___ (yo, cenar) con mis amigos.', answer: 'cené', hint: 'ayer → indefinido: -é.' },
      { prompt: 'El año pasado ___ (nosotros, viajar) a Italia.', answer: 'viajamos', hint: 'nosotros -ar → -amos.' },
      { prompt: 'Anoche ellos ___ (salir) muy tarde.', answer: 'salieron', hint: '-ir · ellos → -ieron.' },
      { prompt: 'Hace dos años ella ___ (aprender) a nadar.', answer: 'aprendió', hint: '-er · ella → -ió.' },
      { prompt: 'Esta mañana ___ (yo, desayunar) poco.', answer: 'he desayunado', hint: '«Сегодня утром» — период открыт → perfecto.' },
    ],
  },
];
