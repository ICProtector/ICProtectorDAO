import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Forms = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [topicName, setTopicName] = useState('');
    const [description, setDescription] = useState('');
    const [option, setOption] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
      e.preventDefault();
      // Process form data here
      console.log({ topicName, description, option, file });
    };

    useEffect(() => {
        // Function to update dark mode state
        const updateDarkMode = () => {
            const root = window.document.documentElement;
            const hasDarkClass = root.classList.contains('dark');
            setDarkMode(hasDarkClass);
        };

        // Initial update
        updateDarkMode();

        // Update dark mode state every 5 seconds
        const intervalId = setInterval(updateDarkMode, 100);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    const gradientClass = darkMode ? 'bg-gradient-to-r from-gray-950 to-gray-950' : 'bg-gradient-to-b from-orange-200 to-orange-500';
    const cardClass = darkMode
      ? 'bg-gray-800 text-white shadow-xl'
      : 'bg-white text-gray-900 shadow-xl';

    const inputClass = 'mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-indigo-500';
    const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-200 text-left py-1';
    const buttonClass = 'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600';

    return (
        <div className={`min-h-screen flex items-center justify-center ${gradientClass}`}>
            <div className={`max-w-md w-full p-3 rounded-lg ${cardClass}`}>
                <h2 className="text-2xl font-bold mb-4 text-center">Create Proposal</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="topicName" className={labelClass}>Topic Name</label>
                        <input
                            type="text"
                            id="topicName"
                            value={topicName}
                            onChange={(e) => setTopicName(e.target.value)}
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
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="option" className={labelClass}>Options</label>
                        <input
                            type="text"
                            id="option"
                            value={option}
                            onChange={(e) => setOption(e.target.value)}
                            className={`${inputClass} dark:bg-gray-700 dark:text-white`}
                        />
                    </div>
                    <div>
                        <label htmlFor="file" className={labelClass}>Choose File</label>
                        <input
                            type="file"
                            id="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-gray-600 dark:file:text-gray-200"
                        />
                    </div>
                    <button type="submit" className={buttonClass}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Forms;
