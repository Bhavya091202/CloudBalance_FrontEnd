import React from "react";
import { NavLink } from "react-router-dom";
import { sidebarConfig } from "./sidebarConfig";

const Sidebar = ({ userRole }) => {
  // debugger;
  // TODO: make sidebar collapsable
  // TODO: make sidebar extendable and add users and users
  return (
    <div className="w-64 bg-white shadow-lg h-screen px-6 py-8">
      {/* <h2 className="text-xl font-bold mb-6 text-blue-600">CloudBalance</h2> */}
      <ul className="space-y-4">
        {sidebarConfig
          ?.filter((item) => item.allowedRoles.includes(userRole))
          ?.map((item) => (
            <li key={item.path}>
              <NavLink
                to={`${item.path}`}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-100"
                  }`
                }
              >
                {item?.name}
              </NavLink>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;
