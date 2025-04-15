import React from 'react';

const ResultScreen = ({ questions, answers }) => {
  const score = answers.reduce((total, ans, i) => {
    const correctAnswers = questions[i].answers;
    const isCorrect = JSON.stringify(ans) === JSON.stringify(correctAnswers);
    return isCorrect ? total + 1 : total;
  }, 0);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Quiz Finished!</h2>
      <p className="text-lg">Your Score: {score} / {questions.length}</p>
    </div>
  );
};

export default ResultScreen;
