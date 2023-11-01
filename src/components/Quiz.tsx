import React, { useEffect, useState } from 'react'
import './Quiz.css'
import QuizCore from '../core/QuizCore';
import quizData from '../data/quizData';

const Quiz: React.FC = () => {
  
  const [quiz] = useState(() => new QuizCore());
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(quiz.getCurrentQuestion());


  useEffect(() => {
    setSelectedAnswer(null);
  }, [currentQuestion])

  const handleOptionSelect = (option: string): void => {
    setSelectedAnswer(option);
  };

  const handleButtonClick = (): void => {
    // Task3: Implement the logic for button click, such as moving to the next question.
    if (selectedAnswer) {
      quiz.answerQuestion(selectedAnswer);
    }

    if (quiz.hasNextQuestion()) {
      quiz.nextQuestion();
      setCurrentQuestion(quiz.getCurrentQuestion());
    } else {
      setCurrentQuestion(null);
    }
  } 

  if (!currentQuestion) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {quiz.getScore()} out of {quizData.length}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>
    
      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={handleButtonClick}>{quiz.hasNextQuestion() ? "Next Question" : "Submit"}</button>
    </div>
  );
};

export default Quiz;