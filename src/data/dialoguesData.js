// Данные для симулятора диалогов
// Каждый диалог: ситуация, серия реплик NPC с вариантами ответа пользователя

export const dialoguesData = [
  {
    id: 'cafe_order',
    category: 'cafe',
    title: { ko: '카페에서 주문하기', en: 'Ordering at a Cafe', ru: 'Заказ в кафе' },
    icon: '☕',
    steps: [
      {
        npc: '안녕하세요! 주문하시겠어요?',
        npcTranslation: { en: 'Hello! Would you like to order?', ru: 'Здравствуйте! Будете заказывать?' },
        options: [
          { text: '아이스 아메리카노 주세요', correct: true, translation: { en: 'Iced Americano, please', ru: 'Айс американо, пожалуйста' } },
          { text: '야, 아메리카노 하나 줘', correct: false, nextIndex: 4, translation: { en: 'Hey, give me an Americano', ru: 'Эй, дай мне американо' } },
          { text: '안녕히 가세요', correct: false, translation: { en: 'Goodbye', ru: 'До свидания' } },
          { text: '화장실이 어디예요?', correct: false, translation: { en: 'Where is the bathroom?', ru: 'Где туалет?' } },
        ]
      },
      {
        npc: '사이즈 뭐로 하시겠어요? 톨, 그란데, 벤티 있어요.',
        npcTranslation: { en: 'What size? We have Tall, Grande, Venti.', ru: 'Какой размер? Есть Tall, Grande, Venti.' },
        options: [
          { text: '그란데로 주세요', correct: true, translation: { en: 'Grande, please', ru: 'Гранде, пожалуйста' } },
          { text: '톨로 주세요', correct: true, translation: { en: 'Tall, please', ru: 'Толл, пожалуйста' } },
          { text: '네, 감사합니다', correct: false, translation: { en: 'Yes, thank you', ru: 'Да, спасибо' } },
          { text: '얼마예요?', correct: false, translation: { en: 'How much?', ru: 'Сколько стоит?' } },
          { text: '메뉴판 주세요', correct: false, translation: { en: 'Menu, please', ru: 'Дайте меню, пожалуйста' } },
        ]
      },
      {
        npc: '먹고 가실 거예요, 포장이요?',
        npcTranslation: { en: 'For here or to go?', ru: 'Здесь будете пить или с собой?' },
        options: [
          { text: '포장해 주세요', correct: true, translation: { en: 'To go, please', ru: 'С собой, пожалуйста' } },
          { text: '먹고 갈게요', correct: true, translation: { en: 'I\'ll have it here', ru: 'Я здесь попью' } },
          { text: '모르겠어요', correct: false, translation: { en: 'I don\'t know', ru: 'Не знаю' } },
          { text: '집에 갈게요', correct: false, translation: { en: 'I\'ll go home', ru: 'Я пойду домой' } },
        ]
      },
      {
        npc: '4,500원입니다. 카드 되세요?',
        npcTranslation: { en: 'That\'s 4,500 won. Card okay?', ru: '4,500 вон. Картой подойдёт?' },
        options: [
          { text: '네, 카드로 할게요', correct: true, nextIndex: 'end', translation: { en: 'Yes, I\'ll pay by card', ru: 'Да, картой' } },
          { text: '현금으로 할게요', correct: true, nextIndex: 'end', translation: { en: 'I\'ll pay with cash', ru: 'Наличными' } },
          { text: '너무 비싸요!', correct: false, nextIndex: 5, translation: { en: 'Too expensive!', ru: 'Слишком дорого!' } },
        ]
      },
      { // 4: Rude path
        npc: '손님, 처음 뵙는데 반말은 삼가주세요. 주문하시겠어요?',
        npcTranslation: { en: 'Customer, please don\'t use informal language with someone you just met. Would you like to order?', ru: 'Уважаемый, пожалуйста, не говорите неформально с незнакомыми людьми. Будете заказывать?' },
        options: [
          { text: '죄송합니다. 아메리카노 주세요.', correct: true, nextIndex: 1, translation: { en: 'I am sorry. Americano, please.', ru: 'Извините. Американо, пожалуйста.' } },
          { text: '뭐라고? 안 먹어!', correct: false, nextIndex: 'end', translation: { en: 'What did you say? I won\'t drink here!', ru: 'Что ты сказал? Не буду здесь пить!' } },
        ]
      },
      { // 5: Too expensive
        npc: '죄송합니다, 가격은 정해져 있습니다. 결제 도와드릴까요?',
        npcTranslation: { en: 'I\'m sorry, the price is fixed. Shall I help you pay?', ru: 'Извините, цена фиксированная. Помочь с оплатой?' },
        options: [
          { text: '네, 카드로 할게요.', correct: true, nextIndex: 'end', translation: { en: 'Yes, I\'ll pay by card.', ru: 'Да, оплачу картой.' } },
          { text: '안 먹을래요.', correct: false, nextIndex: 'end', translation: { en: 'I won\'t drink it.', ru: 'Я не буду это пить.' } }
        ]
      },
      { // 6: Bathroom
        npc: '화장실은 나가서 왼쪽에 있습니다. 주문 먼저 하시겠어요?',
        npcTranslation: { en: 'The bathroom is outside to the left. Would you like to order first?', ru: 'Туалет на улице налево. Будете делать заказ сначала?' },
        options: [
          { text: '아메리카노 주세요.', correct: true, nextIndex: 1, translation: { en: 'Americano, please.', ru: 'Американо, пожалуйста.' } },
          { text: '화장실만 쓸게요.', correct: false, nextIndex: 'end', translation: { en: 'I\'ll just use the bathroom.', ru: 'Я только воспользуюсь туалетом.' } }
        ]
      },
      { // 7: How much
        npc: '아메리카노 톨 사이즈는 4,000원, 그란데는 4,500원입니다. 어떤 사이즈로 드릴까요?',
        npcTranslation: { en: 'A Tall Americano is 4,000 won, a Grande is 4,500 won. What size would you like?', ru: 'Толл американо стоит 4,000 вон, гранде - 4,500 вон. Какой размер?' },
        options: [
          { text: '그란데로 주세요.', correct: true, nextIndex: 2, translation: { en: 'Grande, please.', ru: 'Гранде, пожалуйста.' } },
          { text: '메뉴판 주세요.', correct: false, nextIndex: 8, translation: { en: 'Menu, please.', ru: 'Дайте меню.' } }
        ]
      },
      { // 8: Menu
        npc: '네, 여기 메뉴판입니다. 천천히 고르시고 말씀해주세요.',
        npcTranslation: { en: 'Yes, here is the menu. Take your time and let me know.', ru: 'Да, вот меню. Выбирайте не спеша и скажите мне.' },
        options: [
          { text: '아이스 아메리카노 그란데 주세요.', correct: true, nextIndex: 2, translation: { en: 'Iced Americano Grande, please.', ru: 'Айс американо гранде, пожалуйста.' } },
          { text: '다음에 올게요.', correct: false, nextIndex: 'end', translation: { en: 'I\'ll come next time.', ru: 'Зайду в следующий раз.' } }
        ]
      }
    ]
  },
  {
    id: 'restaurant_order',
    category: 'restaurant',
    title: { ko: '식당에서 주문', en: 'Restaurant Order', ru: 'Заказ в ресторане' },
    icon: '🍜',
    steps: [
      {
        npc: '어서 오세요! 몇 분이세요?',
        npcTranslation: { en: 'Welcome! How many people?', ru: 'Добро пожаловать! Сколько вас?' },
        options: [
          { text: '두 명이에요', correct: true, translation: { en: 'Two people', ru: 'Нас двое' } },
          { text: '야, 자리 있어?', correct: false, nextIndex: 5, translation: { en: 'Hey, got any seats?', ru: 'Эй, места есть?' } },
          { text: '안녕하세요', correct: false, translation: { en: 'Hello', ru: 'Здравствуйте' } },
          { text: '메뉴판 주세요', correct: false, translation: { en: 'Menu, please', ru: 'Дайте меню' } },
        ]
      },
      {
        npc: '이쪽으로 앉으세요. 메뉴 여기 있어요.',
        npcTranslation: { en: 'Please sit here. Here\'s the menu.', ru: 'Садитесь сюда. Вот меню.' },
        options: [
          { text: '감사합니다', correct: true, translation: { en: 'Thank you', ru: 'Спасибо' } },
          { text: '주문할게요', correct: false, translation: { en: 'I\'ll order', ru: 'Я закажу' } },
          { text: '물 좀 주세요', correct: false, translation: { en: 'Water, please', ru: 'Воду, пожалуйста' } },
          { text: '계산해 주세요', correct: false, translation: { en: 'Check, please', ru: 'Счёт, пожалуйста' } },
        ]
      },
      {
        npc: '주문 도와드릴까요?',
        npcTranslation: { en: 'May I help you with your order?', ru: 'Помочь с заказом?' },
        options: [
          { text: '비빔밥 하나 주세요', correct: true, translation: { en: 'One bibimbap, please', ru: 'Один пибимпаб, пожалуйста' } },
          { text: '불고기 주세요', correct: true, translation: { en: 'Bulgogi, please', ru: 'Пульгоги, пожалуйста' } },
          { text: '저기요!', correct: false, translation: { en: 'Excuse me!', ru: 'Эй!' } },
          { text: '맛있어요', correct: false, translation: { en: 'It\'s delicious', ru: 'Вкусно' } },
          { text: '안 먹을게요', correct: false, translation: { en: 'I won\'t eat', ru: 'Я не буду есть' } },
        ]
      },
      {
        npc: '음료는 뭐 드릴까요?',
        npcTranslation: { en: 'What would you like to drink?', ru: 'Что будете пить?' },
        options: [
          { text: '물 주세요', correct: true, translation: { en: 'Water, please', ru: 'Воду, пожалуйста' } },
          { text: '콜라 주세요', correct: true, translation: { en: 'Cola, please', ru: 'Колу, пожалуйста' } },
          { text: '안 먹을게요', correct: false, translation: { en: 'I won\'t eat', ru: 'Я не буду есть' } },
          { text: '너무 매워요', correct: false, translation: { en: 'It\'s too spicy', ru: 'Слишком острое' } },
        ]
      },
      {
        npc: '맛있게 드세요!',
        npcTranslation: { en: 'Enjoy your meal!', ru: 'Приятного аппетита!' },
        options: [
          { text: '잘 먹겠습니다!', correct: true, nextIndex: 'end', translation: { en: 'I will eat well!', ru: 'Я буду есть с удовольствием!' } },
          { text: '감사합니다', correct: true, nextIndex: 'end', translation: { en: 'Thank you', ru: 'Спасибо' } },
          { text: '안녕히 가세요', correct: false, nextIndex: 'end', translation: { en: 'Goodbye', ru: 'До свидания' } },
        ]
      },
      { // 5: Rude path
        npc: '손님, 반말은 기분이 나쁩니다. 예의를 지켜주세요. 몇 분이신가요?',
        npcTranslation: { en: 'Customer, informal language is offensive. Please be polite. How many people?', ru: 'Уважаемый, неформальная речь оскорбительна. Будьте вежливы. Сколько вас?' },
        options: [
          { text: '아... 죄송합니다. 두 명이에요.', correct: true, nextIndex: 1, translation: { en: 'Ah... I am sorry. Two people.', ru: 'А... Извините. Нас двое.' } },
          { text: '내가 왜?', correct: false, nextIndex: 'end', translation: { en: 'Why should I?', ru: 'С какой стати?' } },
        ]
      },
      { // 6: Bathroom in restaurant
        npc: '화장실은 입구 옆에 있습니다. 자리는 몇 분이신가요?',
        npcTranslation: { en: 'The bathroom is next to the entrance. How many for your table?', ru: 'Туалет рядом со входом. На сколько персон столик?' },
        options: [
          { text: '두 명이에요.', correct: true, nextIndex: 1, translation: { en: 'Two people.', ru: 'Два человека.' } },
          { text: '화장실만 갈게요.', correct: false, nextIndex: 'end', translation: { en: 'I\'ll just go to the bathroom.', ru: 'Я только в туалет.' } }
        ]
      },
      { // 7: Call loudly
        npc: '네, 부르셨습니까? 주문하시겠어요?',
        npcTranslation: { en: 'Yes, did you call? Would you like to order?', ru: 'Да, вы звали? Будете заказывать?' },
        options: [
          { text: '비빔밥 하나 주세요.', correct: true, nextIndex: 3, translation: { en: 'One bibimbap, please.', ru: 'Один пибимпаб, пожалуйста.' } },
          { text: '물 좀 주세요.', correct: false, nextIndex: 8, translation: { en: 'Water, please.', ru: 'Воду, пожалуйста.' } }
        ]
      },
      { // 8: Water
        npc: '물은 셀프입니다. 정수기를 이용해 주세요. 음료는 필요 없으신가요?',
        npcTranslation: { en: 'Water is self-service. Please use the water purifier. Do you need any drinks?', ru: 'Вода самообслуживание. Воспользуйтесь кулером. Напитки не нужны?' },
        options: [
          { text: '콜라 하나 주세요.', correct: true, nextIndex: 4, translation: { en: 'One cola, please.', ru: 'Колу, пожалуйста.' } },
          { text: '아니요, 괜찮아요.', correct: true, nextIndex: 4, translation: { en: 'No, it\'s fine.', ru: 'Нет, всё в порядке.' } }
        ]
      }
    ]
  },
  {
    id: 'taxi_ride',
    category: 'transport',
    title: { ko: '택시 타기', en: 'Taking a Taxi', ru: 'Поездка на такси' },
    icon: '🚕',
    steps: [
      {
        npc: '어디로 가실 거예요?',
        npcTranslation: { en: 'Where are you going?', ru: 'Куда поедем?' },
        options: [
          { text: '서울역으로 가주세요', correct: true, translation: { en: 'To Seoul Station, please', ru: 'На Сеульский вокзал, пожалуйста' } },
          { text: '인천공항으로 가주세요', correct: true, translation: { en: 'To Incheon Airport, please', ru: 'В аэропорт Инчхон, пожалуйста' } },
          { text: '감사합니다', correct: false, translation: { en: 'Thank you', ru: 'Спасибо' } },
          { text: '얼마예요?', correct: false, translation: { en: 'How much?', ru: 'Сколько стоит?' } },
          { text: '여기가 어디예요?', correct: false, translation: { en: 'Where is this?', ru: 'Где я?' } },
        ]
      },
      {
        npc: '네, 알겠습니다. 길이 좀 막힐 수 있어요.',
        npcTranslation: { en: 'Okay. There might be some traffic.', ru: 'Хорошо. Могут быть пробки.' },
        options: [
          { text: '괜찮아요', correct: true, translation: { en: 'It\'s okay', ru: 'Ничего страшного' } },
          { text: '얼마나 걸릴까요?', correct: true, translation: { en: 'How long will it take?', ru: 'Сколько времени это займет?' } },
          { text: '여기서 그냥 내려주세요', correct: false, nextIndex: 3, translation: { en: 'Just let me off here', ru: 'Просто высадите меня здесь' } },
        ]
      },
      {
        npc: '다 왔습니다! 8,500원이에요.',
        npcTranslation: { en: 'We\'re here! That\'s 8,500 won.', ru: 'Приехали! 8,500 вон.' },
        options: [
          { text: '카드로 할게요', correct: true, nextIndex: 'end', translation: { en: 'I\'ll pay by card', ru: 'Картой' } },
          { text: '감사합니다. 안녕히 계세요!', correct: true, nextIndex: 'end', translation: { en: 'Thank you. Goodbye!', ru: 'Спасибо. До свидания!' } },
        ]
      },
      { // 3: Let me off here early
        npc: '아직 목적지에 도착하지 않았습니다. 여기서 내리시면 기본요금 4,800원입니다.',
        npcTranslation: { en: 'We haven\'t reached your destination yet. If you get off here, the basic fare is 4,800 won.', ru: 'Мы еще не приехали. Если выйдете здесь, базовый тариф 4,800 вон.' },
        options: [
          { text: '여기 현금이요.', correct: true, nextIndex: 'end', translation: { en: 'Here is cash.', ru: 'Вот наличные.' } },
          { text: '그냥 계속 가주세요.', correct: true, nextIndex: 2, translation: { en: 'Just keep going, please.', ru: 'Поехали дальше.' } },
        ]
      },
      { // 4: Where is this
        npc: '여기는 강남대로입니다. 목적지를 정확히 말씀해 주시겠어요?',
        npcTranslation: { en: 'This is Gangnam-daero. Could you tell me your destination exactly?', ru: 'Это Каннам-дэро. Назовите точно место назначения?' },
        options: [
          { text: '아, 서울역으로 가주세요.', correct: true, nextIndex: 1, translation: { en: 'Ah, to Seoul Station, please.', ru: 'А, на Сеульский вокзал, пожалуйста.' } },
          { text: '모르겠어요. 내릴게요.', correct: false, nextIndex: 'end', translation: { en: 'I don\'t know. I\'ll get off.', ru: 'Не знаю. Я выхожу.' } }
        ]
      }
    ]
  },
  {
    id: 'shopping_store',
    category: 'shopping',
    title: { ko: '편의점에서', en: 'At the Convenience Store', ru: 'В магазине' },
    icon: '🏪',
    steps: [
      {
        npc: '어서 오세요~',
        npcTranslation: { en: 'Welcome~', ru: 'Добро пожаловать~' },
        options: [
          { text: '안녕하세요!', correct: true, translation: { en: 'Hello!', ru: 'Здравствуйте!' } },
          { text: '야, 담배 하나 줘', correct: false, nextIndex: 4, translation: { en: 'Hey, give me a cigarette', ru: 'Эй, дай сигарету' } },
          { text: '이거 얼마예요?', correct: false, nextIndex: 5, translation: { en: 'How much is this?', ru: 'Сколько это стоит?' } },
        ]
      },
      { // 1
        npc: '찾으시는 거 있으세요?',
        npcTranslation: { en: 'Are you looking for something?', ru: 'Что-то ищете?' },
        options: [
          { text: '물 어디 있어요?', correct: true, translation: { en: 'Where is the water?', ru: 'Где вода?' } },
          { text: '아니요, 괜찮아요. 그냥 볼게요', correct: true, translation: { en: 'No, I\'m fine. Just looking', ru: 'Нет, спасибо. Просто смотрю' } },
          { text: '맛있어요', correct: false, nextIndex: 6, translation: { en: 'It\'s delicious', ru: 'Вкусно' } },
        ]
      },
      { // 2
        npc: '봉투 필요하세요?',
        npcTranslation: { en: 'Do you need a bag?', ru: 'Пакет нужен?' },
        options: [
          { text: '네, 주세요', correct: true, translation: { en: 'Yes, please', ru: 'Да, дайте' } },
          { text: '아니요, 괜찮아요', correct: true, translation: { en: 'No, it\'s fine', ru: 'Нет, не надо' } },
          { text: '얼마예요?', correct: false, nextIndex: 7, translation: { en: 'How much?', ru: 'Сколько стоит?' } },
        ]
      },
      { // 3
        npc: '3,200원입니다.',
        npcTranslation: { en: 'That\'s 3,200 won.', ru: '3,200 вон.' },
        options: [
          { text: '카드로 할게요', correct: true, nextIndex: 'end', translation: { en: 'I\'ll pay by card', ru: 'Картой' } },
          { text: '현금이요', correct: true, nextIndex: 'end', translation: { en: 'Cash', ru: 'Наличными' } },
          { text: '환불해 주세요', correct: false, nextIndex: 8, translation: { en: 'Refund, please', ru: 'Верните деньги' } },
        ]
      },
      { // 4: Rude
        npc: '손님, 반말은 삼가주세요. 신분증 먼저 보여주시겠어요?',
        npcTranslation: { en: 'Customer, please don\'t use informal language. Can I see your ID first?', ru: 'Клиент, пожалуйста, без фамильярностей. Покажите ваше удостоверение личности?' },
        options: [
          { text: '죄송합니다. 여기 신분증이요.', correct: true, nextIndex: 2, translation: { en: 'Sorry. Here is my ID.', ru: 'Извините. Вот паспорт.' } },
          { text: '안 사!', correct: false, nextIndex: 'end', translation: { en: 'I won\'t buy it!', ru: 'Не буду покупать!' } },
        ]
      },
      { // 5: How much is this
        npc: '그건 1,500원입니다. 더 찾으시는 거 있으세요?',
        npcTranslation: { en: 'That is 1,500 won. Are you looking for anything else?', ru: 'Это стоит 1,500 вон. Ищете что-то еще?' },
        options: [
          { text: '물은 어디 있어요?', correct: true, nextIndex: 2, translation: { en: 'Where is the water?', ru: 'Где вода?' } },
          { text: '아니요, 이거만 계산해 주세요.', correct: true, nextIndex: 2, translation: { en: 'No, just check this out please.', ru: 'Нет, посчитайте только это.' } },
        ]
      },
      { // 6: Delicious
        npc: '네? 아직 드시지도 않았는데요... 찾으시는 거 있으신가요?',
        npcTranslation: { en: 'Excuse me? You haven\'t eaten it yet... Are you looking for something?', ru: 'Что? Вы же еще не ели... Вы что-то ищете?' },
        options: [
          { text: '아, 물 어디 있어요?', correct: true, nextIndex: 2, translation: { en: 'Ah, where is the water?', ru: 'А, где вода?' } },
        ]
      },
      { // 7: Bag cost
        npc: '봉투는 50원입니다. 필요하신가요?',
        npcTranslation: { en: 'The bag is 50 won. Do you need one?', ru: 'Пакет стоит 50 вон. Нужен?' },
        options: [
          { text: '네, 주세요.', correct: true, nextIndex: 3, translation: { en: 'Yes, please.', ru: 'Да, дайте.' } },
          { text: '아니요, 괜찮아요.', correct: true, nextIndex: 3, translation: { en: 'No, I\'m fine.', ru: 'Нет, спасибо.' } }
        ]
      },
      { // 8: Refund before paying
        npc: '손님, 아직 결제도 안 하셨습니다. 카드로 하시겠어요, 현금으로 하시겠어요?',
        npcTranslation: { en: 'Customer, you haven\'t paid yet. Card or cash?', ru: 'Клиент, вы еще не заплатили. Картой или наличными?' },
        options: [
          { text: '아, 카드로 할게요.', correct: true, nextIndex: 'end', translation: { en: 'Ah, by card.', ru: 'А, картой.' } },
          { text: '안 살래요.', correct: false, nextIndex: 'end', translation: { en: 'I won\'t buy it.', ru: 'Не буду покупать.' } }
        ]
      }
    ]
  },
  {
    id: 'ask_directions',
    category: 'directions',
    title: { ko: '길 묻기', en: 'Asking for Directions', ru: 'Спросить дорогу' },
    icon: '🗺️',
    steps: [
      {
        npc: '(Вы потерялись на улице и видите прохожего)',
        npcTranslation: { en: '(You are lost and see a passerby)', ru: '(Вы потерялись и видите прохожего)' },
        options: [
          { text: '저기요, 지하철역이 어디예요?', correct: true, translation: { en: 'Excuse me, where is the subway station?', ru: 'Извините, где станция метро?' } },
          { text: '실례합니다, 길 좀 물을게요', correct: true, translation: { en: 'Excuse me, may I ask for directions?', ru: 'Извините, подскажите дорогу' } },
          { text: '감사합니다', correct: false, nextIndex: 3, translation: { en: 'Thank you', ru: 'Спасибо' } },
          { text: '안녕히 가세요', correct: false, nextIndex: 4, translation: { en: 'Goodbye', ru: 'До свидания' } },
          { text: '배가 고파요', correct: false, nextIndex: 5, translation: { en: 'I\'m hungry', ru: 'Я голоден' } },
        ]
      },
      { // 1
        npc: '아, 여기서 직진하시고 오른쪽으로 가세요.',
        npcTranslation: { en: 'Oh, go straight and then turn right.', ru: 'А, идите прямо и поверните направо.' },
        options: [
          { text: '감사합니다! 얼마나 멀어요?', correct: true, translation: { en: 'Thanks! How far is it?', ru: 'Спасибо! Как далеко?' } },
          { text: '네, 알겠습니다. 감사합니다!', correct: true, nextIndex: 'end', translation: { en: 'Yes, I understand. Thank you!', ru: 'Да, понял. Спасибо!' } },
          { text: '왼쪽이요?', correct: false, nextIndex: 6, translation: { en: 'Left?', ru: 'Налево?' } },
          { text: '다시 한번 말씀해 주세요', correct: false, nextIndex: 7, translation: { en: 'Please say it again', ru: 'Повторите, пожалуйста' } },
        ]
      },
      { // 2
        npc: '걸어서 5분 정도 걸려요.',
        npcTranslation: { en: 'About 5 minutes on foot.', ru: 'Примерно 5 минут пешком.' },
        options: [
          { text: '감사합니다! 좋은 하루 되세요!', correct: true, nextIndex: 'end', translation: { en: 'Thank you! Have a nice day!', ru: 'Спасибо! Хорошего дня!' } },
          { text: '네, 알겠습니다', correct: true, nextIndex: 'end', translation: { en: 'Yes, I understand', ru: 'Да, понял' } },
          { text: '택시 타고 갈게요', correct: false, nextIndex: 8, translation: { en: 'I\'ll take a taxi', ru: 'Я поеду на такси' } },
          { text: '너무 멀어요', correct: false, nextIndex: 9, translation: { en: 'Too far', ru: 'Слишком далеко' } },
        ]
      },
      { // 3: Thank you without asking
        npc: '네? 아무것도 안 물어보셨는데요... 어디 찾으세요?',
        npcTranslation: { en: 'Pardon? You haven\'t asked anything... Where are you looking for?', ru: 'Что? Вы же ничего не спросили... Что вы ищете?' },
        options: [
          { text: '아, 지하철역이 어디예요?', correct: true, nextIndex: 1, translation: { en: 'Ah, where is the subway station?', ru: 'А, где станция метро?' } },
        ]
      },
      { // 4: Goodbye early
        npc: '어... 네, 안녕히 가세요.',
        npcTranslation: { en: 'Uh... yes, goodbye.', ru: 'Эм... да, до свидания.' },
        options: [{ text: '(Leave)', correct: true, nextIndex: 'end' }]
      },
      { // 5: Hungry
        npc: '저는 그냥 지나가는 사람인데요... 저쪽에 식당이 있어요. 길을 찾으시나요?',
        npcTranslation: { en: 'I\'m just a passerby... There is a restaurant over there. Are you looking for directions?', ru: 'Я просто прохожий... Вон там есть ресторан. Вы ищете дорогу?' },
        options: [
          { text: '지하철역이 어디예요?', correct: true, nextIndex: 1, translation: { en: 'Where is the subway station?', ru: 'Где станция метро?' } },
        ]
      },
      { // 6: Left?
        npc: '아니요, 오른쪽입니다! 직진 후 오른쪽이요. 이해하셨나요?',
        npcTranslation: { en: 'No, right! Straight and then right. Did you understand?', ru: 'Нет, направо! Прямо и направо. Поняли?' },
        options: [
          { text: '감사합니다! 얼마나 멀어요?', correct: true, nextIndex: 2, translation: { en: 'Thanks! How far is it?', ru: 'Спасибо! Как далеко?' } },
        ]
      },
      { // 7: Repeat
        npc: '직진하시고 오른쪽으로 가시면 됩니다.',
        npcTranslation: { en: 'Go straight and turn right.', ru: 'Идите прямо и поверните направо.' },
        options: [
          { text: '감사합니다! 얼마나 멀어요?', correct: true, nextIndex: 2, translation: { en: 'Thanks! How far is it?', ru: 'Спасибо! Как далеко?' } },
        ]
      },
      { // 8: Taxi
        npc: '5분 거리인데 택시를 타시게요? 네, 알겠습니다. 안녕히 가세요.',
        npcTranslation: { en: 'You are taking a taxi for a 5-minute distance? Okay, goodbye.', ru: 'Такси на 5 минут пути? Ну хорошо, до свидания.' },
        options: [{ text: '안녕히 계세요.', correct: true, nextIndex: 'end' }]
      },
      { // 9: Too far
        npc: '5분밖에 안 걸려요! 금방 갈 수 있어요.',
        npcTranslation: { en: 'It only takes 5 minutes! You can get there quickly.', ru: 'Всего 5 минут! Быстро дойдете.' },
        options: [{ text: '감사합니다.', correct: true, nextIndex: 'end' }]
      }
    ]
  },
  {
    id: 'airport_checkin',
    category: 'travel',
    title: { ko: '공항 탑승수속', en: 'Airport Check-in', ru: 'Регистрация в аэропорту' },
    icon: '✈️',
    steps: [
      {
        npc: '여권과 항공권을 보여주시겠어요?',
        npcTranslation: { en: 'May I see your passport and ticket?', ru: 'Покажите ваш паспорт и билет, пожалуйста.' },
        options: [
          { text: '네, 여기 있습니다.', correct: true, translation: { en: 'Yes, here you go.', ru: 'Да, вот, пожалуйста.' } },
          { text: '어디로 가요?', correct: false, nextIndex: 4, translation: { en: 'Where are we going?', ru: 'Куда мы едем?' } },
          { text: '안녕히 계세요.', correct: false, nextIndex: 5, translation: { en: 'Goodbye.', ru: 'До свидания.' } },
          { text: '안 가져왔어요.', correct: false, nextIndex: 6, translation: { en: 'I didn\'t bring it.', ru: 'Я не взял.' } },
        ]
      },
      { // 1
        npc: '수하물로 부치실 가방이 있으신가요?',
        npcTranslation: { en: 'Do you have any bags to check?', ru: 'У вас есть багаж для сдачи?' },
        options: [
          { text: '네, 이 가방 하나요.', correct: true, translation: { en: 'Yes, this one bag.', ru: 'Да, одна сумка.' } },
          { text: '기내에 가지고 탈게요.', correct: true, nextIndex: 8, translation: { en: 'I\'ll take it on board.', ru: 'Возьму с собой в салон.' } },
          { text: '얼마예요?', correct: false, nextIndex: 7, translation: { en: 'How much?', ru: 'Сколько стоит?' } },
          { text: '가방이 없어요.', correct: false, nextIndex: 8, translation: { en: 'I don\'t have a bag.', ru: 'У меня нет сумки.' } },
        ]
      },
      { // 2
        npc: '창가 자리와 통로 자리 중 어디가 좋으신가요?',
        npcTranslation: { en: 'Would you prefer a window or an aisle seat?', ru: 'Вы предпочитаете место у окна или у прохода?' },
        options: [
          { text: '창가 자리로 부탁드려요.', correct: true, translation: { en: 'Window seat, please.', ru: 'У окна, пожалуйста.' } },
          { text: '통로 자리가 좋아요.', correct: true, translation: { en: 'I\'d like an aisle seat.', ru: 'У прохода.' } },
          { text: '집에 갈래요.', correct: false, nextIndex: 9, translation: { en: 'I want to go home.', ru: 'Хочу домой.' } },
          { text: '상관없어요.', correct: false, nextIndex: 10, translation: { en: 'I don\'t mind.', ru: 'Мне всё равно.' } },
        ]
      },
      { // 3
        npc: '탑승구는 15번이며, 탑승은 10시 30분에 시작합니다.',
        npcTranslation: { en: 'Your gate is 15, and boarding starts at 10:30.', ru: 'Ваш выход 15, посадка начинается в 10:30.' },
        options: [
          { text: '감사합니다.', correct: true, nextIndex: 'end', translation: { en: 'Thank you.', ru: 'Спасибо.' } },
          { text: '알겠습니다.', correct: true, nextIndex: 'end', translation: { en: 'Understood.', ru: 'Понял.' } },
          { text: '비행기를 놓쳤어요.', correct: false, nextIndex: 11, translation: { en: 'I missed my flight.', ru: 'Я опоздал на рейс.' } },
          { text: '너무 비싸요.', correct: false, nextIndex: 12, translation: { en: 'Too expensive.', ru: 'Слишком дорого.' } },
        ]
      },
      { // 4: Where are we going
        npc: '손님, 비행기 표에 적혀있습니다. 여권과 항공권을 보여주시겠습니까?',
        npcTranslation: { en: 'Sir, it\'s written on your ticket. May I see your passport and ticket?', ru: 'Уважаемый, это написано в билете. Покажите паспорт и билет?' },
        options: [
          { text: '아, 여기 있습니다.', correct: true, nextIndex: 1, translation: { en: 'Ah, here they are.', ru: 'А, вот они.' } },
        ]
      },
      { // 5: Goodbye early
        npc: '지금 가시면 비행기를 놓치십니다! 수속 안 하시나요?',
        npcTranslation: { en: 'If you leave now, you will miss your flight! Are you not checking in?', ru: 'Если вы уйдете сейчас, вы опоздаете на рейс! Не будете регистрироваться?' },
        options: [
          { text: '할게요. 여기 여권이요.', correct: true, nextIndex: 1, translation: { en: 'I will. Here is my passport.', ru: 'Буду. Вот паспорт.' } },
          { text: '안 해요.', correct: false, nextIndex: 'end', translation: { en: 'I won\'t.', ru: 'Не буду.' } }
        ]
      },
      { // 6: No passport
        npc: '여권이 없으면 비행기에 탑승하실 수 없습니다. 얼른 가져오세요!',
        npcTranslation: { en: 'You cannot board without a passport. Please go get it!', ru: 'Без паспорта посадка невозможна. Сходите за ним!' },
        options: [
          { text: '알겠습니다...', correct: true, nextIndex: 'end', translation: { en: 'Understood...', ru: 'Понял...' } }
        ]
      },
      { // 7: How much
        npc: '수하물 추가 비용은 없습니다. 부치실 가방이 있으신가요?',
        npcTranslation: { en: 'There is no extra charge for baggage. Do you have any bags to check?', ru: 'За багаж платить не нужно. Будете сдавать сумки?' },
        options: [
          { text: '네, 이 가방 하나요.', correct: true, nextIndex: 2, translation: { en: 'Yes, this one bag.', ru: 'Да, одна сумка.' } }
        ]
      },
      { // 8: No bags
        npc: '네, 부치실 가방이 없으시군요. 알겠습니다.',
        npcTranslation: { en: 'Okay, no bags to check. Understood.', ru: 'Хорошо, багажа нет. Понял.' },
        options: [
          { text: '네.', correct: true, nextIndex: 2, translation: { en: 'Yes.', ru: 'Да.' } }
        ]
      },
      { // 9: Go home
        npc: '지금요? 비행기를 취소하시겠습니까?',
        npcTranslation: { en: 'Now? Are you cancelling your flight?', ru: 'Сейчас? Вы отменяете рейс?' },
        options: [
          { text: '아니요, 농담이에요. 창가 자리 주세요.', correct: true, nextIndex: 3, translation: { en: 'No, just joking. Window seat, please.', ru: 'Нет, шучу. Место у окна, пожалуйста.' } }
        ]
      },
      { // 10: I don't mind
        npc: '그럼 창가 자리로 배정해 드리겠습니다.',
        npcTranslation: { en: 'Then I will assign you a window seat.', ru: 'Тогда я назначу вам место у окна.' },
        options: [
          { text: '감사합니다.', correct: true, nextIndex: 3, translation: { en: 'Thank you.', ru: 'Спасибо.' } }
        ]
      },
      { // 11: Missed flight
        npc: '아닙니다, 아직 탑승 시작 전입니다. 늦지 않았으니 안심하세요.',
        npcTranslation: { en: 'No, boarding hasn\'t started yet. Don\'t worry, you are not late.', ru: 'Нет, посадка еще не началась. Не волнуйтесь, вы не опоздали.' },
        options: [
          { text: '다행이네요.', correct: true, nextIndex: 'end', translation: { en: 'That\'s a relief.', ru: 'Какое облегчение.' } }
        ]
      },
      { // 12: Too expensive
        npc: '항공권은 이미 결제하셨습니다. 즐거운 여행 되세요!',
        npcTranslation: { en: 'You have already paid for the ticket. Have a nice trip!', ru: 'Билет уже оплачен. Приятного полета!' },
        options: [
          { text: '감사합니다!', correct: true, nextIndex: 'end', translation: { en: 'Thank you!', ru: 'Спасибо!' } }
        ]
      }
    ]
  },
  {
    id: 'hotel_checkin',
    category: 'travel',
    title: { ko: '호텔 체크인', en: 'Hotel Check-in', ru: 'Заселение в отель' },
    icon: '🏨',
    steps: [
      {
        npc: '어서 오십시오. 체크인하시겠습니까?',
        npcTranslation: { en: 'Welcome. Would you like to check in?', ru: 'Добро пожаловать. Хотите заселиться?' },
        options: [
          { text: '네, 예약했습니다.', correct: true, translation: { en: 'Yes, I have a reservation.', ru: 'Да, я бронировал.' } },
          { text: '밥 먹고 싶어요.', correct: false, nextIndex: 4, translation: { en: 'I want to eat.', ru: 'Хочу поесть.' } },
          { text: '체크아웃 할게요.', correct: false, nextIndex: 5, translation: { en: 'I\'ll check out.', ru: 'Я выселяюсь.' } },
          { text: '방이 있어요?', correct: false, nextIndex: 6, translation: { en: 'Do you have a room?', ru: 'Есть свободные номера?' } },
        ]
      },
      { // 1
        npc: '예약자 성함이 어떻게 되시나요?',
        npcTranslation: { en: 'What name is the reservation under?', ru: 'На чье имя бронь?' },
        options: [
          { text: '제 이름은 이반입니다.', correct: true, translation: { en: 'My name is Ivan.', ru: 'Меня зовут Иван.' } },
          { text: '방이 없어요.', correct: false, nextIndex: 7, translation: { en: 'There\'s no room.', ru: 'Нет комнаты.' } },
          { text: '모르겠어요.', correct: false, nextIndex: 8, translation: { en: 'I don\'t know.', ru: 'Не знаю.' } },
          { text: '여권 어디 있어요?', correct: false, nextIndex: 9, translation: { en: 'Where is the passport?', ru: 'Где паспорт?' } },
        ]
      },
      { // 2
        npc: '네, 확인되었습니다. 2박 3일 맞으신가요?',
        npcTranslation: { en: 'Yes, confirmed. Is it for 3 days and 2 nights?', ru: 'Да, подтверждено. На 3 дня и 2 ночи?' },
        options: [
          { text: '네, 맞습니다.', correct: true, translation: { en: 'Yes, that\'s right.', ru: 'Да, верно.' } },
          { text: '아니요, 3박 4일입니다.', correct: true, translation: { en: 'No, it\'s 4 days 3 nights.', ru: 'Нет, на 4 дня и 3 ночи.' } },
          { text: '내일 갈게요.', correct: false, nextIndex: 10, translation: { en: 'I\'ll go tomorrow.', ru: 'Я поеду завтра.' } },
          { text: '취소하고 싶어요.', correct: false, nextIndex: 11, translation: { en: 'I want to cancel.', ru: 'Хочу отменить.' } },
        ]
      },
      { // 3
        npc: '객실은 502호입니다. 조식은 1층에서 7시부터 가능합니다.',
        npcTranslation: { en: 'Your room is 502. Breakfast is available on the 1st floor from 7 AM.', ru: 'Ваш номер 502. Завтрак на 1 этаже с 7 утра.' },
        options: [
          { text: '알겠습니다. 감사합니다.', correct: true, nextIndex: 'end', translation: { en: 'Understood. Thank you.', ru: 'Понял. Спасибо.' } },
          { text: '조식 안 먹어요.', correct: true, nextIndex: 12, translation: { en: 'I won\'t have breakfast.', ru: 'Я не буду завтракать.' } },
          { text: '지금 몇 시예요?', correct: false, nextIndex: 13, translation: { en: 'What time is it now?', ru: 'Сколько сейчас времени?' } },
          { text: '어디로 가요?', correct: false, nextIndex: 14, translation: { en: 'Where are we going?', ru: 'Куда идти?' } },
        ]
      },
      { // 4: Eat
        npc: '식당은 1층에 있습니다만, 먼저 체크인을 도와드릴까요?',
        npcTranslation: { en: 'The restaurant is on the 1st floor, but shall I help you check in first?', ru: 'Ресторан на первом этаже, но может сначала оформим заезд?' },
        options: [
          { text: '네, 예약했습니다.', correct: true, nextIndex: 1, translation: { en: 'Yes, I made a reservation.', ru: 'Да, я забронировал.' } }
        ]
      },
      { // 5: Check out early
        npc: '체크아웃이요? 방금 오신 것 같은데요... 혹시 예약하셨나요?',
        npcTranslation: { en: 'Check out? You just arrived... Did you make a reservation?', ru: 'Выселиться? Вы же только пришли... Вы бронировали номер?' },
        options: [
          { text: '아, 체크인이요. 예약했어요.', correct: true, nextIndex: 1, translation: { en: 'Ah, check-in. I have a reservation.', ru: 'А, заселиться. Я забронировал.' } }
        ]
      },
      { // 6: Do you have a room
        npc: '오늘은 빈 객실이 없습니다. 혹시 예약을 하셨나요?',
        npcTranslation: { en: 'We have no empty rooms today. Did you make a reservation?', ru: 'Сегодня нет свободных номеров. Вы бронировали?' },
        options: [
          { text: '네, 예약했습니다.', correct: true, nextIndex: 1, translation: { en: 'Yes, I did.', ru: 'Да.' } },
          { text: '아니요. 갈게요.', correct: false, nextIndex: 'end', translation: { en: 'No. I will go.', ru: 'Нет. Я пойду.' } }
        ]
      },
      { // 7: No room
        npc: '예약 내역을 확인해 보겠습니다. 성함이 어떻게 되시나요?',
        npcTranslation: { en: 'Let me check the reservations. What is your name?', ru: 'Давайте проверю бронь. Как вас зовут?' },
        options: [
          { text: '제 이름은 이반입니다.', correct: true, nextIndex: 2, translation: { en: 'My name is Ivan.', ru: 'Меня зовут Иван.' } }
        ]
      },
      { // 8: Don't know
        npc: '본인 성함을 모르신다고요? 여권을 보여주시겠습니까?',
        npcTranslation: { en: 'You don\'t know your own name? May I see your passport?', ru: 'Вы не знаете свое имя? Можно ваш паспорт?' },
        options: [
          { text: '아, 이반입니다.', correct: true, nextIndex: 2, translation: { en: 'Ah, it\'s Ivan.', ru: 'А, я Иван.' } }
        ]
      },
      { // 9: Where is passport
        npc: '여권은 손님 가방에 있겠죠. 예약자 성함을 말씀해 주시겠어요?',
        npcTranslation: { en: 'Your passport should be in your bag. Could you tell me the reservation name?', ru: 'Паспорт, наверное, в вашей сумке. Назовите имя брони?' },
        options: [
          { text: '이반입니다.', correct: true, nextIndex: 2, translation: { en: 'It\'s Ivan.', ru: 'Иван.' } }
        ]
      },
      { // 10: Go tomorrow
        npc: '내일 가신다고요? 2박 요금이 이미 결제되었습니다.',
        npcTranslation: { en: 'You are leaving tomorrow? The 2-night fee is already paid.', ru: 'Вы уезжаете завтра? Оплата за 2 ночи уже прошла.' },
        options: [
          { text: '그냥 2박 할게요.', correct: true, nextIndex: 3, translation: { en: 'I will just stay for 2 nights.', ru: 'Тогда останусь на 2 ночи.' } }
        ]
      },
      { // 11: Cancel
        npc: '당일 취소는 환불이 불가능합니다. 체크인하시겠습니까?',
        npcTranslation: { en: 'Same-day cancellation is non-refundable. Would you like to check in?', ru: 'При отмене в тот же день деньги не возвращаются. Будете заселяться?' },
        options: [
          { text: '네, 그냥 할게요.', correct: true, nextIndex: 3, translation: { en: 'Yes, I\'ll just do it.', ru: 'Да, давайте.' } },
          { text: '그래도 취소할게요.', correct: false, nextIndex: 'end', translation: { en: 'I will cancel anyway.', ru: 'Всё равно отменю.' } }
        ]
      },
      { // 12: No breakfast
        npc: '네, 조식은 선택사항입니다. 여기 객실 키입니다. 좋은 시간 보내세요.',
        npcTranslation: { en: 'Yes, breakfast is optional. Here is your room key. Have a good time.', ru: 'Да, завтрак по желанию. Вот ваш ключ. Приятного отдыха.' },
        options: [
          { text: '감사합니다.', correct: true, nextIndex: 'end', translation: { en: 'Thank you.', ru: 'Спасибо.' } }
        ]
      },
      { // 13: Time
        npc: '지금은 오후 3시, 체크인 시간입니다. 여기 객실 키입니다.',
        npcTranslation: { en: 'It is 3 PM, check-in time. Here is your room key.', ru: 'Сейчас 3 часа дня, время заезда. Вот ваш ключ.' },
        options: [
          { text: '감사합니다.', correct: true, nextIndex: 'end', translation: { en: 'Thank you.', ru: 'Спасибо.' } }
        ]
      },
      { // 14: Where to go
        npc: '엘리베이터를 타고 5층으로 가시면 됩니다. 감사합니다.',
        npcTranslation: { en: 'Please take the elevator to the 5th floor. Thank you.', ru: 'Поднимитесь на лифте на 5 этаж. Спасибо.' },
        options: [
          { text: '네, 안녕히 계세요.', correct: true, nextIndex: 'end', translation: { en: 'Yes, goodbye.', ru: 'Да, до свидания.' } }
        ]
      }
    ]
  },
  {
    id: 'pharmacy_visit',
    category: 'health',
    title: { ko: '약국에서', en: 'At the Pharmacy', ru: 'В аптеке' },
    icon: '💊',
    steps: [
      {
        npc: '어떻게 오셨어요?',
        npcTranslation: { en: 'How can I help you?', ru: 'Что вас беспокоит?' },
        options: [
          { text: '머리가 아파서요. 두통약 주세요.', correct: true, translation: { en: 'I have a headache. Headache medicine, please.', ru: 'У меня болит голова. Дайте лекарство от головной боли.' } },
          { text: '배가 아파요. 소화제 주세요.', correct: true, translation: { en: 'My stomach hurts. Digestive medicine, please.', ru: 'Болит живот. Дайте средство для пищеварения.' } },
          { text: '배가 고파요.', correct: false, nextIndex: 4, translation: { en: 'I\'m hungry.', ru: 'Я голоден.' } },
          { text: '약국이 어디예요?', correct: false, nextIndex: 5, translation: { en: 'Where is the pharmacy?', ru: 'Где аптека?' } },
        ]
      },
      { // 1
        npc: '언제부터 아프셨나요?',
        npcTranslation: { en: 'Since when have you been feeling sick?', ru: 'Как давно болит?' },
        options: [
          { text: '어제 저녁부터요.', correct: true, translation: { en: 'Since yesterday evening.', ru: 'Со вчерашнего вечера.' } },
          { text: '오늘 아침부터요.', correct: true, translation: { en: 'Since this morning.', ru: 'С сегодняшнего утра.' } },
          { text: '내일부터요.', correct: false, nextIndex: 6, translation: { en: 'Since tomorrow.', ru: 'С завтрашнего дня.' } },
          { text: '아침을 먹었어요.', correct: false, nextIndex: 7, translation: { en: 'I ate breakfast.', ru: 'Я позавтракал.' } },
        ]
      },
      { // 2
        npc: '이 약을 식후 30분에 한 알씩 드세요.',
        npcTranslation: { en: 'Take one pill 30 minutes after meals.', ru: 'Принимайте по одной таблетке через 30 минут после еды.' },
        options: [
          { text: '네, 알겠습니다. 얼마예요?', correct: true, nextIndex: 'end', translation: { en: 'Yes, understood. How much?', ru: 'Да, понял. Сколько стоит?' } },
          { text: '감사합니다.', correct: true, nextIndex: 'end', translation: { en: 'Thank you.', ru: 'Спасибо.' } },
          { text: '밥은 안 먹어요.', correct: false, nextIndex: 8, translation: { en: 'I don\'t eat meals.', ru: 'Я не ем.' } },
          { text: '아니요, 싫어요.', correct: false, nextIndex: 9, translation: { en: 'No, I don\'t want to.', ru: 'Нет, не хочу.' } },
        ]
      },
      { // 4: Hungry
        npc: '여기는 약국입니다. 음식을 팔지 않아요. 어디 아프신 곳이 있나요?',
        npcTranslation: { en: 'This is a pharmacy. We don\'t sell food. Are you feeling sick anywhere?', ru: 'Это аптека. Мы не продаем еду. У вас где-то болит?' },
        options: [
          { text: '아, 배가 아파요. 약 주세요.', correct: true, nextIndex: 1, translation: { en: 'Ah, my stomach hurts. Medicine, please.', ru: 'А, болит живот. Дайте лекарство.' } },
          { text: '안녕히 계세요.', correct: false, nextIndex: 'end', translation: { en: 'Goodbye.', ru: 'До свидания.' } }
        ]
      },
      { // 5: Where is pharmacy
        npc: '여기가 약국입니다... 증상을 말씀해 주시겠어요?',
        npcTranslation: { en: 'This is the pharmacy... Could you tell me your symptoms?', ru: 'Это и есть аптека... Назовете свои симптомы?' },
        options: [
          { text: '두통약 주세요.', correct: true, nextIndex: 1, translation: { en: 'Headache medicine, please.', ru: 'Таблетки от головы, пожалуйста.' } }
        ]
      },
      { // 6: Tomorrow
        npc: '내일부터 아프실 예정이라고요? 예방약은 없습니다. 언제부터 아프셨어요?',
        npcTranslation: { en: 'You plan to be sick from tomorrow? There is no preventive medicine for that. Since when have you been sick?', ru: 'Заболеете с завтрашнего дня? От этого нет таблеток. Как давно болит?' },
        options: [
          { text: '어제부터요.', correct: true, nextIndex: 2, translation: { en: 'Since yesterday.', ru: 'Со вчерашнего дня.' } }
        ]
      },
      { // 7: Breakfast
        npc: '뭘 드셨는지가 아니라 언제부터 아프셨는지 묻고 있습니다.',
        npcTranslation: { en: 'I am not asking what you ate, but since when you have been sick.', ru: 'Я спрашиваю не что вы ели, а как давно болит.' },
        options: [
          { text: '오늘 아침부터요.', correct: true, nextIndex: 2, translation: { en: 'Since this morning.', ru: 'С сегодняшнего утра.' } }
        ]
      },
      { // 8: No eat
        npc: '빈속에 약을 드시면 속이 쓰릴 수 있습니다. 꼭 식사 후에 드세요!',
        npcTranslation: { en: 'Taking medicine on an empty stomach can cause heartburn. Please take it after meals!', ru: 'Прием лекарств натощак может вызвать изжогу. Обязательно ешьте!' },
        options: [
          { text: '알겠습니다. 감사합니다.', correct: true, nextIndex: 'end', translation: { en: 'Understood. Thank you.', ru: 'Понял. Спасибо.' } }
        ]
      },
      { // 9: I don't want to
        npc: '약을 안 드시면 낫지 않습니다. 결제하시겠어요?',
        npcTranslation: { en: 'If you don\'t take the medicine, you won\'t get better. Would you like to pay?', ru: 'Если не будете пить лекарства, не поправитесь. Будете оплачивать?' },
        options: [
          { text: '네, 계산해 주세요.', correct: true, nextIndex: 'end', translation: { en: 'Yes, check please.', ru: 'Да, посчитайте.' } },
          { text: '그냥 갈게요.', correct: false, nextIndex: 'end', translation: { en: 'I\'ll just go.', ru: 'Я просто уйду.' } }
        ]
      }
    ]
  },
  {
    id: 'bank_exchange',
    category: 'bank',
    title: { ko: '환전하기', en: 'Exchanging Money', ru: 'Обмен валюты' },
    icon: '🏦',
    steps: [
      {
        npc: '어떤 업무를 도와드릴까요?',
        npcTranslation: { en: 'How can I assist you?', ru: 'Чем могу помочь?' },
        options: [
          { text: '환전을 하려고 하는데요.', correct: true, translation: { en: 'I\'d like to exchange money.', ru: 'Я хочу обменять валюту.' } },
          { text: '통장을 만들고 싶어요.', correct: false, nextIndex: 4, translation: { en: 'I want to open an account.', ru: 'Хочу открыть счёт.' } },
          { text: '돈을 잃어버렸어요.', correct: false, nextIndex: 5, translation: { en: 'I lost my money.', ru: 'Я потерял деньги.' } },
          { text: '집에 갈게요.', correct: false, nextIndex: 6, translation: { en: 'I\'ll go home.', ru: 'Я пойду домой.' } },
        ]
      },
      { // 1
        npc: '어떤 통화로 환전하시겠어요?',
        npcTranslation: { en: 'Which currency would you like to exchange to?', ru: 'На какую валюту хотите обменять?' },
        options: [
          { text: '달러를 한국 돈으로 바꿔주세요.', correct: true, translation: { en: 'Please exchange dollars to Korean won.', ru: 'Поменяйте доллары на воны.' } },
          { text: '유로를 한국 돈으로 바꿔주세요.', correct: true, translation: { en: 'Please exchange euros to Korean won.', ru: 'Поменяйте евро на воны.' } },
          { text: '신용카드를 만들고 싶어요.', correct: false, nextIndex: 7, translation: { en: 'I want to make a credit card.', ru: 'Хочу оформить кредитную карту.' } },
          { text: '이거 환불해 주세요.', correct: false, nextIndex: 8, translation: { en: 'Please refund this.', ru: 'Верните деньги за это.' } },
        ]
      },
      { // 2
        npc: '여권을 보여주시겠습니까?',
        npcTranslation: { en: 'May I see your passport?', ru: 'Покажите ваш паспорт?' },
        options: [
          { text: '여기 있습니다.', correct: true, translation: { en: 'Here it is.', ru: 'Вот, пожалуйста.' } },
          { text: '안 가져왔어요.', correct: false, nextIndex: 9, translation: { en: 'I didn\'t bring it.', ru: 'Я не взял.' } },
          { text: '얼마예요?', correct: false, nextIndex: 10, translation: { en: 'How much?', ru: 'Сколько стоит?' } },
          { text: '여권이 없어요.', correct: false, nextIndex: 11, translation: { en: 'I don\'t have a passport.', ru: 'У меня нет паспорта.' } },
        ]
      },
      { // 3
        npc: '여기 환전된 금액과 영수증입니다. 확인해 보세요.',
        npcTranslation: { en: 'Here is the exchanged money and receipt. Please check.', ru: 'Вот обменянные деньги и чек. Проверьте, пожалуйста.' },
        options: [
          { text: '네, 맞네요. 감사합니다.', correct: true, nextIndex: 'end', translation: { en: 'Yes, it\'s correct. Thank you.', ru: 'Да, всё верно. Спасибо.' } },
          { text: '확인했습니다. 감사합니다.', correct: true, nextIndex: 'end', translation: { en: 'Checked. Thank you.', ru: 'Проверил. Спасибо.' } },
          { text: '돈이 부족해요.', correct: false, nextIndex: 12, translation: { en: 'Not enough money.', ru: 'Денег не хватает.' } },
          { text: '어디로 가요?', correct: false, nextIndex: 13, translation: { en: 'Where are we going?', ru: 'Куда идти?' } },
        ]
      },
      { // 4: Account
        npc: '통장 개설은 저쪽 1번 창구에서 도와드리고 있습니다. 여기는 환전 전용입니다.',
        npcTranslation: { en: 'Opening an account is handled at counter 1 over there. This is only for exchange.', ru: 'Счета открывают в окне 1 вон там. Здесь только обмен.' },
        options: [
          { text: '아, 그럼 환전할게요.', correct: true, nextIndex: 1, translation: { en: 'Ah, then I will exchange money.', ru: 'А, тогда обменяю деньги.' } },
          { text: '알겠습니다.', correct: false, nextIndex: 'end', translation: { en: 'Understood.', ru: 'Понятно.' } }
        ]
      },
      { // 5: Lost money
        npc: '돈을 잃어버리셨다면 경찰서에 신고하셔야 합니다. 은행에서는 도와드릴 수 없습니다.',
        npcTranslation: { en: 'If you lost money, you should report it to the police. The bank cannot help.', ru: 'Если потеряли деньги, идите в полицию. Банк не поможет.' },
        options: [
          { text: '네...', correct: false, nextIndex: 'end', translation: { en: 'Okay...', ru: 'Хорошо...' } }
        ]
      },
      { // 6: Go home
        npc: '네, 안녕히 가세요.',
        npcTranslation: { en: 'Yes, goodbye.', ru: 'Да, до свидания.' },
        options: [{ text: '(Leave)', correct: false, nextIndex: 'end' }]
      },
      { // 7: Credit card
        npc: '여기는 환전 창구입니다. 환전할 돈을 주시겠어요?',
        npcTranslation: { en: 'This is the exchange counter. Will you give me the money to exchange?', ru: 'Это окно обмена. Дадите деньги для обмена?' },
        options: [
          { text: '달러를 바꿔주세요.', correct: true, nextIndex: 2, translation: { en: 'Please exchange dollars.', ru: 'Поменяйте доллары.' } }
        ]
      },
      { // 8: Refund
        npc: '은행에서는 물건 환불이 불가능합니다. 환전하러 오신 거 맞나요?',
        npcTranslation: { en: 'Banks do not refund items. Did you come to exchange money?', ru: 'В банке не оформляют возврат покупок. Вы пришли менять деньги?' },
        options: [
          { text: '네, 달러 바꿔주세요.', correct: true, nextIndex: 2, translation: { en: 'Yes, exchange dollars please.', ru: 'Да, поменяйте доллары.' } }
        ]
      },
      { // 9: No bring passport
        npc: '신분증이나 여권이 없으면 환전이 불가능합니다. 가져오신 후 다시 방문해 주세요.',
        npcTranslation: { en: 'Exchange is not possible without an ID or passport. Please visit again after bringing it.', ru: 'Обмен невозможен без паспорта или ID. Приходите, когда принесете.' },
        options: [{ text: '알겠습니다.', correct: false, nextIndex: 'end' }]
      },
      { // 10: How much
        npc: '환율은 전광판에 나와 있습니다. 여권 주시겠어요?',
        npcTranslation: { en: 'The exchange rate is on the screen. May I have your passport?', ru: 'Курс на табло. Дайте паспорт?' },
        options: [{ text: '여기 있습니다.', correct: true, nextIndex: 3, translation: { en: 'Here it is.', ru: 'Вот.' } }]
      },
      { // 11: No passport 2
        npc: '여권이 없으면 환전이 불가합니다. 다음 손님!',
        npcTranslation: { en: 'No exchange without a passport. Next customer!', ru: 'Без паспорта обмена нет. Следующий клиент!' },
        options: [{ text: '...', correct: false, nextIndex: 'end' }]
      },
      { // 12: Not enough
        npc: '환율에 맞게 정확히 계산해 드렸습니다. 전광판을 확인해 주세요.',
        npcTranslation: { en: 'I calculated it exactly according to the exchange rate. Please check the screen.', ru: 'Я посчитал точно по курсу. Посмотрите на табло.' },
        options: [{ text: '아, 맞네요. 감사합니다.', correct: true, nextIndex: 'end', translation: { en: 'Ah, you are right. Thanks.', ru: 'А, верно. Спасибо.' } }]
      },
      { // 13: Where
        npc: '환전이 완료되었습니다. 안녕히 가세요.',
        npcTranslation: { en: 'The exchange is complete. Goodbye.', ru: 'Обмен завершен. До свидания.' },
        options: [{ text: '안녕히 계세요.', correct: true, nextIndex: 'end' }]
      }
    ]
  },
  {
    id: 'phone_call',
    category: 'daily',
    title: { ko: '전화 통화', en: 'Phone Call', ru: 'Телефонный разговор' },
    icon: '📱',
    steps: [
      {
        npc: '여보세요?',
        npcTranslation: { en: 'Hello? (on the phone)', ru: 'Алло?' },
        options: [
          { text: '여보세요, 지민 씨 계신가요?', correct: true, translation: { en: 'Hello, is Jimin there?', ru: 'Алло, Чимин на месте?' } },
          { text: '안녕하세요, 주문할게요.', correct: false, nextIndex: 4, translation: { en: 'Hello, I\'d like to order.', ru: 'Здравствуйте, я хочу заказать.' } },
          { text: '얼마예요?', correct: false, nextIndex: 5, translation: { en: 'How much?', ru: 'Сколько стоит?' } },
          { text: '잘못 걸었어요.', correct: false, nextIndex: 6, translation: { en: 'Wrong number.', ru: 'Я ошибся номером.' } },
        ]
      },
      { // 1
        npc: '네, 전데요. 누구세요?',
        npcTranslation: { en: 'Yes, speaking. Who is this?', ru: 'Да, это я. Кто это?' },
        options: [
          { text: '저 이반이에요. 잘 지내셨어요?', correct: true, translation: { en: 'It\'s Ivan. How have you been?', ru: 'Это Иван. Как у вас дела?' } },
          { text: '저기요, 길 좀 물을게요.', correct: false, nextIndex: 7, translation: { en: 'Excuse me, I need directions.', ru: 'Извините, подскажите дорогу.' } },
          { text: '끊을게요.', correct: false, nextIndex: 8, translation: { en: 'I\'ll hang up.', ru: 'Я повешу трубку.' } },
          { text: '모르겠어요.', correct: false, nextIndex: 9, translation: { en: 'I don\'t know.', ru: 'Не знаю.' } },
        ]
      },
      { // 2
        npc: '아, 이반 씨! 오랜만이에요. 무슨 일 있어요?',
        npcTranslation: { en: 'Ah, Ivan! It\'s been a while. What\'s up?', ru: 'А, Иван! Давно не виделись. Что случилось?' },
        options: [
          { text: '내일 시간 괜찮아요? 같이 점심 먹을까요?', correct: true, translation: { en: 'Are you free tomorrow? Shall we have lunch?', ru: 'Завтра свободны? Пообедаем вместе?' } },
          { text: '주말에 만날까요?', correct: true, translation: { en: 'Shall we meet on the weekend?', ru: 'Встретимся на выходных?' } },
          { text: '환불해 주세요.', correct: false, nextIndex: 10, translation: { en: 'Refund, please.', ru: 'Верните деньги.' } },
          { text: '안녕히 계세요.', correct: false, nextIndex: 11, translation: { en: 'Goodbye.', ru: 'До свидания.' } },
        ]
      },
      { // 3
        npc: '네, 좋아요. 12시에 만날까요?',
        npcTranslation: { en: 'Yes, sounds good. Shall we meet at 12?', ru: 'Да, отлично. Встретимся в 12?' },
        options: [
          { text: '네, 12시에 봐요!', correct: true, nextIndex: 'end', translation: { en: 'Yes, see you at 12!', ru: 'Да, увидимся в 12!' } },
          { text: '좋아요, 그때 봐요!', correct: true, nextIndex: 'end', translation: { en: 'Great, see you then!', ru: 'Отлично, тогда увидимся!' } },
          { text: '내일모레 봐요.', correct: false, nextIndex: 12, translation: { en: 'See you the day after tomorrow.', ru: 'Увидимся послезавтра.' } },
          { text: '아니요, 싫어요.', correct: false, nextIndex: 13, translation: { en: 'No, I don\'t want to.', ru: 'Нет, не хочу.' } },
        ]
      },
      { // 4: Order
        npc: '주문이요? 여기는 개인 전화번호입니다만... 혹시 지민 씨 찾으시나요?',
        npcTranslation: { en: 'Order? This is a personal number... Are you looking for Jimin?', ru: 'Заказ? Это личный номер... Вы ищете Чимина?' },
        options: [
          { text: '아, 지민 씨 계신가요?', correct: true, nextIndex: 1, translation: { en: 'Ah, is Jimin there?', ru: 'А, Чимин на месте?' } },
          { text: '잘못 걸었어요.', correct: false, nextIndex: 'end', translation: { en: 'Wrong number.', ru: 'Ошибся номером.' } }
        ]
      },
      { // 5: How much
        npc: '네? 누군지도 모르는데 무슨 말씀이신지... 혹시 지민 씨 아시나요?',
        npcTranslation: { en: 'Pardon? I don\'t even know who you are... Do you know Jimin?', ru: 'Что? Я даже не знаю, кто вы... Вы знаете Чимина?' },
        options: [
          { text: '네, 지민 씨 좀 바꿔주세요.', correct: true, nextIndex: 1, translation: { en: 'Yes, please put Jimin on the phone.', ru: 'Да, позовите Чимина.' } }
        ]
      },
      { // 6: Wrong number
        npc: '아, 네. 알겠습니다.',
        npcTranslation: { en: 'Ah, okay.', ru: 'А, понятно.' },
        options: [{ text: '(Hang up)', correct: true, nextIndex: 'end' }]
      },
      { // 7: Directions
        npc: '전화로 길을 물어보신다고요? 장난전화인가요? 누구시죠?',
        npcTranslation: { en: 'You are asking for directions on the phone? Is this a prank call? Who is this?', ru: 'Спрашиваете дорогу по телефону? Это пранк? Кто это?' },
        options: [
          { text: '농담이에요. 저 이반이에요.', correct: true, nextIndex: 2, translation: { en: 'Just joking. It\'s Ivan.', ru: 'Шучу. Это Иван.' } }
        ]
      },
      { // 8: Hang up
        npc: '여보세요? 여보세요?',
        npcTranslation: { en: 'Hello? Hello?', ru: 'Алло? Алло?' },
        options: [{ text: '(Hang up)', correct: true, nextIndex: 'end' }]
      },
      { // 9: Don't know
        npc: '본인이 누군지도 모르신다고요? 끊겠습니다.',
        npcTranslation: { en: 'You don\'t know who you are? I\'m hanging up.', ru: 'Вы не знаете, кто вы? Я вешаю трубку.' },
        options: [
          { text: '잠시만요, 이반이에요!', correct: true, nextIndex: 2, translation: { en: 'Wait, it\'s Ivan!', ru: 'Подождите, это Иван!' } }
        ]
      },
      { // 10: Refund
        npc: '하하, 농담도 참. 이반 씨, 그래서 우리 언제 만날까요?',
        npcTranslation: { en: 'Haha, very funny. Ivan, so when shall we meet?', ru: 'Хаха, очень смешно. Иван, так когда встретимся?' },
        options: [
          { text: '내일 시간 괜찮아요?', correct: true, nextIndex: 3, translation: { en: 'Are you free tomorrow?', ru: 'Завтра свободен?' } }
        ]
      },
      { // 11: Goodbye
        npc: '전화하자마자 끊으려고요? 바쁜 일 있어요?',
        npcTranslation: { en: 'You are hanging up as soon as you called? Are you busy?', ru: 'Хочешь повесить трубку сразу после звонка? Занят?' },
        options: [
          { text: '아니요, 내일 점심 먹을까요?', correct: true, nextIndex: 3, translation: { en: 'No, shall we have lunch tomorrow?', ru: 'Нет, пообедаем завтра?' } },
          { text: '네, 바빠서 이만...', correct: false, nextIndex: 'end', translation: { en: 'Yes, I\'m busy so bye...', ru: 'Да, занят, так что пока...' } }
        ]
      },
      { // 12: Day after tomorrow
        npc: '내일모레요? 네, 좋아요! 그때 봐요.',
        npcTranslation: { en: 'The day after tomorrow? Yes, sounds good! See you then.', ru: 'Послезавтра? Да, отлично! До встречи.' },
        options: [{ text: '네, 안녕!', correct: true, nextIndex: 'end', translation: { en: 'Yes, bye!', ru: 'Да, пока!' } }]
      },
      { // 13: I don't want to
        npc: '아... 그래요. 그럼 나중에 다시 연락해요.',
        npcTranslation: { en: 'Ah... okay. Then let\'s contact later.', ru: 'А... ну ладно. Созвонимся позже.' },
        options: [{ text: '그래요, 안녕.', correct: true, nextIndex: 'end', translation: { en: 'Okay, bye.', ru: 'Хорошо, пока.' } }]
      }
    ]
  }
];
