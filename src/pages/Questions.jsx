import React from "react";


const Questions = ({ current, questions, selected, time, handleSelect, handleUnselect, handleNext }) => {
  if (questions.length === 0) return <p>Loading...</p>;
  const currentQ = questions[current];
  const parts = currentQ.sentence.split("___");

  return (
    <div className="space-y-6">
      < h1 className="text-3xl font-bold"> Sentence Builder</h1>
      <p className="text-sm text-gray-500">
      Select the missing words in the correct order
      </p>
      <div className="text-lg font-semibold"> {time}s</div>

      <div className="text-xl font-medium">
        {parts.map((part, i) => (
          <span key={i}>
            {part}
            {i < currentQ.correct.length && (
              <button
                onClick={() => handleUnselect(i)}
                className="inline-block w-24 border-b border-gray-500 text-center mx-1 px-2 py-1"
              >
                {selected[i] || "_____"}
              </button>
            )}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-center">
        {currentQ.options.map((word) => (
          <button
            key={word}
            disabled={selected.includes(word)}
            onClick={() => handleSelect(word)}
            className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
              selected.includes(word)
                ? "bg-gray-300 cursor-not-allowed"
                : "hover:bg-blue-300"
            }`}
          >
            {word}
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={selected.length !== currentQ.correct.length}
        className="mt-4 px-6 py-2 bg-green-500 text-white rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Questions;