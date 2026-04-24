import React, { useState, useCallback, useEffect } from 'react';
import './Practice.css';
import { generateMathProblem } from '../../utils/mathUtils';
import { updateUserProgress } from '../../utils/progressUtils';
import { useLanguage } from '../../contexts/LanguageContext';
import { getSpokenMathProblem, playKoreanTTS, numberToKorean } from '../../utils/mathAudioUtils';
import Hangul from 'hangul-js';
import VirtualKeyboard from '../../components/VirtualKeyboard/VirtualKeyboard';
import { startSpeechRecognition } from '../../utils/speechUtils';

const CATEGORIES = [
  { symbol: '+', labelKey: 'op_addition',      color: 'blue',   category: 'addition' },
  { symbol: '-', labelKey: 'op_subtraction',   color: 'green',  category: 'subtraction' },
  { symbol: '*', labelKey: 'op_multiplication',color: 'gold',   category: 'multiplication' },
  { symbol: '/', labelKey: 'op_division',      color: 'red',    category: 'division' },
  { symbol: 'word', labelKey: 'op_word',       color: 'purple', category: 'word' },
  { symbol: 'geometry', labelKey: 'op_geometry', color: 'indigo', category: 'geometry' },
];

const Practice = () => {
  const { t } = useLanguage();
  const [operation, setOperation]       = useState('+');
  const [level, setLevel]               = useState(1);
  const [problem, setProblem]           = useState(null);
  const [userAnswer, setUserAnswer]     = useState('');
  const [feedback, setFeedback]         = useState(null);
  const [sessionScore, setSessionScore] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);

  const [answerMode, setAnswerMode] = useState('number'); // 'number', 'text', 'voice'
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const [listeningModes, setListeningModes] = useState(() => {
    try {
      const saved = localStorage.getItem('practiceListeningModes');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return { '+': false, '-': false, '*': false, '/': false, 'word': false };
  });

  const updateListeningMode = (op, isChecked) => {
    const nextState = { ...listeningModes, [op]: isChecked };
    setListeningModes(nextState);
    localStorage.setItem('practiceListeningModes', JSON.stringify(nextState));
  };

  const currentListeningMode = listeningModes[operation];

  const newProblem = useCallback(() => {
    const p = generateMathProblem(operation, level);
    setProblem(p);
    setUserAnswer('');
    setFeedback(null);
    if (currentListeningMode && p) {
      setTimeout(() => {
        playKoreanTTS(getSpokenMathProblem(p.problem));
      }, 300);
    }
  }, [operation, level, currentListeningMode]);

  useEffect(() => { newProblem(); }, [newProblem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!problem || userAnswer === '') return;
    
    let isCorrect = false;
    if (answerMode === 'number') {
      isCorrect = parseInt(userAnswer, 10) === problem.answer;
    } else {
      // Для режима 'text' и 'voice' проверяем корейский текст или fallback на цифры
      const expectedKo = numberToKorean(problem.answer).replace(/\s/g, '');
      const userKo = userAnswer.replace(/\s/g, '');
      if (userKo === expectedKo || parseInt(userKo, 10) === problem.answer) {
        isCorrect = true;
      }
    }

    setFeedback(isCorrect ? 'correct' : 'wrong');
    setSessionTotal(tt => tt + 1);
    if (isCorrect) {
      setSessionScore(ss => ss + 1);
      const cat = CATEGORIES.find(c => c.symbol === operation)?.category || 'practice';
      updateUserProgress(10, cat);
    }
  };

  const handleStartVoice = () => {
    if (isListening) return;
    setIsListening(true);
    startSpeechRecognition('ko-KR', 
      (text) => { setIsListening(false); setUserAnswer(text); },
      (err) => { setIsListening(false); alert(err); },
      () => setIsListening(false)
    );
  };

  const handleVKBPress = (char) => {
    const jamos = Hangul.disassemble(userAnswer);
    jamos.push(char);
    setUserAnswer(Hangul.assemble(jamos));
  };
  const handleVKBBackspace = () => {
    const jamos = Hangul.disassemble(userAnswer);
    jamos.pop();
    setUserAnswer(Hangul.assemble(jamos));
  };

  return (
    <div className="practice">
      <h2 className="practice-title">{t('practice.title')}</h2>

      <div className="practice-controls card">
        <div className="ctrl-group">
          <span className="ctrl-label">{t('practice.operation')}</span>
          <div className="ctrl-btns">
            {CATEGORIES.map(({ symbol, labelKey, color }) => (
              <button
                key={symbol}
                id={`prac-op-${symbol}`}
                className={`ctrl-btn badge-${color}${operation === symbol ? ' ctrl-btn--active' : ''}`}
                onClick={() => setOperation(symbol)}
                type="button"
              >
                {t(`quiz.${labelKey}`)}
              </button>
            ))}
          </div>
        </div>
        <div className="ctrl-group">
          <span className="ctrl-label">{t('practice.difficulty')}</span>
          <div className="ctrl-btns">
            {[1, 2, 3].map(l => (
              <button key={l} id={`prac-level-${l}`}
                className={`ctrl-btn${level === l ? ' ctrl-btn--active' : ''}`}
                onClick={() => setLevel(l)} type="button"
              >
                {l === 1 ? t('practice.easy') : l === 2 ? t('practice.medium') : t('practice.hard')}
              </button>
            ))}
          </div>
        </div>
        <div className="ctrl-group">
          <span className="ctrl-label" style={{marginTop: '0.5rem'}}>Формат ответа (Answer format)</span>
          <div className="ctrl-btns" style={{gap: '0.5rem'}}>
            <button className={`ctrl-btn${answerMode === 'number' ? ' ctrl-btn--active' : ''}`} onClick={() => setAnswerMode('number')} type="button">🔢 123</button>
            <button className={`ctrl-btn${answerMode === 'text' ? ' ctrl-btn--active' : ''}`} onClick={() => setAnswerMode('text')} type="button">✍️ 가나다</button>
            <button className={`ctrl-btn${answerMode === 'voice' ? ' ctrl-btn--active' : ''}`} onClick={() => setAnswerMode('voice')} type="button">🎤 Голос</button>
          </div>
          {answerMode === 'text' && (
            <label className="listen-toggle" style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginTop: '0.5rem', fontWeight: 600}}>
              <input type="checkbox" checked={showKeyboard} onChange={(e) => setShowKeyboard(e.target.checked)} style={{width: '1.2rem', height: '1.2rem'}}/>
              ⌨️ Экранная клавиатура (Хангуль)
            </label>
          )}
        </div>
        <div className="ctrl-group">
          <label className="listen-toggle" style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginTop: '0.5rem', fontWeight: 600, paddingTop: '0.5rem', borderTop: '1px solid var(--color-border)'}}>
            <input 
              type="checkbox" 
              checked={currentListeningMode} 
              onChange={(e) => updateListeningMode(operation, e.target.checked)} 
              style={{width: '1.2rem', height: '1.2rem'}}
            />
            {t('practice.option_listening')}
          </label>
        </div>
        <div className="session-info">
          <span>{t('practice.session')}: <strong>{sessionScore}</strong> / {sessionTotal} {t('practice.correct_answers')}</span>
          {sessionTotal > 0 && (
            <span className="session-pct">({Math.round((sessionScore / sessionTotal) * 100)}%)</span>
          )}
        </div>
      </div>

      <div className={`card problem-card${feedback ? ` problem-card--${feedback}` : ''}`}>
        
        {/* Показываем текст только если не включен "режим на слух" или если уже дан ответ (feedback) */}
        {!(currentListeningMode && !feedback) && (
          <div className="problem-display" style={{marginBottom: '1.5rem', textAlign: 'center'}}>
            <p className="problem-text">{problem?.problem}</p>
          </div>
        )}

        {!feedback ? (
          <form className="practice-form" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}} onSubmit={handleSubmit}>
            {currentListeningMode && (
              <button 
                type="button" 
                onClick={() => playKoreanTTS(getSpokenMathProblem(problem?.problem))} 
                style={{ fontSize: '1.8rem', background: 'var(--color-surface2)', border: '1px solid var(--color-border)', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                title="Послушать еще раз"
              >
                🔊
              </button>
            )}
            
            {answerMode === 'voice' ? (
              <button 
                type="button" 
                onClick={handleStartVoice} 
                className={`btn-primary ${isListening ? 'listening' : ''}`}
                style={{ background: isListening ? '#f44336' : 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.5rem', flex: 1, justifyContent: 'center' }}
              >
                {isListening ? '🔴 Говорите...' : '🎤 Нажмите чтобы сказать'}
              </button>
            ) : (
              <input id="practice-answer" type={answerMode === 'number' ? 'number' : 'text'} value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
                placeholder={t('practice.placeholder')} autoFocus className="practice-input" />
            )}
            
            <button id="practice-submit" type="submit" className="btn-primary" disabled={userAnswer === ''}>
              {t('practice.submit')}
            </button>
          </form>
        ) : (
          <div className={`practice-feedback feedback--${feedback}`}>
            <p className="feedback-text">
              {feedback === 'correct'
                ? t('practice.answer_correct')
                : t('practice.answer_wrong', { answer: problem?.answer })}
            </p>
            <button id="practice-next" className="btn-primary" onClick={newProblem}>
              {t('practice.next')}
            </button>
          </div>
        )}
        
        {!feedback && answerMode === 'text' && showKeyboard && (
          <VirtualKeyboard onKeyPress={handleVKBPress} onBackspace={handleVKBBackspace} />
        )}
      </div>
    </div>
  );
};

export default Practice;