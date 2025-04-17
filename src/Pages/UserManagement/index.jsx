import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import TableWrapper from "../../Components/TableWrapper";
import { userTableColumns } from "./userTableColumns";
import { URLS } from "../../Services/url";
import { getApi } from "../../Services/commonService";
import { Users } from "../../routes/routeConfig";

const UserMgmt = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const role = useSelector((state) => state?.user?.role);
  const isAdmin = role === "ROLE_ADMIN";

  useEffect(() => {
    (async () => {
      try {
        const data = await getApi(URLS.User);
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error.message);
      }
    })();
  }, []);

  const handleAddUser = () => navigate(Users.createUser);
  const handleEditUser = (user) => navigate(`${Users.editUser}/${user.id}`);

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Users
      </Typography>

      <div className="bg-white shadow-md rounded-lg p-6">
        {isAdmin && (
          <div className="flex justify-end mb-4">
            <button
              onClick={handleAddUser}
              className="bg-[#0073E6] text-white font-semibold px-4 py-2 rounded shadow hover:bg-[#005bb5] transition"
            >
              + Add New User
            </button>
          </div>
        )}

        <TableWrapper columns={userTableColumns(handleEditUser)} rows={users} />
      </div>
    </Box>
  );
};

export default UserMgmt;
