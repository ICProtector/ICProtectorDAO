import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import Details from '../components/details';
import { useTheme } from '../contexts/ThemeContext'; 
const Detailpage =()=>{
  const { id } = useParams();
  const { darkMode, toggleTheme } = useTheme();
  const gradientClass = darkMode ? 'bg-gradient-to-r from-gray-950 to-gray-950' : 'bg-gradient-to-b from-orange-200 to-orange-500';
 
return(
    <>    
        <Navbar />
      <div className={`${gradientClass} dark:bg-gray-800 p-4`} style={{ minHeight:'100vh'}}>
        <Details id={id}/>
      </div>
        </>
);
}
export default Detailpage;
