import React, { useState, useCallback, useRef } from 'react';
import './AudioTraining.css';
import { useLanguage } from '../../contexts/LanguageContext';
import { updateUserProgress } from '../../utils/progressUtils';

const AudioTraining = () => {
  const { t } = useLanguage();
  const [mode, setMode] = useState('numbers'); // 'numbers' | 'phrases'
  const [difficulty, setDifficulty] = useState('easy');
  const [currentProblem, setCurrentProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [stats, setStats] = useState({ correct: 0, total: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const inputRef = useRef(null);

  // Данные для фраз
  const phrases = [
    { korean: '안녕하세요', answer: '안녕하세요', hint: 'Hello' },
    { korean: '감사합니다', answer: '감사합니다', hint: 'Thank you' },
    { korean: '죄송합니다', answer: '죄송합니다', hint: 'Sorry' },
    { korean: '이거 얼마예요', answer: '이거 얼마예요', hint: 'How much?' },
    { korean: '물 주세요', answer: '물 주세요', hint: 'Water please' },
    { korean: '화장실이 어디예요', answer: '화장실이 어디예요', hint: 'Where is the bathroom?' },
    { korean: '주문할게요', answer: '주문할게요', hint: 'I\'ll order' },
    { korean: '맛있어요', answer: '맛있어요', hint: 'It\'s delicious' },
    { korean: '도와주세요', answer: '도와주세요', hint: 'Help me' },
    { korean: '괜찮아요', answer: '괜찮아요', hint: 'It\'s okay' },
    { korean: '잘 먹겠습니다', answer: '잘 먹겠습니다', hint: 'Bon appetit' },
    { korean: '계산해 주세요', answer: '계산해 주세요', hint: 'Check please' },
  ];

  // Числа на корейском (сино-корейские)
  const sinoNumbers = {
    0: '영', 1: '일', 2: '이', 3: '삼', 4: '사',
    5: '오', 6: '육', 7: '칠', 8: '팔', 9: '구', 10: '십',
  };

  const numberToKorean = (n) => {
    if (n <= 10) return sinoNumbers[n];
    if (n < 20) return '십' + (n % 10 === 0 ? '' : sinoNumbers[n % 10]);
    if (n < 100) {
      const tens = Math.floor(n / 10);
      const ones = n % 10;
      return sinoNumbers[tens] + '십' + (ones === 0 ? '' : sinoNumbers[ones]);
    }
    if (n < 1000) {
      const hundreds = Math.floor(n / 100);
      const rest = n % 100;
      return (hundreds === 1 ? '' : sinoNumbers[hundreds]) + '백' + (rest === 0 ? '' : numberToKorean(rest));
    }
    return String(n);
  };

  const generateNumberProblem = useCallback(() => {
    let max;
    switch (difficulty) {
      case 'easy': max = 10; break;
      case 'medium': max = 99; break;
      case 'hard': max = 999; break;
      default: max = 10;
    }
    const num = Math.floor(Math.random() * (max + 1));
    return {
      korean: numberToKorean(num),
      answer: String(num),
      hint: `0–${max}`,
      type: 'number'
    };
  }, [difficulty]);

  const generatePhraseProblem = useCallback(() => {
    const idx = Math.floor(Math.random() * phrases.length);
    return { ...phrases[idx], type: 'phrase' };
  }, []);

  const speakKorean = (text) => {
    if (!('speechSynthesis' in window)) return;
    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    utterance.rate = 0.8;
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    speechSynthesis.speak(utterance);
  };

  const newProblem = useCallback(() => {
    const problem = mode === 'numbers' ? generateNumberProblem() : generatePhraseProblem();
    setCurrentProblem(problem);
    setUserAnswer('');
    setFeedback(null);

    // Автоматически произнести
    setTimeout(() => speakKorean(problem.korean), 300);
  }, [mode, generateNumberProblem, generatePhraseProblem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentProblem || !userAnswer.trim()) return;

    const correct = userAnswer.trim() === currentProblem.answer;

    setFeedback({
      correct,
      expected: currentProblem.answer,
      korean: currentProblem.korean,
    });

    setStats(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
    }));

    if (correct) {
      updateUserProgress(10, 'audio_training');
    }
  };

  const handleNext = () => {
    newProblem();
    if (inputRef.current) inputRef.current.focus();
  };

  // Начальный экран
  if (!currentProblem) {
    return (
      <div className="audio-training">
        <h2 className="at-title">{t('audio.title')}</h2>
        <p className="at-subtitle">{t('audio.subtitle')}</p>

        <div className="at-setup card">
          {/* Режим */}
          <div className="at-field">
            <label>{t('audio.mode')}</label>
            <div className="at-mode-btns">
              <button
                className={`at-mode-btn ${mode === 'numbers' ? 'at-mode-active' : ''}`}
                onClick={() => setMode('numbers')}
              >
                🔢 {t('audio.mode_numbers')}
              </button>
              <button
                className={`at-mode-btn ${mode === 'phrases' ? 'at-mode-active' : ''}`}
                onClick={() => setMode('phrases')}
              >
                💬 {t('audio.mode_phrases')}
              </button>
            </div>
          </div>

          {/* Сложность (только для чисел) */}
          {mode === 'numbers' && (
            <div className="at-field">
              <label>{t('audio.difficulty')}</label>
              <div className="at-mode-btns">
                {['easy', 'medium', 'hard'].map(d => (
                  <button
                    key={d}
                    className={`at-mode-btn ${difficulty === d ? 'at-mode-active' : ''}`}
                    onClick={() => setDifficulty(d)}
                  >
                    {t(`audio.${d}`)}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button className="btn-primary at-start" onClick={newProblem}>
            🎧 {t('audio.start')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="audio-training">
      <h2 className="at-title">{t('audio.title')}</h2>

      {/* Статистика */}
      <div className="at-stats">
        <span className="badge badge-green">✅ {stats.correct}</span>
        <span className="badge badge-blue">📊 {stats.total}</span>
        {stats.total > 0 && (
          <span className="badge badge-gold">
            {Math.round((stats.correct / stats.total) * 100)}%
          </span>
        )}
      </div>

      {/* Аудио кнопка */}
      <div className="at-speaker-area card">
        <button
          className={`at-speaker-btn ${isPlaying ? 'at-speaker-playing' : ''}`}
          onClick={() => speakKorean(currentProblem.korean)}
          disabled={isPlaying}
        >
          <span className="at-speaker-icon">{isPlaying ? '🔊' : '🔈'}</span>
          <span className="at-speaker-label">
            {isPlaying ? t('audio.playing') : t('audio.listen')}
          </span>
        </button>
        <p className="at-hint">{currentProblem.hint}</p>
      </div>

      {/* Ввод ответа */}
      <form className="at-form" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type={currentProblem.type === 'number' ? 'number' : 'text'}
          className="at-input"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder={currentProblem.type === 'number'
            ? t('audio.placeholder_number')
            : t('audio.placeholder_phrase')
          }
          disabled={!!feedback}
          autoFocus
        />
        {!feedback && (
          <button type="submit" className="btn-primary" disabled={!userAnswer.trim()}>
            {t('audio.submit')}
          </button>
        )}
      </form>

      {/* Фидбэк */}
      {feedback && (
        <div className={`at-feedback ${feedback.correct ? 'at-fb-correct' : 'at-fb-wrong'}`}>
          <p className="at-fb-status">
            {feedback.correct ? '✅ ' + t('audio.correct') : '❌ ' + t('audio.wrong')}
          </p>
          {!feedback.correct && (
            <p className="at-fb-answer">
              {t('audio.expected')}: <strong>{feedback.expected}</strong>
            </p>
          )}
          <p className="at-fb-korean">
            🔤 {feedback.korean}
          </p>
          <button className="btn-primary at-next" onClick={handleNext}>
            {t('audio.next')} →
          </button>
        </div>
      )}
    </div>
  );
};

export default AudioTraining;
