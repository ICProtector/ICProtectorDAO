import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ic from "ic0";
import { useConnect } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";
import '../../../components/loader.css'
import './modal.css';
import swal from 'sweetalert';


import { useTheme } from '../../../contexts/ThemeContext';
const OpenDetails = (props) => {
    const { id } = props;
    const { darkMode, toggleTheme } = useTheme(); // Set default or dynamic based on use case
    const [loading, setLoading] = useState(false);
    const [proposalData, setProposalData] = useState(null);
    const [creator, setCreator] = useState("");
    const [points, setPoints] = useState(0);
    const [checkReward, setCheckReward] = useState(false);
    const [isSubmitting, setSubmiting] = useState(false);
    const [pointResult, setPointResult] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);

    };

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
                const creatorid = result[0].creator.toText();
                setCreator(creatorid)
            }
            setProposalData(result[0]);
            const check = await backend.call("getProposalReward", id);
            if (!check || check.length === 0) {
                setCheckReward(false);
            } else {
                setCheckReward(true);
            }

        } catch (error) {
            console.error("Error fetching proposal data:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchProposalData(); // Call the function when the component mounts
    }, [pointResult]);
    const handleChange = (e) => {
        const value = e.target.value;

        setPoints(Number(value));
    };
    const GivePoint = async (e) => {
        e.preventDefault();
        try {
            setSubmiting(true);
            const result = await backend.call(
                "givePointsForProposalByAdmin",
                id,
                Principal.fromText(creator),
                points
            );
            if(result == 'success'){
                swal({
                    title:'Funds given for this proposal',
                    icon:'success'
                });
            }else{
                swal({
                    title:'result',
                    icon:'info'
                });
            }
            setPointResult(result);
            // Handle post-vote UI update or confirmation here
        } catch (error) {
            console.error("Error funding proposal:", error);
            alert("Error funding proposal:", error);
        } finally {
            setSubmiting(false);

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
                          </div> </div>
                    )}
                    {!loading && (
                        <>
                            {proposalData && (
                                <>
                                    <div className="flex flex-col w-full gap-4 text-white">
                                        <div className="flex justify-between mb-4">
                                            <div>
                                                <h2 className="text-2xl font-bold text-left dark:text-white text-black">
                                                    {proposalData.topicName}
                                                </h2>
                                            </div>
                                            <button
                                                onClick={() => toggleModal()}
                                                type="button"
                                                className={`text-white font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none focus:ring-4 ${checkReward ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 border-green-600 focus:ring-green-300'
                                                    }`}
                                                disabled={checkReward}
                                            >
                                                Give points
                                            </button>
                                        </div>

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
                                    <div className="min-w-[350px] 2xl:min-w-[430px] mx-2 rounded-3xl overflow-hidden ">

                                        <div className="dark:bg-gray-800 rounded-lg border-2 border-gray-700 border-solid dark:border-gray-200 p-4 mt-4">
                                            <h3 className="text-2xl mb-4 font-bold dark:text-white text-black text-left">
                                                Total Vote Casted
                                            </h3>
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
            {isModalVisible && (
                <>
                    <div className="modal-overlay">
                        <div id="authentication-modal" className="relative p-4 w-full max-w-md max-h-full">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Give Points For Current Proposal
                                    </h3>
                                    <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => toggleModal()}>
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <div className="p-6 md:p-6 space-y-6">
                                    <form className="space-y-6" action="#" onSubmit={GivePoint}>
                                        <div>
                                            <label htmlFor="price" className="text-start block mb-2 text-sm font-medium text-gray-900 dark:text-white">Points</label>
                                            <input type="number" name="points" id="points"
                                                value={points}
                                                onChange={handleChange}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter the points" required />
                                        </div>

                                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isSubmitting ? "Giving..." : "Give Points"}</button>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
        </>
    );
};

export default OpenDetails;
