import React, { useState, useEffect } from 'react';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);
    const buttonClass = darkMode ? 'bg-gradient-to-r from-red-600 to-red-900' : 'bg-gradient-to-r from-red-400 to-red-600';
  return (
    <button id ="darkmode" className={`border-2 border-white  flex items-center dark:text-white`} onClick={() => setDarkMode(!darkMode)}>
      
    </button>
  );
};

export default DarkModeToggle;
