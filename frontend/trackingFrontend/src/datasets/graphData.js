// src/dataset/weather.js

export const dataset = [
    { month: 'Jan', seoul: 49 },
    { month: 'Feb', seoul: 71 },
    { month: 'Mar', seoul: 99 },
    { month: 'Apr', seoul: 131 },
    { month: 'May', seoul: 172 },
    { month: 'Jun', seoul: 201 },
    { month: 'Jul', seoul: 220 },
    { month: 'Aug', seoul: 199 },
    { month: 'Sep', seoul: 158 },
    { month: 'Oct', seoul: 118 },
    { month: 'Nov', seoul: 78 },
    { month: 'Dec', seoul: 57 },
];

// optional: format values for display on bars/tooltip
export const valueFormatter = (value) => `${value} mm`;


export const desktopOS = [
    { id: 0, value: 68.6, label: 'Windows' },
    { id: 1, value: 21.4, label: 'macOS' },
    { id: 2, value: 4.1, label: 'Linux' },
    { id: 3, value: 3.2, label: 'ChromeOS' },
    { id: 4, value: 2.7, label: 'Other' },
];

// This function formats the number for display, typically in tooltips.
// It takes a number as input and returns a formatted string.
export const valueFormatter1 = (value) => `${value}%`;