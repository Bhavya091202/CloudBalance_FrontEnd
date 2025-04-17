import React from 'react'

const InputField = ({ inputFieldData, handleChange, value, error }) => {
  return (
    <div>
      <label htmlFor={inputFieldData?.name} className={inputFieldData?.labelClass}>
        {inputFieldData?.label}
      </label>
      <input
        type={inputFieldData?.type}
        name={inputFieldData?.name}
        className={`${inputFieldData?.inputClass} ${error ? "border-red-500" : ""}`}
        value={inputFieldData?.type === "submit" ? inputFieldData?.name : value}
        onChange={handleChange}
        required={inputFieldData?.required}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default InputField;