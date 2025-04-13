import React from "react";

const Result = ({ questions, answers }) => {
  const score = answers.filter((a) => a.correct).length;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Your Score: {score} / {questions.length}</h2>
      {answers.map((ans, idx) => {
        const q = questions.find((q) => q.id === ans.questionId);
        return (
          <div key={idx} className="mb-4 border p-4 rounded bg-white shadow">
            <p className="font-semibold mb-1">Q{idx + 1}: {q.sentence}</p>
            <p className="mb-1">✅ Your Answer: <span className="font-medium">{ans.selected.join(" ")}</span></p>
            <p className={`font-medium ${ans.correct ? "text-green-600" : "text-red-600"}`}>
              {ans.correct ? "✅ Correct" : `❌ Correct Answer: ${q.correct.join(" ")}`}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Result;