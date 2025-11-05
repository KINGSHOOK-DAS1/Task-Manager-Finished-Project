import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { FaGoogle } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, googleSignIn } = useAuth();

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert("Logged in successfully");
    } catch (error) {
      console.error("Error occurred", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
      alert("Logged in with Google");
    } catch (error) {
      console.error("Google Login error", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 px-4">
      <div className="max-w-6xl w-full flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Left Side - Info Section */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex-col justify-center items-start p-10">
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">
            Welcome Back 🙏🏻
          </h2>
          <p className="text-gray-700 mb-6">
            Log in to your Task-Verse and stay on top of your goals. Manage
            tasks efficiently, track progress, and never miss a deadline.
          </p>
          <ul className="space-y-3 text-gray-600">
            <li>✔ Organize tasks by priority</li>
            <li>✔ Get reminders before deadlines</li>
            <li>✔ Collaborate with your team</li>
            <li>✔ Analyze productivity with reports</li>
          </ul>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Login to Your Account
          </h2>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-red-400 hover:bg-red-500 text-white font-semibold rounded-lg shadow transition duration-300"
            >
              <FaGoogle /> Sign in with Google
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-400 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow transition duration-300"
            >
              Login
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
