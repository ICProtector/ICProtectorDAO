import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useTheme } from '../contexts/ThemeContext';
const Details = (props) => {
    const { id } = props;
    const { darkMode, toggleTheme } = useTheme();
    const proposalData = [
        {
            id: 1,
            title: "1SET XRD Ratio",
            proposedDate: "April 10, 2024",
            timeRemaining: "2 hours ago",
            topic: "XRD Ratio",
            additionalInfo: "Additional data for Proposals should be added.",
            status: "Open"
        },
        {
            id: 2,
            title: "2SET XRD Ratio",
            proposedDate: "April 10, 2024",
            timeRemaining: "2 hours ago",
            topic: "XRD Ratio",
            additionalInfo: "Additional data for Proposals should be added.",
            status: "Rejected"
        },
        {
            id: 3,
            title: "3SET XRD Ratio",
            proposedDate: "April 10, 2024",
            timeRemaining: "2 hours ago",
            topic: "XRD Ratio",
            additionalInfo: "Additional data for Proposals should be added.",
            status: "Open"
        },
        {
            id: 4,
            title: "4SET XRD Ratio",
            proposedDate: "April 10, 2024",
            timeRemaining: "2 hours ago",
            topic: "XRD Ratio",
            additionalInfo: "Additional data for Proposals should be added.",
            status: "Rejected"
        },
        {
            id: 5,
            title: "SET XRD Ratio",
            proposedDate: "April 10, 2024",
            timeRemaining: "2 hours ago",
            topic: "XRD Ratio",
            additionalInfo: "Additional data for Proposals should be added.",
            status: "Open"
        },
        {
            id: 6,
            title: "SET XRD Ratio",
            proposedDate: "April 10, 2024",
            timeRemaining: "2 hours ago",
            topic: "XRD Ratio",
            additionalInfo: "Additional data for Proposals should be added.",
            status: "Open"
        },
        {
            id: 7,
            title: "SET XRD Ratio",
            proposedDate: "April 10, 2024",
            timeRemaining: "2 hours ago",
            topic: "XRD Ratio",
            additionalInfo: "Additional data for Proposals should be added.",
            status: "Rejected"
        },
        {
            id: 8,
            title: "SET XRD Ratio",
            proposedDate: "April 10, 2024",
            timeRemaining: "2 hours ago",
            topic: "XRD Ratio",
            additionalInfo: "Additional data for Proposals should be added.",
            status: "Rejected"
        },
        // Add more proposal objects here if needed
    ];

    const selectedProposal = proposalData.find(proposal => proposal.id === parseInt(id));
    const gradientClass = darkMode ? 'bg-gradient-to-r from-gray-950 to-gray-950' : 'bg-gradient-to-b from-orange-200 to-orange-500';
    const buttonClass = darkMode ? 'bg-gradient-to-r from-red-600 to-red-900' : 'bg-gradient-to-r from-red-400 to-red-600';


    return (
        <> {selectedProposal ? (
            <div className="lg:flex pb-24 pt-10 p-4">

                <div className="flex flex-col w-full gap-4 text-white">
                    {/* Proposal Section */}
                    <h2 className="text-2xl font-bold text-left dark:text-white text-black">{selectedProposal.title}</h2>
                    <div className="dark:bg-gray-950 rounded-lg p-4 border-2 border-white p-4 mt-4">
                        <div className="flex justify-between mb-4">
                            <div>

                                <p className="text-sm mb-2 font-bold dark:text-white text-black">Proposal ID: {selectedProposal.id}</p>
                            </div>
                            <span className="text dark:text-white text-black">Posted {selectedProposal.proposedDate}</span>
                        </div>
                        <hr />
                        <p className="text-sm mb-4 dark:text-white text-black mt-3 text-left">More Info: <br />{selectedProposal.additionalInfo}</p>

                        <hr />
                        <div className="flex mt-3 ">
                            <span className='mr-2 text-xl font-bold dark:text-white text-black'> Topic:</span>
                            <span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300 p-3">{selectedProposal.topic}</span>
                        </div>
                    </div>

                    {/* Voting History Section */}
                    <div className="dark:bg-gray-950 rounded-lg border-2 border-white p-4 mt-4">
                        <h3 className="text-2xl mb-4 font-bold  dark:text-white text-black text-left">My Voting History</h3>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                            <table className="w-full text-sm text-left rtl:text-right text-black dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Stake ID
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Date/Time
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Vote
                                        </th>

                                    </tr>
                                </thead>
                                <tbody className='mt-2'>
                                    <tr className=" border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            0
                                        </td>
                                        <td className="px-6 py-4">
                                            Nov 3, 2023, 1:55 AM
                                        </td>
                                        <td className="px-6 py-4">
                                            Adopt
                                        </td>
                                    </tr>
                                    <tr className=" border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            0
                                        </td>
                                        <td className="px-6 py-4">
                                            Nov 3, 2023, 1:55 AM
                                        </td>
                                        <td className="px-6 py-4">
                                            Adopt
                                        </td>
                                    </tr>
                                    <tr className=" border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            0
                                        </td>
                                        <td className="px-6 py-4">
                                            Nov 3, 2023, 1:55 AM
                                        </td>
                                        <td className="px-6 py-4">
                                            Adopt
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="min-w-[350px] 2xl:min-w-[430px]  rounded-3xl overflow-hidden shadow-lg">
                    <div className="p-4">
                        <div className="flex flex-col space-y-4">
                            <button className="dark:text-white text-black text-xl font-mono italic border-2 border-white rounded-xl py-2 px-4  focus:outline-none">
                                Actions
                            </button>
                            <div className="flex flex-col p-4 bg-white border-2 border-white rounded-xl dark:bg-gray-950 focus:outline-none">
                            {selectedProposal.status === 'Open' ? (
    <button className="text-xl font-mono italic border-2 border-black rounded-xl py-2 px-6 mb-5 dark:bg-white dark:border-white focus:outline-none">
        Vote
    </button>
) : (
    <button className={`text-xl font-mono italic border-2 rounded-xl py-2 px-6 mb-5 focus:outline-none ${selectedProposal.status === 'Rejected' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}>
        {selectedProposal.status}
    </button>
)}
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-black dark:text-white">Proposal Status</span>
                                    <span className="text-black dark:text-white">1,241,693,625 Votes</span>
                                </div>
                                <div className="w-full bg-green-600 rounded-full h-2.5 dark:bg-green-500">
                                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span className="text-green-600 dark:text-green-400 text-sm">100% Adopt</span>
                                    <span className="text-red-600 dark:text-red-400 text-sm">0% Reject</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </div>) : (
            <p>No proposal found with ID {id}</p>
        )}
        </>
    );
};

export default Details;
