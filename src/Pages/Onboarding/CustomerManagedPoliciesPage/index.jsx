import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormFooterButtons from "../../../Components/OnboardinFormButtons";
import BulletStepContainer from "../../../Components/BulletContainer";
import { customerManagedPolicyConfig } from "./customerManagedPoliciesPageConfig";
import CopyableBox from "../../../Components/CopyableBox";
const CustomerManagedPoliciesPage = ({ next, prev, cancel }) => {
  const { title, subtitle, footer, steps } = customerManagedPolicyConfig;
  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-sm text-gray-500 mb-6">{subtitle} </p>

      <div className="space-y-6 bg-white shadow rounded-lg p-6">
        {steps.map((step, index) => (
          <BulletStepContainer key={index} stepNumber={index + 1}>
            <div className="space-y-3">
              {step?.content}
              {step?.copy && (
                <CopyableBox
                  type={step.copy.type}
                  text={step.copy.text}
                  label={step.copy.label}
                  handleCopy={step.copy.handleCopy}
                />
              )}
              {step?.image && (
                <img
                  src={step.image.src}
                  alt={`Step ${index + 1}`}
                  className="rounded shadow mt-4"
                />
              )}
            </div>
          </BulletStepContainer>
        ))}
        <FormFooterButtons
          onPrevious={prev}
          onNext={next}
          onCancel={cancel}
          showPrevious={footer.showPrevious}
          showCancel={footer.showCancel}
          customPrevMssg={footer?.onPreviousLabel}
          customNextMssg={footer?.onNextLabel}
        />
        {" "}
      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default CustomerManagedPoliciesPage;
