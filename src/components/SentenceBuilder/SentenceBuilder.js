import React, { useState, useEffect, useCallback } from 'react';
import './SentenceBuilder.css';
import { useLanguage } from '../../contexts/LanguageContext';
import { sentenceBuilderData } from '../../data/sentenceBuilderData';
import { updateUserProgress } from '../../utils/progressUtils';
import { playKoreanTTS } from '../../utils/mathAudioUtils'; // Using for TTS

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const SentenceBuilder = () => {
  const { t, lang } = useLanguage();
  const [currentSentence, setCurrentSentence] = useState(null);
  const [poolParts, setPoolParts] = useState([]);
  const [selectedParts, setSelectedParts] = useState([]);
  const [feedback, setFeedback] = useState(null); // 'correct', 'wrong', null
  const [score, setScore] = useState(0);

  const loadNextSentence = useCallback(() => {
    const randomItem = sentenceBuilderData[Math.floor(Math.random() * sentenceBuilderData.length)];
    setCurrentSentence(randomItem);
    
    // Map parts into objects to handle duplicate words properly
    const partsWithId = randomItem.parts.map((text, idx) => ({ id: `${randomItem.id}-${idx}`, text }));
    setPoolParts(shuffle(partsWithId));
    setSelectedParts([]);
    setFeedback(null);
  }, []);

  useEffect(() => {
    loadNextSentence();
  }, [loadNextSentence]);

  const handleSelectWord = (part) => {
    if (feedback === 'correct') return;
    setPoolParts(prev => prev.filter(p => p.id !== part.id));
    setSelectedParts(prev => [...prev, part]);
    setFeedback(null);
  };

  const handleDeselectWord = (part) => {
    if (feedback === 'correct') return;
    setSelectedParts(prev => prev.filter(p => p.id !== part.id));
    setPoolParts(prev => [...prev, part]);
    setFeedback(null);
  };

  const checkAnswer = () => {
    if (!currentSentence || selectedParts.length === 0) return;
    
    const formedSentence = selectedParts.map(p => p.text).join(' ');
    const expectedSentence = currentSentence.parts.join(' ');
    
    if (formedSentence === expectedSentence) {
      setFeedback('correct');
      setScore(s => s + 10);
      updateUserProgress(10, 'phrases');
      playKoreanTTS(currentSentence.ko);
      setTimeout(() => {
        loadNextSentence();
      }, 1500);
    } else {
      setFeedback('wrong');
    }
  };

  const resetCurrent = () => {
    if (feedback === 'correct') return;
    setPoolParts(shuffle([...poolParts, ...selectedParts]));
    setSelectedParts([]);
    setFeedback(null);
  };

  if (!currentSentence) return <div className="sentence-builder">Loading...</div>;

  return (
    <div className="sentence-builder">
      <div className="sb-header">
        <h2 className="sb-title">{t('nav.sentence_builder') || 'Sentence Builder'}</h2>
        <span className="sb-score">⭐ {score}</span>
      </div>

      <div className="card sb-game-area">
        <div className="sb-translation-container">
          <p className="sb-translation">
            {lang === 'ru' ? currentSentence.ru : currentSentence.en}
          </p>
        </div>

        {/* Selected words drop zone */}
        <div className={`sb-drop-zone ${selectedParts.length > 0 ? 'sb-drop-zone--populated' : ''}`}>
          {selectedParts.map(part => (
            <button 
              key={part.id} 
              className="sb-word-btn"
              onClick={() => handleDeselectWord(part)}
            >
              {part.text}
            </button>
          ))}
          {selectedParts.length === 0 && (
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>Составьте предложение здесь...</span>
          )}
        </div>

        {/* Word pool */}
        <div className="sb-word-pool">
          {poolParts.map(part => (
            <button 
              key={part.id} 
              className="sb-word-btn"
              onClick={() => handleSelectWord(part)}
            >
              {part.text}
            </button>
          ))}
        </div>

        <div className="sb-controls">
          <button className="btn-ghost" onClick={resetCurrent} disabled={selectedParts.length === 0 || feedback === 'correct'}>
            Сбросить
          </button>
          <button className="btn-primary" onClick={checkAnswer} disabled={poolParts.length > 0 || feedback === 'correct'}>
            Проверить
          </button>
        </div>

        {feedback && (
          <div className={`sb-feedback sb-feedback--${feedback}`}>
            {feedback === 'correct' ? '✅ Правильно! Отличная работа.' : '❌ Ошибка. Попробуйте еще раз!'}
          </div>
        )}
      </div>
    </div>
  );
};

export default SentenceBuilder;
