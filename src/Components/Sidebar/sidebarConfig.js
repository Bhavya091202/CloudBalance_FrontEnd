export const sidebarConfig = [
  {
    name: "User Management",
    path: "users",
    allowedRoles: ["ROLE_ADMIN", "ROLE_READ_ONLY"],
  },
  {
    name: "Onboarding",
    path: "onboarding",
    allowedRoles: ["ROLE_ADMIN", "ROLE_READ_ONLY"],
  },
  {
    name: "Cost Explorer",
    path: "cost-explorer",
    allowedRoles: ["ROLE_ADMIN", "ROLE_CUSTOMER", "ROLE_READ_ONLY"],
  },
  {
    name: "AWS Services",
    path: "aws-services",
    allowedRoles: ["ROLE_ADMIN", "ROLE_CUSTOMER", "ROLE_READ_ONLY"],
  },
];