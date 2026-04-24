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
          { text: '네, 여기 있습니다.', correct: true },
          { text: '어디로 가요?', correct: false },
          { text: '안녕히 계세요.', correct: false },
        ]
      },
      {
        npc: '수하물로 부치실 가방이 있으신가요?',
        npcTranslation: { en: 'Do you have any bags to check?', ru: 'У вас есть багаж для сдачи?' },
        options: [
          { text: '네, 이 가방 하나요.', correct: true },
          { text: '기내에 가지고 탈게요.', correct: true },
          { text: '얼마예요?', correct: false },
        ]
      },
      {
        npc: '창가 자리와 통로 자리 중 어디가 좋으신가요?',
        npcTranslation: { en: 'Would you prefer a window or an aisle seat?', ru: 'Вы предпочитаете место у окна или у прохода?' },
        options: [
          { text: '창가 자리로 부탁드려요.', correct: true },
          { text: '통로 자리가 좋아요.', correct: true },
          { text: '집에 갈래요.', correct: false },
        ]
      },
      {
        npc: '탑승구는 15번이며, 탑승은 10시 30분에 시작합니다.',
        npcTranslation: { en: 'Your gate is 15, and boarding starts at 10:30.', ru: 'Ваш выход 15, посадка начинается в 10:30.' },
        options: [
          { text: '감사합니다.', correct: true },
          { text: '비행기를 놓쳤어요.', correct: false },
          { text: '너무 비싸요.', correct: false },
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
          { text: '네, 예약했습니다.', correct: true },
          { text: '밥 먹고 싶어요.', correct: false },
          { text: '체크아웃 할게요.', correct: false },
        ]
      },
      {
        npc: '예약자 성함이 어떻게 되시나요?',
        npcTranslation: { en: 'What name is the reservation under?', ru: 'На чье имя бронь?' },
        options: [
          { text: '제 이름은 이반입니다.', correct: true },
          { text: '방이 없어요.', correct: false },
          { text: '모르겠어요.', correct: false },
        ]
      },
      {
        npc: '네, 확인되었습니다. 2박 3일 맞으신가요?',
        npcTranslation: { en: 'Yes, confirmed. Is it for 3 days and 2 nights?', ru: 'Да, подтверждено. На 3 дня и 2 ночи?' },
        options: [
          { text: '네, 맞습니다.', correct: true },
          { text: '아니요, 3박 4일입니다.', correct: true },
          { text: '내일 갈게요.', correct: false },
        ]
      },
      {
        npc: '객실은 502호입니다. 조식은 1층에서 7시부터 가능합니다.',
        npcTranslation: { en: 'Your room is 502. Breakfast is available on the 1st floor from 7 AM.', ru: 'Ваш номер 502. Завтрак на 1 этаже с 7 утра.' },
        options: [
          { text: '알겠습니다. 감사합니다.', correct: true },
          { text: '조식 안 먹어요.', correct: true },
          { text: '지금 몇 시예요?', correct: false },
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
          { text: '머리가 아파서요. 두통약 주세요.', correct: true },
          { text: '배가 고파요.', correct: false },
          { text: '약국이 어디예요?', correct: false },
        ]
      },
      {
        npc: '언제부터 아프셨나요?',
        npcTranslation: { en: 'Since when have you been feeling sick?', ru: 'Как давно болит?' },
        options: [
          { text: '어제 저녁부터요.', correct: true },
          { text: '내일부터요.', correct: false },
          { text: '아침을 먹었어요.', correct: false },
        ]
      },
      {
        npc: '이 약을 식후 30분에 한 알씩 드세요.',
        npcTranslation: { en: 'Take one pill 30 minutes after meals.', ru: 'Принимайте по одной таблетке через 30 минут после еды.' },
        options: [
          { text: '네, 알겠습니다. 얼마예요?', correct: true },
          { text: '밥은 안 먹어요.', correct: false },
          { text: '아니요, 싫어요.', correct: false },
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
          { text: '환전을 하려고 하는데요.', correct: true },
          { text: '돈을 잃어버렸어요.', correct: false },
          { text: '집에 갈게요.', correct: false },
        ]
      },
      {
        npc: '어떤 통화로 환전하시겠어요?',
        npcTranslation: { en: 'Which currency would you like to exchange to?', ru: 'На какую валюту хотите обменять?' },
        options: [
          { text: '달러를 한국 돈으로 바꿔주세요.', correct: true },
          { text: '신용카드를 만들고 싶어요.', correct: false },
          { text: '이거 환불해 주세요.', correct: false },
        ]
      },
      {
        npc: '여권을 보여주시겠습니까?',
        npcTranslation: { en: 'May I see your passport?', ru: 'Покажите ваш паспорт?' },
        options: [
          { text: '여기 있습니다.', correct: true },
          { text: '안 가져왔어요.', correct: false },
          { text: '얼마예요?', correct: false },
        ]
      },
      {
        npc: '여기 환전된 금액과 영수증입니다. 확인해 보세요.',
        npcTranslation: { en: 'Here is the exchanged money and receipt. Please check.', ru: 'Вот обменянные деньги и чек. Проверьте, пожалуйста.' },
        options: [
          { text: '네, 맞네요. 감사합니다.', correct: true },
          { text: '돈이 부족해요.', correct: false },
          { text: '어디로 가요?', correct: false },
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
          { text: '여보세요, 지민 씨 계신가요?', correct: true },
          { text: '안녕하세요, 주문할게요.', correct: false },
          { text: '얼마예요?', correct: false },
        ]
      },
      {
        npc: '네, 전데요. 누구세요?',
        npcTranslation: { en: 'Yes, speaking. Who is this?', ru: 'Да, это я. Кто это?' },
        options: [
          { text: '저 이반이에요. 잘 지내셨어요?', correct: true },
          { text: '저기요, 길 좀 물을게요.', correct: false },
          { text: '끊을게요.', correct: false },
        ]
      },
      {
        npc: '아, 이반 씨! 오랜만이에요. 무슨 일 있어요?',
        npcTranslation: { en: 'Ah, Ivan! It\'s been a while. What\'s up?', ru: 'А, Иван! Давно не виделись. Что случилось?' },
        options: [
          { text: '내일 시간 괜찮아요? 같이 점심 먹을까요?', correct: true },
          { text: '환불해 주세요.', correct: false },
          { text: '안녕히 계세요.', correct: false },
        ]
      },
      {
        npc: '네, 좋아요. 12시에 만날까요?',
        npcTranslation: { en: 'Yes, sounds good. Shall we meet at 12?', ru: 'Да, отлично. Встретимся в 12?' },
        options: [
          { text: '네, 12시에 봐요!', correct: true },
          { text: '내일모레 봐요.', correct: false },
          { text: '아니요, 싫어요.', correct: false },
        ]
      }
    ]
  }
];
