import React, { useEffect, useState } from "react";
import Home  from "../pages/Questions";
import Result from "../pages/Result";

const SentenceConstruction=()=> {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [time, setTime] = useState(60);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  useEffect(() => {
    if (time === 0) handleNext();
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [time]);

  const handleSelect = (word) => {
    const correctLength = questions[current]?.correct.length;
    if (selected.length < correctLength && !selected.includes(word)) {
      setSelected([...selected, word]);
    }
  };

  const handleUnselect = (index) => {
    const updated = [...selected];
    updated.splice(index, 1);
    setSelected(updated);
  };

  const handleNext = () => {
    const currentQ = questions[current];
    const isCorrect = JSON.stringify(selected) === JSON.stringify(currentQ.correct);
    setAnswers([...answers, { questionId: currentQ.id, selected, correct: isCorrect }]);
    setSelected([]);
    setTime(30);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 min-h-screen flex items-center justify-center">
    
      {!showResult ? (
        <Home
          current={current}
          questions={questions}
          selected={selected}
          time={time}
          handleSelect={handleSelect}
          handleUnselect={handleUnselect}
          handleNext={handleNext}
        />
      ) : (
        <Result questions={questions} answers={answers} />
      )}
    </div>
  );
}

export default SentenceConstruction;