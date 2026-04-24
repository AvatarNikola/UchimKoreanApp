// Утилиты для перевода чисел и выражений в корейский язык для TTS

// Массивы базовых корейских чисел (Sino-Korean используется для математики)
const digits = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
const units = ['', '십', '백', '천'];
const bigUnits = ['', '만', '억', '조'];

/**
 * Перевод числа в корейский текст (Sino-Korean, 기수사)
 * @param {number} num - число для конвертации
 * @returns {string} корейский текст (например 15 -> 십오)
 */
export const numberToKorean = (num) => {
  if (num === 0) return '영';
  let result = '';
  let strNum = String(num);
  let len = strNum.length;

  for (let i = 0; i < len; i++) {
    let digit = parseInt(strNum[i]);
    if (digit !== 0) {
      let unit = units[(len - i - 1) % 4];
      // Опускаем "일" перед 십, 백, 천 (например, 10 это 십, а не 일십), 
      // за исключением случая, когда это просто число 1 или "일만" в некоторых случаях 
      if (digit === 1 && unit !== '') {
        result += unit;
      } else {
        result += digits[digit] + unit;
      }
    }
  }

  return result;
};

/**
 * Конвертирует строку примера (например "5 + 3 = ?") в читаемый корейский текст 
 * @param {string} problem - строка математической задачи
 * @returns {string} читаемый корейский текст ("오 더하기 삼은?")
 */
export const getSpokenMathProblem = (problem) => {
  if (!problem) return '';
  
  // Если это текстовая задача, она уже на корейском, озвучиваем напрямую
  if (/[가-힣]/.test(problem)) {
    return problem;
  }

  // Парсим обычные математические выражения
  let spoken = problem
    .replace(/\+/g, ' 더하기 ')
    .replace(/-/g, ' 빼기 ')
    .replace(/×/g, ' 곱하기 ')
    .replace(/÷/g, ' 나누기 ')
    .replace(/=\s*\?/g, '은?');
  
  // Конвертируем все числа в тексте через регулярку
  spoken = spoken.replace(/\d+/g, (match) => {
    return numberToKorean(parseInt(match));
  });
  
  return spoken.trim();
};

/**
 * Проговаривает текст через TTS с нужными настройками
 */
export const playKoreanTTS = (text) => {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ko-KR';
  
  // Читаем настройку из localStorage, по умолчанию 0.70 (замедленно)
  let speed = 0.70;
  try {
    const settings = JSON.parse(localStorage.getItem('appSettings') || '{}');
    if (settings.ttsSpeed) {
      speed = parseFloat(settings.ttsSpeed);
    }
  } catch (e) {}

  utterance.rate = speed;
  window.speechSynthesis.speak(utterance);
};
