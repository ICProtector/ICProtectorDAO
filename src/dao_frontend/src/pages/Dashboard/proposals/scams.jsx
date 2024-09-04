import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import ic from 'ic0';
import '../../../components/loader.css'

const ScamContent = () => {
    const { darkMode, toggleTheme } = useTheme();
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState({});

    const backendCanisterId = "7wzen-oqaaa-aaaap-ahduq-cai";
    const backend = ic(backendCanisterId);

    // const backend = ic.local("br5f7-7uaaa-aaaaa-qaaca-cai");


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
    const Delete = async (id) => {
        setDeleting((prevState) => ({
            ...prevState,
            [id]: true,
        }));
        try {
            const result = await backend.call("removeScamEntry", Number(id));
            console.log(result);
            fetchScamList();
            swal({
                title:'Scam Delete Successfully.',
                icon:'success'
            });

        } catch (error) {
            console.error("Error deleting scam entry:", error);            
            swal({
                title:'Error deleting scam.',
                text:error,
                icon:'error'
            });
        }
        setDeleting((prevState) => ({
            ...prevState,
            [id]: true,
        }));
    };
    useEffect(() => {
        fetchScamList();
    }, []);

    return (
        <>
            <div className="p-4 sm:ml-64 dark:bg-gray-800" style={{ minHeight: '100vh' }}>
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                    <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="stats" role="tabpanel" aria-labelledby="stats-tab">
                        <div className="flex flex-row mb-3  justify-between items-center">
                            <h1 className="text-3xl font-bold text-left dark:text-white">
                                Scam Lists
                            </h1>
                            <div className="flex items-center">
                                <Link to="/admin/add-scams">
                                    <button

                                        type="button"
                                        className={`text-white font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none focus:ring-4 bg-green-500 hover:bg-green-600 border-green-600 focus:ring-green-300'}`}
                                    >
                                        Add Scams to List
                                    </button>
                                </Link>
                            </div>
                        </div>
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

                                        <th scope="col" className="text-center px-6 py-3 w-2/6">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='mt-2'>
                                    {proposals.map((proposal, index) => (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td scope="row" className=" text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-1">
                                                {index + 1}
                                            </td>
                                            <td className="text-center px-6 py-4 w-1/6">
                                                {proposal.title}
                                            </td>
                                            <td className="px-6 py-4 w-3/6">
                                                {proposal.description}
                                            </td>
                                            <td className="text-center px-6 py-4 w-2/6">
                                                <a href={proposal.url} target='blank' className="text-blue-500 underline">
                                                    {proposal.url}
                                                </a>
                                            </td>
                                            <td className="text-center px-6 py-4 w-2/6">
                                                <button
                                                    onClick={() => Delete(proposal.id)}
                                                    type="button"
                                                    className={`text-white font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none focus:ring-4 bg-red-500 hover:bg-red-600 border-red-600 focus:ring-red-300' }`}                                            >
                                                    {deleting[proposal.id] ? "Deleting ..." : "Delete"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : <p className="text-black dark:text-white text-lg">No Scam to display.</p>}
                    </div>

                </div>
            </div>
        </>
    );
};

export default ScamContent;
