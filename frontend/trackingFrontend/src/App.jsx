import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Box from '@mui/material/Box';
import { BarChart } from '@mui/x-charts/BarChart';
import { dataset, valueFormatter, desktopOS, valueFormatter1 } from './datasets/graphData';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { useState } from 'react';

import './App.css'

const chartSetting = {
  xAxis: [{ label: 'rainfall (mm)' }],
  height: 400,
  margin: { left: 0 },
};

const size = {
  width: 200,
  height: 200,
};

const data = {
  data: desktopOS,
  valueFormatter1,
};

const SketchyArrowIcon = ({
  color = "#2c3e50", // Default color
  size = 64,         // Default size in pixels
  strokeWidth = 2,   // Thickness of the arrow line
  rotation = 0,      // Rotation in degrees
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100" // A 100x100 canvas for the SVG
      style={{ transform: `rotate(${rotation}deg)` }}
      aria-hidden="true" // Hide from screen readers as it's decorative
    >
      <g fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {/*
    This path creates a mostly straight arrow with a small curve in the middle.
    The "d" attribute contains SVG path commands:
    - M 25 75: Move to the starting point.
    - L 40 75: Draw a straight line towards the middle.
    - C 45 65, 55 65, 60 75: Draw a cubic bezier curve for the small bump.
      - (45, 65) and (55, 65) are control points that pull the line up slightly.
    - L 75 75: Draw the final straight line to the end point.
  */}
        <path d="M 25 75 L 40 75 C 45 65, 55 65, 60 75 L 75 75" />
        {/* This path creates the arrowhead, which remains unchanged */}
        <path d="M 65 65 L 75 75 L 65 85" />
      </g>
    </svg>
  );
};

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* Navbar */}
      <nav className="bg-gray-300 w-full mb-4 shadow">
        <div className="w-full flex justify-between items-center px-7 py-4">
          {/* Logo */}
          <div>
            <img src="/cash.svg" alt="Cash Icon" width="50" style={{ fill: "green" }} />
          </div>

          {/* Navigation Links */}
          <ul className="flex font-semibold space-x-6">
            {["Dashboard", "Search", "Explore", "About", "Contact"].map((item) => (
              <li key={item}>
                <a href="#" className="navbar-link" data-text={item}>
                  {item}
                </a>
              </li>
            ))}
          </ul>

          {/* Login Button */}
          <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Login</span>
          </button>
        </div>
      </nav>

      {/* Main Layout */}
      <div className="w-full flex justify-center items-start gap-5 px-5">

        {/* Left Section */}
        <div className="flex flex-col gap-3 w-3/5 mr-3">
          {/* Add Input */}
          <div className="flex flex-col gap-3 w-full p-4 border-2 border-gray-300 rounded-2xl shadow-lg bg-gradient-to-br from-white via-gray-50 to-gray-100 hover:shadow-2xl transition-all duration-300 ease-in-out">
            {/* Item Name */}
            <input
              className="border-b border-gray-400 focus:outline-none px-2 py-1 w-full"
              type="text"
              placeholder="Enter item name"
            />

            {/* Item Description */}
            <input
              className="border-b border-gray-400 focus:outline-none px-2 py-1 w-full"
              type="text"
              placeholder="Enter item description"
            />

            {/* Category */}
            <select
              className="border-b border-gray-400 focus:outline-none px-2 py-1 w-full bg-transparent"
              defaultValue=""
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="fruits">Fruits</option>
              <option value="vegetables">Vegetables</option>
              <option value="dairy">Dairy</option>
              <option value="snacks">Snacks</option>
              <option value="beverages">Beverages</option>
            </select>

            {/* Amount + Add button */}
            <div className="flex items-center gap-2">
              <input
                className="border-b border-gray-400 focus:outline-none px-2 py-1 w-full"
                type="number"
                placeholder="Enter amount"
              />
              <button className="bg-green-400 text-white rounded px-4 py-2">
                Add
              </button>
            </div>
          </div>


          {/* Bar Chart */}
          <div className="w-full border-2 border-gray-300 rounded-2xl h-[500px] shadow-lg bg-gradient-to-br from-white via-gray-50 to-gray-100 hover:shadow-2xl transition-all duration-300 ease-in-out p-6">
            <BarChart
              dataset={dataset}
              yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
              series={[{ dataKey: 'seoul', label: 'Expenses', valueFormatter }]}
              layout="horizontal"
              grid={{ vertical: true }}
              {...chartSetting}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col w-2/5 flex-shrink">
          {/* Pie Chart + Calendar */}
          <div className="flex justify-between items-start w-full gap-4 flex-wrap mt-6">

            {/* Pie Chart */}
            <div className="flex flex-col items-center flex-shrink min-w-[200px]">
              <h1 className="font-semibold mb-2">Categories</h1>
              <div className="border-2 border-gray-300 py-4 px-2 rounded-2xl">
                <PieChart
                  series={[
                    {
                      arcLabel: (item) => `${item.value}%`,
                      arcLabelMinAngle: 35,
                      arcLabelRadius: '60%',
                      ...data,
                    },
                  ]}
                  sx={{
                    [`& .${pieArcLabelClasses.root}`]: { fontWeight: 'bold' },
                  }}
                  {...size}
                />
              </div>
            </div>

            {/* Calendar */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box sx={{ width: "100%", maxWidth: 280, height: "auto" }}>
                <DateCalendar
                  sx={{
                    transform: 'scale(1)',
                    width: '100%',
                  }}
                />
              </Box>
            </LocalizationProvider>
          </div>

          <div className="border-2 border-gray-300 rounded-2xl h-96 w-full flex items-center justify-center mb-5">
            <div
              className="w-full mx-2 my-3 flex flex-col justify-between items-center cursor-pointer select-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {/* Header */}
              <div className="w-full flex justify-between items-center px-4 rounded-2xl border">
                <span className="text-2xl">6 bananas</span>
                <span className="text-3xl">₹50</span>
              </div>

              {/* Dropdown with fade+slide animation */}
              <div
                className={`px-3 py-2 border w-[96%] rounded-md bg-white shadow-md 
      transition-all duration-200 ease-in-out
      ${isOpen ? "opacity-100 translate-y-0 mt-2" : "opacity-0 -translate-y-1 pointer-events-none"}
    `}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lore
              </div>
            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default App
