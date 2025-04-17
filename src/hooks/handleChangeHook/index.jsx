import { useState } from "react";

const useFormHandler = (data = {}) => {
  const [formData, setFormData] = useState(data);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return [formData, handleChange, setFormData];
};

export default useFormHandler;
