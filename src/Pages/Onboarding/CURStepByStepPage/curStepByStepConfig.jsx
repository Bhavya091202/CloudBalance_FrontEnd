import img1 from "../../../Assets/onboarding/img-6.png";
import img2 from "../../../Assets/onboarding/img-7.png";
import img3 from "../../../Assets/onboarding/img-8.png";
import { copyToClipboard } from "../../../Utils/copyToClipboard";

export const reportName = "ck-tuner-{accountId}-hourly-cur";
export const s3Prefix = "{your-account-id}";

export const curStepByStepConfig = {
  title: "Create Cost & Usage Report",
  steps: [
    {
      content: [
        "Go to ",
        { bold: "Cost and Usage Reports" },
        " in the Billing Dashboard and click on ",
        { bold: "Create report" },
        ".",
      ],
    },
    {
      content: [
        "Name the report as shown below and select the ",
        { bold: "Include resource IDs" },
        " checkbox:",
      ],
      copy: {
        type: "button",
        text: reportName,
        label: "Report name copied!",
        handleCopy: copyToClipboard,
      },
      checkbox: [
        { label: "Include Resource IDs", checked: true }
      ],
      image: {
        src: img1,
        alt: "Specify report details"
      }
    },
    {
      content: [
        "In ",
        { bold: "Configure S3 Bucket" },
        ", provide the name of the S3 bucket that was created."
      ],
      checkbox: [
        { label: "The following default policy will be applied to your bucket", checked: true }
      ],
      image: {
        src: img2,
        alt: "Configure S3 Bucket"
      }
    },
    {
      content: [
        "In the ",
        { bold: "Delivery options" },
        " section, enter the below-mentioned Report path prefix:"
      ],
      copy: {
        type: "button",
        text: s3Prefix,
        label: "S3 Prefix copied!",
        handleCopy: copyToClipboard,
      },
      additional: {
        type: "html",
        content: (
          <>
            <p className="mt-4 mb-1 text-sm">
              Additionally, ensure that the following checks are in place:
            </p>
            <ul className="list-disc ml-6 text-sm mb-2">
              <li>
                Time granularity: <strong>Hourly</strong>
              </li>
              <li>Amazon Athena is enabled for report data integration</li>
            </ul>
          </>
        )
      },
      checkbox: [
        { label: "Hourly", checked: true },
        { label: "Amazon Athena", checked: true }
      ],
      image: {
        src: img3,
        alt: "Report delivery options"
      }
    },
    {
      content: [
        "Click on ",
        { bold: "Next" },
        ". Review the configuration of the Cost and Usage Report. Once satisfied, click on ",
        { bold: "Create Report" },
        "."
      ]
    }
  ],
  footer: {
    customPrevMssg: "Back - Account Managed Policies",
    customNextMssg: "Submit",
    showCancel: true,
  },
};
