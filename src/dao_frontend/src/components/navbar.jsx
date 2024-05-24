import React, { useState, useEffect } from "react";
import logo from "/logoo.png";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext"; // Ensure you have this logo in your public folder or src folder.
import {
  ConnectButton,
  ConnectDialog,
  Connect2ICProvider,
  useConnect,
} from "@connect2ic/react";

const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDropdownWelOpen, setDropdownWeOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const toggleDropdown = (dropdown) => {
    if (openDropdown === dropdown) {
      setOpenDropdown(null); // Close the currently open dropdown
    } else {
      setOpenDropdown(dropdown); // Open the new dropdown and close others
    }
  };
  const buttonClass = darkMode
    ? "bg-gradient-to-r from-red-600 to-red-900"
    : "bg-gradient-to-r from-red-400 to-red-600";
  const gradientClass = darkMode
    ? "bg-gradient-to-r from-gray-950 to-gray-950"
    : "bg-gradient-to-b from-orange-200 to-orange-500";
  const { isConnected, principal, activeProvider } = useConnect({
    onConnect: () => {
      // Signed in
    },
    onDisconnect: () => {
      // Signed out
    },
  });

  return (
    <nav className={`relative  px-2 sm:px-4 ${gradientClass} py-1`}>
      <div className="container flex flex-wrap justify-between items-center mx-auto">
      <Link to={'/'} className="flex">
          <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
          <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">
            ICP PROTECTOR
          </span>
          </Link>
        <div className="flex items-center">
          <button
            data-collapse-toggle="navbar-dropdown"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-dropdown"
            aria-expanded="false"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`${
            isMobileMenuOpen ? "" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-dropdown"
        >
          <ul
            className={`flex flex-col p-4 mt-4 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0  dark:border-gray-700 `}
          >
           <li className="relative" style={{ margin: 'auto' }}>
            
            <button
              id="dropdownNavbarLink"
              data-dropdown-toggle="dropdownNavbar"
              className="flex items-center py-2 px-4 md:mx-auto rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-gray-200 md:dark:hover:text-blue-500"
              onClick={() => toggleDropdown('welcome')}>
              Welcome
              <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecapp="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>
            
            <div
              id="dropdownNavbar"
              className={`${openDropdown === 'welcome' ? 'block' : 'hidden'} absolute z-20 font-normal bg-gray-800 divide-y divide-gray-600 rounded shadow w-44 dark:bg-gray-700`}
              style={{ top: '100%', left: 0 }}
            >
              <ul className="text-sm text-gray-400" aria-labelledby="dropdownNavbarLink">
                <li>
                <Link to={'/all-about-icp'} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">All About ICP</Link>
                </li>
                <li>
                <Link to={'/whitepaper'} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">White paper</Link>
                </li>
                <li>
                <Link to={'/point-system'} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Point System</Link>
                </li>
                <li>
                <Link to={'/roadmap'} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">RoadMap</Link>
                </li>
              </ul>
            </div>
          </li>
          
            <li className="relative" style={{ margin: "auto" }}>
              <button
                id="dropdownNavbarLink"
                data-dropdown-toggle="dropdownNavbar"
                className="flex items-center py-2 px-4 md:mx-auto rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-gray-200 md:dark:hover:text-blue-500"
                onClick={() =>toggleDropdown('proposals')}
              >
                Proposals
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                id="dropdownNavbar"
                className={`${openDropdown === 'proposals' ? 'block' : 'hidden'} absolute z-20 font-normal bg-gray-800 divide-y divide-gray-600 rounded shadow w-44 dark:bg-gray-700`}
                style={{ top: "100%", left: 0 }}
              >
                <ul
                  className="text-sm text-gray-400"
                  aria-labelledby="dropdownNavbarLink"
                >
                  <li>
                    <Link
                      to={"/create-proposal"}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Create new Proposal
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/open-proposals"}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Vote on open Proposal
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/proposals"}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      See previous proposals
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={"/claim-reward"}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Claim your reward
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
             <li>
              <Link style={{ margin: "auto" }} to={'/login'}  className="block py-2 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-600 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-gray-200 md:dark:hover:text-blue-500">
                Login
              </Link>
            </li>
           {/* <li>
              <a href="#" className="block py-2 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-600 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-gray-200 md:dark:hover:text-blue-500">
                Service
              </a>
            </li> */}
            <li style={{ margin: "auto" }}>
              <button
                onClick={toggleTheme}
                className={`block py-2 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-600 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-gray-200 md:dark:hover:text-blue-500`}
              >
                {darkMode ? (
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-11a1 1 0 0 0 1-1V1a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1Zm0 12a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1ZM4.343 5.757a1 1 0 0 0 1.414-1.414L4.343 2.929a1 1 0 0 0-1.414 1.414l1.414 1.414Zm11.314 8.486a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM4 10a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1Zm15-1h-2a1 1 0 1 0 0 2h2a1 1 0 0 0 0-2ZM4.343 14.243l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414a1 1 0 0 0-1.414-1.414ZM14.95 6.05a1 1 0 0 0 .707-.293l1.414-1.414a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 .707 1.707Z"></path>
                  </svg>
                ) : (
                  <svg
                    id="theme-toggle-dark-icon"
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 20"
                  >
                    <path d="M17.8 13.75a1 1 0 0 0-.859-.5A7.488 7.488 0 0 1 10.52 2a1 1 0 0 0 0-.969A1.035 1.035 0 0 0 9.687.5h-.113a9.5 9.5 0 1 0 8.222 14.247 1 1 0 0 0 .004-.997Z"></path>
                  </svg>
                )}
              </button>
            </li>
            <li style={{ margin: "auto" }}>
              <ConnectButton />
              <ConnectDialog dark={false} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
