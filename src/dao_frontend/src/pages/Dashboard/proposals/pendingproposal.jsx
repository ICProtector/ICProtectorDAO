import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';

const PendingProposal = () => {
    const { darkMode, toggleTheme } = useTheme();
    const [onlyOpen, setOnlyOpen] = useState(false); // State for the "Only Open Proposal" checkbox
    const [proposals, setProposals] = useState([]); // State to hold your proposal data
    const [alertInfo, setAlertInfo] = useState({
        show: false,
        type: "",
        message: "",
    });
    const Approved = () => {
        setAlertInfo({
            show: true,
            type: "success",
            message: "Proposal Approved.",
        });
        setTimeout(() => setAlertInfo(false), 5000);
    };
    const Disapproved = () => {
        setAlertInfo({
            show: true,
            type: "success",
            message: "Proposal Rejected.",
        });
        setTimeout(() => setAlertInfo(false), 5000);
    };
    useEffect(() => {
        // Simulated proposal data array
        const proposalData = [
            {
                id: 1,
                title: "1SET XRD Ratio",
                proposedDate: "April 10, 2024",
                timeRemaining: "2 hours ago",
                topic: "XRD Ratio",
                additionalInfo: "Additional data for Proposals should be added.",
                status: "Pending"
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
                status: "Pending"
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
                status: "Pending"
            },
            {
                id: 6,
                title: "SET XRD Ratio",
                proposedDate: "April 10, 2024",
                timeRemaining: "2 hours ago",
                topic: "XRD Ratio",
                additionalInfo: "Additional data for Proposals should be added.",
                status: "Pending"
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

        // Set initial proposal data
        setProposals(proposalData);
    }, []);

    // Function to filter proposals based on status
    const filteredProposals = proposals.filter(proposal => proposal.status === 'Pending')

    const alertStyles = {
        success: {
            backgroundColor: darkMode ? "#b9fbc0" : "#d4edda", // Green background
            color: darkMode ? "#1f7a1f" : "#155724", // Green text
        },
        error: {
            backgroundColor: darkMode ? "#fdb5b5" : "#f8d7da", // Red background
            color: darkMode ? "#971212" : "#721c24", // Red text
        },
    };
    const gradientClass = darkMode ? 'bg-gradient-to-r from-gray-950 to-gray-950' : 'bg-gradient-to-b from-orange-200 to-orange-500';
    const buttonClass = darkMode ? 'bg-gradient-to-r from-red-600 to-red-900' : 'bg-gradient-to-r from-red-400 to-red-600';

    return (
        <>
            <div className="p-4 sm:ml-64 dark:bg-gray-800" style={{ minHeight: '100vh' }}>
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                    <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="stats" role="tabpanel" aria-labelledby="stats-tab">
                    <div className="flex flex-row mb-3  justify-between items-center">
                            <h1 className="text-3xl font-bold text-left dark:text-white">
                                Pending Proposals                            </h1>
                            <div className="flex items-center">
                            </div>
                        </div>
                        {alertInfo.show && (
                            <div
                                style={{
                                    padding: "1rem",
                                    marginBottom: "1rem",
                                    borderRadius: "0.25rem",
                                    backgroundColor: alertStyles[alertInfo.type].backgroundColor,
                                    color: alertStyles[alertInfo.type].color,
                                }}
                                role="alert"
                            >
                                {alertInfo.message}
                            </div>
                        )}
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Proposal ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Title
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Proposed
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Time Remaining
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Topic
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='mt-2'>
                                {filteredProposals.map(proposal => (
                                    <tr key={proposal.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {proposal.id}
                                        </td>
                                        <td className="px-6 py-4">
                                            {proposal.title}
                                        </td>
                                        <td className="px-6 py-4">
                                            {proposal.proposedDate}
                                        </td>
                                        <td className="px-6 py-4">
                                            {proposal.timeRemaining}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300 p-3">{proposal.topic}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded p-3 ${proposal.status === 'Pending' ? 'bg-amber-300 text-amber-600 dark:bg-amber-300 dark:text-amber-600' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                                                {proposal.status}
                                            </span>
                                        </td>
                                        <td className="px-2 py-4">
                                            <button
                                                onClick={() => Approved()}
                                                type="button"
                                                className={`text-white font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none focus:ring-4 ${proposal.status === 'Pending' ? 'bg-green-500 hover:bg-green-600 border-green-600 focus:ring-green-300' : 'bg-white border-gray-300 hover:bg-gray-100 focus:ring-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 dark:text-white'
                                                    }`}
                                            >
                                                {proposal.status === 'Pending' ? 'Approve' : 'View'}
                                            </button>

                                            <button
                                                onClick={() => Disapproved()}
                                                type="button"
                                                className={`text-white font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none focus:ring-4 ${proposal.status === 'Pending' ? 'bg-red-500 hover:bg-red-600 border-red-600 focus:ring-red-300' : 'bg-white border-gray-300 hover:bg-gray-100 focus:ring-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 dark:text-white'
                                                    }`}
                                            >
                                                {proposal.status === 'Pending' ? 'Disapprove' : 'View'}
                                            </button> </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </>
    );
};

export default PendingProposal;
