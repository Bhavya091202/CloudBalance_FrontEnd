import { lazy } from "react";
import { dashboard, Users } from "./routes";

// import UserMgmt from '../Pages/UserManagement';
const UserMgmt = lazy(() => import("../Pages/UserManagement"));
const CreateUser = lazy(() => import("../Pages/UserCreateAndEdit"));
const Onboarding = lazy(() => import("../Pages/Onboarding"));
const CostExplorer = lazy(() => import("../Pages/CostExplorer"));
const AwsService = lazy(() => import("../Pages/AwsService"));

const dashboardRouteConfig = [
  {
    path: dashboard.UserMgmt,
    element: <UserMgmt />,
    allowedRoles: ["ROLE_ADMIN", "ROLE_READ_ONLY"],
  },
  {
    path: `${dashboard.UserMgmt}/${Users.createUser}`,
    element: <CreateUser />,
    allowedRoles: ["ROLE_ADMIN"],
  },
  {
    path: `${dashboard.UserMgmt}/${Users.createUser}/:id`,
    element: <CreateUser />,
    allowedRoles: ["ROLE_ADMIN"],
  },
  {
    path: dashboard.Onboarding,
    element: <Onboarding />,
    allowedRoles: ["ROLE_ADMIN"],
  },
  {
    path: dashboard.CostExplorer,
    element: <CostExplorer />,
    allowedRoles: ["ROLE_ADMIN", "ROLE_READ_ONLY", "ROLE_CUSTOMER"],
  },
  {
    path: dashboard.AwsServices,
    element: <AwsService />,
    allowedRoles: ["ROLE_ADMIN", "ROLE_READ_ONLY", "ROLE_CUSTOMER"],
  },
];

export default dashboardRouteConfig;