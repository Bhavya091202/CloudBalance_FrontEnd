// iamRoleStepConfig.js
import image from "../../../Assets/onboarding/img-1.png";
import { trustPolicy } from "../document";
import { copyToClipboard } from "../../../Utils/copyToClipboard";

export const roleName = "CK-Tuner-Role-dev2";

export const iamRoleStepConfig = {
  title: "Create an IAM Role",
  subtitle: "Create an IAM Role by following these steps",
  footer: {
    customNextMssg: "Next - Add Customer Managed Policies",
    showPrevious: false,
    showCancel: false,
  },
  steps: [
    {
      content: (
        <>
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
        </>
      ),
    },
    {
      content: (
        <p>
          In the <strong>Trusted entity type</strong> section, select{" "}
          <strong>Custom trust policy</strong>. Replace the prefilled policy
          with:
        </p>
      ),
      copy: {
        type: "code",
        text: trustPolicy,
        label: "Trust policy copied!",
        handleCopy: copyToClipboard,
      },
    },
    {
      content: (
        <>
          Click on <strong>Next</strong> to go to the{" "}
          <strong>Add permissions</strong> page. We would not be adding any
          permissions for now because the permission policy content will be
          dependent on the AWS Account ID retrieved from the IAM Role. Just
          click on <strong>Next</strong>.
        </>
      ),
    },
    {
      content: (
        <>
          <p>
            In the <strong>Role name</strong> field, enter the role name below
            and click <strong>Create Role</strong>.
          </p>
        </>
      ),
      copy: {
        type: "button",
        text: roleName,
        label: "Role name copied!",
        handleCopy: copyToClipboard,
      },
    },
    {
      content: <>Go to the newly created IAM Role and copy the Role ARN.</>,
      image: {
        src: image,
        alt: "IAM Role Instructions",
      },
    },
    {
      content:"Paste the copied Role ARN, Account Number, Account Name below -"
    },
  ],
};
