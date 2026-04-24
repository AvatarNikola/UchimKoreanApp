// Словарь корейских слов
// Каждое слово: word (한글), pronunciation (романизация), ko (значение по-кор.), en, ru

export const vocabulary = [
  // ── Числа ──────────────────────────────────────────────
  { id: 1,  word: '일 / 하나', pronunciation: 'il / hana',   ko: '숫자 1 (일은 계산, 하나는 개수)',  en: 'one (1)',      ru: 'один (1)',      category: 'numbers' },
  { id: 2,  word: '이 / 둘', pronunciation: 'i / dul',    ko: '숫자 2 (이는 계산, 둘은 개수)',  en: 'two (2)',      ru: 'два (2)',       category: 'numbers' },
  { id: 3,  word: '삼 / 셋', pronunciation: 'sam / set',  ko: '숫자 3',  en: 'three (3)',    ru: 'три (3)',       category: 'numbers' },
  { id: 4,  word: '사 / 넷', pronunciation: 'sa / net',   ko: '숫자 4',  en: 'four (4)',     ru: 'четыре (4)',    category: 'numbers' },
  { id: 5,  word: '오 / 다섯', pronunciation: 'o / daseot',ko: '숫자 5',  en: 'five (5)',     ru: 'пять (5)',      category: 'numbers' },
  { id: 6,  word: '육 / 여섯', pronunciation: 'yuk / yeoseot',ko: '숫자 6',  en: 'six (6)',      ru: 'шесть (6)',     category: 'numbers' },
  { id: 7,  word: '칠 / 일곱', pronunciation: 'chil / ilgop',ko: '숫자 7',  en: 'seven (7)',    ru: 'семь (7)',      category: 'numbers' },
  { id: 8,  word: '팔 / 여덟', pronunciation: 'pal / yeodeol',ko: '숫자 8',  en: 'eight (8)',    ru: 'восемь (8)',    category: 'numbers' },
  { id: 9,  word: '구 / 아홉', pronunciation: 'gu / ahop',   ko: '숫자 9',  en: 'nine (9)',     ru: 'девять (9)',    category: 'numbers' },
  { id: 10, word: '십 / 열', pronunciation: 'sip / yeol',  ko: '숫자 10', en: 'ten (10)',     ru: 'десять (10)',   category: 'numbers' },
  { id: 11, word: '백', pronunciation: 'baek', ko: '숫자 100',en: 'one hundred (100)',ru: 'сто (100)',     category: 'numbers' },
  { id: 12, word: '천', pronunciation: 'cheon',ko: '숫자 1000',en:'one thousand (1000)',ru:'тысяча (1000)', category: 'numbers' },
  { id: 13, word: '만', pronunciation: 'man',  ko: '숫자 10000',en:'ten thousand (10,000)',ru:'десять тысяч (10 000)',category:'numbers'},
  { id: 14, word: '영 / 공', pronunciation: 'yeong / gong', ko: '숫자 0 (영 - 온도/수학, 공 - 전화번호)', en: 'zero (0)', ru: 'ноль (0)', category: 'numbers' },
  { id: 15, word: '이십 / 스물', pronunciation: 'isip / seumul', ko: '숫자 20', en: 'twenty (20)', ru: 'двадцать (20)', category: 'numbers' },
  { id: 16, word: '삼십 / 서른', pronunciation: 'samsip / seoreun', ko: '숫자 30', en: 'thirty (30)', ru: 'тридцать (30)', category: 'numbers' },
  { id: 17, word: '첫째', pronunciation: 'cheotjjae', ko: '순서: 첫 번째 (1st)', en: 'first (1st)', ru: 'первый (1-й)', category: 'numbers' },
  { id: 18, word: '반 (1/2)', pronunciation: 'ban', ko: '절반', en: 'half (1/2)', ru: 'половина (1/2)', category: 'numbers' },

  // ── Математические термины ──────────────────────────────
  { id: 20, word: '덧셈',  pronunciation: 'deotsem',   ko: '더하기 연산',    en: 'addition',        ru: 'сложение',     category: 'math' },
  { id: 21, word: '뺄셈',  pronunciation: 'ppaelsem',  ko: '빼기 연산',      en: 'subtraction',     ru: 'вычитание',    category: 'math' },
  { id: 22, word: '곱셈',  pronunciation: 'gobsem',    ko: '곱하기 연산',    en: 'multiplication',  ru: 'умножение',    category: 'math' },
  { id: 23, word: '나눗셈', pronunciation: 'nanutsem',  ko: '나누기 연산',    en: 'division',        ru: 'деление',      category: 'math' },
  { id: 24, word: '더하기', pronunciation: 'deohagi',   ko: '덧셈 (예: 1 더하기 1은 2)', en: 'plus / to add', ru: 'плюс / сложить', category: 'math' },
  { id: 25, word: '빼기',  pronunciation: 'ppaegi',    ko: '뺄셈 (예: 5 빼기 3은 2)', en: 'minus / to subtract', ru: 'минус / вычесть', category: 'math' },
  { id: 26, word: '곱하기', pronunciation: 'gobhagi',   ko: '곱셈 (예: 2 곱하기 2는 4)', en: 'times / to multiply', ru: 'умножить', category: 'math' },
  { id: 27, word: '나누기', pronunciation: 'nanugi',    ko: '나눗셈 (예: 4 나누기 2는 2)', en: 'divide / divided by', ru: 'делить / разделить', category: 'math' },
  { id: 28, word: '은 / 는 (등호)',  pronunciation: 'eun / neun', ko: '결과를 나타낼 때 (예: 1+1은 2)', en: 'equals sign (=)', ru: 'равно (=)', category: 'math' },
  { id: 29, word: '정답 / 답', pronunciation: 'jeongdap / dap', ko: '맞는 풀이 결과', en: 'answer (correct answer)', ru: 'ответ (правильный ответ)', category: 'math' },
  { id: 30, word: '문제',  pronunciation: 'munje',     ko: '시험이나 연습에서 푸는 질문',   en: 'problem / question', ru: 'задача / вопрос', category: 'math' },
  { id: 31, word: '점수',  pronunciation: 'jeomssu',   ko: '시험 등에서 얻은 성적 수치',   en: 'score / points',  ru: 'счёт / очки',  category: 'math' },
  { id: 32, word: '수학',  pronunciation: 'suhak',     ko: '숫자와 계산을 다루는 학문', en: 'mathematics (math)', ru: 'математика',   category: 'math' },
  { id: 33, word: '방정식', pronunciation: 'bangjeongsik', ko: '미지수(x)가 있는 계산식', en: 'equation',   ru: 'уравнение',    category: 'math' },
  { id: 34, word: '분수',  pronunciation: 'bunsu',     ko: '전체에 대한 부분을 나타내는 수 (예: 1/2)', en: 'fraction', ru: 'дробь',   category: 'math' },
  { id: 35, word: '백분율 (%)', pronunciation: 'baekbunyul', ko: '100을 기준으로 한 비율 (프로센트)', en: 'percentage (%)', ru: 'процент (%)', category: 'math' },
  { id: 36, word: '합 / 총합', pronunciation: 'hap / chonghap', ko: '다 더한 전체 결과', en: 'sum / total', ru: 'сумма / итог', category: 'math' },
  { id: 37, word: '차이 / 차', pronunciation: 'chai / cha', ko: '두 수의 크기가 다른 정도 (뺀 결과)', en: 'difference', ru: 'разность', category: 'math' },
  { id: 38, word: '원', pronunciation: 'won', ko: '둥근 모양 (도형)', en: 'circle', ru: 'круг (фигура)', category: 'math' },
  { id: 39, word: '삼각형', pronunciation: 'samgakhyeong', ko: '각이 세 개인 도형', en: 'triangle', ru: 'треугольник', category: 'math' },
  { id: 40, word: '사각형', pronunciation: 'sagakhyeong', ko: '각이 네 개인 도형', en: 'square / rectangle', ru: 'четырехугольник / квадрат', category: 'math' },

  // ── Фразы ──────────────────────────────────────────────
  { id: 50, word: '정답!',       pronunciation: 'jeongdap',     ko: '맞는 답',           en: 'Correct! Right answer!', ru: 'Правильно!',         category: 'phrases' },
  { id: 51, word: '틀렸습니다',   pronunciation: 'teullyeosseumnida', ko: '답이 틀림',    en: 'Wrong / Incorrect',   ru: 'Неверно / Ошибка',   category: 'phrases' },
  { id: 56, word: '틀렸어!',       pronunciation: 'teullyeosseo', ko: '오답',             en: 'Wrong!',                  ru: 'Неправильно!',       category: 'phrases' },
  { id: 52, word: '다음',        pronunciation: 'daeum',        ko: '그 다음',           en: 'next',                ru: 'следующий',          category: 'phrases' },
  { id: 53, word: '이전',        pronunciation: 'ijeon',        ko: '앞에 있는',          en: 'previous',            ru: 'предыдущий',         category: 'phrases' },
  { id: 54, word: '시작',        pronunciation: 'sijak',        ko: '처음 시작하는 것',    en: 'start',               ru: 'начало / старт',     category: 'phrases' },
  { id: 55, word: '완료',        pronunciation: 'wamnyo',       ko: '끝냄',              en: 'complete / done',     ru: 'завершено',          category: 'phrases' },
  { id: 56, word: '연습',        pronunciation: 'yeonseup',     ko: '반복해서 배움',      en: 'practice',            ru: 'практика',           category: 'phrases' },
  { id: 57, word: '학습',        pronunciation: 'hakseup',      ko: '공부하는 것',        en: 'learning / study',    ru: 'учёба / обучение',   category: 'phrases' },
  { id: 58, word: '수고했어요!',  pronunciation: 'sugohesseoyo', ko: '잘 해줘서 감사해요', en: 'Great work! Well done!', ru: 'Молодец! Хорошая работа!', category: 'phrases' },
  { id: 59, word: '다시 해봐요',  pronunciation: 'dasi haebwayo', ko: '한 번 더 해봐요',  en: 'Try again!',          ru: 'Попробуй ещё раз!',  category: 'phrases' },
  { id: 60, word: '입력하세요',   pronunciation: 'ingnyeokhaseyo', ko: '값을 써 넣어요',  en: 'Please enter',        ru: 'Введите',            category: 'phrases' },
  { id: 61, word: '제출',        pronunciation: 'jechul',       ko: '답을 보내는 것',     en: 'submit',              ru: 'отправить / ответить', category: 'phrases' },
  { id: 62, word: '레벨',        pronunciation: 'rebel',        ko: '실력의 단계',        en: 'level',               ru: 'уровень',            category: 'phrases' },
  { id: 63, word: '포인트',       pronunciation: 'pointeu',      ko: '점수의 단위',        en: 'points',              ru: 'очки',               category: 'phrases' },

  // ── Интерфейс 앱 ──────────────────────────────────────
  { id: 100, word: '홈',       pronunciation: 'hom',       ko: '첫 화면 (Home)',       en: 'home',                 ru: 'главная',         category: 'app' },
  { id: 101, word: '수업',     pronunciation: 'sueop',     ko: '배우는 시간 (Lessons)',en: 'lessons / class',      ru: 'уроки / занятие', category: 'app' },
  { id: 102, word: '연습',     pronunciation: 'yeonseup',  ko: '반복해서 익힘 (Practice)', en: 'practice',          ru: 'практика',        category: 'app' },
  { id: 103, word: '퀴즈',     pronunciation: 'kwijeu',    ko: '시험 (Quiz)',          en: 'quiz',                 ru: 'квиз / тест',     category: 'app' },
  { id: 104, word: '단어장',   pronunciation: 'daneojang', ko: '단어를 모아둔 곳',     en: 'vocabulary list',      ru: 'словарь',         category: 'app' },
  { id: 105, word: '통계',     pronunciation: 'tonggye',   ko: '데이터 결산 (Stats)',  en: 'statistics',           ru: 'статистика',      category: 'app' },
  { id: 106, word: '프로필',   pronunciation: 'peuropil',  ko: '개인 정보 (Profile)',  en: 'profile',              ru: 'профиль',         category: 'app' },
  { id: 107, word: '설정',     pronunciation: 'seoljeong', ko: '세팅 (Settings)',      en: 'settings',             ru: 'настройки',       category: 'app' },
  { id: 108, word: '난이도',   pronunciation: 'nanido',    ko: '어려운 정도',          en: 'difficulty',           ru: 'сложность',       category: 'app' },
  { id: 109, word: '쉬움',     pronunciation: 'swium',     ko: '쉽다 (Easy)',          en: 'easy',                 ru: 'легко',           category: 'app' },
  { id: 110, word: '보통',     pronunciation: 'botong',    ko: '중간 (Medium)',        en: 'medium / average',     ru: 'нормально', category: 'app' },
  { id: 111, word: '어려움',   pronunciation: 'eoryeoum',  ko: '어렵다 (Hard)',        en: 'hard / difficult',     ru: 'сложно',          category: 'app' },
  { id: 112, word: '다크 모드',pronunciation: 'dakeu modeu', ko: '어두운 화면',        en: 'dark mode',            ru: 'темная тема',     category: 'app' }
];

export const categories = ['all', 'numbers', 'math', 'phrases', 'app'];

export const getByCategory = (cat) =>
  cat === 'all' ? vocabulary : vocabulary.filter(w => w.category === cat);
