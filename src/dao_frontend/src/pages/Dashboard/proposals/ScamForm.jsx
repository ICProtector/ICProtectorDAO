import React, { useState } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import ic from 'ic0';
import '../../../components/loader.css';
import swal from 'sweetalert';

const ScamForm = () => {
    const { darkMode } = useTheme();
    const [topicName, setTopicName] = useState('');
    const [siteUrl, setSiteUrl] = useState('');
    const [description, setDescription] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const backendCanisterId = "7wzen-oqaaa-aaaap-ahduq-cai";
    const backend = ic(backendCanisterId);

    // const backend = ic.local("br5f7-7uaaa-aaaaa-qaaca-cai");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        callCreateScam();
    };

    const callCreateScam = async () => {
        setSubmitting(true);
        try {
            const response = await backend.call(
                "addScamEntry",
                topicName,
                description,
                siteUrl
            );

            swal({
                title: 'Scam Added to the list.',
                icon: 'success'
            });
            console.log("Scam Added Successfully", response);
        } catch (error) {
            swal({
                title: error,
                icon: 'error'
            });
            console.error("Error adding scamm:", error);
        }
        setSubmitting(false);
    };
    const cardClass = darkMode ? 'bg-gray-800 text-white shadow-xl' : 'bg-white text-gray-900 shadow-xl';
    const inputClass = 'mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-indigo-500';
    const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-200 text-left py-1';


    return (
        <>
            <div className="p-4 sm:ml-64 dark:bg-gray-800" style={{ minHeight: '100vh' }}>
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 ">
                    <div className="bg-white rounded-lg md:p-8 dark:bg-gray-800" id="stats" role="tabpanel" aria-labelledby="stats-tab">
                        <div className={`min-h-screen flex items-center  justify-center `}>
                            <div className={`max-w-md w-full p-3 border-2 border-gray-200 dark:border-white rounded-lg ${cardClass}`}>
                                <h2 className="text-2xl font-bold mb-4 text-center">Add Scams Sites</h2>
                                <form onSubmit={handleSubmit} className="space-y-4">

                                    <div>
                                        <label htmlFor="topicName" className={labelClass}>Site Name</label>
                                        <input
                                            type="text"
                                            id="topicName"
                                            value={topicName}
                                            onChange={(e) => setTopicName(e.target.value)}
                                            className={`${inputClass} dark:bg-gray-700 dark:text-white`}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="url" className={labelClass}>Site URL</label>
                                        <input
                                            type="text"
                                            id="url"
                                            value={siteUrl}
                                            onChange={(e) => setSiteUrl(e.target.value)}
                                            className={`${inputClass} dark:bg-gray-700 dark:text-white`}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="description" className={labelClass}>Description</label>
                                        <textarea
                                            id="description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className={`${inputClass} dark:bg-gray-700 dark:text-white`}
                                            rows="4"
                                        />
                                    </div>
                                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600">
                                        {submitting ? "Submitting" : "Submit"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ScamForm;
