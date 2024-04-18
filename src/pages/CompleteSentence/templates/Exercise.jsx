import React, { useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";

const CompleteTheSentence = ({words}) => {
  const [sentence, setSentence] = useState([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState(null);

  console.log(sentence);
  console.log(words);
  const handleDragStart = (e, word, index) => {
    e.dataTransfer.setData("text/plain", word);
    setDraggingIndex(index);
  };

  const handleDragEnd = () => {
    setDraggingIndex(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedWord = e.dataTransfer.getData("text/plain");
    setSentence((prevSentence) => [...prevSentence, droppedWord]);
    setIsDraggingOver(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const removeWord = (index) => {
    setSentence((prevSentence) => {
      const newSentence = [...prevSentence];
      newSentence.splice(index, 1);
      return newSentence;
    });
  };

  // Filtrar palabras disponibles para arrastrar
  const draggableWords = words.filter((word) => {
    const sentenceCount = sentence.filter((w) => w === word).length;
    const wordsCount = words.filter((w) => w === word).length;
    return sentenceCount < wordsCount;
  });

  return (
    <div className="space-y-4">
      <ul className="p-4 border-2 rounded-lg flex gap-4 flex-wrap">
        {words.map((word, index) => (
          <li
            className={`border-2 px-4 py-2 rounded-md border-primary   ${draggableWords.find(elm => elm === word) ? 'border-blue-500 text-blue-500' : 'text-gray-400'} ${index === draggingIndex ? 'cursor-grabbing' : 'cursor-grab'}`}
            key={index}
            draggable={draggableWords.find(elm => elm === word) ? true : false}
            onDragStart={(e) => handleDragStart(e, word, index)}
            onDragEnd={handleDragEnd}
          >
            {word}
          </li>
        ))}
      </ul>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`p-4 border-2 rounded-lg text-center ${isDraggingOver ? 'border-blue-500 text-blue-500' : 'text-blue-500'}`}
      >
        {sentence.length > 0 ? (
          <ul className="flex flex-wrap">
            {sentence.map((word, index) => (
              <li className="group cursor-pointer relative p-2" onClick={() => removeWord(index)} key={index}>
                {word}{" "}
                <div className="hidden group-hover:flex absolute w-full h-full bg-red-500/50 backdrop-blur  top-0 bottom-0 left-0 rounded-md  items-center justify-center">
                  <XCircleIcon className="w-6 h-6 text-white"/>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-400 py-2">Drop words here to complete the sentence</div>
        )}
      </div>
    </div>
  );
};

export default CompleteTheSentence;
