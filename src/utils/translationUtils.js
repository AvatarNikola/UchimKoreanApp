// Утилиты для управления локализацией

import ko from '../locales/ko.json';
import en from '../locales/en.json';

const translations = {
  ko: ko,
  en: en
};

/**
 * Получение перевода для строки
 * @param {string} key - ключ перевода (например, "app.title")
 * @param {string} language - язык ("ko" или "en")
 * @param {object} params - параметры для подстановки
 * @returns {string} переведенная строка
 */
export const translate = (key, language = 'ko', params = {}) => {
  const keys = key.split('.');
  let translation = translations[language];

  // Навигация по вложенным ключам
  for (let i = 0; i < keys.length; i++) {
    if (translation && typeof translation === 'object') {
      translation = translation[keys[i]];
    } else {
      return key; // Если не найдено, возвращаем ключ
    }
  }

  // Подстановка параметров
  if (typeof translation === 'string' && params) {
    let result = translation;
    Object.keys(params).forEach(param => {
      result = result.replace(`{{${param}}}`, params[param]);
    });
    return result;
  }

  return translation || key;
};

/**
 * Получение текущего языка пользователя
 * @returns {string} язык ("ko" или "en")
 */
export const getCurrentLanguage = () => {
  const savedLanguage = localStorage.getItem('appLanguage');
  return savedLanguage || 'ko';
};

/**
 * Установка языка пользователя
 * @param {string} language - язык ("ko" или "en")
 */
export const setLanguage = (language) => {
  localStorage.setItem('appLanguage', language);
};

/**
 * Получение списка доступных языков
 * @returns {array} массив языков
 */
export const getAvailableLanguages = () => {
  return Object.keys(translations).map(lang => ({
    code: lang,
    name: lang === 'ko' ? '한국어' : 'English'
  }));
};