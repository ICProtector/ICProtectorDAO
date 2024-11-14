import React from 'react';
import logo from '/Dao.png';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext'; 

const Footer = () => {
    const { darkMode, toggleTheme } = useTheme();
    const gradientClass = darkMode ? 'bg-gradient-to-r from-gray-950 to-gray-950' : 'bg-gradient-to-b from-orange-200 to-orange-500';
  return (<> 
  <hr /> 
  <footer className={`bg-white dark:bg-gray-950`}>
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <img src={logo} className="h-20 me-3" alt="ICP PROTECTOR DAO Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ICP PROTECTOR DAO</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Welcome</h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-2">
                  <Link to={'/all-about-icp'} className="hover:underline">All About ICP</Link>
                </li>
                <li className="mb-2">
                  <Link to={'/whitepaper'} className="hover:underline">White paper</Link>
                </li>
                <li className="mb-2">
                  <Link to={'/point-system'} className="hover:underline">Point System</Link>
                </li>
                <li className="mb-2">
                  <Link to={'/roadmap'} className="hover:underline">RoadMap</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Proposals</h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-2">
                  <Link to={'/create-proposal'} className="hover:underline">Create new Proposal</Link>
                </li>
                <li className="mb-2">
                  <Link to={'/open-proposals'} className="hover:underline">Vote on open Proposal</Link>
                </li>
                <li className="mb-2">
                  <Link to={'/proposals'}  className="hover:underline">See previous proposals</Link>
                </li>
                
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="flex items-center justify-center">
          <span className="text-sm text-gray-500 text-center dark:text-gray-400">© 2024 ICP PROTECTOR DAO. All Rights Reserved.</span>
         
        </div>
      </div>
    </footer></>
  );
};

export default Footer;
