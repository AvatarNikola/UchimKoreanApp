// Утилиты безопасности — защита данных в localStorage

const SECRET_SALT = 'uchim-korean-2026-salt';

/**
 * Простой hash (djb2) для проверки целостности данных
 * Не криптографический — достаточен для защиты от казуальных читеров
 */
export const hashData = (data) => {
  const str = SECRET_SALT + JSON.stringify(data);
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) & 0xffffffff;
  }
  return hash.toString(36);
};

/**
 * Сохранить данные в localStorage с контрольной суммой
 */
export const saveSecure = (key, data) => {
  try {
    const hash = hashData(data);
    const payload = JSON.stringify({ data, _h: hash });
    localStorage.setItem(key, payload);
    return true;
  } catch (e) {
    console.error('Security: ошибка при сохранении:', e);
    return false;
  }
};

/**
 * Прочитать данные из localStorage с проверкой целостности
 * Возвращает null, если данные повреждены или подделаны
 */
export const loadSecure = (key) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const parsed = JSON.parse(raw);

    // Поддержка миграции: если данные без hash (старый формат)
    if (parsed && typeof parsed === 'object' && !parsed._h) {
      return parsed; // старые данные — просто вернуть
    }

    const { data, _h } = parsed;
    const expectedHash = hashData(data);

    if (_h !== expectedHash) {
      console.warn('Security: данные подделаны! Сброс...');
      localStorage.removeItem(key);
      return null;
    }

    return data;
  } catch (e) {
    console.error('Security: ошибка при чтении:', e);
    localStorage.removeItem(key);
    return null;
  }
};

/**
 * Валидация структуры данных прогресса
 */
export const validateProgressData = (data) => {
  if (!data || typeof data !== 'object') return false;

  // level должен быть числом >= 1 и <= 999
  if (typeof data.level !== 'number' || data.level < 1 || data.level > 999) return false;

  // totalPoints — число >= 0 и <= 999999
  if (typeof data.totalPoints !== 'number' || data.totalPoints < 0 || data.totalPoints > 999999) return false;

  // categories — объект с числовыми значениями
  if (typeof data.categories !== 'object' || data.categories === null) return false;
  for (const val of Object.values(data.categories)) {
    if (typeof val !== 'number' || val < 0 || val > 999999) return false;
  }

  // achievements — массив строк
  if (!Array.isArray(data.achievements)) return false;
  if (data.achievements.some(a => typeof a !== 'string')) return false;

  return true;
};

/**
 * Санитизация строки (защита от XSS при отображении)
 */
export const sanitize = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};
