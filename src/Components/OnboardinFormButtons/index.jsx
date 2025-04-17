import React from "react";

const FormFooterButtons = ({
  onCancel = () => {},
  onPrevious = () => {},
  onNext = () => {},
  showCancel = true,
  showPrevious = true,
  showNext = true,
  isNextDisabled = false,
  customNextMssg = "Next",
  customPrevMssg = "Previous",
}) => {
  return (
    <div className="mt-8 flex justify-between items-center flex-wrap gap-4">
      {showCancel && (
        <button
          onClick={onCancel}
          className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md border border-gray-300 transition"
        >
          Cancel
        </button>
      )}

      <div className="flex gap-3 ml-auto">
        {showPrevious && (
          <button
            onClick={onPrevious}
            className="px-5 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md border border-blue-300 transition"
          >
            {customPrevMssg}
          </button>
        )}
        {showNext && (
          <button
            onClick={onNext}
            disabled={isNextDisabled}
            className={`px-5 py-2 rounded-md transition ${
              isNextDisabled
                ? "bg-blue-300 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {customNextMssg}
          </button>
        )}
      </div>
    </div>
  );
};


export default FormFooterButtons;
