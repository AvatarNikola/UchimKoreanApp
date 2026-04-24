import React, { useState, useCallback } from 'react';
import './Quiz.css';
import { generateMathProblem } from '../../utils/mathUtils';
import { updateUserProgress } from '../../utils/progressUtils';
import { useLanguage } from '../../contexts/LanguageContext';
import { getSpokenMathProblem, playKoreanTTS, numberToKorean } from '../../utils/mathAudioUtils';
import Hangul from 'hangul-js';
import VirtualKeyboard from '../../components/VirtualKeyboard/VirtualKeyboard';
import { startSpeechRecognition } from '../../utils/speechUtils';

const OPERATIONS = [
  { symbol: '+', labelKey: 'op_addition',       category: 'addition' },
  { symbol: '-', labelKey: 'op_subtraction',    category: 'subtraction' },
  { symbol: '*', labelKey: 'op_multiplication', category: 'multiplication' },
  { symbol: '/', labelKey: 'op_division',        category: 'division' },
  { symbol: 'word', labelKey: 'op_word',         category: 'word' },
  { symbol: 'geometry', labelKey: 'op_geometry', category: 'geometry' },
];

const POINTS_CORRECT = 10;
const TOTAL_QUESTIONS = 10;

const Quiz = () => {
  const { t } = useLanguage();
  const [phase, setPhase]         = useState('setup');
  const [selectedOp, setSelectedOp] = useState('+');
  const [level, setLevel]         = useState(1);
  const [question, setQuestion]   = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback]   = useState(null);
  const [questionNum, setQuestionNum] = useState(1);
  const [score, setScore]         = useState(0);
  const [streak, setStreak]       = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [results, setResults]     = useState([]);
  const [answerMode, setAnswerMode] = useState('number'); // 'number', 'text', 'voice'
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const [listeningMode, setListeningMode] = useState(() => {
    try {
      return localStorage.getItem('quizListeningMode') === 'true';
    } catch (e) {}
    return false;
  });

  const updateListeningMode = (isChecked) => {
    setListeningMode(isChecked);
    localStorage.setItem('quizListeningMode', isChecked);
  };

  const nextQuestion = useCallback((op = selectedOp, lvl = level) => {
    const q = generateMathProblem(op, lvl);
    setQuestion(q);
    setUserAnswer('');
    setFeedback(null);
    if (listeningMode && q) {
      setTimeout(() => {
        playKoreanTTS(getSpokenMathProblem(q.problem));
      }, 300);
    }
  }, [selectedOp, level, listeningMode]);

  const startQuiz = () => {
    setQuestionNum(1); setScore(0); setStreak(0); setBestStreak(0); setResults([]);
    setPhase('playing');
    nextQuestion(selectedOp, level);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question || userAnswer === '') return;
    
    let isCorrect = false;
    if (answerMode === 'number') {
      isCorrect = parseInt(userAnswer, 10) === question.answer;
    } else {
      const expectedKo = numberToKorean(question.answer).replace(/\s/g, '');
      const userKo = userAnswer.replace(/\s/g, '');
      if (userKo === expectedKo || parseInt(userKo, 10) === question.answer) {
        isCorrect = true;
      }
    }

    const newStreak = isCorrect ? streak + 1 : 0;
    const newBest   = Math.max(bestStreak, newStreak);
    const newScore  = isCorrect ? score + POINTS_CORRECT : score;
    setStreak(newStreak); setBestStreak(newBest); setScore(newScore);
    setFeedback(isCorrect ? 'correct' : 'wrong');
    setResults(prev => [...prev, { problem: question.problem, userAnswer: parsed, correctAnswer: question.answer, isCorrect }]);
    if (isCorrect) {
      const cat = OPERATIONS.find(o => o.symbol === selectedOp)?.category || 'quiz';
      updateUserProgress(POINTS_CORRECT, cat);
    }
    setTimeout(() => {
      if (questionNum >= TOTAL_QUESTIONS) { setPhase('done'); }
      else { setQuestionNum(q => q + 1); nextQuestion(selectedOp, level); }
    }, 1200);
  };

  const diffLabel = (l) => l === 1 ? t('quiz.easy') : l === 2 ? t('quiz.medium') : t('quiz.hard');

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

  /* ── SETUP ── */
  if (phase === 'setup') return (
    <div className="quiz">
      <h2 className="quiz-title">{t('quiz.title')}</h2>
      <div className="card quiz-setup">
        <h3>{t('quiz.setup')}</h3>
        <div className="setup-group">
          <label>{t('quiz.select_op')}</label>
          <div className="op-buttons">
            {OPERATIONS.map(({ symbol, labelKey }) => (
              <button key={symbol} id={`op-${symbol}`}
                className={`op-btn${selectedOp === symbol ? ' op-btn--active' : ''}`}
                onClick={() => setSelectedOp(symbol)} type="button">
                {t(`quiz.${labelKey}`)}
              </button>
            ))}
          </div>
        </div>
        <div className="setup-group">
          <label>{t('quiz.difficulty')}</label>
          <div className="level-buttons">
            {[1, 2, 3].map(l => (
              <button key={l} id={`level-${l}`}
                className={`level-btn${level === l ? ' level-btn--active' : ''}`}
                onClick={() => setLevel(l)} type="button">
                {diffLabel(l)}
              </button>
            ))}
          </div>
        </div>
        <div className="setup-group">
          <label style={{fontWeight: 600}}>Формат ответа (Answer format)</label>
          <div className="op-buttons" style={{gap: '0.5rem', marginTop: '0.5rem'}}>
            <button className={`op-btn${answerMode === 'number' ? ' op-btn--active' : ''}`} onClick={() => setAnswerMode('number')} type="button">🔢 123</button>
            <button className={`op-btn${answerMode === 'text' ? ' op-btn--active' : ''}`} onClick={() => setAnswerMode('text')} type="button">✍️ 가나다</button>
            <button className={`op-btn${answerMode === 'voice' ? ' op-btn--active' : ''}`} onClick={() => setAnswerMode('voice')} type="button">🎤 Голос</button>
          </div>
          {answerMode === 'text' && (
            <label className="listen-toggle" style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginTop: '0.5rem', fontWeight: 600}}>
              <input type="checkbox" checked={showKeyboard} onChange={(e) => setShowKeyboard(e.target.checked)} style={{width: '1.2rem', height: '1.2rem'}}/>
              ⌨️ Экранная клавиатура (Хангуль)
            </label>
          )}
        </div>
        <div className="setup-group">
          <label className="listen-toggle" style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 600}}>
            <input 
              type="checkbox" 
              checked={listeningMode} 
              onChange={(e) => updateListeningMode(e.target.checked)} 
              style={{width: '1.2rem', height: '1.2rem'}}
            />
            {t('quiz.option_listening')}
          </label>
        </div>
        <p className="setup-info">{t('quiz.total_info', { total: TOTAL_QUESTIONS, points: POINTS_CORRECT })}</p>
        <button id="quiz-start" className="btn-primary quiz-start-btn" onClick={startQuiz}>{t('quiz.start')}</button>
      </div>
    </div>
  );

  /* ── DONE ── */
  if (phase === 'done') {
    const correctCount = results.filter(r => r.isCorrect).length;
    const pct = Math.round((correctCount / TOTAL_QUESTIONS) * 100);
    return (
      <div className="quiz">
        <h2 className="quiz-title">{t('quiz.done_title')}</h2>
        <div className="card quiz-result">
          <div className="result-circle">
            <span className="result-pct">{pct}%</span>
            <span className="result-label">{t('quiz.accuracy')}</span>
          </div>
          <div className="result-stats">
            <div className="result-stat"><span className="rs-value">{correctCount}</span><span className="rs-label">{t('quiz.correct')}</span></div>
            <div className="result-stat"><span className="rs-value">{TOTAL_QUESTIONS - correctCount}</span><span className="rs-label">{t('quiz.wrong')}</span></div>
            <div className="result-stat"><span className="rs-value">{score}</span><span className="rs-label">{t('quiz.score')}</span></div>
            <div className="result-stat"><span className="rs-value">{bestStreak}🔥</span><span className="rs-label">{t('quiz.streak_label')}</span></div>
          </div>
          <div className="result-review">
            {results.map((r, i) => {
              const expectedDesc = answerMode === 'number' ? r.correctAnswer : numberToKorean(r.correctAnswer);
              return (
                <div key={i} className={`review-item ${r.isCorrect ? 'review-correct' : 'review-wrong'}`}>
                  <span>{r.problem.replace('?', r.isCorrect ? expectedDesc : `${r.userAnswer} (→${expectedDesc})`)}</span>
                  <span>{r.isCorrect ? '✅' : '❌'}</span>
                </div>
              );
            })}
          </div>
          <div className="done-actions">
            <button id="quiz-again" className="btn-primary" onClick={startQuiz}>{t('quiz.play_again')}</button>
            <button id="quiz-change" className="btn-ghost" onClick={() => setPhase('setup')}>{t('quiz.change_settings')}</button>
          </div>
        </div>
      </div>
    );
  }

  /* ── PLAYING ── */
  return (
    <div className="quiz">
      <div className="quiz-header">
        <span className="quiz-progress">{questionNum} / {TOTAL_QUESTIONS}</span>
        <div className="quiz-progress-bar">
          <div className="quiz-progress-fill" style={{ width: `${(questionNum / TOTAL_QUESTIONS) * 100}%` }} />
        </div>
        <span className="quiz-score">⭐ {score}</span>
      </div>
      {streak >= 3 && (
        <div className="streak-badge">{t('quiz.streak_msg', { count: streak })}</div>
      )}
      <div className={`card quiz-card${feedback ? ` quiz-card--${feedback}` : ''}`}>
        <div className="problem-display" style={{marginBottom: '1.5rem', textAlign: 'center'}}>
          {listeningMode && !feedback ? (
            <div className="listening-placeholder">
              <p style={{fontSize: '2rem', margin: '0 0 1rem 0', color: 'var(--color-primary)'}}>{t('quiz.listening_placeholder')}</p>
              <button 
                onClick={() => playKoreanTTS(getSpokenMathProblem(question?.problem))} 
                className="btn-primary"
                style={{display: 'inline-flex', alignItems: 'center', gap: '0.5rem'}}
                type="button"
              >
                🔊 Повторить
              </button>
            </div>
          ) : (
            <p className="question-text">{question?.problem}</p>
          )}
        </div>
        <form onSubmit={handleSubmit} className="answer-form" style={{display: 'flex', gap: '0.5rem', width: '100%'}}>
          
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
            <input id="quiz-answer" type={answerMode === 'number' ? 'number' : 'text'} value={userAnswer}
              onChange={e => setUserAnswer(e.target.value)}
              placeholder={t('quiz.placeholder')}
              disabled={!!feedback} autoFocus className="answer-input" style={{flex: 1}} />
          )}

          <button id="quiz-submit" type="submit" className="btn-primary"
            disabled={!!feedback || userAnswer === ''}>{t('quiz.submit')}</button>
        </form>
        {feedback && (
          <div className={`feedback feedback--${feedback}`}>
            {feedback === 'correct'
              ? t('quiz.feedback_correct', { points: POINTS_CORRECT })
              : t('quiz.feedback_wrong', { answer: (answerMode === 'number') ? question?.answer : numberToKorean(question?.answer) })}
          </div>
        )}
        
        {!feedback && answerMode === 'text' && showKeyboard && (
          <VirtualKeyboard onKeyPress={handleVKBPress} onBackspace={handleVKBBackspace} />
        )}
      </div>
    </div>
  );
};

export default Quiz;
