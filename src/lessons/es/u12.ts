import type { Lesson } from '../types';

// Unit 12 "Futuro, condicional, imperativo".
export const lessons: Lesson[] = [
  {
    id: 'es-u12-futuro',
    unit: 12,
    title: 'Будущее время — futuro simple (hablaré, tendré, haré)',
    goal: 'Делать прогнозы, обещания и предположения: «Mañana lloverá», «Te llamaré», «Serán las diez».',
    sections: [
      {
        title: 'Правильные глаголы: весь инфинитив + окончание',
        text: `Самое удобное время: берём **инфинитив целиком** и добавляем окончания — **одинаковые для -ar, -er, -ir**:
**-é, -ás, -á, -emos, -éis, -án**.

hablar → **hablaré**, comer → **comeré**, vivir → **viviré**, ir → **iré**, ser → **seré**, estar → **estaré**.

Мнемоника: окончания — это почти глагол **haber** в presente: (h)**e**, (h)**as**, (h)**a**, (h)**emos**, (hab)**éis**, (h)**an**.

Знак ударения есть везде, кроме **nosotros**: hablar**emos**.`,
        tables: [
          {
            title: 'hablar · comer · vivir',
            head: ['', 'hablar', 'comer', 'vivir'],
            rows: [
              ['yo', 'hablaré', 'comeré', 'viviré'],
              ['tú', 'hablarás', 'comerás', 'vivirás'],
              ['él / ella / usted', 'hablará', 'comerá', 'vivirá'],
              ['nosotros', 'hablaremos', 'comeremos', 'viviremos'],
              ['vosotros', 'hablaréis', 'comeréis', 'viviréis'],
              ['ellos / ellas / ustedes', 'hablarán', 'comerán', 'vivirán'],
            ],
          },
        ],
        examples: [
          {
            it: 'Mañana lloverá en el norte del país.',
            ru: 'Завтра на севере страны будет дождь.',
            az: 'Sabah ölkənin şimalında yağış yağacaq.',
          },
          {
            it: 'Te prometo que estudiaré más.',
            ru: 'Обещаю тебе, что буду больше заниматься.',
            az: 'Sənə söz verirəm ki, daha çox oxuyacağam.',
          },
        ],
      },
      {
        title: 'Неправильные: меняется только основа',
        text: `Окончания те же, меняется **основа**. Три группы:

**1. Гласная → d**: tener → **tendr-**, poner → **pondr-**, salir → **saldr-**, venir → **vendr-**.
**2. Выпадает e**: poder → **podr-**, saber → **sabr-**, querer → **querr-** (два r!). Также haber → habr-.
**3. Особые**: hacer → **har-**, decir → **dir-**.

Мнемоника: группа 1 — «**ТеПо-СаВе с буквой D**» (tener, poner, salir, venir); группа 2 — «**ПоСаКе потеряли E**» (poder, saber, querer).

Эти же основы понадобятся в condicional (следующий урок) — учите один раз, используйте дважды!`,
        tables: [
          {
            title: 'tener · poner · salir · venir',
            head: ['', 'tener', 'poner', 'salir', 'venir'],
            rows: [
              ['yo', 'tendré', 'pondré', 'saldré', 'vendré'],
              ['tú', 'tendrás', 'pondrás', 'saldrás', 'vendrás'],
              ['él / ella / usted', 'tendrá', 'pondrá', 'saldrá', 'vendrá'],
              ['nosotros', 'tendremos', 'pondremos', 'saldremos', 'vendremos'],
              ['vosotros', 'tendréis', 'pondréis', 'saldréis', 'vendréis'],
              ['ellos / ellas / ustedes', 'tendrán', 'pondrán', 'saldrán', 'vendrán'],
            ],
          },
          {
            title: 'poder · saber · querer',
            head: ['', 'poder', 'saber', 'querer'],
            rows: [
              ['yo', 'podré', 'sabré', 'querré'],
              ['tú', 'podrás', 'sabrás', 'querrás'],
              ['él / ella / usted', 'podrá', 'sabrá', 'querrá'],
              ['nosotros', 'podremos', 'sabremos', 'querremos'],
              ['vosotros', 'podréis', 'sabréis', 'querréis'],
              ['ellos / ellas / ustedes', 'podrán', 'sabrán', 'querrán'],
            ],
          },
          {
            title: 'hacer · decir',
            head: ['', 'hacer', 'decir'],
            rows: [
              ['yo', 'haré', 'diré'],
              ['tú', 'harás', 'dirás'],
              ['él / ella / usted', 'hará', 'dirá'],
              ['nosotros', 'haremos', 'diremos'],
              ['vosotros', 'haréis', 'diréis'],
              ['ellos / ellas / ustedes', 'harán', 'dirán'],
            ],
          },
        ],
        examples: [
          {
            it: 'El año que viene tendré más tiempo libre.',
            ru: 'В следующем году у меня будет больше свободного времени.',
            az: 'Gələn il daha çox boş vaxtım olacaq.',
          },
          {
            it: '¿Podrás venir a mi fiesta?',
            ru: 'Ты сможешь прийти на мой праздник?',
            az: 'Mənim ziyafətimə gələ biləcəksən?',
          },
          {
            it: 'No te preocupes, lo haremos juntos.',
            ru: 'Не волнуйся, мы сделаем это вместе.',
            az: 'Narahat olma, bunu birlikdə edəcəyik.',
          },
        ],
      },
      {
        title: 'Futuro или ir a? И предположения',
        text: `**ir a + инфинитив** — план, намерение, «уже решил»: **Voy a comprar** un coche (уже выбрал).
**futuro** — прогноз, обещание, далёкое или неопределённое будущее: Algún día **compraré** un coche.
В разговоре испанцы чаще говорят **ir a**; futuro звучит чуть формальнее.

**Предположение о настоящем**: futuro = «наверное, должно быть»:
¿Dónde está Ana? — **Estará** en casa. (Наверное, дома.) ¿Qué hora es? — **Serán** las diez.

Ловушка: после **si** («если») — **presente**, не futuro! **Si llueve**, me quedaré en casa. («Si lloverá» ✗)

Слова: **mañana**, **pasado mañana**, **la próxima semana**, **el año que viene**, **dentro de dos días** (через два дня), **pronto**, **algún día**.`,
        examples: [
          {
            it: 'Si tengo tiempo, te llamaré esta noche.',
            ru: 'Если будет время, я позвоню тебе сегодня вечером.',
            az: 'Vaxtım olsa, bu axşam sənə zəng edəcəyəm.',
          },
          {
            it: 'No contesta al teléfono; estará durmiendo.',
            ru: 'Не отвечает на телефон — наверное, спит.',
            az: 'Telefona cavab vermir; yəqin ki, yatır.',
          },
        ],
      },
    ],
    drills: [
      { prompt: '(futuro) hablar · yo', answer: 'hablaré', hint: 'Инфинитив + -é.' },
      { prompt: '(futuro) comer · tú', answer: 'comerás', hint: 'Инфинитив + -ás.' },
      { prompt: '(futuro) vivir · ellos', answer: 'vivirán', hint: 'Инфинитив + -án.' },
      { prompt: '(futuro) estudiar · nosotros', answer: 'estudiaremos', hint: 'Инфинитив + -emos (без знака).' },
      { prompt: '(futuro) ir · vosotros', answer: 'iréis', hint: 'ir + -éis.' },
      { prompt: '(futuro) ser · él', answer: 'será', hint: 'ser + -á.' },
      { prompt: '(futuro) tener · yo', answer: 'tendré', hint: 'Основа tendr-.' },
      { prompt: '(futuro) hacer · nosotros', answer: 'haremos', hint: 'Основа har-.' },
      { prompt: '(futuro) poder · tú', answer: 'podrás', hint: 'Основа podr- (выпала e).' },
      { prompt: '(futuro) salir · ella', answer: 'saldrá', hint: 'Основа saldr-.' },
      { prompt: '(futuro) venir · ellos', answer: 'vendrán', hint: 'Основа vendr-.' },
      { prompt: '(futuro) decir · yo', answer: 'diré', hint: 'Основа dir-.' },
      { prompt: '(futuro) querer · vosotros', answer: 'querréis', hint: 'Основа querr- (два r).' },
      { prompt: '(futuro) saber · usted', answer: 'sabrá', hint: 'Основа sabr-.' },
      { prompt: '(futuro) poner · nosotros', answer: 'pondremos', hint: 'Основа pondr-.' },
      { prompt: 'Mañana ___ (llover) en el norte.', answer: 'lloverá', hint: 'Прогноз: llover + -á.' },
      { prompt: 'Si tengo tiempo, te ___ (yo, llamar).', answer: 'llamaré', hint: 'Если…, то futuro: llamaré.' },
      { prompt: '¿Dónde está Ana? — No sé, ___ (estar) en casa.', answer: 'estará', hint: 'Предположение → futuro.' },
      { prompt: 'El año que viene ___ (yo, hacer) un curso de español.', answer: 'haré', hint: 'hacer → har- + -é.' },
    ],
  },
  {
    id: 'es-u12-condicional',
    unit: 12,
    title: 'Condicional — hablaría, podría, me gustaría',
    goal: 'Вежливо просить, советовать и мечтать: «¿Podría ayudarme?», «Deberías descansar», «Me gustaría ir a Cuba».',
    sections: [
      {
        title: 'Формы: инфинитив + -ía',
        text: `**Condicional** = русское «**бы**»: hablaría — я бы говорил.

Как futuro: **весь инфинитив** + окончания **-ía, -ías, -ía, -íamos, -íais, -ían** (одинаковые для всех спряжений).
hablar → **hablaría**, comer → **comería**, vivir → **viviría**.

Окончания — те же, что у imperfecto глаголов на -er (comía), но **приклеиваются к инфинитиву**:
com**ía** (ел) — comer**ía** (ел бы).

**Неправильные основы — точно как в futuro**: tendr-, pondr-, saldr-, vendr-, podr-, sabr-, querr-, har-, dir-.
tendré → **tendría**, haré → **haría**, podré → **podría**.`,
        tables: [
          {
            title: 'hablar · comer · vivir',
            head: ['', 'hablar', 'comer', 'vivir'],
            rows: [
              ['yo', 'hablaría', 'comería', 'viviría'],
              ['tú', 'hablarías', 'comerías', 'vivirías'],
              ['él / ella / usted', 'hablaría', 'comería', 'viviría'],
              ['nosotros', 'hablaríamos', 'comeríamos', 'viviríamos'],
              ['vosotros', 'hablaríais', 'comeríais', 'viviríais'],
              ['ellos / ellas / ustedes', 'hablarían', 'comerían', 'vivirían'],
            ],
          },
          {
            title: 'tener · poner · salir · venir',
            head: ['', 'tener', 'poner', 'salir', 'venir'],
            rows: [
              ['yo', 'tendría', 'pondría', 'saldría', 'vendría'],
              ['tú', 'tendrías', 'pondrías', 'saldrías', 'vendrías'],
              ['él / ella / usted', 'tendría', 'pondría', 'saldría', 'vendría'],
              ['nosotros', 'tendríamos', 'pondríamos', 'saldríamos', 'vendríamos'],
              ['vosotros', 'tendríais', 'pondríais', 'saldríais', 'vendríais'],
              ['ellos / ellas / ustedes', 'tendrían', 'pondrían', 'saldrían', 'vendrían'],
            ],
          },
          {
            title: 'poder · saber · querer · hacer · decir',
            head: ['', 'poder', 'saber', 'querer', 'hacer', 'decir'],
            rows: [
              ['yo', 'podría', 'sabría', 'querría', 'haría', 'diría'],
              ['tú', 'podrías', 'sabrías', 'querrías', 'harías', 'dirías'],
              ['él / ella / usted', 'podría', 'sabría', 'querría', 'haría', 'diría'],
              ['nosotros', 'podríamos', 'sabríamos', 'querríamos', 'haríamos', 'diríamos'],
              ['vosotros', 'podríais', 'sabríais', 'querríais', 'haríais', 'diríais'],
              ['ellos / ellas / ustedes', 'podrían', 'sabrían', 'querrían', 'harían', 'dirían'],
            ],
          },
        ],
        examples: [
          {
            it: 'Con más dinero, viajaría por todo el mundo.',
            ru: 'Будь у меня больше денег, я бы путешествовал по всему миру.',
            az: 'Daha çox pulum olsaydı, bütün dünyanı gəzərdim.',
          },
          {
            it: 'Yo no diría eso.',
            ru: 'Я бы так не сказал.',
            az: 'Mən bunu deməzdim.',
          },
        ],
      },
      {
        title: 'Вежливость и советы',
        text: `**Вежливая просьба**: **¿Podría** ayudarme? — Не могли бы вы мне помочь? **¿Podrías** abrir la ventana?
**Желание**: **Me gustaría** un café. — Я бы хотел кофе. (gustaría — одна форма для одной вещи, **gustarían** — для нескольких: Me gustarían dos entradas.)
Сравните: «Quiero un café» звучит резко, «**Querría** / **Me gustaría** un café» — вежливо.

**Совет**: **Deberías** descansar. — Тебе стоило бы отдохнуть. **Yo que tú**, iría al médico. — На твоём месте я бы пошёл к врачу. **Yo en tu lugar**, no lo **compraría**.

**Будущее в прошлом**: Dijo que **vendría**. — Он сказал, что придёт.

Совет: фраза **«¿Podría…?»** — ваш волшебный ключ в магазине, банке и ресторане.`,
        examples: [
          {
            it: '¿Podría decirme dónde está la estación?',
            ru: 'Не могли бы вы сказать, где вокзал?',
            az: 'Vağzalın harada olduğunu deyə bilərsinizmi?',
          },
          {
            it: 'Me gustaría reservar una mesa para dos.',
            ru: 'Я бы хотел забронировать столик на двоих.',
            az: 'İki nəfərlik masa sifariş etmək istərdim.',
          },
          {
            it: 'Estás muy cansado; deberías dormir más.',
            ru: 'Ты очень устал, тебе стоило бы больше спать.',
            az: 'Çox yorğunsan; daha çox yatmalısan.',
          },
        ],
      },
    ],
    drills: [
      { prompt: '(condicional) hablar · yo', answer: 'hablaría', hint: 'Инфинитив + -ía.' },
      { prompt: '(condicional) comer · tú', answer: 'comerías', hint: 'Инфинитив + -ías.' },
      { prompt: '(condicional) vivir · nosotros', answer: 'viviríamos', hint: 'Инфинитив + -íamos.' },
      { prompt: '(condicional) ir · ellos', answer: 'irían', hint: 'ir + -ían.' },
      { prompt: '(condicional) ser · vosotros', answer: 'seríais', hint: 'ser + -íais.' },
      { prompt: '(condicional) tener · él', answer: 'tendría', hint: 'Основа tendr- (как в futuro).' },
      { prompt: '(condicional) hacer · yo', answer: 'haría', hint: 'Основа har-.' },
      { prompt: '(condicional) poder · usted', answer: 'podría', hint: 'Основа podr-.' },
      { prompt: '(condicional) decir · tú', answer: 'dirías', hint: 'Основа dir-.' },
      { prompt: '(condicional) salir · nosotros', answer: 'saldríamos', hint: 'Основа saldr-.' },
      { prompt: '(condicional) venir · ellas', answer: 'vendrían', hint: 'Основа vendr-.' },
      { prompt: '(condicional) querer · yo', answer: 'querría', hint: 'Основа querr- (два r).' },
      { prompt: '(condicional) saber · ella', answer: 'sabría', hint: 'Основа sabr-.' },
      { prompt: '(condicional) poner · vosotros', answer: 'pondríais', hint: 'Основа pondr-.' },
      { prompt: '¿___ (usted, poder) cerrar la ventana, por favor?', answer: 'podría', hint: 'Вежливая просьба: podría.' },
      { prompt: 'Me ___ (gustar) visitar Granada.', answer: 'gustaría', hint: '«Я бы хотел» — me gustaría.' },
      { prompt: 'Estás cansado. ___ (tú, deber) dormir más.', answer: 'deberías', hint: 'Совет: deberías.' },
      { prompt: 'Yo que tú, no ___ (comprar) ese coche.', answer: 'compraría', hint: '«На твоём месте я бы…» — condicional.' },
      { prompt: 'Con más tiempo, ___ (nosotros, aprender) chino.', answer: 'aprenderíamos', hint: 'aprender + -íamos.' },
    ],
  },
  {
    id: 'es-u12-imperativo',
    unit: 12,
    title: 'Повелительное наклонение — imperativo (habla, ven, no hables, dímelo)',
    goal: 'Просить, советовать и давать инструкции: «Ven aquí», «No hables tan rápido», «Siéntese, por favor».',
    sections: [
      {
        title: 'Утвердительный: tú, vosotros, usted',
        text: `**tú** — как форма **él** в presente: habla, come, escribe. Изменения основы сохраняются: c**ie**rra, d**ue**rme, p**i**de.
**vosotros** — инфинитив, **r → d**: habla**d**, come**d**, escribi**d**. (Без исключений!)
**usted / ustedes** — «**гласная наоборот**»: у -ar → **-e**, у -er/-ir → **-a**: habl**e**, habl**en**; com**a**, com**an**; escrib**a**, escrib**an**.

Для usted берём основу формы **yo** в presente: teng**o** → **tenga**, hag**o** → **haga**, dig**o** → **diga**, pong**o** → **ponga**, salg**o** → **salga**, veng**o** → **venga**, cierr**o** → **cierre**.
Особые: ir → **vaya**, ser → **sea**.

Мнемоника: **usted «меняет гласную» — как вежливый человек меняет тон**.`,
        tables: [
          {
            title: 'hablar · comer · escribir',
            head: ['', 'hablar', 'comer', 'escribir'],
            rows: [
              ['tú', 'habla', 'come', 'escribe'],
              ['usted', 'hable', 'coma', 'escriba'],
              ['vosotros', 'hablad', 'comed', 'escribid'],
              ['ustedes', 'hablen', 'coman', 'escriban'],
            ],
          },
          {
            title: 'cerrar · dormir · pedir',
            head: ['', 'cerrar', 'dormir', 'pedir'],
            rows: [
              ['tú', 'cierra', 'duerme', 'pide'],
              ['usted', 'cierre', 'duerma', 'pida'],
              ['vosotros', 'cerrad', 'dormid', 'pedid'],
              ['ustedes', 'cierren', 'duerman', 'pidan'],
            ],
          },
        ],
        examples: [
          {
            it: 'Habla más despacio, por favor.',
            ru: 'Говори медленнее, пожалуйста.',
            az: 'Zəhmət olmasa, daha yavaş danış.',
          },
          {
            it: 'Abran el libro en la página diez.',
            ru: 'Откройте книгу на десятой странице.',
            az: 'Kitabı onuncu səhifədə açın.',
          },
          {
            it: 'Chicos, escuchad con atención.',
            ru: 'Ребята, слушайте внимательно.',
            az: 'Uşaqlar, diqqətlə qulaq asın.',
          },
        ],
      },
      {
        title: 'Восемь неправильных для tú',
        text: `Короткие формы для **tú** — выучите как скороговорку:
**ven** (venir), **di** (decir), **sal** (salir), **haz** (hacer), **ten** (tener), **ve** (ir), **pon** (poner), **sé** (ser).

Мнемоника: «**Ven, di, sal, haz, ten, ve, pon, sé**» — «Приди, скажи, выйди, сделай, держи, иди, положи, будь».

**sé** (будь) пишется со знаком ударения, чтобы не путать с местоимением se. **ve** (иди) = ve (видит), различаем по смыслу.
Формы **vosotros** у них правильные: venid, decid, salid, haced, tened, **id**, poned, sed.`,
        tables: [
          {
            title: 'venir · hacer · decir · poner',
            head: ['', 'venir', 'hacer', 'decir', 'poner'],
            rows: [
              ['tú', 'ven', 'haz', 'di', 'pon'],
              ['usted', 'venga', 'haga', 'diga', 'ponga'],
              ['vosotros', 'venid', 'haced', 'decid', 'poned'],
              ['ustedes', 'vengan', 'hagan', 'digan', 'pongan'],
            ],
          },
          {
            title: 'salir · ser · tener · ir',
            head: ['', 'salir', 'ser', 'tener', 'ir'],
            rows: [
              ['tú', 'sal', 'sé', 'ten', 've'],
              ['usted', 'salga', 'sea', 'tenga', 'vaya'],
              ['vosotros', 'salid', 'sed', 'tened', 'id'],
              ['ustedes', 'salgan', 'sean', 'tengan', 'vayan'],
            ],
          },
        ],
        examples: [
          {
            it: '¡Ven aquí y haz los deberes!',
            ru: 'Иди сюда и сделай домашнее задание!',
            az: 'Bura gəl və ev tapşırığını et!',
          },
          {
            it: 'Ten cuidado, la sopa está caliente.',
            ru: 'Осторожно, суп горячий.',
            az: 'Ehtiyatlı ol, şorba istidir.',
          },
          {
            it: 'Sé bueno y pon la mesa.',
            ru: 'Будь добр, накрой на стол.',
            az: 'Yaxşı ol və süfrəni aç.',
          },
        ],
      },
      {
        title: 'Отрицательный: no hables',
        text: `Для запрета **все лица** берём из формы **usted** (гласная «наоборот») и добавляем окончания:
**no + usted-форма + s** для tú: hable → **no hables**, coma → **no comas**, venga → **no vengas**, vaya → **no vayas**.
vosotros: **-éis / -áis**: **no habléis**, **no comáis**, **no escribáis**, **no vengáis**.

Ошибка русскоговорящих: «No habla!» ✗ (это «он не говорит»). Правильно: **¡No hables!**
Также «No ven» ✗ → **No vengas**, «No haz» ✗ → **No hagas**.

Орфография: tocar → **no toques**, llegar → **no llegues** (чтобы сохранить звук).`,
        tables: [
          {
            title: 'no + hablar · comer · escribir',
            head: ['', 'hablar', 'comer', 'escribir'],
            rows: [
              ['tú', 'no hables', 'no comas', 'no escribas'],
              ['usted', 'no hable', 'no coma', 'no escriba'],
              ['vosotros', 'no habléis', 'no comáis', 'no escribáis'],
              ['ustedes', 'no hablen', 'no coman', 'no escriban'],
            ],
          },
          {
            title: 'no + venir · hacer · decir · poner',
            head: ['', 'venir', 'hacer', 'decir', 'poner'],
            rows: [
              ['tú', 'no vengas', 'no hagas', 'no digas', 'no pongas'],
              ['usted', 'no venga', 'no haga', 'no diga', 'no ponga'],
              ['vosotros', 'no vengáis', 'no hagáis', 'no digáis', 'no pongáis'],
              ['ustedes', 'no vengan', 'no hagan', 'no digan', 'no pongan'],
            ],
          },
          {
            title: 'no + salir · ser · tener · ir',
            head: ['', 'salir', 'ser', 'tener', 'ir'],
            rows: [
              ['tú', 'no salgas', 'no seas', 'no tengas', 'no vayas'],
              ['usted', 'no salga', 'no sea', 'no tenga', 'no vaya'],
              ['vosotros', 'no salgáis', 'no seáis', 'no tengáis', 'no vayáis'],
              ['ustedes', 'no salgan', 'no sean', 'no tengan', 'no vayan'],
            ],
          },
        ],
        examples: [
          {
            it: 'No hables tan alto, el bebé está durmiendo.',
            ru: 'Не говори так громко, малыш спит.',
            az: 'Bu qədər bərkdən danışma, körpə yatır.',
          },
          {
            it: 'No te preocupes, todo va a salir bien.',
            ru: 'Не волнуйся, всё будет хорошо.',
            az: 'Narahat olma, hər şey yaxşı olacaq.',
          },
        ],
      },
      {
        title: 'С местоимениями: dímelo, levántate, no te levantes',
        text: `**Утвердительный** — местоимения **приклеиваются в конец**: di + me + lo → **dímelo**, compra + lo → **cómpralo**, levanta + te → **levántate**.
Ударение остаётся на прежнем слоге — поэтому часто нужен **знак**: **siéntate**, **escúchame**, **dámelo**.
Без знака — если глагол из одного слога + одно местоимение: **dime**, **hazlo**, **ponte**, **dame**.

**Отрицательный** — местоимения **перед глаголом**, как обычно: **No me lo digas.** **No te levantes.** **No lo compres.**

Особенности возвратных:
- vosotros теряет **d** перед os: levantad + os → **levantaos**, sentad + os → **sentaos**.
- usted: **siéntese**, **levántese**.`,
        tables: [
          {
            title: 'levantarse',
            head: ['', 'да', 'нет'],
            rows: [
              ['tú', 'levántate', 'no te levantes'],
              ['usted', 'levántese', 'no se levante'],
              ['vosotros', 'levantaos', 'no os levantéis'],
              ['ustedes', 'levántense', 'no se levanten'],
            ],
          },
        ],
        examples: [
          {
            it: '¿Qué ha pasado? ¡Dímelo!',
            ru: 'Что случилось? Скажи мне!',
            az: 'Nə olub? Mənə de!',
          },
          {
            it: 'Siéntese, por favor. El doctor viene enseguida.',
            ru: 'Садитесь, пожалуйста. Доктор сейчас придёт.',
            az: 'Zəhmət olmasa, oturun. Həkim indi gələcək.',
          },
          {
            it: 'Levántate, ¡son las ocho! — No me lo digas…',
            ru: 'Вставай, уже восемь! — Только не говори мне это…',
            az: 'Qalx, saat səkkizdir! — Bunu mənə demə…',
          },
        ],
      },
    ],
    drills: [
      { prompt: '(imperativo) hablar · tú', answer: 'habla', hint: 'tú = форма él в presente.' },
      { prompt: '(imperativo) cerrar · tú', answer: 'cierra', hint: 'Изменение основы сохраняется: cierra.' },
      { prompt: '(imperativo) escribir · vosotros', answer: 'escribid', hint: 'vosotros: r → d.' },
      { prompt: '(imperativo) hablar · usted', answer: 'hable', hint: '-ar → -e.' },
      { prompt: '(imperativo) abrir · ustedes', answer: 'abran', hint: '-ir → -an.' },
      { prompt: '(imperativo) venir · tú', answer: 'ven', hint: 'Короткая форма: ven.' },
      { prompt: '(imperativo) hacer · tú', answer: 'haz', hint: 'Короткая форма: haz.' },
      { prompt: '(imperativo) decir · tú', answer: 'di', hint: 'Короткая форма: di.' },
      { prompt: '(imperativo) poner · tú', answer: 'pon', hint: 'Короткая форма: pon.' },
      { prompt: '(imperativo) salir · tú', answer: 'sal', hint: 'Короткая форма: sal.' },
      { prompt: '(imperativo) ser · tú', answer: 'sé', hint: 'sé — со знаком ударения.' },
      { prompt: '(imperativo) ir · tú', answer: 've', hint: 'ir → ve.' },
      { prompt: '(imperativo) tener · usted', answer: 'tenga', hint: 'От yo tengo → tenga.' },
      { prompt: '(negativo) hablar · tú', answer: 'no hables', hint: 'no + hable + s.' },
      { prompt: '(negativo) ir · tú', answer: 'no vayas', hint: 'ir → vaya → no vayas.' },
      { prompt: '(negativo) hacer · vosotros', answer: 'no hagáis', hint: 'haga → no hagáis.' },
      { prompt: '¡No ___ (tú, tocar) eso!', answer: 'toques', hint: 'c → qu: no toques.' },
      { prompt: 'di + me + lo → одним словом', answer: 'dímelo', hint: 'Приклеиваем и ставим знак: dímelo.' },
      { prompt: '(imperativo) levantarse · tú', answer: 'levántate', hint: 'levanta + te, ударение на á.' },
      { prompt: '(imperativo) sentarse · usted', answer: 'siéntese', hint: 'siente + se, ударение на ié.' },
    ],
  },
];
