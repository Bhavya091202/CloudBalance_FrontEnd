import React from "react";

const SidebarWrapper = ({ open, onClose, title = "Filters", children }) => {
  if (!open) return null;

  return (
    <div className="absolute right-0 w-[400px] min-h-96 max-h-[90vh] bg-white shadow-lg p-6 z-[50] overflow-y-auto rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button
          onClick={onClose}
          className="text-gray-500 text-2xl hover:text-gray-700 focus:outline-none"
        >
          ✕
        </button>
      </div>

      {/* Children Area */}
      <div className="space-y-4">{children}</div>
    </div>
  );
};

export default SidebarWrapper;
