import React from 'react';
import './Profile.css';
import { useLanguage } from '../../contexts/LanguageContext';
import { getUserProgress, checkAchievements } from '../../utils/progressUtils';

const Profile = () => {
  const { t } = useLanguage();
  const progress = getUserProgress();
  const achievements = checkAchievements(progress);
  const totalPoints = Object.values(progress.categories).reduce((sum, p) => sum + p, 0);
  const categories = Object.entries(progress.categories).map(([name, points]) => ({
    name, points,
    percentage: totalPoints > 0 ? Math.round((points / totalPoints) * 100) : 0
  }));

  return (
    <div className="profile">
      <h2>{t('profile.title')}</h2>
      <div className="profile-stats">
        <div className="stat-card"><h3>{t('profile.level')}</h3><p>{progress.level}</p></div>
        <div className="stat-card"><h3>{t('profile.points')}</h3><p>{progress.totalPoints}</p></div>
        <div className="stat-card"><h3>{t('profile.total_solved')}</h3><p>{totalPoints}</p></div>
        <div className="stat-card"><h3>{t('profile.categories')}</h3><p>{Object.keys(progress.categories).length}</p></div>
      </div>

      <div className="profile-achievements">
        <h3>{t('profile.achievements_title')}</h3>
        {achievements.length > 0 ? (
          <div className="achievements-list">
            {achievements.map((a, i) => <div key={i} className="achievement-item">🏆 {a}</div>)}
          </div>
        ) : <p>{t('profile.no_achievements')}</p>}
      </div>

      <div className="profile-progress">
        <h3>{t('profile.progress_title')}</h3>
        {categories.length > 0 ? (
          categories.map(cat => (
            <div key={cat.name} className="category-progress">
              <span>{cat.name}</span>
              <span>{cat.points} pts ({cat.percentage}%)</span>
            </div>
          ))
        ) : <div className="no-progress"><p>{t('profile.no_progress')}</p></div>}
      </div>
    </div>
  );
};

export default Profile;