import React from "react";
import ImageWrapper from "../ImageWrapper";
import cloudLogo from "./../../Assets/logo.png";
import { useNavigate } from "react-router-dom";
import { postApi } from "../../Services/commonService";
import { URLS } from "../../Services/url";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData } from "../../redux/action";

const Navbar = () => {
  const dispatch = useDispatch();
  
  const navigate = useNavigate();
  
  const { firstName, lastName, role } = useSelector((state) => state.user);
  
  const handleLogout = async () => {
    await postApi(URLS.Logout);
    localStorage.removeItem("token");
    navigate("/login");
    dispatch(clearUserData());
  };

  const handleLogoClick = () => {
    if (role === "ROLE_CUSTOMER") {
      navigate("/dashboard/cost-explorer");
    } else {
      navigate("/dashboard/users");
    }
  };

  return (
    <nav className="w-full bg-white border-b shadow-sm px-6 py-3 flex justify-between items-center">
      <div onClick={handleLogoClick} className="cursor-pointer">
        <ImageWrapper
          logo={cloudLogo}
          logoName="Cloudkeeper Logo"
          imgClass="h-16 w-auto"
        />
      </div>


      {/* Right: User info and Logout */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {/* <div className="bg-blue-100 text-blue-800 rounded-full h-8 w-8 flex items-center justify-center text-sm font-bold">
            H
          </div> */}
          <div className="text-sm font-medium text-gray-800">
            welcome!
            <div>
              {firstName} {lastName}
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="text-sm bg-white text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
