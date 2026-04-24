// Утилиты для работы с прогрессом пользователя
// Используют securityUtils для защиты данных

import { saveSecure, loadSecure, validateProgressData } from './securityUtils';

const PROGRESS_KEY = 'userProgress';
const STREAK_KEY = 'streakData';

// ═══════════════════════════════════════════
//  ПРОГРЕСС
// ═══════════════════════════════════════════

const getDefaultProgress = () => ({
  level: 1,
  totalPoints: 0,
  categories: {},
  achievements: []
});

export const getUserProgress = () => {
  const data = loadSecure(PROGRESS_KEY);

  if (data && validateProgressData(data)) {
    return data;
  }

  // Миграция из старого формата (без hash)
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (raw) {
      const old = JSON.parse(raw);
      if (old && typeof old === 'object' && !old._h && validateProgressData(old)) {
        // Пересохранить в новом защищённом формате
        saveSecure(PROGRESS_KEY, old);
        return old;
      }
    }
  } catch (e) { /* ignore */ }

  return getDefaultProgress();
};

export const saveUserProgress = (progress) => {
  saveSecure(PROGRESS_KEY, progress);
};

export const checkAchievements = (progress) => {
  const achievements = [];
  const unlocked = progress.achievements || [];

  const checks = [
    { cond: progress.totalPoints >= 100,  name: '100 포인트 달성!' },
    { cond: progress.totalPoints >= 500,  name: '500 포인트 달성!' },
    { cond: progress.totalPoints >= 1000, name: '1000 포인트 달성!' },
    { cond: progress.level >= 2,  name: '레벨 2 달성!' },
    { cond: progress.level >= 5,  name: '레벨 5 달성!' },
    { cond: progress.level >= 10, name: '레벨 10 달성!' },
    { cond: Object.keys(progress.categories).length >= 1, name: '카테고리 시작!' },
    { cond: Object.keys(progress.categories).length >= 3, name: '3개 카테고리 완료!' },
    { cond: Object.values(progress.categories).some(p => p >= 100), name: '100 포인트 달성 카테고리!' },
    // Новые достижения за серию
    { cond: getStreakData().currentStreak >= 7,  name: '🔥 7일 연속!' },
    { cond: getStreakData().currentStreak >= 30, name: '🔥 30일 연속!' },
  ];

  for (const { cond, name } of checks) {
    if (cond && !unlocked.includes(name)) {
      achievements.push(name);
    }
  }

  return achievements;
};

export const updateUserProgress = (points, category) => {
  const progress = getUserProgress();

  progress.totalPoints += points;

  if (category) {
    if (!progress.categories[category]) {
      progress.categories[category] = 0;
    }
    progress.categories[category] += points;
  }

  progress.level = Math.floor(progress.totalPoints / 100) + 1;

  // Обновить ежедневную активность
  updateDailyActivity();

  saveUserProgress(progress);
  return progress;
};

// ═══════════════════════════════════════════
//  DAILY STREAK (Серия дней)
// ═══════════════════════════════════════════

const getDefaultStreak = () => ({
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: null,
  freezesLeft: 1,         // 1 заморозка в неделю
  freezeResetWeek: null,  // номер недели для сброса заморозок
});

export const getStreakData = () => {
  const data = loadSecure(STREAK_KEY);
  if (data && typeof data === 'object' && typeof data.currentStreak === 'number') {
    return data;
  }
  return getDefaultStreak();
};

const getToday = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const getYesterday = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const getWeekNumber = () => {
  const d = new Date();
  const start = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d - start) / 86400000 + start.getDay() + 1) / 7);
};

export const updateStreak = () => {
  const streak = getStreakData();
  const today = getToday();
  const yesterday = getYesterday();

  if (streak.lastActiveDate === today) {
    return streak; // уже обновлено сегодня
  }

  // Сброс заморозок каждую неделю
  const week = getWeekNumber();
  if (streak.freezeResetWeek !== week) {
    streak.freezesLeft = 1;
    streak.freezeResetWeek = week;
  }

  if (streak.lastActiveDate === yesterday) {
    // Продолжаем серию
    streak.currentStreak += 1;
  } else if (streak.lastActiveDate && streak.lastActiveDate !== today) {
    // Пропущен день(дни)
    // Проверяем вчерашний пропуск — если есть заморозка
    const lastDate = new Date(streak.lastActiveDate);
    const todayDate = new Date(today);
    const daysDiff = Math.floor((todayDate - lastDate) / 86400000);

    if (daysDiff === 2 && streak.freezesLeft > 0) {
      // Пропущен 1 день — используем заморозку
      streak.freezesLeft -= 1;
      streak.currentStreak += 1; // вчера «засчитан»
    } else {
      // Серия сбрасывается
      streak.currentStreak = 1;
    }
  } else {
    // Первый раз
    streak.currentStreak = 1;
  }

  streak.lastActiveDate = today;
  streak.longestStreak = Math.max(streak.longestStreak, streak.currentStreak);

  saveSecure(STREAK_KEY, streak);
  return streak;
};

// ═══════════════════════════════════════════
//  DAILY GOAL (Ежедневная цель)
// ═══════════════════════════════════════════

const DAILY_KEY = 'dailyGoalData';

const getDefaultDaily = () => ({
  date: getToday(),
  exercisesDone: 0,
  goalTarget: 10, // по умолчанию 10 упражнений
  completed: false,
});

export const getDailyGoal = () => {
  const data = loadSecure(DAILY_KEY);
  if (data && typeof data === 'object') {
    // Если дата отличается — сброс
    if (data.date !== getToday()) {
      const fresh = getDefaultDaily();
      fresh.goalTarget = data.goalTarget || 10; // сохраняем цель пользователя
      saveSecure(DAILY_KEY, fresh);
      return fresh;
    }
    return data;
  }
  return getDefaultDaily();
};

export const updateDailyActivity = () => {
  const daily = getDailyGoal();
  daily.exercisesDone += 1;
  if (daily.exercisesDone >= daily.goalTarget) {
    daily.completed = true;
  }
  saveSecure(DAILY_KEY, daily);
  return daily;
};

export const setDailyGoalTarget = (target) => {
  const daily = getDailyGoal();
  daily.goalTarget = Math.max(1, Math.min(50, target));
  daily.completed = daily.exercisesDone >= daily.goalTarget;
  saveSecure(DAILY_KEY, daily);
  return daily;
};