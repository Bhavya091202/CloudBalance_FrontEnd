import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ code = "404", message = "Page Not Found" }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="text-center">
        <h1 className="text-7xl font-extrabold text-blue-600 mb-4">{code}</h1>
        <p className="text-2xl font-semibold text-gray-800 mb-2">{message}</p>
        <p className="text-gray-500 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
