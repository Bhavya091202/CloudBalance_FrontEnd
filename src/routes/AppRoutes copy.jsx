import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Pages
import Login from '../Pages/Login';
import UserMgmt from '../Pages/UserManagement';
import Onboarding from '../Pages/Onboarding';
import CostExplorer from '../Pages/CostExplorer';
import AwsService from '../Pages/AwsService';
import ErrorPage from '../Pages/Unautharized';
import Home from '../Pages/Home';

// Layout & Route Guard
import UserMgmtLayout from '../Layout/UserMgmtLayout';
import CreateUser from '../Pages/CreateUser';
import PrivateRoute from '../Auth/PrivateRoute';
import ProtectedRoute from '../Auth/protectedRoute';

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<UserMgmtLayout />}>
            <Route path="users" element={<UserMgmt />} />
            <Route path='users/add-user' element={<CreateUser />} />
            <Route path="onboarding" element={<Onboarding />} />
            <Route path="cost-explorer" element={<CostExplorer />} />
            <Route path="aws-services" element={<AwsService />} />
          </Route>
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default AppRoutes;

