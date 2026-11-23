import type { Lesson } from '../types';

// Unit 6 "Gustos": gustar y verbos similares, posesivos, muy / mucho.
export const lessons: Lesson[] = [
  {
    id: 'es-u06-gustar',
    unit: 6,
    title: 'Me gusta — gustar, encantar, interesar, doler',
    goal: 'Говорить, что тебе нравится, что интересно и что болит, соглашаться и не соглашаться.',
    sections: [
      {
        title: 'Gustar работает «наоборот»',
        text: `Испанское **gustar** устроено **точно как русское «нравиться»**: **Мне нравится** музыка = **Me gusta** la música. Подлежащее — то, что нравится, а человек стоит в «дательном падеже» (мне, тебе, ему).

Поэтому глагол согласуется **с вещью**, а не с человеком:
- одна вещь или глагол → **gusta**: Me gust**a** el café. Me gust**a** bailar.
- несколько вещей → **gustan**: Me gust**an** los gatos.

Мнемоника: **«-n, если вещей много»**. Спросите себя: ЧТО нравится? Одно — gusta, много — gustan.

Частицы (как «мне, тебе, ему»): **me, te, le, nos, os, les**. Для ясности или акцента добавляют **a + местоимение**: **A mí** me gusta, **a ti** te gusta, **a él / a ella / a usted** le gusta. С именем: **A Ana le** gusta el té.

Ошибки русскоговорящих:
- «Yo gusto el café» — значит «я нравлюсь кофе»! Правильно: **Me gusta** el café.
- «A mí gusta» — без me нельзя: **A mí me** gusta.
- С вещами нужен **артикль**: Me gusta **el** chocolate (не «me gusta chocolate»).`,
        tables: [
          {
            title: 'gustar',
            head: ['', 'gustar', 'gustar (+ мн. ч.)'],
            rows: [
              ['yo', '(a mí) me gusta', '(a mí) me gustan'],
              ['tú', '(a ti) te gusta', '(a ti) te gustan'],
              ['él / ella / usted', '(a él) le gusta', '(a él) le gustan'],
              ['nosotros', '(a nosotros) nos gusta', '(a nosotros) nos gustan'],
              ['vosotros', '(a vosotros) os gusta', '(a vosotros) os gustan'],
              ['ellos / ellas / ustedes', '(a ellos) les gusta', '(a ellos) les gustan'],
            ],
          },
        ],
        examples: [
          { it: 'Me gusta mucho la música española.', ru: 'Мне очень нравится испанская музыка.', az: 'İspan musiqisi çox xoşuma gəlir.' },
          { it: '¿Te gustan los perros?', ru: 'Тебе нравятся собаки?', az: 'İtlər xoşuna gəlir?' },
          { it: 'A mi padre le gusta cocinar.', ru: 'Моему отцу нравится готовить.', az: 'Atam yemək bişirməyi sevir.' },
        ],
      },
      {
        title: 'encantar, interesar, doler',
        text: `По той же схеме работают:
- **encantar** — очень нравиться, обожать: Me encant**a** el mar. Me encant**an** las películas. Не говорите «me encanta mucho» — encantar уже само по себе «очень».
- **interesar** — интересовать: Nos interes**a** la historia.
- **doler** (o → ue) — болеть: Me **duele** la cabeza (у меня болит голова), me **duelen** los pies (болят ноги). Части тела — с **артиклем**, не с «mi».

Мнемоника для doler: **«Me duele» = «мне больно»**, а что именно — после глагола с артиклем.`,
        tables: [
          {
            title: 'encantar · interesar · doler (одна вещь / много)',
            head: ['', 'encantar', 'interesar', 'doler'],
            rows: [
              ['yo', 'me encanta / me encantan', 'me interesa / me interesan', 'me duele / me duelen'],
              ['tú', 'te encanta / te encantan', 'te interesa / te interesan', 'te duele / te duelen'],
              ['él / ella / usted', 'le encanta / le encantan', 'le interesa / le interesan', 'le duele / le duelen'],
              ['nosotros', 'nos encanta / nos encantan', 'nos interesa / nos interesan', 'nos duele / nos duelen'],
              ['vosotros', 'os encanta / os encantan', 'os interesa / os interesan', 'os duele / os duelen'],
              ['ellos / ellas / ustedes', 'les encanta / les encantan', 'les interesa / les interesan', 'les duele / les duelen'],
            ],
          },
        ],
        examples: [
          { it: 'Me encanta viajar.', ru: 'Я обожаю путешествовать.', az: 'Səyahət etməyi çox sevirəm.' },
          { it: 'Me duele la cabeza.', ru: 'У меня болит голова.', az: 'Başım ağrıyır.' },
          { it: '¿Os interesan los deportes?', ru: 'Вас интересует спорт?', az: 'İdman sizi maraqlandırır?' },
        ],
      },
      {
        title: 'Согласие и несогласие: también, tampoco',
        text: `Реакция на чужое мнение зависит от того, **утверждение или отрицание** вы услышали:

- Me gusta el fútbol. — **A mí también** (мне тоже). / **A mí no** (а мне нет).
- No me gusta el fútbol. — **A mí tampoco** (мне тоже нет). / **A mí sí** (а мне да).

Мнемоника: **también** — «тоже да», **tampoco** — «тоже нет». После отрицания «también» не используют!

Обратите внимание: отвечаем **«a mí»**, а не «yo», потому что gustar требует «мне». А с обычными глаголами — yo: Hablo inglés. — **Yo también**.`,
        tables: [
          {
            title: 'Реакции',
            head: ['', 'согласие', 'несогласие'],
            rows: [
              ['Me gusta…', 'A mí también.', 'A mí no.'],
              ['No me gusta…', 'A mí tampoco.', 'A mí sí.'],
            ],
          },
        ],
        examples: [
          { it: 'Me encanta el chocolate. — ¡A mí también!', ru: 'Обожаю шоколад. — Я тоже!', az: 'Şokoladı çox sevirəm. — Mən də!' },
          { it: 'No me gustan los lunes. — A mí tampoco.', ru: 'Не люблю понедельники. — Я тоже.', az: 'Bazar ertəsini sevmirəm. — Mən də sevmirəm.' },
        ],
      },
    ],
    drills: [
      { prompt: 'Me ___ (gustar) el café.', answer: 'gusta', hint: 'Одна вещь → gusta.' },
      { prompt: 'Me ___ (gustar) los gatos.', answer: 'gustan', hint: 'Много вещей → gustan.' },
      { prompt: '¿Te ___ (gustar) bailar?', answer: 'gusta', hint: 'Глагол-инфинитив → gusta.' },
      { prompt: 'A él ___ gusta el té. (частица)', answer: 'le', hint: 'a él → le.' },
      { prompt: 'A nosotros ___ gusta viajar. (частица)', answer: 'nos', hint: 'a nosotros → nos.' },
      { prompt: 'A ellos ___ gustan las películas. (частица)', answer: 'les', hint: 'a ellos → les.' },
      { prompt: 'A vosotros ___ gusta el cine. (частица)', answer: 'os', hint: 'a vosotros → os.' },
      { prompt: 'A Ana ___ encanta la música. (частица)', answer: 'le', hint: 'a Ana (она) → le.' },
      { prompt: 'gustar · yo · много вещей (2 слова)', answer: 'me gustan', hint: 'me + gustan.' },
      { prompt: 'encantar · tú · одна вещь (2 слова)', answer: 'te encanta', hint: 'te + encanta.' },
      { prompt: 'Nos ___ (encantar) las playas de España.', answer: 'encantan', hint: 'las playas — много → encantan.' },
      { prompt: 'Me ___ (interesar) la historia.', answer: 'interesa', hint: 'Одна вещь → interesa.' },
      { prompt: 'Me ___ (doler) la cabeza.', answer: 'duele', hint: 'doler: o → ue; одна голова → duele.' },
      { prompt: 'Me ___ (doler) los pies.', answer: 'duelen', hint: 'Много → duelen.' },
      { prompt: 'Me gusta el fútbol. — A mí ___. (тоже)', answer: 'también', hint: 'Согласие с утверждением → también.' },
      { prompt: 'No me gusta el frío. — A mí ___. (тоже нет)', answer: 'tampoco', hint: 'Согласие с отрицанием → tampoco.' },
      { prompt: 'No me gusta el té. — A mí ___. (а мне да)', answer: 'sí', hint: 'Несогласие с отрицанием → a mí sí.' },
      { prompt: 'Переведите: «Мне нравится шоколад» (4 слова)', answer: 'me gusta el chocolate', hint: 'Не забудьте артикль: el chocolate.' },
    ],
  },
  {
    id: 'es-u06-posesivos',
    unit: 6,
    title: 'Притяжательные: mi, tu, su, nuestro… Muy и mucho',
    goal: 'Говорить «мой, твой, его, наш» и правильно выбирать muy или mucho.',
    sections: [
      {
        title: 'Краткие притяжательные: mi, tu, su',
        text: `Стоят **перед** существительным, **без артикля**: **mi** casa (не «la mi casa»).

Согласуются с **предметом**, а не с владельцем! **mis** libros — мои книги (книг много, владелец один).
- **mi / mis** — мой; **tu / tus** — твой (без tilde! tú = «ты»)
- **su / sus** — его, её, Ваш, их, Ваши
- **nuestro / nuestra / nuestros / nuestras** — наш
- **vuestro / vuestra / vuestros / vuestras** — ваш (Испания)

Только nuestro и vuestro меняются **по роду** (по предмету): **nuestra** madre, **nuestro** padre.

**Su** — многозначное: su coche = его / её / Ваша / их машина. Если неясно, говорят **el coche de él / de ella / de usted**.

Русского «свой» в испанском **нет**: «Я люблю свою маму» = Quiero a **mi** madre; «Он любит свою маму» = Quiere a **su** madre.`,
        tables: [
          {
            title: 'Краткие формы',
            head: ['', 'одна вещь', 'много вещей'],
            rows: [
              ['yo', 'mi', 'mis'],
              ['tú', 'tu', 'tus'],
              ['él / ella / usted', 'su', 'sus'],
              ['nosotros', 'nuestro / nuestra', 'nuestros / nuestras'],
              ['vosotros', 'vuestro / vuestra', 'vuestros / vuestras'],
              ['ellos / ellas / ustedes', 'su', 'sus'],
            ],
          },
        ],
        examples: [
          { it: 'Mi hermano vive con sus amigos.', ru: 'Мой брат живёт со своими друзьями.', az: 'Qardaşım dostları ilə yaşayır.' },
          { it: 'Nuestra casa está cerca del centro.', ru: 'Наш дом рядом с центром.', az: 'Evimiz mərkəzə yaxındır.' },
          { it: '¿Dónde están tus llaves?', ru: 'Где твои ключи?', az: 'Açarların haradadır?' },
        ],
      },
      {
        title: 'Полные формы: mío, tuyo, suyo',
        text: `Полные формы стоят **после** существительного или **вместо** него и согласуются в роде и числе:
- Es **mío**. — Это моё. ¿Es **tuya** esta bolsa? — Это твоя сумка?
- un amigo **mío** — один мой друг (из моих друзей).
- Mi coche es rojo, **el suyo** es azul. — Моя машина красная, его — синяя.

После **ser** артикль обычно не нужен: Este libro es **mío**. Для замены существительного — с артиклем: **el mío, la tuya, los nuestros**.`,
        tables: [
          {
            title: 'Полные формы (м. р. / ж. р.; мн. ч. + s)',
            head: ['', 'м. р.', 'ж. р.'],
            rows: [
              ['yo', 'mío / míos', 'mía / mías'],
              ['tú', 'tuyo / tuyos', 'tuya / tuyas'],
              ['él / ella / usted', 'suyo / suyos', 'suya / suyas'],
              ['nosotros', 'nuestro / nuestros', 'nuestra / nuestras'],
              ['vosotros', 'vuestro / vuestros', 'vuestra / vuestras'],
              ['ellos / ellas / ustedes', 'suyo / suyos', 'suya / suyas'],
            ],
          },
        ],
        examples: [
          { it: '¿De quién es este móvil? — Es mío.', ru: 'Чей это телефон? — Мой.', az: 'Bu telefon kimindir? — Mənimdir.' },
          { it: 'Es una amiga mía de Bakú.', ru: 'Это моя подруга из Баку.', az: 'Bu, Bakıdan olan bir rəfiqəmdir.' },
        ],
      },
      {
        title: 'muy или mucho?',
        text: `**muy** — «очень» перед **прилагательным или наречием**. Не изменяется: **muy** grande, **muy** bien, **muy** tarde.

**mucho** — «много / очень» с **существительным** и **глаголом**:
- с существительным — **согласуется**: **mucho** dinero, **mucha** gente, **muchos** libros, **muchas** horas;
- после глагола — неизменяемо: Trabajo **mucho**. Me gusta **mucho**.

Мнемоника: **muy — к признаку, mucho — к предмету и действию**.

Ошибки русскоговорящих: «muy me gusta» → **me gusta mucho**; «tengo muy hambre» → **tengo mucha hambre** (hambre — существительное); «mucho bien» → **muy bien**. Отдельно, без слова после: ¿Te gusta? — Sí, **mucho** (не «sí, muy»).`,
        examples: [
          { it: 'La ciudad es muy bonita y tiene muchos parques.', ru: 'Город очень красивый, и в нём много парков.', az: 'Şəhər çox gözəldir və çoxlu parkı var.' },
          { it: 'Estudio mucho porque el examen es muy difícil.', ru: 'Я много занимаюсь, потому что экзамен очень трудный.', az: 'Çox oxuyuram, çünki imtahan çox çətindir.' },
          { it: 'Hay mucha gente en la calle.', ru: 'На улице много людей.', az: 'Küçədə çoxlu adam var.' },
        ],
      },
    ],
    drills: [
      { prompt: '___ casa (моя)', answer: 'mi', hint: 'mi — без артикля.' },
      { prompt: '___ libros (мои)', answer: 'mis', hint: 'Много предметов → mis.' },
      { prompt: '___ hermana (твоя)', answer: 'tu', hint: 'tu — без tilde.' },
      { prompt: '___ amigos (твои)', answer: 'tus', hint: 'tus.' },
      { prompt: '___ coche (его)', answer: 'su', hint: 'su — его/её/их/Ваш.' },
      { prompt: '___ padres (её)', answer: 'sus', hint: 'Много предметов → sus.' },
      { prompt: '___ madre (наша)', answer: 'nuestra', hint: 'Согласуем с madre (ж. р.).' },
      { prompt: '___ hijos (наши)', answer: 'nuestros', hint: 'м. р. мн. ч.: nuestros.' },
      { prompt: '___ ciudad (ваша, vosotros)', answer: 'vuestra', hint: 'ciudad — ж. р.: vuestra.' },
      { prompt: 'Quiere a ___ madre. (он — свою)', answer: 'su', hint: '«Свой» нет: его → su.' },
      { prompt: 'Este libro es ___. (мой)', answer: 'mío', hint: 'Полная форма после ser: mío.' },
      { prompt: '¿Es ___ esta bolsa? (твоя)', answer: 'tuya', hint: 'bolsa — ж. р.: tuya.' },
      { prompt: 'Es una amiga ___. (моя)', answer: 'mía', hint: 'После существительного: mía.' },
      { prompt: 'El examen es ___ difícil. (muy/mucho)', answer: 'muy', hint: 'Перед прилагательным → muy.' },
      { prompt: 'Trabajo ___. (muy/mucho)', answer: 'mucho', hint: 'После глагола → mucho.' },
      { prompt: 'Hay ___ gente aquí. (mucho, согласуйте)', answer: 'mucha', hint: 'gente — ж. р.: mucha.' },
      { prompt: 'Tengo ___ libros. (mucho, согласуйте)', answer: 'muchos', hint: 'libros — м. р. мн. ч.: muchos.' },
      { prompt: 'Estoy ___ bien. (muy/mucho)', answer: 'muy', hint: 'Перед наречием → muy.' },
      { prompt: 'Me gusta ___. (muy/mucho)', answer: 'mucho', hint: 'С глаголом → mucho.' },
      { prompt: 'Tengo ___ hambre. (mucho, согласуйте)', answer: 'mucha', hint: 'hambre — существительное ж. р.: mucha.' },
    ],
  },
];
