import React, { useState, useEffect } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";



const ColumnsSection = ({data, itemsDropped, setItemsDropped}) => {

  const handleDrop = (e, targetItem) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    const sourceItem = data.find(item => item.id === id);
    const droppedText = sourceItem.translation;
    const updatedItemsDropped = itemsDropped.map(item =>
      item.id === targetItem.id ? { ...item, droppedText, itemSelected: sourceItem } : item
    );
    setItemsDropped(updatedItemsDropped);
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <h2 className="p-4 text-center border-2 rounded-lg font-bold text-xl text-blue-600 flex items-center justify-center">
        Arrastra las palabras al espacio correspondiente
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 border-b-2 pb-4">
        {data.filter(item => !itemsDropped.some(droppedItem => droppedItem.itemSelected && droppedItem.itemSelected.id === item.id)).map((item) => (
          <h2
            key={item.id}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("text/plain", item.id)}
            className="p-2 text-center border-2 rounded-lg font-bold text-md text-blue-600 flex items-center justify-center cursor-move"
          >
            {item.text}
          </h2>
        ))}
      </div>

      <div className="space-y-2">
        {itemsDropped.map((item) => (
          <div key={item.id} className="grid grid-cols-2 gap-2 items-center">
            <div className="p-4 border-2 rounded-lg font-bold text-md text-blue-600">
              {item.translation}
            </div>
            <div
              onDrop={(e) => handleDrop(e, item)}
              onDragOver={(e) => e.preventDefault()}
              className={`relative p-4 border-2 rounded-lg flex-grow  ${item.itemSelected ? 'border-blue-600 text-blue-600 bg-blue-50 font-bold' : 'border-dashed text-gray-500'}`}
            >
              {item.itemSelected ? item.itemSelected.text : "Arrastra aquí"}
              {item.itemSelected && (
                <div
                  onClick={() => handleReturn(item)}
                  className="cursor-pointer absolute top-2 right-2"
                >
                  <XCircleIcon className="w-5 h-5 text-red-500" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

  
    </div>
  );
};

export default ColumnsSection;
