import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../components/loader.css'
import { useTheme } from '../../../contexts/ThemeContext';
import ic from 'ic0';
import swal from 'sweetalert';

const ClosedProposal = () => {
    const { darkMode, toggleTheme } = useTheme();// Set default or dynamic based on use case
    const [loading, setLoading] = useState(false); // State for the "Only Open Proposal" checkbox
    const [proposals, setProposals] = useState([]);

   
    const backendCanisterId = "7wzen-oqaaa-aaaap-ahduq-cai";
    const backend = ic(backendCanisterId);

    // const backend = ic.local("br5f7-7uaaa-aaaaa-qaaca-cai");
    const formatCreationTime = (nsTimestamp) => {
        const milliseconds = nsTimestamp / 1_000_000; // Convert nanoseconds to milliseconds
        const date = new Date(milliseconds); // Create a new Date object
        return date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
    };
    const fetchProposalData = async () => {
        setLoading(true);
        try {
            const result = await backend.call("getProposalAllApproved");
            const formattedProposals = result.map(proposal => ({
                ...proposal,
                formattedCreationTime: formatCreationTime(Number(proposal.creationTime)),
                status: determineStatus(proposal.endTime),
            }));
            console.log(formattedProposals);
            setProposals(formattedProposals);
        } catch (error) {
            console.error("Error fetching proposal data:", error);
        } finally {
            setLoading(false);
        }
    };



    const winnersSelect = async (proposalId) => {
        try {
            setLoading(true);
            const result = await backend.call("winnersSelect", proposalId);
            if (result == 'success') {
                swal({
                    title: 'Winner Selected',
                    text: 'View detail to see winner',
                    icon: 'success'
                })
            }
            else {

                swal({
                    title: 'Error',
                    text: result,
                    icon: 'warning'
                })
            }
            console.log("Winner Selected:", result);
            // Handle post-vote UI update or confirmation here
        } catch (error) {
            swal({
                title: 'Error Selected result',
                text: error,
                icon: 'error'
            });
            console.error("Error Selected result:", error);
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
    const filteredProposals = proposals.filter(proposal => proposal.status !== 'Open');

    return (
        <>
            <div className="p-4 sm:ml-64 dark:bg-gray-800" style={{ minHeight: '100vh' }}>
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                    <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="stats" role="tabpanel" aria-labelledby="stats-tab">
                        <div className="flex flex-row mb-3  justify-between items-center">
                            <h1 className="text-3xl font-bold text-left dark:text-white">
                                Closed Proposal                            </h1>
                            <div className="flex items-center">
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex justify-center items-center">
                                <div className="loader"></div>
                            </div>
                        ) : filteredProposals.length > 0 ? (
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
                                                    <span class="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300 p-3">
                                                        {proposal.topicName}</span>
                                                </td>
                                                <td class="px-6 py-4">
                                                    {formatCreationTime(Number(proposal.creationTime))}
                                                </td>
                                                <td class="px-6 py-4">

                                                    {formatCreationTime(Number(proposal.endTime))}
                                                </td>
                                                <td class="px-6 py-4">
                                                    <span className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded p-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300`}>
                                                        {proposal.status}
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4">
                                                    <Link to={`/admin/closed-detail-proposals/${proposal.id}`}>
                                                        <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                                            View
                                                        </button>
                                                    </Link>
                                                    <button onClick={() => winnersSelect(proposal.id)} type="button"
                                                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                                        Get result
                                                    </button>

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : <p className="text-black dark:text-white text-lg">No proposals to display.</p>}
                    </div>

                </div>
            </div>
        </>
    );
};

export default ClosedProposal;
