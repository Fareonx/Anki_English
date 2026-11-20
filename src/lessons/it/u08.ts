import type { Lesson } from '../types';

// Unit 8 "Fare la spesa": pronomi diretti, ne, pronomi nei tempi composti e con i modali.
export const lessons: Lesson[] = [
  {
    id: 'u08-diretti',
    unit: 8,
    title: 'Прямые местоимения: lo, la, li, le…',
    goal: 'Заменять прямое дополнение: «Il pane? Lo compro io».',
    sections: [
      {
        title: 'Формы и место в предложении',
        text: `Прямое местоимение отвечает на вопрос **кого? что?** (винительный падеж): «Vedi Marco? — Sì, **lo** vedo» (вижу **его**).

**Место: перед спрягаемым глаголом.** Не «Vedo lo», а «**Lo** vedo». С отрицанием: «Non **lo** vedo» (non → местоимение → глагол).

**lo** — он / это (м.р.), **la** — она (ж.р.), **li** — их (м.р. или смешанная группа), **le** — их (только ж.р.). Вежливое **La** — Вас (и к мужчине, и к женщине): «**La** ringrazio, signore».

Не путайте: **gli** — это не «их» прямое, а «ему/им» (косвенное, будет в уроке 10). «Li vedo» (вижу их), но «Gli parlo» (говорю им).`,
        tables: [
          {
            title: 'Прямые местоимения',
            head: ['лицо', 'местоимение', 'пример'],
            rows: [
              ['io', 'mi', 'Mi senti? — Слышишь меня?'],
              ['tu', 'ti', 'Ti chiamo stasera.'],
              ['lui / это', 'lo', 'Lo conosco.'],
              ['lei', 'la', 'La invito a cena.'],
              ['Lei (Вы)', 'La', 'La aspetto, signora.'],
              ['noi', 'ci', 'Ci vedi?'],
              ['voi', 'vi', 'Vi accompagno a casa.'],
              ['loro (м.р.)', 'li', 'Li compro al mercato.'],
              ['loro (ж.р.)', 'le', 'Le mangio crude.'],
            ],
          },
        ],
        examples: [
          {
            it: 'Il parmigiano? Lo compro sempre al Mercato delle Erbe.',
            ru: 'Пармезан? Я всегда покупаю его на рынке делле Эрбе.',
            az: 'Parmezan? Onu həmişə Erbe bazarından alıram.',
          },
          {
            it: 'Le mele le prendo io, tu prendi le arance.',
            ru: 'Яблоки возьму я, а ты возьми апельсины.',
            az: 'Almaları mən götürürəm, sən portağalları götür.',
          },
          {
            it: 'Conosci Paolo e Marco? — Sì, li conosco bene.',
            ru: 'Знаешь Паоло и Марко? — Да, хорошо их знаю.',
            az: 'Paolo və Markonu tanıyırsan? — Bəli, onları yaxşı tanıyıram.',
          },
        ],
      },
      {
        title: 'Lo so / lo sapevo и элизия',
        text: `**Lo** может заменять целую мысль, как русское «это»: «Domani c'è sciopero. — **Lo so**» (Я знаю это / Знаю). «Non **lo** so» — Не знаю. «**Lo sapevo**!» — Я так и знал! «Chi **l'ha** detto?» — Кто это сказал?

Сравните: по-русски часто говорят просто «Знаю», а итальянец почти всегда добавит **lo**: «Lo so».

**Элизия:** перед гласной или h **lo** и **la** часто превращаются в **l'**: «**L'**aspetto» (жду его/её), «**L'**ho comprato». **li** и **le** **никогда** не сокращаются: «**Li** ho visti», «**Le** ho prese».`,
        examples: [
          {
            it: 'Sai che Giulia si sposa? — Sì, lo so!',
            ru: 'Знаешь, что Джулия выходит замуж? — Да, знаю!',
            az: 'Culiyanın evləndiyini bilirsən? — Bəli, bilirəm!',
          },
          {
            it: 'Il treno è in ritardo. — Lo sapevo!',
            ru: 'Поезд опаздывает. — Я так и знал!',
            az: 'Qatar gecikir. — Bilirdim!',
          },
          {
            it: 'Dov’è Anna? L’aspetto da mezz’ora.',
            ru: 'Где Анна? Я жду её уже полчаса.',
            az: 'Anna haradadır? Yarım saatdır onu gözləyirəm.',
          },
        ],
      },
    ],
    drills: [
      { prompt: 'Compri il pane? — Sì, ___ compro.', answer: 'lo', hint: 'il pane — м.р. ед. → lo' },
      { prompt: 'Mangi la pizza? — Sì, ___ mangio.', answer: 'la', hint: 'la pizza → la' },
      { prompt: 'Prendi i pomodori? — Sì, ___ prendo.', answer: 'li', hint: 'м.р. мн. → li' },
      { prompt: 'Compri le uova? — No, non ___ compro.', answer: 'le', hint: 'le uova — ж.р. мн. → le' },
      { prompt: 'Mi chiami stasera? — Sì, ___ chiamo alle nove.', answer: 'ti', hint: 'тебя → ti' },
      { prompt: 'Ci accompagni alla stazione? — Sì, ___ accompagno.', answer: 'vi', hint: 'вас → vi' },
      { prompt: 'Conosci Marta? — No, non ___ conosco.', answer: 'la', hint: 'Marta → la' },
      { prompt: 'Signor Rossi, ___ ringrazio!', answer: 'La', hint: 'вежливое «Вас» → La' },
      { prompt: 'Domani non c’è lezione. — ___ so!', answer: 'Lo', hint: 'это знаю → lo so' },
      { prompt: 'Sai dov’è la biblioteca? — No, non ___ so.', answer: 'lo', hint: 'non lo so' },
      { prompt: 'Inviti Paolo e Luca? — Sì, ___ invito.', answer: 'li', hint: 'м.р. мн. → li' },
      { prompt: 'Aspetti Giulia? — Sì, ___. (la + aspetto)', answer: "l'aspetto", hint: "la + гласная → l'aspetto" },
      { prompt: 'Leggi il giornale? — Sì, ___ leggo ogni mattina.', answer: 'lo', hint: 'il giornale → lo' },
      { prompt: 'Mamma, ___ senti? (меня)', answer: 'mi', hint: 'меня → mi' },
      { prompt: 'Vedi le ragazze? — Sì, ___ vedo.', answer: 'le', hint: 'ж.р. мн. → le' },
    ],
  },
  {
    id: 'u08-ne',
    unit: 8,
    title: 'Частица ne; ce l’ho, ce n’è',
    goal: 'Говорить о количестве: «Quanti ne vuoi? — Ne prendo due», «Ce l’hai? — Sì, ce l’ho».',
    sections: [
      {
        title: 'Ne = «из этого, этого»',
        text: `**Ne** заменяет существительное, когда говорим о **части** или **количестве**: «Quante mele vuoi? — **Ne** voglio tre» (хочу три **из них**).

Русский часто обходится без этого слова («Хочу три»), а итальянский **требует** ne. Ошибка: «Voglio tre» — неполно. Правильно: «**Ne** voglio tre».

Сравните:
— «Compri **il** latte? — Sì, **lo** compro» (весь, конкретный → lo);
— «Compri **del** latte? — Sì, **ne** compro un litro» (часть → ne).

Ne используется и с отрицанием: «Hai sigarette? — No, non **ne** ho» (= у меня их нет). И с «molto, poco, un po'»: «Ne vuoi un po'?»

Место — как у lo: перед глаголом. В passato prossimo причастие **согласуется** с количеством: «**Ne** ho comprat**e** due (bottiglie)».`,
        examples: [
          {
            it: 'Quanti etti di prosciutto vuole? — Ne vorrei due.',
            ru: 'Сколько граммов ветчины вам? — Мне бы двести.',
            az: 'Neçə yüz qram vetçina istəyirsiniz? — İki yüz qram istərdim.',
          },
          {
            it: 'Quanti fratelli hai? — Ne ho due.',
            ru: 'Сколько у тебя братьев? — Двое.',
            az: 'Neçə qardaşın var? — İki.',
          },
          {
            it: 'Vuoi del vino? — Sì, ne prendo un bicchiere.',
            ru: 'Хочешь вина? — Да, выпью бокал.',
            az: 'Şərab istəyirsən? — Bəli, bir stəkan içərəm.',
          },
        ],
      },
      {
        title: 'Ce l’ho и ce n’è',
        text: `В разговоре **avere** в значении «иметь при себе» почти всегда идёт с **ci**: «Hai la penna? — Sì, **ce l'ho**». Перед lo/la/li/le/ne **ci** превращается в **ce**.

**ce l'ho** (он / она у меня есть), **ce li ho**, **ce le ho**; **non ce l'ho** (у меня нет).

С **c'è / ci sono** + ne: «C'è del latte? — Sì, **ce n'è** un po'». «Quante uova ci sono? — **Ce ne sono** sei». «Non **ce n'è** più» — Больше нет.

Мнемоника: «ci + lo = ce l', ci + ne = ce n'» — **i** превращается в **e**, когда за ним идёт ещё одно местоимение.`,
        tables: [
          {
            title: 'avere + ci',
            head: ['вопрос', 'ответ'],
            rows: [
              ['Hai il biglietto?', "Sì, ce l'ho. / No, non ce l'ho."],
              ['Hai la tessera?', "Sì, ce l'ho."],
              ['Hai i soldi?', 'Sì, ce li ho.'],
              ['Hai le chiavi?', 'Sì, ce le ho.'],
              ["C'è del pane?", "Sì, ce n'è. / No, non ce n'è."],
              ['Quante bottiglie ci sono?', 'Ce ne sono tre.'],
            ],
          },
        ],
        examples: [
          {
            it: 'Hai la tessera della biblioteca? — No, non ce l’ho con me.',
            ru: 'У тебя есть читательский билет? — Нет, у меня его нет с собой.',
            az: 'Kitabxana kartın var? — Xeyr, yanımda deyil.',
          },
          {
            it: 'C’è ancora del caffè? — No, non ce n’è più.',
            ru: 'Кофе ещё есть? — Нет, больше нет.',
            az: 'Hələ qəhvə var? — Xeyr, daha yoxdur.',
          },
        ],
      },
    ],
    drills: [
      { prompt: 'Quante mele vuoi? — ___ voglio tre.', answer: 'Ne', hint: 'количество → ne' },
      { prompt: 'Quanti figli hanno? — ___ hanno due.', answer: 'Ne', hint: 'количество → ne' },
      { prompt: 'Vuoi del formaggio? — Sì, ___ prendo un po’.', answer: 'ne', hint: 'часть → ne' },
      { prompt: 'Hai amici a Bologna? — Sì, ___ ho molti.', answer: 'ne', hint: 'molti → ne' },
      { prompt: 'Hai sigarette? — No, non ___ ho.', answer: 'ne', hint: 'non ne ho = у меня их нет' },
      { prompt: 'Compri il latte? — Sì, ___ compro.', answer: 'lo', hint: 'весь, без количества → lo' },
      { prompt: 'Quante bottiglie hai comprato? — Ne ho ___ (comprare) due.', answer: 'comprate', hint: 'bottiglie — ж.р. мн. → comprate' },
      { prompt: 'Quanti libri hai letto? — Ne ho ___ (leggere) cinque.', answer: 'letti', hint: 'libri — м.р. мн. → letti' },
      { prompt: 'Hai la penna? — Sì, ___.', answer: "ce l'ho", hint: "ci + la + ho → ce l'ho" },
      { prompt: 'Hai il biglietto? — No, non ___.', answer: "ce l'ho", hint: "non ce l'ho" },
      { prompt: 'Hai i documenti? — Sì, ___ ho.', answer: 'ce li', hint: 'м.р. мн. → ce li ho' },
      { prompt: 'Hai le chiavi? — Sì, ___ ho.', answer: 'ce le', hint: 'ж.р. мн. → ce le ho' },
      { prompt: 'C’è del pane? — Sì, ___ un po’.', answer: "ce n'è", hint: "ci + ne + è → ce n'è" },
      { prompt: 'Quante uova ci sono? — ___ sono sei.', answer: 'Ce ne', hint: 'ci + ne + sono → ce ne sono' },
      { prompt: 'C’è ancora birra? — No, non ___ più.', answer: "ce n'è", hint: "non ce n'è più" },
    ],
  },
  {
    id: 'u08-pronomi-composti',
    unit: 8,
    title: 'Местоимения в passato prossimo и с модальными',
    goal: 'Говорить «L’ho vista», «Li ho comprati», «Lo posso fare / Posso farlo».',
    sections: [
      {
        title: 'Согласование причастия',
        text: `В passato prossimo местоимение стоит **перед avere**. **lo** и **la** сокращаются до **l'**: «**L'**ho visto», «**L'**ho vista».

**Главное правило:** если перед avere стоит **lo, la, li, le** — причастие **согласуется** с местоимением, как будто это essere:
— il pane → **l'ho comprato**;
— la pasta → **l'ho comprata**;
— i biscotti → **li ho comprati**;
— le mele → **le ho comprate**.

Зачем? Чтобы после l' было понятно, о ком речь: «L'ho vist**o**» (его) или «L'ho vist**a**» (её).

С **mi, ti, ci, vi** согласование необязательно: «Marco mi ha visto / mi ha vista» (говорит девушка) — оба правильно.

Типичная ошибка: «Le ho comprato» — нужно «Le ho compr**ate**».`,
        tables: [
          {
            title: 'comprare + прямое местоимение',
            head: ['что', 'passato prossimo'],
            rows: [
              ['il pane (м.р. ед.)', "l'ho comprato"],
              ['la frutta (ж.р. ед.)', "l'ho comprata"],
              ['i pomodori (м.р. мн.)', 'li ho comprati'],
              ['le arance (ж.р. мн.)', 'le ho comprate'],
              ['дробно / количество', 'ne ho comprati due / ne ho comprate due'],
            ],
          },
        ],
        examples: [
          {
            it: 'Hai visto Giulia? — Sì, l’ho vista ieri in piazza.',
            ru: 'Ты видел Джулию? — Да, видел её вчера на площади.',
            az: 'Culiyanı görmüsən? — Bəli, dünən meydanda onu gördüm.',
          },
          {
            it: 'Dove sono le chiavi? — Non lo so, le ho perse!',
            ru: 'Где ключи? — Не знаю, я их потерял!',
            az: 'Açarlar haradadır? — Bilmirəm, onları itirmişəm!',
          },
          {
            it: 'I tortellini li abbiamo fatti noi.',
            ru: 'Тортеллини мы сделали сами.',
            az: 'Tortellinini özümüz hazırladıq.',
          },
        ],
      },
      {
        title: 'С модальными глаголами',
        text: `С **volere, potere, dovere, sapere** + инфинитив местоимение можно поставить в **два места** — смысл одинаковый:
1. **перед модальным глаголом:** «**Lo** posso fare»;
2. **приклеить к инфинитиву** (без последней -e): «Posso far**lo**».

Только **не посередине**: «Posso lo fare» — ошибка!

С отрицанием: «Non **lo** voglio vedere» = «Non voglio veder**lo**».

Мнемоника: местоимение — как магнит, прилипает либо к началу (перед глаголом), либо к хвосту инфинитива.`,
        examples: [
          {
            it: 'La spesa la devo fare oggi. = Devo farla oggi.',
            ru: 'Продукты мне нужно купить сегодня.',
            az: 'Bazarlığı bu gün etməliyəm.',
          },
          {
            it: 'Questo libro non lo posso comprare, è troppo caro. = Non posso comprarlo.',
            ru: 'Эту книгу я не могу купить, она слишком дорогая.',
            az: 'Bu kitabı ala bilmirəm, çox bahadır.',
          },
          {
            it: 'Le vuoi vedere? = Vuoi vederle?',
            ru: 'Хочешь их увидеть?',
            az: 'Onları görmək istəyirsən?',
          },
        ],
      },
    ],
    drills: [
      { prompt: 'Hai comprato il pane? — Sì, ___ comprato.', answer: "l'ho", hint: "lo + ho → l'ho" },
      { prompt: 'Hai visto Anna? — Sì, l’ho ___ (vedere).', answer: 'vista', also: ['veduta'], hint: 'Anna — ж.р. → vista' },
      { prompt: 'Hai visto Marco? — Sì, l’ho ___ (vedere).', answer: 'visto', also: ['veduto'], hint: 'Marco — м.р. → visto' },
      { prompt: 'Hai comprato i biscotti? — Sì, ___ ho comprati.', answer: 'li', hint: 'м.р. мн. → li' },
      { prompt: 'Hai comprato i biscotti? — Sì, li ho ___.', answer: 'comprati', hint: 'li → comprati' },
      { prompt: 'Hai preso le mele? — Sì, le ho ___ (prendere).', answer: 'prese', hint: 'le → prese' },
      { prompt: 'Hai mangiato la torta? — Sì, l’ho ___ tutta.', answer: 'mangiata', hint: 'la torta → mangiata' },
      { prompt: 'Hai fatto gli esercizi? — Sì, li ho ___.', answer: 'fatti', hint: 'li → fatti' },
      { prompt: 'Hai letto le email? — No, non ___ ho lette.', answer: 'le', hint: 'ж.р. мн. → le' },
      { prompt: 'Dove hai messo le chiavi? — ___ ho messe nella borsa.', answer: 'Le', hint: 'le chiavi → le' },
      { prompt: 'Hai invitato Paolo e Sara? — Sì, li ho ___.', answer: 'invitati', hint: 'смешанная группа → invitati' },
      { prompt: 'Posso farlo. = ___ posso fare.', answer: 'Lo', hint: 'местоимение перед модальным' },
      { prompt: 'La devo chiamare. = Devo ___.', answer: 'chiamarla', hint: 'приклеиваем к инфинитиву: chiamar-la' },
      { prompt: 'Li vuoi comprare? = Vuoi ___?', answer: 'comprarli', hint: 'comprar-li' },
      { prompt: 'Non voglio vederle. = Non ___ voglio vedere.', answer: 'le', hint: 'le перед модальным' },
      { prompt: 'Il libro? Non ___ posso leggere oggi.', answer: 'lo', hint: 'il libro → lo' },
      { prompt: 'Hai scritto la lettera? — Sì, l’ho ___ (scrivere).', answer: 'scritta', hint: 'la lettera → scritta' },
    ],
  },
];
