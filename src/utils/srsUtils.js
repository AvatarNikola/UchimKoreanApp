// Алгоритм интервального повторения SM-2 (SuperMemo)
// Каждое слово получает: easeFactor, interval, nextReview, repetitions

import { saveSecure, loadSecure } from './securityUtils';

const SRS_KEY = 'srsData';

const getDefaultCard = (wordId) => ({
  wordId,
  easeFactor: 2.5,    // начальная легкость
  interval: 0,         // интервал в днях
  repetitions: 0,      // количество повторений
  nextReview: Date.now(), // когда повторить (timestamp)
});

export const getSrsData = () => {
  const data = loadSecure(SRS_KEY);
  if (data && typeof data === 'object') return data;
  return {};
};

const saveSrsData = (data) => {
  saveSecure(SRS_KEY, data);
};

/**
 * Получить карточку для слова — создать если не существует
 */
export const getCardForWord = (wordId) => {
  const all = getSrsData();
  if (all[wordId]) return all[wordId];
  return getDefaultCard(wordId);
};

/**
 * Обновить карточку после ответа пользователя
 * quality: 0-5 (0 = не помнит совсем, 5 = идеально помнит)
 *   0 — «Совсем не помню»
 *   3 — «С трудом вспомнил»
 *   5 — «Легко!»
 */
export const reviewCard = (wordId, quality) => {
  const all = getSrsData();
  const card = all[wordId] || getDefaultCard(wordId);

  // SM-2 алгоритм
  if (quality >= 3) {
    // Правильный ответ
    if (card.repetitions === 0) {
      card.interval = 1;
    } else if (card.repetitions === 1) {
      card.interval = 6;
    } else {
      card.interval = Math.round(card.interval * card.easeFactor);
    }
    card.repetitions += 1;
  } else {
    // Неправильный ответ — сбрасываем
    card.repetitions = 0;
    card.interval = 0;
  }

  // Обновить easeFactor
  card.easeFactor = Math.max(
    1.3,
    card.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  // Рассчитать дату следующего повторения
  const now = new Date();
  now.setDate(now.getDate() + card.interval);
  card.nextReview = now.getTime();

  all[wordId] = card;
  saveSrsData(all);
  return card;
};

/**
 * Получить слова, которые пора повторить (nextReview <= сейчас)
 */
export const getDueCards = (vocabularyList) => {
  const all = getSrsData();
  const now = Date.now();

  return vocabularyList.filter(word => {
    const card = all[word.id];
    if (!card) return true; // новые слова — показывать
    return card.nextReview <= now;
  });
};

/**
 * Получить количество слов для повторения
 */
export const getDueCount = (vocabularyList) => {
  return getDueCards(vocabularyList).length;
};

/**
 * Получить статистику SRS
 */
export const getSrsStats = (vocabularyList) => {
  const all = getSrsData();
  let learning = 0;
  let reviewing = 0;
  let mastered = 0;
  let newCards = 0;

  for (const word of vocabularyList) {
    const card = all[word.id];
    if (!card) { newCards++; continue; }
    if (card.interval === 0) learning++;
    else if (card.interval < 21) reviewing++;
    else mastered++;
  }

  return { learning, reviewing, mastered, newCards, total: vocabularyList.length };
};
