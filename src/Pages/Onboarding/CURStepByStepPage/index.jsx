import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormFooterButtons from "../../../Components/OnboardinFormButtons";
import { curStepByStepConfig } from "./curStepByStepConfig";
import CopyableBox from "../../../Components/CopyableBox";
import BulletStepContainer from "../../../Components/BulletContainer";

const renderContent = (contentArray) =>
  contentArray?.map((item, index) => {
    if (typeof item === "string") return <span key={index}>{item}</span>;
    if (item.bold)
      return (
        <strong key={index} className="font-semibold">
          {item.bold}
        </strong>
      );
    if (item.link && item.href)
      return (
        <a
          key={index}
          href={item.href}
          className="text-blue-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.link}
        </a>
      );
    return null;
  });

const CURStepByStepPage = ({ prev, cancel, submit }) => {
  const { title, steps, footer } = curStepByStepConfig;
  return (
    <div className="bg-white p-10 min-h-screen flex flex-col justify-between text-gray-800">
      <ToastContainer position="bottom-right" />

      <div className="space-y-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        {steps.map((step, index) => (
          <BulletStepContainer key={index} stepNumber={index + 1}>
            <div className="space-y-3">
              {step.content && <p>{renderContent(step.content)}</p>}

              {step.copy && (
                <CopyableBox
                  type={step.copy.type}
                  text={step.copy.text}
                  label={step.copy.label}
                  handleCopy={step.copy.handleCopy}
                />
              )}

              {step.additional?.type === "html" && step.additional.content}

              {step.checkbox &&
                step.checkbox.map((box, i) => (
                  <div key={i}>
                    <input
                      type="checkbox"
                      checked={box.checked}
                      readOnly
                      className="mr-2"
                    />
                    <span>{box.label}</span>
                  </div>
                ))}

              {step.image && (
                <img
                  src={step.image.src}
                  alt={step.image.alt}
                  className="rounded border mt-4 shadow"
                />
              )}
            </div>
          </BulletStepContainer>
        ))}
      </div>

      <div className="mt-8">
        <FormFooterButtons
          onCancel={cancel}
          onPrevious={prev}
          onNext={submit}
          showCancel={footer?.showCancel}
          customPrevMssg={footer?.customPrevMssg}
          customNextMssg={footer?.customNextMssg}
        />
      </div>
    </div>
  );
};

export default CURStepByStepPage;
