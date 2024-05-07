import React from 'react';
import { Link } from 'react-router-dom';
import logo from '/logoo.png';
import icp from '/icp.png';
import { useTheme } from '../contexts/ThemeContext';
import Roadmap from '../pages/roadMapPage';

const RoadmapContent = () => {
  const { darkMode, toggleTheme } = useTheme();

  const features = [
    {
      "name": "Voting System",
      "description": "Empower your community with our advanced voting system. Gather feedback, make decisions, and drive engagement with ease. From polls to surveys, our voting system puts the power in your hands.",
      "icon": ""
    },
    {
      "name": "Alert of Frauds",
      "description": "Stay one step ahead of fraudsters with our alert system. Receive real-time notifications of suspicious activity, fraudulent transactions, and potential threats. Protect your assets and your reputation with proactive fraud detection.",
      "icon": ""
    },
    {
      "name": "Advanced Security",
      "description": "Defend your platform against cyber threats with our comprehensive security solutions. From encryption to intrusion detection, we've got you covered. Rest easy knowing that your data and your users are safe with us.",
      "icon": ""
    },
    {
      "name": "Safe You",
      "description": "Prioritize your safety and well-being with our 'Safe You' feature. Access resources, support services, and emergency assistance whenever you need it. With 'Safe You,' help is just a click away.",
      "icon": ""
    }
  ];

  return (
    <>
      <div className="">
        <div className="relative isolate px-6  lg:px-8">
          <div className="mx-auto max-w-2xl py-20 sm:py-20 lg:py-26">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight dark:text-white text-gray-900 sm:text-6xl">
                Our RoadMap
              </h1>
              <p className="mt-6 text-lg leading-8 dark:text-gray-300 text-gray-900">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
                fugiat aliqua.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get started
                </a>
                <a href="#" className="text-sm font-semibold leading-6 dark:text-gray-300">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              Our Progress
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight dark:text-white text-gray-900 sm:text-4xl">
              Journey towards enhanced functionality
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-900 dark:text-white">
              Check out the features we're developing to make ICP Protector even
              better. From faster deployment to advanced security measures, we're
              dedicated to improving your experience every step of the way.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16 dark:text-white">
                  <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 ">

                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 dark:text-white text-gray-900">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoadmapContent;
