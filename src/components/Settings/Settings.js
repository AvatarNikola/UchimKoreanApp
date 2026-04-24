import React from 'react';
import './Settings.css';
import { useLanguage } from '../../contexts/LanguageContext';

const Settings = () => {
  const { lang, changeLang, t } = useLanguage();

  const [difficulty, setDifficulty] = React.useState(
    () => JSON.parse(localStorage.getItem('appSettings') || '{}').difficulty || 'medium'
  );
  const [notifications, setNotifications] = React.useState(
    () => JSON.parse(localStorage.getItem('appSettings') || '{}').notifications !== false
  );
  const [darkMode, setDarkMode] = React.useState(
    () => JSON.parse(localStorage.getItem('appSettings') || '{}').darkMode || false
  );
  const [ttsSpeed, setTtsSpeed] = React.useState(
    () => JSON.parse(localStorage.getItem('appSettings') || '{}').ttsSpeed || '0.70'
  );

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('appSettings', JSON.stringify({ difficulty, notifications, darkMode, ttsSpeed }));
    alert(t('settings.saved'));
  };

  return (
    <div className="settings">
      <h2>{t('settings.title')}</h2>

      <form className="settings-form" onSubmit={handleSave}>

        {/* Language */}
        <div className="setting-group">
          <label>{t('settings.language')}</label>
          <div className="lang-buttons">
            {[
              { code: 'ko', flag: '🇰🇷', label: '한국어' },
              { code: 'en', flag: '🇬🇧', label: 'English' },
              { code: 'ru', flag: '🇷🇺', label: 'Русский' },
            ].map(({ code, flag, label }) => (
              <button
                key={code}
                id={`settings-lang-${code}`}
                type="button"
                className={`lang-btn${lang === code ? ' lang-btn--active' : ''}`}
                onClick={() => changeLang(code)}
              >
                <span>{flag}</span>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div className="setting-group">
          <label>{t('settings.difficulty')}</label>
          <select
            id="settings-difficulty"
            value={difficulty}
            onChange={e => setDifficulty(e.target.value)}
          >
            <option value="easy">{t('settings.easy')}</option>
            <option value="medium">{t('settings.medium')}</option>
            <option value="hard">{t('settings.hard')}</option>
          </select>
        </div>

        {/* TTS Speed */}
        <div className="setting-group">
          <label>{t('settings.tts_speed') || 'Скорость диктора'}</label>
          <select
            id="settings-tts-speed"
            value={ttsSpeed}
            onChange={e => setTtsSpeed(e.target.value)}
          >
            <option value="0.70">{t('settings.speed_slow') || 'Slow'}</option>
            <option value="0.85">{t('settings.speed_normal') || 'Normal'}</option>
            <option value="1.0">{t('settings.speed_fast') || 'Fast'}</option>
          </select>
        </div>

        {/* Notifications */}
        <div className="setting-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              id="settings-notifications"
              checked={notifications}
              onChange={e => setNotifications(e.target.checked)}
            />
            {t('settings.notifications')}
          </label>
        </div>

        {/* Dark mode */}
        <div className="setting-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              id="settings-darkmode"
              checked={darkMode}
              onChange={e => setDarkMode(e.target.checked)}
            />
            {t('settings.dark_mode')}
          </label>
        </div>

        <button type="submit" id="settings-save" className="save-button">
          {t('settings.save')}
        </button>
      </form>
    </div>
  );
};

export default Settings;