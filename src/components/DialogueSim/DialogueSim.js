import React, { useState, useRef, useEffect } from 'react';
import './DialogueSim.css';
import { useLanguage } from '../../contexts/LanguageContext';
import { dialoguesData } from '../../data/dialoguesData';
import { updateUserProgress } from '../../utils/progressUtils';

const DialogueSim = () => {
  const { t, lang } = useLanguage();
  const [selectedDialogue, setSelectedDialogue] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [answered, setAnswered] = useState(false);
  const chatRef = useRef(null);

  // Авто-скролл чата вниз
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.85;
      speechSynthesis.speak(utterance);
    }
  };

  const startDialogue = (dialogue) => {
    setSelectedDialogue(dialogue);
    setStepIndex(0);
    setScore(0);
    setIsFinished(false);
    setAnswered(false);

    const firstStep = dialogue.steps[0];
    setMessages([
      { type: 'npc', text: firstStep.npc, translation: firstStep.npcTranslation }
    ]);

    speakText(firstStep.npc);
  };

  const handleAnswer = (option, index) => {
    if (answered) return;
    setAnswered(true);

    const isCorrect = option.correct;

    // Добавить ответ пользователя
    setMessages(prev => [
      ...prev,
      { type: 'user', text: option.text, correct: isCorrect }
    ]);

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    // Задержка перед следующим шагом
    setTimeout(() => {
      const nextIndex = stepIndex + 1;

      if (nextIndex < selectedDialogue.steps.length) {
        const nextStep = selectedDialogue.steps[nextIndex];
        setMessages(prev => [
          ...prev,
          { type: 'npc', text: nextStep.npc, translation: nextStep.npcTranslation }
        ]);
        speakText(nextStep.npc);
        setStepIndex(nextIndex);
        setAnswered(false);
      } else {
        // Диалог завершён
        const totalSteps = selectedDialogue.steps.length;
        const pts = Math.round((score + (isCorrect ? 1 : 0)) / totalSteps * 20);
        updateUserProgress(pts, 'dialogue');

        setMessages(prev => [
          ...prev,
          { type: 'system', text: t('dialogue.finished') }
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
        <span className="ds-score">⭐ {score}</span>
      </div>

      {/* Чат */}
      <div className="ds-chat" ref={chatRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`ds-msg ds-msg--${msg.type} ${msg.correct === false ? 'ds-msg--wrong' : ''}`}>
            {msg.type === 'npc' && <span className="ds-avatar">🧑‍💼</span>}
            <div className="ds-bubble">
              <p className="ds-text">{msg.text}</p>
              {msg.type === 'npc' && getTranslation(msg) && (
                <p className="ds-translation">{getTranslation(msg)}</p>
              )}
              {msg.type === 'npc' && (
                <button className="ds-speak" onClick={() => speakText(msg.text)} title="Listen">
                  🔊
                </button>
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
          {currentStep.options.map((opt, i) => (
            <button
              key={i}
              className={`ds-option ${answered ? (opt.correct ? 'ds-opt-correct' : 'ds-opt-wrong') : ''}`}
              onClick={() => handleAnswer(opt, i)}
              disabled={answered}
            >
              {opt.text}
            </button>
          ))}
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
