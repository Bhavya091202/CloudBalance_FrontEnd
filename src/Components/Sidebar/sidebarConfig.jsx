import { dashboard } from "../../routes/routes";
import PeopleIcon from "@mui/icons-material/People";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import BarChartIcon from "@mui/icons-material/BarChart";
import StorageIcon from "@mui/icons-material/Storage";


export const sidebarConfig = [
  {
    name: "User Management",
    path: `/dashboard/${dashboard.UserMgmt}`,
    allowedRoles: ["ROLE_ADMIN", "ROLE_READ_ONLY"],
    img: <PeopleIcon />,
  },
  {
    name: "Onboarding",
    path: `/dashboard/${dashboard.Onboarding}`,
    allowedRoles: ["ROLE_ADMIN"],
    img: <CloudUploadIcon />,
  },
  {
    name: "Cost Explorer",
    path: `/dashboard/${dashboard.CostExplorer}`,
    allowedRoles: ["ROLE_ADMIN", "ROLE_CUSTOMER", "ROLE_READ_ONLY"],
    img: <BarChartIcon />,
  },
  {
    name: "AWS Services",
    path: `/dashboard/${dashboard.AwsServices}`,
    allowedRoles: ["ROLE_ADMIN", "ROLE_CUSTOMER", "ROLE_READ_ONLY"],
    img: <StorageIcon />,
  },
];
