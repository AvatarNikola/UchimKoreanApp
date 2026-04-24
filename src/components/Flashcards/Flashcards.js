import React, { useState, useMemo, useCallback } from 'react';
import './Flashcards.css';
import { useLanguage } from '../../contexts/LanguageContext';
import { vocabulary } from '../../data/vocabulary';
import { getDueCards, reviewCard, getSrsStats } from '../../utils/srsUtils';

const Flashcards = () => {
  const { t, lang } = useLanguage();
  const [flipped, setFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionStats, setSessionStats] = useState({ reviewed: 0, correct: 0 });
  const [showResult, setShowResult] = useState(null); // 'correct' | 'wrong' | null
  const [category, setCategory] = useState('all');

  const filteredVocab = useMemo(() => {
    return category === 'all' ? vocabulary : vocabulary.filter(w => w.category === category);
  }, [category]);

  const dueCards = useMemo(() => getDueCards(filteredVocab), [filteredVocab]);
  const srsStats = useMemo(() => getSrsStats(filteredVocab), [filteredVocab]);

  const currentWord = dueCards[currentIndex];

  const handleRate = useCallback((quality) => {
    if (!currentWord) return;

    reviewCard(currentWord.id, quality);

    setShowResult(quality >= 3 ? 'correct' : 'wrong');
    setSessionStats(prev => ({
      reviewed: prev.reviewed + 1,
      correct: prev.correct + (quality >= 3 ? 1 : 0),
    }));

    setTimeout(() => {
      setFlipped(false);
      setShowResult(null);
      if (currentIndex < dueCards.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setCurrentIndex(0);
      }
    }, 600);
  }, [currentWord, currentIndex, dueCards.length]);

  const getMeaning = (word) => {
    if (lang === 'ru') return word.ru;
    if (lang === 'en') return word.en;
    return word.ko;
  };

  if (dueCards.length === 0) {
    return (
      <div className="flashcards">
        <h2 className="flashcards-title">{t('flashcards.title')}</h2>
        <div className="flashcards-empty card">
          <span className="empty-icon">🎉</span>
          <h3>{t('flashcards.all_done')}</h3>
          <p>{t('flashcards.come_back')}</p>
          <div className="srs-stats-grid">
            <div className="srs-stat"><span className="srs-num">{srsStats.mastered}</span><span className="srs-label">{t('flashcards.mastered')}</span></div>
            <div className="srs-stat"><span className="srs-num">{srsStats.reviewing}</span><span className="srs-label">{t('flashcards.reviewing')}</span></div>
            <div className="srs-stat"><span className="srs-num">{srsStats.learning}</span><span className="srs-label">{t('flashcards.learning')}</span></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flashcards">
      <h2 className="flashcards-title">{t('flashcards.title')}</h2>

      {/* Категории */}
      <div className="fc-cats">
        {['all', 'numbers', 'math', 'phrases', 'app'].map(cat => (
          <button
            key={cat}
            className={`fc-cat-btn${category === cat ? ' fc-cat-active' : ''}`}
            onClick={() => { setCategory(cat); setCurrentIndex(0); setFlipped(false); }}
          >
            {t(`flashcards.cat_${cat}`)}
          </button>
        ))}
      </div>

      {/* SRS статистика */}
      <div className="srs-bar">
        <div className="srs-bar-segment srs-mastered" style={{ flex: srsStats.mastered }} title={`${t('flashcards.mastered')}: ${srsStats.mastered}`} />
        <div className="srs-bar-segment srs-review" style={{ flex: srsStats.reviewing }} title={`${t('flashcards.reviewing')}: ${srsStats.reviewing}`} />
        <div className="srs-bar-segment srs-learning" style={{ flex: srsStats.learning }} title={`${t('flashcards.learning')}: ${srsStats.learning}`} />
        <div className="srs-bar-segment srs-new" style={{ flex: srsStats.newCards }} title={`${t('flashcards.new')}: ${srsStats.newCards}`} />
      </div>

      {/* Счётчик */}
      <div className="fc-counter">
        {currentIndex + 1} / {dueCards.length} · {t('flashcards.session_correct', { n: sessionStats.correct })}
      </div>

      {/* Карточка */}
      <div
        className={`fc-card-wrapper ${showResult || ''}`}
        onClick={() => !showResult && setFlipped(!flipped)}
      >
        <div className={`fc-card ${flipped ? 'fc-card--flipped' : ''}`}>
          {/* Передняя сторона */}
          <div className="fc-card-face fc-card-front">
            <span className="fc-word">{currentWord.word}</span>
            <span className="fc-pronunciation">{currentWord.pronunciation}</span>
            <span className="fc-hint">{t('flashcards.tap_to_flip')}</span>
          </div>
          {/* Задняя сторона */}
          <div className="fc-card-face fc-card-back">
            <span className="fc-word-small">{currentWord.word}</span>
            <span className="fc-meaning">{getMeaning(currentWord)}</span>
            <span className="fc-ko-meaning">{currentWord.ko}</span>
          </div>
        </div>
      </div>

      {/* Кнопки оценки */}
      {flipped && !showResult && (
        <div className="fc-rating">
          <button className="fc-rate fc-rate-again" onClick={() => handleRate(1)}>
            😞 {t('flashcards.again')}
          </button>
          <button className="fc-rate fc-rate-hard" onClick={() => handleRate(3)}>
            🤔 {t('flashcards.hard')}
          </button>
          <button className="fc-rate fc-rate-good" onClick={() => handleRate(4)}>
            😊 {t('flashcards.good')}
          </button>
          <button className="fc-rate fc-rate-easy" onClick={() => handleRate(5)}>
            🤩 {t('flashcards.easy')}
          </button>
        </div>
      )}
    </div>
  );
};

export default Flashcards;
