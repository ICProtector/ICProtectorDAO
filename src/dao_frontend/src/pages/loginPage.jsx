import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import '../App.css' 
import Login from '../components/login';
import { useTheme } from '../contexts/ThemeContext';

function LoginPage() {
  
  const { darkMode, toggleTheme } = useTheme();
  const gradientClass = darkMode ? 'bg-gradient-to-r from-gray-950 to-gray-950' : 'bg-gradient-to-b from-orange-200 to-orange-500';
 

  return (
    <>
      <div className={`${gradientClass} dark:bg-gray-800`} style={{ minHeight:'100vh'}}>
        <Login/>
      </div>
    </>
  )
}

export default LoginPage
