// eslint-disable-next-line no-unused-vars
import React, { useState,useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import SqlModal from "../Components/sqlModal";;
import "tailwindcss/tailwind.css"; // Import Tailwind CSS
import {useSelector} from 'react-redux';
import axios from 'axios';
const SqlGen = () => {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyB1SHupOSqhJ-OnaIZ5JKa0NNBd8uvBCF8"
  );
  const [prompts, setPrompts] = useState("");
  const [finalResponse, setFinalResponse] = useState("");
  const [selectedOption, setSelectedOption] = useState("sql");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
const user = useSelector(state => state.auth);

  const options = ["sql", "html"];

  const getResponse = async () => {
    setLoading(true);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const languagePrompt = `Generate a ${selectedOption} code snippet to`;

    const executionPrompt = `execute the following task: ${prompts}. 
    Ensure that the generated code strictly adheres to the ${selectedOption} language syntax dont use any other language inside the syntax. 
    If the generated code contains any language other than ${selectedOption}, consider it incorrect.`;

    const prompt = `${languagePrompt}\n${executionPrompt}`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      await axios.post('http://localhost:5000/api/prompt/add', { prompt: prompt, email: user.email})
      const modifiedText =
        selectedOption === "sql" ? text.substring(6, text.length - 3) : text.substring(7, text.length - 3);

      console.log("modifiedText", modifiedText);
      setFinalResponse(modifiedText);
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center  p-4 bg-black text-white min-h-screen relative">
      <SqlModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      <button className="absolute top-4 left-10 text-2xl px-5 py-3 bg-blue-500 hover:bg-blue-700 text-white rounded-xl" onClick={() => { setIsModalOpen(!isModalOpen) }}>History</button>
      <h1 className="text-3xl font-bold mb-4">Code Generator</h1>
      <select
        className="px-3 py-1 mb-2 border rounded bg-gray-800 text-white"
        value={selectedOption}
        onChange={(e) => {
          setSelectedOption(e.target.value);
        }}
      >
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>

      <textarea
        className="p-4 border rounded w-[80%] max-h-[150px] min-h-[150px]  overflow-y-auto mb-4 bg-gray-800 text-white"
        value={prompts}
        onChange={(e) => {
          setPrompts(e.target.value);
        }}
        placeholder="Enter prompts here..."
      />
      {loading ? (<div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white mb-4"></div>) : (
        <pre className={`p-4 border ${finalResponse.length === 0 ? 'hidden' : 'block'} rounded w-[80%] max-h-[300px] overflow-y-auto  bg-gray-800`}>{finalResponse}</pre>
      )}
      <button
        className={`bg-blue-500 text-white py-2 px-4 mt-5 rounded hover:bg-blue-700 ${loading && "opacity-50 cursor-not-allowed"
          }`}
        onClick={getResponse}
        disabled={loading}
      >
        {loading ? "Generating..." : "Get Response"}
      </button>

    </div>
  );
};

export default SqlGen;
