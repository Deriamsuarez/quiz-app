import React, { useState } from "react";

const Sentences = ({ sentence }) => {
  // Dividir la oración en un array de palabras y asignarles un id único
  const wordsArray = sentence.split(" ").map((word, index) => ({ id: index, value: word })).sort(() => Math.random() - 0.5);
  const [droppedWords, setDroppedWords] = useState([]);

  const handleDragStart = (event, wordId) => {
    event.dataTransfer.setData("wordId", wordId.toString());
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, targetWordId) => {
    event.preventDefault();
    const wordId = parseInt(event.dataTransfer.getData("wordId"), 10);
    const word = wordsArray.find(word => word.id === wordId);

    // Verificar si la palabra ya ha sido soltada
    if (!droppedWords.some(word => word.id === wordId)) {
      setDroppedWords([...droppedWords, word]);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="text-center font-bold text-md text-blue-600 flex gap-4 flex-wrap border-b-2 pb-4 mb-4">
        {wordsArray.filter(word => !droppedWords.includes(word)).map((word) => (
          <div
            key={word.id}
            className="py-2 px-6 border rounded-md"
            draggable
            onDragStart={(event) => handleDragStart(event, word.id)}
          >
            {word.value}
          </div>
        ))}
      </div>

      <ul className="flex flex-wrap gap-4">
        {droppedWords.map((word, index) => (
          <li
            key={index}
            className="border-dashed border-2 py-2 px-6 mb-2 rounded-md"
            onDragOver={(event) => handleDragOver(event)}
            onDrop={(event) => handleDrop(event, word.id)} // Se pasa el id de la palabra al handleDrop
          >
            {word.value}
          </li>
        ))}
        {Array(wordsArray.length - droppedWords.length).fill('').map((_, index) => (
          <li
            key={droppedWords.length + index} // Asegúrate de usar una clave única
            className="border-dashed border-2 py-2 px-6 mb-2 rounded-md"
            onDragOver={(event) => handleDragOver(event)}
            onDrop={(event) => handleDrop(event, null)} // No se necesita el id aquí
          >
            {/* Deja este espacio vacío o un mensaje */}
            Drop here
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sentences;
