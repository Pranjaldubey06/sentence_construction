import React, { useState, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import QuestionScreen from './components/QuestionScreen';
import ResultScreen from './components/ResultScreen';
import axios from 'axios';

function App() {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    axios.get('/questions')

      .then((res) => {
        setQuestions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
        setLoading(false);
      });
  }, []);

  const handleStart = () => setStarted(true);

  const handleNext = (answer) => {
    setAnswers([...answers, answer]);
    if (currentIndex + 1 === questions.length) {
      setFinished(true);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {loading ? (
        <p className="text-gray-500 text-lg">Loading questions...</p>
      ) : questions.length === 0 ? (
        <p className="text-red-500 text-lg">No questions available.</p>
      ) : !started ? (
        <StartScreen onStart={handleStart} />
      ) : finished ? (
        <ResultScreen questions={questions} answers={answers} />
      ) : (
        <QuestionScreen
          question={questions[currentIndex]}
          onNext={handleNext}
          index={currentIndex}
          total={questions.length}
        />
      )}
    </div>
  );
}

export default App;
