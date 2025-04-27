export const createUserConfig = [
  // Left Column
  {
    label: "First Name",
    name: "firstName",
    type: "text",
    placeholder: "Enter First Name",
    required: true,
    column: "left",
    labelClass: "block text-sm font-medium text-gray-700 mb-1",
    inputClass: "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
  },
  {
    label: "Last Name",
    name: "lastName",
    type: "text",
    placeholder: "Enter Last Name",
    required: true,
    column: "right",
    labelClass: "block text-sm font-medium text-gray-700 mb-1",
    inputClass: "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
  },
  {
    label: "Email ID",
    name: "email",
    type: "email",
    placeholder: "Enter Email ID",
    required: true,
    column: "left",
    labelClass: "block text-sm font-medium text-gray-700 mb-1",
    inputClass: "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "Enter Password",
    required: false,
    column: "left",
    labelClass: "block text-sm font-medium text-gray-700 mb-1",
    inputClass: "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
  },

  // Right Column
  {
    label: "Select Roles",
    name: "role",
    type: "select",
    placeholder: "Select Role",
    required: true,
    column: "right",
    labelClass: "block text-sm font-medium text-gray-700 mb-1",
    inputClass: "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
    options: [
      { label: "ROLE_ADMIN", value: "ROLE_ADMIN" },
      { label: "ROLE_READ_ONLY", value: "ROLE_READ_ONLY" },
      { label: "ROLE_CUSTOMER", value: "ROLE_CUSTOMER" },
    ],
  },
  // {
  //   type: "button",
  //   name: "back",
  //   column: "full",
  //   buttonText: "← Back",
  //   inputClass: "bg-white text-[#0073E6] border border-[#0073E6] font-semibold px-6 py-2 rounded shadow hover:bg-[#ebf5ff] transition-all",
  //   wrapperClass: "flex justify-start md:justify-start mt-4",
  // },
  // {
  //   type: "submit",
  //   name: "save",
  //   column: "full",
  //   buttonText: "Save",
  //   inputClass: "bg-[#0073E6] text-white font-semibold px-6 py-2 rounded shadow hover:bg-[#005bb5] transition-all",
  //   wrapperClass: "flex justify-center md:justify-end mt-4",
  // },
  {
    type: "custom-group",
    column: "full",
    children: [
      {
        type: "button",
        name: "back",
        buttonText: "← Back",
        onClick: "goBack",
        inputClass:
          "bg-white text-[#0073E6] border border-[#0073E6] font-semibold px-6 py-2 rounded shadow hover:bg-[#ebf5ff] transition-all",
      },
      {
        type: "submit",
        name: "save",
        buttonText: "Save",
        inputClass:
          "bg-[#0073E6] text-white font-semibold px-6 py-2 rounded shadow hover:bg-[#005bb5] transition-all",
      },
    ],
    wrapperClass: "flex justify-between mt-6 gap-4",
  },
];
