import React from "react";
import { dashboard } from "../routes/routes";

export const dashoardNavigationHandler = (role) => {
  if (role === "ROLE_ADMIN" || role === "ROLE_READ_ONLY") {
    return `/dashboard/${dashboard.UserMgmt}`;
  } else if (role === "ROLE_CUSTOMER") {
    return `/dashboard/${dashboard.CostExplorer}`;
  } else {
    return `/unautharized`
  }
};
