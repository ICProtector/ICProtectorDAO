import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '/logoo.png';
import icp from '/icp.png';
import { useTheme } from '../contexts/ThemeContext'; 
import ic from 'ic0';
import './loader.css'

const ScamContent = () => {
    const { darkMode, toggleTheme } = useTheme();
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(false);
    const backendCanisterId = '7wzen-oqaaa-aaaap-ahduq-cai';
    const backend = ic(backendCanisterId);

    const fetchScamList = async () => {
        setLoading(true);
        try {
            const result = await backend.call("listScamEntries");
            console.log(result);
            setProposals(result);
        } catch (error) {
            console.error("Error fetching proposal data:", error);
        } finally {
            setLoading(false);
        }
    };

  
    useEffect(() => {
        fetchScamList();
    }, []);

    // Function to filter proposals based on status

    const myStyle = {
        translate: 'none',
        rotate: 'none',
        scale: 'none',
        opacity: 1,
        transform: 'translate(0px, 0px)'
    };
    const gradientClass = darkMode ? 'bg-gradient-to-r from-gray-950 to-gray-950' : 'bg-gradient-to-b from-orange-200 to-orange-500';
    const buttonClass = darkMode ? 'bg-gradient-to-r from-red-600 to-red-900' : 'bg-gradient-to-r from-red-400 to-red-600';

    return (
        <>
            <section className={`section7 `}>
                <div className={`p-5`}>
                    <div className="ml-3 mr-3">
                        <div className="flex flex-row mb-3 mt-5 justify-between items-center">
                            <h1 className="text-3xl font-bold text-left dark:text-white">
                                ICP Scam List
                            </h1>
                            <div className="flex items-center">
                            </div>
                        </div>

                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        {loading ? (
                            <div className="flex justify-center items-center">
                                <div className="loader"></div>
                            </div>
                        ) : proposals.length > 0 ? (
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="text-center px-6 py-3 w-1">
                                            #
                                        </th>
                                        <th scope="col" className=" text-center px-6 py-3 w-1/6">
                                            Title
                                        </th>
                                        <th scope="col" className="text-center px-6 py-3 w-3/6">
                                            Description
                                        </th>
                                        <th scope="col" className="text-center px-6 py-3 w-2/6">
                                            URL
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='mt-2'>
                                {proposals.map((proposal, index) => (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td scope="row" className=" text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-1">
                                                {index+1}
                                            </td>
                                            <td className="text-center px-6 py-4 w-1/6">
                                                {proposal.title}
                                            </td>
                                            <td className="px-6 py-4 w-3/6">
                                                {proposal.description}
                                            </td>
                                            <td className="text-center px-6 py-4 w-2/6">
                                                <a href={proposal.url} className="text-blue-500 underline">
                                                    {proposal.url}
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>                            
                        ) : <p className="text-black dark:text-white text-lg">No Scam to display.</p>}
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default ScamContent;
