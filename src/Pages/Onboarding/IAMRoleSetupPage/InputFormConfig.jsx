export const inputFields = [
    {
      label: (
        <>
          Enter the IAM Role ARN <span className="text-red-500">*</span>
        </>
      ),
      labelClass: "block text-sm font-medium text-gray-700 mb-1",
      type: "text",
      name: "arn",
      placeholder: "Enter IAM Role ARN",
      inputClass: "border border-gray-300 rounded px-4 py-2 text-sm w-full",
    },
    {
      label: (
        <>
          Enter the Account Number <span className="text-red-500">*</span>
        </>
      ),
      labelClass: "block text-sm font-medium text-gray-700 mb-1",
      type: "text",
      name: "accountId",
      placeholder: "Enter Account Number",
      inputClass: "border border-gray-300 rounded px-4 py-2 text-sm w-full",
    },
    {
      label: (
        <>
          Enter the Account Name <span className="text-red-500">*</span>
        </>
      ),
      labelClass: "block text-sm font-medium text-gray-700 mb-1",
      type: "text",
      name: "name",
      placeholder: "Enter Account Name",
      inputClass: "border border-gray-300 rounded px-4 py-2 text-sm w-full",
    },
  ];
  