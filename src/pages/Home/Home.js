import React from 'react';
import './Home.css';
import { useLanguage } from '../../contexts/LanguageContext';
import StreakBar from '../../components/StreakBar/StreakBar';

const Home = ({ onPageChange }) => {
  const { t } = useLanguage();

  const features = [
    { icon: '➕', titleKey: 'feat_addition', descKey: 'feat_addition_desc', page: 'practice' },
    { icon: '➖', titleKey: 'feat_subtraction', descKey: 'feat_subtraction_desc', page: 'practice' },
    { icon: '✖️', titleKey: 'feat_multiplication', descKey: 'feat_multiplication_desc', page: 'practice' },
    { icon: '➗', titleKey: 'feat_division', descKey: 'feat_division_desc', page: 'practice' },
    { icon: '📚', titleKey: 'feat_lessons', descKey: 'feat_lessons_desc', page: 'lessons' },
    { icon: '🎯', titleKey: 'feat_quiz', descKey: 'feat_quiz_desc', page: 'quiz' },
    { icon: '🃏', titleKey: 'feat_flashcards', descKey: 'feat_flashcards_desc', page: 'flashcards' },
    { icon: '💬', titleKey: 'feat_dialogue', descKey: 'feat_dialogue_desc', page: 'dialogue' },
    { icon: '🎧', titleKey: 'feat_audio', descKey: 'feat_audio_desc', page: 'audio' },
  ];

  return (
    <div className="home">
      {/* Streak Bar */}
      <StreakBar />

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">{t('home.eyebrow')}</p>
          <h2 className="hero-title">{t('home.title')}</h2>
          <p className="hero-sub">{t('home.sub')}</p>
          <div className="hero-actions">
            <button id="home-start-practice" className="btn-primary hero-btn" onClick={() => onPageChange('practice')}>
              {t('home.start_practice')}
            </button>
            <button id="home-start-quiz" className="btn-ghost hero-btn" onClick={() => onPageChange('quiz')}>
              {t('home.start_quiz')}
            </button>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="math-bubble b1">1 + 1 = 2</div>
          <div className="math-bubble b2">12 × 7 = ?</div>
          <div className="math-bubble b3">100 ÷ 4</div>
          <div className="math-bubble b4">🏆</div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="features-section">
        <h3 className="section-title">{t('home.what_to_learn')}</h3>
        <div className="features-grid">
          {features.map(({ icon, titleKey, descKey, page }) => (
            <button
              key={titleKey}
              id={`home-feature-${titleKey}`}
              className="feature-card"
              onClick={() => onPageChange(page)}
            >
              <span className="feature-icon">{icon}</span>
              <strong className="feature-title">{t(`home.${titleKey}`)}</strong>
              <span className="feature-desc">{t(`home.${descKey}`)}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Info row */}
      <section className="info-row">
        <div className="info-card"><span className="info-num">5</span><span className="info-label">{t('home.info_topics')}</span></div>
        <div className="info-card"><span className="info-num">3</span><span className="info-label">{t('home.info_levels')}</span></div>
        <div className="info-card"><span className="info-num">∞</span><span className="info-label">{t('home.info_problems')}</span></div>
        <div className="info-card"><span className="info-num">🆓</span><span className="info-label">{t('home.info_free')}</span></div>
      </section>
    </div>
  );
};

export default Home;