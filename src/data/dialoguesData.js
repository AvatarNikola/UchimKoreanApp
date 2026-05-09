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
          { text: '너무 비싸요!', correct: false, nextIndex: 'end', translation: { en: 'Too expensive!', ru: 'Слишком дорого!' } },
        ]
      },
      {
        npc: '손님, 처음 뵙는데 반말은 삼가주세요. 주문하시겠어요?',
        npcTranslation: { en: 'Customer, please don\'t use informal language with someone you just met. Would you like to order?', ru: 'Уважаемый, пожалуйста, не говорите неформально с незнакомыми людьми. Будете заказывать?' },
        options: [
          { text: '죄송합니다. 아메리카노 주세요.', correct: true, nextIndex: 1, translation: { en: 'I am sorry. Americano, please.', ru: 'Извините. Американо, пожалуйста.' } },
          { text: '뭐라고? 안 먹어!', correct: false, nextIndex: 'end', translation: { en: 'What did you say? I won\'t drink here!', ru: 'Что ты сказал? Не буду здесь пить!' } },
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
      {
        npc: '손님, 반말은 기분이 나쁩니다. 예의를 지켜주세요.',
        npcTranslation: { en: 'Customer, informal language is offensive. Please be polite.', ru: 'Уважаемый, неформальная речь оскорбительна. Будьте вежливы.' },
        options: [
          { text: '아... 죄송합니다. 두 명이에요.', correct: true, nextIndex: 1, translation: { en: 'Ah... I am sorry. Two people.', ru: 'А... Извините. Нас двое.' } },
          { text: '내가 왜?', correct: false, nextIndex: 'end', translation: { en: 'Why should I?', ru: 'С какой стати?' } },
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
      {
        npc: '네, 알겠습니다. 기본요금 4,800원입니다.',
        npcTranslation: { en: 'Alright. The basic fare is 4,800 won.', ru: 'Хорошо. Базовый тариф 4,800 вон.' },
        options: [
          { text: '여기 현금이요.', correct: true, nextIndex: 'end', translation: { en: 'Here is cash.', ru: 'Вот наличные.' } },
          { text: '너무 비싸요!', correct: false, nextIndex: 'end', translation: { en: 'Too expensive!', ru: 'Слишком дорого!' } },
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
          { text: '이거 얼마예요?', correct: false, translation: { en: 'How much is this?', ru: 'Сколько это стоит?' } },
          { text: '계산해 주세요', correct: false, translation: { en: 'Check, please', ru: 'Посчитайте' } },
          { text: '안녕히 가세요', correct: false, translation: { en: 'Goodbye', ru: 'До свидания' } },
        ]
      },
      {
        npc: '찾으시는 거 있으세요?',
        npcTranslation: { en: 'Are you looking for something?', ru: 'Что-то ищете?' },
        options: [
          { text: '물 어디 있어요?', correct: true, translation: { en: 'Where is the water?', ru: 'Где вода?' } },
          { text: '아니요, 괜찮아요. 그냥 볼게요', correct: true, translation: { en: 'No, I\'m fine. Just looking', ru: 'Нет, спасибо. Просто смотрю' } },
          { text: '안녕히 가세요', correct: false, translation: { en: 'Goodbye', ru: 'До свидания' } },
          { text: '맛있어요', correct: false, translation: { en: 'It\'s delicious', ru: 'Вкусно' } },
        ]
      },
      {
        npc: '봉투 필요하세요?',
        npcTranslation: { en: 'Do you need a bag?', ru: 'Пакет нужен?' },
        options: [
          { text: '네, 주세요', correct: true, translation: { en: 'Yes, please', ru: 'Да, дайте' } },
          { text: '아니요, 괜찮아요', correct: true, translation: { en: 'No, it\'s fine', ru: 'Нет, не надо' } },
          { text: '얼마예요?', correct: false, translation: { en: 'How much?', ru: 'Сколько стоит?' } },
          { text: '모르겠어요', correct: false, translation: { en: 'I don\'t know', ru: 'Не знаю' } },
        ]
      },
      {
        npc: '3,200원입니다.',
        npcTranslation: { en: 'That\'s 3,200 won.', ru: '3,200 вон.' },
        options: [
          { text: '카드로 할게요', correct: true, translation: { en: 'I\'ll pay by card', ru: 'Картой' } },
          { text: '현금이요', correct: true, translation: { en: 'Cash', ru: 'Наличными' } },
          { text: '너무 비싸요', correct: false, translation: { en: 'Too expensive', ru: 'Слишком дорого' } },
          { text: '환불해 주세요', correct: false, translation: { en: 'Refund, please', ru: 'Верните деньги' } },
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
          { text: '감사합니다', correct: false, translation: { en: 'Thank you', ru: 'Спасибо' } },
          { text: '안녕히 가세요', correct: false, translation: { en: 'Goodbye', ru: 'До свидания' } },
          { text: '배가 고파요', correct: false, translation: { en: 'I\'m hungry', ru: 'Я голоден' } },
        ]
      },
      {
        npc: '아, 여기서 직진하시고 오른쪽으로 가세요.',
        npcTranslation: { en: 'Oh, go straight and then turn right.', ru: 'А, идите прямо и поверните направо.' },
        options: [
          { text: '감사합니다! 얼마나 멀어요?', correct: true, translation: { en: 'Thanks! How far is it?', ru: 'Спасибо! Как далеко?' } },
          { text: '네, 알겠습니다. 감사합니다!', correct: true, translation: { en: 'Yes, I understand. Thank you!', ru: 'Да, понял. Спасибо!' } },
          { text: '왼쪽이요?', correct: false, translation: { en: 'Left?', ru: 'Налево?' } },
          { text: '다시 한번 말씀해 주세요', correct: false, translation: { en: 'Please say it again', ru: 'Повторите, пожалуйста' } },
        ]
      },
      {
        npc: '걸어서 5분 정도 걸려요.',
        npcTranslation: { en: 'About 5 minutes on foot.', ru: 'Примерно 5 минут пешком.' },
        options: [
          { text: '감사합니다! 좋은 하루 되세요!', correct: true, translation: { en: 'Thank you! Have a nice day!', ru: 'Спасибо! Хорошего дня!' } },
          { text: '네, 알겠습니다', correct: true, translation: { en: 'Yes, I understand', ru: 'Да, понял' } },
          { text: '택시 타고 갈게요', correct: false, translation: { en: 'I\'ll take a taxi', ru: 'Я поеду на такси' } },
          { text: '너무 멀어요', correct: false, translation: { en: 'Too far', ru: 'Слишком далеко' } },
        ]
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
          { text: '어디로 가요?', correct: false, translation: { en: 'Where are we going?', ru: 'Куда мы едем?' } },
          { text: '안녕히 계세요.', correct: false, translation: { en: 'Goodbye.', ru: 'До свидания.' } },
          { text: '안 가져왔어요.', correct: false, translation: { en: 'I didn\'t bring it.', ru: 'Я не взял.' } },
        ]
      },
      {
        npc: '수하물로 부치실 가방이 있으신가요?',
        npcTranslation: { en: 'Do you have any bags to check?', ru: 'У вас есть багаж для сдачи?' },
        options: [
          { text: '네, 이 가방 하나요.', correct: true, translation: { en: 'Yes, this one bag.', ru: 'Да, одна сумка.' } },
          { text: '기내에 가지고 탈게요.', correct: true, translation: { en: 'I\'ll take it on board.', ru: 'Возьму с собой в салон.' } },
          { text: '얼마예요?', correct: false, translation: { en: 'How much?', ru: 'Сколько стоит?' } },
          { text: '가방이 없어요.', correct: false, translation: { en: 'I don\'t have a bag.', ru: 'У меня нет сумки.' } },
        ]
      },
      {
        npc: '창가 자리와 통로 자리 중 어디가 좋으신가요?',
        npcTranslation: { en: 'Would you prefer a window or an aisle seat?', ru: 'Вы предпочитаете место у окна или у прохода?' },
        options: [
          { text: '창가 자리로 부탁드려요.', correct: true, translation: { en: 'Window seat, please.', ru: 'У окна, пожалуйста.' } },
          { text: '통로 자리가 좋아요.', correct: true, translation: { en: 'I\'d like an aisle seat.', ru: 'У прохода.' } },
          { text: '집에 갈래요.', correct: false, translation: { en: 'I want to go home.', ru: 'Хочу домой.' } },
          { text: '상관없어요.', correct: false, translation: { en: 'I don\'t mind.', ru: 'Мне всё равно.' } },
        ]
      },
      {
        npc: '탑승구는 15번이며, 탑승은 10시 30분에 시작합니다.',
        npcTranslation: { en: 'Your gate is 15, and boarding starts at 10:30.', ru: 'Ваш выход 15, посадка начинается в 10:30.' },
        options: [
          { text: '감사합니다.', correct: true, translation: { en: 'Thank you.', ru: 'Спасибо.' } },
          { text: '알겠습니다.', correct: true, translation: { en: 'Understood.', ru: 'Понял.' } },
          { text: '비행기를 놓쳤어요.', correct: false, translation: { en: 'I missed my flight.', ru: 'Я опоздал на рейс.' } },
          { text: '너무 비싸요.', correct: false, translation: { en: 'Too expensive.', ru: 'Слишком дорого.' } },
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
          { text: '밥 먹고 싶어요.', correct: false, translation: { en: 'I want to eat.', ru: 'Хочу поесть.' } },
          { text: '체크아웃 할게요.', correct: false, translation: { en: 'I\'ll check out.', ru: 'Я выселяюсь.' } },
          { text: '방이 있어요?', correct: false, translation: { en: 'Do you have a room?', ru: 'Есть свободные номера?' } },
        ]
      },
      {
        npc: '예약자 성함이 어떻게 되시나요?',
        npcTranslation: { en: 'What name is the reservation under?', ru: 'На чье имя бронь?' },
        options: [
          { text: '제 이름은 이반입니다.', correct: true, translation: { en: 'My name is Ivan.', ru: 'Меня зовут Иван.' } },
          { text: '방이 없어요.', correct: false, translation: { en: 'There\'s no room.', ru: 'Нет комнаты.' } },
          { text: '모르겠어요.', correct: false, translation: { en: 'I don\'t know.', ru: 'Не знаю.' } },
          { text: '여권 어디 있어요?', correct: false, translation: { en: 'Where is the passport?', ru: 'Где паспорт?' } },
        ]
      },
      {
        npc: '네, 확인되었습니다. 2박 3일 맞으신가요?',
        npcTranslation: { en: 'Yes, confirmed. Is it for 3 days and 2 nights?', ru: 'Да, подтверждено. На 3 дня и 2 ночи?' },
        options: [
          { text: '네, 맞습니다.', correct: true, translation: { en: 'Yes, that\'s right.', ru: 'Да, верно.' } },
          { text: '아니요, 3박 4일입니다.', correct: true, translation: { en: 'No, it\'s 4 days 3 nights.', ru: 'Нет, на 4 дня и 3 ночи.' } },
          { text: '내일 갈게요.', correct: false, translation: { en: 'I\'ll go tomorrow.', ru: 'Я поеду завтра.' } },
          { text: '취소하고 싶어요.', correct: false, translation: { en: 'I want to cancel.', ru: 'Хочу отменить.' } },
        ]
      },
      {
        npc: '객실은 502호입니다. 조식은 1층에서 7시부터 가능합니다.',
        npcTranslation: { en: 'Your room is 502. Breakfast is available on the 1st floor from 7 AM.', ru: 'Ваш номер 502. Завтрак на 1 этаже с 7 утра.' },
        options: [
          { text: '알겠습니다. 감사합니다.', correct: true, translation: { en: 'Understood. Thank you.', ru: 'Понял. Спасибо.' } },
          { text: '조식 안 먹어요.', correct: true, translation: { en: 'I won\'t have breakfast.', ru: 'Я не буду завтракать.' } },
          { text: '지금 몇 시예요?', correct: false, translation: { en: 'What time is it now?', ru: 'Сколько сейчас времени?' } },
          { text: '어디로 가요?', correct: false, translation: { en: 'Where are we going?', ru: 'Куда идти?' } },
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
          { text: '배가 고파요.', correct: false, translation: { en: 'I\'m hungry.', ru: 'Я голоден.' } },
          { text: '약국이 어디예요?', correct: false, translation: { en: 'Where is the pharmacy?', ru: 'Где аптека?' } },
        ]
      },
      {
        npc: '언제부터 아프셨나요?',
        npcTranslation: { en: 'Since when have you been feeling sick?', ru: 'Как давно болит?' },
        options: [
          { text: '어제 저녁부터요.', correct: true, translation: { en: 'Since yesterday evening.', ru: 'Со вчерашнего вечера.' } },
          { text: '오늘 아침부터요.', correct: true, translation: { en: 'Since this morning.', ru: 'С сегодняшнего утра.' } },
          { text: '내일부터요.', correct: false, translation: { en: 'Since tomorrow.', ru: 'С завтрашнего дня.' } },
          { text: '아침을 먹었어요.', correct: false, translation: { en: 'I ate breakfast.', ru: 'Я позавтракал.' } },
        ]
      },
      {
        npc: '이 약을 식후 30분에 한 알씩 드세요.',
        npcTranslation: { en: 'Take one pill 30 minutes after meals.', ru: 'Принимайте по одной таблетке через 30 минут после еды.' },
        options: [
          { text: '네, 알겠습니다. 얼마예요?', correct: true, translation: { en: 'Yes, understood. How much?', ru: 'Да, понял. Сколько стоит?' } },
          { text: '감사합니다.', correct: true, translation: { en: 'Thank you.', ru: 'Спасибо.' } },
          { text: '밥은 안 먹어요.', correct: false, translation: { en: 'I don\'t eat meals.', ru: 'Я не ем.' } },
          { text: '아니요, 싫어요.', correct: false, translation: { en: 'No, I don\'t want to.', ru: 'Нет, не хочу.' } },
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
          { text: '통장을 만들고 싶어요.', correct: false, translation: { en: 'I want to open an account.', ru: 'Хочу открыть счёт.' } },
          { text: '돈을 잃어버렸어요.', correct: false, translation: { en: 'I lost my money.', ru: 'Я потерял деньги.' } },
          { text: '집에 갈게요.', correct: false, translation: { en: 'I\'ll go home.', ru: 'Я пойду домой.' } },
        ]
      },
      {
        npc: '어떤 통화로 환전하시겠어요?',
        npcTranslation: { en: 'Which currency would you like to exchange to?', ru: 'На какую валюту хотите обменять?' },
        options: [
          { text: '달러를 한국 돈으로 바꿔주세요.', correct: true, translation: { en: 'Please exchange dollars to Korean won.', ru: 'Поменяйте доллары на воны.' } },
          { text: '유로를 한국 돈으로 바꿔주세요.', correct: true, translation: { en: 'Please exchange euros to Korean won.', ru: 'Поменяйте евро на воны.' } },
          { text: '신용카드를 만들고 싶어요.', correct: false, translation: { en: 'I want to make a credit card.', ru: 'Хочу оформить кредитную карту.' } },
          { text: '이거 환불해 주세요.', correct: false, translation: { en: 'Please refund this.', ru: 'Верните деньги за это.' } },
        ]
      },
      {
        npc: '여권을 보여주시겠습니까?',
        npcTranslation: { en: 'May I see your passport?', ru: 'Покажите ваш паспорт?' },
        options: [
          { text: '여기 있습니다.', correct: true, translation: { en: 'Here it is.', ru: 'Вот, пожалуйста.' } },
          { text: '안 가져왔어요.', correct: false, translation: { en: 'I didn\'t bring it.', ru: 'Я не взял.' } },
          { text: '얼마예요?', correct: false, translation: { en: 'How much?', ru: 'Сколько стоит?' } },
          { text: '여권이 없어요.', correct: false, translation: { en: 'I don\'t have a passport.', ru: 'У меня нет паспорта.' } },
        ]
      },
      {
        npc: '여기 환전된 금액과 영수증입니다. 확인해 보세요.',
        npcTranslation: { en: 'Here is the exchanged money and receipt. Please check.', ru: 'Вот обменянные деньги и чек. Проверьте, пожалуйста.' },
        options: [
          { text: '네, 맞네요. 감사합니다.', correct: true, translation: { en: 'Yes, it\'s correct. Thank you.', ru: 'Да, всё верно. Спасибо.' } },
          { text: '확인했습니다. 감사합니다.', correct: true, translation: { en: 'Checked. Thank you.', ru: 'Проверил. Спасибо.' } },
          { text: '돈이 부족해요.', correct: false, translation: { en: 'Not enough money.', ru: 'Денег не хватает.' } },
          { text: '어디로 가요?', correct: false, translation: { en: 'Where are we going?', ru: 'Куда идти?' } },
        ]
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
          { text: '안녕하세요, 주문할게요.', correct: false, translation: { en: 'Hello, I\'d like to order.', ru: 'Здравствуйте, я хочу заказать.' } },
          { text: '얼마예요?', correct: false, translation: { en: 'How much?', ru: 'Сколько стоит?' } },
          { text: '잘못 걸었어요.', correct: false, translation: { en: 'Wrong number.', ru: 'Я ошибся номером.' } },
        ]
      },
      {
        npc: '네, 전데요. 누구세요?',
        npcTranslation: { en: 'Yes, speaking. Who is this?', ru: 'Да, это я. Кто это?' },
        options: [
          { text: '저 이반이에요. 잘 지내셨어요?', correct: true, translation: { en: 'It\'s Ivan. How have you been?', ru: 'Это Иван. Как у вас дела?' } },
          { text: '저기요, 길 좀 물을게요.', correct: false, translation: { en: 'Excuse me, I need directions.', ru: 'Извините, подскажите дорогу.' } },
          { text: '끊을게요.', correct: false, translation: { en: 'I\'ll hang up.', ru: 'Я повешу трубку.' } },
          { text: '모르겠어요.', correct: false, translation: { en: 'I don\'t know.', ru: 'Не знаю.' } },
        ]
      },
      {
        npc: '아, 이반 씨! 오랜만이에요. 무슨 일 있어요?',
        npcTranslation: { en: 'Ah, Ivan! It\'s been a while. What\'s up?', ru: 'А, Иван! Давно не виделись. Что случилось?' },
        options: [
          { text: '내일 시간 괜찮아요? 같이 점심 먹을까요?', correct: true, translation: { en: 'Are you free tomorrow? Shall we have lunch?', ru: 'Завтра свободны? Пообедаем вместе?' } },
          { text: '주말에 만날까요?', correct: true, translation: { en: 'Shall we meet on the weekend?', ru: 'Встретимся на выходных?' } },
          { text: '환불해 주세요.', correct: false, translation: { en: 'Refund, please.', ru: 'Верните деньги.' } },
          { text: '안녕히 계세요.', correct: false, translation: { en: 'Goodbye.', ru: 'До свидания.' } },
        ]
      },
      {
        npc: '네, 좋아요. 12시에 만날까요?',
        npcTranslation: { en: 'Yes, sounds good. Shall we meet at 12?', ru: 'Да, отлично. Встретимся в 12?' },
        options: [
          { text: '네, 12시에 봐요!', correct: true, translation: { en: 'Yes, see you at 12!', ru: 'Да, увидимся в 12!' } },
          { text: '좋아요, 그때 봐요!', correct: true, translation: { en: 'Great, see you then!', ru: 'Отлично, тогда увидимся!' } },
          { text: '내일모레 봐요.', correct: false, translation: { en: 'See you the day after tomorrow.', ru: 'Увидимся послезавтра.' } },
          { text: '아니요, 싫어요.', correct: false, translation: { en: 'No, I don\'t want to.', ru: 'Нет, не хочу.' } },
        ]
      }
    ]
  }
];
