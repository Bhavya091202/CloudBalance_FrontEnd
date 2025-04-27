// src/Components/FormButtonGroup.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const CustomButtonWrapper = ({ groupConfig }) => {
  const navigate = useNavigate();

  if (!groupConfig || !Array.isArray(groupConfig?.children)) return null;

  return (
    <div className={groupConfig?.wrapperClass}>
      {groupConfig?.children.map((child, index) => {
        if (child.type === "submit") {
          return (
            <button
              key={`child-submit-${index}`}
              type="submit"
              className={child?.inputClass}
            >
              {child?.buttonText}
            </button>
          );
        }

        if (child?.type === "button" && child?.onClick === "goBack") {
          return (
            <button
              key={`child-back-${index}`}
              type="button"
              onClick={() => navigate(-1)}
              className={child.inputClass}
            >
              {child.buttonText}
            </button>
          );
        }

        return null;
      })}
    </div>
  );
};

export default CustomButtonWrapper;
