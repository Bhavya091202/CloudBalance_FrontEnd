import React from "react";

const BulletStepContainer = ({ stepNumber, children }) => {
  return (
    <div className="flex items-start gap-4 w-full">
      {/* Numbered Bullet */}
      <div className="min-w-6 min-h-6 w-6 h-6 flex items-center justify-center bg-slate-400 text-white text-sm font-semibold rounded-full">
        {stepNumber}
      </div>

      {/* Content (allow to grow full width) */}
      <div className="text-sm text-gray-800 flex-1">{children}</div>
    </div>
  );
};

export default BulletStepContainer;
