import React from 'react';

const StartScreen = ({ onStart }) => (
  <div className="flex flex-col items-center space-y-4">
    <h1 className="text-2xl font-bold">Welcome to the Quiz</h1>
    <button
      onClick={onStart}
      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
    >
      Start Quiz
    </button>
  </div>
);

export default StartScreen;
