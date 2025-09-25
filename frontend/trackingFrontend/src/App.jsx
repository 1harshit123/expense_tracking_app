import { useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Box from '@mui/material/Box';

import './App.css'

function App() {

  return (
    <>
      <nav className="bg-gray-300 w-full mb-4">
        <div className="w-full flex justify-between items-center px-7 py-4">

          {/* Logo */}
          <div>
            <img src="/cash.svg" alt="Cash Icon" width="50" style={{ fill: "green" }} />
          </div>

          {/* Navigation Links */}
          <div className="flex items-center justify-center">
            <ul className="flex font-semibold space-x-4">
              {["Dashboard", "Search", "Explore", "About", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="navbar-link" data-text={item}>
                    {item}
                  </a>
                </li>
              ))}
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



      <div className='w-full flex jutify-center gap-3'>
          <div className='flex flex-col gap-4 justify-cetner w-4/7'>
          <div className='flex justify-left items-center ml-6'>
            <div className='flex justify-center items-center gap-1 '>
              <button className='bg-green-400 text-white rounded items-center px-3 py-1 '>Add</button>
              <input className="border-b-1 focus:outline-none" type="text" placeholder='Enter amount here'/>
            </div>
          </div>
          <div className="border-2 border-gray-300 rounded-2xl h-screen m-3 shadow-lg bg-gradient-to-br from-white via-gray-50 to-gray-100 hover:shadow-2xl hover:scale-[1.00001] transition-all duration-300 ease-in-out p-6"> 
              fgd
            </div>
          </div>
        <div>  
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
             <Box sx={{ width: 350, height: 350 }}>
                <DateCalendar
                  sx={{
                    // Apply the transform to scale the calendar up by 20%
                    transform: 'scale(1.3)',
                    // Set the origin point for the scaling
                    transformOrigin: 'top left',}}
                />
              </Box>
            </LocalizationProvider>
          </div>
          <div></div>
        </div>
      </div>

    </>
  )
}

export default App
