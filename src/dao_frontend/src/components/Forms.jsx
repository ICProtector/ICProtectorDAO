import { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import ic from "ic0";
import Compressor from "compressorjs";
import { useConnect } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";

const Forms = () => {
  const { darkMode } = useTheme();
  const [topicName, setTopicName] = useState("");
  const [description, setDescription] = useState("");
  const [optionCount, setOptionCount] = useState(2); // Default to two options
  const [options, setOptions] = useState(["Yes", "No"]); // Default to Yes and No
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [id, setId] = useState("");
  const [endtime, setEndtime] = useState(null);
  const [imageSource, setImageSource] = useState("file"); // 'file' or 'url'

  const [alertInfo, setAlertInfo] = useState({
    show: false,
    type: "",
    message: "",
  });
  const { isConnected, principal, activeProvider } = useConnect({
    onConnect: () => {
      // Signed in
    },
    onDisconnect: () => {
      // Signed out
    },
  });

  useEffect(() => {
    setId(generateRandomId());
    // Set end time to three days from the current time
    const currentTime = new Date();
    const endTime = new Date(currentTime.getTime() + 3 * 24 * 60 * 60 * 1000); // Add three days in milliseconds
    setEndtime(endTime);
  }, []);

  // Function to generate a random ID
  const generateRandomId = () => {
    const randomNumber = Math.floor(Math.random() * 10000000000); // Generate a random number between 0 and 9999999999
    return randomNumber.toString(); // Convert the random number to a string
  };

  const backendCanisterId = "7wzen-oqaaa-aaaap-ahduq-cai";
  const backend = ic(backendCanisterId);

  const handleSubmit = (e) => {
    e.preventDefault();

    window.scrollTo(0, 0);
    if (
      !topicName ||
      !description ||
      options.some((option) => !option) ||
      !endtime ||
      (!file && !imageURL)
    ) {
      setAlertInfo({
        show: true,
        type: "error",
        message: "Please fill all the fields.",
      });
      setTimeout(() => setAlertInfo(false), 5000);
      console.error("Please fill all the fields.");
      return;
    }

    // Check if end time is in the future
    const currentTime = new Date();
    if (endtime <= currentTime) {
      setAlertInfo({
        show: true,
        type: "error",
        message: "End time must be in the future.",
      });
      setTimeout(() => setAlertInfo(false), 5000);
      console.error("End time must be in the future.");
      return;
    }

    // Check if all options are filled if optionCount is 5
    if (optionCount === 5 && options.some((option) => !option)) {
      setAlertInfo({
        show: true,
        type: "error",
        message: "Please fill all 5 option fields.",
      });
      setTimeout(() => setAlertInfo(false), 5000);
      console.error("Please fill all 5 option fields.");
      return;
    }
    const imageData = file ? file : imageURL;
    if (imageData) {
      callCreateProposal(imageData);
    } else {
      callCreateProposal("");
    }
    console.log({ topicName, description, options, file, imageData });
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
            console.log("Base64 Image Data:", reader.result); // Log base64 data
          };
          reader.onerror = (error) => {
            console.error("Error reading file:", error);
          };
        },
        error(err) {
          console.error("Error compressing file:", err);
        },
      });
    }
  };

  const callCreateProposal = async (imageData) => {
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
        count5: 3,
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
        console.error("End time is not set.");
        return;
      }
      const timestampInMilliseconds = endtime.getTime();
      const timestampInNanoseconds =
        BigInt(timestampInMilliseconds) * BigInt(1000000); // Convert to nanoseconds
      console.log(
        "End Time Timestamp:",
        timestampInNanoseconds.toString() + "n"
      );
      if (isConnected) {
        const response = await backend.call(
          "createProposal",
          id,
          topicName,
          description,
          imageData,
          0,
          timestampInNanoseconds,
          val,
          pollOptions,
          Principal.fromText(principal)
        );
        if (response.length === 0) {
          setAlertInfo({
            show: true,
            type: "error",
            message: "A user can create five proposals a day.",
          });
          setTimeout(() => setAlertInfo(false), 5000);
          clearfunction();
        } else {
          setAlertInfo({
            show: true,
            type: "success",
            message: "Proposal Created.",
          });
          setTimeout(() => setAlertInfo(false), 5000);
          clearfunction();
          console.log("Proposal Created:", response);
        }
      } else {
        alert("Connect your wallet");
      }
    } catch (error) {
      setAlertInfo({ show: true, type: "error", message: error.message });
      setTimeout(() => setAlertInfo(false), 5000);
      console.error("Error creating proposal:", error);
    }
  };

  const clearfunction = () => {
    setTopicName("");
    setDescription("");
    setOptionCount(2);
    setOptions(["Yes", "No"]);
    setFile(null);
    setId(generateRandomId());
    // Reset end time to three days from the current time
    const currentTime = new Date();
    const endTime = new Date(currentTime.getTime() + 3 * 24 * 60 * 60 * 1000);
    setEndtime(endTime);
  };

  const updateOptionCount = (count) => {
    setOptionCount(count);
    if (count === 2) {
      setOptions(["Yes", "No"]);
    } else {
      setOptions(Array(5).fill("")); // Create five empty strings
    }
  };

  const updateOption = (value, index) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const gradientClass = darkMode
    ? "bg-gradient-to-r from-gray-950 to-gray-950"
    : "bg-gradient-to-b from-orange-200 to-orange-500";
  const cardClass = darkMode
    ? "bg-gray-800 text-white shadow-xl"
    : "bg-white text-gray-900 shadow-xl";
  const inputClass =
    "mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-indigo-500";
  const labelClass =
    "block text-sm font-medium text-gray-700 dark:text-gray-200 text-left py-1";

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

  return (
    <div
      className={`min-h-screen flex items-center p-4 justify-center ${gradientClass}`}
    >
      <div className={`max-w-lg w-full p-3 rounded-lg ${cardClass}`}>
        <h2 className="text-2xl font-bold mb-4 text-center">Create Proposal</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {alertInfo.show && (
            <div
              style={{
                padding: "1rem",
                marginBottom: "1rem",
                borderRadius: "0.25rem",
                backgroundColor: alertStyles[alertInfo.type].backgroundColor,
                color: alertStyles[alertInfo.type].color,
              }}
              role="alert"
            >
              {alertInfo.message}
            </div>
          )}
          <div>
            <label htmlFor="topicName" className={labelClass}>
              Topic Name
            </label>
            <input
              type="text"
              id="topicName"
              value={topicName}
              onChange={(e) => setTopicName(e.target.value)}
              className={`${inputClass} dark:bg-gray-700 dark:text-white`}
            />
          </div>
          <div>
            <label htmlFor="description" className={labelClass}>
              Description
            </label>
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
              className={`${inputClass} dark:bg-gray-700 dark:text-white`}
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
          <div>Choose a file or enter image url</div>
          {/* <div>
            <label htmlFor="file" className={labelClass}>
              Choose File
            </label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-gray-600 dark:file:text-gray-200"
            />
          </div>
          <div>
            <label htmlFor="imageURL" className={labelClass}>
              Image URL
            </label>
            <input
              type="text"
              id="imageURL"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              className={`${inputClass} dark:bg-gray-700 dark:text-white`}
            />
          </div> */}
          <div>
            <div className="mb-4">
              <label>
                <input
                  type="radio"
                  name="imageSource"
                  value="file"
                  checked={imageSource === "file"}
                  onChange={() => setImageSource("file")}
                />{" "}
                Upload File
              </label>
              <label className="ml-4">
                <input
                  type="radio"
                  name="imageSource"
                  value="url"
                  checked={imageSource === "url"}
                  onChange={() => setImageSource("url")}
                />{" "}
                Enter URL
              </label>
            </div>

            {imageSource === "file" ? (
              <div>
                <label htmlFor="file" className={labelClass}>
                  Choose File
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-gray-600 dark:file:text-gray-200"
                />
              </div>
            ) : (
              <div>
                <label htmlFor="imageURL" className={labelClass}>
                  Image URL
                </label>
                <input
                  type="text"
                  id="imageURL"
                  value={imageURL}
                  onChange={(e) => setImageURL(e.target.value)}
                  className={`${inputClass} dark:bg-gray-700 dark:text-white`}
                />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forms;
