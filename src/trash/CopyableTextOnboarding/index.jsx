// src/Components/CopyableCodeContainer.jsx
import React from "react";
import { FiCopy } from "react-icons/fi";
// import { toast } from "react-toastify";

const CopyableCodeContainer = ({
  text,
  label = "Copied!",
  maxHeight = "max-h-[250px]",
  minHeight = "min-h-[40px]",
  handleCopy,
}) => {

  return (
    <div className="relative mt-2 group">
      <div
        onClick={() => handleCopy(text, label)}
        className={`cursor-pointer bg-gray-100 text-[#0a3ca2] text-xs p-4 rounded border border-gray-300 group-hover:bg-blue-50 group-hover:text-[#06337c] ${maxHeight} ${minHeight} overflow-auto w-full transition-colors duration-200`}
      >
        <pre className="whitespace-pre-wrap break-words">{text}</pre>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleCopy(text, label);
        }}
        className="absolute top-2 right-8 bg-blue-600 hover:bg-blue-700 text-white p-1 rounded opacity-80 group-hover:opacity-100 transition-opacity"
        title="Copy to clipboard"
      >
        <FiCopy size={16} />
      </button>
    </div>
  );
};

export default CopyableCodeContainer;
