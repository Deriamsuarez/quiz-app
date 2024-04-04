import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const QuestionLayout = ({ children, title, previous, nex, setCount,
    count }) => {


    

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="container mx-auto space-y-4 max-w-4xl">
        <div className="font-bold text-4xl text-center text-blue-800 uppercase">
         {title}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
          <div
            className="bg-green-600 h-2.5 rounded-full dark:bg-green-500"
            style={{ width: "50%" }}
          ></div>
        </div>
        <div className="space-y-4">
          {!title ? (
            <div className="striped-background h-[60vh] w-full  border-dashed border-2 rounded-xl flex items-center justify-center bg-gray-50">
              <h3 className="text-gray-400">
                Aquí estarán todos los ejercicios
              </h3>
            </div>
          ) : (
            <div className="striped-background h-[60vh] w-full border-2 rounded-xl bg-gray-50 p-4">
              {children}
            </div>
          )}
          <div className="grid grid-cols-2 divide-x border-2 rounded-xl  text-lg font-black uppercase overflow-hidden">
            <div className="cursor-pointer p-4 flex justify-start items-center text-red-600 hover:text-red-800 hover:bg-red-50" onClick={previous}>
              <ChevronLeftIcon className="w-4 h-4 mr-2" />
              <h3>Anterior</h3>
            </div>
            <div className="cursor-pointer p-4 flex justify-end items-center text-green-600 hover:text-green-800 hover:bg-green-50" onClick={() => setCount( count + 1)}>
              <h3>Siguiente</h3>
              <ChevronRightIcon className="w-4 h-4 ml-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionLayout;
