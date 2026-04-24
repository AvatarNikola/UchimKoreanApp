import React, { useState, useEffect } from 'react';
import './StreakBar.css';
import { useLanguage } from '../../contexts/LanguageContext';
import { getStreakData, updateStreak, getDailyGoal } from '../../utils/progressUtils';

const StreakBar = () => {
  const { t } = useLanguage();
  const [streak, setStreak] = useState(getStreakData());
  const [daily, setDaily] = useState(getDailyGoal());
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const updated = updateStreak();
    setStreak(updated);
    setDaily(getDailyGoal());
  }, []);

  // Проверка confetti при достижении дневной цели
  useEffect(() => {
    if (daily.completed) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [daily.completed]);

  const progressPercent = Math.min(100, Math.round((daily.exercisesDone / daily.goalTarget) * 100));

  const getStreakEmoji = () => {
    if (streak.currentStreak >= 30) return '🏆';
    if (streak.currentStreak >= 7) return '🔥';
    if (streak.currentStreak >= 3) return '⚡';
    return '✨';
  };

  return (
    <div className="streak-bar">
      {showConfetti && (
        <div className="confetti-overlay">
          {Array.from({ length: 30 }).map((_, i) => (
            <span
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                backgroundColor: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE'][i % 7],
              }}
            />
          ))}
        </div>
      )}

      <div className="streak-info">
        <div className="streak-fire">
          <span className="streak-emoji">{getStreakEmoji()}</span>
          <div className="streak-numbers">
            <span className="streak-count">{streak.currentStreak}</span>
            <span className="streak-label">{t('streak.days')}</span>
          </div>
        </div>

        {streak.longestStreak > 0 && (
          <span className="streak-best">
            {t('streak.best')}: {streak.longestStreak}
          </span>
        )}
      </div>

      <div className="daily-goal">
        <div className="daily-header">
          <span className="daily-title">{t('streak.daily_goal')}</span>
          <span className="daily-count">
            {daily.exercisesDone} / {daily.goalTarget}
          </span>
        </div>
        <div className="daily-bar-bg">
          <div
            className={`daily-bar-fill ${daily.completed ? 'daily-bar-complete' : ''}`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        {daily.completed && (
          <span className="daily-done-badge">🎉 {t('streak.goal_done')}</span>
        )}
      </div>
    </div>
  );
};

export default StreakBar;
