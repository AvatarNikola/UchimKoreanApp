import React from 'react';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import { useLanguage } from '../../contexts/LanguageContext';

const Header = ({ currentPage, onPageChange }) => {
  const { t } = useLanguage();

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <span className="header-logo">📐</span>
          <h1 className="header-title">{t('app.title')}</h1>
        </div>
        <Navigation currentPage={currentPage} onPageChange={onPageChange} />
      </div>
    </header>
  );
};

export default Header;