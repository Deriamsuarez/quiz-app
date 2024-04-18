import React, { useState, useEffect } from "react";
import QuestionLayout from "@/layouts/QuestionLayout";
import { options, phrases } from "@/utils/quiz.js";
import Exercise from "./templates/Exercise";

const Index = () => {
  const [words, setWords] = useState(("Hola Don pepito hola don jose").split(" "));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(options.length).fill(null));
  const [score, setScore] = useState(0);
  const [isConfirmingAnswers, setIsConfirmingAnswers] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [isSentenceComplete, setIsSentenceComplete] = useState(false);

  const handleNext = () => {
    if (currentQuestionIndex < phrases.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    console.log('hola');
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleConfirmation = () => {
    // Aquí puedes realizar la verificación de la oración
    // Por ejemplo, comparar la oración formada con la respuesta correcta
    // y actualizar el estado en consecuencia (por ejemplo, incrementar el puntaje si es correcta)
  };

  const handleSubmit = () => {
    // Lógica para manejar la presentación final
  };

  const progressPercentage =
    (selectedAnswers.filter((answer) => answer !== null).length /
      options.length) *
    100;

  useEffect(() => {
    // Verificar si todas las palabras han sido colocadas en la oración
    setIsSentenceComplete(words.length === selectedAnswers.filter(word => word !== null).length);
  }, [selectedAnswers]);

  const shuffleWords = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  const data = shuffleWords(words);

  return (
    <QuestionLayout
      title="Complete the sentence"
      next={
        isConfirmingAnswers
          ? handleSubmit
          : currentQuestionIndex === options.length - 1
          ? handleConfirmation
          : handleNext
      }
      previous={handlePrevious}
      isNextEnabled={isSentenceComplete}
      progressPercentage={progressPercentage}
      isLastQuestion={currentQuestionIndex === options.length - 1}
      isConfirmingAnswers={isConfirmingAnswers}
      openModal={openConfirmationModal}
      setOpenModal={setOpenConfirmationModal}
      score={score}
    >
      {!isConfirmingAnswers ? (
        <Exercise words={data} />
      ) : (
        <div>gola</div>
      )}
    </QuestionLayout>
  );
};

export default Index;
