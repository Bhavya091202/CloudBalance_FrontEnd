import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dashoardNavigationHandler } from "../../Utils/dashoardNavigationHandler";

const Dashboard = () => {
  const role = useSelector((state) => state.user.role);
  const navigate = useNavigate();

  useEffect(() => {
    navigate(dashoardNavigationHandler(role));
}, [role, navigate]);

  return null;
};

export default Dashboard;
