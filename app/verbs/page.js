"use client";
import { useState, useEffect } from 'react';

export default function Flashcards() {
  const [flashcardsData, setFlashcardsData] = useState({ data: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Fetch data from API when the component mounts
  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await fetch('/api/verbs');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        setFlashcardsData(data);
        setLoading(false); // Data has been successfully loaded
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, []);

 // Handle 'Next' button click
 const handleNext = () => {
  setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcardsData.data.length);
  setIsFlipped(false); // Reset flip state when switching cards
};

// Handle 'Previous' button click
const handlePrevious = () => {
  setCurrentIndex((prevIndex) =>
    (prevIndex - 1 + flashcardsData.data.length) % flashcardsData.data.length
  );
  setIsFlipped(false); // Reset flip state when switching cards
};

// Handle flip card action
const handleFlip = () => {
  setIsFlipped(!isFlipped);
};

if (loading) {
  return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
}

if (error) {
  return <div className="min-h-screen flex items-center justify-center">Error: {error}</div>;
}

const flashcard = flashcardsData.data[currentIndex];

return (
  <div className="flex items-center justify-center flex-col mt-24">
    <div className="border-s-green-600 w-[360px] h-[500px] bg-white items-center rounded-2xl shadow-lg p-4 bg-gradient-to-r from-violet-200 to-pink-200">
    {/* Flashcard */}
    <div
      className={`p-6 cursor-pointer transition-transform transform h-[410px] ${isFlipped ? 'rotate-y-180' : ''}`}
      onClick={handleFlip}
      style={{ perspective: 1000 }}
    >
      {/* Front Side - English Verb */}
      <div className={`bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent w-full h-full flex justify-center items-center ${isFlipped ? 'hidden' : ''}`}>
        <h2 className="text-2xl font-bold">{flashcard.english_verb}</h2>
      </div>

      {/* Back Side - German Verb, Simple Past, Past Participle */}
      <div className={`bg-gradient-to-r from-purple-500 to-purple-900 bg-clip-text text-transparent w-full h-full flex flex-col justify-center items-center transform rotate-y-180 ${isFlipped ? '' : 'hidden'}`}>
        <p className="text-lg">
          <strong>German verb:</strong> {flashcard.german_verb}
        </p>
        <p className="text-lg">
          <strong>Simple Past:</strong> {flashcard.simple_past}
        </p>
        <p className="text-lg">
          <strong>Past Participle:</strong> {flashcard.past_participle}
        </p>
      </div>
    </div>
    {/* Flashcard Navigation */}
    <div className="flex space-x-4 items-center justify-center">
      <button
        onClick={handlePrevious}
        className="px-4 py-2 rounded text-slate-600 underline hover:text-slate-800"
      >
        Previous
      </button>
      <button
        onClick={handleNext}
        className="px-4 py-2 rounded text-slate-600 underline hover:text-slate-800"
      >
        Next
      </button>
    </div>    

    </div>
    <p className="mt-4 text-gray-500">Click on the card to flip it.</p>
  </div>
);
}