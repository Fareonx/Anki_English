-- Every new student starts with the beginner course «1. Начало A1»: 14 days x 20 words
-- (source: content/a1-start/*.csv) and a limit of 20 new words a day.
-- The words live in public.starter_words; each student gets their own copy at sign-up.

create table public.starter_words (
  position int primary key,
  day int not null,
  topic text not null,
  word text not null,
  translation_ru text not null,
  translation_az text not null,
  example text not null default '',
  ipa text not null default '',
  pos text not null default ''
);
-- Read only by the security definer function below.
alter table public.starter_words enable row level security;

insert into public.starter_words (position, day, topic, word, translation_ru, translation_az, example, ipa, pos) values
  (1, 1, 'Приветствие и люди', 'hello', 'привет, здравствуйте', 'salam', 'Hello! How are you?', '/həˈləʊ/', 'exclamation'),
  (2, 1, 'Приветствие и люди', 'goodbye', 'до свидания, пока', 'sağ ol, hələlik', 'Goodbye! See you tomorrow.', '/ˌɡʊdˈbaɪ/', 'exclamation'),
  (3, 1, 'Приветствие и люди', 'please', 'пожалуйста (просьба)', 'zəhmət olmasa, xahiş edirəm', 'Water, please.', '/pliːz/', 'adverb'),
  (4, 1, 'Приветствие и люди', 'thank you', 'спасибо', 'təşəkkür edirəm, sağ ol', 'Thank you for your help.', '/ˈθæŋk juː/', 'phrase'),
  (5, 1, 'Приветствие и люди', 'yes', 'да', 'bəli, hə', 'Yes, I am a student.', '/jes/', 'adverb'),
  (6, 1, 'Приветствие и люди', 'no', 'нет', 'xeyr, yox', 'No, I am not tired.', '/nəʊ/', 'adverb'),
  (7, 1, 'Приветствие и люди', 'sorry', 'извините, простите', 'bağışlayın, üzr istəyirəm', 'Sorry, I am late.', '/ˈsɒri/', 'adjective'),
  (8, 1, 'Приветствие и люди', 'name', 'имя', 'ad', 'My name is Deniz.', '/neɪm/', 'noun'),
  (9, 1, 'Приветствие и люди', 'man', 'мужчина', 'kişi', 'The man is my teacher.', '/mæn/', 'noun'),
  (10, 1, 'Приветствие и люди', 'woman', 'женщина', 'qadın', 'The woman has a red bag.', '/ˈwʊmən/', 'noun'),
  (11, 1, 'Приветствие и люди', 'boy', 'мальчик', 'oğlan', 'The boy is ten years old.', '/bɔɪ/', 'noun'),
  (12, 1, 'Приветствие и люди', 'girl', 'девочка, девушка', 'qız', 'The girl is my sister.', '/ɡɜːl/', 'noun'),
  (13, 1, 'Приветствие и люди', 'child', 'ребёнок', 'uşaq', 'The child is sleeping.', '/tʃaɪld/', 'noun'),
  (14, 1, 'Приветствие и люди', 'baby', 'младенец, малыш', 'körpə', 'The baby is very small.', '/ˈbeɪbi/', 'noun'),
  (15, 1, 'Приветствие и люди', 'friend', 'друг, подруга', 'dost', 'She is my best friend.', '/frend/', 'noun'),
  (16, 1, 'Приветствие и люди', 'person', 'человек', 'insan, şəxs', 'He is a good person.', '/ˈpɜːsn/', 'noun'),
  (17, 1, 'Приветствие и люди', 'people', 'люди', 'insanlar', 'Many people live in Baku.', '/ˈpiːpl/', 'noun'),
  (18, 1, 'Приветствие и люди', 'teacher', 'учитель', 'müəllim', 'Our teacher is very kind.', '/ˈtiːtʃə(r)/', 'noun'),
  (19, 1, 'Приветствие и люди', 'student', 'студент, ученик', 'tələbə, şagird', 'I am a student.', '/ˈstjuːdnt/', 'noun'),
  (20, 1, 'Приветствие и люди', 'welcome', 'добро пожаловать', 'xoş gəlmisiniz', 'Welcome to our home!', '/ˈwelkəm/', 'exclamation'),
  (21, 2, 'Семья', 'family', 'семья', 'ailə', 'I love my family.', '/ˈfæməli/', 'noun'),
  (22, 2, 'Семья', 'mother', 'мама, мать', 'ana', 'My mother is a doctor.', '/ˈmʌðə(r)/', 'noun'),
  (23, 2, 'Семья', 'father', 'папа, отец', 'ata', 'My father works in a bank.', '/ˈfɑːðə(r)/', 'noun'),
  (24, 2, 'Семья', 'parents', 'родители', 'valideynlər', 'My parents live in Baku.', '/ˈpeərənts/', 'noun'),
  (25, 2, 'Семья', 'brother', 'брат', 'qardaş', 'I have one brother.', '/ˈbrʌðə(r)/', 'noun'),
  (26, 2, 'Семья', 'sister', 'сестра', 'bacı', 'My sister is twelve.', '/ˈsɪstə(r)/', 'noun'),
  (27, 2, 'Семья', 'son', 'сын', 'oğul', 'Their son is a student.', '/sʌn/', 'noun'),
  (28, 2, 'Семья', 'daughter', 'дочь', 'qız (övlad)', 'She has a little daughter.', '/ˈdɔːtə(r)/', 'noun'),
  (29, 2, 'Семья', 'husband', 'муж', 'ər', 'Her husband is a driver.', '/ˈhʌzbənd/', 'noun'),
  (30, 2, 'Семья', 'wife', 'жена', 'arvad, həyat yoldaşı', 'His wife is a teacher.', '/waɪf/', 'noun'),
  (31, 2, 'Семья', 'grandmother', 'бабушка', 'nənə', 'My grandmother makes good bread.', '/ˈɡrænmʌðə(r)/', 'noun'),
  (32, 2, 'Семья', 'grandfather', 'дедушка', 'baba', 'My grandfather is eighty.', '/ˈɡrænfɑːðə(r)/', 'noun'),
  (33, 2, 'Семья', 'uncle', 'дядя', 'əmi, dayı', 'My uncle has a big car.', '/ˈʌŋkl/', 'noun'),
  (34, 2, 'Семья', 'aunt', 'тётя', 'xala, bibi', 'My aunt lives in Ganja.', '/ɑːnt/', 'noun'),
  (35, 2, 'Семья', 'cousin', 'двоюродный брат, двоюродная сестра', 'əmioğlu, xalaqızı (kuzen)', 'My cousin is my best friend.', '/ˈkʌzn/', 'noun'),
  (36, 2, 'Семья', 'married', 'женатый, замужем', 'evli', 'My sister is married.', '/ˈmærid/', 'adjective'),
  (37, 2, 'Семья', 'birthday', 'день рождения', 'ad günü', 'Today is my birthday!', '/ˈbɜːθdeɪ/', 'noun'),
  (38, 2, 'Семья', 'age', 'возраст', 'yaş', 'What is your age?', '/eɪdʒ/', 'noun'),
  (39, 2, 'Семья', 'live', 'жить', 'yaşamaq', 'We live in a small house.', '/lɪv/', 'verb'),
  (40, 2, 'Семья', 'together', 'вместе', 'birlikdə', 'We eat dinner together.', '/təˈɡeðə(r)/', 'adverb'),
  (41, 3, 'Числа', 'zero', 'ноль', 'sıfır', 'The number is zero.', '/ˈzɪərəʊ/', 'number'),
  (42, 3, 'Числа', 'one', 'один', 'bir', 'I have one sister.', '/wʌn/', 'number'),
  (43, 3, 'Числа', 'two', 'два', 'iki', 'I have two brothers.', '/tuː/', 'number'),
  (44, 3, 'Числа', 'three', 'три', 'üç', 'We have three cats.', '/θriː/', 'number'),
  (45, 3, 'Числа', 'four', 'четыре', 'dörd', 'A table has four legs.', '/fɔː(r)/', 'number'),
  (46, 3, 'Числа', 'five', 'пять', 'beş', 'I have five fingers on my hand.', '/faɪv/', 'number'),
  (47, 3, 'Числа', 'six', 'шесть', 'altı', 'I get up at six.', '/sɪks/', 'number'),
  (48, 3, 'Числа', 'seven', 'семь', 'yeddi', 'A week has seven days.', '/ˈsevn/', 'number'),
  (49, 3, 'Числа', 'eight', 'восемь', 'səkkiz', 'The lesson starts at eight.', '/eɪt/', 'number'),
  (50, 3, 'Числа', 'nine', 'девять', 'doqquz', 'My cousin is nine.', '/naɪn/', 'number'),
  (51, 3, 'Числа', 'ten', 'десять', 'on', 'I have ten books.', '/ten/', 'number'),
  (52, 3, 'Числа', 'twenty', 'двадцать', 'iyirmi', 'She is twenty years old.', '/ˈtwenti/', 'number'),
  (53, 3, 'Числа', 'hundred', 'сто', 'yüz', 'This bag costs a hundred manats.', '/ˈhʌndrəd/', 'number'),
  (54, 3, 'Числа', 'thousand', 'тысяча', 'min', 'A thousand people live here.', '/ˈθaʊznd/', 'number'),
  (55, 3, 'Числа', 'first', 'первый', 'birinci', 'This is my first English lesson.', '/fɜːst/', 'number'),
  (56, 3, 'Числа', 'second', 'второй', 'ikinci', 'We live on the second floor.', '/ˈsekənd/', 'number'),
  (57, 3, 'Числа', 'third', 'третий', 'üçüncü', 'He is the third in the line.', '/θɜːd/', 'number'),
  (58, 3, 'Числа', 'number', 'число, номер', 'rəqəm, nömrə', 'What is your phone number?', '/ˈnʌmbə(r)/', 'noun'),
  (59, 3, 'Числа', 'half', 'половина', 'yarım, yarı', 'I eat half an apple.', '/hɑːf/', 'noun'),
  (60, 3, 'Числа', 'how many', 'сколько', 'neçə', 'How many brothers do you have?', '/ˌhaʊ ˈmeni/', 'phrase'),
  (61, 4, 'Цвета и формы', 'color', 'цвет', 'rəng', 'What color is your car?', '/ˈkʌlə(r)/', 'noun'),
  (62, 4, 'Цвета и формы', 'red', 'красный', 'qırmızı', 'I have a red bag.', '/red/', 'adjective'),
  (63, 4, 'Цвета и формы', 'blue', 'синий, голубой', 'mavi, göy', 'The sky is blue.', '/bluː/', 'adjective'),
  (64, 4, 'Цвета и формы', 'green', 'зелёный', 'yaşıl', 'The grass is green.', '/ɡriːn/', 'adjective'),
  (65, 4, 'Цвета и формы', 'yellow', 'жёлтый', 'sarı', 'A banana is yellow.', '/ˈjeləʊ/', 'adjective'),
  (66, 4, 'Цвета и формы', 'black', 'чёрный', 'qara', 'My cat is black.', '/blæk/', 'adjective'),
  (67, 4, 'Цвета и формы', 'white', 'белый', 'ağ', 'Snow is white.', '/waɪt/', 'adjective'),
  (68, 4, 'Цвета и формы', 'orange', 'оранжевый, апельсин', 'narıncı, portağal', 'I like orange juice.', '/ˈɒrɪndʒ/', 'adjective, noun'),
  (69, 4, 'Цвета и формы', 'pink', 'розовый', 'çəhrayı', 'She has a pink dress.', '/pɪŋk/', 'adjective'),
  (70, 4, 'Цвета и формы', 'brown', 'коричневый', 'qəhvəyi', 'He has brown eyes.', '/braʊn/', 'adjective'),
  (71, 4, 'Цвета и формы', 'grey', 'серый', 'boz', 'The sky is grey today.', '/ɡreɪ/', 'adjective'),
  (72, 4, 'Цвета и формы', 'purple', 'фиолетовый', 'bənövşəyi', 'I like purple flowers.', '/ˈpɜːpl/', 'adjective'),
  (73, 4, 'Цвета и формы', 'light', 'светлый', 'açıq (rəng)', 'She has a light blue shirt.', '/laɪt/', 'adjective'),
  (74, 4, 'Цвета и формы', 'dark', 'тёмный', 'tünd, qaranlıq', 'He has dark hair.', '/dɑːk/', 'adjective'),
  (75, 4, 'Цвета и формы', 'circle', 'круг', 'dairə', 'Draw a circle.', '/ˈsɜːkl/', 'noun'),
  (76, 4, 'Цвета и формы', 'square', 'квадрат, площадь', 'kvadrat, meydan', 'Draw a square.', '/skweə(r)/', 'noun'),
  (77, 4, 'Цвета и формы', 'triangle', 'треугольник', 'üçbucaq', 'A triangle has three sides.', '/ˈtraɪæŋɡl/', 'noun'),
  (78, 4, 'Цвета и формы', 'line', 'линия', 'xətt', 'Draw a long line.', '/laɪn/', 'noun'),
  (79, 4, 'Цвета и формы', 'round', 'круглый', 'dəyirmi', 'The table is round.', '/raʊnd/', 'adjective'),
  (80, 4, 'Цвета и формы', 'shape', 'форма', 'forma, fiqur', 'What shape is it?', '/ʃeɪp/', 'noun'),
  (81, 5, 'Тело', 'body', 'тело', 'bədən', 'Sport is good for your body.', '/ˈbɒdi/', 'noun'),
  (82, 5, 'Тело', 'head', 'голова', 'baş', 'My head hurts.', '/hed/', 'noun'),
  (83, 5, 'Тело', 'face', 'лицо', 'üz', 'Wash your face.', '/feɪs/', 'noun'),
  (84, 5, 'Тело', 'eye', 'глаз', 'göz', 'She has blue eyes.', '/aɪ/', 'noun'),
  (85, 5, 'Тело', 'ear', 'ухо', 'qulaq', 'I have two ears.', '/ɪə(r)/', 'noun'),
  (86, 5, 'Тело', 'nose', 'нос', 'burun', 'The baby has a small nose.', '/nəʊz/', 'noun'),
  (87, 5, 'Тело', 'mouth', 'рот', 'ağız', 'Open your mouth, please.', '/maʊθ/', 'noun'),
  (88, 5, 'Тело', 'tooth', 'зуб', 'diş', 'I brush my teeth every day.', '/tuːθ/', 'noun'),
  (89, 5, 'Тело', 'hair', 'волосы', 'saç', 'She has long hair.', '/heə(r)/', 'noun'),
  (90, 5, 'Тело', 'hand', 'рука (кисть)', 'əl', 'Wash your hands before dinner.', '/hænd/', 'noun'),
  (91, 5, 'Тело', 'arm', 'рука (от плеча)', 'qol', 'He broke his arm.', '/ɑːm/', 'noun'),
  (92, 5, 'Тело', 'finger', 'палец (руки)', 'barmaq', 'I have ten fingers.', '/ˈfɪŋɡə(r)/', 'noun'),
  (93, 5, 'Тело', 'leg', 'нога', 'ayaq', 'My leg hurts.', '/leɡ/', 'noun'),
  (94, 5, 'Тело', 'foot', 'стопа, нога', 'ayaq (pəncə)', 'My foot is cold.', '/fʊt/', 'noun'),
  (95, 5, 'Тело', 'back', 'спина', 'bel, kürək', 'My back hurts.', '/bæk/', 'noun'),
  (96, 5, 'Тело', 'neck', 'шея', 'boyun', 'She has a long neck.', '/nek/', 'noun'),
  (97, 5, 'Тело', 'heart', 'сердце', 'ürək', 'The heart is a strong muscle.', '/hɑːt/', 'noun'),
  (98, 5, 'Тело', 'stomach', 'живот, желудок', 'mədə, qarın', 'My stomach hurts.', '/ˈstʌmək/', 'noun'),
  (99, 5, 'Тело', 'shoulder', 'плечо', 'çiyin', 'Put your bag on your shoulder.', '/ˈʃəʊldə(r)/', 'noun'),
  (100, 5, 'Тело', 'knee', 'колено', 'diz', 'He hurt his knee.', '/niː/', 'noun'),
  (101, 6, 'Еда и напитки', 'food', 'еда', 'yemək, qida', 'I like Azerbaijani food.', '/fuːd/', 'noun'),
  (102, 6, 'Еда и напитки', 'water', 'вода', 'su', 'Can I have some water?', '/ˈwɔːtə(r)/', 'noun'),
  (103, 6, 'Еда и напитки', 'bread', 'хлеб', 'çörək', 'We buy bread every day.', '/bred/', 'noun'),
  (104, 6, 'Еда и напитки', 'milk', 'молоко', 'süd', 'The baby drinks milk.', '/mɪlk/', 'noun'),
  (105, 6, 'Еда и напитки', 'tea', 'чай', 'çay', 'I drink tea with lemon.', '/tiː/', 'noun'),
  (106, 6, 'Еда и напитки', 'coffee', 'кофе', 'qəhvə', 'My father drinks coffee in the morning.', '/ˈkɒfi/', 'noun'),
  (107, 6, 'Еда и напитки', 'juice', 'сок', 'şirə', 'I like apple juice.', '/dʒuːs/', 'noun'),
  (108, 6, 'Еда и напитки', 'egg', 'яйцо', 'yumurta', 'I eat two eggs for breakfast.', '/eɡ/', 'noun'),
  (109, 6, 'Еда и напитки', 'meat', 'мясо', 'ət', 'I don''t eat meat.', '/miːt/', 'noun'),
  (110, 6, 'Еда и напитки', 'chicken', 'курица', 'toyuq', 'We have chicken and rice for dinner.', '/ˈtʃɪkɪn/', 'noun'),
  (111, 6, 'Еда и напитки', 'fish', 'рыба', 'balıq', 'Fish is good for you.', '/fɪʃ/', 'noun'),
  (112, 6, 'Еда и напитки', 'rice', 'рис', 'düyü', 'I like rice with meat.', '/raɪs/', 'noun'),
  (113, 6, 'Еда и напитки', 'apple', 'яблоко', 'alma', 'An apple a day is good for you.', '/ˈæpl/', 'noun'),
  (114, 6, 'Еда и напитки', 'banana', 'банан', 'banan', 'The banana is yellow.', '/bəˈnɑːnə/', 'noun'),
  (115, 6, 'Еда и напитки', 'vegetable', 'овощ', 'tərəvəz', 'Eat your vegetables!', '/ˈvedʒtəbl/', 'noun'),
  (116, 6, 'Еда и напитки', 'fruit', 'фрукт, фрукты', 'meyvə', 'I eat fruit every day.', '/fruːt/', 'noun'),
  (117, 6, 'Еда и напитки', 'sugar', 'сахар', 'şəkər', 'No sugar in my tea, please.', '/ˈʃʊɡə(r)/', 'noun'),
  (118, 6, 'Еда и напитки', 'salt', 'соль', 'duz', 'Pass me the salt, please.', '/sɔːlt/', 'noun'),
  (119, 6, 'Еда и напитки', 'breakfast', 'завтрак', 'səhər yeməyi', 'I have breakfast at eight.', '/ˈbrekfəst/', 'noun'),
  (120, 6, 'Еда и напитки', 'dinner', 'ужин', 'şam yeməyi', 'We have dinner at seven.', '/ˈdɪnə(r)/', 'noun'),
  (121, 7, 'Дом', 'house', 'дом (здание)', 'ev, bina', 'They live in a big house.', '/haʊs/', 'noun'),
  (122, 7, 'Дом', 'home', 'дом (родной), домой', 'ev', 'I go home at five.', '/həʊm/', 'noun'),
  (123, 7, 'Дом', 'room', 'комната', 'otaq', 'My room is small.', '/ruːm/', 'noun'),
  (124, 7, 'Дом', 'kitchen', 'кухня', 'mətbəx', 'Mother is in the kitchen.', '/ˈkɪtʃɪn/', 'noun'),
  (125, 7, 'Дом', 'bedroom', 'спальня', 'yataq otağı', 'There are two beds in the bedroom.', '/ˈbedruːm/', 'noun'),
  (126, 7, 'Дом', 'bathroom', 'ванная', 'vanna otağı', 'The bathroom is next to the bedroom.', '/ˈbɑːθruːm/', 'noun'),
  (127, 7, 'Дом', 'door', 'дверь', 'qapı', 'Close the door, please.', '/dɔː(r)/', 'noun'),
  (128, 7, 'Дом', 'window', 'окно', 'pəncərə', 'Open the window, please.', '/ˈwɪndəʊ/', 'noun'),
  (129, 7, 'Дом', 'table', 'стол', 'stol, masa', 'The book is on the table.', '/ˈteɪbl/', 'noun'),
  (130, 7, 'Дом', 'chair', 'стул', 'stul', 'Sit on the chair.', '/tʃeə(r)/', 'noun'),
  (131, 7, 'Дом', 'bed', 'кровать', 'çarpayı', 'I go to bed at ten.', '/bed/', 'noun'),
  (132, 7, 'Дом', 'wall', 'стена', 'divar', 'There is a picture on the wall.', '/wɔːl/', 'noun'),
  (133, 7, 'Дом', 'floor', 'пол, этаж', 'döşəmə, mərtəbə', 'The cat is on the floor.', '/flɔː(r)/', 'noun'),
  (134, 7, 'Дом', 'key', 'ключ', 'açar', 'I can''t find my key.', '/kiː/', 'noun'),
  (135, 7, 'Дом', 'lamp', 'лампа', 'lampa', 'The lamp is on the table.', '/læmp/', 'noun'),
  (136, 7, 'Дом', 'sofa', 'диван', 'divan', 'We sit on the sofa and watch TV.', '/ˈsəʊfə/', 'noun'),
  (137, 7, 'Дом', 'garden', 'сад', 'bağ, həyət', 'We have flowers in our garden.', '/ˈɡɑːdn/', 'noun'),
  (138, 7, 'Дом', 'stairs', 'лестница', 'pilləkən', 'Go up the stairs.', '/steəz/', 'noun'),
  (139, 7, 'Дом', 'roof', 'крыша', 'dam', 'The roof is red.', '/ruːf/', 'noun'),
  (140, 7, 'Дом', 'mirror', 'зеркало', 'güzgü', 'She looks in the mirror.', '/ˈmɪrə(r)/', 'noun'),
  (141, 8, 'Одежда', 'clothes', 'одежда', 'paltar, geyim', 'I buy new clothes in summer.', '/kləʊðz/', 'noun'),
  (142, 8, 'Одежда', 'shirt', 'рубашка', 'köynək', 'He wears a white shirt.', '/ʃɜːt/', 'noun'),
  (143, 8, 'Одежда', 'T-shirt', 'футболка', 'futbolka', 'I have a blue T-shirt.', '/ˈtiː ʃɜːt/', 'noun'),
  (144, 8, 'Одежда', 'dress', 'платье', 'don, paltar', 'She has a beautiful dress.', '/dres/', 'noun'),
  (145, 8, 'Одежда', 'skirt', 'юбка', 'yubka, ətək', 'Her skirt is black.', '/skɜːt/', 'noun'),
  (146, 8, 'Одежда', 'trousers', 'брюки', 'şalvar', 'These trousers are too long.', '/ˈtraʊzəz/', 'noun'),
  (147, 8, 'Одежда', 'jeans', 'джинсы', 'cins şalvar', 'I wear jeans every day.', '/dʒiːnz/', 'noun'),
  (148, 8, 'Одежда', 'jacket', 'куртка, пиджак', 'gödəkçə, pencək', 'Take your jacket, it''s cold.', '/ˈdʒækɪt/', 'noun'),
  (149, 8, 'Одежда', 'coat', 'пальто', 'palto', 'I wear a coat in winter.', '/kəʊt/', 'noun'),
  (150, 8, 'Одежда', 'shoes', 'обувь, туфли', 'ayaqqabı', 'My shoes are new.', '/ʃuːz/', 'noun'),
  (151, 8, 'Одежда', 'socks', 'носки', 'corab', 'I need clean socks.', '/sɒks/', 'noun'),
  (152, 8, 'Одежда', 'hat', 'шапка, шляпа', 'papaq, şlyapa', 'He has a black hat.', '/hæt/', 'noun'),
  (153, 8, 'Одежда', 'scarf', 'шарф', 'şərf', 'Her scarf is red.', '/skɑːf/', 'noun'),
  (154, 8, 'Одежда', 'gloves', 'перчатки', 'əlcək', 'I wear gloves in winter.', '/ɡlʌvz/', 'noun'),
  (155, 8, 'Одежда', 'bag', 'сумка', 'çanta', 'My bag is heavy.', '/bæɡ/', 'noun'),
  (156, 8, 'Одежда', 'belt', 'ремень, пояс', 'kəmər', 'He has a brown belt.', '/belt/', 'noun'),
  (157, 8, 'Одежда', 'sweater', 'свитер', 'sviter', 'This sweater is warm.', '/ˈswetə(r)/', 'noun'),
  (158, 8, 'Одежда', 'pocket', 'карман', 'cib', 'The key is in my pocket.', '/ˈpɒkɪt/', 'noun'),
  (159, 8, 'Одежда', 'wear', 'носить (одежду)', 'geyinmək, geyimdə olmaq', 'I wear a uniform at school.', '/weə(r)/', 'verb'),
  (160, 8, 'Одежда', 'size', 'размер', 'ölçü', 'What size are your shoes?', '/saɪz/', 'noun'),
  (161, 9, 'Время и дни недели', 'time', 'время', 'vaxt, zaman', 'What time is it?', '/taɪm/', 'noun'),
  (162, 9, 'Время и дни недели', 'day', 'день', 'gün', 'Have a nice day!', '/deɪ/', 'noun'),
  (163, 9, 'Время и дни недели', 'week', 'неделя', 'həftə', 'I study English every week.', '/wiːk/', 'noun'),
  (164, 9, 'Время и дни недели', 'month', 'месяц', 'ay', 'My exam is next month.', '/mʌnθ/', 'noun'),
  (165, 9, 'Время и дни недели', 'year', 'год', 'il', 'I am twenty years old.', '/jɪə(r)/', 'noun'),
  (166, 9, 'Время и дни недели', 'today', 'сегодня', 'bu gün', 'Today is Monday.', '/təˈdeɪ/', 'adverb'),
  (167, 9, 'Время и дни недели', 'tomorrow', 'завтра', 'sabah', 'See you tomorrow!', '/təˈmɒrəʊ/', 'adverb'),
  (168, 9, 'Время и дни недели', 'yesterday', 'вчера', 'dünən', 'Yesterday was Sunday.', '/ˈjestədeɪ/', 'adverb'),
  (169, 9, 'Время и дни недели', 'morning', 'утро', 'səhər', 'I drink tea in the morning.', '/ˈmɔːnɪŋ/', 'noun'),
  (170, 9, 'Время и дни недели', 'evening', 'вечер', 'axşam', 'We watch TV in the evening.', '/ˈiːvnɪŋ/', 'noun'),
  (171, 9, 'Время и дни недели', 'night', 'ночь', 'gecə', 'Good night!', '/naɪt/', 'noun'),
  (172, 9, 'Время и дни недели', 'hour', 'час', 'saat', 'The lesson is one hour.', '/ˈaʊə(r)/', 'noun'),
  (173, 9, 'Время и дни недели', 'minute', 'минута', 'dəqiqə', 'Wait a minute, please.', '/ˈmɪnɪt/', 'noun'),
  (174, 9, 'Время и дни недели', 'Monday', 'понедельник', 'bazar ertəsi', 'I go to work on Monday.', '/ˈmʌndeɪ/', 'noun'),
  (175, 9, 'Время и дни недели', 'Tuesday', 'вторник', 'çərşənbə axşamı', 'We have English on Tuesday.', '/ˈtjuːzdeɪ/', 'noun'),
  (176, 9, 'Время и дни недели', 'Wednesday', 'среда', 'çərşənbə', 'Wednesday is the middle of the week.', '/ˈwenzdeɪ/', 'noun'),
  (177, 9, 'Время и дни недели', 'Thursday', 'четверг', 'cümə axşamı', 'I see my friend on Thursday.', '/ˈθɜːzdeɪ/', 'noun'),
  (178, 9, 'Время и дни недели', 'Friday', 'пятница', 'cümə', 'Friday is my favourite day.', '/ˈfraɪdeɪ/', 'noun'),
  (179, 9, 'Время и дни недели', 'Saturday', 'суббота', 'şənbə', 'On Saturday I sleep a lot.', '/ˈsætədeɪ/', 'noun'),
  (180, 9, 'Время и дни недели', 'Sunday', 'воскресенье', 'bazar', 'We visit grandmother on Sunday.', '/ˈsʌndeɪ/', 'noun'),
  (181, 10, 'Погода и природа', 'weather', 'погода', 'hava', 'The weather is nice today.', '/ˈweðə(r)/', 'noun'),
  (182, 10, 'Погода и природа', 'sun', 'солнце', 'günəş', 'The sun is hot.', '/sʌn/', 'noun'),
  (183, 10, 'Погода и природа', 'rain', 'дождь', 'yağış', 'I don''t like rain.', '/reɪn/', 'noun'),
  (184, 10, 'Погода и природа', 'snow', 'снег', 'qar', 'Children love snow.', '/snəʊ/', 'noun'),
  (185, 10, 'Погода и природа', 'wind', 'ветер', 'külək', 'Baku is a city of wind.', '/wɪnd/', 'noun'),
  (186, 10, 'Погода и природа', 'cloud', 'облако', 'bulud', 'There is a big cloud in the sky.', '/klaʊd/', 'noun'),
  (187, 10, 'Погода и природа', 'hot', 'жаркий, горячий', 'isti', 'It is hot in summer.', '/hɒt/', 'adjective'),
  (188, 10, 'Погода и природа', 'cold', 'холодный', 'soyuq', 'It is cold today.', '/kəʊld/', 'adjective'),
  (189, 10, 'Погода и природа', 'warm', 'тёплый', 'ilıq, isti', 'The water is warm.', '/wɔːm/', 'adjective'),
  (190, 10, 'Погода и природа', 'sky', 'небо', 'səma, göy', 'The sky is blue today.', '/skaɪ/', 'noun'),
  (191, 10, 'Погода и природа', 'tree', 'дерево', 'ağac', 'There is a big tree in our garden.', '/triː/', 'noun'),
  (192, 10, 'Погода и природа', 'flower', 'цветок', 'gül, çiçək', 'She gives her mother a flower.', '/ˈflaʊə(r)/', 'noun'),
  (193, 10, 'Погода и природа', 'sea', 'море', 'dəniz', 'We swim in the sea in summer.', '/siː/', 'noun'),
  (194, 10, 'Погода и природа', 'river', 'река', 'çay (axar su)', 'The river is very long.', '/ˈrɪvə(r)/', 'noun'),
  (195, 10, 'Погода и природа', 'mountain', 'гора', 'dağ', 'The mountain is very high.', '/ˈmaʊntən/', 'noun'),
  (196, 10, 'Погода и природа', 'animal', 'животное', 'heyvan', 'The dog is my favourite animal.', '/ˈænɪml/', 'noun'),
  (197, 10, 'Погода и природа', 'dog', 'собака', 'it', 'My dog is very friendly.', '/dɒɡ/', 'noun'),
  (198, 10, 'Погода и природа', 'cat', 'кошка', 'pişik', 'The cat is sleeping on the sofa.', '/kæt/', 'noun'),
  (199, 10, 'Погода и природа', 'bird', 'птица', 'quş', 'A bird is singing.', '/bɜːd/', 'noun'),
  (200, 10, 'Погода и природа', 'summer', 'лето', 'yay', 'We go to the sea in summer.', '/ˈsʌmə(r)/', 'noun'),
  (201, 11, 'Город и транспорт', 'city', 'город', 'şəhər', 'Baku is a big city.', '/ˈsɪti/', 'noun'),
  (202, 11, 'Город и транспорт', 'street', 'улица', 'küçə', 'I live on this street.', '/striːt/', 'noun'),
  (203, 11, 'Город и транспорт', 'shop', 'магазин', 'mağaza', 'The shop is open.', '/ʃɒp/', 'noun'),
  (204, 11, 'Город и транспорт', 'market', 'рынок', 'bazar', 'We buy fruit at the market.', '/ˈmɑːkɪt/', 'noun'),
  (205, 11, 'Город и транспорт', 'bank', 'банк', 'bank', 'The bank is near my house.', '/bæŋk/', 'noun'),
  (206, 11, 'Город и транспорт', 'hospital', 'больница', 'xəstəxana', 'My mother works in a hospital.', '/ˈhɒspɪtl/', 'noun'),
  (207, 11, 'Город и транспорт', 'park', 'парк', 'park', 'Children play in the park.', '/pɑːk/', 'noun'),
  (208, 11, 'Город и транспорт', 'restaurant', 'ресторан', 'restoran', 'We eat in a restaurant on Friday.', '/ˈrestrɒnt/', 'noun'),
  (209, 11, 'Город и транспорт', 'hotel', 'гостиница, отель', 'otel, mehmanxana', 'The hotel is near the sea.', '/həʊˈtel/', 'noun'),
  (210, 11, 'Город и транспорт', 'car', 'машина', 'maşın, avtomobil', 'My father has a new car.', '/kɑː(r)/', 'noun'),
  (211, 11, 'Город и транспорт', 'bus', 'автобус', 'avtobus', 'I go to school by bus.', '/bʌs/', 'noun'),
  (212, 11, 'Город и транспорт', 'taxi', 'такси', 'taksi', 'Let''s take a taxi.', '/ˈtæksi/', 'noun'),
  (213, 11, 'Город и транспорт', 'train', 'поезд', 'qatar', 'The train is very fast.', '/treɪn/', 'noun'),
  (214, 11, 'Город и транспорт', 'plane', 'самолёт', 'təyyarə', 'The plane is in the sky.', '/pleɪn/', 'noun'),
  (215, 11, 'Город и транспорт', 'bicycle', 'велосипед', 'velosiped', 'I ride my bicycle in the park.', '/ˈbaɪsɪkl/', 'noun'),
  (216, 11, 'Город и транспорт', 'station', 'станция, вокзал', 'stansiya, vağzal', 'The metro station is near here.', '/ˈsteɪʃn/', 'noun'),
  (217, 11, 'Город и транспорт', 'airport', 'аэропорт', 'hava limanı', 'We go to the airport by taxi.', '/ˈeəpɔːt/', 'noun'),
  (218, 11, 'Город и транспорт', 'ticket', 'билет', 'bilet', 'I need a bus ticket.', '/ˈtɪkɪt/', 'noun'),
  (219, 11, 'Город и транспорт', 'left', 'налево, левый', 'sol, sola', 'Turn left at the bank.', '/left/', 'adverb'),
  (220, 11, 'Город и транспорт', 'right', 'направо, правый', 'sağ, sağa', 'The shop is on the right.', '/raɪt/', 'adverb'),
  (221, 12, 'Базовые глаголы', 'be', 'быть', 'olmaq', 'I want to be a doctor.', '/biː/', 'verb'),
  (222, 12, 'Базовые глаголы', 'have', 'иметь', 'malik olmaq, var olmaq', 'I have a sister.', '/hæv/', 'verb'),
  (223, 12, 'Базовые глаголы', 'do', 'делать', 'etmək, görmək', 'I do my homework in the evening.', '/duː/', 'verb'),
  (224, 12, 'Базовые глаголы', 'go', 'идти, ехать', 'getmək', 'I go to school every day.', '/ɡəʊ/', 'verb'),
  (225, 12, 'Базовые глаголы', 'come', 'приходить', 'gəlmək', 'Come here, please.', '/kʌm/', 'verb'),
  (226, 12, 'Базовые глаголы', 'eat', 'есть (кушать)', 'yemək', 'We eat at seven.', '/iːt/', 'verb'),
  (227, 12, 'Базовые глаголы', 'drink', 'пить', 'içmək', 'Drink some water.', '/drɪŋk/', 'verb'),
  (228, 12, 'Базовые глаголы', 'sleep', 'спать', 'yatmaq', 'I sleep eight hours.', '/sliːp/', 'verb'),
  (229, 12, 'Базовые глаголы', 'see', 'видеть', 'görmək', 'I can see the sea.', '/siː/', 'verb'),
  (230, 12, 'Базовые глаголы', 'listen', 'слушать', 'qulaq asmaq, dinləmək', 'Listen to the teacher.', '/ˈlɪsn/', 'verb'),
  (231, 12, 'Базовые глаголы', 'speak', 'говорить (на языке)', 'danışmaq', 'I speak a little English.', '/spiːk/', 'verb'),
  (232, 12, 'Базовые глаголы', 'read', 'читать', 'oxumaq', 'I read a book every week.', '/riːd/', 'verb'),
  (233, 12, 'Базовые глаголы', 'write', 'писать', 'yazmaq', 'Write your name here.', '/raɪt/', 'verb'),
  (234, 12, 'Базовые глаголы', 'know', 'знать', 'bilmək', 'I know the answer.', '/nəʊ/', 'verb'),
  (235, 12, 'Базовые глаголы', 'want', 'хотеть', 'istəmək', 'I want a cup of tea.', '/wɒnt/', 'verb'),
  (236, 12, 'Базовые глаголы', 'like', 'нравиться, любить', 'xoşlamaq, bəyənmək', 'I like apples.', '/laɪk/', 'verb'),
  (237, 12, 'Базовые глаголы', 'give', 'давать', 'vermək', 'Give me the book, please.', '/ɡɪv/', 'verb'),
  (238, 12, 'Базовые глаголы', 'take', 'брать', 'götürmək, almaq', 'Take an umbrella.', '/teɪk/', 'verb'),
  (239, 12, 'Базовые глаголы', 'buy', 'покупать', 'almaq (satın)', 'I buy bread at the shop.', '/baɪ/', 'verb'),
  (240, 12, 'Базовые глаголы', 'open', 'открывать', 'açmaq', 'Open your books, please.', '/ˈəʊpən/', 'verb'),
  (241, 13, 'Базовые прилагательные', 'good', 'хороший', 'yaxşı', 'This is a good book.', '/ɡʊd/', 'adjective'),
  (242, 13, 'Базовые прилагательные', 'bad', 'плохой', 'pis', 'The weather is bad today.', '/bæd/', 'adjective'),
  (243, 13, 'Базовые прилагательные', 'big', 'большой', 'böyük', 'They have a big house.', '/bɪɡ/', 'adjective'),
  (244, 13, 'Базовые прилагательные', 'small', 'маленький', 'kiçik', 'I have a small room.', '/smɔːl/', 'adjective'),
  (245, 13, 'Базовые прилагательные', 'new', 'новый', 'yeni', 'I have a new phone.', '/njuː/', 'adjective'),
  (246, 13, 'Базовые прилагательные', 'old', 'старый', 'köhnə, qoca', 'This car is very old.', '/əʊld/', 'adjective'),
  (247, 13, 'Базовые прилагательные', 'young', 'молодой', 'gənc', 'My teacher is young.', '/jʌŋ/', 'adjective'),
  (248, 13, 'Базовые прилагательные', 'long', 'длинный', 'uzun', 'She has long hair.', '/lɒŋ/', 'adjective'),
  (249, 13, 'Базовые прилагательные', 'short', 'короткий, невысокий', 'qısa, alçaq', 'The film is short.', '/ʃɔːt/', 'adjective'),
  (250, 13, 'Базовые прилагательные', 'happy', 'счастливый, радостный', 'xoşbəxt, şad', 'I am happy today.', '/ˈhæpi/', 'adjective'),
  (251, 13, 'Базовые прилагательные', 'sad', 'грустный', 'kədərli', 'Why are you sad?', '/sæd/', 'adjective'),
  (252, 13, 'Базовые прилагательные', 'beautiful', 'красивый', 'gözəl', 'Baku is a beautiful city.', '/ˈbjuːtɪfl/', 'adjective'),
  (253, 13, 'Базовые прилагательные', 'easy', 'лёгкий (простой)', 'asan', 'This exercise is easy.', '/ˈiːzi/', 'adjective'),
  (254, 13, 'Базовые прилагательные', 'difficult', 'трудный', 'çətin', 'English is not difficult.', '/ˈdɪfɪkəlt/', 'adjective'),
  (255, 13, 'Базовые прилагательные', 'fast', 'быстрый', 'sürətli, tez', 'The train is fast.', '/fɑːst/', 'adjective'),
  (256, 13, 'Базовые прилагательные', 'slow', 'медленный', 'yavaş', 'The bus is slow.', '/sləʊ/', 'adjective'),
  (257, 13, 'Базовые прилагательные', 'cheap', 'дешёвый', 'ucuz', 'This bag is cheap.', '/tʃiːp/', 'adjective'),
  (258, 13, 'Базовые прилагательные', 'expensive', 'дорогой (по цене)', 'bahalı', 'This phone is expensive.', '/ɪkˈspensɪv/', 'adjective'),
  (259, 13, 'Базовые прилагательные', 'hungry', 'голодный', 'ac', 'I am hungry. Let''s eat!', '/ˈhʌŋɡri/', 'adjective'),
  (260, 13, 'Базовые прилагательные', 'tired', 'уставший', 'yorğun', 'I am tired after work.', '/ˈtaɪəd/', 'adjective'),
  (261, 14, 'Школа и работа', 'school', 'школа', 'məktəb', 'My brother goes to school.', '/skuːl/', 'noun'),
  (262, 14, 'Школа и работа', 'lesson', 'урок', 'dərs', 'The English lesson starts at nine.', '/ˈlesn/', 'noun'),
  (263, 14, 'Школа и работа', 'book', 'книга', 'kitab', 'This book is interesting.', '/bʊk/', 'noun'),
  (264, 14, 'Школа и работа', 'pen', 'ручка', 'qələm', 'Can I have a pen?', '/pen/', 'noun'),
  (265, 14, 'Школа и работа', 'pencil', 'карандаш', 'karandaş', 'Write with a pencil.', '/ˈpensl/', 'noun'),
  (266, 14, 'Школа и работа', 'notebook', 'тетрадь', 'dəftər', 'Write the words in your notebook.', '/ˈnəʊtbʊk/', 'noun'),
  (267, 14, 'Школа и работа', 'homework', 'домашнее задание', 'ev tapşırığı', 'I do my homework after dinner.', '/ˈhəʊmwɜːk/', 'noun'),
  (268, 14, 'Школа и работа', 'exam', 'экзамен', 'imtahan', 'I have an exam tomorrow.', '/ɪɡˈzæm/', 'noun'),
  (269, 14, 'Школа и работа', 'question', 'вопрос', 'sual', 'Can I ask a question?', '/ˈkwestʃən/', 'noun'),
  (270, 14, 'Школа и работа', 'answer', 'ответ', 'cavab', 'I know the answer.', '/ˈɑːnsə(r)/', 'noun'),
  (271, 14, 'Школа и работа', 'word', 'слово', 'söz', 'Learn ten new words every day.', '/wɜːd/', 'noun'),
  (272, 14, 'Школа и работа', 'language', 'язык (речь)', 'dil', 'I speak three languages.', '/ˈlæŋɡwɪdʒ/', 'noun'),
  (273, 14, 'Школа и работа', 'English', 'английский язык', 'ingilis dili', 'I learn English every day.', '/ˈɪŋɡlɪʃ/', 'noun'),
  (274, 14, 'Школа и работа', 'learn', 'учить, изучать', 'öyrənmək', 'I learn new words every day.', '/lɜːn/', 'verb'),
  (275, 14, 'Школа и работа', 'work', 'работа, работать', 'iş, işləmək', 'I go to work by bus.', '/wɜːk/', 'noun, verb'),
  (276, 14, 'Школа и работа', 'job', 'работа, должность', 'iş, vəzifə', 'I have a new job.', '/dʒɒb/', 'noun'),
  (277, 14, 'Школа и работа', 'office', 'офис', 'ofis', 'My office is in the city centre.', '/ˈɒfɪs/', 'noun'),
  (278, 14, 'Школа и работа', 'doctor', 'врач', 'həkim', 'My aunt is a doctor.', '/ˈdɒktə(r)/', 'noun'),
  (279, 14, 'Школа и работа', 'driver', 'водитель', 'sürücü', 'The bus driver is friendly.', '/ˈdraɪvə(r)/', 'noun'),
  (280, 14, 'Школа и работа', 'computer', 'компьютер', 'kompüter', 'I work on a computer.', '/kəmˈpjuːtə(r)/', 'noun');

-- Copies the course to a student once; does nothing if they already have it.
create or replace function public.seed_starter_course(p_student uuid)
returns int
language plpgsql
security definer
set search_path = ''
as $$
declare
  root uuid;
  sub uuid;
  t record;
  added int := 0;
  n int;
begin
  if not exists (select 1 from public.starter_words)
     or exists (select 1 from public.decks where student_id = p_student and parent_id is null and name = '1. Начало A1') then
    return 0;
  end if;
  insert into public.decks (student_id, name) values (p_student, '1. Начало A1') returning id into root;
  for t in select day, min(topic) as topic from public.starter_words group by day order by day loop
    insert into public.decks (student_id, parent_id, name)
      values (p_student, root, 'День ' || lpad(t.day::text, 2, '0') || ' · ' || t.topic)
      returning id into sub;
    insert into public.notes (deck_id, student_id, word, translation_ru, translation_az, example, ipa, pos)
      select sub, p_student, w.word, w.translation_ru, w.translation_az, w.example, w.ipa, w.pos
      from public.starter_words w where w.day = t.day order by w.position;
    get diagnostics n = row_count;
    added := added + n;
  end loop;
  update public.profiles
    set settings = jsonb_build_object('newPerDay', 20) || settings
    where id = p_student;
  return added;
end;
$$;

revoke all on function public.seed_starter_course(uuid) from anon, authenticated, public;

-- The first account is the admin; every later one is a student and gets the course.
-- A failure while copying the words must never block the sign-up itself.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  new_role text := case when exists (select 1 from public.profiles where role = 'admin') then 'student' else 'admin' end;
begin
  insert into public.profiles (id, name, role)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data ->> 'name', ''), split_part(new.email, '@', 1)),
    new_role
  );
  if new_role = 'student' then
    begin
      perform public.seed_starter_course(new.id);
    exception when others then
      raise warning 'seed_starter_course failed for %: %', new.id, sqlerrm;
    end;
  end if;
  return new;
end;
$$;
