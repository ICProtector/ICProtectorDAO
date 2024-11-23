import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { FileText } from 'lucide-react'; // Using Lucide icons for professional icons

const WhitePaperContent = () => {
  const { darkMode } = useTheme();

  return (
    <div className="relative bg-white dark:bg-gray-900 min-h-screen flex flex-col justify-between">
      {/* Icon Section */}
      <div className="flex justify-center pt-16">
        <div className="p-8 bg-gradient-to-r from-orange-300 to-orange-500 dark:from-gray-700 dark:to-gray-800 rounded-full shadow-xl">
          <FileText className="w-20 h-20 text-white" />
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-3xl mx-auto text-center px-6">
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white">
          Tokenomics & Whitepaper
        </h1>
        <p className="mt-6 text-lg sm:text-2xl leading-relaxed text-gray-700 dark:text-gray-300">
          Coming Soon! Stay tuned for the official release. This is a draft copy and will evolve
          based on community feedback.
        </p>
        <div className="mt-12">
          <span
            className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full text-xl font-semibold shadow-lg hover:scale-105 transition transform dark:from-red-600 dark:to-orange-600"
          >
            Coming Soon
          </span>
        </div>
      </div>

      {/* Decorative Divider */}
      <div className="relative">
        <svg
          className="w-full h-48"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill={darkMode ? '#2d3748' : '#f7fafc'}
            fillOpacity="1"
            d="M0,224L48,224C96,224,192,224,288,208C384,192,480,160,576,149.3C672,139,768,149,864,165.3C960,181,1056,203,1152,213.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default WhitePaperContent;
