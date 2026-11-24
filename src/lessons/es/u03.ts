import type { Lesson } from '../types';

// Unit 3 "Presente": verbos regulares -ar/-er/-ir, preguntas y negación.
export const lessons: Lesson[] = [
  {
    id: 'es-u03-presente',
    unit: 3,
    title: 'Настоящее время — presente (-ar, -er, -ir)',
    goal: 'Спрягать любой правильный глагол в настоящем времени.',
    sections: [
      {
        title: 'Три спряжения',
        text: `Все испанские глаголы оканчиваются на **-ar** (hablar), **-er** (comer) или **-ir** (vivir). Отбрасываем окончание — получаем основу (habl-, com-, viv-) — и добавляем окончания лица.

Ключ к запоминанию — **гласная-«маркер»**:
- глаголы на **-ar** «живут» с буквой **a**: habl**as**, habl**a**, habl**amos**, habl**áis**, habl**an**;
- глаголы на **-er** и **-ir** — с буквой **e**: com**es**, com**e**, com**en**; viv**es**, viv**e**, viv**en**.

Форма **yo** у всех — **-o**: hablo, como, vivo.

**-er** и **-ir** отличаются только в **nosotros** и **vosotros** — там возвращается гласная инфинитива: com**emos**/com**éis**, но viv**imos**/viv**ís**.

Мнемоника для окончаний: **o — s — (ничего) — mos — is — n**. Это «скелет» почти любого времени: tú всегда на **-s**, nosotros на **-mos**, ellos на **-n**.

Испанское presente = и русское «я говорю», и «я сейчас говорю», и «я говорю (завтра)»: Mañana **trabajo** = Завтра я работаю.`,
        tables: [
          {
            title: 'hablar · comer · vivir',
            head: ['', 'hablar', 'comer', 'vivir'],
            rows: [
              ['yo', 'hablo', 'como', 'vivo'],
              ['tú', 'hablas', 'comes', 'vives'],
              ['él / ella / usted', 'habla', 'come', 'vive'],
              ['nosotros', 'hablamos', 'comemos', 'vivimos'],
              ['vosotros', 'habláis', 'coméis', 'vivís'],
              ['ellos / ellas / ustedes', 'hablan', 'comen', 'viven'],
            ],
          },
        ],
        examples: [
          { it: 'Hablo ruso y un poco de español.', ru: 'Я говорю по-русски и немного по-испански.', az: 'Rusca və bir az ispanca danışıram.' },
          { it: 'Vivimos en Bakú.', ru: 'Мы живём в Баку.', az: 'Bakıda yaşayırıq.' },
          { it: '¿Coméis en casa o en la universidad?', ru: 'Вы обедаете дома или в университете?', az: 'Evdə yemək yeyirsiniz, yoxsa universitetdə?' },
        ],
      },
      {
        title: 'Частые глаголы и подводные камни',
        text: `Запомните самые нужные правильные глаголы:
- **-ar**: trabajar (работать), estudiar (учиться), escuchar (слушать), tomar (брать, пить), comprar (покупать), llegar (прибывать), necesitar (нуждаться), mirar (смотреть), cocinar (готовить).
- **-er**: beber (пить), leer (читать), aprender (учить), comprender (понимать), correr (бегать), vender (продавать).
- **-ir**: escribir (писать), abrir (открывать), recibir (получать), subir (подниматься), compartir (делиться).

Ошибки русскоговорящих:
- **Tilde в vosotros**: habl**á**is, com**é**is, viv**í**s. В остальных формах presente у правильных глаголов tilde нет.
- Путать **habla** (он говорит) и **hablo** (я говорю). Последняя буква меняет лицо — произносите её чётко!
- **Ударение**: в ellos оно на основе — **HA**blan, **CO**men (не «хаблАн»).

**Estar + герундий** (-ando / -iendo) — действие прямо сейчас: Estoy habl**ando**, estás com**iendo**, está escrib**iendo**.`,
        tables: [
          {
            title: 'trabajar · aprender · escribir',
            head: ['', 'trabajar', 'aprender', 'escribir'],
            rows: [
              ['yo', 'trabajo', 'aprendo', 'escribo'],
              ['tú', 'trabajas', 'aprendes', 'escribes'],
              ['él / ella / usted', 'trabaja', 'aprende', 'escribe'],
              ['nosotros', 'trabajamos', 'aprendemos', 'escribimos'],
              ['vosotros', 'trabajáis', 'aprendéis', 'escribís'],
              ['ellos / ellas / ustedes', 'trabajan', 'aprenden', 'escriben'],
            ],
          },
        ],
        examples: [
          { it: 'Mi padre trabaja en un banco.', ru: 'Мой отец работает в банке.', az: 'Atam bankda işləyir.' },
          { it: 'Ellos aprenden español en Madrid.', ru: 'Они учат испанский в Мадриде.', az: 'Onlar Madriddə ispan dilini öyrənirlər.' },
          { it: 'Ahora estoy escribiendo un correo.', ru: 'Сейчас я пишу письмо (e-mail).', az: 'İndi məktub yazıram.' },
        ],
      },
    ],
    drills: [
      { prompt: '(presente) hablar · yo', answer: 'hablo', hint: 'yo: -o.' },
      { prompt: '(presente) hablar · tú', answer: 'hablas', hint: '-ar, tú: -as.' },
      { prompt: '(presente) comer · él', answer: 'come', hint: '-er, él: -e.' },
      { prompt: '(presente) vivir · nosotros', answer: 'vivimos', hint: '-ir, nosotros: -imos.' },
      { prompt: '(presente) comer · nosotros', answer: 'comemos', hint: '-er, nosotros: -emos.' },
      { prompt: '(presente) hablar · vosotros', answer: 'habláis', hint: '-ar, vosotros: -áis.' },
      { prompt: '(presente) beber · vosotros', answer: 'bebéis', hint: '-er, vosotros: -éis.' },
      { prompt: '(presente) escribir · vosotros', answer: 'escribís', hint: '-ir, vosotros: -ís.' },
      { prompt: '(presente) trabajar · ellos', answer: 'trabajan', hint: '-ar, ellos: -an.' },
      { prompt: '(presente) leer · ellas', answer: 'leen', hint: '-er, ellas: -en.' },
      { prompt: '(presente) abrir · usted', answer: 'abre', hint: 'usted = 3-е лицо: -e.' },
      { prompt: '(presente) estudiar · tú', answer: 'estudias', hint: '-ar, tú: -as.' },
      { prompt: '(presente) aprender · yo', answer: 'aprendo', hint: 'yo: -o.' },
      { prompt: '(presente) recibir · ustedes', answer: 'reciben', hint: '-ir, ustedes: -en.' },
      { prompt: 'Yo ___ (trabajar) en una oficina.', answer: 'trabajo', hint: 'trabajar · yo.' },
      { prompt: 'Mi madre ___ (cocinar) muy bien.', answer: 'cocina', hint: '-ar, ella: -a.' },
      { prompt: '¿Tú ___ (vivir) en Moscú?', answer: 'vives', hint: '-ir, tú: -es.' },
      { prompt: 'Nosotros ___ (escuchar) música.', answer: 'escuchamos', hint: '-ar, nosotros: -amos.' },
      { prompt: 'Los niños ___ (correr) en el parque.', answer: 'corren', hint: '-er, ellos: -en.' },
      { prompt: 'Ahora estoy ___ (comer). (герундий)', answer: 'comiendo', hint: '-er → -iendo.' },
    ],
  },
  {
    id: 'es-u03-preguntas',
    unit: 3,
    title: 'Вопросы и отрицание',
    goal: 'Задавать вопросы с вопросительными словами и строить отрицательные предложения.',
    sections: [
      {
        title: 'Отрицание: no',
        text: `Отрицание строится очень просто: **no** ставится **прямо перед глаголом**.
- Hablo inglés → **No** hablo inglés.
- ¿Trabajas? — **No, no** trabajo. (первое no — «нет», второе — «не»)

**Двойное отрицание** — норма, как в русском: **No** tengo **nada** (Я ничего не имею), **No** viene **nadie** (Никто не приходит), **No** como carne **nunca** (Я никогда не ем мясо).

Если отрицательное слово стоит **перед** глаголом, no не нужно: **Nunca** como carne. **Nadie** viene.

Ошибка русскоговорящих: «Yo no tengo nada» правильно, но «Yo tengo nada» — нет. Как и в русском, нужно «не» + «ничего».`,
        examples: [
          { it: 'No hablo alemán.', ru: 'Я не говорю по-немецки.', az: 'Almanca danışmıram.' },
          { it: 'No hay nadie en casa.', ru: 'Дома никого нет.', az: 'Evdə heç kim yoxdur.' },
          { it: 'Nunca bebo café por la noche.', ru: 'Я никогда не пью кофе вечером.', az: 'Gecələr heç vaxt qəhvə içmirəm.' },
        ],
      },
      {
        title: 'Вопросы',
        text: `**Общий вопрос** (да/нет) часто строится **только интонацией**, как в русском: ¿Hablas español? Можно поставить подлежащее после глагола: ¿Habla usted inglés?

**Вопросительные слова** всегда с **tilde**, стоят в начале, а подлежащее идёт **после глагола**: ¿Dónde vive **Ana**? (не «¿Dónde Ana vive?»).

- **¿qué?** — что? какой? ¿Qué haces?
- **¿quién / quiénes?** — кто? ¿Quién es? ¿Quiénes son?
- **¿dónde?** — где? **¿adónde?** — куда? **¿de dónde?** — откуда?
- **¿cuándo?** — когда?
- **¿cómo?** — как?
- **¿cuánto / cuánta / cuántos / cuántas?** — сколько? — **согласуется** с существительным: ¿Cuánt**os** años? ¿Cuánt**as** hermanas? ¿Cuánto cuesta?
- **¿cuál / cuáles?** — какой (из)? ¿Cuál es tu número?
- **¿por qué?** — почему? Ответ — **porque** (потому что), одним словом и без tilde.

Мнемоника: **¿por qué?** — два слова и tilde (вопрос «раздвоен»), **porque** — одно слитное объяснение.

Tilde сохраняется и в косвенном вопросе: No sé **dónde** vive (Не знаю, где он живёт). А без вопросительного смысла её нет: La casa **donde** vivo (Дом, где я живу).`,
        tables: [
          {
            title: 'Вопросительные слова',
            head: ['', 'испанский', 'пример'],
            rows: [
              ['что?', 'qué', '¿Qué estudias?'],
              ['кто?', 'quién', '¿Quién habla?'],
              ['где?', 'dónde', '¿Dónde vives?'],
              ['откуда?', 'de dónde', '¿De dónde eres?'],
              ['когда?', 'cuándo', '¿Cuándo llegas?'],
              ['как?', 'cómo', '¿Cómo te llamas?'],
              ['сколько?', 'cuánto / cuántos', '¿Cuántos años tienes?'],
              ['почему?', 'por qué', '¿Por qué estudias español?'],
            ],
          },
        ],
        examples: [
          { it: '¿Dónde trabaja tu hermano?', ru: 'Где работает твой брат?', az: 'Qardaşın harada işləyir?' },
          { it: '¿Por qué estudias español? — Porque me gusta.', ru: 'Почему ты учишь испанский? — Потому что мне нравится.', az: 'Niyə ispan dilini öyrənirsən? — Çünki xoşuma gəlir.' },
          { it: '¿Cuántas hermanas tienes?', ru: 'Сколько у тебя сестёр?', az: 'Neçə bacın var?' },
          { it: '¿Cuándo llega el tren?', ru: 'Когда прибывает поезд?', az: 'Qatar nə vaxt gəlir?' },
        ],
      },
    ],
    drills: [
      { prompt: 'Сделайте отрицание: Hablo francés. → ___ hablo francés.', answer: 'no', hint: 'no перед глаголом.' },
      { prompt: 'Переведите: «Я не работаю» (2 слова)', answer: 'no trabajo', hint: 'no + глагол.', also: ['yo no trabajo'] },
      { prompt: 'No tengo ___. (ничего)', answer: 'nada', hint: 'Двойное отрицание: no… nada.' },
      { prompt: 'No viene ___. (никто)', answer: 'nadie', hint: 'no… nadie.' },
      { prompt: '___ como carne. (никогда, без no)', answer: 'nunca', hint: 'Перед глаголом nunca без no.' },
      { prompt: '¿___ te llamas? (как)', answer: 'cómo', hint: 'cómo — как.' },
      { prompt: '¿___ vives? (где)', answer: 'dónde', hint: 'dónde — где.' },
      { prompt: '¿De ___ eres? (откуда)', answer: 'dónde', hint: 'de dónde — откуда.' },
      { prompt: '¿___ estudias? (что)', answer: 'qué', hint: 'qué — что.' },
      { prompt: '¿___ es ella? (кто)', answer: 'quién', hint: 'quién — кто.' },
      { prompt: '¿___ llega el autobús? (когда)', answer: 'cuándo', hint: 'cuándo — когда.' },
      { prompt: '¿___ años tienes? (сколько)', answer: 'cuántos', hint: 'años — м. р. мн. ч. → cuántos.' },
      { prompt: '¿___ hermanas tienes? (сколько)', answer: 'cuántas', hint: 'hermanas — ж. р. мн. ч. → cuántas.' },
      { prompt: '¿___ cuesta el libro? (сколько)', answer: 'cuánto', hint: 'Сколько стоит — cuánto (неизменяемо).' },
      { prompt: '¿___ ___ estudias español? (почему)', answer: 'por qué', hint: 'Вопрос: por qué — два слова, с tilde.' },
      { prompt: 'Estudio español ___ me gusta. (потому что)', answer: 'porque', hint: 'Ответ: porque — одно слово, без tilde.' },
      { prompt: '¿___ es tu número de teléfono? (какой)', answer: 'cuál', hint: 'Перед es «какой» = cuál.' },
      { prompt: '¿Dónde ___ (trabajar) tu padre?', answer: 'trabaja', hint: 'Подлежащее после глагола: trabaja tu padre.' },
    ],
  },
];
