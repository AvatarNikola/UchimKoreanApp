import React, { useState } from 'react';
import './Lessons.css';
import { useLanguage } from '../../contexts/LanguageContext';
import { lessonsData } from '../../data/lessonsData';
import { playKoreanTTS } from '../../utils/mathAudioUtils';

const Lessons = () => {
  const { t, lang } = useLanguage();
  const [selectedLesson, setSelectedLesson] = useState(null);

  const getTitle = (lesson) => lesson.title[lang] || lesson.title.en;
  const getContent = (lesson) => lesson.content[lang] || lesson.content.en;

  const parseContent = (text) => {
    if (!text) return null;
    // Разделяем текст по тегам вида [[display|spoken]]
    const parts = text.split(/(\[\[.*?\]\])/g);
    return parts.map((part, index) => {
      const match = part.match(/\[\[(.*)\|(.*)\]\]/);
      if (match) {
        const display = match[1];
        const spoken = match[2];
        return (
          <button 
            key={index} 
            className="inline-audio-word" 
            onClick={() => playKoreanTTS(spoken)} 
            type="button"
          >
            {display} <span className="audio-icon">🔊</span>
          </button>
        );
      }
      // Простой парсинг переносов строк и bold **text**
      const formattedHTML = part
        .replace(/\n/g, '<br/>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
      return <span key={index} dangerouslySetInnerHTML={{__html: formattedHTML}}></span>;
    });
  };

  if (selectedLesson) {
    return (
      <div className="lessons">
        <button className="btn-ghost back-btn" onClick={() => setSelectedLesson(null)} style={{marginBottom: '1rem'}}>
          {t('lessons.back_to_lessons')}
        </button>
        <div className="lesson-viewer card">
          <h2 className="viewer-title">{getTitle(selectedLesson)}</h2>
          <div className="lesson-content">
            {parseContent(getContent(selectedLesson))}
          </div>
        </div>
      </div>
    );
  }

  const mathKoreanLessons = lessonsData.filter(l => l.category === 'math_korean');
  const grammarLessons = lessonsData.filter(l => l.category === 'general_grammar');
  const situationsLessons = lessonsData.filter(l => l.category === 'situations');

  return (
    <div className="lessons">
      <h2 style={{marginBottom: '2rem'}}>{t('lessons.title')}</h2>
      
      <div className="lesson-section">
        <h3 className="section-title">{t('lessons.category_math_korean')}</h3>
        <div className="lessons-grid">
          {mathKoreanLessons.map((lesson) => (
            <div key={lesson.id} className="lesson-card" onClick={() => setSelectedLesson(lesson)}>
              <h3>{getTitle(lesson)}</h3>
              <button className="start-lesson">{t('lessons.read_lesson')}</button>
            </div>
          ))}
        </div>
      </div>

      <div className="lesson-section" style={{marginTop: '2.5rem'}}>
        <h3 className="section-title">{t('lessons.category_general_grammar')}</h3>
        <div className="lessons-grid">
          {grammarLessons.map((lesson) => (
            <div key={lesson.id} className="lesson-card" onClick={() => setSelectedLesson(lesson)}>
              <h3>{getTitle(lesson)}</h3>
              <button className="start-lesson">{t('lessons.read_lesson')}</button>
            </div>
          ))}
        </div>
      </div>

      <div className="lesson-section" style={{marginTop: '2.5rem'}}>
        <h3 className="section-title">{t('lessons.category_situations')}</h3>
        <div className="lessons-grid">
          {situationsLessons.map((lesson) => (
            <div key={lesson.id} className="lesson-card" onClick={() => setSelectedLesson(lesson)}>
              <h3>{getTitle(lesson)}</h3>
              <button className="start-lesson">{t('lessons.read_lesson')}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lessons;