import type { Lesson } from '../types';

// Unit 8 "Preposiciones": a, de, en, con, desde / hasta, al / del, a + persona; por / para.
export const lessons: Lesson[] = [
  {
    id: 'es-u08-preposiciones',
    unit: 8,
    title: 'Главные предлоги — a, de, en, con, desde / hasta',
    goal: 'Правильно говорить «куда», «откуда», «где», «с кем» и «с какого по какое»: «Voy al trabajo en metro de lunes a viernes».',
    sections: [
      {
        title: 'a — куда, de — откуда, en — где',
        text: `**a** — направление «куда?» и точное время: Voy **a** Madrid. La clase empieza **a** las nueve.
**de** — «откуда?», «чей?», «из чего?»: Soy **de** Bakú. El libro **de** Ana. Una mesa **de** madera.
**en** — «где?» и транспорт: Estoy **en** casa. Viajo **en** tren, **en** avión, **en** coche. Но: **a pie** — пешком.

**en** также с месяцами, годами, временами года: **en** mayo, **en** 2020, **en** verano.
А вот **дни недели — без предлога**, с артиклем: **el lunes** (в понедельник), **los lunes** (по понедельникам). Ошибка: «en lunes» ✗.

Мнемоника: **a → стрелка «туда»**, **de ← стрелка «оттуда»**, **en ● точка «внутри»**.
Ловушка: русское «в» бывает и **a** (иду **в** школу — voy **a** la escuela), и **en** (я **в** школе — estoy **en** la escuela). Спросите себя: «куда?» или «где?».`,
        examples: [
          {
            it: 'Soy de Bakú, pero vivo en Madrid.',
            ru: 'Я из Баку, но живу в Мадриде.',
            az: 'Mən Bakıdanam, amma Madriddə yaşayıram.',
          },
          {
            it: 'Los sábados voy a la piscina en bicicleta.',
            ru: 'По субботам я езжу в бассейн на велосипеде.',
            az: 'Şənbə günləri hovuza velosipedlə gedirəm.',
          },
          {
            it: 'Mi cumpleaños es en junio.',
            ru: 'Мой день рождения в июне.',
            az: 'Mənim ad günüm iyundadır.',
          },
        ],
      },
      {
        title: 'al и del: обязательное слияние',
        text: `**a + el = al**, **de + el = del**. Это не по желанию — это **обязательно**!
Voy **al** cine (не «a el cine» ✗). Vengo **del** trabajo. La casa **del** profesor.

Сливается **только с артиклем el**. С la, los, las — нет: a la playa, de los niños, a las tres.
С местоимением **él** («он», с ударением) тоже **не сливается**: el libro **de él**.

**con** — «с»: café **con** leche, hablo **con** mi madre.
Особые формы: **conmigo** (со мной), **contigo** (с тобой). Ошибка: «con mí» ✗, «con tú» ✗.
Мнемоника: **con-MI-go, con-TI-go** — «я» и «ты» прячутся внутри слова.

**sin** — «без»: café **sin** azúcar.`,
        examples: [
          {
            it: 'Vamos al cine con mis amigos.',
            ru: 'Мы идём в кино с моими друзьями.',
            az: 'Dostlarımla kinoya gedirik.',
          },
          {
            it: '¿Quieres venir conmigo al mercado?',
            ru: 'Хочешь пойти со мной на рынок?',
            az: 'Mənimlə bazara gəlmək istəyirsən?',
          },
          {
            it: 'Esta es la oficina del director.',
            ru: 'Это кабинет директора.',
            az: 'Bu, direktorun otağıdır.',
          },
        ],
      },
      {
        title: 'desde / hasta, de … a',
        text: `**desde … hasta** — «с … до», «от … до» (время и место): Trabajo **desde** las nueve **hasta** las cinco. **Desde** Madrid **hasta** Sevilla.
**de … a** — то же самое, короче и разговорнее: **de** nueve **a** cinco, **de** lunes **a** viernes.
Не смешивайте пары: «desde … a» звучит плохо, «de … hasta» тоже лучше избегать.

**desde** ещё значит «с тех пор / уже»: Vivo aquí **desde** 2020. — Я живу здесь с 2020 года.
**hasta** — «до»: **¡Hasta mañana!** **¡Hasta luego!** — До завтра! До встречи!`,
        examples: [
          {
            it: 'La tienda abre de lunes a sábado, de diez a ocho.',
            ru: 'Магазин работает с понедельника по субботу, с десяти до восьми.',
            az: 'Mağaza bazar ertəsindən şənbəyə qədər, ondan səkkizə qədər açıqdır.',
          },
          {
            it: 'Estudio español desde enero.',
            ru: 'Я учу испанский с января.',
            az: 'Yanvardan ispan dilini öyrənirəm.',
          },
        ],
      },
      {
        title: 'a + persona: «личное a»',
        text: `Уникальное правило испанского: если **прямое дополнение — человек** (или любимое животное), перед ним ставим **a**.
Veo **a** María. — Я вижу Марию. Visito **a** mis padres. Llamo **al** médico.
Но с предметами — без a: Veo **la** casa. Compro **un** coche.

Русскоговорящие часто забывают это **a**, потому что в русском его нет: «Conozco tu hermano» ✗ → **Conozco a tu hermano**.

Исключение: после **tener** «личное a» обычно не ставится: **Tengo dos hermanos.**
Совет: спросите «кого?» — если ответ человек, ставьте **a**.`,
        examples: [
          {
            it: '¿Conoces a mi hermana?',
            ru: 'Ты знаешь мою сестру?',
            az: 'Bacımı tanıyırsan?',
          },
          {
            it: 'Esperamos a nuestros amigos en la estación.',
            ru: 'Мы ждём наших друзей на вокзале.',
            az: 'Dostlarımızı vağzalda gözləyirik.',
          },
          {
            it: 'Tengo tres hermanos y quiero mucho a mis padres.',
            ru: 'У меня трое братьев, и я очень люблю своих родителей.',
            az: 'Üç qardaşım var və valideynlərimi çox sevirəm.',
          },
        ],
      },
    ],
    drills: [
      { prompt: 'Voy ___ supermercado. (a + el)', answer: 'al', hint: 'a + el = al — обязательно.' },
      { prompt: 'Vengo ___ trabajo. (de + el)', answer: 'del', hint: 'de + el = del.' },
      { prompt: 'Soy ___ Bakú.', answer: 'de', hint: 'Откуда? — de.' },
      { prompt: 'Estamos ___ casa.', answer: 'en', hint: 'Где? — en.' },
      { prompt: 'La clase empieza ___ las nueve.', answer: 'a', hint: 'Точное время — a las…' },
      { prompt: 'Viajo ___ tren.', answer: 'en', hint: 'Транспорт — en.' },
      { prompt: 'Voy ___ pie.', answer: 'a', hint: 'Пешком — a pie.' },
      { prompt: 'Mi cumpleaños es ___ mayo.', answer: 'en', hint: 'Месяцы — en.' },
      { prompt: '¿Vienes ___? (со мной)', answer: 'conmigo', hint: 'con + mí = conmigo.' },
      { prompt: 'Quiero hablar ___. (с тобой)', answer: 'contigo', hint: 'con + ti = contigo.' },
      { prompt: 'Trabajo ___ las nueve hasta las cinco.', answer: 'desde', hint: 'Пара desde … hasta.' },
      { prompt: 'Tenemos clase de lunes ___ viernes.', answer: 'a', hint: 'Пара de … a.' },
      { prompt: 'Veo ___ mi hermana todos los días.', answer: 'a', hint: 'Человек-дополнение → личное a.' },
      { prompt: 'Llamo ___ profesor. (a + el)', answer: 'al', hint: 'Личное a + el = al.' },
      { prompt: 'Es el coche ___ director. (de + el)', answer: 'del', hint: 'Чей? — de + el = del.' },
      { prompt: 'Visitamos ___ nuestros abuelos.', answer: 'a', hint: 'Кого? Людей → a.' },
      { prompt: 'Una mesa ___ madera.', answer: 'de', hint: 'Из чего? — de.' },
      { prompt: 'Un café ___ leche, por favor.', answer: 'con', hint: 'С чем? — con.' },
      { prompt: 'Vivo en Madrid ___ 2020. (с 2020 года)', answer: 'desde', hint: '«С тех пор» — desde.' },
    ],
  },
  {
    id: 'es-u08-por-para',
    unit: 8,
    title: 'Por или para?',
    goal: 'Выбирать между por и para: «Gracias por el regalo» и «Este regalo es para ti».',
    sections: [
      {
        title: 'para — цель, «→ вперёд»',
        text: `**para** смотрит **вперёд**, на цель или адресата. Представьте стрелку **→**.

- **цель** («чтобы, для»): Estudio **para** aprender. Ahorro **para** un coche.
- **получатель** («для кого»): Este regalo es **para** ti.
- **пункт назначения**: Salgo **para** Madrid. — Выезжаю в Мадрид.
- **срок** («к»): Necesito el informe **para** el lunes.
- **мнение** («по мнению, для меня»): **Para** mí, el español es fácil.

**¿Para qué?** — «Зачем? Для чего?» → **Para** + инфинитив.`,
        examples: [
          {
            it: 'Estudio español para trabajar en España.',
            ru: 'Я учу испанский, чтобы работать в Испании.',
            az: 'İspaniyada işləmək üçün ispan dilini öyrənirəm.',
          },
          {
            it: 'Estas flores son para tu madre.',
            ru: 'Эти цветы для твоей мамы.',
            az: 'Bu güllər sənin anan üçündür.',
          },
          {
            it: 'Para mí, la paella es el mejor plato.',
            ru: 'По-моему, паэлья — лучшее блюдо.',
            az: 'Mənim üçün paelya ən yaxşı yeməkdir.',
          },
        ],
      },
      {
        title: 'por — причина, путь, обмен',
        text: `**por** смотрит **назад** (на причину) или **сквозь** (путь, средство). По-русски: «из-за, за, по, через».

- **причина** («из-за, за»): No salimos **por** la lluvia. Gracias **por** todo.
- **путь, место «по»**: Paseo **por** el parque. Pasamos **por** Toledo.
- **время суток**: **por** la mañana, **por** la tarde, **por** la noche.
- **средство**: Hablo **por** teléfono. Te lo mando **por** correo.
- **цена, обмен** («за»): Compré el libro **por** diez euros.
- **«ради», «вместо»**: Lo hago **por** ti. — Я делаю это ради тебя.
- **скорость, частота**: 100 km **por** hora, dos veces **por** semana.

Мнемоника: **por — «П»: Причина, Путь, Плата, Период суток**.`,
        examples: [
          {
            it: 'Gracias por tu ayuda.',
            ru: 'Спасибо за твою помощь.',
            az: 'Köməyin üçün təşəkkür edirəm.',
          },
          {
            it: 'Por la tarde damos un paseo por el centro.',
            ru: 'Вечером мы гуляем по центру.',
            az: 'Axşamüstü mərkəzdə gəzintiyə çıxırıq.',
          },
          {
            it: 'El vuelo se canceló por la niebla.',
            ru: 'Рейс отменили из-за тумана.',
            az: 'Reys duman səbəbindən ləğv edildi.',
          },
        ],
      },
      {
        title: 'Устойчивые выражения и ловушки',
        text: `Выучите целиком: **por favor** (пожалуйста), **por eso** (поэтому), **por fin** (наконец), **por ejemplo** (например), **por supuesto** (конечно), **por cierto** (кстати).

**¿Por qué?** (почему? — причина) — **porque** (потому что) — **¿Para qué?** (зачем? — цель).
¿**Por qué** estudias? — **Porque** me gusta. / ¿**Para qué** estudias? — **Para** trabajar.

Ловушка с «за»: «Спасибо **за**…» — **por**; «Я **за** тобой зайду» — это другое (paso **a** buscarte). Не переводите «за» автоматически!`,
        examples: [
          {
            it: 'Por fin llegan las vacaciones.',
            ru: 'Наконец-то наступают каникулы.',
            az: 'Nəhayət, tətil gəlir.',
          },
          {
            it: 'Mañana tengo un examen; por eso no salgo esta noche.',
            ru: 'Завтра у меня экзамен, поэтому сегодня вечером я никуда не иду.',
            az: 'Sabah imtahanım var, buna görə bu axşam çölə çıxmıram.',
          },
        ],
      },
    ],
    drills: [
      { prompt: 'Estudio español ___ trabajar en España.', answer: 'para', hint: 'Цель («чтобы») — para.' },
      { prompt: 'Este regalo es ___ ti.', answer: 'para', hint: 'Получатель — para.' },
      { prompt: 'Gracias ___ tu ayuda.', answer: 'por', hint: 'Спасибо за… — por.' },
      { prompt: 'Paseamos ___ el parque.', answer: 'por', hint: 'Гулять по… — por.' },
      { prompt: 'Trabajo ___ la mañana.', answer: 'por', hint: 'Время суток — por la mañana.' },
      { prompt: 'Necesito el informe ___ el viernes.', answer: 'para', hint: 'Срок («к пятнице») — para.' },
      { prompt: 'Hablo con mi madre ___ teléfono.', answer: 'por', hint: 'Средство — por.' },
      { prompt: 'Compré la camisa ___ veinte euros.', answer: 'por', hint: 'Цена, обмен — por.' },
      { prompt: '___ mí, el español es fácil.', answer: 'para', hint: 'Мнение — para mí.' },
      { prompt: 'El tren sale ___ Sevilla a las ocho.', answer: 'para', hint: 'Пункт назначения — para.' },
      { prompt: 'No salimos ___ la lluvia.', answer: 'por', hint: 'Причина («из-за») — por.' },
      { prompt: '___ favor, ¿me ayudas?', answer: 'por', hint: 'Выражение: por favor.' },
      { prompt: '¿___ qué estudias español? — Porque me gusta.', answer: 'por', hint: 'Почему? — ¿por qué?' },
      { prompt: '¿___ qué sirve esto? — Para abrir botellas.', answer: 'para', hint: 'Зачем? — ¿para qué?' },
      { prompt: 'Vamos a cien kilómetros ___ hora.', answer: 'por', hint: 'Скорость — por hora.' },
      { prompt: '¡___ fin, vacaciones!', answer: 'por', hint: 'Выражение: por fin.' },
      { prompt: 'Lo hago ___ ti. (ради тебя)', answer: 'por', hint: '«Ради» — por.' },
      { prompt: 'Hay que estudiar mucho ___ el examen.', answer: 'para', hint: 'Цель — para.' },
    ],
  },
];
