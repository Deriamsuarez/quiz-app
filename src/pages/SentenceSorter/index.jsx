import React, { useState } from "react";
import QuestionLayout from "@/layouts/QuestionLayout";
import { options, phrases } from "@/utils/quiz.js";
import Sentences from "./templates/Sentences";

const Index = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(options.length).fill(null)
  );
  const [score, setScore] = useState(0);
  const [isConfirmingAnswers, setIsConfirmingAnswers] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  const handleNext = () => {
    // Asegúrate de que no te excedas del índice máximo de frases
    if (currentQuestionIndex < phrases.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    // Asegúrate de que no te quedes con un índice negativo
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleConfirmation = () => {
    // Lógica para confirmar las respuestas
  };

  const handleSubmit = () => {
    // Lógica para manejar la presentación final
  };

  const progressPercentage =
    (selectedAnswers.filter((answer) => answer !== null).length /
      options.length) *
    100;

  return (
    <QuestionLayout
      title="Order the sentence"
      next={
        isConfirmingAnswers
          ? handleSubmit
          : currentQuestionIndex === options.length - 1
          ? handleConfirmation
          : handleNext
      }
      previous={handlePrevious}
      isNextEnabled={isAnswerSelected}
      progressPercentage={progressPercentage}
      isLastQuestion={currentQuestionIndex === options.length - 1}
      isConfirmingAnswers={isConfirmingAnswers}
      openModal={openConfirmationModal}
      setOpenModal={setOpenConfirmationModal}
      score={score}
    >
      {!isConfirmingAnswers ? (
        <Sentences sentence={phrases[currentQuestionIndex]} />
      ) : (
        <div>gola</div>
      )}
    </QuestionLayout>
  );
};

export default Index;
