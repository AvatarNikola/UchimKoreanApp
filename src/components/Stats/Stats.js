import React from 'react';
import './Stats.css';
import { useLanguage } from '../../contexts/LanguageContext';
import { getUserProgress } from '../../utils/progressUtils';

const Stats = () => {
  const { t } = useLanguage();
  const progress = getUserProgress();
  const totalPoints = Object.values(progress.categories).reduce((sum, p) => sum + p, 0);
  const categories = Object.entries(progress.categories).map(([name, points]) => ({
    name, points,
    percentage: totalPoints > 0 ? Math.round((points / totalPoints) * 100) : 0
  }));

  return (
    <div className="stats">
      <h2>{t('stats.title')}</h2>
      <div className="stats-cards">
        <div className="stat-card"><h3>{t('stats.level')}</h3><p>{progress.level}</p></div>
        <div className="stat-card"><h3>{t('stats.points')}</h3><p>{progress.totalPoints}</p></div>
        <div className="stat-card"><h3>{t('stats.total_solved')}</h3><p>{totalPoints}</p></div>
        <div className="stat-card"><h3>{t('stats.categories')}</h3><p>{Object.keys(progress.categories).length}</p></div>
      </div>
      <div className="stats-progress">
        <h3>{t('stats.progress_title')}</h3>
        {categories.length > 0 ? (
          <div className="progress-bars">
            {categories.map(cat => (
              <div key={cat.name} className="progress-bar">
                <div className="progress-label">
                  <span>{cat.name}</span>
                  <span>{cat.points} pts ({cat.percentage}%)</span>
                </div>
                <div className="progress-container">
                  <div className="progress-fill" style={{ width: `${cat.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        ) : <div className="no-progress"><p>{t('stats.no_progress')}</p></div>}
      </div>
    </div>
  );
};

export default Stats;