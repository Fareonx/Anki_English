import type { Lesson } from '../types';

// Unit 5 "Mi día": verbos reflexivos, la hora, días de la semana, frecuencia.
export const lessons: Lesson[] = [
  {
    id: 'es-u05-reflexivos',
    unit: 5,
    title: 'Возвратные глаголы — levantarse, ducharse',
    goal: 'Рассказать о своём распорядке дня с помощью возвратных глаголов.',
    sections: [
      {
        title: 'Что такое -se',
        text: `Возвратный глагол в словаре заканчивается на **-se**: levantar**se** (вставать), duchar**se** (принимать душ), llamar**se** (называться). Это как русское **-ся**: мыть**ся**, одевать**ся**.

Но в испанском частица **меняется по лицам** и стоит **перед глаголом** отдельным словом:
**me** levanto, **te** levantas, **se** levanta, **nos** levantamos, **os** levantáis, **se** levantan.

Мнемоника: **«me-te-se, nos-os-se»** — повторяйте как ритм.

Сам глагол спрягается как обычно (levantar — правильный). Частица — **отдельно**, глагол — **отдельно**: «me levanto», а не «levantome» и не «levantarme» в спряжении.

С инфинитивом частица **приклеивается к концу**: Voy a ducha**rme**. Tengo que levanta**rme** temprano. (или: **Me** voy a duchar.)

Ошибка русскоговорящих: «Yo levanto a las siete» — без me это значит «я поднимаю (что-то)». Правильно: **Me levanto** a las siete.

**¿Cómo te llamas?** — буквально «Как ты себя называешь?» — **Me llamo** Ali.`,
        tables: [
          {
            title: 'levantarse · ducharse · llamarse',
            head: ['', 'levantarse', 'ducharse', 'llamarse'],
            rows: [
              ['yo', 'me levanto', 'me ducho', 'me llamo'],
              ['tú', 'te levantas', 'te duchas', 'te llamas'],
              ['él / ella / usted', 'se levanta', 'se ducha', 'se llama'],
              ['nosotros', 'nos levantamos', 'nos duchamos', 'nos llamamos'],
              ['vosotros', 'os levantáis', 'os ducháis', 'os llamáis'],
              ['ellos / ellas / ustedes', 'se levantan', 'se duchan', 'se llaman'],
            ],
          },
        ],
        examples: [
          { it: 'Me levanto a las siete y me ducho.', ru: 'Я встаю в семь и принимаю душ.', az: 'Saat yeddidə qalxıram və duş qəbul edirəm.' },
          { it: '¿Cómo se llama tu hermana?', ru: 'Как зовут твою сестру?', az: 'Bacının adı nədir?' },
          { it: 'Tengo que levantarme temprano.', ru: 'Мне нужно рано вставать.', az: 'Tezdən durmalıyam.' },
        ],
      },
      {
        title: 'Возвратные с чередованием',
        text: `Возвратные глаголы тоже бывают «ботинками» — частица не мешает правилу из урока 4:
- **acostarse** (ложиться спать): o → ue — me ac**ue**sto, но nos ac**o**stamos.
- **vestirse** (одеваться): e → i — me v**i**sto, но nos v**e**stimos.
- **despertarse** (просыпаться): e → ie — me desp**ie**rto, но nos desp**e**rtamos.

Различайте: **despertarse** — проснуться, **levantarse** — встать с кровати. Me despierto a las seis, pero me levanto a las siete.

Другие полезные: lavarse (умываться), peinarse (причёсываться), afeitarse (бриться), lavarse los dientes (чистить зубы) — **с артиклем, не с «mis»**: Me lavo **los** dientes (не «mis dientes»), потому что me уже показывает, чьи зубы.`,
        tables: [
          {
            title: 'acostarse · vestirse · despertarse',
            head: ['', 'acostarse', 'vestirse', 'despertarse'],
            rows: [
              ['yo', 'me acuesto', 'me visto', 'me despierto'],
              ['tú', 'te acuestas', 'te vistes', 'te despiertas'],
              ['él / ella / usted', 'se acuesta', 'se viste', 'se despierta'],
              ['nosotros', 'nos acostamos', 'nos vestimos', 'nos despertamos'],
              ['vosotros', 'os acostáis', 'os vestís', 'os despertáis'],
              ['ellos / ellas / ustedes', 'se acuestan', 'se visten', 'se despiertan'],
            ],
          },
        ],
        examples: [
          { it: 'Normalmente me acuesto a las once.', ru: 'Обычно я ложусь спать в одиннадцать.', az: 'Adətən saat on birdə yatıram.' },
          { it: 'Los niños se visten muy rápido.', ru: 'Дети одеваются очень быстро.', az: 'Uşaqlar çox tez geyinirlər.' },
          { it: 'Después del desayuno me lavo los dientes.', ru: 'После завтрака я чищу зубы.', az: 'Səhər yeməyindən sonra dişlərimi fırçalayıram.' },
        ],
      },
    ],
    drills: [
      { prompt: 'levantarse · yo', answer: 'me levanto', hint: 'me + levanto.' },
      { prompt: 'levantarse · tú', answer: 'te levantas', hint: 'te + levantas.' },
      { prompt: 'ducharse · él', answer: 'se ducha', hint: 'se + ducha.' },
      { prompt: 'ducharse · nosotros', answer: 'nos duchamos', hint: 'nos + duchamos.' },
      { prompt: 'llamarse · vosotros', answer: 'os llamáis', hint: 'os + llamáis.' },
      { prompt: 'llamarse · ellos', answer: 'se llaman', hint: 'se + llaman.' },
      { prompt: 'acostarse · yo', answer: 'me acuesto', hint: 'o → ue: me acuesto.' },
      { prompt: 'acostarse · nosotros', answer: 'nos acostamos', hint: 'nosotros — без ue.' },
      { prompt: 'vestirse · tú', answer: 'te vistes', hint: 'e → i: te vistes.' },
      { prompt: 'vestirse · ellas', answer: 'se visten', hint: 'e → i: se visten.' },
      { prompt: 'vestirse · nosotros', answer: 'nos vestimos', hint: 'nosotros — без изменения.' },
      { prompt: 'despertarse · yo', answer: 'me despierto', hint: 'e → ie: me despierto.' },
      { prompt: '¿Cómo ___ ___ (llamarse) tú?', answer: 'te llamas', hint: '¿Cómo te llamas?' },
      { prompt: 'Mi padre ___ ___ (afeitarse) cada mañana.', answer: 'se afeita', hint: 'se + afeita.' },
      { prompt: 'Nosotros ___ ___ (levantarse) a las ocho.', answer: 'nos levantamos', hint: 'nos + levantamos.' },
      { prompt: 'Los niños ___ ___ (acostarse) a las nueve.', answer: 'se acuestan', hint: 'o → ue: se acuestan.' },
      { prompt: 'Tengo que ___ (ducharse, инфинитив для yo).', answer: 'ducharme', hint: 'С инфинитивом частица в конце: ducharme.' },
      { prompt: 'Me lavo ___ dientes. (артикль)', answer: 'los', hint: 'Части тела — с артиклем, не с mis.' },
    ],
  },
  {
    id: 'es-u05-hora',
    unit: 5,
    title: 'Который час, дни недели, как часто',
    goal: 'Называть время, дни недели и части дня, говорить, как часто ты что-то делаешь.',
    sections: [
      {
        title: '¿Qué hora es?',
        text: `Время — через **ser** + артикль **la / las** (подразумевается la hora):
- 1:00 — **Es la una** (единственное число — только для часа!)
- 2:00 — **Son las dos**; 5:00 — Son las cinco.

Минуты до половины — **y** («и»), после половины — **menos** («без»), считаем от **следующего** часа:
- 3:10 — Son las tres **y diez**
- 3:15 — Son las tres **y cuarto**
- 3:30 — Son las tres **y media**
- 3:45 — Son las cuatro **menos cuarto** (без четверти четыре)
- 3:50 — Son las cuatro **menos diez**

**«В котором часу?»** — **¿A qué hora…?** Ответ с предлогом **a**: **A las** ocho. **A la** una. Ошибка: «En las ocho» — нет, только **a**.

Уточнение: **de la mañana** (утра), **de la tarde** (дня/вечера, до темноты), **de la noche** (вечера, ночи). Son las diez **de la noche**. Полдень — **mediodía**, полночь — **medianoche**.`,
        tables: [
          {
            title: 'Время',
            head: ['', 'по-испански', 'по-русски'],
            rows: [
              ['1:00', 'Es la una', 'Час'],
              ['2:05', 'Son las dos y cinco', 'Пять минут третьего'],
              ['4:15', 'Son las cuatro y cuarto', 'Четверть пятого'],
              ['6:30', 'Son las seis y media', 'Половина седьмого'],
              ['8:40', 'Son las nueve menos veinte', 'Без двадцати девять'],
              ['12:45', 'Es la una menos cuarto', 'Без четверти час'],
            ],
          },
        ],
        examples: [
          { it: '¿Qué hora es? — Son las tres y media.', ru: 'Который час? — Половина четвёртого.', az: 'Saat neçədir? — Üç yarımdır.' },
          { it: 'La clase empieza a las nueve de la mañana.', ru: 'Урок начинается в девять утра.', az: 'Dərs səhər saat doqquzda başlayır.' },
          { it: '¿A qué hora te levantas? — A las siete menos cuarto.', ru: 'Во сколько ты встаёшь? — Без четверти семь.', az: 'Saat neçədə qalxırsan? — Yeddiyə on beş dəqiqə qalmış.' },
        ],
      },
      {
        title: 'Дни недели и части дня',
        text: `Дни недели пишутся **с маленькой буквы** и все мужского рода: **el lunes, el martes, el miércoles, el jueves, el viernes, el sábado, el domingo**.

Мнемоника: дни названы в честь планет — **lunes** — Луна (luna), **martes** — Марс, **miércoles** — Меркурий, **jueves** — Юпитер, **viernes** — Венера. Sábado — «шаббат», domingo — «день Господа».

Самое важное: **«в понедельник» = el lunes** — **без предлога**! Ошибка: «en lunes». А **los lunes** = «по понедельникам» (регулярно). Lunes–viernes во мн. ч. не меняются: los lunes, los viernes; sábado → los sábados.

Части дня с предлогом **por**: **por la mañana** (утром), **por la tarde** (днём/вечером), **por la noche** (вечером, ночью). Но с точным временем — **de**: a las ocho **de** la mañana.

Сегодня, завтра: **hoy, mañana, pasado mañana** (послезавтра), **ayer** (вчера). Обратите внимание: **mañana** = и «завтра», и «утро»; «завтра утром» — **mañana por la mañana**. Выходные — **el fin de semana**.`,
        examples: [
          { it: 'El sábado voy a la playa.', ru: 'В субботу я еду на пляж.', az: 'Şənbə günü çimərliyə gedirəm.' },
          { it: 'Los lunes tengo clase de español.', ru: 'По понедельникам у меня испанский.', az: 'Bazar ertəsi günləri ispan dili dərsim olur.' },
          { it: 'Mañana por la mañana trabajo.', ru: 'Завтра утром я работаю.', az: 'Sabah səhər işləyirəm.' },
        ],
      },
      {
        title: 'Как часто? — frecuencia',
        text: `Шкала от «всегда» до «никогда»:
**siempre** (всегда) → **casi siempre** (почти всегда) → **normalmente / generalmente** (обычно) → **a menudo / muchas veces** (часто) → **a veces** (иногда) → **casi nunca** (почти никогда) → **nunca** (никогда).

**Nunca** перед глаголом — без no: **Nunca** desayuno. После глагола — с no: **No** desayuno **nunca**.

Ещё: **todos los días** (каждый день), **todas las mañanas** (каждое утро), **una vez a la semana** (раз в неделю), **dos veces al mes** (два раза в месяц), **cada día** (каждый день).

Ошибка русскоговорящих: «una vez en la semana». Правильно — **a la semana**, **al mes**, **al año**.`,
        examples: [
          { it: 'Siempre desayuno café con leche.', ru: 'На завтрак я всегда пью кофе с молоком.', az: 'Səhər yeməyində həmişə südlü qəhvə içirəm.' },
          { it: 'A veces voy al gimnasio.', ru: 'Иногда я хожу в спортзал.', az: 'Bəzən idman zalına gedirəm.' },
          { it: 'Voy a la piscina dos veces a la semana.', ru: 'Я хожу в бассейн два раза в неделю.', az: 'Həftədə iki dəfə hovuza gedirəm.' },
        ],
      },
    ],
    drills: [
      { prompt: '1:00 → ___ la una.', answer: 'es', hint: 'Час — единственное число: Es la una.' },
      { prompt: '2:00 → ___ las dos.', answer: 'son', hint: 'С двух часов — Son las…' },
      { prompt: '3:15 → Son las tres y ___', answer: 'cuarto', hint: 'Четверть — cuarto.', also: ['quince'] },
      { prompt: '6:30 → Son las seis y ___', answer: 'media', hint: 'Половина — media.', also: ['treinta'] },
      { prompt: '7:45 → Son las ocho ___ cuarto', answer: 'menos', hint: 'После половины: следующий час + menos.' },
      { prompt: '9:50 → Son las ___ menos diez', answer: 'diez', hint: 'Без десяти ДЕСЯТЬ: las diez menos diez.' },
      { prompt: '12:45 → Es ___ una menos cuarto', answer: 'la', hint: 'Без четверти час → la una.' },
      { prompt: '¿___ qué hora empieza la clase? (предлог)', answer: 'a', hint: '¿A qué hora…? — «в котором часу».' },
      { prompt: 'Empiezo ___ las nueve. (предлог)', answer: 'a', hint: 'a las nueve.' },
      { prompt: 'День после lunes → ___', answer: 'martes', hint: 'lunes, martes, miércoles…' },
      { prompt: 'Среда по-испански', answer: 'miércoles', hint: 'miércoles — с tilde.' },
      { prompt: 'Суббота по-испански', answer: 'sábado', hint: 'sábado — с tilde.' },
      { prompt: 'Переведите: «по воскресеньям» (2 слова)', answer: 'los domingos', hint: 'Регулярно → los + мн. ч.' },
      { prompt: 'Trabajo ___ la mañana. (утром)', answer: 'por', hint: 'Часть дня: por la mañana.' },
      { prompt: 'Son las diez ___ la noche.', answer: 'de', hint: 'С точным временем — de.' },
      { prompt: '«никогда» по-испански', answer: 'nunca', hint: 'nunca.' },
      { prompt: '«иногда» по-испански (2 слова)', answer: 'a veces', hint: 'a veces.' },
      { prompt: '«всегда» по-испански', answer: 'siempre', hint: 'siempre.' },
      { prompt: 'Voy al cine una vez ___ mes.', answer: 'al', hint: 'una vez al mes (a + el).' },
      { prompt: 'Переведите: «завтра утром» (4 слова)', answer: 'mañana por la mañana', hint: 'mañana (завтра) + por la mañana (утром).' },
    ],
  },
];
