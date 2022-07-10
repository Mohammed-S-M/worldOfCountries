import { useState, useEffect } from "react";
import "./FinishedQuiz.css";

const FinishedQuiz = ({ flagNumber, quizLimit, handleCloseQuiz, score }) => {
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (flagNumber > quizLimit) {
      document.querySelector(".quiz").style.display = "none";
      setFinished(true);
    }
  }, [flagNumber, quizLimit]);

  let finalScore = "";

  if (score <= 5) {
    finalScore = "BAD! 😡";
  } else if (score > 5 && score <= 10) {
    finalScore = "Need some work! 😒";
  } else if (score > 10 && score <= 15) {
    finalScore = "Not Bad! 😏";
  } else if (score > 15 && score <= 20) {
    finalScore = "GOOD JOB! 😀";
  } else if (score > 20 && score < 25) {
    finalScore = "GREAT JOB!!! 🤩";
  } else if (score === 25) {
    finalScore = "PERFECT!!! 😎";
  }

  return (
    <div>
      {finished && (
        <div className="finished">
          <h3>
            YOUR SCORE: {score} / {quizLimit}
          </h3>
          <h4>{finalScore}</h4>
          <button className="close-modal" onClick={handleCloseQuiz}>
            CLOSE
          </button>
        </div>
      )}
    </div>
  );
};

export default FinishedQuiz;
