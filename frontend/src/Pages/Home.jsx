import React from 'react'

function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen px-6 bg-gray-50">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Left Section - Introduction */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-blue-800 leading-tight">
            Welcome to Task-Verse
          </h1>
          <p className="text-lg text-gray-700">
            Task-Verse is your all-in-one solution for organizing, tracking, 
            and completing your daily tasks efficiently. Our goal is to help 
            you stay productive, meet deadlines, and reduce stress by keeping 
            everything in one place.
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>✅ Organize tasks with categories & priorities</li>
            <li>✅ Track progress and set deadlines easily</li>
            <li>✅ Collaborate with team members effectively</li>
            <li>✅ Access anywhere, anytime on any device</li>
          </ul>
          <p className="text-gray-700">
            Whether you're a student, professional, or business team, 
            Task-Manager adapts to your workflow and makes managing tasks 
            seamless and professional.
          </p>
        </div>

        {/* Right Section - Info Cards */}
        <div className="grid gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-700">Why Choose Us?</h3>
            <p className="text-gray-600 mt-2">
              With an intuitive interface and smart features, Task-Manager 
              ensures that you never miss an important task or deadline.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-700">Boost Productivity</h3>
            <p className="text-gray-600 mt-2">
              Stay focused by breaking big goals into manageable steps and 
              tracking progress in real-time.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-700">Secure & Reliable</h3>
            <p className="text-gray-600 mt-2">
              Your data is protected with the highest security standards, 
              ensuring privacy and reliability at all times.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Home
