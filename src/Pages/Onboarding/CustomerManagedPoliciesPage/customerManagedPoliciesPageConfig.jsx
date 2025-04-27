import img2 from "../../../Assets/onboarding/img-2.png";
import img3 from "../../../Assets/onboarding/img-3.png";
import img4 from "../../../Assets/onboarding/img-4.png";
import img5 from "../../../Assets/onboarding/img-5.png";
import { policies, policiesNames } from "../document";
import { copyToClipboard } from "../../../Utils/copyToClipboard";

export const customerManagedPolicyConfig = {
  title: "Add Customer Managed Policies",
  subtitle: "Create inline and managed policies by following these steps",
  steps: [
    {
      content: (
        <>
          Go to the <a className="text-blue-600 underline">Create Policy</a>{" "}
          page.
        </>
      ),
    },
    {
      content: (
        <>
          Click on the <strong>JSON</strong> tab and paste the following policy
          and click on <strong>Next</strong>:
        </>
      ),
      copy: {
        type: "code",
        text: policies.costAuditJson,
        label: "CostAudit JSON copied!",
        handleCopy: copyToClipboard,
      },
    },
    {
      content: <>Enter the policy name:</>,
      copy: {
        type: "button",
        text: policiesNames[0],
        label: "Policy name copied!",
        handleCopy: copyToClipboard,
      },
    },
    {
      content: <>Repeat for the next policies:</>,
    },
    {
      copy: {
        type: "code",
        text: policies.secAuditJson,
        label: "SecAudit JSON copied!",
        handleCopy: copyToClipboard,
      },
    },
    {
      copy: {
        type: "button",
        text: policiesNames[1],
        label: "Policy name copied!",
        handleCopy: copyToClipboard,
      },
    },
    {
      copy: {
        type: "code",
        text: policies.tunerReadJson,
        label: "TunerRead JSON copied!",
        handleCopy: copyToClipboard,
      },
    },
    {
      copy: {
        type: "button",
        text: policiesNames[2],
        label: "Policy name copied!",
        handleCopy: copyToClipboard,
      },
    },
    {
      content: (
        <>
          Go to the <a className="text-blue-600 underline">CK-Tuner-Role</a> and
          click <strong>Add permissions &gt; Attach Policy</strong>
        </>
      ),
    },
    {
      image: { src: img2, alt: "Attach Policy" },
    },
    {
      content: (
        <>
          Filter by Type → Customer managed and select the three created
          policies.
        </>
      ),
      image: { src: img3, alt: "Select Customer Policies" },
    },
    {
      content: (
        <>
          Click <strong>Add permissions</strong>
        </>
      ),
    },
    {
      content: (
        <>
          Click <strong>Add permissions &gt; Create inline policy</strong>
        </>
      ),
      image: { src: img4, alt: "Create Inline Policy" },
    },
    {
      content: <>Paste the S3 inline policy:</>,
      copy: {
        type: "code",
        text: policies.s3InlineJson,
        label: "S3 Inline Policy copied!",
        handleCopy: copyToClipboard,
      },
    },
    {
      content: <>Enter the policy name:</>,
      copy: {
        type: "button",
        text: policiesNames[3],
        label: "Policy name copied!",
        handleCopy: copyToClipboard,
      },
      image: { src: img5, alt: "Final Inline Policy" },
    },
  ],
  footer: {
    onPreviousLabel: "Back - Create IAM Role",
    onNextLabel: "Next - Create Cost & Usage Report",
    showCancel: true,
  },
};
