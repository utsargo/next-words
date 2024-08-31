"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import wordList from "@/public/wordlists/ielts.json";
import {
  ArrowPathIcon,
  AdjustmentsVerticalIcon,
} from "@heroicons/react/24/solid";
import Papa from "papaparse";
import Link from "next/link";

export default function Flashcard() {
  const [wordData, setWordData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isButtonRotating, setIsButtonRotating] = useState(false);
  const [customWordList, setCustomWordList] = useState<string[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pasteInput, setPasteInput] = useState<string>("");

  // Fetch the custom wordlist from localStorage
  useEffect(() => {
    const storedWordList = localStorage.getItem("customWordList");
    if (storedWordList) {
      setCustomWordList(JSON.parse(storedWordList));
    }
    fetchNewWord();
  }, []);

  const fetchNewWord = async () => {
    if (!navigator.onLine) {
      // Offline mode: use saved word data
      const savedWords = JSON.parse(
        localStorage.getItem("browsedWords") || "[]"
      );
      if (savedWords.length > 0) {
        const randomIndex = Math.floor(Math.random() * savedWords.length);
        setWordData(savedWords[randomIndex]);
        setError(null); // Clear any previous error
      } else {
        setError(
          "No word data available offline. Please go online to fetch words."
        );
      }
      setIsFlipping(false);
      setIsButtonRotating(false);
      return;
    }

    // Online mode: Fetch from API
    setIsFlipping(true); // Start card flip animation
    setIsButtonRotating(true); // Start button rotate animation

    setTimeout(async () => {
      try {
        // Choose a random word from either the custom wordlist or the default one
        const words = customWordList || wordList.words;
        const randomWord = words[Math.floor(Math.random() * words.length)];

        const dictionaryResponse = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`
        );

        setWordData(dictionaryResponse.data[0]);
        setError(null);

        // Save word data to local storage
        const savedWords = JSON.parse(
          localStorage.getItem("browsedWords") || "[]"
        );
        savedWords.push(dictionaryResponse.data[0]);
        localStorage.setItem("browsedWords", JSON.stringify(savedWords));
      } catch (err: any) {
        if (err.response && err.response.status === 404) {
          fetchNewWord(); // Retry with another word if not found
        } else {
          setError("Error fetching word data.");
        }
      }
      setIsFlipping(false); // End card flip animation
      setIsButtonRotating(false); // End button rotate animation
    }, 300); // Duration of the animations
  };

  // Handle file upload and CSV parsing
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      Papa.parse(file, {
        complete: (results: any) => {
          const parsedWords = results.data
            .map((row: any) => row[0]?.trim()) // Ensures words are trimmed and not undefined
            .filter(Boolean); // Removes any empty strings or falsy values

          if (parsedWords.length > 0) {
            localStorage.setItem("customWordList", JSON.stringify(parsedWords));
            setCustomWordList(parsedWords);
            setIsModalOpen(false);
          } else {
            alert("The uploaded CSV file is empty or not formatted correctly.");
          }
        },
        error: (error) => {
          console.error("Error parsing CSV file:", error);
          alert("An error occurred while parsing the CSV file.");
        },
        header: false,
        skipEmptyLines: true, // Skips empty lines in the CSV
      });
    }
  };

  // Handle pasted input
  const handlePasteInput = () => {
    // Split by comma or new line, trim whitespace
    const words = pasteInput
      .split(/[\n,]+/)
      .map((word) => word.trim())
      .filter(Boolean);
    localStorage.setItem("customWordList", JSON.stringify(words));
    setCustomWordList(words);
    setPasteInput("");
    setIsModalOpen(false);
  };

  // Function to export the current word list from localStorage
  const exportWordList = () => {
    const wordListToExport = customWordList || wordList.words;
    const csvContent =
      "data:text/csv;charset=utf-8," + wordListToExport.join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "wordlist.csv");
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
  };

  // Handle resetting to the default wordlist
  const handleResetWordList = () => {
    localStorage.removeItem("customWordList");
    setCustomWordList(null);
    setIsModalOpen(false);
    fetchNewWord(); // Fetch a new word from the default wordlist
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
            <h2 className="text-xl font-bold mb-4 dark:text-white">
              Wordlist Options
            </h2>
            <div className="flex flex-col gap-1 mb-4">
              <label htmlFor="fileInput">Upload a CSV file:</label>
              <input
                type="file"
                id="fileInput"
                accept=".csv"
                onChange={handleFileUpload}
              />
            </div>
            <p className="mb-4">Or</p>
            <textarea
              value={pasteInput}
              onChange={(e) => setPasteInput(e.target.value)}
              placeholder="Paste your word list here, separated by commas or one word per line"
              className="w-full p-2 border rounded mb-4 text-slate-900"
              rows={4}
            />
            <button
              title="Save Pasted Word List"
              onClick={handlePasteInput}
              className="w-full p-2 mb-4 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save Pasted Word List
            </button>
            <button
              title="Export Current Wordlist"
              onClick={exportWordList}
              className="w-full p-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Export Current Wordlist
            </button>

            <button
              title="Reset to Default Wordlist"
              onClick={handleResetWordList}
              className="w-full p-2 mb-4 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Reset to Default Wordlist
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Button to open the modal */}
      <button
        title="Wordlist Options"
        onClick={() => setIsModalOpen(true)}
        className="p-2 bg-slate-500 text-white rounded hover:bg-slate-600 right-4 bottom-4 fixed"
      >
        <AdjustmentsVerticalIcon className="h-5 w-5" />
      </button>
      {/* Flashcard container */}
      <div
        className={`flex flex-col items-center w-full md:w-[500px] min-h-[70vh] h-auto bg-slate-100 dark:bg-gray-800 dark:text-white rounded-lg shadow p-4 transition-transform duration-500 ${
          isFlipping ? "rotate-y-180" : ""
        }`}
      >
        {/* Display word information */}
        {wordData ? (
          <div className="w-full flex flex-col items-center">
            <h2 className="text-center text-3xl my-2 capitalize">
              {wordData.word}
            </h2>
            <p className="mb-2">{wordData.phonetic}</p>

            {/* Render the audio player if available */}
            {wordData.phonetics &&
            wordData.phonetics.length > 0 &&
            wordData.phonetics[0].audio ? (
              <div className="w-full flex justify-center">
                <audio
                  key={wordData.phonetics[0].audio} // This ensures the audio player is re-rendered with the new audio source
                  className="max-w-[80%]"
                  controls
                >
                  <source src={wordData.phonetics[0].audio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            ) : (
              <Link
                href={`https://www.google.com/search?q=${wordData.word}+pronunciation`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Search pronunciation on Google
              </Link>
            )}

            {/* Display meanings, synonyms, and antonyms */}
            {wordData.meanings.map((meaning: any, index: number) => (
              <div className="w-full mb-2" key={index}>
                <h4 className="text-slate-700 dark:text-gray-300 text-lg font-bold capitalize italic">
                  {`[${meaning.partOfSpeech}]`}
                </h4>
                <p>{meaning.definitions[0].definition}</p>
                {meaning.definitions[0].example && (
                  <p>Example: {meaning.definitions[0].example}</p>
                )}

                {/* Display synonyms */}
                {meaning.synonyms && meaning.synonyms.length > 0 && (
                  <div className="w-full">
                    <strong>Synonyms:</strong> {meaning.synonyms.join(", ")}
                  </div>
                )}

                {/* Display antonyms */}
                {meaning.antonyms && meaning.antonyms.length > 0 && (
                  <div className="w-full">
                    <strong>Antonyms:</strong> {meaning.antonyms.join(", ")}
                  </div>
                )}
              </div>
            ))}
            <Link
              href={`https://www.dictionary.com/browse/${wordData.word}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-gray-600 dark:hover:bg-gray-500"
            >
              More on Dictionary.com
            </Link>
          </div>
        ) : (
          error && <p>{error}</p>
        )}
      </div>

      {/* Fetch new word button */}
      <button
        title="Fetch New Word"
        onClick={fetchNewWord}
        className={`p-4 rounded-full bg-slate-700 dark:bg-gray-600 text-white hover:bg-slate-600 dark:hover:bg-gray-500 focus:outline-none fixed bottom-4 transition-transform duration-500 ${
          isButtonRotating ? "rotate-button" : ""
        }`}
      >
        <ArrowPathIcon className="h-6 w-6" />
      </button>
    </>
  );
}
