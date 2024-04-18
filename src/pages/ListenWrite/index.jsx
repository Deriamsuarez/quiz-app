import React, { useState } from "react";
import QuestionLayout from "@/layouts/QuestionLayout";
import { wordsListen } from "@/utils/quiz.js";
import Exercise from "./template/Exercise";

const Index = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [inputValue, setInputValue] = useState(""); // Nuevo estado para el valor del input
  const [errorMessage, setErrorMessage] = useState(""); // Estado para el mensaje de error

  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(wordsListen.length).fill(null)
  );

  const [score, setScore] = useState(0);
  const [isConfirmingAnswers, setIsConfirmingAnswers] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  // Obtener la palabra actual seleccionada
  const currentWord = wordsListen[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < wordsListen.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setIsAnswerSelected(selectedAnswers[nextIndex] !== null);
      setInputValue('');
    }
  };

  const handleReview = () => {
    if (inputValue.trim().toLowerCase() === currentWord.value.toLowerCase()) {
      // Si la respuesta es correcta, limpiar el mensaje de error y avanzar al siguiente ejercicio
      setErrorMessage("");
      handleNext(); // Avanzar al siguiente ejercicio
    } else {
      // Si la respuesta es incorrecta, mostrar un mensaje de error
      setErrorMessage("Incorrect word. Please try again.");
    }
  };

  const handleConfirmation = () => {
    // Lógica para confirmar las respuestas y calcular el puntaje
  };

  const handleSubmit = () => {
    // Lógica para manejar la presentación del modal de confirmación
  };

  const handleInputFilled = (isFilled) => {
    setIsAnswerSelected(true);
    setIsAnswerSelected(isFilled);
  };

  const progressPercentage =
    (selectedAnswers.filter((answer) => answer !== null).length /
      wordsListen.length) *
    100;

  return (
    <QuestionLayout
      title="Write the word"
      next={
        isConfirmingAnswers
          ? handleSubmit
          : currentQuestionIndex === wordsListen.length - 1
          ? handleConfirmation
          : handleNext // Cambiar a handleNext para la validación de respuesta
      }
      isNextEnabled={isAnswerSelected} // Aquí determinas si el botón "Next" debe estar habilitado
      progressPercentage={progressPercentage}
      isLastQuestion={currentQuestionIndex === wordsListen.length - 1}
      isConfirmingAnswers={isConfirmingAnswers}
      openModal={openConfirmationModal}
      setOpenModal={setOpenConfirmationModal}
      score={score}
    >
      <Exercise
        inputValue={inputValue}
        setInputValue={setInputValue}
        word={currentWord}
        handleNext={handleReview} // Pasar handleReview como prop
        setIsAnswerSelected={setIsAnswerSelected}
        errorMessage={errorMessage} // Pasar el mensaje de error como prop
      />      
      {/* Pasar la palabra actual como prop a Exercise */}
    </QuestionLayout>
  );
};

export default Index;
