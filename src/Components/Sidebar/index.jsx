import React from "react";
import { NavLink } from "react-router-dom";
import { sidebarConfig } from "./sidebarConfig";

const Sidebar = ({ userRole }) => {
  return (
    <div className="w-64 bg-white shadow-lg h-screen px-6 py-8">
      <ul className="space-y-2">
        {sidebarConfig
          .filter((item) => item.allowedRoles.includes(userRole))
          .map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-100"
                  }`
                }
              >
                {item?.img}
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;
