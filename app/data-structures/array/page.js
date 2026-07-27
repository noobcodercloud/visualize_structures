"use client"

import React, { useState } from "react";
import Link from "next/link";
import Bin from "@/app/components/svg/bin";

const Page = () => {
  const [exampleArray, setExampleArray] = useState([
    { id: crypto.randomUUID(), value: 12 },
    { id: crypto.randomUUID(), value: 24 },
    { id: crypto.randomUUID(), value: 36 },
    { id: crypto.randomUUID(), value: 48 },
  ]);
  const [isAddingElement, setIsAddingElement] = useState(false);

  function handleAddingNewElement() {
    if (isAddingElement) return;
    setIsAddingElement(true);
  }

  function handleValueInput(value) {
    setExampleArray(prev => [...prev, { id: crypto.randomUUID(), value }]);
    setIsAddingElement(false)
  }

  return (
    <div className="min-h-screen bg-gray-900 transition-colors">
      {/* canvas */}
      <div className="m-5 bg-gray-950 h-100 shadow-2xl rounded-sm">

      </div>
      {/* array elements */}
      <div className="flex items-center justify-left mx-5 flex-wrap">
        {exampleArray.map((el, index) => (
          <ArrayElement
            key={el.id}
            hasValue
            value={el.value}
            index={index}
            handleValueInput={(value) => handleValueInput(value)}
          />
        ))}
        {Array.from({ length: isAddingElement ? 1 : 0 }).map((_, i) => (
          <ArrayElement
            key={i + exampleArray.length}
            hasValue={false}
            handleValueInput={(value) => handleValueInput(value)}
          />
        ))}
        {isAddingElement === false &&
          <AddElementButton onClick={handleAddingNewElement}></AddElementButton>
        }
      </div>

      {/* drag n drop delete area, I'm not sure about it coz it might cause some UX issue, will see later */}
      {/* <div className="fixed bottom-0 h-20 text-red-300 hover:text-red-500 transition-colors w-full bg-linear-to-t from-red-800/50 to-transparent">
        <button className="flex items-center justify-center w-full">
          <Bin className="w-16 h-16" />
        </button>
      </div> */}
    </div>
  );
};

function ArrayElement({ hasValue, value, index, handleValueInput }) {
  return (
    <div className="flex m-2 flex-col items-center">
      {hasValue ? (
        <button
          className="w-18 h-14 border border-gray-700 bg-gray-800 text-gray-100 text-lg font-medium hover:bg-gray-700 transition-colors"
        >
          {value}
        </button>
      ) : (
        <input
          type="number"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (e.target.value === "") return;
              handleValueInput(Number(e.target.value));
            }
          }}
          className="w-18 h-14 border border-gray-700 bg-gray-900 text-gray-100 text-center text-lg outline-none focus:border-amber-400"
        />
      )}

      <span className="text-xs text-gray-500 mt-1">
        {hasValue ? index : "Enter Value"}
      </span>
    </div>
  );
}

function AddElementButton({ onClick }) {
  return (
    <div onClick={onClick} className="flex m-2 flex-col items-center">
      <button
        className="w-18 h-14 border border-gray-700 text-lg font-medium transition-colors
          bg-gray-800 text-gray-100 hover:bg-gray-800">
        +
      </button>
      <span className="text-xs text-gray-500 mt-1">Add Element</span>
    </div>
  );
}

export default Page;