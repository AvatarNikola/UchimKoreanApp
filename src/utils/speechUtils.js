export const startSpeechRecognition = (lang, onResult, onError, onEnd) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    if (onError) onError('Ваш браузер не поддерживает голосовой ввод. Используйте Google Chrome, Edge или Safari.');
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = lang;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    if (onResult) onResult(transcript);
  };

  recognition.onerror = (event) => {
    if (onError) onError(`Ошибка микрофона: ${event.error}`);
  };

  if (onEnd) {
    recognition.onend = onEnd;
  }

  try {
    recognition.start();
  } catch (e) {
    if (onError) onError(`Не удалось запустить микрофон: ${e.message}`);
  }
  
  return recognition;
};
