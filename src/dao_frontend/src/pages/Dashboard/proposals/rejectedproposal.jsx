
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import '../../../components/loader.css';
import ic from 'ic0';

const RejectedProposal = () => {
    const { darkMode, toggleTheme } = useTheme();
    const [onlyOpen, setOnlyOpen] = useState(false); // State for the "Only Open Proposal" checkbox
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(false);
    const backendCanisterId = '7wzen-oqaaa-aaaap-ahduq-cai';
    const backend = ic(backendCanisterId);
    const formatCreationTime = (nsTimestamp) => {
        const milliseconds = nsTimestamp / 1_000_000; // Convert nanoseconds to milliseconds
        const date = new Date(milliseconds); // Create a new Date object
        return date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
    };
    const [alertInfo, setAlertInfo] = useState({
        show: false,
        type: "",
        message: "",
    });

    const fetchPendingProposalData = async () => {
        setLoading(true);
        try {
            const result = await backend.call("getProposalAllRejected");
            console.log(result);
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

    const determineStatus = (endTime) => {
        const currentTime = Date.now();
        const endMilliseconds = Number(endTime) / 1_000_000;
        return currentTime > endMilliseconds ? 'Closed' : 'Open';
    };
    useEffect(() => {
        fetchPendingProposalData();
    }, []);
    
    const ApprovedProposal = async (proposalId, option) => {
        try {
          setLoading(true);
            const result = await backend.call(
              "approveProposal",
              proposalId,
              option
            );
            console.log(result);
            fetchPendingProposalData();
            setAlertInfo({
                show: true,
                type: "success",
                message: "Proposal " + option +" Successfully",
              });
            setTimeout(() => setAlertInfo(false), 5000);
          // Handle post-vote UI update or confirmation here
        } catch (error) {
          console.error("Error casting vote:", error);
    
          setAlertInfo({
            show: true,
            type: "error",
            message: "Error approvind proposal:".error,
          });
          setTimeout(() => setAlertInfo(false), 5000);
        } finally {
          setLoading(false);
        }
      };


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
    return (
        <>
            <div className="p-4 sm:ml-64 dark:bg-gray-800" style={{ minHeight: '100vh' }}>
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                    <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="stats" role="tabpanel" aria-labelledby="stats-tab">
                        <div className="flex flex-row mb-3  justify-between items-center">
                            <h1 className="text-3xl font-bold text-left dark:text-white">
                                Rejected Proposals                            </h1>
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
                        {loading ? (
                            <div className="flex justify-center items-center">
                                <div className="loader"></div>
                            </div>
                        ) : proposals.length > 0 ? (
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
                                        <th scope="col" className="px-6 py-3 text-center">
                                            View
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='mt-2'>
                                    {proposals.map(proposal => (
                                        <tr key={proposal.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                                            
                                        <td className="px-6 py-4">
                                            <span className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded p-3 ${proposal.status === 'Pending' ? 'bg-amber-300 text-amber-600 dark:bg-amber-300 dark:text-amber-600' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                                                {proposal.status}
                                            </span>
                                        </td>
                                            <td className="px-2 py-4">
                                            <button
                                                onClick={() => ApprovedProposal(proposal.id, "approved")}
                                                type="button"
                                                className={`text-white font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none focus:ring-4 bg-green-500 hover:bg-green-600 border-green-600 focus:ring-green-300`}
                                            >
                                                Approve
                                            </button>
                                            </td>
                                            <td>
                                            <Link to={`/admin/pending-detail-proposals/${proposal.id}`}>
                                                    <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                                    {proposal.status === "Open" ? "View" : "View"}
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : <p className="text-black dark:text-white text-lg">No rejected proposals to display.</p>}
                    </div>

                </div>
            </div>
        </>
    );
};

export default RejectedProposal;
