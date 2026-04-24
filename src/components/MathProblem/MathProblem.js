import React, { useState } from 'react';
import './MathProblem.css';
import { generateMathProblem, checkAnswer } from '../../utils/mathUtils';

const MathProblem = ({ onAnswerSubmit }) => {
  const [currentProblem, setCurrentProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Генерация новой задачи
  const generateNewProblem = () => {
    const operations = ['+', '-', '*', '/'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    const level = 1; // Можно сделать более сложным с учетом уровня пользователя

    const problem = generateMathProblem(operation, level);
    setCurrentProblem(problem);
    setUserAnswer('');
    setShowResult(false);
    setIsCorrect(false);
  };

  // Инициализация первой задачи
  React.useEffect(() => {
    generateNewProblem();
  }, []);

  // Обработка отправки ответа
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentProblem || !userAnswer) return;

    const correct = checkAnswer(parseInt(userAnswer), currentProblem.answer);
    setIsCorrect(correct);
    setShowResult(true);

    // Передаем результат в родительский компонент
    onAnswerSubmit({
      correct: correct,
      answer: parseInt(userAnswer),
      correctAnswer: currentProblem.answer,
      problem: currentProblem.problem
    });
  };

  return (
    <div className="math-problem">
      <div className="problem-display">
        <h3>문제</h3>
        {currentProblem && (
          <div className="problem-text">
            <p>{currentProblem.problem}</p>
          </div>
        )}
      </div>

      <form className="answer-form" onSubmit={handleSubmit}>
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="답을 입력하세요"
          disabled={showResult}
        />
        <button
          type="submit"
          disabled={showResult || !userAnswer}
        >
          {showResult ? '다음 문제' : '제출'}
        </button>
      </form>

      {showResult && (
        <div className={`result ${isCorrect ? 'correct' : 'incorrect'}`}>
          <p>
            {isCorrect ? '정답입니다!' : `틀렸습니다. 정답은 ${currentProblem?.answer}입니다.`}
          </p>
          <button onClick={generateNewProblem} className="next-button">
            다음 문제
          </button>
        </div>
      )}
    </div>
  );
};

export default MathProblem;