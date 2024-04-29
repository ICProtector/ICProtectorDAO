import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useTheme } from './contexts/ThemeContext'; 
const AppContent = () => {
    const { darkMode, toggleTheme } = useTheme();


    const gradientClass = darkMode ? 'bg-gradient-to-r from-gray-950 to-gray-950' : 'bg-gradient-to-b from-orange-200 to-orange-500';
    const buttonClass = darkMode ? 'bg-gradient-to-r from-red-600 to-red-900' : 'bg-gradient-to-r from-red-400 to-red-600';
    const records = [
        { id: 76, username: 'gmicphae', title: 'Remove trilogyRay609 as moderator for his racist comments', description: 'As some of you might be aware of trilogyray609 made a post calling out a random person who sold BTC...', status: 'rejected' },
        { id: 32, username: 'gmicphae', title: 'Another post by trilogyRay609', description: 'This post talks about positive changes...', status: 'open' },
        { id: 87, username: 'gmicphae', title: 'Collaboration Proposal #3: Ludo Cherries', description: 'We hope to welcome back Ludo’s iconic Vanitas-style skull in cherry form. The Cherries debut...', status: 'adopted', extraContent: 'Yes, give me Cherries!' },
        // Additional records can be added here.
    ];

    const [filter, setFilter] = useState('');

    const handleFilterChange = (status) => {
        setFilter(status);
    };

    return (
        <>
            <header className="lg:hidden py-10"> <header className="w-full lg:max-w-xs 2xl:max-w-md flex flex-row text-xl lg:text-base 2xl:text-xl">
                <button onClick={() => handleFilterChange('open')} className={`dark:shadow-white ${buttonClass}  dark:hover:shadow-white flex-1 border-2 border-white dark:border-white dark:text-white h-12 lg:h-10 rounded-3xl font-mono italic`}>open</button>
                <button onClick={() => handleFilterChange('adopted')} className={`dark:shadow-white  ${buttonClass}  dark:hover:shadow-white flex-1 border-2 border-white dark:border-white dark:text-white h-12 lg:h-10 -ml-0.5 font-mono italic`}>adopted</button>
                <button onClick={() => handleFilterChange('rejected')} className={`dark:shadow-white  ${buttonClass} dark:hover:shadow-white flex-1 border-2 border-white dark:border-white dark:text-white h-12 lg:h-10 -ml-0.5 rounded-t-3xl font-mono italic`}>rejected</button>
            </header></header>
            <header className="hidden lg:flex pt-10 pb-8 justify-between mx-[11%]">
                <div className="flex justify-start lg:max-w-xs 2xl:max-w-md flex-1"></div>
                <div className="flex justify-end flex-1">
                    <header className="w-full lg:max-w-xs 2xl:max-w-md flex flex-row text-xl lg:text-base 2xl:text-xl">
                        <button onClick={() => handleFilterChange('open')} className={`dark:shadow-white ${buttonClass}  dark:hover:shadow-white flex-1 border-2 border-white dark:border-white dark:text-white h-12 lg:h-10 rounded-3xl font-mono italic`}>open</button>
                        <button onClick={() => handleFilterChange('adopted')} className={`dark:shadow-white ${buttonClass}  dark:hover:shadow-white flex-1 border-2 border-white dark:border-white dark:text-white h-12 lg:h-10 -ml-0.5 font-mono italic`}>adopted</button>
                        <button onClick={() => handleFilterChange('rejected')} className={`dark:shadow-white ${buttonClass} dark:hover:shadow-white flex-1 border-2 border-white dark:border-white dark:text-white h-12 lg:h-10 -ml-0.5 rounded-t-3xl font-mono italic`}>rejected</button>
                    </header>
                </div>
            </header>
            <ul className="pb-24 flex flex-col gap-4">
                {records.filter(record => record.status === filter || filter === '').map((record) => (
                    <>
                        <Link
                            to={`/proposals/${record.id}`}
                            className='text-decoration-none'
                            key={record.id}
                        >
                            <li key={`mobile-${record.id}`} className={`lg:hidden`}>
                                <div className={`cursor-pointer hover:shadow active:shadow dark:shadow-white mx-2 lg:mx-[10%] overflow-clip ${gradientClass} dark:bg-gray-800 border-white dark:border-white dark:text-white border-2 rounded-xl lg:rounded-3xl`}>
                                    <div className="p-2 flex flex-col">
                                        <div className="flex justify-between items-center">
                                            <p>id: #{record.id}</p>
                                            <p>by {record.username}</p>
                                        </div>
                                        <h1 className="font-everett-medium text-3xl mt-4">{record.title}</h1>
                                        <p className="mt-6 mb-7">{record.description}</p>
                                        <div className="flex justify-end lg:text-base 2xl:text-xl text-xl">
                                            <div className={`flex items-center justify-center ${buttonClass}  border-2 border-white dark:border-white dark:text-white h-12 lg:h-10 w-[calc(100vw*(1/3))] lg:w-40 -ml-0.5 rounded-t-3xl font-mono italic`}>{record.status}</div>
                                        </div>
                                        {record.status === 'adopted' && (
                                            <div className="flex justify-between mt-4">
                                                <div className={`flex items-center justify-center ${buttonClass} border-2 border-white dark:border-white dark:text-white h-12 lg:h-10 lg:max-w-xs rounded-3xl font-mono italic truncate px-4 flex-1`}>{record.extraContent}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </li>
                            <li key={`desktop-${record.id}`} className={`hidden lg:block`}>
                                <div className={`cursor-pointer hover:shadow active:shadow dark:shadow-white mx-2 lg:mx-[10%] overflow-clip ${gradientClass} dark:bg-gray-800 border-white dark:border-white dark:text-white border-2 rounded-xl lg:rounded-3xl`}>
                                    <div className="p-4 flex flex-col">
                                        <div className="flex justify-between">
                                            <div className="w-1/2 flex justify-between items-center 2xl:text-xl">
                                                <p>id: #{record.id}</p>
                                                <p>by {record.username}</p>
                                            </div>
                                            <div className="w-full">
                                                <div className="flex justify-end lg:text-base 2xl:text-xl text-xl">
                                                    {record.status === 'adopted' && (
                                                        <div className={`flex items-center justify-center truncate px-4 disabled flex-1 ${buttonClass}  border-2 border-white dark:border-white dark:text-white h-12 lg:h-10 lg:max-w-xs rounded-3xl font-mono italic`}>{record.extraContent}</div>
                                                    )}
                                                    <div className={`flex items-center justify-center ${buttonClass} border-2 border-white dark:border-white dark:text-white h-12 lg:h-10 w-[calc(100vw*(1/3))] lg:w-40 -ml-0.5 font-mono italic`}>{record.status}</div>
                                                </div>


                                            </div>
                                        </div>
                                        <div className="flex">
                                            <div className="">
                                                <h1 className="font-everett-medium text-3xl 2xl:text-4xl mt-4">{record.title}</h1>
                                                <p className="mt-6 2xl:text-xl">{record.description}</p>
                                            </div>
                                            <div className="flex items-end justify-end w-48"></div>
                                        </div>
                                    </div>
                                </div>
                            </li>

                        </Link>
                    </>
                ))}
            </ul>
        </>
    );
};

export default AppContent;
