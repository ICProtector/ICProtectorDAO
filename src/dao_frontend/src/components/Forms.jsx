import { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import ic from "ic0";
import Compressor from "compressorjs";
import { useConnect, ConnectButton } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";
import swal from "sweetalert";

const Forms = () => {
  const { darkMode } = useTheme();
  const [topicName, setTopicName] = useState("");
  const [description, setDescription] = useState("");
  const [optionCount, setOptionCount] = useState(2); // Default to two options
  const [options, setOptions] = useState(["Yes", "No"]); // Default to Yes and No
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [id, setId] = useState("");
  const [endtime, setEndtime] = useState(null);
  const [imageSource, setImageSource] = useState("file"); // 'file' or 'url'

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

  // const backend = ic.local("br5f7-7uaaa-aaaaa-qaaca-cai");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !topicName ||
      !description ||
      options.some((option) => !option) ||
      !endtime ||
      (!file && !imageURL)
    ) {
      swal({
        title: "Error",
        text: "Please fill all the fields.",
        icon: "error",
      });
      console.error("Please fill all the fields.");
      return;
    }

    // Check if end time is in the future
    const currentTime = new Date();
    if (endtime <= currentTime) {
      swal({
        title: "Error",
        text: "End time must be in the future.",
        icon: "error",
      });
      console.error("End time must be in the future.");
      return;
    }

    // Check if all options are filled if optionCount is 5
    if (optionCount === 5 && options.some((option) => !option)) {
      swal({
        title: "Error",
        text: "Please fill all 5 option fields.",
        icon: "error",
      });
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
    setSubmitting(true);
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
          "createProposal2",
          id,
          topicName,
          description,
          imageData,
          timestampInNanoseconds,
          val,
          pollOptions,
          Principal.fromText(principal)
        );
        if (response.length === 0) {
          swal({
            title: "Error",
            text: "A user can create 1 proposals in 48 hours.",
            icon: "error",
          });
          clearfunction();
        } else {
          swal({
            title: "Proposal Created",
            text: "The proposal is created and pending for approval of admin.",
            icon: "success",
          });
          clearfunction();
          console.log("Proposal Created:", response);
        }
      } else {
        swal({
          title: "Connect your wallet",
          icon: "success",
        });
      }
    } catch (error) {
      swal({
        title: "Error",
        text: error.message,
        icon: "error",
      });
      console.error("Error creating proposal:", error);
    }

    setSubmitting(false);
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

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${gradientClass} p-4`}
    >
      <div
        className={`max-w-2xl w-full bg-white dark:bg-gray-800 shadow-2xl rounded-lg p-6`}
      >
        {isConnected ? (
          <>
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
              Create Proposal
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 text-start">
                  Topic Name
                </label>
                <input
                  type="text"
                  value={topicName}
                  onChange={(e) => setTopicName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 text-start">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 text-start">
                  Number of Options
                </label>
                <select
                  value={optionCount}
                  onChange={(e) => updateOptionCount(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
                >
                  <option value={2}>Two</option>
                  <option value={5}>Five</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: optionCount }).map((_, index) => (
                  <div key={index} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 text-start">
                      Option {index + 1}
                    </label>
                    <input
                      type="text"
                      value={options[index] || ""}
                      onChange={(e) => {
                        const newOptions = [...options];
                        newOptions[index] = e.target.value;
                        setOptions(newOptions);
                      }}
                      placeholder={`Enter option ${index + 1}`}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 text-start">
                  Image Upload Method
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 dark:text-white">
                    <input
                      type="radio"
                      checked={imageSource === "file"}
                      onChange={() => setImageSource("file")}
                    />
                    <span>Upload File</span>
                  </label>
                  <label className="flex items-center space-x-2 dark:text-white">
                    <input
                      type="radio"
                      checked={imageSource === "url"}
                      onChange={() => setImageSource("url")}
                    />
                    <span>Enter URL</span>
                  </label>
                </div>
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
                    className="mt-1 block w-full text-sm dark:text-white text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-gray-600 dark:file:text-gray-200"
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
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                {submitting ? "Submitting" : "Submit"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-6">
            <h3 className="text-xl text-gray-900 dark:text-white">
              Connect to your Wallet
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Connecting your wallet allows you to securely use this
              application. You can create a new proposal, vote on an open
              proposal, and get rewards.
            </p>
            <ConnectButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default Forms;
