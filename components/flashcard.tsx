"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import wordList from "@/public/wordlists/ielts.json";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

export default function Flashcard() {
  const [wordData, setWordData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchNewWord = async () => {
    try {
      // Choose a random word from the JSON word list
      const randomWord =
        wordList.words[Math.floor(Math.random() * wordList.words.length)];

      // Fetch the word details from the dictionary API
      const dictionaryResponse = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`
      );
      setWordData(dictionaryResponse.data[0]);
      setError(null);
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        // If the word is not found, fetch another word
        fetchNewWord();
      } else {
        setError("Error fetching word data.");
      }
    }
  };

  useEffect(() => {
    fetchNewWord();
  }, []);

  return (
    <div className="flex flex-col items-center w-full md:w-[500px] min-h-[70vh] h-auto bg-slate-100 rounded-lg shadow p-4">
      <button
        onClick={fetchNewWord}
        className="p-4 rounded-full bg-slate-700 text-white hover:bg-slate-600 focus:outline-none fixed bottom-4"
      >
        <ArrowPathIcon className="h-6 w-6" />
      </button>
      {wordData ? (
        <div className="w-full flex flex-col items-center">
          <h2 className="text-center text-3xl my-2 capitalize">
            {wordData.word}
          </h2>
          <p className="mb-2">{wordData.phonetic}</p>

          {/* Render the audio player if audio is available */}
          {wordData.phonetics &&
          wordData.phonetics.length > 0 &&
          wordData.phonetics[0].audio ? (
            <div>
              <audio controls>
                <source src={wordData.phonetics[0].audio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ) : (
            // If no audio is available, show a button to search for the pronunciation on Google
            <a
              href={`https://www.google.com/search?q=${wordData.word}+pronunciation`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Search pronunciation on Google
            </a>
          )}

          {wordData.meanings.map((meaning: any, index: number) => (
            <div className="w-full mb-2" key={index}>
              <h4 className="text-slate-700 text-lg font-bold capitalize italic">
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
        </div>
      ) : (
        error && <p>{error}</p>
      )}
    </div>
  );
}
