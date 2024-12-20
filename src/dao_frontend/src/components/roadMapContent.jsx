import React from 'react';
import roadmap from '/roadmap2.png';
import { useTheme } from '../contexts/ThemeContext';
import { ChevronRight, CheckCircle, Clock } from 'lucide-react';

const roadmapItems = [
  { date: 'Q4 2023', title: 'Creating ICP Protector on X', description: 'Community Building', status: 'completed' },
  { date: 'Q1 2024', title: 'Dapp planning and development', description: 'Laying the foundation', status: 'inProgress' },
  { date: 'Q2 2024', title: 'Expanding to ICP dApps', description: 'Taggr, DSCVR, start to release the Dapp & NFTs', status: 'upcoming' },
  { date: 'Q3 2024', title: 'Building & opening the Merchandise Shop', description: 'Get your ICP Protector merch', status: 'upcoming' },
  { date: 'Q4 2024', title: 'Top Secret', description: 'A super helpful & cool feature', status: 'upcoming' },
  { date: 'Q2 2025', title: 'SNS', description: 'Service Nervous System integration', status: 'upcoming' },
];

const RoadmapContent = () => {
  const { darkMode } = useTheme();

  return (
    <>
      {/* Header Section */}
      <div className="bg-gradient-to-b from-orange-100 to-gray-50 dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="text-center px-6 lg:px-8">
          <h1 className="text-5xl font-bold tracking-tight dark:text-white text-gray-900 sm:text-6xl">
            Roadmap
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Key milestones for ICP Protector, from community building in 2023 to launching a super cool feature and SNS by 2025.
          </p>
        </div>
      </div>

      {/* Roadmap Section */}
      <div className="overflow-hidden py-12 sm:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <section className="py-6">
            <div className="container mx-auto px-4">
              <div className="relative">
                {/* Timeline Line */}
                <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-orange-500 dark:bg-orange-700"></div>

                {/* Mobile List View */}
                <div className="block sm:hidden space-y-8">
                  {roadmapItems.map((item, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                      {/* Icon in Line */}
                      {index > 0 && (
                        <div className="relative w-full flex items-center">
                          <div className="absolute left-0 right-0 h-1 bg-orange-500 dark:bg-orange-700"></div>
                          <div className="relative w-12 h-12 mx-auto bg-orange-500 dark:bg-orange-700 rounded-full flex items-center justify-center z-10">
                            {item.status === 'completed' && <CheckCircle className="w-6 h-6 text-white" />}
                            {item.status === 'inProgress' && <Clock className="w-6 h-6 text-white" />}
                            {item.status === 'upcoming' && <ChevronRight className="w-6 h-6 text-white" />}
                          </div>
                        </div>
                      )}
                      {/* Title and Description */}
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg w-11/12">
                        <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">{item.description}</p>
                      </div>
                      {/* Date */}
                      <div className="mt-2 text-sm font-bold text-gray-800 dark:text-gray-200">{item.date}</div>
                    </div>
                  ))}
                </div>

                {/* Desktop View */}
                <div className="hidden sm:block space-y-12">
                  {roadmapItems.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
                    >
                      {/* Description Section */}
                      <div
                        className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}
                      >
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                          <h3 className="text-2xl font-semibold mb-2 text-orange-600 dark:text-orange-400">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                        </div>
                      </div>

                      {/* Icon Section */}
                      <div className="w-8 h-8 absolute left-1/2 transform -translate-x-1/2 -translate-y-4 flex items-center justify-center">
                        <div className="w-8 h-8 bg-orange-500 dark:bg-orange-700 rounded-full shadow-md flex items-center justify-center">
                          {item.status === 'completed' && <CheckCircle className="w-6 h-6 text-white" />}
                          {item.status === 'inProgress' && <Clock className="w-6 h-6 text-white" />}
                          {item.status === 'upcoming' && <ChevronRight className="w-6 h-6 text-white" />}
                        </div>
                      </div>

                      {/* Date Section */}
                      <div className={`w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}>
                        <div className="text-xl font-bold text-gray-800 dark:text-gray-200">{item.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Section */}
              <div className="text-center mt-16">
                <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  And more to come...
                </p>
              </div>
            </div>
          </section>

          {/* Roadmap Illustration */}
          <div className="mt-12">
            <img
              src={roadmap}
              alt="Roadmap Illustration"
              className="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RoadmapContent;
