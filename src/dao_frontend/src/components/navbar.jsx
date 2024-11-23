import React, { useState } from "react";
import logo from "/Dao.png";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext"; // Ensure you have this context implemented
import ButtonLogin from "./ButtonLogin";
import { useConnect } from "@connect2ic/react";

const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    if (openDropdown === dropdown) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(dropdown);
    }
  };

  const gradientClass = darkMode
    ? "bg-gradient-to-r from-gray-950 to-gray-950"
    : "bg-gradient-to-b from-orange-200 to-orange-500";

  return (
    <nav
      className={`relative px-4 sm:px-6 md:px-8 ${gradientClass} lg:py-0 py-2 sm:py-3 md:py-4`}
    >
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        {/* Logo */}
        <Link to={"/"} className="flex items-center">
          <img src={logo} className="mr-3 h-6 sm:h-9" alt="ICP PROTECTOR logo" />
          <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">
            ICP PROTECTOR
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700"
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
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Desktop Menu */}
        <div
          className={`${isMobileMenuOpen ? "" : "hidden"
            } w-full md:block md:w-auto`}
          id="navbar-dropdown"
        >
          <ul className="flex flex-col p-4 mt-4 gap-1 items-center rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:border-gray-700">
            {/* Welcome Dropdown */}
            <li className="relative">
              <button
                className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                onClick={() => toggleDropdown("welcome")}
              >
                Welcome
                <svg
                  className="w-2.5 h-2.5 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              <div
                className={`${openDropdown === "welcome" ? "block" : "hidden"
                  } absolute z-20 bg-white dark:bg-gray-800 rounded-lg shadow w-44 px-3 py-2 mt-1 transition-all duration-300`}
                style={{ top: "100%", left: 0 }}
              >
                <ul className="text-sm text-gray-800 dark:text-gray-300 divide-y divide-gray-200 dark:divide-gray-600">
                  <li>
                    <Link
                      to={"/all-about-icp"}
                      className="block px-4 py-2 hover:underline hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      All About ICP
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/whitepaper"}
                      className="block px-4 py-2 hover:underline hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      White Paper
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/point-system"}
                      className="block px-4 py-2 hover:underline hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Point System
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/roadmap"}
                      className="block px-4 py-2 hover:underline hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Roadmap
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/scam-list"}
                      className="block px-4 py-2 hover:underline hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Scam List
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

            {/* Proposals Dropdown */}
            <li className="relative">
              <button
                className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                onClick={() => toggleDropdown("proposals")}
              >
                Proposals
                <svg
                  className="w-2.5 h-2.5 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              <div
                className={`${openDropdown === "proposals" ? "block" : "hidden"
                  } absolute z-20 bg-white dark:bg-gray-800 rounded-lg px-1 py-2 mt-1 shadow w-44 transition-all duration-300`}
                style={{ top: "100%", left: 0 }}
              >
                <ul className="text-sm text-gray-800 dark:text-gray-300 divide-y divide-gray-200 dark:divide-gray-600">
                  <li>
                    <Link
                      to={"/create-proposal"}
                      className="block px-4 py-2 hover:underline hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Create New Proposal
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/proposals"}
                      className="block px-4 py-2 hover:underline hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Vote on Proposal
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/claim-reward"}
                      className="block px-4 py-2 hover:underline hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Claim Your Reward
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

            {/* Dark Mode Toggle */}
            <li>
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {darkMode ? (
                  <svg
                    className="w-5 h-5 text-gray-900 dark:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 3v1m0 16v1m8.485-8.485h1M3.515 12h1m15.364-6.364l-.707.707M5.636 18.364l-.707.707M18.364 18.364l-.707-.707M5.636 5.636l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
                    />
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


            {/* Login Button */}
            <li>
              <ButtonLogin />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
