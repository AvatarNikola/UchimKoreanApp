import { wordProblemsData } from '../data/wordProblemsData';

// Утилиты для математических операций

/**
 * Генерация случайного числа в заданном диапазоне
 * @param {number} min - минимальное значение
 * @param {number} max - максимальное значение
 * @returns {number} случайное число
 */
export const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Генерация текстовой математической задачи
 */
const generateWordProblem = (level) => {
  const index = generateRandomNumber(0, wordProblemsData.length - 1);
  const template = wordProblemsData[index];
  
  // Переиспользуем логику чисел
  const baseProblem = generateMathProblem(template.operation, level);
  
  if (!baseProblem) return null;

  // Извлекаем a и b из сгенерированной строки (например "15 + 20 = ?")
  const parts = baseProblem.problem.split(' ');
  const a = parts[0];
  const b = parts[2];

  const problemString = template.ko.replace('{a}', a).replace('{b}', b);

  return {
    problem: problemString,
    answer: baseProblem.answer
  };
};

/**
 * Генерация математической задачи
 * @param {string} operation - тип операции (+, -, *, /, word)
 * @param {number} level - уровень сложности (1-3)
 * @returns {object} задача и ответ
 */
export const generateMathProblem = (operation, level) => {
  if (operation === 'word') {
    return generateWordProblem(level);
  }

  let num1, num2, answer, problem;

  switch (operation) {
    case '+':
      if (level === 1) { num1 = generateRandomNumber(1, 15); num2 = generateRandomNumber(1, 15); }
      else if (level === 2) { num1 = generateRandomNumber(15, 99); num2 = generateRandomNumber(15, 99); }
      else { num1 = generateRandomNumber(100, 999); num2 = generateRandomNumber(100, 999); }
      answer = num1 + num2;
      problem = `${num1} + ${num2} = ?`;
      break;

    case '-':
      if (level === 1) { num1 = generateRandomNumber(5, 20); num2 = generateRandomNumber(1, num1); }
      else if (level === 2) { num1 = generateRandomNumber(20, 99); num2 = generateRandomNumber(5, num1); }
      else { num1 = generateRandomNumber(100, 999); num2 = generateRandomNumber(15, num1); }
      answer = num1 - num2;
      problem = `${num1} - ${num2} = ?`;
      break;

    case '*':
      if (level === 1) { num1 = generateRandomNumber(2, 9); num2 = generateRandomNumber(2, 9); }
      else if (level === 2) { num1 = generateRandomNumber(5, 15); num2 = generateRandomNumber(5, 15); }
      else { num1 = generateRandomNumber(12, 50); num2 = generateRandomNumber(12, 50); }
      answer = num1 * num2;
      problem = `${num1} × ${num2} = ?`;
      break;

    case '/':
      if (level === 1) { num2 = generateRandomNumber(2, 9); answer = generateRandomNumber(2, 9); }
      else if (level === 2) { num2 = generateRandomNumber(3, 15); answer = generateRandomNumber(5, 20); }
      else { num2 = generateRandomNumber(5, 25); answer = generateRandomNumber(15, 50); }
      num1 = num2 * answer;
      problem = `${num1} ÷ ${num2} = ?`;
      break;

    default:
      return null;
  }

  return {
    problem: problem,
    answer: answer
  };
};

/**
 * Проверка ответа пользователя
 * @param {number} userAnswer - ответ пользователя
 * @param {number} correctAnswer - правильный ответ
 * @returns {boolean} правильный ли ответ
 */
export const checkAnswer = (userAnswer, correctAnswer) => {
  return userAnswer === correctAnswer;
};

/**
 * Получение уровня сложности
 * @param {number} score - количество очков
 * @returns {number} уровень сложности
 */
export const getDifficultyLevel = (score) => {
  if (score < 50) return 1;
  if (score < 100) return 2;
  return 3;
};