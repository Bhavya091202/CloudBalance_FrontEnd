import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import cloudLogo from "./../../Assets/logo.png";
import Form from "../../Components/FormWrapper";
import authConfig from "./authConfig";
import { postApi } from "../../Services/commonService";
import ImageWrapper from "../../Components/ImageWrapper";
import { URLS } from "../../Services/url";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/action";
import useFormHandler from "../../hooks/handleChangeHook";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, handleChange] = useFormHandler({
    email: "",
    password: "",
  });

  const loginSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const authData = await postApi(URLS?.Login, loginData);
      toast.success("Login successful");

      localStorage.setItem("token", authData?.accessToken);

      dispatch(
        setUserData({
          firstName: authData?.firstName,
          lastName: authData?.lastName,
          role: authData?.role,
        })
      );

      const role = authData?.role;

      if (role === "ROLE_ADMIN" || role === "ROLE_READ_ONLY") {
        navigate("/dashboard/users");
      } else if (role === "ROLE_CUSTOMER") {
        navigate("/dashboard/cost-explorer");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-white px-4">
      <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md">
        {/* Logo */}
        <ImageWrapper
          logo={cloudLogo}
          logoName={"CloudBalance Logo"}
          imgClass={"h-56 w-auto object-contain drop-shadow-md"}
          imgContainerClass={"flex justify-center mb-0"}
        />

        {/* Form Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to CloudBalance
        </h2>

        {/* Form */}
        <Form
          onSubmit={loginSubmit}
          handleChange={handleChange}
          formConfig={authConfig}
          values={loginData}
        />
      </div>
    </div>
  );
};

export default Login;
