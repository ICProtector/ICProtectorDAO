import React from 'react';
import roadmap from '/roadmap2.png';
import { useTheme } from '../contexts/ThemeContext';

const RoadmapContent = () => {
  const { darkMode, toggleTheme } = useTheme();
  return (
    <>
    <div className="">
      <div className="relative isolate px-6  lg:px-8">
        <div className="mx-auto max-w-2xl py-20 sm:py-20 lg:py-26">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight dark:text-white text-gray-900 sm:text-6xl">
              RoadMap
            </h1>
            <p className="mt-6 text-lg leading-8 dark:text-gray-300 text-gray-900">
              Key milestones for ICP Protector, from community building in 2023 to launching a super cool feature and SNS by 2025.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <p className=" text-2xl text-left font-bold dark:text-white  text-gray-900 sm:text-3xl">Our RoadMap </p>                               
        <ul className="list-disc pl-5 ml-5 mt-6 text-lg text-gray-900 dark:text-white">
          <li className='text-left mt-6 text-lg text-gray-900 dark:text-white'>Q4 I 2023 - Creating ICP Protector on X (Community Building)</li>
          <li className='text-left mt-2 text-lg text-gray-900 dark:text-white'>Q1 I 2024 - Dapp planning and development</li>
          <li className='text-left mt-2 text-lg text-gray-900 dark:text-white'>Q2 I 2024 - Expanding to ICPs dApps (Taggr, DSCVRstart to release the Dapp & NFTs)</li>
          <li className='text-left mt-2 text-lg text-gray-900 dark:text-white'>Q3 I 2024 - building & opening the Merchandise Shop</li>
          <li className='text-left mt-2 text-lg text-gray-900 dark:text-white'>Q4 I 2024 - Top Secret (A super helpful & cool feature)</li>
          <li className='text-left mt-2 text-lg text-gray-900 dark:text-white'>Q2 I 2025 - SNS</li>
        </ul>
        <p className='text-left mt-2 text-lg text-gray-900 dark:text-white'> And more to come… </p>
        <br />
        <img src={roadmap} alt="" className='w-full' />
      </div>
    </div>

  </>
  );
};

export default RoadmapContent;
