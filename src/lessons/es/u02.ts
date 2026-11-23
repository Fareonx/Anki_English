import type { Lesson } from '../types';

// Unit 2 "Ser y estar": pronombres personales, ser, estar, tener, hay.
export const lessons: Lesson[] = [
  {
    id: 'es-u02-ser',
    unit: 2,
    title: 'Личные местоимения и глагол ser',
    goal: 'Представиться, сказать, кто ты, откуда и какой, и обратиться к человеку на «вы» (usted).',
    sections: [
      {
        title: 'Кто есть кто: местоимения',
        text: `В испанском **местоимение обычно опускают**: окончание глагола уже показывает лицо. «Soy Ali» звучит естественнее, чем «Yo soy Ali». Местоимение ставят для контраста или ясности: **Yo** soy de Bakú y **él** es de Moscú.

Особенности:
- **nosotros / nosotras**, **vosotros / vosotras**, **ellos / ellas** — есть женские формы. Смешанная группа — мужской род.
- **vosotros** («вы» — группе друзей) используют **только в Испании**. В Латинской Америке всем говорят **ustedes**.
- **usted** (вежливое «Вы», сокращённо Ud.) и **ustedes** (Uds.) грамматически — **3-е лицо**! Глагол как у él / ellos: Usted **es**, ustedes **son**. Мнемоника: usted — это «ваша милость» (vuestra merced), а о «милости» говорят в 3-м лице.

Типичная ошибка: «Usted eres…». Правильно — **Usted es…**`,
        tables: [
          {
            title: 'ser — быть (неправильный глагол)',
            head: ['', 'ser'],
            rows: [
              ['yo', 'soy'],
              ['tú', 'eres'],
              ['él / ella / usted', 'es'],
              ['nosotros', 'somos'],
              ['vosotros', 'sois'],
              ['ellos / ellas / ustedes', 'son'],
            ],
          },
        ],
        examples: [
          { it: 'Soy Ali. Soy de Azerbaiyán.', ru: 'Я Али. Я из Азербайджана.', az: 'Mən Əliyəm. Azərbaycandanam.' },
          { it: '¿Usted es el profesor?', ru: 'Вы преподаватель?', az: 'Siz müəllimsiniz?' },
          { it: 'Nosotros somos estudiantes.', ru: 'Мы студенты.', az: 'Biz tələbəyik.' },
        ],
      },
      {
        title: 'Когда нужен ser',
        text: `**Ser** описывает то, **что ты ЕСТЬ** — постоянную сущность. Мнемоника **DOCTOR**:
- **D**escripción — описание: Ella es alta. El libro es interesante.
- **O**cupación — профессия: Soy ingeniero. (без артикля un!)
- **C**aracterística — характер: Eres simpático.
- **T**iempo — время и даты: Son las tres. Hoy es lunes.
- **O**rigen — происхождение: Somos de Bakú.
- **R**elación — отношения: Es mi hermano.

Ещё: материал (**es de madera**) и где проходит событие (**La fiesta es en mi casa**).

Важно: в русском «быть» в настоящем времени обычно **пропускается** («Я студент»). В испанском глагол **обязателен**: Yo **soy** estudiante. Не говорите «Yo estudiante»!

С профессией и национальностью артикль не нужен: Soy médico (не «soy un médico»).`,
        examples: [
          { it: 'Mi madre es médica.', ru: 'Моя мама — врач.', az: 'Anam həkimdir.' },
          { it: 'Hoy es martes.', ru: 'Сегодня вторник.', az: 'Bu gün çərşənbə axşamıdır.' },
          { it: 'Vosotros sois muy simpáticos.', ru: 'Вы очень милые.', az: 'Siz çox mehribansınız.' },
          { it: '¿De dónde eres? — Soy de Rusia.', ru: 'Откуда ты? — Я из России.', az: 'Haralısan? — Rusiyadanam.' },
        ],
      },
    ],
    drills: [
      { prompt: 'ser · yo', answer: 'soy', hint: 'yo soy.' },
      { prompt: 'ser · tú', answer: 'eres', hint: 'tú eres.' },
      { prompt: 'ser · él', answer: 'es', hint: 'él es.' },
      { prompt: 'ser · nosotros', answer: 'somos', hint: 'nosotros somos.' },
      { prompt: 'ser · vosotros', answer: 'sois', hint: 'vosotros sois — без tilde.' },
      { prompt: 'ser · ellos', answer: 'son', hint: 'ellos son.' },
      { prompt: 'ser · usted', answer: 'es', hint: 'usted — 3-е лицо, как él.' },
      { prompt: 'ser · ustedes', answer: 'son', hint: 'ustedes — 3-е лицо мн. ч., как ellos.' },
      { prompt: 'Местоимение: «мы» (женщины)', answer: 'nosotras', hint: 'Группа только из женщин → nosotras.' },
      { prompt: 'Местоимение: вежливое «Вы» (одному человеку)', answer: 'usted', hint: 'usted = Ud.' },
      { prompt: 'Местоимение: «они» (женщины)', answer: 'ellas', hint: 'ellas — только женщины.' },
      { prompt: 'Yo ___ (ser) de Bakú.', answer: 'soy', hint: 'Происхождение → ser · yo.' },
      { prompt: 'Ana ___ (ser) muy simpática.', answer: 'es', hint: 'Характер → ser · ella.' },
      { prompt: 'Nosotros ___ (ser) estudiantes.', answer: 'somos', hint: 'Профессия/роль → ser · nosotros.' },
      { prompt: '¿Tú ___ (ser) ruso?', answer: 'eres', hint: 'ser · tú.' },
      { prompt: 'Señor García, ¿usted ___ (ser) el director?', answer: 'es', hint: 'usted + 3-е лицо: es.' },
      { prompt: 'Hoy ___ (ser) lunes.', answer: 'es', hint: 'Дни недели → ser.' },
      { prompt: 'Vosotros ___ (ser) mis amigos.', answer: 'sois', hint: 'Отношения → ser · vosotros.' },
      { prompt: 'Mis padres ___ (ser) profesores.', answer: 'son', hint: 'ser · ellos.' },
      { prompt: 'Переведите: «Я врач» (мужчина), два слова', answer: 'soy médico', hint: 'Без артикля и без yo: soy médico.', also: ['yo soy médico'] },
    ],
  },
  {
    id: 'es-u02-estar',
    unit: 2,
    title: 'Глагол estar. Ser или estar?',
    goal: 'Говорить о местонахождении и состоянии и не путать ser и estar.',
    sections: [
      {
        title: 'estar — где и как',
        text: `**Estar** отвечает на два вопроса: **ГДЕ?** и **КАК (сейчас)?**

Мнемоника: «**Как ты себя чувствуешь и где ты находишься — это estar**». Есть даже стишок: *How you feel and where you are — that is when you use estar.*

- Место: Madrid **está** en España. ¿Dónde **estás**?
- Состояние, настроение: **Estoy** cansado. La sopa **está** fría. **Estamos** contentos.
- Самочувствие: ¿Cómo **estás**? — **Estoy** bien.
- Действие в процессе (estar + -ando/-iendo): **Estoy** estudiando.

Обратите внимание на **tilde** во всех формах, кроме yo и nosotros: est**á**s, est**á**, est**á**is, est**á**n. Ударение на окончание!`,
        tables: [
          {
            title: 'estar — находиться, быть (в состоянии)',
            head: ['', 'estar'],
            rows: [
              ['yo', 'estoy'],
              ['tú', 'estás'],
              ['él / ella / usted', 'está'],
              ['nosotros', 'estamos'],
              ['vosotros', 'estáis'],
              ['ellos / ellas / ustedes', 'están'],
            ],
          },
        ],
        examples: [
          { it: '¿Cómo estás? — Estoy muy bien, gracias.', ru: 'Как дела? — Очень хорошо, спасибо.', az: 'Necəsən? — Çox yaxşıyam, sağ ol.' },
          { it: 'Bakú está en Azerbaiyán.', ru: 'Баку находится в Азербайджане.', az: 'Bakı Azərbaycandadır.' },
          { it: 'Estamos cansados.', ru: 'Мы устали.', az: 'Biz yorğunuq.' },
        ],
      },
      {
        title: 'Ser или estar?',
        text: `**Ser** — что это ЕСТЬ по сути (паспорт человека). **Estar** — в каком он сейчас состоянии и где (его «статус» в соцсети).

Одно и то же прилагательное меняет смысл:
- Juan **es** aburrido — Хуан скучный (такой человек). / Juan **está** aburrido — Хуану скучно (сейчас).
- La manzana **es** verde — яблоко зелёного цвета. / La manzana **está** verde — яблоко незрелое.
- Ella **es** lista — она умная. / Ella **está** lista — она готова.
- **Es** guapa — она красивая. / **Está** guapa — она (сегодня) хорошо выглядит.

Ловушки:
- Место **события** — ser: La fiesta **es** en mi casa. Место **предмета/человека** — estar: Mi casa **está** en el centro.
- Смерть и брак — estar, хотя это «навсегда»: **Está** muerto. **Está** casado.
- Профессия — всегда ser, даже временная: **Es** camarero.`,
        tables: [
          {
            title: 'Сравнение',
            head: ['', 'ser', 'estar'],
            rows: [
              ['что выражает', 'сущность, характер', 'состояние, место'],
              ['bueno', 'es bueno — он хороший', 'está bueno — вкусный'],
              ['malo', 'es malo — плохой', 'está malo — болен'],
              ['listo', 'es listo — умный', 'está listo — готов'],
              ['aburrido', 'es aburrido — скучный', 'está aburrido — скучает'],
            ],
          },
        ],
        examples: [
          { it: 'Mi hermana es alta y hoy está muy contenta.', ru: 'Моя сестра высокая, и сегодня она очень довольна.', az: 'Bacım hündürdür və bu gün çox şaddır.' },
          { it: 'El concierto es en el teatro.', ru: 'Концерт проходит в театре.', az: 'Konsert teatrda keçirilir.' },
          { it: 'El teatro está en la plaza.', ru: 'Театр находится на площади.', az: 'Teatr meydandadır.' },
          { it: '¿Estás listo? Vamos.', ru: 'Ты готов? Пошли.', az: 'Hazırsan? Gedək.' },
        ],
      },
    ],
    drills: [
      { prompt: 'estar · yo', answer: 'estoy', hint: 'yo estoy.' },
      { prompt: 'estar · tú', answer: 'estás', hint: 'tú estás — tilde на a.' },
      { prompt: 'estar · ella', answer: 'está', hint: 'ella está.' },
      { prompt: 'estar · nosotros', answer: 'estamos', hint: 'nosotros estamos — без tilde.' },
      { prompt: 'estar · vosotros', answer: 'estáis', hint: 'vosotros estáis.' },
      { prompt: 'estar · ustedes', answer: 'están', hint: 'ustedes = 3-е лицо мн. ч.: están.' },
      { prompt: '¿Dónde ___ (estar) el baño?', answer: 'está', hint: 'Место → estar · él.' },
      { prompt: 'Yo ___ (estar) cansado.', answer: 'estoy', hint: 'Состояние → estar.' },
      { prompt: 'Madrid ___ (ser/estar) en España.', answer: 'está', hint: 'Местонахождение города → estar.' },
      { prompt: 'Mi padre ___ (ser/estar) médico.', answer: 'es', hint: 'Профессия → ser.' },
      { prompt: 'La sopa ___ (ser/estar) fría.', answer: 'está', hint: 'Состояние сейчас → estar.' },
      { prompt: 'Nosotros ___ (ser/estar) de Rusia.', answer: 'somos', hint: 'Происхождение → ser.' },
      { prompt: 'La fiesta ___ (ser/estar) en casa de Ana.', answer: 'es', hint: 'Место события → ser.' },
      { prompt: 'Hoy ellas ___ (ser/estar) muy contentas.', answer: 'están', hint: 'Настроение сегодня → estar.' },
      { prompt: 'Tú ___ (ser/estar) muy inteligente.', answer: 'eres', hint: 'Черта характера → ser.' },
      { prompt: '¿___ (ser/estar) listos, chicos? Vamos.', answer: 'estáis', hint: 'listo = готов → estar · vosotros.', also: ['están'] },
      { prompt: 'Mi abuelo ___ (ser/estar) casado.', answer: 'está', hint: 'Семейное положение → estar.' },
      { prompt: '¿Qué hora ___ (ser/estar)?', answer: 'es', hint: 'Время → ser.' },
    ],
  },
  {
    id: 'es-u02-tener-hay',
    unit: 2,
    title: 'Глагол tener. Hay или está?',
    goal: 'Сказать, что у тебя есть, сколько тебе лет, что ты голоден, и описать, что где находится.',
    sections: [
      {
        title: 'tener — иметь',
        text: `Русское «**у меня есть**» по-испански — **tengo** («я имею»). Подлежащим становится человек: **Tengo** un hermano. ¿**Tienes** coche?

**tener** — неправильный глагол: в yo — **-go** (tengo), а в tú, él, ellos — **e → ie** (tienes, tiene, tienen). В nosotros и vosotros основа обычная: tenemos, tenéis.

**Возраст** — через tener, а не ser! **Tengo** veinte **años** («имею 20 лет»). Ошибка русскоговорящих: «Soy 20 años» — так нельзя.

**Ощущения** — тоже tener + существительное (буквально «имею голод»):
- tener **hambre** — хотеть есть; tener **sed** — хотеть пить
- tener **frío / calor** — мёрзнуть / быть жарко
- tener **sueño** — хотеть спать; tener **miedo** — бояться
- tener **prisa** — спешить; tener **razón** — быть правым
- **tener que** + инфинитив — быть должным: Tengo que estudiar.

Так как это существительные, «очень» — **mucho/mucha**, а не muy: Tengo **mucha** hambre, tengo **mucho** frío.`,
        tables: [
          {
            title: 'tener — иметь',
            head: ['', 'tener'],
            rows: [
              ['yo', 'tengo'],
              ['tú', 'tienes'],
              ['él / ella / usted', 'tiene'],
              ['nosotros', 'tenemos'],
              ['vosotros', 'tenéis'],
              ['ellos / ellas / ustedes', 'tienen'],
            ],
          },
        ],
        examples: [
          { it: 'Tengo veinte años.', ru: 'Мне двадцать лет.', az: 'İyirmi yaşım var.' },
          { it: '¿Tienes hambre? — Sí, tengo mucha hambre.', ru: 'Ты голоден? — Да, очень.', az: 'Acsan? — Bəli, çox acam.' },
          { it: 'Tenemos que trabajar mañana.', ru: 'Завтра нам нужно работать.', az: 'Sabah işləməliyik.' },
        ],
      },
      {
        title: 'hay или está / están',
        text: `**Hay** = «есть, имеется» (безличная форма от haber). Одна форма для **единственного и множественного** числа: **Hay** un banco. **Hay** dos bancos.

**Hay** — когда мы впервые сообщаем о существовании чего-то **неопределённого**: hay + **un/una/unos**, числительное, mucho, ничего (без артикля).
**Está / están** — когда говорим, **где находится конкретная**, уже известная вещь: **el/la/los/las**, имя собственное, mi/tu.

Мнемоника: **«hay — что-то, está — то самое»**.
- **Hay** un supermercado cerca. — Поблизости есть супермаркет.
- El supermercado **está** cerca. — (Этот) супермаркет недалеко.

Ошибка: «Hay el museo en el centro». Правильно: **El museo está** en el centro.`,
        tables: [
          {
            title: 'Схема',
            head: ['', 'hay', 'está / están'],
            rows: [
              ['с чем', 'un, una, unos, números, mucho, без артикля', 'el, la, los, las, mi, имена'],
              ['ед. ч.', 'Hay un café.', 'El café está allí.'],
              ['мн. ч.', 'Hay dos cafés.', 'Los cafés están allí.'],
            ],
          },
        ],
        examples: [
          { it: 'En mi calle hay una farmacia.', ru: 'На моей улице есть аптека.', az: 'Mənim küçəmdə aptek var.' },
          { it: 'La farmacia está al lado del banco.', ru: 'Аптека рядом с банком.', az: 'Aptek bankın yanındadır.' },
          { it: '¿Hay leche? — No, no hay.', ru: 'Есть молоко? — Нет.', az: 'Süd var? — Xeyr, yoxdur.' },
        ],
      },
    ],
    drills: [
      { prompt: 'tener · yo', answer: 'tengo', hint: 'yo: -go → tengo.' },
      { prompt: 'tener · tú', answer: 'tienes', hint: 'e → ie: tienes.' },
      { prompt: 'tener · él', answer: 'tiene', hint: 'e → ie: tiene.' },
      { prompt: 'tener · nosotros', answer: 'tenemos', hint: 'В nosotros без ie: tenemos.' },
      { prompt: 'tener · vosotros', answer: 'tenéis', hint: 'В vosotros без ie: tenéis.' },
      { prompt: 'tener · ellos', answer: 'tienen', hint: 'e → ie: tienen.' },
      { prompt: 'Yo ___ (tener) veinte años.', answer: 'tengo', hint: 'Возраст → tener.' },
      { prompt: '¿Cuántos años ___ (tener) tú?', answer: 'tienes', hint: 'tener · tú.' },
      { prompt: 'Nosotros ___ (tener) mucha hambre.', answer: 'tenemos', hint: 'tener hambre.' },
      { prompt: 'Mi hermana ___ (tener) frío.', answer: 'tiene', hint: 'tener frío · ella.' },
      { prompt: 'Tengo ___ sed. (очень — mucho/mucha)', answer: 'mucha', hint: 'sed — женский род: mucha sed.' },
      { prompt: 'Переведите одним словом: «спешить» = tener ___', answer: 'prisa', hint: 'tener prisa.' },
      { prompt: 'Переведите одним словом: «хотеть спать» = tener ___', answer: 'sueño', hint: 'tener sueño.' },
      { prompt: 'Ellos ___ (tener) que estudiar.', answer: 'tienen', hint: 'tener que + инфинитив = быть должным.' },
      { prompt: 'En la plaza ___ (hay/está) un restaurante.', answer: 'hay', hint: 'un + что-то новое → hay.' },
      { prompt: 'El restaurante ___ (hay/está) en la plaza.', answer: 'está', hint: 'el + конкретный предмет → está.' },
      { prompt: 'En mi clase ___ (hay/están) diez estudiantes.', answer: 'hay', hint: 'Числительное → hay (одна форма).' },
      { prompt: 'Mis libros ___ (hay/están) en la mesa.', answer: 'están', hint: 'mis libros — конкретные → están.' },
      { prompt: '¿Dónde ___ (hay/está) el hotel Sol?', answer: 'está', hint: 'Конкретный отель с названием → está.' },
      { prompt: '¿___ (hay/está) un banco cerca?', answer: 'hay', hint: 'un banco → hay.' },
    ],
  },
];
