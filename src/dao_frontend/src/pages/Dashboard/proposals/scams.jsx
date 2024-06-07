import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '/logoo.png';
import icp from '/icp.png';
import { useTheme } from '../../../contexts/ThemeContext';

const ScamContent = () => {
    const { darkMode, toggleTheme } = useTheme();
    const [proposals, setProposals] = useState([]);

    useEffect(() => {
        // Simulated proposal data array
        const proposals = [
            {
                id: 1,
                title: "Upgrade Consensus",
                description: "Proposal to upgrade the consensus algorithm to improve transaction speeds and reliability.",
                url: "https://example.com/proposals/upgrade-consensus"
            },
            {
                id: 2,
                title: "Increase Node Count",
                description: "Increase the number of nodes to enhance the decentralization and security of the network.",
                url: "https://example.com/proposals/increase-node-count"
            },
            {
                id: 3,
                title: "Data Privacy Regulation Compliance",
                description: "Adjust network protocols to ensure compliance with global data privacy regulations.",
                url: "https://example.com/proposals/data-privacy"
            },
            {
                id: 4,
                title: "Ecosystem Grant Allocation",
                description: "Proposal for the allocation of grants to support development of apps on the Internet Computer.",
                url: "https://example.com/proposals/ecosystem-grant"
            },
            {
                id: 5,
                title: "Network Economic Model",
                description: "Redefine the economic model of the network to better reward participants and secure the network's future.",
                url: "https://example.com/proposals/economic-model"
            }
        ];

        // Set initial proposal data
        setProposals(proposals);
    }, []);

    // Function to filter proposals based on status

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
            <div className="p-4 sm:ml-64 dark:bg-gray-800" style={{ minHeight: '100vh' }}>
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                    <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="stats" role="tabpanel" aria-labelledby="stats-tab">
                        <div className="flex flex-row mb-3  justify-between items-center">
                            <h1 className="text-3xl font-bold text-left dark:text-white">
                                Scam Lists
                            </h1>
                            <div className="flex items-center">
                                <Link to="/admin/add-scams">
                                    <button

                                        type="button"
                                        className={`text-white font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none focus:ring-4 bg-green-500 hover:bg-green-600 border-green-600 focus:ring-green-300'}`}
                                    >
                                        Add Scams to List
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="text-center px-6 py-3 w-1">
                                        #
                                    </th>
                                    <th scope="col" className=" text-center px-6 py-3 w-1/6">
                                        Title
                                    </th>
                                    <th scope="col" className="text-center px-6 py-3 w-3/6">
                                        Description
                                    </th>
                                    <th scope="col" className="text-center px-6 py-3 w-2/6">
                                        URL
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='mt-2'>
                                {proposals.map(proposal => (
                                    <tr key={proposal.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td scope="row" className=" text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-1">
                                            {proposal.id}
                                        </td>
                                        <td className="text-center px-6 py-4 w-1/6">
                                            {proposal.title}
                                        </td>
                                        <td className="px-6 py-4 w-3/6">
                                            {proposal.description}
                                        </td>
                                        <td className="text-center px-6 py-4 w-2/6">
                                            <a href={proposal.url} className="text-blue-500 underline">
                                                {proposal.url}
                                            </a>
                                        </td>
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

export default ScamContent;