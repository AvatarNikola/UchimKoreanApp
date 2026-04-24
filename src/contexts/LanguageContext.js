import React, { createContext, useContext, useState } from 'react';
import ko from '../locales/ko.json';
import en from '../locales/en.json';
import ru from '../locales/ru.json';

const translations = { ko, en, ru };

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(
    () => localStorage.getItem('appLanguage') || 'ko'
  );

  const changeLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('appLanguage', newLang);
  };

  const t = (key, params = {}) => {
    const keys = key.split('.');
    let val = translations[lang];
    for (const k of keys) {
      if (val && typeof val === 'object') val = val[k];
      else { val = undefined; break; }
    }
    // Fallback to Korean if missing
    if (val === undefined) {
      val = translations['ko'];
      for (const k of keys) {
        if (val && typeof val === 'object') val = val[k];
        else { val = key; break; }
      }
    }
    if (typeof val === 'string') {
      return Object.keys(params).reduce(
        (s, p) => s.replace(`{{${p}}}`, params[p]),
        val
      );
    }
    return typeof val === 'string' ? val : key;
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
