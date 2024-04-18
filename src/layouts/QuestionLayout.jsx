import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import ConfirmationModal from "../components/ConfirmationModal";

const QuestionLayout = ({
  children,
  title,
  previous,
  next,
  isNextEnabled = true,
  progressPercentage = 0,
  isLastQuestion = false,
  isConfirmingAnswers,
  openModal,
  setOpenModal,
  score
}) => {
  const renderContent = () => {
    if (!title) {
      return (
        <div className="striped-background h-[65vh] w-full border-dashed border-2 rounded-xl flex items-center justify-center bg-gray-50">
          <h3 className="text-gray-400">Aquí estarán todos los ejercicios</h3>
        </div>
      );
    } else {
      return (
        <div className="striped-background h-[65vh] overflow-y-auto border-2 rounded-xl bg-gray-50 p-4 relative">
          {children}
        </div>
      );
    }
  };

  return (
    <div className="container mx-auto max-w-4xl flex flex-col gap-4 h-screen py-12 px-4">
      <div>
        <div className="font-bold text-2xl md:text-4xl text-center mb-2 text-blue-800 uppercase">
          {title}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5  dark:bg-gray-700">
          <div
            className="bg-green-600 h-2.5 rounded-full dark:bg-green-500"
            style={{ width: `${progressPercentage}%`, transition: 'width 2s ease-in-out' }}
          ></div>
        </div>
      </div>
      <div className="flex-1 h-full overflow-hidden">
        {renderContent()}
      </div>
      <div className="grid grid-cols-2 divide-x-2 border-2 rounded-xl  text-lg font-black uppercase overflow-hidden">
        <div
          className="cursor-pointer p-4 flex justify-start items-center text-red-600 hover:text-red-800 hover:bg-red-50"
          onClick={previous}
        >
          <ChevronLeftIcon className="w-4 h-4 mr-2" />
          <h3>Anterior</h3>
        </div>
        <div
          className={`cursor-pointer p-4 flex justify-end items-center ${isNextEnabled ? "text-green-600 hover:text-green-800 hover:bg-green-50" : "text-gray-400 cursor-not-allowed"}`}
          onClick={isNextEnabled ? next : () => {}}
        >
          <h3>{!isConfirmingAnswers ? isLastQuestion ? "Revisar" : "Siguiente" : 'Terminar' }</h3>
          <ChevronRightIcon className="w-4 h-4 ml-2" />
        </div>
      </div>
      <ConfirmationModal
        open={openModal}
        setOpen={setOpenModal}
        score={score}
      />
    </div>
  );
};

export default QuestionLayout;
