import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ic from 'ic0';

import { useTheme } from '../contexts/ThemeContext';
const Details = (props) => {
    const { id } = props;
    const { darkMode, toggleTheme } = useTheme(); // Set default or dynamic based on use case
    const [loading, setLoading] = useState(false);
    const [proposalData, setProposalData] = useState(null);
    const [previousVote, setPreviousVote] = useState([]);
    const [winner, setWinner] = useState(null);
    const [alertInfo, setAlertInfo] = useState({ show: false, type: '', message: '' });

    const backendCanisterId = 'bkyz2-fmaaa-aaaaa-qaaaq-cai';
    const backend = ic.local(backendCanisterId);

    const formatCreationTime = (nsTimestamp) => {
        const milliseconds = nsTimestamp / 1_000_000; // Convert nanoseconds to milliseconds
        const date = new Date(milliseconds); // Create a new Date object
        return date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
    };
    const fetchProposalData = async () => {
        try {
            setLoading(true);
            const result = await backend.call("getProposal", id);
            const vote = await backend.call("QueryAllUserVotes");
            console.log(vote);
            console.log(result[0]);
            if (result[0]) {
                result[0].formattedCreationTime = formatCreationTime(Number(result[0].creationTime));
            }
            setProposalData(result[0]);
            setPreviousVote(vote);
            console.log("vote",vote);
            checkResult(result[0].endTime);
        } catch (error) {
            console.error("Error fetching proposal data:", error);
        } finally {
            setLoading(false);
        }
    };
    const castVote = async (proposalId, option) => {
        try {
            setLoading(true);
            const alreadyVoted = previousVote.some(vote => vote.proposalId === proposalId);

            if (alreadyVoted) {
                
            setAlertInfo({ show: true, type: 'error', message: 'Already voted for this proposal' });
            setTimeout(() => setAlertInfo(false), 5000);
                console.log("Already voted for this proposal");
                return; // Exit the function, preventing further execution
            }
            const result = await backend.call("castVote", proposalId, option);
            setAlertInfo({ show: true, type: 'success', message: 'You cast vote successffully' });
            setTimeout(() => setAlertInfo(false), 5000);
            console.log("Vote result:", result);
            // Handle post-vote UI update or confirmation here
        } catch (error) {
            console.error("Error casting vote:", error);
            
            setAlertInfo({ show: true, type: 'error', message:"Error casting vote:".error });
            setTimeout(() => setAlertInfo(false), 5000);
        } finally {
            setLoading(false);
        }
    };
    const determineStatus = (endTime) => {
        const currentTime = Date.now();
        const endMilliseconds = Number(endTime) / 1_000_000;
        return currentTime > endMilliseconds ? 'Closed' : 'Vote';
    };

    const checkResult = async (endTime) => {
        if (determineStatus(endTime) === 'Closed') {
            const winnerResult = await getWinner(id);
            setWinner(winnerResult[0]); // This will update your state and trigger a re-render
            console.log(winnerResult[0]);
        }
    }
    const getWinner = async (proposalId) => {
        try {
            setLoading(true);
            const winner = await backend.call("getWinner", proposalId);
            console.log("Winner Selected:", winner);
            return winner;
        } catch (error) {
            console.error("Error Selected result:", error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchProposalData(); // Call the function when the component mounts
    }, [checkResult, setWinner]);

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

    return (
        <>
            <div className="lg:flex pb-24 pt-10 p-4">

                <div className="flex flex-col w-full gap-4 text-white">
                    {/* Proposal Section */}
                    {proposalData && (
                        <>
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
                            <h2 className="text-2xl font-bold text-left dark:text-white text-black">{proposalData.topicName}</h2>
                            <div className="dark:bg-gray-950 rounded-lg p-4 border-2 border-white p-4 mt-4">
                                <div className="flex justify-between mb-4">
                                    <div>
                                        <p className="text-sm mb-2 font-bold dark:text-white text-black">Proposal ID: {proposalData.id}</p>
                                    </div>
                                    <span className="text dark:text-white text-black">Posted {proposalData.formattedCreationTime}</span>
                                </div>
                                <hr />
                                <p className="text-sm mb-4 dark:text-white text-black mt-3 text-left">{proposalData.description}</p>

                                <hr />
                                <div className="flex mt-3 ">
                                    <span className='mr-2 text-xl font-bold dark:text-white text-black'> Topic:</span>
                                    <span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300 p-3">{proposalData.topicName}</span>
                                </div>
                            </div>
                        </>)}
                    {previousVote && previousVote.length > 0 && (
                        <div className="dark:bg-gray-950 rounded-lg border-2 border-white p-4 mt-4">
                            <h3 className="text-2xl mb-4 font-bold dark:text-white text-black text-left">My Voting History</h3>
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-black dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Proposal ID</th>
                                            <th scope="col" className="px-6 py-3">Date/Time</th>
                                            <th scope="col" className="px-6 py-3">Vote</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {previousVote.map((vote, index) => (
                                            <tr key={index} className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{vote.proposalId}</td>
                                                <td className="px-6 py-4">{formatCreationTime(Number(vote.voteTime))}</td>
                                                <td className="px-6 py-4">{vote.correctOption}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
                {proposalData && (
                    <div className="min-w-[350px] 2xl:min-w-[430px]  rounded-3xl overflow-hidden shadow-lg">
                        <div className="p-4">
                            <div className="flex flex-col space-y-4">
                                <button className="dark:text-white text-black text-xl font-mono italic border-2 border-white rounded-xl py-2 px-4  focus:outline-none">
                                    Actions
                                </button>
                                <div className="flex flex-col p-4 bg-white border-2 border-white rounded-xl dark:bg-gray-950 focus:outline-none">
                                    {
                                        determineStatus(proposalData.endTime) === 'Vote' ? (
                                            <>
                                                <button className="text-xl font-mono italic border-2 border-black rounded-xl py-2 px-6 mb-5 dark:bg-white dark:border-white focus:outline-none">
                                                    Vote
                                                </button>
                                                {proposalData.twoOptionType ? (
                                                    <div className="mt-4">
                                                        <h3 className="text-lg font-bold text-black dark:text-white">Options:</h3>
                                                        <div className="flex flex-col">
                                                            <button onClick={() => castVote(proposalData.id, "yes")} className="text-xl font-mono italic border-2 border-black rounded-xl py-2 px-6 mb-5 dark:bg-white dark:border-white focus:outline-none">
                                                                Yes
                                                            </button>
                                                            <button onClick={() => castVote(proposalData.id, "no")} className="text-xl font-mono italic border-2 border-black rounded-xl py-2 px-6 mb-5 dark:bg-white dark:border-white focus:outline-none">
                                                                No
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="mt-4">
                                                        <h3 className="text-lg font-bold text-black dark:text-white">Options:</h3>
                                                        <div className="flex flex-col">
                                                            {Object.entries(proposalData.options).map(([key, value]) => (
                                                                key.startsWith('op') &&
                                                                <div key={key} className="mb-3">
                                                                    <button onClick={() => castVote(proposalData.id, value)} className="text-xl font-mono italic border-2 border-black rounded-xl py-2 px-6 w-full dark:bg-white dark:border-white focus:outline-none">
                                                                        {value}
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <button className={`text-xl font-mono italic border-2 rounded-xl py-2 px-6 mb-5 focus:outline-none ${proposalData.status === 'Rejected' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}>
                                                    Closed
                                                </button>
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-black dark:text-white">
                                                        Proposal Result: {winner ? winner.correctOption : "Pending result..."}  </span>
                                                </div>
                                                <div className="w-full bg-green-600 rounded-full h-2.5 dark:bg-green-500">
                                                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                                                </div>
                                                <div className="flex justify-between mt-2">
                                                    <span className="text-green-600 dark:text-green-400 text-sm">100% Adopt</span>
                                                    <span className="text-red-600 dark:text-red-400 text-sm">0% Reject</span>
                                                </div>
                                                {proposalData.twoOptionType ? (
                                                    <div className="mt-4">
                                                        <h3 className="text-lg font-bold text-black dark:text-white">Options:</h3>
                                                        <div className="flex flex-col">
                                                            <button className="text-xl font-mono italic border-2 border-black rounded-xl py-2 px-6 mb-5 dark:bg-white dark:border-white focus:outline-none">
                                                                Yes
                                                            </button>
                                                            <button className="text-xl font-mono italic border-2 border-black rounded-xl py-2 px-6 mb-5 dark:bg-white dark:border-white focus:outline-none">
                                                                No
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="mt-4">
                                                        <h3 className="text-lg font-bold text-black dark:text-white">Options:</h3>
                                                        <div className="flex flex-col">
                                                            {Object.entries(proposalData.options).map(([key, value]) => (
                                                                key.startsWith('op') &&
                                                                <div key={key} className="mb-3">
                                                                    <button className="text-xl font-mono italic border-2 border-black rounded-xl py-2 px-6 w-full dark:bg-white dark:border-white focus:outline-none">
                                                                        {value}
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Details;
