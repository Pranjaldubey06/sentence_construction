import React, { useEffect, useState } from "react";

const QuestionScreen = ({ question, onNext, index, total }) => {
  const [selected, setSelected] = useState(Array(question.blanks).fill(null));
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          onNext(selected); // Move to the next question when time runs out
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onNext, selected]);

  const handleSelect = (word) => {
    // Find the first empty blank and fill it immediately
    const nextIndex = selected.indexOf(null);
    if (nextIndex !== -1) {
      const updatedSelected = [...selected];
      updatedSelected[nextIndex] = word;
      setSelected(updatedSelected);
    }
  };

  const handleUnselect = (indexToRemove) => {
    const updatedSelected = [...selected];
    updatedSelected[indexToRemove] = null;
    setSelected(updatedSelected);
  };

  const isNextEnabled = selected.every((word) => word !== null);

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full max-w-xl">
      <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
        <div>{`0:${timer < 10 ? `0${timer}` : timer}`}</div>
        <div>{`Question ${index + 1} / ${total}`}</div>
        <button
          onClick={() => onNext(selected)}
          className="text-red-500 hover:underline"
        >
          Quit
        </button>
      </div>

      <p className="text-center text-lg font-medium mb-4 flex flex-wrap justify-center gap-1">
        {question.sentence.map((part, i) =>
          part === "__" ? (
            <button
              key={i}
              onClick={() => handleUnselect(i)}
              className="mx-1 px-2 py-1 border rounded"
            >
              {selected[i] || "____"}
            </button>
          ) : (
            <span key={i} className="mx-1">{part}</span>
          )
        )}
      </p>

      <div className="grid grid-cols-2 gap-2 mt-4">
        {question.options.map((word, i) => (
          <button
            key={i}
            onClick={() => handleSelect(word)}
            className={`px-3 py-2 border rounded hover:bg-gray-100 ${
              selected.includes(word) ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={selected.includes(word)} // Prevent re-selection of the same word
          >
            {word}
          </button>
        ))}
      </div>

      <button
        onClick={() => onNext(selected)}
        disabled={!isNextEnabled}
        className={`mt-4 px-4 py-2 rounded ${
          isNextEnabled
            ? "bg-indigo-600 text-white hover:bg-indigo-700"
            : "bg-gray-400 text-gray-700 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default QuestionScreen;
