// src/Components/CopyableLabelBox.jsx
import React from "react";
import { FiCopy } from "react-icons/fi";

const CopyableButtonBox = ({
  text,
  label = "Copied!",
  handleCopy,
  iconSize = 14,
  boxClass = "",
}) => {
  return (
    <div
      className={`mt-2 flex items-center w-fit border border-blue-500 bg-grey-50 rounded-md overflow-hidden group cursor-pointer hover:text-[#06337c] ${boxClass}`}
      onClick={() => handleCopy(text, label)}
    >
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent parent click
          handleCopy(text, label);
        }}
        className="ml-1 bg-blue-400 hover:bg-blue-700 transition-colors text-white h-full px-2 py-2 rounded-md flex items-center justify-center"
      >
        <FiCopy size={iconSize} />
      </button>
      <span className="px-4 py-2 text-gray-800 text-sm font-medium whitespace-nowrap">
        {text}
      </span>
    </div>
  );
};

export default CopyableButtonBox;
