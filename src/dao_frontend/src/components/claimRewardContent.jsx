import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '/logoo.png';
import icp from '/icp.png';
import { useTheme } from '../contexts/ThemeContext';
import ic from 'ic0';
import { Principal } from '@dfinity/principal';
import { useConnect } from "@connect2ic/react"

const ClaimRewardContent = () => {
    const { darkMode, toggleTheme } = useTheme();// Set default or dynamic based on use case
    const [loading, setLoading] = useState(false);// State for the "Only Open Proposal" checkbox
    const [proposals, setProposals] = useState([]); 
    const [alertInfo, setAlertInfo] = useState({ show: false, type: '', message: '' });// State to hold your proposal data
    const backendCanisterId = '7wzen-oqaaa-aaaap-ahduq-cai';
    const backend = ic(backendCanisterId);
    const { isConnected, principal, activeProvider } = useConnect({
        onConnect: () => {
          // Signed in
        },
        onDisconnect: () => {
          // Signed out
        }
      })
    const formatCreationTime = (nsTimestamp) => {
        const milliseconds = nsTimestamp / 1_000_000; // Convert nanoseconds to milliseconds
        const date = new Date(milliseconds); // Create a new Date object
        return date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
    };
    
    const checkStatus = async (proposalId) => {
        try {
            const proposalData = await backend.call("getProposal",proposalId);
            const currentTime = Date.now();
            const endMilliseconds = Number(proposalData[0].endTime) / 1_000_000;
            const isClosed = currentTime > endMilliseconds;
            return isClosed ? 'Closed' : 'Open';
        } catch (error) {
            console.error('Error checking status:', error);
            return false; // Return false or perhaps 'Error' depending on how you want to handle failures
        }
    };

    const fetchProposalData = async () => {
        setLoading(true);
        try {
            const result = await backend.call("QueryAllUserVotes",Principal.fromText(principal));
            const closedProposals = await Promise.all(result.map(async proposal => {
                const status = await checkStatus(proposal.proposalId);
                if (status === 'Closed') {
                    return proposal;
                }
                return null;
            })).then(results => results.filter(p => p != null)); // Ensure filtering out null and undefined values
            setProposals(closedProposals);
        } catch (error) {
            console.error("Error fetching proposal data:", error);
            // Handle the error state in UI, maybe set an error message in state to display to the user
        } finally {
            setLoading(false);
        }
    };
    const checkClaimRewards = async (proposalId) => {
        try {
            setLoading(true);
            const reward = await backend.call("checkClaimRewards", proposalId,Principal.fromText(principal));
            if (reward === "No Reward yet") {
                alertType = 'success'; // Change type to warning for no reward
                alertMessage = "No Reward yet. Please try again later."; // Custom message for clarity
            } else if (reward === "success 1") {
                alertType = 'success'; // Change type to success for a positive reward
                alertMessage = "Congratulations! You have successfully claimed your reward."; // Custom success message
            } else {
                alertType = 'success'; // Keep as info or change to another appropriate type
                alertMessage = "Better luck next time! Keep participating."; // Encouraging message for no rewards
            }
            
            // Set the alert information
            setAlertInfo({ show: true, type: alertType, message: alertMessage });
            setTimeout(() => setAlertInfo(false), 5000);
            
        fetchProposalData();
            console.log("Reward result:", reward);
            // Handle post-vote UI update or confirmation here
        } catch (error) {
            console.error("Error casting vote:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchProposalData();
    }, []);
    const alertStyles = {
        success: {
            backgroundColor: darkMode ? '#b9fbc0' : '#d4edda', // Green background
            color: darkMode ? '#1f7a1f' : '#155724' // Green text
        },
        error: {
            backgroundColor: darkMode ? '#fdb5b5' : '#f8d7da', // Red background
            color: darkMode ? '#971212' : '#721c24' // Red text
        }
    };
    // Function to filter proposals based on status
    const filteredProposals = proposals.filter(proposal => proposal.status === 'Open');
    return (
        <>
            <section className={`section7 `}>
                <div className={`p-5`}>
                    <div className="ml-3 mr-3">
                        <div className="flex flex-row mb-3 mt-5 justify-between items-center">
                            <h1 className="text-3xl font-bold text-left dark:text-white">
                                Claim your reward
                            </h1>
                            <div className="flex items-center">
                            </div>
                        </div>
                        {alertInfo.show && (
                        <div
                            style={{
                                padding: '1rem',
                                marginBottom: '1rem',
                                borderRadius: '0.25rem',
                                backgroundColor: alertStyles[alertInfo.type].backgroundColor,
                                color: alertStyles[alertInfo.type].color,
                            }}
                            role="alert"
                        >
                            {alertInfo.message}
                        </div>
                    )}
                        {loading ? <p>Loading proposals...</p> : proposals.length > 0 ? (
                            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">

                                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">
                                                Proposal ID
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Voted Time
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                               Your Answer
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Claim
                                            </th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody className='mt-2'>

                                        {proposals.map((proposal, index) => (
                                            <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {proposal.proposalId}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {formatCreationTime(Number(proposal.voteTime))}
                                                </td>
                                                <td class="px-6 py-4">
                                                    <span className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded p-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300`}>
                                                        {proposal.correctOption}
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4">
                                                {proposal.claimed == false ? (
                                                        <button onClick={() => checkClaimRewards(proposal.proposalId)} type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                                           Claim
                                                        </button>
                                                ):(
                                                <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                                Already Claim
                                             </button>)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : <p>No proposals to display.</p>}
                    </div>

                </div>
            </section>
        </>
    );
};

export default ClaimRewardContent;
