import React, { useState, useEffect, useCallback, useRef } from 'react';
import './TypingGame.css';
import { useLanguage } from '../../contexts/LanguageContext';
import { vocabulary } from '../../data/vocabulary';
import Hangul from 'hangul-js';
import VirtualKeyboard from '../../components/VirtualKeyboard/VirtualKeyboard';
import { updateUserProgress } from '../../utils/progressUtils';
import { playKoreanTTS } from '../../utils/mathAudioUtils';

const GAME_TIME = 60; // 60 seconds

const TypingGame = () => {
  const { t, lang } = useLanguage();
  const [currentWord, setCurrentWord] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [feedback, setFeedback] = useState(null); // 'correct', 'wrong'
  const inputRef = useRef(null);

  const getRandomWord = useCallback(() => {
    // Filter words that have spaces or are too long to make typing practice reasonable
    const validWords = vocabulary.filter(v => v.ko.length > 0 && !v.ko.includes(' '));
    return validWords[Math.floor(Math.random() * validWords.length)];
  }, []);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(GAME_TIME);
    setCurrentWord(getRandomWord());
    setUserInput('');
    setFeedback(null);
    if (inputRef.current) inputRef.current.focus();
  };

  const endGame = useCallback(() => {
    setIsPlaying(false);
    updateUserProgress(score, 'app');
  }, [score]);

  useEffect(() => {
    let timer = null;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (isPlaying && timeLeft === 0) {
      endGame();
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, endGame]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setUserInput(val);
    checkMatch(val, currentWord?.ko);
  };

  const checkMatch = (input, target) => {
    if (!target) return;
    
    // We only check if it fully matches. Partial matching is just visual.
    if (input === target) {
      setFeedback('correct');
      setScore(s => s + target.length * 10);
      playKoreanTTS(target);
      
      setTimeout(() => {
        setCurrentWord(getRandomWord());
        setUserInput('');
        setFeedback(null);
      }, 300);
    }
  };

  const handleVKBPress = (char) => {
    const jamos = Hangul.disassemble(userInput);
    jamos.push(char);
    const newVal = Hangul.assemble(jamos);
    setUserInput(newVal);
    checkMatch(newVal, currentWord?.ko);
  };

  const handleVKBBackspace = () => {
    const jamos = Hangul.disassemble(userInput);
    jamos.pop();
    const newVal = Hangul.assemble(jamos);
    setUserInput(newVal);
  };

  // Render text with highlight for typed characters
  const renderWord = () => {
    if (!currentWord) return null;
    
    const targetJamo = Hangul.disassemble(currentWord.ko);
    const inputJamo = Hangul.disassemble(userInput);
    
    // Simple visual: if input matches prefix exactly
    const isPrefixMatch = currentWord.ko.startsWith(userInput);
    
    return (
      <div className={`tg-target-word ${feedback === 'correct' ? 'tg-correct-anim' : ''}`}>
        {currentWord.ko.split('').map((char, i) => {
          let charClass = '';
          if (i < userInput.length) {
            charClass = userInput[i] === char ? 'tg-char-correct' : 'tg-char-wrong';
          }
          return <span key={i} className={charClass}>{char}</span>;
        })}
      </div>
    );
  };

  return (
    <div className="typing-game">
      <div className="tg-header">
        <h2 className="tg-title">{t('nav.typing_game') || 'Typing Practice'}</h2>
        <label className="listen-toggle tg-keyboard-toggle">
          <input 
            type="checkbox" 
            checked={showKeyboard} 
            onChange={(e) => setShowKeyboard(e.target.checked)} 
          />
          ⌨️ Виртуальная клавиатура
        </label>
      </div>

      <div className="card tg-board">
        {!isPlaying && timeLeft === GAME_TIME && (
          <div className="tg-start-screen">
            <h3>Готовы к тесту скорости?</h3>
            <p>У вас есть {GAME_TIME} секунд, чтобы напечатать как можно больше корейских слов.</p>
            <button className="btn-primary tg-start-btn" onClick={startGame}>Начать игру 🚀</button>
          </div>
        )}

        {isPlaying && (
          <div className="tg-play-area">
            <div className="tg-stats">
              <div className="tg-stat">
                <span className="tg-stat-label">Очки</span>
                <span className="tg-stat-value">⭐ {score}</span>
              </div>
              <div className="tg-stat tg-timer">
                <span className="tg-stat-label">Время</span>
                <span className={`tg-stat-value ${timeLeft <= 10 ? 'tg-time-low' : ''}`}>⏱ {timeLeft}s</span>
              </div>
            </div>

            <div className="tg-word-container">
              <p className="tg-translation">{lang === 'ru' ? currentWord?.ru : currentWord?.en}</p>
              {renderWord()}
            </div>

            <input
              ref={inputRef}
              type="text"
              className={`tg-input ${feedback === 'correct' ? 'tg-input-correct' : ''}`}
              value={userInput}
              onChange={handleInputChange}
              placeholder="Печатайте здесь..."
              autoFocus
              disabled={feedback === 'correct'}
            />
          </div>
        )}

        {!isPlaying && timeLeft === 0 && (
          <div className="tg-end-screen">
            <h3>⏳ Время вышло!</h3>
            <p>Ваш результат: <strong>{score}</strong> очков</p>
            <button className="btn-primary tg-start-btn" onClick={startGame}>Сыграть еще раз 🔄</button>
          </div>
        )}

        {showKeyboard && (isPlaying || (!isPlaying && timeLeft === GAME_TIME)) && (
          <div className="tg-keyboard-wrapper">
            <VirtualKeyboard onKeyPress={handleVKBPress} onBackspace={handleVKBBackspace} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingGame;
