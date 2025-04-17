import React from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Footer from "../../Components/Footer";

const UserMgmtLayout = () => {
  const role = useSelector((state) => state.user.role);

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <header>
        <Navbar />
      </header>

      {/* Main body: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar userRole={role} />

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default UserMgmtLayout;
