import React from 'react';

const SelectInput = ({ inputFieldData, handleChange, value, hideLabel = false }) => {
  return (
    <div className={inputFieldData?.wrapperClass}>
      {!hideLabel && (
        <label htmlFor={inputFieldData?.name} className={inputFieldData?.labelClass}>
          {inputFieldData?.label}
        </label>
      )}
      <select
        name={inputFieldData?.name}
        className={inputFieldData?.inputClass}
        value={value}
        onChange={handleChange}
        required={inputFieldData?.required}
      >
        <option value="">Select</option>
        {inputFieldData?.options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
