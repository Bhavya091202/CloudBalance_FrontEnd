import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img2 from "../../../Assets/onboarding/img-2.png";
import img3 from "../../../Assets/onboarding/img-3.png";
import img4 from "../../../Assets/onboarding/img-4.png";
import img5 from "../../../Assets/onboarding/img-5.png";
import { policies, policiesNames } from "../document";
import FormFooterButtons from "../../../Components/OnboardinFormButtons";
import BulletStepContainer from "../../../Components/BulletContainer";
import CopyableCodeContainer from "../../../Components/CopyableTextOnboarding";
import CopyableButtonBox from "../../../Components/CopyableButtonOnboarding";

const CustomerManagedPoliciesPage = ({ next, prev, cancel, handleCopy }) => {
  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-2">Add Customer Managed Policies</h1>
      <p className="text-sm text-gray-500 mb-6">
        Create inline and managed policies by following these steps
      </p>

      <div className="space-y-6 bg-white shadow rounded-lg p-6">
        <BulletStepContainer stepNumber={1}>
          Go to the <a className="text-blue-600 underline">Create Policy</a>{" "}
          page.
        </BulletStepContainer>

        <BulletStepContainer stepNumber={2}>
          Click on the <strong>JSON</strong> tab and paste the following policy
          and click on <strong>Next</strong>:
          <CopyableCodeContainer
            text={policies.costAuditJson}
            label="CostAudit JSON copied!"
            handleCopy={handleCopy}
          />
        </BulletStepContainer>

        <BulletStepContainer stepNumber={3}>
          Enter the policy name:
          <CopyableButtonBox
            text={policiesNames[0]}
            label="Policy name copied!"
            handleCopy={handleCopy}
          />
        </BulletStepContainer>

        <BulletStepContainer stepNumber={4}>
          Repeat for the next policies:
        </BulletStepContainer>

        <BulletStepContainer stepNumber={5}>
          <CopyableCodeContainer
            text={policies.secAuditJson}
            label="SecAudit JSON copied!"
            handleCopy={handleCopy}
          />
          <CopyableButtonBox
            text={policiesNames[1]}
            label="Policy name copied!"
            handleCopy={handleCopy}
          />
        </BulletStepContainer>

        <BulletStepContainer stepNumber={6}>
          <CopyableCodeContainer
            text={policies.tunerReadJson}
            label="TunerRead JSON copied!"
            handleCopy={handleCopy}
          />
          <CopyableButtonBox
            text={policiesNames[2]}
            label="Policy name copied!"
            handleCopy={handleCopy}
          />
        </BulletStepContainer>

        <BulletStepContainer stepNumber={7}>
          Go to the <a className="text-blue-600 underline">CK-Tuner-Role</a> and
          click <strong>Add permissions &gt; Attach Policy</strong>
        </BulletStepContainer>

        <BulletStepContainer stepNumber={8}>
          <img src={img2} alt="Attach Policy" className="rounded shadow mt-4" />
        </BulletStepContainer>

        <BulletStepContainer stepNumber={9}>
          Filter by Type → Customer managed and select the three created
          policies.
          <img
            src={img3}
            alt="Select Customer Policies"
            className="rounded shadow mt-4"
          />
        </BulletStepContainer>

        <BulletStepContainer stepNumber={10}>
          Click <strong>Add permissions</strong>
        </BulletStepContainer>

        <BulletStepContainer stepNumber={11}>
          Click <strong>Add permissions &gt; Create inline policy</strong>
          <img
            src={img4}
            alt="Create Inline Policy"
            className="rounded shadow mt-4"
          />
        </BulletStepContainer>

        <BulletStepContainer stepNumber={12}>
          Paste the S3 inline policy:
          <CopyableCodeContainer
            text={policies.s3InlineJson}
            label="S3 Inline Policy copied!"
            handleCopy={handleCopy}
          />
        </BulletStepContainer>

        <BulletStepContainer stepNumber={13}>
          Enter the policy name:
          <CopyableButtonBox
            text={policiesNames[3]}
            label="Policy name copied!"
            handleCopy={handleCopy}
          />
          <img
            src={img5}
            alt="Final Inline Policy"
            className="rounded shadow mt-4"
          />
        </BulletStepContainer>

        <FormFooterButtons
          onPrevious={prev}
          onNext={next}
          onCancel={cancel}
          customPrevMssg="Back - Create IAM Role"
          customNextMssg="Next - Create Cost & Usage Report"
        />
      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default CustomerManagedPoliciesPage;
