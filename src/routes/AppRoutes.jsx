import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "../Pages/Login";
import ErrorPage from "../Pages/Unautharized";
import Home from "../Pages/Home";
import PageLayout from "../Layout/PagesLayout";
import PrivateRoute from "../Auth/PrivateRoute";

const UserMgmt = lazy(() => import("../Pages/UserManagement"));
const CreateUser = lazy(() => import("../Pages/UserCreateAndEdit"));
const Onboarding = lazy(() => import("../Pages/Onboarding"));
const CostExplorer = lazy(() => import("../Pages/CostExplorer"));
const AwsService = lazy(() => import("../Pages/AwsService"));

const AppRoutes = () => {
  return (
    <>
      <Routes>
        {/* Public */}

        <Route element={<PrivateRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/" element={<Home />} />

        {/* Protected Layout */}
        <Route path="/dashboard/*" element={<PageLayout />}>
          {/* TODO: All these routes should be in layout */}
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <Toaster />
    </>
  );
};

// const AppRoutes = () => {
//   return (
//     <>
//       <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
//         <Routes>
//           {/* Public */}
//           <Route element={<PrivateRoute />}>
//             <Route path="/login" element={<Login />} />
//           </Route>
//           <Route path="/" element={<Home />} />

//           {/* Protected Layout */}
//           <Route path="/dashboard" element={<PageLayout />}>
//             {RenderRoutes(dashboardRouteConfig)}
//           </Route>

//           <Route path="/dashboard/*" element={<PageLayout />} />
//           <Route path="*" element={<ErrorPage />} />
//         </Routes>
//       </Suspense>
//     </>
//   );
// };

export default AppRoutes;
