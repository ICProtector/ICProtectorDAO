import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import ic from 'ic0';
import Compressor from 'compressorjs';

const Forms = () => {
    const { darkMode } = useTheme();
    const [topicName, setTopicName] = useState('');
    const [description, setDescription] = useState('');
    const [optionCount, setOptionCount] = useState(2); // Default to two options
    const [options, setOptions] = useState(['Yes', 'No']); // Default to Yes and No
    const [file, setFile] = useState(null);
    const [id, setId] = useState("");
    const [endtime, setEndtime] = useState(null);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    // const [id, setId] = useState(generateRandomId());
    useEffect(() => {
        setId(generateRandomId());
    }, []);

    useEffect(() => {
        // Update endtime whenever date or time changes
        if (date && time) {
            const combinedDateTime = new Date(`${date}T${time}`);
            setEndtime(combinedDateTime);
        }
    }, [date, time]);
    // Function to generate a random ID
    const generateRandomId = () => {
        const randomNumber = Math.floor(Math.random() * 10000000000); // Generate a random number between 0 and 9999999999
        return randomNumber.toString(); // Convert the random number to a string
    };
    const backendCanisterId = 'bkyz2-fmaaa-aaaaa-qaaaq-cai';
    const backend = ic.local(backendCanisterId);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!topicName || !description || options.some(option => !option) || !endtime) {
            console.error('Please fill all the fields.');
            return;
        }
    
        // Check if end time is in the future
        const currentTime = new Date();
        if (endtime <= currentTime) {
            console.error('Please select a future end time.');
            return;
        }
    
        // Check if all options are filled if optionCount is 5
        if (optionCount === 5 && options.some(option => !option)) {
            console.error('Please fill all 5 option fields.');
            return;
        }
        console.log({ topicName, description, options, file });
        if (file) {
            callCreateProposal(file);
        } else {
            callCreateProposal('');
        }
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            new Compressor(file, {
                quality: 0.6, // Adjust the quality as needed
                success(compressedResult) {
                    const reader = new FileReader();
                    reader.readAsDataURL(compressedResult); // This converts the image to base64
                    reader.onload = () => {
                        setFile(reader.result); // Sets the compressed base64 string to state
                        console.log('Base64 Image Data:', reader.result); // Log base64 data
                    };
                    reader.onerror = (error) => {
                        console.error('Error reading file:', error);
                    };
                },
                error(err) {
                    console.error('Error compressing file:', err);
                },
            });
        }
    };
    const callCreateProposal = async () => {
        try {
            const pollOptions = {
                op1: "Option 1",
                count1: 10,
                op2: "Option 2",
                count2: 20,
                op3: "Option 3",
                count3: 5,
                op4: "Option 4",
                count4: 7,
                op5: "Option 5",
                count5: 3
            };
            let val; // Declare val outside of the if block
            if (optionCount === 2) {
                val = true;
            } else {
                val = false;
                for (let i = 0; i < optionCount; i++) {
                    pollOptions[`op${i + 1}`] = options[i] || `Option ${i + 1}`; // Use input value if available, otherwise use default
                    pollOptions[`count${i + 1}`] = 0; // Initialize count to 0
                }
            }
            if (endtime === null) {
                console.error('Please select end time');
                return;
            }
            let  timestampInNanoseconds;
            if (endtime) {
                const timestampInMilliseconds = endtime.getTime();
                 timestampInNanoseconds = BigInt(timestampInMilliseconds) * BigInt(1000000);  // Convert to nanoseconds
                console.log('End Time Timestamp:', timestampInNanoseconds.toString() + 'n');
            } else {
                console.error('End time is not set.');
                return;
            }
            const response = await backend.call("createProposal",
                id, topicName, description, "", 0, timestampInNanoseconds, val, pollOptions)
            console.log('Proposal Created:', response);
        } catch (error) {
            console.error('Error creating proposal:', error);
        }
    };
    // const generateRandomId = () => {
    //     return Math.random().toString(36).substr(2, 10);
    // };

    const updateOptionCount = (count) => {
        setOptionCount(count);
        if (count === 2) {
            setOptions(['Yes', 'No']);
        } else {
            setOptions(Array(5).fill('')); // Create five empty strings
        }
    };

    const updateOption = (value, index) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const gradientClass = darkMode ? 'bg-gradient-to-r from-gray-950 to-gray-950' : 'bg-gradient-to-b from-orange-200 to-orange-500';
    const cardClass = darkMode ? 'bg-gray-800 text-white shadow-xl' : 'bg-white text-gray-900 shadow-xl';
    const inputClass = 'mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-indigo-500';
    const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-200 text-left py-1';

    return (
        <div className={`min-h-screen flex items-center p-4 justify-center ${gradientClass}`}>
            <div className={`max-w-lg w-full p-3 rounded-lg ${cardClass}`}>
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
                        />
                    </div>
                    <div>
                        <label className={labelClass}>Number of Options</label>
                        <select
                            onChange={(e) => updateOptionCount(Number(e.target.value))}
                            className={inputClass}
                            defaultValue={2}
                        >
                            <option value={2}>Two</option>
                            <option value={5}>Five</option>
                        </select>
                    </div>
                    {options.map((option, index) => (
                        <div key={index} className="flex items-center">
                            <input
                                type="text"
                                value={option}
                                placeholder={`Option ${index + 1}`}
                                onChange={(e) => updateOption(e.target.value, index)}
                                className={`${inputClass} dark:bg-gray-700 dark:text-white flex-grow`}
                            />
                        </div>
                    ))}
                    <div>
                        <label htmlFor="endtime" className={labelClass}>End Time</label>
                        <input
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                />
                <input
                    type="time"
                    onChange={(e) => setTime(e.target.value)}
                />
                    </div>
                    <div>
                        <label htmlFor="file" className={labelClass}>Choose File</label>
                        <input
                            type="file"
                            id="file"
                            onChange={handleFileChange}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-gray-600 dark:file:text-gray-200"
                        />
                    </div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Forms;
