import React, { useState, useEffect } from 'react';
import ic from "ic0";
import '../../../components/loader.css'
import swal from 'sweetalert';

import { useTheme } from '../../../contexts/ThemeContext';
const ClosedDetail = (props) => {
    const { id } = props;
    const { darkMode, toggleTheme } = useTheme(); // Set default or dynamic based on use case
    const [loading, setLoading] = useState(false);
    const [winnersResult, setWinnerResult] = useState(false);
    const [proposalData, setProposalData] = useState(null);
    const [winner, setWinner] = useState(null);
    const [refetchTrigger,setRefetchTrigger] = useState(false);

    const backendCanisterId = "7wzen-oqaaa-aaaap-ahduq-cai";
    const backend = ic(backendCanisterId);

    // const backend = ic.local("br5f7-7uaaa-aaaaa-qaaca-cai");
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


        } catch (error) {
            console.error("Error fetching proposal data:", error);
        } finally {
            setLoading(false);
        }
    };

    const checkResult = async () => {
        const winnerResult = await getWinner(id);
        setWinner(winnerResult[0]);
        console.log('winner result', winnerResult[0]);

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

    useEffect(()=>{        
        checkResult();
    },[refetchTrigger]);
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

    const winnersSelect = async (proposalId) => {
        try {
            setWinnerResult(true);
            const result = await backend.call("winnersSelect", proposalId);
            if (result == 'success') {
                swal({
                    title: 'Winner Selected',
                    text: 'View detail to see winner',
                    icon: 'success'
                });
                setRefetchTrigger(!refetchTrigger);
            }
            else {
                swal({
                    title: 'Error',
                    text: result,
                    icon: 'warning'
                })
            }
            console.log("Winner Selected:", result);
        } catch (error) {
            swal({
                title: 'Error Selected result',
                text: error,
                icon: 'error'
            });
            console.error("Error Selected result:", error);
        } finally {
            setWinnerResult(false);
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
                    {loading && (

                        <div className="flex flex-col w-full gap-4 text-white">
                            <div className="flex justify-center items-center">
                                <div className="loader"></div>
                            </div> </div>
                    )}
                    {!loading && (
                        <>
                            {proposalData && (
                                <>
                                    <div className="flex flex-col w-full gap-4 text-white">
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
                                            {proposalData.image ? (
                                                <div className="flex mt-3 ">

                                                    <img src={proposalData.image} alt="" style={{
                                                        width: "150px",
                                                        margin: "auto"
                                                    }} />
                                                </div>
                                            ) : (
                                                <div ></div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="min-w-[350px] 2xl:min-w-[430px]  rounded-3xl overflow-hidden mx-2">

                                        <div className="dark:bg-gray-800 rounded-lg border-2 border-gray-700 border-solid dark:border-gray-200 p-4 mt-4">
                                            <h3 className="text-2xl mb-4 font-bold dark:text-white text-black text-left">
                                                Total Vote Casted
                                            </h3>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-black text-xl font-bold dark:text-white">
                                                    {winner ? `Proposal Result: ${winner.correctOption}` :
                                                        <>
                                                            <button onClick={() => winnersSelect(proposalData.id)} type="button"
                                                                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                                                {winnersResult ? "Getting ..." : 'Get Result'}
                                                            </button>
                                                        </>
                                                    }
                                                </span>
                                            </div>
                                            <div className="relative overflow-x-auto">
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
                                    </div>
                                </>
                            )} </>
                    )}
                </div>
            </div>
        </div>
        </>
    );
};

export default ClosedDetail;
