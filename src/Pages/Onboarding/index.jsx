import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IAMRoleSetupPage from "./IAMRoleSetupPage/index.jsx";
import CustomerManagedPoliciesPage from "./CustomerManagedPoliciesPage/index.jsx";
import CURStepByStepPage from "./CURStepByStepPage/index.jsx";
import { validateField } from "../../Auth/ValidateField/index.js";
import { postApi } from "../../Services/commonService.js";
import { URLS } from "../../Services/url.js";
import SubmitPage from "./SuccessPage/index.jsx";

const Onboarding = () => {
  const [index, setIndex] = useState(0);
  const [formData, setFormData] = React.useState({
    arn: "",
    accountId: "",
    name: "",
  });
  const [errors, setErrors] = useState({
    arn: "",
    accountId: "",
    name: "",
  });

  const topRef = useRef(null);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      topRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    return () => clearTimeout(timeOut);
  }, [index]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleCopy = (text, label = "Copied!") => {
    navigator.clipboard.writeText(text);
    toast.success(label);
  };

  const isFormValid =
    Object.values(errors).every((err) => err === "") &&
    Object.values(formData).every((val) => val.trim() !== "");

  const prev = () => setIndex((prev) => prev - 1);
  const next = () => setIndex((prev) => prev + 1);
  const cancel = () => {
    setIndex(0);
    setFormData({
      arn: "",
      accountId: "",
      name: "",
    });
    setErrors({
      arn: "",
      accountId: "",
      name: "",
    });
  };

  const submit = async () => {
    try {
      setIndex((prev) => prev + 1);
      const response = await postApi(URLS.Account, formData);
      console.log(response);
    } catch (error) {
      toast.error(error);
    }
  };
  const pages = [
    <IAMRoleSetupPage
      next={next}
      handleCopy={handleCopy}
      handleChange={handleChange}
      formData={formData}
      errors={errors}
      isNextDisabled={!isFormValid}
    />,
    <CustomerManagedPoliciesPage
      prev={prev}
      next={next}
      cancel={cancel}
      handleCopy={handleCopy}
      formData={formData}
    />,
    <CURStepByStepPage
      prev={prev}
      cancel={cancel}
      submit={submit}
      handleCopy={handleCopy}
      formData={formData}
    />,
    <SubmitPage />,
  ];

  return <div ref={topRef}> {pages[index]} </div>;
};

export default Onboarding;
