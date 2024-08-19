"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function FlashCard() {
  const [wordData, setWordData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchNewWord = async () => {
    try {
      // Fetch a random word from the random-word API
      const randomWordResponse = await axios.get(
        "https://random-word-api.herokuapp.com/word"
      );
      const randomWord = randomWordResponse.data[0]; // The word is returned as an array

      // Fetch the word details from the dictionary API
      const dictionaryResponse = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`
      );
      setWordData(dictionaryResponse.data[0]);
      setError(null);
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        // If the word is not found, fetch a new word
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
    <div className="flex flex-col items-center w-full md:w-3/5">
      <button
        className="bg-green-700 text-slate-50 text-2xl rounded hover:bg-green-600 p-2"
        onClick={fetchNewWord}
      >
        New Word
      </button>
      {wordData ? (
        <div className="w-full flex flex-col items-center">
          <h2 className="text-center text-3xl">{wordData.word}</h2>
          <p>
            <strong>Pronunciation:</strong> {wordData.phonetic}
          </p>

          {/* Render the audio player if audio is available */}
          {wordData.phonetics &&
            wordData.phonetics.length > 0 &&
            wordData.phonetics[0].audio && (
              <div>
                <audio controls>
                  <source src={wordData.phonetics[0].audio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}

          {wordData.meanings.map((meaning: any, index: number) => (
            <div className="w-full mb-2" key={index}>
              <h4 className="text-slate-800 text-lg font-bold">
                {`(${meaning.partOfSpeech})`}
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
