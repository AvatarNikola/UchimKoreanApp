import React, { useState, useRef, useEffect, useMemo } from 'react';
import './DialogueSim.css';
import { useLanguage } from '../../contexts/LanguageContext';
import { dialoguesData } from '../../data/dialoguesData';
import { updateUserProgress } from '../../utils/progressUtils';
import { startSpeechRecognition } from '../../utils/speechUtils';

/* Fisher-Yates shuffle (returns new array) */
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const DialogueSim = () => {
  const { t, lang } = useLanguage();
  const [selectedDialogue, setSelectedDialogue] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [visibleTranslations, setVisibleTranslations] = useState(new Set());
  const [visibleOptTranslations, setVisibleOptTranslations] = useState(new Set());
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceFeedback, setVoiceFeedback] = useState('');
  const chatRef = useRef(null);

  // Авто-скролл чата вниз
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.85;
      speechSynthesis.speak(utterance);
    }
  };

  const shuffleCurrentOptions = (step) => {
    setShuffledOptions(shuffle(step.options));
    setVisibleOptTranslations(new Set());
  };

  const startDialogue = (dialogue) => {
    setSelectedDialogue(dialogue);
    setStepIndex(0);
    setScore(0);
    setIsFinished(false);
    setAnswered(false);
    setVisibleTranslations(new Set());
    setVoiceFeedback('');

    const firstStep = dialogue.steps[0];
    setMessages([
      { type: 'npc', text: firstStep.npc, translation: firstStep.npcTranslation, id: 0 }
    ]);
    shuffleCurrentOptions(firstStep);
    speakText(firstStep.npc);
  };

  const toggleTranslation = (msgId) => {
    setVisibleTranslations(prev => {
      const next = new Set(prev);
      if (next.has(msgId)) next.delete(msgId);
      else next.add(msgId);
      return next;
    });
  };

  const toggleOptTranslation = (optIdx) => {
    setVisibleOptTranslations(prev => {
      const next = new Set(prev);
      if (next.has(optIdx)) next.delete(optIdx);
      else next.add(optIdx);
      return next;
    });
  };

  const handleAnswer = (option) => {
    if (answered) return;
    setAnswered(true);

    const isCorrect = option.correct;
    const msgId = messages.length;

    setMessages(prev => [
      ...prev,
      { type: 'user', text: option.text, correct: isCorrect, translation: option.translation, id: msgId }
    ]);

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      let nextIndex = stepIndex + 1;
      if (option.nextIndex !== undefined) {
        nextIndex = option.nextIndex;
      }

      if (nextIndex !== 'end' && nextIndex !== -1 && nextIndex < selectedDialogue.steps.length) {
        const nextStep = selectedDialogue.steps[nextIndex];
        const nextMsgId = messages.length + 1;
        setMessages(prev => [
          ...prev,
          { type: 'npc', text: nextStep.npc, translation: nextStep.npcTranslation, id: nextMsgId }
        ]);
        speakText(nextStep.npc);
        setStepIndex(nextIndex);
        setAnswered(false);
        setVoiceFeedback('');
        shuffleCurrentOptions(nextStep);
      } else {
        const totalSteps = selectedDialogue.steps.length;
        const pts = Math.round((score + (isCorrect ? 1 : 0)) / totalSteps * 20);
        updateUserProgress(pts, 'dialogue');

        setMessages(prev => [
          ...prev,
          { type: 'system', text: t('dialogue.finished'), id: messages.length + 1 }
        ]);
        setIsFinished(true);
      }
    }, 1000);
  };

  const getTitle = (d) => {
    if (lang === 'ru') return d.title.ru;
    if (lang === 'en') return d.title.en;
    return d.title.ko;
  };

  const getTranslation = (msg) => {
    if (!msg.translation) return null;
    if (lang === 'ru') return msg.translation.ru;
    if (lang === 'en') return msg.translation.en;
    return null;
  };

  const handleVoiceInput = () => {
    if (isListening || answered) return;
    setVoiceFeedback('');
    setIsListening(true);

    startSpeechRecognition('ko-KR', 
      (spokenText) => {
        setIsListening(false);
        const normalize = (s) => s.replace(/[\s.,?!]/g, '').toLowerCase();
        const spokenNorm = normalize(spokenText);

        // Поиск совпадения среди текущих вариантов
        let matchedOption = null;
        for (const opt of shuffledOptions) {
          if (normalize(opt.text) === spokenNorm) {
            matchedOption = opt;
            break;
          }
        }

        if (matchedOption) {
          handleAnswer(matchedOption);
        } else {
          setVoiceFeedback(`Я услышал: "${spokenText}". Не совпадает с вариантами. Попробуйте еще раз!`);
        }
      },
      (err) => {
        setIsListening(false);
        setVoiceFeedback(`Ошибка: ${err}`);
      },
      () => setIsListening(false)
    );
  };

  // Экран выбора диалога
  if (!selectedDialogue) {
    return (
      <div className="dialogue-sim">
        <h2 className="ds-title">{t('dialogue.title')}</h2>
        <p className="ds-subtitle">{t('dialogue.subtitle')}</p>
        <div className="ds-grid">
          {dialoguesData.map(d => (
            <button
              key={d.id}
              className="ds-card card"
              onClick={() => startDialogue(d)}
            >
              <span className="ds-card-icon">{d.icon}</span>
              <strong className="ds-card-title">{getTitle(d)}</strong>
              <span className="ds-card-steps">{d.steps.length} {t('dialogue.steps')}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Экран диалога (чат)
  const currentStep = selectedDialogue.steps[stepIndex];

  return (
    <div className="dialogue-sim">
      <div className="ds-header">
        <button className="btn-ghost ds-back" onClick={() => setSelectedDialogue(null)}>
          ← {t('dialogue.back')}
        </button>
        <h3>{selectedDialogue.icon} {getTitle(selectedDialogue)}</h3>
        <div className="ds-header-right">
          <label className="voice-toggle">
            <input 
              type="checkbox" 
              checked={isVoiceMode} 
              onChange={e => setIsVoiceMode(e.target.checked)} 
            />
            🎤 Голос
          </label>
          <span className="ds-score">⭐ {score}</span>
        </div>
      </div>

      {/* Чат */}
      <div className="ds-chat" ref={chatRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={`ds-msg ds-msg--${msg.type} ${msg.correct === false ? 'ds-msg--wrong' : ''}`}>
            {msg.type === 'npc' && <span className="ds-avatar">🧑‍💼</span>}
            <div className="ds-bubble">
              <p className="ds-text">{msg.text}</p>
              {getTranslation(msg) && visibleTranslations.has(msg.id) && (
                <p className="ds-translation ds-translation--visible">{getTranslation(msg)}</p>
              )}
              {msg.type === 'npc' && (
                <div className="ds-bubble-actions">
                  <button className="ds-action-btn" onClick={() => speakText(msg.text)} title="Listen">
                    🔊
                  </button>
                  {getTranslation(msg) && (
                    <button
                      className={`ds-action-btn ${visibleTranslations.has(msg.id) ? 'ds-action-btn--active' : ''}`}
                      onClick={() => toggleTranslation(msg.id)}
                      title="Translate"
                    >
                      📖
                    </button>
                  )}
                </div>
              )}
            </div>
            {msg.type === 'user' && (
              <span className="ds-avatar-user">
                {msg.correct === false ? '❌' : '✅'}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Варианты ответа */}
      {!isFinished && currentStep && (
        <div className="ds-options">
          {shuffledOptions.map((opt, i) => {
            const optTranslation = opt.translation
              ? (lang === 'ru' ? opt.translation.ru : lang === 'en' ? opt.translation.en : null)
              : null;

            return (
              <div key={i} className="ds-option-row">
                <button
                  className={`ds-option ${answered ? (opt.correct ? 'ds-opt-correct' : 'ds-opt-wrong') : ''}`}
                  onClick={() => handleAnswer(opt)}
                  disabled={answered}
                >
                  <span className="ds-option-text">{opt.text}</span>
                  {visibleOptTranslations.has(i) && optTranslation && (
                    <span className="ds-option-translation">{optTranslation}</span>
                  )}
                </button>
                <div className="ds-option-actions">
                  <button
                    className="ds-action-btn ds-action-btn--sm"
                    onClick={(e) => { e.stopPropagation(); speakText(opt.text); }}
                    title="Listen"
                  >
                    🔊
                  </button>
                  {optTranslation && (
                    <button
                      className={`ds-action-btn ds-action-btn--sm ${visibleOptTranslations.has(i) ? 'ds-action-btn--active' : ''}`}
                      onClick={(e) => { e.stopPropagation(); toggleOptTranslation(i); }}
                      title="Translate"
                    >
                      📖
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          
          {isVoiceMode && (
            <div className="ds-voice-container">
              <button 
                className={`btn-primary ds-mic-btn ${isListening ? 'listening' : ''}`}
                onClick={handleVoiceInput}
                disabled={answered}
              >
                {isListening ? '🔴 Говорите...' : '🎤 Нажмите и скажите ответ'}
              </button>
              {voiceFeedback && <p className="ds-voice-feedback">{voiceFeedback}</p>}
            </div>
          )}
        </div>
      )}

      {/* Результат */}
      {isFinished && (
        <div className="ds-result">
          <p>
            {t('dialogue.result', {
              score: score,
              total: selectedDialogue.steps.length
            })}
          </p>
          <div className="ds-result-actions">
            <button className="btn-primary" onClick={() => startDialogue(selectedDialogue)}>
              🔄 {t('dialogue.retry')}
            </button>
            <button className="btn-ghost" onClick={() => setSelectedDialogue(null)}>
              {t('dialogue.other')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DialogueSim;
