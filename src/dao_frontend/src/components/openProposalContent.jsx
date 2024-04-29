import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '/logoo.png';
import icp from '/icp.png';

const OpenProposalContent = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [onlyOpen, setOnlyOpen] = useState(false); // State for the "Only Open Proposal" checkbox
    const [proposals, setProposals] = useState([]); // State to hold your proposal data

    useEffect(() => {
        // Simulated proposal data array
        const proposalData = [
            {
                id: 1,
                title: "SET XRD Ratio",
                proposedDate: "April 10, 2024",
                timeRemaining: "2 hours ago",
                topic: "XRD Ratio",
                status: "Open"
            },
            {
                id: 2,
                title: "SET XRD Ratio",
                proposedDate: "April 10, 2024",
                timeRemaining: "2 hours ago",
                topic: "XRD Ratio",
                status: "Open"
            },
            {
                id: 3,
                title: "SET XRD Ratio",
                proposedDate: "April 10, 2024",
                timeRemaining: "2 hours ago",
                topic: "XRD Ratio",
                status: "Open"
            },
            {
                id: 4,
                title: "SET XRD Ratio",
                proposedDate: "April 10, 2024",
                timeRemaining: "2 hours ago",
                topic: "XRD Ratio",
                status: "Open"
            },
            {
                id: 5,
                title: "SET XRD Ratio",
                proposedDate: "April 10, 2024",
                timeRemaining: "2 hours ago",
                topic: "XRD Ratio",
                status: "Open"
            },
            {
                id: 6,
                title: "SET XRD Ratio",
                proposedDate: "April 10, 2024",
                timeRemaining: "2 hours ago",
                topic: "XRD Ratio",
                status: "Open"
            },
            {
                id: 7,
                title: "SET XRD Ratio",
                proposedDate: "April 10, 2024",
                timeRemaining: "2 hours ago",
                topic: "XRD Ratio",
                status: "Open"
            },
            {
                id: 8,
                title: "SET XRD Ratio",
                proposedDate: "April 10, 2024",
                timeRemaining: "2 hours ago",
                topic: "XRD Ratio",
                status: "Open"
            },
            // Add more proposal objects here if needed
        ];

        // Set initial proposal data
        setProposals(proposalData);

        // Function to update dark mode state
        const updateDarkMode = () => {
            const root = window.document.documentElement;
            const hasDarkClass = root.classList.contains('dark');
            setDarkMode(hasDarkClass);
        };

        // Initial update
        updateDarkMode();

        // Update dark mode state every 5 seconds
        const intervalId = setInterval(updateDarkMode, 100);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    // Function to filter proposals based on status
    const filteredProposals = onlyOpen ? proposals.filter(proposal => proposal.status === 'Open') : proposals;

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
            <section className={`section7  ${gradientClass}`}>
                <div className={`p-5`}>
                    <div className="ml-3 mr-3">
                        <div className="flex flex-row mb-3 mt-5 justify-between items-center">
                            <h1 className="text-3xl font-bold text-left dark:text-white">
                                Open Proposals
                            </h1>
                            <div className="flex items-center">
                            </div>
                        </div>

                        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">

                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Proposal ID
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Title
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Proposed
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Time Remaining
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Topic
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Status
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            View
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='mt-2'>
                                    {filteredProposals.map(proposal => (
                                        <tr key={proposal.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {proposal.id}
                                            </td>
                                            <td class="px-6 py-4">
                                                {proposal.title}
                                            </td>
                                            <td class="px-6 py-4">
                                                {proposal.proposedDate}
                                            </td>
                                            <td class="px-6 py-4">
                                                {proposal.timeRemaining}
                                            </td>
                                            <td class="px-6 py-4">
                                                <span class="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300 p-3">{proposal.topic}</span>
                                            </td>
                                            <td class="px-6 py-4">
                                                <span className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded p-3 ${proposal.status === 'Open' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                                                    {proposal.status}
                                                </span>
                                            </td>
                                            <td class="px-6 py-4">
                                                <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Vote</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default OpenProposalContent;
