"use client";
import { useState } from 'react';

const quizData = [
  {
    question: "In Deutschland dürfen Menschen offen etwas gegen die Regierung sagen, weil …",
    choices: {
      a: "hier Religionsfreiheit gilt.",
      b: "die Menschen Steuern zahlen.",
      c: "die Menschen das Wahlrecht haben.",
      d: "hier Meinungsfreiheit gilt."
    },
    correct_choice: "d"
  },
  {
    question: "In Deutschland können Eltern bis zum 14. Lebensjahr ihres Kindes entscheiden, ob es in der Schule am …",
    choices: {
      a: "Geschichtsunterricht teilnimmt.",
      b: "Religionsunterricht teilnimmt.",
      c: "Politikunterricht teilnimmt.",
      d: "Sprachunterricht teilnimmt."
    },
    correct_choice: "b"
  }
];

export default function QuizPage() {
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Track selected answers

  const handleChoiceClick = (questionIndex, choiceKey, correctChoice) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: { choiceKey, correctChoice },
    });
  };

  const getButtonClasses = (questionIndex, choiceKey) => {
    if (!selectedAnswers[questionIndex]) return 'bg-blue-500 text-white';

    const { choiceKey: selectedKey, correctChoice } = selectedAnswers[questionIndex];

    if (choiceKey === correctChoice) {
      return 'bg-green-500 text-white'; // Correct answer
    }
    if (choiceKey === selectedKey) {
      return 'bg-red-500 text-white'; // Wrong selected answer
    }
    return 'bg-gray-300'; // Default for other answers
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Quiz</h1>
      {quizData.map((item, questionIndex) => (
        <div key={questionIndex} className="mb-8">
          <h3 className="text-xl font-semibold mb-4">{item.question}</h3>
          <div className="flex flex-col space-y-2">
            {Object.keys(item.choices).map((choiceKey) => (
              <button
                key={choiceKey}
                onClick={() =>
                  handleChoiceClick(questionIndex, choiceKey, item.correct_choice)
                }
                className={`py-2 px-4 rounded ${getButtonClasses(
                  questionIndex,
                  choiceKey
                )}`}
              >
                {item.choices[choiceKey]}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
