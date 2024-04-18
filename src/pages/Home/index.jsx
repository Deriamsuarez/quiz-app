import React, { useState } from "react";
import QuestionLayout from "@/layouts/QuestionLayout";
import MultipleChoice from "./templates/MultipleChoice";
import { options } from "@/utils/quiz.js";
import AnswersConfirmation from "./templates/AnswersConfirmation";

const index = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(options.length).fill(null)
  );
  const [score, setScore] = useState(0);

  const [isConfirmingAnswers, setIsConfirmingAnswers] = useState(false);

  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  const handleNext = () => {
    if (currentQuestionIndex < options.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      // Verifica si la siguiente pregunta tiene una respuesta seleccionada
      setIsAnswerSelected(selectedAnswers[nextIndex] !== null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      // Verifica si la pregunta anterior tiene una respuesta seleccionada
      setIsAnswerSelected(selectedAnswers[prevIndex] !== null);
      setIsConfirmingAnswers(false);
    }
  };

  const handleAnswerSelected = (selectedAnswer) => {
    // Encuentra la pregunta actual basada en el índice
    const question = options[currentQuestionIndex].question;

    // Construye un nuevo objeto de respuesta que incluya tanto la pregunta como la respuesta seleccionada
    const answerWithQuestion = {
      ...selectedAnswer, // Incluye todos los campos de la respuesta seleccionada
      question: question, // Agrega la pregunta
    };

    // Actualiza el arreglo de respuestas seleccionadas con el nuevo objeto de respuesta
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerWithQuestion;
    setSelectedAnswers(newAnswers);

    // Indica que se ha seleccionado una respuesta
    setIsAnswerSelected(true);
  };

  const handleConfirmation = () => {
    // Cuenta cuántas respuestas son correctas
    const correctAnswersCount = selectedAnswers.reduce((acc, answer, index) => {
      if (!answer) return acc; // Si no hay respuesta seleccionada, continúa
      const question = options[index]; // Encuentra la pregunta correspondiente
      const correctAnswer = question.answers.find(
        (ans) => ans.correctAnswer === true
      ); // Encuentra la respuesta correcta
      if (answer.value === correctAnswer.value) acc++; // Compara la respuesta seleccionada con la correcta
      return acc;
    }, 0);

    // Calcula la calificación como un porcentaje
    const result = (correctAnswersCount / options.length) * 100;
    console.log(
      `Calificación final: ${result}% (${correctAnswersCount} de ${options.length} respuestas correctas)`
    );
    console.log(result);
    setScore(result);
    setIsConfirmingAnswers(true);
  };

  const handleSubmit = () => {
    console.log("hola" + score);
    setOpenConfirmationModal(true);
  };

  const progressPercentage =
    (selectedAnswers.filter((answer) => answer !== null).length /
      options.length) *
    100;

  return (
    <QuestionLayout
      title="Multiple Choice"
      next={
        isConfirmingAnswers
          ? handleSubmit
          : currentQuestionIndex === options.length - 1
          ? handleConfirmation
          : handleNext
      }
      previous={handlePrevious} // Pasas handlePrevious a QuestionLayout
      isNextEnabled={isAnswerSelected}
      progressPercentage={progressPercentage}
      isLastQuestion={currentQuestionIndex === options.length - 1}
      isConfirmingAnswers={isConfirmingAnswers}
      openModal={openConfirmationModal}
      setOpenModal={setOpenConfirmationModal}
      score={score}
    >
      {!isConfirmingAnswers ? (
        <MultipleChoice
          options={options}
          currentQuestionIndex={currentQuestionIndex}
          onAnswerSelected={handleAnswerSelected}
          selectedAnswer={selectedAnswers[currentQuestionIndex]}
        />
      ) : (
        <AnswersConfirmation
          selectedAnswers={selectedAnswers}
          onEditAnswers={() => setIsConfirmingAnswers(false)} // Opción para volver a editar
        />
      )}
    </QuestionLayout>
  );
};

export default index;
