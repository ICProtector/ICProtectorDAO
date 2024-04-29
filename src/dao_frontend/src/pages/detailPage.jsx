import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Details from '../components/details';
const Detailpage =()=>{
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Function to update dark mode state
    const updateDarkMode = () => {
      const root = window.document.documentElement;
      const hasDarkClass = root.classList.contains('dark');
      setDarkMode(hasDarkClass);
    };

    // Initial update
    updateDarkMode();

    // Update dark mode state every 5 seconds
    const intervalId = setInterval(updateDarkMode, 100);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  
  const gradientClass = darkMode ? 'bg-gradient-to-r from-gray-950 to-gray-950' : 'bg-gradient-to-b from-orange-200 to-orange-500';
 
return(
    <>    
        <Navbar />
      <div className={`${gradientClass} dark:bg-gray-800 p-4`} style={{ minHeight:'100vh'}}>
        <Details/>
      </div>
        </>
);
}
export default Detailpage;
