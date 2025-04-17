import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "../Pages/Login";
import UserMgmt from "../Pages/UserManagement";
import Onboarding from "../Pages/Onboarding";
import CostExplorer from "../Pages/CostExplorer";
import AwsService from "../Pages/AwsService";
import ErrorPage from "../Pages/Unautharized";
import Home from "../Pages/Home";
import UserMgmtLayout from "../Layout/UserMgmtLayout";
import CreateUser from "../Pages/UserCreateAndEdit";
import ProtectedRoute from "../Auth/protectedRoute";
import { dashboard, Users } from "./routeConfig";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />

        {/* Protected Layout */}
        <Route path="/dashboard" element={<UserMgmtLayout />}>
          <Route element={<ProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_READ_ONLY"]} />}>
            <Route path={dashboard.users} element={<UserMgmt />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]} />}>
            <Route path={`${dashboard.users}/${Users.createUser}`} element={<CreateUser />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]} />}>
            <Route path={`${dashboard.users}/${Users.editUser}/:id`} element={<CreateUser />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_READ_ONLY"]} />}>
            <Route path={dashboard.onboarding} element={<Onboarding />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_CUSTOMER", "ROLE_READ_ONLY"]} />}>
            <Route path={dashboard.costExplorer} element={<CostExplorer />} />
            <Route path={dashboard.awsServices} element={<AwsService />} />
          </Route>
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <Toaster />
    </>
  );
};

export default AppRoutes;
