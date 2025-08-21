import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [active, setActive] = useState("");

  return (
    <>
      <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 text-gray-800 p-4 flex flex-col sm:flex-row justify-between items-center shadow-md">
        {/* Logo / Title */}
        <div className="text-xl font-bold text-indigo-600 mb-2 sm:mb-0">
          Task Manager
        </div>

        {/* Navigation Links */}
        <div className="space-x-4 flex">
          <Link
            onClick={() => setActive("home")}
            to="/"
            className={`px-3 py-1 rounded-lg transition ${
              active === "home"
                ? "bg-indigo-400 text-white shadow"
                : "hover:bg-indigo-200 hover:text-indigo-800"
            }`}
          >
            Home
          </Link>
          <Link
            onClick={() => setActive("login")}
            to="/login-page"
            className={`px-3 py-1 rounded-lg transition ${
              active === "login"
                ? "bg-pink-400 text-white shadow"
                : "hover:bg-pink-200 hover:text-pink-800"
            }`}
          >
            Login
          </Link>
          <Link
            onClick={() => setActive("register")}
            to="/register"
            className={`px-3 py-1 rounded-lg transition ${
              active === "register"
                ? "bg-purple-400 text-white shadow"
                : "hover:bg-purple-200 hover:text-purple-800"
            }`}
          >
            Register
          </Link>
          <Link
            onClick={() => setActive("dashboard")}
            to="/dashboard"
            className={`px-3 py-1 rounded-lg transition ${
              active === "dashboard"
                ? "bg-green-400 text-white shadow"
                : "hover:bg-green-200 hover:text-green-800"
            }`}
          >
            Dashboard
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
