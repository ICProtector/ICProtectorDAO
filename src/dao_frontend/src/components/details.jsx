import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ic from "ic0";
import { useConnect, ConnectButton } from "@connect2ic/react";
import swal from 'sweetalert';
import { useTheme } from "../contexts/ThemeContext";
import { Principal } from "@dfinity/principal";
import './loader.css'
const Details = (props) => {
  const { id } = props;
  const { darkMode, toggleTheme } = useTheme(); // Set default or dynamic based on use case
  const [loading, setLoading] = useState(false);
  const [proposalData, setProposalData] = useState(null);
  const [previousVote, setPreviousVote] = useState([]);
  const [votting, setVotting] = useState(false);
  const [calResult, setCalResult] = useState(false);
  const [refetch, setRefetch] = useState(null);
  const [winner, setWinner] = useState(null);
  const [winnerSelected, setWinnerSelected] = useState(true);

  const backendCanisterId = "7wzen-oqaaa-aaaap-ahduq-cai";
  const backend = ic(backendCanisterId);

  // const backend = ic.local("br5f7-7uaaa-aaaaa-qaaca-cai");
  const { isConnected, principal } = useConnect({
    onConnect: () => {
      // Signed in
    },
    onDisconnect: () => {
      // Signed out
    },
  });
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
      setLoading(true);
      if (isConnected) {
        const result = await backend.call("getProposal", id);
        const vote = await backend.call(
          "QueryAllUserVotes",
          Principal.fromText(principal)
        );
        console.log("vote", vote);
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
      }
    } catch (error) {
      console.error("Error fetching proposal data:", error);
    } finally {
      setLoading(false);
    }
  };
  const checkProposalStatus = async () => {
    setLoading(true);
    try {
      if (isConnected) {
        const result1 = await backend.call("isProposalTimeFinished", id);
        const result2 = await backend.call("isCreateRewardClaimed", id);
        console.log("res1 res2", result1, result2[0]);
        if (result1) {
          setWinnerSelected(result2[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching proposal data 1:", error);
    } finally {
      setLoading(false);
    }
  };
  const castVote = async (proposalId, option) => {
    try {
      setVotting(true);
      if (isConnected) {
        const result = await backend.call(
          "castVote",
          proposalId,
          option,
          Principal.fromText(principal)
        );
        if (result === "You have already voted on this proposal.") {
          swal({
            title: 'Warning',
            text: result,
            icon: 'error'
          })
        } else {
          const vote = await backend.call(
            "QueryAllUserVotes",
            Principal.fromText(principal)
          );
          console.log("vote", vote);
          swal({
            title: 'Vote Casted',
            text: 'You cast vote successfully',
            icon: 'success'
          });
          setPreviousVote(vote);
        }
      } else {
        swal({
          title: 'Connect your wallet',
          icon: 'success'
        });
      }

      // Handle post-vote UI update or confirmation here
    } catch (error) {
      console.error("Error casting vote:", error);
      swal({
        title: 'Error Casting vote',
        text: error,
        icon: 'success'
      });
    } finally {
      setVotting(false);
    }
  };

  const winnersSelect = async () => {
    try {
      setCalResult(true);
      const result = await backend.call("winnersSelect2", id);

      if (result == 'success') {
        swal({
          title: 'Winner Selected',
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
      setRefetch(!refetch);
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
      setCalResult(false);
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
    fetchProposalData();
    checkProposalStatus(); // Call the function when the component mounts
  }, [principal, refetch]);

  return (
    <>
      {principal ? <>
        {loading && (
          <div className="flex justify-center items-center min-h-screen">
            <div className="loader"></div>
          </div>
        )}
        <div className="lg:flex pb-24 pt-10 p-4">
          {!loading && (
            <>
              <div className="flex flex-col w-full gap-4 text-white">

                {proposalData && (
                  <>
                    <h2 className="text-2xl font-bold text-left dark:text-white text-black">
                      {proposalData.topicName}
                    </h2>
                    <div className="dark:bg-gray-950 rounded-lg p-4 border-2 border-white p-4 mt-4">
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
                  </>
                )}
                {previousVote && previousVote.length > 0 && (
                  <div className="dark:bg-gray-950 rounded-lg border-2 border-white p-4 mt-4">
                    <h3 className="text-2xl mb-4 font-bold dark:text-white text-black text-left">
                      My Voting History
                    </h3>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                      <table className="w-full text-sm text-left rtl:text-right text-black dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              Proposal ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Date/Time
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Vote
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {previousVote.map((vote, index) => (
                            <tr
                              key={index}
                              className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {vote.proposalId}
                              </td>
                              <td className="px-6 py-4">
                                {formatCreationTime(Number(vote.voteTime))}
                              </td>
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
                        {determineStatus(proposalData.endTime) === "Vote" ? (
                          <>
                            <button className="text-xl font-mono italic border-2 border-black rounded-xl py-2 px-6 mb-5 dark:bg-white dark:border-white focus:outline-none">
                              {votting ? "Voting ..." : 'Vote'}
                            </button>
                            {proposalData.twoOptionType ? (
                              <div className="mt-2">
                                <h3 className="text-lg mb-2 font-bold text-black dark:text-white">
                                  Options:
                                </h3>
                                <div className="flex flex-col">
                                  <button
                                    onClick={() => castVote(proposalData.id, "yes")}
                                    disabled={votting}                                    
                                    className={`text-xl font-mono italic border-2 rounded-xl py-2 px-6 w-full 
                                      focus:outline-none
                                      ${votting ? "bg-gray-400 text-gray-700 cursor-not-allowed border-gray-400" :
                                    "bg-white text-black border-black dark:bg-white dark:border-white dark:text-black"}`} >
                                    Yes
                                  </button>
                                  <button
                                    onClick={() => castVote(proposalData.id, "no")}
                                    disabled={votting}                                    
                                    className={`text-xl font-mono italic border-2 rounded-xl py-2 px-6 w-full 
                                      focus:outline-none
                                      ${votting ? "bg-gray-400 text-gray-700 cursor-not-allowed border-gray-400" :
                                    "bg-white text-black border-black dark:bg-white dark:border-white dark:text-black"}`} >
                                    No
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="mt-2">
                                <h3 className="text-lg mb-2 font-bold text-black dark:text-white">
                                  Options:
                                </h3>
                                <div className="flex flex-col">
                                  {Object.entries(proposalData.options).map(
                                    ([key, value]) =>
                                      key.startsWith("op") && (
                                        <div key={key} className="mb-3">
                                          <button
                                            onClick={() => castVote(proposalData.id, value)}
                                            disabled={votting}
                                            className={`text-xl font-mono italic border-2 rounded-xl py-2 px-6 w-full 
                                                  focus:outline-none
                                                  ${votting ? "bg-gray-400 text-gray-700 cursor-not-allowed border-gray-400" :
                                                "bg-white text-black border-black dark:bg-white dark:border-white dark:text-black"}`}
                                          >
                                            {value}
                                          </button>
                                        </div>
                                      )
                                  )}
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            {winnerSelected ?
                              <button
                                className={`text-xl font-mono italic border-2 rounded-xl py-2 px-6 mb-5 focus:outline-none ${proposalData.status === "Rejected"
                                  ? "bg-red-600 text-white"
                                  : "bg-green-600 text-white"
                                  }`}
                              >
                                Closed
                              </button>
                              :
                              <button onClick={() => winnersSelect()}
                                className={`text-xl font-mono italic border-2 rounded-xl py-2 px-6 mb-5 focus:outline-none bg-green-600 text-white`}
                              >
                                {calResult ? 'Getting ...' : 'Get Result'}
                              </button>
                            }
                            {winner &&
                              <>
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-black text-xl font-bold dark:text-white">
                                    {`Proposal Result: ${winner.correctOption}`}
                                  </span>
                                </div>
                                <div className="w-full bg-green-600 rounded-full h-2.5 dark:bg-green-500">
                                  <div
                                    className="bg-green-500 h-2.5 rounded-full"
                                    style={{ width: "100%" }}
                                  ></div>
                                </div>
                              </>
                            }
                            {proposalData.twoOptionType ? (
                              <div className="mt-2">
                                <h3 className="text-lg mb-2 font-bold text-black dark:text-white">
                                  Options:
                                </h3>
                                <div className="flex flex-col">
                                  <button className={`${winner && winner.correctOption == 'yes' ? 'bg-green-600 text-white' : "bg-white text-black"} text-xl font-mono italic border-2 border-black rounded-xl py-2 px-6 mb-5  dark:border-white focus:outline-none`}>
                                    Yes
                                  </button>
                                  <button className={`${winner && winner.correctOption == 'no' ? 'bg-green-600 text-white' : "bg-white text-black"} text-xl font-mono italic border-2 border-black rounded-xl py-2 px-6 mb-5 dark:border-white focus:outline-none`}>
                                    No
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="mt-2">
                                <h3 className="text-lg mb-2 font-bold text-black dark:text-white">
                                  Options:
                                </h3>
                                <div className="flex flex-col">
                                  {Object.entries(proposalData.options).map(
                                    ([key, value]) =>
                                      key.startsWith("op") && (
                                        <div key={key} className="mb-3">
                                          <button className={`${winner && winner.correctOption == value ? 'bg-green-600 text-white' : "bg-white text-black"} text-xl font-mono italic border-2 border-black rounded-xl py-2 px-6 w-full dark:bg-white dark:border-white focus:outline-none`}>
                                            {value}
                                          </button>
                                        </div>
                                      )
                                  )}
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </> :

        <section className={`section7 `}>
          <div className={`p-5`}>
            <div className="ml-3 mr-3"><div className="flex justify-center ">
              <div className="w-full bg-white max-w-lg mt-8 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
                <div className="p-8 animate-fadeInUp">
                  <h3 className="text-center text-xl text-gray-800 mb-4">Connect to your Wallet</h3>
                  <p className="text-lg">
                    Connecting your wallet allows you to securely use this application. You can create a new proposal, vote on an open proposal and get rewards.
                  </p>
                  <div className="flex justify-center mt-4">
                    <ConnectButton />
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </section>
      }
    </>
  );
};

export default Details;
