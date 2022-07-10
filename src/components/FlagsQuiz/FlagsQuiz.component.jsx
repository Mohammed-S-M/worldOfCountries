// Importing the style of FlagQuiz component
import "./FlagsQuiz.css";

// Importing React Hooks
import { useState } from "react";

// Importing the fitch component
import { useFetch } from "../../hooks/useFetch";

// Importing the loading logo
import loading from "../../icons/loading-svgrepo-com.svg";

// Importing components
import Flag from "./Flag/Flag.component";
import FinishedQuiz from "./FinishedQuiz/FinishedQuiz.component";

// FlagsQuiz Main function (Main Modal)
const FlagsQuiz = ({ handleCloseQuiz, countryNames }) => {
  // Declaring the fetch state
  const [url, setUrl] = useState(
    `https://restcountries.com/v3.1/name/${
      countryNames[Math.floor(Math.random() * 250)]
    }`
  );
  // Extracting the fetch DATA
  const { data, isPending, error } = useFetch(url);

  // Generating random choices
  const countryChoices = () => {
    const choices = [];
    choices.push(countryNames[Math.floor(Math.random() * 250)]);
    return choices.join();
  };

  // Declaring a variable to hold the maximum number of questions
  const quizLimit = 25;

  // Declaring the question number state
  const [flagNumber, setFlagNumber] = useState(1);

  // This function is to increase the number of question
  const increment = () => {
    setFlagNumber(flagNumber + 1);
  };

  // Declaring a state to hold and calculate the user score
  const [score, setScore] = useState(0);

  // This function is to increase the score each time the user have a correct answer
  const incrementScore = () => {
    setScore(score + 1);
  };

  return (
    <div className="flags-quiz">
      {/* When the data still loading */}
      {isPending && (
        <div className="loading">
          <img src={loading} alt="loading logo" className="loading-logo" />
        </div>
      )}

      {/* When an error occur */}
      {error && (
        <div className="error">
          <p>ERROR, please try later!!!</p>
          <button
            className="close-modal"
            type="button"
            onClick={handleCloseQuiz}
          >
            Close
          </button>
        </div>
      )}

      {/* When the data is valid */}
      {data && (
        <div className="quiz">
          <div className="quiz-counter">
            <h3>
              {flagNumber}/{quizLimit}
            </h3>
          </div>

          <Flag
            data={data}
            countryChoices={countryChoices}
            setUrl={setUrl}
            countryNames={countryNames}
            increment={increment}
            incrementScore={incrementScore}
          />

          <button className="close-modal" onClick={handleCloseQuiz}>
            CLOSE
          </button>
        </div>
      )}

      <FinishedQuiz
        handleCloseQuiz={handleCloseQuiz}
        flagNumber={flagNumber}
        quizLimit={quizLimit}
        score={score}
      />
    </div>
  );
};

export default FlagsQuiz;
