import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '/logoo.png';
import icp from '/icp.png';
import { useTheme } from '../contexts/ThemeContext';
import WhitePaperPage from '../pages/whitePaperPage';

const WhitePaperContent = () => {
    
  const { darkMode, toggleTheme } = useTheme();

    const myStyle = {
        translate: 'none',
        rotate: 'none',
        scale: 'none',
        opacity: 1,
        transform: 'translate(0px, 0px)'
    };
    const gradientClass = darkMode ? 'bg-gradient-to-r from-gray-950 to-gray-950' : 'bg-gradient-to-b from-orange-200 to-orange-500';
    const buttonClass = darkMode ? 'bg-gradient-to-r from-red-600 to-red-900' : 'bg-gradient-to-r from-red-400 to-red-600';


    return (
        <>
            <div className="">
                <div className="relative isolate px-6  lg:px-8">
                <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                            <div className="relative rounded-full px-3 py-1 text-sm leading-6 dark:text-gray-300  text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                               <a href="#" className="font-semibold text-indigo-600"></a>
                            </div>
                        </div>
                    <div className="mx-auto max-w-2xl py-20 sm:py-20 lg:py-26">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight dark:text-white text-gray-900 sm:text-6xl">Tokenomics & Whitepaper</h1>
                            <p className="mt-6 text-2xl leading-8 dark:text-gray-300 text-gray-900">Will be revealed soon, stay tuned. This is a rough copy and is a work in progress. It is subject to change as we get input from the ICP Community</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default WhitePaperContent;
