import React, { useState, useEffect } from 'react';

const MultipleChoice = ({ options, currentQuestionIndex, onAnswerSelected, selectedAnswer }) => {
    
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const handleSelectAnswer = (answer) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(newAnswers);
    
    onAnswerSelected(answer);
  };
  
  const currentQuestion = options[currentQuestionIndex];
  
  console.log(currentQuestion);
    return (
      <div className='w-full h-full flex flex-col '>
        <h2 className='p-4 text-center border-2 rounded-lg font-bold text-xl text-blue-600 mb-4 flex-1 flex items-center justify-center'>
          {currentQuestion.question}
        </h2>
        <ul className='grid grid-cols-2 gap-4'>
          {currentQuestion.answers.map((answer, index) => (
            <li
              className={`p-4 text-center border-2 rounded-lg font-bold text-xl cursor-pointer ${selectedAnswer?.id === answer.id ? 'text-green-600 border-green-600 bg-green-50' : ''}`}
              key={index}
              onClick={() => handleSelectAnswer(answer)}
            >
              {answer.value}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  

export default MultipleChoice;
