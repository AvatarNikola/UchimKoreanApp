import React from 'react';
import './VirtualKeyboard.css';

const KEY_LAYOUT = [
  ['ㅂ','ㅈ','ㄷ','ㄱ','ㅅ','ㅛ','ㅕ','ㅑ','ㅐ','ㅔ'],
  ['ㅁ','ㄴ','ㅇ','ㄹ','ㅎ','ㅗ','ㅓ','ㅏ','ㅣ'],
  ['ㅋ','ㅌ','ㅊ','ㅍ','ㅠ','ㅜ','ㅡ']
];

const VirtualKeyboard = ({ onKeyPress, onBackspace }) => {
  return (
    <div className="vkb-container">
      {KEY_LAYOUT.map((row, i) => (
        <div key={i} className={`vkb-row row-${i}`}>
          {row.map(key => (
            <button key={key} className="vkb-key" onClick={() => onKeyPress(key)} type="button">
              {key}
            </button>
          ))}
          {/* Добавляем кнопку стирания в конец последнего ряда для экономии места */}
          {i === 2 && (
             <button className="vkb-key vkb-action p-l" onClick={onBackspace} type="button">⌫</button>
          )}
        </div>
      ))}
      <div className="vkb-row">
        <button className="vkb-key vkb-space" onClick={() => onKeyPress(' ')} type="button">띄어쓰기 (Space)</button>
      </div>
    </div>
  );
};

export default VirtualKeyboard;
