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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-4xl">
        
        {/* Left Side Info Section */}
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-green-600 to-emerald-700 text-white p-8 md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">Welcome to Our Platform</h2>
          <p className="text-sm mb-6">
            Create an account to unlock full access to features like personalized dashboards, 
            progress tracking, and secure data storage.
          </p>
          <ul className="space-y-2 text-sm">
            <li>✅ Easy & secure registration</li>
            <li>✅ Access your data anywhere</li>
            <li>✅ Stay connected with updates</li>
          </ul>
        </div>

        {/* Right Side Form Section */}
        <div className="p-8 md:w-1/2 w-full">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Create an Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-300"
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-xs text-gray-500 text-center">
            By registering, you agree to our Terms & Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
