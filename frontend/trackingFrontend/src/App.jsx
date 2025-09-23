import { useState } from 'react'

import './App.css'

function App() {

  return (
    <>
      <nav className="bg-gray-300 w-full">
        <div className="w-full flex justify-between items-center px-7 py-4">

          {/* Logo */}
          <div>
            <img src="/cash.svg" alt="Cash Icon" width="50" fill="green"/>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center justify-center">
            <ul className="flex font-semibold space-x-4">
              <li className="md:px-4 md:py-2 text-indigo-500">
                <a href="#">Dashboard</a>
              </li>
              <li className="md:px-4 md:py-2 hover:text-indigo-400">
                <a href="#">Search</a>
              </li>
              <li className="md:px-4 md:py-2 hover:text-indigo-400">
                <a href="#">Explore</a>
              </li>
              <li className="md:px-4 md:py-2 hover:text-indigo-400">
                <a href="#">About</a>
              </li>
              <li className="md:px-4 md:py-2 hover:text-indigo-400">
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>

          {/* Login Button */}
          <div>
            <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Login</span>
            </button>
          </div>

        </div>
      </nav>

      <div>
        <div></div>
      </div>

    </>
  )
}

export default App
