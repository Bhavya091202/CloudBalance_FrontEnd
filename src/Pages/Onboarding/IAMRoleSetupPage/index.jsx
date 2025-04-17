import React from "react";
import { ToastContainer } from "react-toastify";
import { FiCopy } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";
import image from "../../../Assets/onboarding/img-1.png";
import { trustPolicy } from "../document";
import BulletStepContainer from "../../../Components/BulletContainer";
import { inputFields } from "./InputFormConfig";
import InputField from "../../../Components/InputFieldWrapper/NormalInputWrapper";
import FormFooterButtons from "../../../Components/OnboardinFormButtons";
import CopyableCodeContainer from "../../../Components/CopyableTextOnboarding";
import CopyableButtonBox from "../../../Components/CopyableButtonOnboarding";

const roleName = "CK-Tuner-Role-dev2";

const IAMRoleSetupPage = ({
  handleCopy,
  handleChange,
  formData,
  next,
  errors,
  isNextDisabled
}) => {
  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-2">Create an IAM Role</h1>
      <p className="text-sm text-gray-500 mb-6">
        Create an IAM Role by following these steps
      </p>

      <div className="space-y-6 bg-white shadow rounded-lg p-6">
        {/* Step 1 */}
        <BulletStepContainer stepNumber={1}>
          Log into AWS account{" "}
          <a
            href="https://console.aws.amazon.com/iam/home#/roles"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Create an IAM Role
          </a>
          .
        </BulletStepContainer>

        {/* Step 2 */}
        <BulletStepContainer stepNumber={2}>
          <p>
            In the <strong>Trusted entity type</strong> section, select{" "}
            <strong>Custom trust policy</strong>. Replace the prefilled policy
            with:
          </p>
          <CopyableCodeContainer
            text={trustPolicy}
            label="Trust policy copied!"
            handleCopy={handleCopy}
          />
        </BulletStepContainer>

        {/* Step 3 */}
        <BulletStepContainer stepNumber={3}>
          Click <strong>Next</strong> to go to the{" "}
          <strong>Add permissions</strong> page. No permissions are added for
          now. Just click <strong>Next</strong>.
        </BulletStepContainer>

        {/* Step 4 */}
        <BulletStepContainer stepNumber={4}>
          <p>
            In the <strong>Role name</strong> field, enter the role name below
            and click <strong>Create Role</strong>.
          </p>

          <CopyableButtonBox
            text={roleName}
            label="Role name copied!"
            handleCopy={handleCopy}
          />
        </BulletStepContainer>

        {/* Step 5 */}
        <BulletStepContainer stepNumber={5}>
          Go to the newly created IAM Role and copy the Role ARN.
        </BulletStepContainer>

        {/* Image Preview */}
        <img
          src={image}
          alt="IAM Role Instructions"
          className="w-full rounded shadow"
        />

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
          showPrevious={false}
          showCancel={false}
          customNextMssg="Next - Add Customer Managed Policies"
          onNext={next}
          isNextDisabled={isNextDisabled}
        />
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default IAMRoleSetupPage;
