import React, { useEffect, useState } from "react";
import QuestionLayout from "@/layouts/QuestionLayout";
import { words } from "@/utils/quiz.js";
import ColumnsSection from "./templates/ColumnsSection";
import { shuffleData } from "@/utils/helpers.js";
import AnswersConfirmation from "./templates/AnswersConfirmation";

const shuffledWords = shuffleData(words);

const Index = () => {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [wordsList, setWordsList] = useState(words);


  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [isConfirmingAnswers, setIsConfirmingAnswers] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  const [itemsDropped, setItemsDropped] = useState(
    shuffledWords[currentGroupIndex]
  );
  console.log(itemsDropped);

  const handleNext = () => {
    const allAnswersValid = selectedAnswers.every((answer) =>
      answer.every((word) => "droppedText" in word && "itemSelected" in word)
    );

    if (allAnswersValid) {
      const currentWordGroup = shuffledWords[currentGroupIndex];

      // Iterar sobre itemsDropped y actualizar los elementos correspondientes en wordsList
      const updatedWordsList = wordsList.map((word) => {
        const matchingItem = itemsDropped.find((item) => item.id === word.id);
        return matchingItem ? { ...matchingItem } : word;
      });

      // Actualizar wordsList
      setWordsList(updatedWordsList);

      // Agregar el nuevo grupo de palabras al estado itemsDropped
      setItemsDropped(shuffledWords[currentGroupIndex + 1]);

      if (currentGroupIndex === shuffledWords.length - 1) {
        setIsConfirmingAnswers(true);
      } else {
        // Incrementar el índice del grupo actual
        setCurrentGroupIndex((prevIndex) => prevIndex + 1);
      }

      // Reiniciar el estado de isAnswerSelected
      setIsAnswerSelected(false);
    } else {
      console.log("No todas las respuestas son válidas");
    }
  };

  const handleSubmit = () => {
    const totalWords = wordsList.length;
    let correctCount = 0;
  
    wordsList.forEach((word) => {
      if (
        word.translation === word.itemSelected.translation &&
        word.text === word.itemSelected.text
      ) {
        correctCount++;
      }
    });
  
    const percentage = (correctCount / totalWords) * 100;
    setScore(percentage)
    setOpenConfirmationModal(true)
    console.log(`Porcentaje de respuestas correctas: ${percentage}%`);
  };
  
  const handlePrevious = () => {
    if (currentGroupIndex > 0) {
      setCurrentGroupIndex((prevIndex) => prevIndex - 1);
      setIsAnswerSelected(false);
      setIsConfirmingAnswers(false);
    }
  };

  const progressPercentage = (currentGroupIndex / shuffledWords.length) * 100;

  return (
    <QuestionLayout
      title="Match the columns"
      next={isConfirmingAnswers ? handleSubmit : handleNext}
      previous={handlePrevious}
      isNextEnabled={
        itemsDropped
          ? itemsDropped.every(
              (word) => "droppedText" in word && "itemSelected" in word
            ) || true
          : true
      }
      progressPercentage={progressPercentage}
      isLastQuestion={currentGroupIndex === shuffledWords.length - 1}
      isConfirmingAnswers={isConfirmingAnswers}
      openModal={openConfirmationModal}
      setOpenModal={setOpenConfirmationModal}
      score={score}
      isAnswerSelected={isAnswerSelected}
    >
      {!isConfirmingAnswers ? (
        <ColumnsSection
          key={currentGroupIndex}
          data={shuffledWords[currentGroupIndex]}
          itemsDropped={itemsDropped}
          setItemsDropped={setItemsDropped}
        />
      ) : (
        <AnswersConfirmation data={wordsList} />
      )}
    </QuestionLayout>
  );
};

export default Index;
