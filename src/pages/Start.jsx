// src/pages/Construction.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
// import { Pencil } from "lucide-react";

const Start = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border">
        <div className="flex flex-col items-center text-center space-y-6">
          <Pencil className="w-10 h-10 text-gray-600" />
          <h1 className="text-2xl font-bold">Sentence Construction</h1>
          <p className="text-gray-500 text-sm">
            Select the correct words to complete the sentence by arranging the provided options in the right order.
          </p>

          <div className="grid grid-cols-3 gap-4 w-full text-center mt-4">
            <div>
              <p className="text-sm text-gray-400">Time Per Question</p>
              <p className="text-lg font-semibold">30 sec</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Questions</p>
              <p className="text-lg font-semibold">10</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Coins</p>
              <p className="text-lg font-semibold flex items-center justify-center gap-1">
                <span className="w-2 h-2 rounded-full bg-yellow-400"></span> 0
              </p>
            </div>
          </div>

          <div className="flex justify-between gap-4 w-full mt-6">
            <button
              onClick={() => navigate(-1)}
              className="w-full py-2 rounded-xl border border-blue-500 text-blue-500 font-medium hover:bg-blue-50 transition"
            >
              Back
            </button>
            <button
              onClick={() => navigate("/home")}
              className="w-full py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;
