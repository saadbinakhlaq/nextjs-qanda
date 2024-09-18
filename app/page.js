"use client";
import { useState, useEffect } from 'react';


export default function Home() {
  const [questionsData, setQuestionsData] = useState({ data: [] });
  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then((data) => {
        setQuestionsData(data);
      });
  }, []);

  const [selectedAnswers, setSelectedAnswers] = useState({}); // Track selected answers

  const handleChoiceClick = (questionIndex, choiceKey, correctChoice) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: { choiceKey, correctChoice },
    });
  };

  const getButtonClasses = (questionIndex, choiceKey) => {
    if (!selectedAnswers[questionIndex]) return '';

    const { choiceKey: selectedKey, correctChoice } = selectedAnswers[questionIndex];

    if (choiceKey === correctChoice) {
      return 'bg-green-500 text-white hover:border-green-600'; // Correct answer
    }
    if (choiceKey === selectedKey) {
      return 'bg-red-500 text-white hover:border-red-600'; // Wrong selected answer
    }
    return ''; // Default for other answers
  };


  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 sm:items-start lg:w-[768px]">
        <div className="container mx-auto p-4">
          <h1 className="text-left text-2xl font-semibold mb-8">Einburgerungstest</h1>
          {questionsData.data.map((item, questionIndex) => (
            <div key={questionIndex} className="mb-16">
              <h3 className="text-xl font-semibold mb-2">{questionIndex+1}. {item.question}</h3>
              <div className="flex flex-col space-y-2">
                {Object.keys(item.choices).map((choiceKey) => (
                  <button
                    key={choiceKey}
                    onClick={() =>
                      handleChoiceClick(questionIndex, choiceKey, item.correct_choice)
                    }
                    className={`checked:bg-red-600 flex text-left text-base rounded-md hover:border-gray-500 border-gray-300 px-6 py-3 border-2 bg-gray-100 ${getButtonClasses(
                      questionIndex,
                      choiceKey
                    )}`}
                  >
                    {choiceKey}). {item.choices[choiceKey]}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
