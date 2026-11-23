import type { Lesson } from '../types';

// Unit 4 "Verbos irregulares": irregulares en presente y verbos con cambio vocálico.
export const lessons: Lesson[] = [
  {
    id: 'es-u04-irregulares',
    unit: 4,
    title: 'Неправильные глаголы в presente',
    goal: 'Уверенно спрягать ir, hacer, decir, venir, salir, poner, saber, conocer, dar, ver, oír, traer.',
    sections: [
      {
        title: 'Короткие и самые частые: ir, dar, ver',
        text: `**ir** (идти, ехать) — полностью неправильный, но очень простой: все формы начинаются на **v-** и дальше идут окончания -ar: **voy, vas, va, vamos, vais, van**. Мнемоника: «**voy** — я в пути».

**ir a + инфинитив** — ближайшее будущее, как английское going to: **Voy a estudiar** — Я собираюсь учиться. Не забывайте **a**!
Направление — тоже с **a**: Voy **a** Madrid, voy **al** cine (a + el = al).

**dar** (давать): yo **doy**, дальше обычно: das, da, damos, **dais** (без tilde — односложное слово).
**ver** (видеть): yo **veo**, дальше от основы v-: ves, ve, vemos, **veis**, ven.

У dar и ver в vosotros **нет tilde** — dais, veis (как sois у ser).`,
        tables: [
          {
            title: 'ir · dar · ver',
            head: ['', 'ir', 'dar', 'ver'],
            rows: [
              ['yo', 'voy', 'doy', 'veo'],
              ['tú', 'vas', 'das', 'ves'],
              ['él / ella / usted', 'va', 'da', 've'],
              ['nosotros', 'vamos', 'damos', 'vemos'],
              ['vosotros', 'vais', 'dais', 'veis'],
              ['ellos / ellas / ustedes', 'van', 'dan', 'ven'],
            ],
          },
        ],
        examples: [
          { it: 'Voy a la universidad en metro.', ru: 'Я езжу в университет на метро.', az: 'Universitetə metro ilə gedirəm.' },
          { it: 'Esta noche vamos a ver una película.', ru: 'Сегодня вечером мы будем смотреть фильм.', az: 'Bu axşam film izləyəcəyik.' },
          { it: 'Te doy mi número.', ru: 'Даю тебе мой номер.', az: 'Sənə nömrəmi verirəm.' },
        ],
      },
      {
        title: 'Глаголы на -go: hacer, poner, salir, traer',
        text: `Большая группа глаголов неправильна **только в форме yo** — она оканчивается на **-go**. Все остальные формы — как у правильных глаголов!

- hacer → ha**go** (делаю)
- poner → pon**go** (кладу)
- salir → sal**go** (выхожу)
- traer → tra**igo** (приношу) — с лишней **i**
- (и уже знакомый tener → ten**go**)

Мнемоника: пятёрка друзей на -go — **hago, pongo, salgo, traigo, tengo**. Произносите их подряд, как считалку, пока не застрянут в голове.

**hacer** — «делать», но и погода: **Hace** frío / calor / sol (холодно / жарко / солнечно). Ошибка: «Es frío» — так не говорят о погоде.
**salir de** — выходить откуда: Salgo **de** casa a las ocho.`,
        tables: [
          {
            title: 'hacer · poner · salir · traer',
            head: ['', 'hacer', 'poner', 'salir', 'traer'],
            rows: [
              ['yo', 'hago', 'pongo', 'salgo', 'traigo'],
              ['tú', 'haces', 'pones', 'sales', 'traes'],
              ['él / ella / usted', 'hace', 'pone', 'sale', 'trae'],
              ['nosotros', 'hacemos', 'ponemos', 'salimos', 'traemos'],
              ['vosotros', 'hacéis', 'ponéis', 'salís', 'traéis'],
              ['ellos / ellas / ustedes', 'hacen', 'ponen', 'salen', 'traen'],
            ],
          },
        ],
        examples: [
          { it: '¿Qué haces? — Hago los deberes.', ru: 'Что делаешь? — Делаю домашнее задание.', az: 'Nə edirsən? — Ev tapşırığını edirəm.' },
          { it: 'Salgo de casa a las ocho.', ru: 'Я выхожу из дома в восемь.', az: 'Saat səkkizdə evdən çıxıram.' },
          { it: 'Hoy hace mucho calor.', ru: 'Сегодня очень жарко.', az: 'Bu gün çox istidir.' },
        ],
      },
      {
        title: '-go + смена гласной: decir, venir, oír',
        text: `Эти глаголы — «двойные неправильные»: **-go в yo** плюс изменения в других формах.

- **decir** (говорить, сказать): di**go**, и **e → i** в tú, él, ellos: dices, dice, dicen. В nosotros / vosotros — обычная основа: decimos, decís.
- **venir** (приходить): ven**go**, и **e → ie**: vienes, viene, vienen; venimos, venís. Это **близнец tener**: tengo/vengo, tienes/vienes…
- **oír** (слышать): oi**go**, а там, где i оказалась бы между гласными, пишется **y**: oyes, oye, oyen. В nosotros — oímos (с tilde).

Различайте: **venir** — «приходить сюда», **ir** — «идти туда». ¿Vienes a mi casa? — Придёшь ко мне? Voy a tu casa — Я иду к тебе.

Различайте: **decir** — сказать (что-то), **hablar** — разговаривать (на языке, с кем-то).`,
        tables: [
          {
            title: 'decir · venir · oír',
            head: ['', 'decir', 'venir', 'oír'],
            rows: [
              ['yo', 'digo', 'vengo', 'oigo'],
              ['tú', 'dices', 'vienes', 'oyes'],
              ['él / ella / usted', 'dice', 'viene', 'oye'],
              ['nosotros', 'decimos', 'venimos', 'oímos'],
              ['vosotros', 'decís', 'venís', 'oís'],
              ['ellos / ellas / ustedes', 'dicen', 'vienen', 'oyen'],
            ],
          },
        ],
        examples: [
          { it: '¿Qué dices? No te oigo.', ru: 'Что ты говоришь? Я тебя не слышу.', az: 'Nə deyirsən? Səni eşitmirəm.' },
          { it: 'Mis amigos vienen a cenar.', ru: 'Мои друзья приходят на ужин.', az: 'Dostlarım şam yeməyinə gəlirlər.' },
        ],
      },
      {
        title: 'saber и conocer — два «знать»',
        text: `В yo оба глагола неправильные: **sé** (с tilde — чтобы отличить от местоимения se) и **conozco** (-zco). Остальные формы — правильные.

**saber** — знать **факт, информацию** или **уметь** (saber + инфинитив):
- **Sé** dónde vive. — Я знаю, где он живёт.
- **Sé** nadar. — Я умею плавать.

**conocer** — быть **знакомым** с человеком, местом, книгой; знать «по опыту»:
- **Conozco** a Ana. — Я знаю Ану (знаком с ней).
- ¿**Conoces** Madrid? — Ты бывал в Мадриде?

Мнемоника: **saber — в голове, conocer — в лицо**.

Перед человеком после conocer ставится **a**: Conozco **a** tu hermano. Это «личное a» — без него ошибка.

По модели conozco: tradu**zco** (traducir), condu**zco** (conducir), pare**zco** (parecer).`,
        tables: [
          {
            title: 'saber · conocer',
            head: ['', 'saber', 'conocer'],
            rows: [
              ['yo', 'sé', 'conozco'],
              ['tú', 'sabes', 'conoces'],
              ['él / ella / usted', 'sabe', 'conoce'],
              ['nosotros', 'sabemos', 'conocemos'],
              ['vosotros', 'sabéis', 'conocéis'],
              ['ellos / ellas / ustedes', 'saben', 'conocen'],
            ],
          },
        ],
        examples: [
          { it: 'No sé dónde está la estación.', ru: 'Я не знаю, где вокзал.', az: 'Vağzalın harada olduğunu bilmirəm.' },
          { it: '¿Conoces a mi novia?', ru: 'Ты знаком с моей девушкой?', az: 'Sevgilimi tanıyırsan?' },
          { it: 'Mi hermano sabe tocar la guitarra.', ru: 'Мой брат умеет играть на гитаре.', az: 'Qardaşım gitara çalmağı bacarır.' },
        ],
      },
    ],
    drills: [
      { prompt: '(presente) ir · yo', answer: 'voy', hint: 'ir: voy, vas, va…' },
      { prompt: '(presente) ir · nosotros', answer: 'vamos', hint: 'ir · nosotros: vamos.' },
      { prompt: '(presente) ir · vosotros', answer: 'vais', hint: 'vais — без tilde.' },
      { prompt: '(presente) dar · yo', answer: 'doy', hint: 'dar · yo: doy (как voy, soy, estoy).' },
      { prompt: '(presente) ver · yo', answer: 'veo', hint: 'ver · yo: veo.' },
      { prompt: '(presente) hacer · yo', answer: 'hago', hint: 'Глагол на -go: hago.' },
      { prompt: '(presente) poner · yo', answer: 'pongo', hint: 'Глагол на -go: pongo.' },
      { prompt: '(presente) salir · yo', answer: 'salgo', hint: 'Глагол на -go: salgo.' },
      { prompt: '(presente) traer · yo', answer: 'traigo', hint: 'tra-i-go: не забудьте i.' },
      { prompt: '(presente) decir · yo', answer: 'digo', hint: 'decir · yo: digo.' },
      { prompt: '(presente) decir · ellos', answer: 'dicen', hint: 'e → i: dicen.' },
      { prompt: '(presente) venir · yo', answer: 'vengo', hint: 'Как tengo: vengo.' },
      { prompt: '(presente) venir · tú', answer: 'vienes', hint: 'Как tienes: vienes.' },
      { prompt: '(presente) venir · nosotros', answer: 'venimos', hint: 'В nosotros без ie: venimos.' },
      { prompt: '(presente) oír · yo', answer: 'oigo', hint: 'oír · yo: oigo.' },
      { prompt: '(presente) oír · él', answer: 'oye', hint: 'i между гласными → y: oye.' },
      { prompt: '(presente) saber · yo', answer: 'sé', hint: 'saber · yo: sé (с tilde).' },
      { prompt: '(presente) conocer · yo', answer: 'conozco', hint: '-zco: conozco.' },
      { prompt: 'Yo ___ (ir) a la universidad.', answer: 'voy', hint: 'ir · yo: voy.' },
      { prompt: 'Hoy ___ (hacer) mucho frío.', answer: 'hace', hint: 'Погода: hace frío.' },
    ],
  },
  {
    id: 'es-u04-diptongos',
    unit: 4,
    title: 'Глаголы с чередованием: e>ie, o>ue, e>i, u>ue',
    goal: 'Спрягать глаголы, у которых меняется гласная основы: quiero, puedo, pido, juego.',
    sections: [
      {
        title: 'Правило «ботинка»',
        text: `У многих глаголов **ударная гласная основы** раскалывается на две: **e → ie**, **o → ue**. Окончания при этом обычные!

Но меняется гласная **только под ударением** — то есть в yo, tú, él, ellos. В **nosotros и vosotros** ударение уходит на окончание, и основа остаётся как в инфинитиве: qu**ie**ro, но qu**e**remos; p**ue**do, но p**o**demos.

Мнемоника **«ботинок»**: обведите в таблице формы с изменением (yo, tú, él + ellos) — получится контур ботинка. Nosotros и vosotros — снаружи.

Глагол с чередованием по инфинитиву не узнать — **запоминайте по форме yo**: «querer — quiero», «poder — puedo». В словарях часто пишут querer (ie), poder (ue).

**e → ie**: querer (хотеть, любить), pensar (думать), empezar (начинать), preferir (предпочитать), cerrar (закрывать), entender (понимать).`,
        tables: [
          {
            title: 'e → ie: querer · pensar · empezar · preferir',
            head: ['', 'querer', 'pensar', 'empezar', 'preferir'],
            rows: [
              ['yo', 'quiero', 'pienso', 'empiezo', 'prefiero'],
              ['tú', 'quieres', 'piensas', 'empiezas', 'prefieres'],
              ['él / ella / usted', 'quiere', 'piensa', 'empieza', 'prefiere'],
              ['nosotros', 'queremos', 'pensamos', 'empezamos', 'preferimos'],
              ['vosotros', 'queréis', 'pensáis', 'empezáis', 'preferís'],
              ['ellos / ellas / ustedes', 'quieren', 'piensan', 'empiezan', 'prefieren'],
            ],
          },
        ],
        examples: [
          { it: 'Quiero un café, por favor.', ru: 'Я хочу кофе, пожалуйста.', az: 'Bir qəhvə istəyirəm, zəhmət olmasa.' },
          { it: 'La clase empieza a las nueve.', ru: 'Урок начинается в девять.', az: 'Dərs saat doqquzda başlayır.' },
          { it: '¿Preferís té o café?', ru: 'Вы предпочитаете чай или кофе?', az: 'Çay üstün tutursunuz, yoxsa qəhvə?' },
        ],
      },
      {
        title: 'o → ue и u → ue',
        text: `**o → ue**: poder (мочь), dormir (спать), volver (возвращаться), contar (считать, рассказывать), encontrar (находить), costar (стоить), recordar (помнить).

**poder + инфинитив** — мочь: ¿**Puedes** abrir la ventana? — Можешь открыть окно? Это вежливая просьба.
**volver** — вернуться; **volver a + инфинитив** — сделать снова: Vuelvo a leer el libro.
**¿Cuánto cuesta?** — Сколько стоит? (costar → cuesta, cuestan).

**u → ue** — только один глагол: **jugar** (играть): j**ue**go, j**ue**gas… но j**u**gamos. Игра во что — **jugar a**: Juego **al** fútbol. А играть на инструменте — **tocar**: Toco la guitarra. Ошибка русскоговорящих: «juego la guitarra».`,
        tables: [
          {
            title: 'o → ue, u → ue: poder · dormir · volver · contar · jugar',
            head: ['', 'poder', 'dormir', 'volver', 'contar', 'jugar'],
            rows: [
              ['yo', 'puedo', 'duermo', 'vuelvo', 'cuento', 'juego'],
              ['tú', 'puedes', 'duermes', 'vuelves', 'cuentas', 'juegas'],
              ['él / ella / usted', 'puede', 'duerme', 'vuelve', 'cuenta', 'juega'],
              ['nosotros', 'podemos', 'dormimos', 'volvemos', 'contamos', 'jugamos'],
              ['vosotros', 'podéis', 'dormís', 'volvéis', 'contáis', 'jugáis'],
              ['ellos / ellas / ustedes', 'pueden', 'duermen', 'vuelven', 'cuentan', 'juegan'],
            ],
          },
        ],
        examples: [
          { it: '¿Puedo pasar?', ru: 'Можно войти?', az: 'Girə bilərəm?' },
          { it: 'Los fines de semana duermo mucho.', ru: 'По выходным я много сплю.', az: 'Həftə sonları çox yatıram.' },
          { it: 'Mis hermanos juegan al fútbol.', ru: 'Мои братья играют в футбол.', az: 'Qardaşlarım futbol oynayırlar.' },
        ],
      },
      {
        title: 'e → i: pedir, servir, repetir',
        text: `Третий тип — **e → i**. Встречается **только у глаголов на -ir**: pedir (просить, заказывать), servir (подавать, служить), repetir (повторять), seguir (следовать), vestir (одевать).

Схема та же — «ботинок»: p**i**do, p**i**des, p**i**de, p**i**den, но p**e**dimos, p**e**dís.

Различайте **pedir** и **preguntar**: pedir — просить **что-то** (Pido un café — Заказываю кофе), preguntar — спрашивать **информацию** (Pregunto la hora — Спрашиваю время). В русском и то и другое бывает «просить/спрашивать», будьте внимательны.

Полезная фраза на уроке: **¿Puede repetir, por favor?** — Можете повторить, пожалуйста?`,
        tables: [
          {
            title: 'e → i: pedir · servir · repetir',
            head: ['', 'pedir', 'servir', 'repetir'],
            rows: [
              ['yo', 'pido', 'sirvo', 'repito'],
              ['tú', 'pides', 'sirves', 'repites'],
              ['él / ella / usted', 'pide', 'sirve', 'repite'],
              ['nosotros', 'pedimos', 'servimos', 'repetimos'],
              ['vosotros', 'pedís', 'servís', 'repetís'],
              ['ellos / ellas / ustedes', 'piden', 'sirven', 'repiten'],
            ],
          },
        ],
        examples: [
          { it: 'Siempre pido paella en este restaurante.', ru: 'В этом ресторане я всегда заказываю паэлью.', az: 'Bu restoranda həmişə paella sifariş edirəm.' },
          { it: '¿Para qué sirve esto?', ru: 'Для чего это нужно?', az: 'Bu nəyə lazımdır?' },
          { it: 'El profesor repite la pregunta.', ru: 'Преподаватель повторяет вопрос.', az: 'Müəllim sualı təkrarlayır.' },
        ],
      },
    ],
    drills: [
      { prompt: '(presente) querer · yo', answer: 'quiero', hint: 'e → ie: quiero.' },
      { prompt: '(presente) querer · nosotros', answer: 'queremos', hint: 'nosotros — вне «ботинка»: queremos.' },
      { prompt: '(presente) pensar · tú', answer: 'piensas', hint: 'e → ie: piensas.' },
      { prompt: '(presente) empezar · ella', answer: 'empieza', hint: 'e → ie: empieza.' },
      { prompt: '(presente) preferir · ellos', answer: 'prefieren', hint: 'Меняется вторая e (ударная): prefieren.' },
      { prompt: '(presente) preferir · vosotros', answer: 'preferís', hint: 'vosotros — без ie: preferís.' },
      { prompt: '(presente) poder · yo', answer: 'puedo', hint: 'o → ue: puedo.' },
      { prompt: '(presente) poder · nosotros', answer: 'podemos', hint: 'nosotros — без ue: podemos.' },
      { prompt: '(presente) dormir · tú', answer: 'duermes', hint: 'o → ue: duermes.' },
      { prompt: '(presente) volver · ellas', answer: 'vuelven', hint: 'o → ue: vuelven.' },
      { prompt: '(presente) contar · usted', answer: 'cuenta', hint: 'o → ue: cuenta.' },
      { prompt: '(presente) jugar · yo', answer: 'juego', hint: 'u → ue: juego.' },
      { prompt: '(presente) jugar · nosotros', answer: 'jugamos', hint: 'nosotros — без ue: jugamos.' },
      { prompt: '(presente) pedir · yo', answer: 'pido', hint: 'e → i: pido.' },
      { prompt: '(presente) servir · él', answer: 'sirve', hint: 'e → i: sirve.' },
      { prompt: '(presente) repetir · vosotros', answer: 'repetís', hint: 'vosotros — без изменения: repetís.' },
      { prompt: '¿___ (poder) abrir la ventana, por favor? (tú)', answer: 'puedes', hint: 'poder · tú: puedes.' },
      { prompt: 'La película ___ (empezar) a las diez.', answer: 'empieza', hint: 'empezar · ella: empieza.' },
      { prompt: '¿Cuánto ___ (costar) los zapatos?', answer: 'cuestan', hint: 'costar · ellos: cuestan.' },
      { prompt: 'Nosotros ___ (pedir) la cuenta.', answer: 'pedimos', hint: 'nosotros — без изменения: pedimos.' },
    ],
  },
];
