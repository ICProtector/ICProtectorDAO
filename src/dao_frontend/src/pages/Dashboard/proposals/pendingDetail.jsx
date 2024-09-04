import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ic from "ic0";
import '../../../components/loader.css'


import { useTheme } from '../../../contexts/ThemeContext';
const PendingDetail = (props) => {
    const { id } = props;
    const navigate = useNavigate();
    const { darkMode, toggleTheme } = useTheme(); // Set default or dynamic based on use case
    const [loading, setLoading] = useState(false);
    const [approving, setApproving] = useState(false);
    const [proposalData, setProposalData] = useState(null);


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
            console.log("vote", vote);


        } catch (error) {
            console.error("Error fetching proposal data:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchProposalData(); // Call the function when the component mounts
    }, []);

    const ApprovedProposal = async (proposalId, option) => {
        try {
            setApproving(true);
            const result = await backend.call(
                "approveProposal",
                proposalId,
                option
            );
            alert('This proposal is approved !!!');
            navigate("/admin/pending-proposal");
        } catch (error) {
            console.error("Error casting vote:", error);

        } finally {
            setApproving(false);
        }
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
                    {loading && (
                        <div className="flex flex-col w-full gap-4 text-white">
                            <div className="flex justify-center items-center">
                                <div className="loader"></div>
                            </div>
                        </div>
                    )}
                    {!loading && (
                        <>
                            <div className="lg:flex pb-24 pt-10 p-4">
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

                                                <div className="flex flex-col space-y-4">
                                                    <button className="dark:text-white text-black text-xl font-mono italic border-2 border-white rounded-xl py-2 px-4  focus:outline-none">
                                                        Actions
                                                    </button>
                                                    <div className="flex flex-col p-4 bg-white border-2 border-white rounded-xl dark:bg-gray-800 focus:outline-none">
                                                        <button onClick={() => ApprovedProposal(id, "approved")} className="text-xl text-black font-mono italic border-2 border-black rounded-xl py-2 px-6 mb-5 dark:bg-green-500 bg-green-500 dark:border-white focus:outline-none">
                                                            {approving ? 'Approving' : 'Approve'}
                                                        </button>
                                                        {proposalData.twoOptionType ? (
                                                            <div className="mt-4">
                                                                <h3 className="text-lg font-bold text-black dark:text-white">
                                                                    Options:
                                                                </h3>
                                                                <div className="flex flex-col">
                                                                    <button
                                                                        className="text-xl text-black font-mono italic border-2 border-black rounded-xl py-2 px-6 mb-5 dark:bg-white dark:border-white focus:outline-none"
                                                                    >
                                                                        Yes
                                                                    </button>
                                                                    <button
                                                                        className="text-xl text-black font-mono italic border-2 border-black rounded-xl py-2 px-6 mb-5 dark:bg-white dark:border-white focus:outline-none"
                                                                    >
                                                                        No
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="mt-4">
                                                                <h3 className="text-lg font-bold text-black dark:text-white">
                                                                    Options:
                                                                </h3>
                                                                <div className="flex flex-col">
                                                                    {Object.entries(proposalData.options).map(
                                                                        ([key, value]) =>
                                                                            key.startsWith("op") && (
                                                                                <div key={key} className="mb-3">
                                                                                    <button className="text-xl text-black font-mono italic border-2 border-black rounded-xl py-2 px-6 w-full dark:bg-white dark:border-white focus:outline-none" >
                                                                                        {value}
                                                                                    </button>
                                                                                </div>
                                                                            )
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div >
        </>
    );
};

export default PendingDetail;
