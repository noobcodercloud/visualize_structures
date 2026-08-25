"use client"

import React, { useState } from "react";
import Bin from "@/app/components/svg/bin";
import { DragDropProvider, useDroppable } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { move } from "@dnd-kit/helpers";

const Page = () => {

  const [exampleArray, setExampleArray] = useState([
    { id: crypto.randomUUID(), value: 12 },
    { id: crypto.randomUUID(), value: 24 },
    { id: crypto.randomUUID(), value: 36 },
    { id: crypto.randomUUID(), value: 48 },
  ]);

  function handleAddingElementAt(idx) {
    const input = window.prompt("Enter a value:");
    if (input === null || input.trim() === "") return;

    const value = Number(input);
    if (Number.isNaN(value)) return;

    setExampleArray(prev => {
      const next = [...prev];
      next.splice(idx, 0, { id: crypto.randomUUID(), value });
      return next;
    });
  }

  function handleDeletingAt(idx) {
    setExampleArray(prev => prev.filter((_, i) => i !== idx));
  }

  function handleDragEnd(event) {
    setExampleArray(prev => move(prev, event));
  }

  return (
    <div className="min-h-screen bg-gray-900 transition-colors">

      <div className="m-5 bg-gray-950 h-100 shadow-2xl rounded-sm"></div>

      <DragDropProvider
        onDragEnd={handleDragEnd}
      >
        <div className="flex items-center justify-left mx-5 flex-wrap">
          {exampleArray.map((el, index) => (
            <div className="flex" key={el.id}>
              <SortableArrayElement
                id={el.id}
                index={index}
                value={el.value}
                exampleArray={exampleArray}
                handleAddingElementAt={handleAddingElementAt}
                handleDeletingAt={handleDeletingAt}
              />
            </div>
          ))}
          <AddElementButton onClick={() => handleAddingElementAt(exampleArray.length)} exampleArray={exampleArray} />
        </div>
      </DragDropProvider>

    </div>
  );
};

function SortableArrayElement({ id, index, value, exampleArray, handleAddingElementAt, handleDeletingAt }) {
  const { ref, isDragging } = useSortable({ id, index });

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center touch-none transition-opacity group
        ${isDragging ? "opacity-40 cursor-grabbing" : "cursor-grab"}`}
    >
      <div className="flex">
        {index === 0 && (
          <HoverEffectAddElementButton onClick={() => handleAddingElementAt(0)} />
        )}
        <div className="relative">
          <button className="min-w-16 h-12 px-2 border border-gray-700 bg-gray-800 text-gray-100 text-lg font-medium hover:bg-gray-700 transition-colors pointer-events-none relative">
            {value}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleDeletingAt(index); }}
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-600"
          >
            <Bin className="w-3 h-3" />
          </button>
        </div>
        {index !== exampleArray.length - 1 && (
          <HoverEffectAddElementButton onClick={() => handleAddingElementAt(index + 1)} />
        )}
      </div>
      <span className={`text-xs text-gray-500 mt-1 ${index === 0 ? '' : index !== exampleArray.length - 1 ? 'mr-5' : ''}`}>
        {index}
      </span>
    </div>
  );
}

function AddElementButton({ onClick, exampleArray }) {
  return (
    <div onClick={onClick} className="flex m-2 flex-col items-center justify-center">
      <button className="w-16 h-12 text-xl font-medium transition-colors text-gray-100 hover:bg-gray-800 flex items-center justify-center">
        +
      </button>
      <span className="text-xs text-gray-500 mt-1">{exampleArray.length}</span>
    </div>
  );
}

function HoverEffectAddElementButton({ onClick }) {
  return (
    <div
      className="opacity-0 w-5 h-12 text-gray-100 text-lg font-medium hover:opacity-100 hover:w-16 transition-all cursor-pointer flex items-center justify-center"
      onClick={onClick}
    >
      +
    </div>
  );
}

export default Page;