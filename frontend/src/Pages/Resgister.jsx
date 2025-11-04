import React, { useState } from 'react'
import { useAuth } from '../Context/AuthContext'

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
      alert("Account created successfully!");
    } catch (error) {
      console.error("Error occurred", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-xl overflow-hidden w-full max-w-4xl">
        
        {/* Left Side Info Section */}
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-green-700 to-emerald-800 text-white p-8 md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Welcome to Our Platform</h2>
          <p className="text-sm mb-6 leading-relaxed">
            Follow the guidelines below to register your account successfully.
          </p>

          <div className="bg-white/10 rounded-md p-4 border border-white/20">
            <h3 className="text-base font-semibold mb-2 text-white">Registration Instructions</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li><span className="font-semibold">Email:</span> Must be in valid format (e.g., <em>user@example.com</em>).</li>
              <li><span className="font-semibold">Password:</span> Minimum <strong>8 characters</strong>, including at least one uppercase letter, one number, and one special symbol.</li>
            </ul>
          </div>
        </div>

        {/* Right Side Form Section */}
        <div className="p-6 md:p-8 md:w-1/2 w-full">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Create an Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="e.g. johndoe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-300"
            >
              Register
            </button>
          </form>

          <p className="mt-4 text-xs text-gray-500 text-center">
            By registering, you agree to our{" "}
            <a href="#" className="text-green-600 hover:underline">Terms</a> &{" "}
            <a href="#" className="text-green-600 hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
