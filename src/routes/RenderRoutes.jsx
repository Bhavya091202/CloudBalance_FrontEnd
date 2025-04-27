// src/routes/RenderRoutes.js
import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../Auth/protectedRoute";

const RenderRoutes = (routes) => (
  <>
    {routes.map(({ path, element, allowedRoles }, index) => (
      <Route
        key={index}
        path={path}
        element={
          <ProtectedRoute allowedRoles={allowedRoles}>{element}</ProtectedRoute>
        }
      />
    ))}
  </>
);

export default RenderRoutes;
