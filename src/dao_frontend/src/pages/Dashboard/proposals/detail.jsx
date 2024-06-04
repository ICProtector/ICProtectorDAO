import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ic from "ic0";
import { useConnect } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";
import '../../../components/loader.css'


import { useTheme } from '../../../contexts/ThemeContext';
const Details = (props) => {
    const { id } = props;
    const { darkMode, toggleTheme } = useTheme(); // Set default or dynamic based on use case
    const [loading, setLoading] = useState(false);
    const [proposalData, setProposalData] = useState(null);
    const [previousVote, setPreviousVote] = useState([]);
    const [winner, setWinner] = useState(null);
    const [alertInfo, setAlertInfo] = useState({
        show: false,
        type: "",
        message: "",
    });

    const backendCanisterId = "7wzen-oqaaa-aaaap-ahduq-cai";
    const backend = ic(backendCanisterId);    
    const formatCreationTime = (nsTimestamp) => {
        const milliseconds = nsTimestamp / 1_000_000; // Convert nanoseconds to milliseconds
        const date = new Date(milliseconds); // Create a new Date object
        return date.toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
    };
    const fetchProposalData = async () => {
        setLoading(true);
        try {
                const result = await backend.call("getProposal", id);
                
                console.log("res", result[0]);
                if (result[0]) {
                    result[0].formattedCreationTime = formatCreationTime(
                        Number(result[0].creationTime)
                    );
                }
                setProposalData(result[0]);
                setPreviousVote(vote);
                console.log("vote", vote);
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
            const alreadyVoted = previousVote.some(
                (vote) => vote.proposalId === proposalId
            );

            if (alreadyVoted) {
                setAlertInfo({
                    show: true,
                    type: "error",
                    message: "Already voted for this proposal",
                });
                setTimeout(() => setAlertInfo(false), 5000);
                console.log("Already voted for this proposal");
                return; // Exit the function, preventing further execution
            }
                
                setAlertInfo({
                    show: true,
                    type: "success",
                    message: "You cast vote successffully",
                });
                setTimeout(() => setAlertInfo(false), 5000);
                console.log("Vote result:", result);            

            // Handle post-vote UI update or confirmation here
        } catch (error) {
            console.error("Error casting vote:", error);

            setAlertInfo({
                show: true,
                type: "error",
                message: "Error casting vote:".error,
            });
            setTimeout(() => setAlertInfo(false), 5000);
        } finally {
            setLoading(false);
        }
    };
    const determineStatus = (endTime) => {
        const currentTime = Date.now();
        const endMilliseconds = Number(endTime) / 1_000_000;
        return currentTime > endMilliseconds ? "Closed" : "Vote";
    };

    const checkResult = async (endTime) => {
        if (determineStatus(endTime) === "Closed") {
            const winnerResult = await getWinner(id);
            setWinner(winnerResult[0]); // This will update your state and trigger a re-render
            console.log(winnerResult[0]);
        }
    };
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
    };
    useEffect(() => {
        fetchProposalData(); // Call the function when the component mounts
    }, []);

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
    const calculateTotalVotes = () => {
        if (!proposalData) return 0;
        const { options, twoOptionOptions } = proposalData;
        if (proposalData.twoOptionType) {
            return Number(twoOptionOptions.yesVotes) + Number(twoOptionOptions.noVotes);
        } else {
            return Object.entries(options).reduce((total, [key, value]) => {
                if (key.startsWith("count")) {
                    return total + Number(value);
                }
                return total;
            }, 0);
        }
    };

    const totalVotes = calculateTotalVotes();

    const calculatePercentage = (count) => {
        if (totalVotes === 0) return "0%";
        return ((Number(count) / totalVotes) * 100).toFixed(2) + "%";
    };
    return (
        <> <div className="p-4 sm:ml-64 dark:bg-gray-800" style={{ minHeight: '100vh' }}>
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                <div className="lg:flex pb-24 pt-10 p-4">
                    <div className="flex flex-col w-full gap-4 text-white">
                    {loading && (
            <div className="flex justify-center items-center">
              <div className="loader"></div>
            </div>
          )}
          {!loading && (
            <>
          {proposalData && (
                            <>
                                {alertInfo.show && (
                                    <div
                                        style={{
                                            padding: "1rem",
                                            marginBottom: "1rem",
                                            borderRadius: "0.25rem",
                                            backgroundColor:
                                                alertStyles[alertInfo.type].backgroundColor,
                                            color: alertStyles[alertInfo.type].color,
                                        }}
                                        role="alert"
                                    >
                                        {alertInfo.message}
                                    </div>
                                )}
                                <h2 className="text-2xl font-bold text-left dark:text-white text-black">
                                    {proposalData.topicName}
                                </h2>
                                <div className="dark:bg-gray-800 rounded-lg p-4 border-2 border-white p-4 mt-4">
                                    <div className="flex justify-between mb-4">
                                        <div>
                                            <p className="text-sm mb-2 font-bold dark:text-white text-black">
                                                Proposal ID: {proposalData.id}
                                            </p>
                                        </div>
                                        <span className="text dark:text-white text-black">
                                            Posted {proposalData.formattedCreationTime}
                                        </span>
                                    </div>
                                    <hr />
                                    <p className="text-sm mb-4 dark:text-white text-black mt-3 text-left">
                                        {proposalData.description}
                                    </p>

                                    <hr />
                                    <div className="flex mt-3 ">
                                        <span className="mr-2 text-xl font-bold dark:text-white text-black">
                                            {" "}
                                            Topic:
                                        </span>
                                        <span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300 p-3">
                                            {proposalData.topicName}
                                        </span>
                                    </div>
                                </div>
                                <div className="dark:bg-gray-800 rounded-lg border-2 border-gray-700 border-solid dark:border-gray-200 p-4 mt-4">
                                    <h3 className="text-2xl mb-4 font-bold dark:text-white text-black text-left">
                                        Total Vote Casted
                                    </h3>
                                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                        <div className="pt-7 flex flex-col gap-2">
                                            <div className="mb-5">
                                                <div>
                                                    <div className="flex justify-between text-lg lg:text-base 2xl:text-xl">
                                                        <span className="text-black dark:text-white">votes cast</span>
                                                        <span className="text-black dark:text-white">
                                                            {totalVotes} votes, {calculatePercentage(totalVotes)}
                                                        </span>
                                                    </div>
                                                    <div className="flex w-full items-center">
                                                        <div className="flex-grow overflow-hidden text-xs flex rounded-full bg-white dark:bg-gray-800 h-10 border-2 border-black dark:border-white">
                                                            <div
                                                                className="rounded-full shadow-none flex flex-col text-center whitespace-nowrap justify-center bg-black dark:bg-white"
                                                                style={{ width: calculatePercentage(totalVotes) }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {proposalData.twoOptionType ? (
                                                <>
                                                    <div>
                                                        <div className="flex justify-between text-lg lg:text-base 2xl:text-xl">
                                                            <span className="text-black dark:text-white">Yes</span>
                                                            <span className="text-black dark:text-white">
                                                                {Number(proposalData.twoOptionOptions.yesVotes)} votes, {calculatePercentage(proposalData.twoOptionOptions.yesVotes)}
                                                            </span>
                                                        </div>
                                                        <div className="flex w-full items-center">
                                                            <div className="flex-grow overflow-hidden text-xs flex rounded-full bg-white dark:bg-gray-800 h-10 border-2 border-black dark:border-white">
                                                                <div
                                                                    className="rounded-full shadow-none flex flex-col text-center whitespace-nowrap justify-center bg-black dark:bg-white"
                                                                    style={{ width: calculatePercentage(proposalData.twoOptionOptions.yesVotes) }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between text-lg lg:text-base 2xl:text-xl">
                                                            <span className="text-black dark:text-white">No</span>
                                                            <span className="text-black dark:text-white">
                                                                {Number(proposalData.twoOptionOptions.noVotes)} votes, {calculatePercentage(proposalData.twoOptionOptions.noVotes)}
                                                            </span>
                                                        </div>
                                                        <div className="flex w-full items-center">
                                                            <div className="flex-grow overflow-hidden text-xs flex rounded-full bg-white dark:bg-gray-800 h-10 border-2 border-black dark:border-white">
                                                                <div
                                                                    className="rounded-full shadow-none flex flex-col text-center whitespace-nowrap justify-center bg-black dark:bg-white"
                                                                    style={{ width: calculatePercentage(proposalData.twoOptionOptions.noVotes) }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                Object.entries(proposalData.options).map(([key, value]) =>
                                                    key.startsWith("op") && (
                                                        <div key={key}>
                                                            <div className="flex justify-between text-lg lg:text-base 2xl:text-xl">
                                                                <span className="text-black dark:text-white">{value}</span>
                                                                <span className="text-black dark:text-white">
                                                                    {Number(proposalData.options[`count${key.charAt(2)}`])} votes, {calculatePercentage(proposalData.options[`count${key.charAt(2)}`])}
                                                                </span>
                                                            </div>
                                                            <div className="flex w-full items-center">
                                                                <div className="flex-grow overflow-hidden text-xs flex rounded-full bg-white dark:bg-gray-800 h-10 border-2 border-black dark:border-white">
                                                                    <div
                                                                        className="rounded-full shadow-none flex flex-col text-center whitespace-nowrap justify-center bg-black dark:bg-white"
                                                                        style={{ width: calculatePercentage(proposalData.options[`count${key.charAt(2)}`]) }}
                                                                    ></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )} </>
                    )}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Details;
