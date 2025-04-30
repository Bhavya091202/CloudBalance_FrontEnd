import React from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import Footer from "../../Components/Footer";
import { Outlet, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { dashboard, Users } from "../../routes/routes";
import Dashboard from "../../Pages/Dashboard";
import ProtectedRoute from "../../Auth/protectedRoute";
import CreateUser from "../../Pages/UserCreateAndEdit";
import UserMgmt from "../../Pages/UserManagement";
import AwsService from "../../Pages/AwsService";
import CostExplorer from "../../Pages/CostExplorer";
import Onboarding from "../../Pages/Onboarding";

const PageLayout = () => {
  const role = useSelector((state) => state.user.role);
  return (
    <div className="flex flex-col h-screen">
      <header>
        <Navbar />
      </header>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar userRole={role} />

        <div className="flex flex-col flex-1 bg-gray-50">
          <main className="flex-1 p-6 overflow-auto">
            <Routes>
              <Route index element={<Dashboard />} />

              <Route element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]} />}>
                <Route
                  path={`/${dashboard.UserMgmt}/${Users.createUser}`}
                  element={<CreateUser />}
                />
                <Route
                  path={`/${dashboard.UserMgmt}/${Users.editUser}/:id`}
                  element={<CreateUser />}
                />
                <Route
                  path={`/${dashboard.Onboarding}`}
                  element={<Onboarding />}
                />
              </Route>

              <Route
                element={
                  <ProtectedRoute
                    allowedRoles={["ROLE_ADMIN", "ROLE_READ_ONLY"]}
                  />
                }
              >
                <Route path={dashboard.UserMgmt} element={<UserMgmt />} />
              </Route>

              <Route
                element={
                  <ProtectedRoute
                    allowedRoles={[
                      "ROLE_ADMIN",
                      "ROLE_CUSTOMER",
                      "ROLE_READ_ONLY",
                    ]}
                  />
                }
              >
                <Route
                  path={dashboard.CostExplorer}
                  element={<CostExplorer />}
                />
                <Route path={dashboard.AwsServices} element={<AwsService />} />
              </Route>
            </Routes>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
