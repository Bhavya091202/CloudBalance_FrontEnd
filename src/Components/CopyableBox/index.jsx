import React from "react";
import { FiCopy } from "react-icons/fi";

const CopyableBox = ({
  text,
  label = "Copied!",
  handleCopy,
  type = "button", // "button" or "code"
  iconSize = 14,
  boxClass = "",
  maxHeight = "max-h-[250px]",
  minHeight = "min-h-[40px]",
}) => {
  const isCode = type === "code";

  const handleClick = (e) => {
    e.stopPropagation();
    handleCopy(text, label);
  };

  return (
    <div
      className={`relative mt-2 group ${boxClass} ${isCode ? "" : "w-fit"}`}
      onClick={() => handleCopy(text, label)}
    >
      {!isCode ? (
        <div className="flex items-center border border-blue-500 bg-grey-50 rounded-md overflow-hidden group hover:text-[#06337c]">
          <button
            onClick={handleClick}
            className="bg-blue-400 hover:bg-blue-700 ml-2 transition-colors text-white h-full px-2 py-2 rounded-md flex items-center justify-center"
            title="Copy to clipboard"
          >
            <FiCopy size={iconSize} />
          </button>

          <span className="px-4 py-2 text-gray-800 text-sm font-medium whitespace-nowrap">
            {text}
          </span>
        </div>
      ) : (
        <div
          className={`relative bg-gray-100 text-[#0a3ca2] text-xs p-4 rounded border border-gray-300 transition-colors 
            group-hover:bg-blue-50 group-hover:text-[#06337c] w-full ${maxHeight} ${minHeight} overflow-auto`}
        >
          <pre className="whitespace-pre-wrap break-words">{text}</pre>

          {/* ✅ Copy button positioned at top-right */}
          <button
            onClick={handleClick}
            className="absolute top-2 right-2 bg-blue-400 hover:bg-blue-700 transition-colors text-white p-2 rounded-full flex items-center justify-center"
            title="Copy to clipboard"
          >
            <FiCopy size={iconSize} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CopyableBox;
