import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img1 from "../../../Assets/onboarding/img-6.png";
import img2 from "../../../Assets/onboarding/img-7.png";
import img3 from "../../../Assets/onboarding/img-8.png";
import BulletStepContainer from "../../../Components/BulletContainer";
import CopyableButtonBox from "../../../Components/CopyableButtonOnboarding";
import FormFooterButtons from "../../../Components/OnboardinFormButtons";

const CURStepByStepPage = ({ prev, cancel, submit, handleCopy }) => {

  const reportName = "ck-tuner-{accountId}-hourly-cur";
  const s3Prefix = "{your-account-id}";

  return (
    <div className="bg-white p-10 min-h-screen flex flex-col justify-between text-gray-800">
      <ToastContainer position="bottom-right" />

      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Create Cost & Usage Report</h1>

        <BulletStepContainer stepNumber={1}>
          Go to <span className="font-semibold">Cost and Usage Reports</span> in
          the Billing Dashboard and click on{" "}
          <span className="font-semibold">Create report</span>.
        </BulletStepContainer>

        <BulletStepContainer stepNumber={2}>
          Name the report as shown below and select the{" "}
          <span className="font-semibold">Include resource IDs</span> checkbox:
          <CopyableButtonBox
            text={reportName}
            label="Report name copied!"
            handleCopy={handleCopy}
          />
          <div className="mt-3">
            <input type="checkbox" checked readOnly className="mr-2" />
            <span>Include Resource IDs</span>
          </div>
          <img
            src={img1}
            alt="Specify report details"
            className="rounded border mt-4 shadow"
          />
        </BulletStepContainer>

        <BulletStepContainer stepNumber={3}>
          In <span className="font-semibold">Configure S3 Bucket</span>, provide
          the name of the S3 bucket that was created.
          <div className="mt-3">
            <input type="checkbox" checked readOnly className="mr-2" />
            <span>
              The following default policy will be applied to your bucket
            </span>
          </div>
          <img
            src={img2}
            alt="Configure S3 Bucket"
            className="rounded border mt-4 shadow"
          />
        </BulletStepContainer>

        <BulletStepContainer stepNumber={4}>
          In the <span className="font-semibold">Delivery options</span>{" "}
          section, enter the below-mentioned Report path prefix:
          <CopyableButtonBox
            text={s3Prefix}
            label="S3 Prefix copied!"
            handleCopy={handleCopy}
          />
          <p className="mt-4 mb-1 text-sm">
            Additionally, ensure that the following checks are in place:
          </p>
          <ul className="list-disc ml-6 text-sm mb-2">
            <li>
              Time granularity: <strong>Hourly</strong>
            </li>
            <li>Amazon Athena is enabled for report data integration</li>
          </ul>
          <div className="mt-3">
            <input type="checkbox" checked readOnly className="mr-2" />
            <span>Hourly</span>
          </div>
          <div className="mt-1">
            <input type="checkbox" checked readOnly className="mr-2" />
            <span>Amazon Athena</span>
          </div>
          <img
            src={img3}
            alt="Report delivery options"
            className="rounded border mt-4 shadow"
          />
        </BulletStepContainer>

        <BulletStepContainer stepNumber={5}>
          Click on <strong>Next</strong>. Review the configuration of the Cost
          and Usage Report. Once satisfied, click on{" "}
          <strong>Create Report</strong>.
        </BulletStepContainer>
      </div>

      <div>
        <FormFooterButtons
          onCancel={cancel}
          onPrevious={prev}
          onNext={submit}
          customPrevMssg="Back - Account Managed Policies"
          customNextMssg="Submit"
        />
      </div>
    </div>
  );
};

export default CURStepByStepPage;
