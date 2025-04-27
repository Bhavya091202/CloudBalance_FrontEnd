import { dashboard } from "../../routes/routes";

export const sidebarConfig = [
  {
    name: "User Management",
    path: `/dashboard/${dashboard.UserMgmt}`,
    allowedRoles: ["ROLE_ADMIN", "ROLE_READ_ONLY"],
  },
  {
    name: "Onboarding",
    path: `/dashboard/${dashboard.Onboarding}`,
    allowedRoles: ["ROLE_ADMIN"],
  },
  {
    name: "Cost Explorer",
    path: `/dashboard/${dashboard.CostExplorer}`,
    allowedRoles: ["ROLE_ADMIN", "ROLE_CUSTOMER", "ROLE_READ_ONLY"],
  },
  {
    name: "AWS Services",
    path: `/dashboard/${dashboard.AwsServices}`,
    allowedRoles: ["ROLE_ADMIN", "ROLE_CUSTOMER", "ROLE_READ_ONLY"],
  },
];
