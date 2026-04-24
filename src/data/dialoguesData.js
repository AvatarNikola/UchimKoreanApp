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
          { text: '아이스 아메리카노 주세요', correct: true },
          { text: '안녕히 가세요', correct: false },
          { text: '화장실이 어디예요?', correct: false },
        ]
      },
      {
        npc: '사이즈 뭐로 하시겠어요? 톨, 그란데, 벤티 있어요.',
        npcTranslation: { en: 'What size? We have Tall, Grande, Venti.', ru: 'Какой размер? Есть Tall, Grande, Venti.' },
        options: [
          { text: '그란데로 주세요', correct: true },
          { text: '네, 감사합니다', correct: false },
          { text: '얼마예요?', correct: false },
        ]
      },
      {
        npc: '먹고 가실 거예요, 포장이요?',
        npcTranslation: { en: 'For here or to go?', ru: 'Здесь будете пить или с собой?' },
        options: [
          { text: '포장해 주세요', correct: true },
          { text: '먹고 갈게요', correct: true },
          { text: '모르겠어요', correct: false },
        ]
      },
      {
        npc: '4,500원입니다. 카드 되세요?',
        npcTranslation: { en: 'That\'s 4,500 won. Card okay?', ru: '4,500 вон. Картой подойдёт?' },
        options: [
          { text: '네, 카드로 할게요', correct: true },
          { text: '현금으로 할게요', correct: true },
          { text: '너무 비싸요!', correct: false },
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
          { text: '두 명이에요', correct: true },
          { text: '안녕하세요', correct: false },
          { text: '메뉴판 주세요', correct: false },
        ]
      },
      {
        npc: '이쪽으로 앉으세요. 메뉴 여기 있어요.',
        npcTranslation: { en: 'Please sit here. Here\'s the menu.', ru: 'Садитесь сюда. Вот меню.' },
        options: [
          { text: '감사합니다', correct: true },
          { text: '주문할게요', correct: false },
          { text: '물 좀 주세요', correct: false },
        ]
      },
      {
        npc: '주문 도와드릴까요?',
        npcTranslation: { en: 'May I help you with your order?', ru: 'Помочь с заказом?' },
        options: [
          { text: '비빔밥 하나 주세요', correct: true },
          { text: '저기요!', correct: false },
          { text: '맛있어요', correct: false },
        ]
      },
      {
        npc: '음료는 뭐 드릴까요?',
        npcTranslation: { en: 'What would you like to drink?', ru: 'Что будете пить?' },
        options: [
          { text: '물 주세요', correct: true },
          { text: '콜라 주세요', correct: true },
          { text: '안 먹을게요', correct: false },
        ]
      },
      {
        npc: '맛있게 드세요!',
        npcTranslation: { en: 'Enjoy your meal!', ru: 'Приятного аппетита!' },
        options: [
          { text: '잘 먹겠습니다!', correct: true },
          { text: '계산해 주세요', correct: false },
          { text: '감사합니다', correct: true },
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
          { text: '서울역으로 가주세요', correct: true },
          { text: '감사합니다', correct: false },
          { text: '얼마예요?', correct: false },
        ]
      },
      {
        npc: '네, 알겠습니다. 길이 좀 막힐 수 있어요.',
        npcTranslation: { en: 'Okay. There might be some traffic.', ru: 'Хорошо. Могут быть пробки.' },
        options: [
          { text: '괜찮아요', correct: true },
          { text: '빨리 가주세요', correct: true },
          { text: '여기서 내려주세요', correct: false },
        ]
      },
      {
        npc: '다 왔습니다! 8,500원이에요.',
        npcTranslation: { en: 'We\'re here! That\'s 8,500 won.', ru: 'Приехали! 8,500 вон.' },
        options: [
          { text: '카드로 할게요', correct: true },
          { text: '감사합니다. 안녕히 계세요!', correct: true },
          { text: '다시 가주세요', correct: false },
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
          { text: '안녕하세요!', correct: true },
          { text: '이거 얼마예요?', correct: false },
          { text: '계산해 주세요', correct: false },
        ]
      },
      {
        npc: '찾으시는 거 있으세요?',
        npcTranslation: { en: 'Are you looking for something?', ru: 'Что-то ищете?' },
        options: [
          { text: '물 어디 있어요?', correct: true },
          { text: '아니요, 괜찮아요. 그냥 볼게요', correct: true },
          { text: '안녕히 가세요', correct: false },
        ]
      },
      {
        npc: '봉투 필요하세요?',
        npcTranslation: { en: 'Do you need a bag?', ru: 'Пакет нужен?' },
        options: [
          { text: '네, 주세요', correct: true },
          { text: '아니요, 괜찮아요', correct: true },
          { text: '얼마예요?', correct: false },
        ]
      },
      {
        npc: '3,200원입니다.',
        npcTranslation: { en: 'That\'s 3,200 won.', ru: '3,200 вон.' },
        options: [
          { text: '카드로 할게요', correct: true },
          { text: '현금이요', correct: true },
          { text: '너무 비싸요', correct: false },
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
          { text: '저기요, 지하철역이 어디예요?', correct: true },
          { text: '감사합니다', correct: false },
          { text: '안녕히 가세요', correct: false },
        ]
      },
      {
        npc: '아, 여기서 직진하시고 오른쪽으로 가세요.',
        npcTranslation: { en: 'Oh, go straight and then turn right.', ru: 'А, идите прямо и поверните направо.' },
        options: [
          { text: '감사합니다! 얼마나 멀어요?', correct: true },
          { text: '네, 알겠습니다. 감사합니다!', correct: true },
          { text: '왼쪽이요?', correct: false },
        ]
      },
      {
        npc: '걸어서 5분 정도 걸려요.',
        npcTranslation: { en: 'About 5 minutes on foot.', ru: 'Примерно 5 минут пешком.' },
        options: [
          { text: '감사합니다! 좋은 하루 되세요!', correct: true },
          { text: '네, 알겠습니다', correct: true },
          { text: '택시 타고 갈게요', correct: false },
        ]
      }
    ]
  }
];
