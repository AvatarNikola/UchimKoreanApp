import React, { useState, useMemo } from 'react';
import './Vocabulary.css';
import { useLanguage } from '../../contexts/LanguageContext';
import { vocabulary, getByCategory } from '../../data/vocabulary';

const CATEGORIES = ['all', 'numbers', 'math', 'phrases', 'app'];

const Vocabulary = () => {
  const { t, lang } = useLanguage();
  const [category, setCategory] = useState('all');
  const [mode, setMode]         = useState('cards'); // cards | list
  const [search, setSearch]     = useState('');
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped]   = useState(false);

  const [learnedWords, setLearnedWords] = useState(() => {
    try { return JSON.parse(localStorage.getItem('learnedVocab') || '[]'); }
    catch { return []; }
  });

  const randomizedBase = useMemo(() => {
    const list = [...getByCategory(category)];
    // Fisher-Yates shuffle
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }, [category]);

  const filtered = useMemo(() => {
    const baseList = mode === 'list' ? getByCategory(category) : randomizedBase;
    if (!search.trim()) return baseList;
    const q = search.toLowerCase();
    return baseList.filter(w =>
      w.word.includes(q) ||
      w.pronunciation.toLowerCase().includes(q) ||
      w.en.toLowerCase().includes(q) ||
      w.ru.toLowerCase().includes(q) ||
      w.ko.includes(q)
    );
  }, [category, randomizedBase, search, mode]);

  const toggleLearned = (e, id) => {
    e.stopPropagation();
    const updated = learnedWords.includes(id) 
      ? learnedWords.filter(wId => wId !== id) 
      : [...learnedWords, id];
    setLearnedWords(updated);
    localStorage.setItem('learnedVocab', JSON.stringify(updated));
  };

  // Reset card when filtered list changes
  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setCardIndex(0);
    setFlipped(false);
  };

  const handlePrev = () => { setCardIndex(i => Math.max(0, i - 1)); setFlipped(false); };
  const handleNext = () => { setCardIndex(i => Math.min(filtered.length - 1, i + 1)); setFlipped(false); };
  const handleFlip = () => setFlipped(f => !f);

  const catLabelKey = { all: 'cat_all', numbers: 'cat_numbers', math: 'cat_math', phrases: 'cat_phrases', app: 'cat_app' };

  const playAudio = (e, text) => {
    e.stopPropagation();
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/\//g, ', ');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ko-KR';
    utterance.rate = 0.85; // немного медленнее для обучения
    window.speechSynthesis.speak(utterance);
  };

  const current = filtered[cardIndex];

  return (
    <div className="vocab">
      <h2 className="vocab-title">{t('vocabulary.title')}</h2>

      {/* Controls */}
      <div className="vocab-controls">
        {/* Category tabs */}
        <div className="vocab-cats">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              id={`vocab-cat-${cat}`}
              className={`cat-btn${category === cat ? ' cat-btn--active' : ''}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {t(`vocabulary.${catLabelKey[cat]}`)}
            </button>
          ))}
        </div>

        {/* Mode toggle */}
        <div className="vocab-mode">
          <button
            id="vocab-cards-mode"
            className={`mode-btn${mode === 'cards' ? ' mode-btn--active' : ''}`}
            onClick={() => setMode('cards')}
          >🃏 {t('vocabulary.mode_cards')}</button>
          <button
            id="vocab-list-mode"
            className={`mode-btn${mode === 'list' ? ' mode-btn--active' : ''}`}
            onClick={() => setMode('list')}
          >📋 {t('vocabulary.mode_list')}</button>
        </div>
      </div>

      {/* Search */}
      <div className="vocab-search-wrap">
        <span className="search-icon">🔍</span>
        <input
          id="vocab-search"
          type="text"
          value={search}
          onChange={e => { setSearch(e.target.value); setCardIndex(0); setFlipped(false); }}
          placeholder={t('vocabulary.search')}
          className="vocab-search"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="vocab-empty">{t('vocabulary.no_results')}</div>
      ) : mode === 'cards' ? (
        /* ── CARD MODE ── */
        <div className="cards-mode">
          <div className="card-counter">
            {cardIndex + 1} {t('vocabulary.of')} {filtered.length}
          </div>

          <div
            className={`flip-card${flipped ? ' flip-card--flipped' : ''}`}
            onClick={handleFlip}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && handleFlip()}
            aria-label="flip card"
          >
            <div className="flip-card-inner">
              {/* Front */}
              <div className="flip-card-front">
                <div className="card-front-header">
                  <span className="card-word">{current?.word}</span>
                  <button 
                    className="btn-audio-icon" 
                    onClick={(e) => playAudio(e, current?.word)}
                    aria-label="Listen"
                    title="Послушать произношение"
                  >
                    🔊
                  </button>
                </div>
                <span className="card-romaji">{current?.pronunciation}</span>
                <span className="card-hint">{t('vocabulary.front_hint')}</span>
              </div>
              {/* Back */}
              <div className="flip-card-back">
                <button 
                  className={`btn-learned ${learnedWords.includes(current?.id) ? 'learned' : ''}`}
                  onClick={(e) => toggleLearned(e, current?.id)}
                  aria-label="Toggle learned"
                >
                  {learnedWords.includes(current?.id) ? '✅ Выучено' : '✅ Отметить как выученное'}
                </button>
                <div className="card-back-content">
                  <div className="back-row">
                    <span className="back-lang badge-ko">KO</span>
                    <span className="back-text">{current?.ko}</span>
                  </div>
                  <div className="back-divider" />
                  <div className="back-row">
                    <span className="back-lang badge-en">EN</span>
                    <span className="back-text">{current?.en}</span>
                  </div>
                  <div className="back-row">
                    <span className="back-lang badge-ru">RU</span>
                    <span className="back-text">{current?.ru}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card-nav">
            <button
              id="vocab-prev"
              className="btn-ghost card-nav-btn"
              onClick={handlePrev}
              disabled={cardIndex === 0}
            >{t('vocabulary.prev')}</button>
            <button
              id="vocab-next"
              className="btn-primary card-nav-btn"
              onClick={handleNext}
              disabled={cardIndex === filtered.length - 1}
            >{t('vocabulary.next')}</button>
          </div>

          {/* Dots */}
          <div className="card-dots">
            {filtered.slice(0, 20).map((_, i) => (
              <button
                key={i}
                className={`dot${i === cardIndex ? ' dot--active' : ''}`}
                onClick={() => { setCardIndex(i); setFlipped(false); }}
                aria-label={`word ${i + 1}`}
              />
            ))}
            {filtered.length > 20 && <span className="dots-more">…</span>}
          </div>
        </div>
      ) : (
        /* ── LIST MODE ── */
        <div className="vocab-table-wrap">
          <table className="vocab-table">
            <thead>
              <tr>
                <th>{t('vocabulary.col_word')}</th>
                <th>{t('vocabulary.col_pronunciation')}</th>
                <th>{t('vocabulary.col_meaning')}</th>
                <th>{t('vocabulary.col_en')}</th>
                <th>{t('vocabulary.col_ru')}</th>
                <th>✓</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(w => (
                <tr key={w.id}>
                  <td className="td-word">
                    <div className="word-cell">
                      {w.word}
                      <button 
                        className="btn-audio-list" 
                        onClick={(e) => playAudio(e, w.word)}
                        aria-label="Listen"
                        title="Послушать произношение"
                      >
                        🔊
                      </button>
                    </div>
                  </td>
                  <td className="td-romaji">{w.pronunciation}</td>
                  <td className="td-ko">{w.ko}</td>
                  <td>{w.en}</td>
                  <td>{w.ru}</td>
                  <td>
                    <button 
                      className={`btn-learned-list ${learnedWords.includes(w.id) ? 'learned' : ''}`}
                      onClick={(e) => toggleLearned(e, w.id)}
                    >
                      {learnedWords.includes(w.id) ? '✅' : '⏳'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Vocabulary;
