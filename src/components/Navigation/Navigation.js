import React from 'react';
import './Navigation.css';
import { useLanguage } from '../../contexts/LanguageContext';

const Navigation = ({ currentPage, onPageChange }) => {
  const { t } = useLanguage();

  const navItems = [
    { key: 'home',       icon: '🏠' },
    { key: 'lessons',    icon: '📚' },
    { key: 'practice',   icon: '✏️' },
    { key: 'quiz',       icon: '🎯' },
    { key: 'flashcards', icon: '🃏' },
    { key: 'dialogue',   icon: '💬' },
    { key: 'audio',      icon: '🎧' },
    { key: 'vocabulary', icon: '📖' },
    { key: 'stats',      icon: '📊' },
    { key: 'profile',    icon: '👤' },
    { key: 'settings',   icon: '⚙️' },
  ];

  return (
    <nav className="nav" aria-label="Main navigation">
      <ul className="nav-list">
        {navItems.map(({ key, icon }) => (
          <li key={key}>
            <button
              id={`nav-${key}`}
              className={`nav-item${currentPage === key ? ' nav-item--active' : ''}`}
              onClick={() => onPageChange(key)}
              aria-current={currentPage === key ? 'page' : undefined}
            >
              <span className="nav-icon">{icon}</span>
              <span className="nav-label">{t(`nav.${key}`)}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
