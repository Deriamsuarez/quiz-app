import React from "react";

const AnswersConfirmation = ({ data }) => {

  return (
    <div className="w-full h-full flex flex-col">
      <h2 className="p-4 text-center border-2 rounded-lg font-bold text-xl text-blue-600 mb-4  flex items-center justify-center">
        Confirmar respuestas
      </h2>
      <ul className="grid sm:grid-cols-4 gap-4 overflow-y-scroll">
        {data.map((answer, index) => (
          <li
          key={index}
            className="border-2 rounded-lg overflow-hidden  cursor-pointer"
            onClick={() => {}}
          >
            <div className="flex items-center gap-4">
            
              <div className="px-4 py-2">
                <h3 className="font-medium text-blue-600">{(index +1) + ". " + answer.translation}</h3>
                <p className="pl-3">{answer.itemSelected.text}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {/* <ConfettiCanvas /> */}

    </div>
  );
};

export default AnswersConfirmation;
