import type { Lesson } from '../types';

// Unit 7 "Planes": ir a + infinitivo, tener que / hay que / deber, estar + gerundio.
export const lessons: Lesson[] = [
  {
    id: 'es-u07-ir-a',
    unit: 7,
    title: 'Планы и обязанности — ir a, tener que, hay que, deber',
    goal: 'Говорить о планах и обязанностях: «Mañana voy a estudiar, pero hoy tengo que trabajar».',
    sections: [
      {
        title: 'ir a + инфинитив: «собираюсь сделать»',
        text: `Самый простой способ говорить о будущем: **ir (в presente) + a + инфинитив**.
Voy a comer. — Я буду есть / собираюсь поесть.

Меняется **только ir**, второй глагол всегда в инфинитиве: voy a viajar, vas a viajar, va a viajar...

**Предлог a обязателен!** Типичная ошибка: «Voy comer» ✗ → **Voy a comer**. Запомните «тройку»: **voy — a — comer**.

Слова-помощники: **mañana** (завтра), **esta noche** (сегодня вечером), **el fin de semana** (на выходных), **la semana que viene** (на следующей неделе), **el próximo año** (в следующем году).

Совет: **¡Vamos a ver!** — «Посмотрим!», а **¡Vamos!** — «Пошли! / Давай!». Очень частые фразы.`,
        tables: [
          {
            title: 'ir · ir a + viajar',
            head: ['', 'ir', 'ir a + viajar'],
            rows: [
              ['yo', 'voy', 'voy a viajar'],
              ['tú', 'vas', 'vas a viajar'],
              ['él / ella / usted', 'va', 'va a viajar'],
              ['nosotros', 'vamos', 'vamos a viajar'],
              ['vosotros', 'vais', 'vais a viajar'],
              ['ellos / ellas / ustedes', 'van', 'van a viajar'],
            ],
          },
        ],
        examples: [
          {
            it: 'Este verano vamos a viajar a Andalucía.',
            ru: 'Этим летом мы собираемся поехать в Андалусию.',
            az: 'Bu yay Əndəlusa səyahət edəcəyik.',
          },
          {
            it: '¿Qué vas a hacer el sábado?',
            ru: 'Что ты будешь делать в субботу?',
            az: 'Şənbə günü nə edəcəksən?',
          },
          {
            it: 'Mira esas nubes: va a llover.',
            ru: 'Посмотри на эти тучи: сейчас пойдёт дождь.',
            az: 'O buludlara bax: yağış yağacaq.',
          },
        ],
      },
      {
        title: 'tener que, hay que, deber: «надо», «нужно», «следует»',
        text: `**tener que + инфинитив** — «я должен, мне надо» (конкретному человеку): **Tengo que** trabajar. **Tenemos que** salir ya.
Ошибка русскоговорящих: «Tengo de trabajar» ✗ или «Tengo trabajar» ✗. Только **que**!

**hay que + инфинитив** — «надо, нужно» **вообще, для всех**, без лица. Форма одна: **hay que**.
**Hay que** estudiar mucho. — Нужно много заниматься.
Не говорите «yo hay que» ✗: если «я», то **tengo que**.

**deber + инфинитив** — «должен, следует» (моральный долг, совет), **без предлога**: **Debes** descansar. — Тебе следует отдохнуть.

Мнемоника: **tengo QUE, hay QUE, а deber — без ничего**.`,
        tables: [
          {
            title: 'tener · deber',
            head: ['', 'tener', 'deber'],
            rows: [
              ['yo', 'tengo', 'debo'],
              ['tú', 'tienes', 'debes'],
              ['él / ella / usted', 'tiene', 'debe'],
              ['nosotros', 'tenemos', 'debemos'],
              ['vosotros', 'tenéis', 'debéis'],
              ['ellos / ellas / ustedes', 'tienen', 'deben'],
            ],
          },
        ],
        examples: [
          {
            it: 'Lo siento, hoy no puedo: tengo que trabajar.',
            ru: 'Извини, сегодня не могу: мне надо работать.',
            az: 'Bağışla, bu gün bacarmıram: işləməliyəm.',
          },
          {
            it: 'Para aprender un idioma hay que practicar cada día.',
            ru: 'Чтобы выучить язык, нужно практиковаться каждый день.',
            az: 'Bir dili öyrənmək üçün hər gün məşq etmək lazımdır.',
          },
          {
            it: 'Debes beber más agua.',
            ru: 'Тебе следует пить больше воды.',
            az: 'Daha çox su içməlisən.',
          },
        ],
      },
    ],
    drills: [
      { prompt: '(ir a) estudiar · yo', answer: 'voy a estudiar', hint: 'voy + a + инфинитив.' },
      { prompt: '(ir a) comer · tú', answer: 'vas a comer', hint: 'vas + a + comer.' },
      { prompt: '(ir a) viajar · nosotros', answer: 'vamos a viajar', hint: 'vamos + a + viajar.' },
      { prompt: '(ir a) salir · ellos', answer: 'van a salir', hint: 'van + a + salir.' },
      { prompt: '(ir a) ver · vosotros', answer: 'vais a ver', hint: 'vais + a + ver.' },
      { prompt: '(ir a) llamar · usted', answer: 'va a llamar', hint: 'usted — как él: va.' },
      { prompt: 'Mañana ___ (yo, ir a + trabajar) en casa.', answer: 'voy a trabajar', hint: 'Не забудьте предлог a.' },
      { prompt: '¿Qué ___ (tú, ir a + hacer) el sábado?', answer: 'vas a hacer', hint: 'vas a + инфинитив.' },
      { prompt: '(tener que) estudiar · yo', answer: 'tengo que estudiar', hint: 'tengo + que + инфинитив.' },
      { prompt: '(tener que) trabajar · ella', answer: 'tiene que trabajar', hint: 'tener: ie в основе — tiene.' },
      { prompt: '(tener que) esperar · nosotros', answer: 'tenemos que esperar', hint: 'В nosotros без ie: tenemos.' },
      { prompt: '(tener que) pagar · vosotros', answer: 'tenéis que pagar', hint: 'tenéis — с ударением на é.' },
      { prompt: 'Los niños ___ (tener) que dormir ya.', answer: 'tienen', hint: 'ellos → tienen.' },
      { prompt: 'Para entrar ___ comprar una entrada. (нужно — для всех)', answer: 'hay que', hint: 'Безлично: hay que + инфинитив.' },
      { prompt: '(deber) descansar · tú', answer: 'debes descansar', hint: 'deber + инфинитив без предлога.' },
      { prompt: 'Ustedes ___ (deber) hablar con el médico.', answer: 'deben', hint: 'ustedes — как ellos: deben.' },
      { prompt: 'Esta noche ___ (nosotros, ir) a cenar fuera.', answer: 'vamos', hint: 'ir · nosotros = vamos.' },
      { prompt: 'Yo no ___ (deber) comer tanto chocolate.', answer: 'debo', hint: 'deber · yo = debo.' },
    ],
  },
  {
    id: 'es-u07-gerundio',
    unit: 7,
    title: 'Что происходит сейчас — estar + gerundio',
    goal: 'Описывать действие в процессе: «Ahora estoy comiendo, te llamo luego».',
    sections: [
      {
        title: 'Как образуется герундий',
        text: `**estar + gerundio** = «прямо сейчас делаю», процесс: **Estoy leyendo.** — Я (сейчас) читаю.

Герундий (gerundio) — неизменяемая форма на **-ndo**:
- **-ar → -ando**: habl**ar** → habl**ando**, trabaj**ar** → trabaj**ando**
- **-er / -ir → -iendo**: com**er** → com**iendo**, viv**ir** → viv**iendo**

Мнемоника: у **-ar** — «а» (**-ando**), у всех остальных — «ie» (**-iendo**).

Спрягается **только estar**, герундий не меняется ни по лицам, ни по родам: ella está hablando, ellos están hablando.

Ошибка: «Estoy hablo» ✗ или «Soy hablando» ✗. Только **estar + -ndo**.`,
        tables: [
          {
            title: 'estar + gerundio',
            head: ['', 'estar', 'hablar', 'comer', 'vivir'],
            rows: [
              ['yo', 'estoy', 'estoy hablando', 'estoy comiendo', 'estoy viviendo'],
              ['tú', 'estás', 'estás hablando', 'estás comiendo', 'estás viviendo'],
              ['él / ella / usted', 'está', 'está hablando', 'está comiendo', 'está viviendo'],
              ['nosotros', 'estamos', 'estamos hablando', 'estamos comiendo', 'estamos viviendo'],
              ['vosotros', 'estáis', 'estáis hablando', 'estáis comiendo', 'estáis viviendo'],
              ['ellos / ellas / ustedes', 'están', 'están hablando', 'están comiendo', 'están viviendo'],
            ],
          },
        ],
        examples: [
          {
            it: 'No puedo hablar ahora, estoy conduciendo.',
            ru: 'Не могу сейчас говорить, я за рулём (веду машину).',
            az: 'İndi danışa bilmirəm, maşın sürürəm.',
          },
          {
            it: '¿Qué estás haciendo? — Estoy cocinando.',
            ru: 'Что ты делаешь? — Готовлю.',
            az: 'Nə edirsən? — Yemək bişirirəm.',
          },
          {
            it: 'Los niños están jugando en el parque.',
            ru: 'Дети играют в парке.',
            az: 'Uşaqlar parkda oynayırlar.',
          },
        ],
      },
      {
        title: 'Особые герундии: leyendo, durmiendo, pidiendo',
        text: `**1. -yendo** — если перед окончанием стоит гласная (три гласных подряд неудобно, i превращается в **y**):
leer → **leyendo**, oír → **oyendo**, traer → **trayendo**, creer → **creyendo**, construir → **construyendo**, ir → **yendo**.

**2. Глаголы на -ir с изменением основы**: e → **i**, o → **u**:
pedir → **pidiendo**, decir → **diciendo**, repetir → **repitiendo**, sentir → **sintiendo**, servir → **sirviendo**, venir → **viniendo**, seguir → **siguiendo**;
dormir → **durmiendo**, morir → **muriendo**.
Совет: глаголы на **-ar и -er** основу в герундии **не меняют**: pensar → pensando, volver → volviendo, poder → pudiendo (исключение, но редкое).

**3. seguir + gerundio** = «продолжать делать»: **Sigo estudiando** español. — Я продолжаю учить испанский.`,
        examples: [
          {
            it: 'Mi abuelo está durmiendo en el sofá.',
            ru: 'Мой дедушка спит на диване.',
            az: 'Babam divanda yatır.',
          },
          {
            it: 'Estoy leyendo un libro muy interesante.',
            ru: 'Я читаю очень интересную книгу.',
            az: 'Çox maraqlı bir kitab oxuyuram.',
          },
          {
            it: '¿Qué estás diciendo? No te entiendo.',
            ru: 'Что ты говоришь? Я тебя не понимаю.',
            az: 'Nə deyirsən? Səni başa düşmürəm.',
          },
          {
            it: 'Después de dos años, sigo viviendo en Madrid.',
            ru: 'Спустя два года я всё ещё живу в Мадриде.',
            az: 'İki ildən sonra hələ də Madriddə yaşayıram.',
          },
        ],
      },
      {
        title: 'Когда использовать и где ставить местоимение',
        text: `**estar + gerundio** — подчёркивает «именно сейчас, в процессе». Для привычек — обычный presente: Trabajo en un banco (вообще), но **Estoy trabajando** (в данный момент).

В отличие от английского, испанский **не использует** estar + gerundio для будущих планов: «Завтра я работаю» — **Mañana trabajo** или **Mañana voy a trabajar**.

С глаголами **ir, venir** обычно хватает простого presente: **Voy a casa.** — Я иду домой.

**Возвратные глаголы**: местоимение ставим **перед estar** или **приклеиваем к герундию** (тогда появляется ударение!):
**Me estoy duchando** = **Estoy duchándome**. **Se está vistiendo** = **Está vistiéndose**.`,
        examples: [
          {
            it: 'Ahora mismo me estoy duchando.',
            ru: 'Я прямо сейчас принимаю душ.',
            az: 'Elə indi duş qəbul edirəm.',
          },
          {
            it: 'Espera un momento, estoy vistiéndome.',
            ru: 'Подожди минутку, я одеваюсь.',
            az: 'Bir dəqiqə gözlə, geyinirəm.',
          },
        ],
      },
    ],
    drills: [
      { prompt: 'gerundio: hablar', answer: 'hablando', hint: '-ar → -ando.' },
      { prompt: 'gerundio: comer', answer: 'comiendo', hint: '-er → -iendo.' },
      { prompt: 'gerundio: escribir', answer: 'escribiendo', hint: '-ir → -iendo.' },
      { prompt: 'gerundio: leer', answer: 'leyendo', hint: 'Гласная перед окончанием → -yendo.' },
      { prompt: 'gerundio: oír', answer: 'oyendo', hint: 'oír → oyendo (-yendo).' },
      { prompt: 'gerundio: ir', answer: 'yendo', hint: 'ir → yendo.' },
      { prompt: 'gerundio: dormir', answer: 'durmiendo', hint: '-ir: o → u.' },
      { prompt: 'gerundio: pedir', answer: 'pidiendo', hint: '-ir: e → i.' },
      { prompt: 'gerundio: decir', answer: 'diciendo', hint: 'decir: e → i.' },
      { prompt: 'gerundio: venir', answer: 'viniendo', hint: 'venir: e → i.' },
      { prompt: '(estar + gerundio) trabajar · yo', answer: 'estoy trabajando', hint: 'estoy + -ando.' },
      { prompt: '(estar + gerundio) estudiar · tú', answer: 'estás estudiando', hint: 'estás + -ando.' },
      { prompt: '(estar + gerundio) dormir · él', answer: 'está durmiendo', hint: 'está + durmiendo (o → u).' },
      { prompt: '(estar + gerundio) comer · nosotros', answer: 'estamos comiendo', hint: 'estamos + -iendo.' },
      { prompt: '(estar + gerundio) leer · vosotros', answer: 'estáis leyendo', hint: 'estáis + leyendo.' },
      { prompt: '(estar + gerundio) ver · ellos', answer: 'están viendo', hint: 'ver → viendo.' },
      { prompt: 'No puedo hablar, ___ (yo, conducir).', answer: 'estoy conduciendo', hint: 'estoy + conduciendo.' },
      { prompt: '¿Qué ___ (tú, hacer) ahora?', answer: 'estás haciendo', hint: 'estás + haciendo.' },
      { prompt: 'Ana ___ (seguir, presente) estudiando ruso.', answer: 'sigue', hint: 'seguir: e → i, ella sigue.' },
      { prompt: 'Estoy ___ (ducharse). — одним словом', answer: 'duchándome', hint: 'Герундий + me, ударение на á.' },
    ],
  },
];
