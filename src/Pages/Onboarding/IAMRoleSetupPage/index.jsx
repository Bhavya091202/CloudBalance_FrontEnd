import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BulletStepContainer from "../../../Components/BulletContainer";
import { inputFields } from "./InputFormConfig";
import InputField from "../../../Components/InputFieldWrapper/NormalInputWrapper";
import FormFooterButtons from "../../../Components/OnboardinFormButtons";
import CopyableCodeContainer from "../../../trash/CopyableTextOnboarding";
import CopyableButtonBox from "../../../trash/CopyableButtonOnboarding";
import { iamRoleStepConfig } from "./iamRoleStepConfig";
import CopyableBox from "../../../Components/CopyableBox";

// const roleName = "CK-Tuner-Role-dev2";

const IAMRoleSetupPage = ({
  handleChange,
  formData,
  next,
  errors,
  isNextDisabled,
}) => {
  const { title, subtitle, footer, steps } = iamRoleStepConfig;
  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-sm text-gray-500 mb-6">{subtitle}</p>

      <div className="space-y-6 bg-white shadow rounded-lg p-6">
        {steps.map((step, index) => (
          <BulletStepContainer key={index} stepNumber={++index}>
            <div className="space-y-2">
              {step.content}
              {step.copy && (
                <CopyableBox
                  type={step.copy.type}
                  text={step.copy.text}
                  label={step.copy.label}
                  handleCopy={step.copy.handleCopy}
                />
              )}
              {step?.image && (
                <img
                  src={step.image?.src}
                  alt={step.image?.alt}
                  className="w-full rounded shadow"
                />
              )}
            </div>
          </BulletStepContainer>
        ))}

        <div className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {inputFields.map((input) => (
              <InputField
                key={input.name}
                inputFieldData={input}
                handleChange={handleChange}
                value={formData[input.name]}
                error={errors[input.name]}
              />
            ))}
          </div>
        </div>

        <FormFooterButtons
          showPrevious={footer?.showPrevious}
          showCancel={footer?.showCancel}
          customNextMssg={footer?.customNextMssg}
          onNext={next}
          isNextDisabled={isNextDisabled}
        />
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default IAMRoleSetupPage;
