import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import ic from 'ic0';

const OpenProposal = () => {
    const { darkMode, toggleTheme } = useTheme();// Set default or dynamic based on use case
    const [loading, setLoading] = useState(false);
    const [onlyOpen, setOnlyOpen] = useState(false); // State for the "Only Open Proposal" checkbox
    const [proposals, setProposals] = useState([]);
    const [proposalData, setProposalData] = useState([]); // State to hold your proposal data
    const backendCanisterId = '7wzen-oqaaa-aaaap-ahduq-cai';
    const backend = ic(backendCanisterId);
    const formatCreationTime = (nsTimestamp) => {
        const milliseconds = nsTimestamp / 1_000_000; // Convert nanoseconds to milliseconds
        const date = new Date(milliseconds); // Create a new Date object
        return date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
    };
    const fetchProposalData = async () => {
        try {
            const result = await backend.call("getProposalAll");
            const formattedProposals = result.map(proposal => ({
                ...proposal,
                formattedCreationTime: formatCreationTime(Number(proposal.creationTime)),
                status: determineStatus(proposal.endTime)
            }));
            setProposals(formattedProposals);
        } catch (error) {
            console.error("Error fetching proposal data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProposalData();

    }, []);
    const determineStatus = (endTime) => {
        const currentTime = Date.now();
        const endMilliseconds = Number(endTime) / 1_000_000;
        return currentTime > endMilliseconds ? 'Closed' : 'Open';
    };
    // Function to filter proposals based on status
    const filteredProposals =  proposals.filter(proposal => proposal.status === 'Open');
    return (
        <>
            <div className="p-4 sm:ml-64 dark:bg-gray-800" style={{ minHeight: '100vh' }}>
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                    <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="stats" role="tabpanel" aria-labelledby="stats-tab">
                        
                    {loading ? <p>Loading proposals...</p> : filteredProposals.length > 0 ? (
                      
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
                                    
                                {filteredProposals.map((proposal, index) => (
                                        <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {proposal.id}
                                            </td>
                                            <td class="px-6 py-4">
                                                {proposal.topicName}
                                            </td>
                                            <td class="px-6 py-4">
                                                {formatCreationTime(Number(proposal.creationTime))}
                                            </td>
                                            <td class="px-6 py-4">
                                               
                                            {formatCreationTime(Number(proposal.endTime))}
                                            </td>
                                            <td class="px-6 py-4">
                                                <span class="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300 p-3">
                                                {proposal.topicName}</span>
                                            </td>
                                            <td class="px-6 py-4">
                                                <span className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded p-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300`}>
                                                {proposal.status}
                                                </span>
                                            </td>
                                            <td class="px-6 py-4">
                                                <Link to={`/admin/detail-proposals/${proposal.id}`}>
                                                    <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                                    {proposal.status === "Open" ? "View" : "View"}
                                                    </button>
                                                </Link>
                                                </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                       ) : <p className='text-black dark:text-white'>No proposals to display.</p>}
                    </div>

                </div>
            </div>
        </>
    );
};

export default OpenProposal;
