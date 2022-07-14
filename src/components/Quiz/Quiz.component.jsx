// IMPORTING quiz main component style
import "./Quiz.style.css";

// IMPORTING icons
import errorIcon from "../../icons/dialog-error-svgrepo-com.svg";
import loading from "../../icons/loading-svgrepo-com.svg";
import finished from "../../icons/finish-svgrepo-com.svg";

// IMPORTING react components
import { useEffect, useState, useRef } from "react";

// IMPORTING hook component
import { useFetch } from "../../hooks/useFetch";

const Quiz = ({ handleCloseQuiz, countryNames }) => {
  const [nextUrl, setNextUrl] = useState(
    `https://restcountries.com/v3.1/name/${
      countryNames[Math.floor(Math.random() * countryNames.length)]
    }`
  );
  const { data, error, isPending } = useFetch(nextUrl);

  // Declaring an empty array to pass the choices into
  const [randomCountry, setRandomCountry] = useState([]);

  // Using useEffect to stop any effect on the random generator while react updating the state
  useEffect(() => {
    // A function to collect random choices and the correct answer and shuffle them
    const countryChoice = () => {
      const choice = [];
      choice.push(
        countryNames[Math.floor(Math.random() * countryNames.length)],
        countryNames[Math.floor(Math.random() * countryNames.length)],
        countryNames[Math.floor(Math.random() * countryNames.length)],
        data[0].name.common
      );
      choice.sort(() => {
        return Math.random() - 0.5;
      });

      return choice;
    };

    // We pass the choices only when the data exists
    if (data !== null) {
      setRandomCountry([...countryChoice()]);
    }
  }, [countryNames, data]);

  // Declaring a state for the number of question in the quiz
  const [questionNum, setQuestionNum] = useState(1);

  // Setting up the quiz limit
  const quizLimit = 25;

  // A function to increase the number of question each time the use click next
  const incrementQuestionNum = () => {
    setQuestionNum(questionNum + 1);
  };

  // disabling and able the next button
  const [disableNext, setDisableNext] = useState(true);

  // Declaring the score state
  const [score, setScore] = useState(0);

  // Handle when the user click on one of the choices
  const handleChoice = (event) => {
    // If the user hit the correct answer
    if (event.target.textContent === data[0].name.common) {
      // Increase the score by one each time the user get the correct answer
      setScore((prev) => prev + 1);

      // Adding the correct class to the button
      event.target.classList.add("correct");

      // Disable the button
      event.target.disabled = true;

      // Disabling the rest of the choices
      document.querySelectorAll(".choice").forEach((choice) => {
        choice.disabled = true;
      });

      // If the user hit the incorrect answer
    } else {
      event.target.classList.add("in-correct");
      event.target.disabled = true;
      document.querySelectorAll(".choice").forEach((choice) => {
        if (choice.textContent === data[0].name.common) {
          choice.classList.add("correct");
        }
        choice.disabled = true;
      });
    }

    // Enable the next button when the user hit on any answer
    setDisableNext(false);
  };

  // Handling when the user click next for the next flag question
  const handleNext = () => {
    // Disable the next button after the user hit next
    setDisableNext(true);

    // Re-generate a new country
    setNextUrl(
      `https://restcountries.com/v3.1/name/${
        countryNames[Math.floor(Math.random() * countryNames.length)]
      }`
    );

    // Calling the incrementQuestionNum function to increase the question number
    incrementQuestionNum();

    // Resetting the choices back to original
    document.querySelectorAll(".choice").forEach((choice) => {
      if (choice.classList.contains("correct")) {
        choice.classList.remove("correct");
      } else if (choice.classList.contains("in-correct")) {
        choice.classList.remove("in-correct");
      }
      choice.disabled = false;
    });
  };

  // Declaring a state when the quiz finished
  const [finish, setFinish] = useState(false);
  const [scoreString, setScoreString] = useState("");

  const quiz = useRef();

  // Using use effect hook to finish the quiz when the questionNum pass the quizLimit number
  useEffect(() => {
    if (questionNum > quizLimit) {
      quiz.current.classList.add("hidden");
      setFinish(true);
    }

    if (score <= 5) {
      setScoreString("BAD 😩");
    } else if (score > 5 && score <= 10) {
      setScoreString("Need work 😒");
    } else if (score > 10 && score <= 15) {
      setScoreString("Not bad 😏");
    } else if (score > 15 && score <= 20) {
      setScoreString("GOOD JOB! 😃");
    } else if (score > 20 && score < 25) {
      setScoreString("GREAT JOB! 😍");
    } else if (score === 25) {
      setScoreString("SUPER STAR!!! 🤩");
    }
  }, [score, questionNum]);

  return (
    <div className="quiz">
      {finish && (
        <div className="finish-quiz">
          <div className="finish-modal">
            <img src={finished} alt="finished logo" />
            <h3>
              Your score: {score}/{quizLimit}
            </h3>
            <p>{scoreString}</p>
            <button onClick={handleCloseQuiz}>CLOSE</button>
          </div>
        </div>
      )}

      {isPending && (
        <div className="loading">
          <img src={loading} alt="loading logo" />
        </div>
      )}

      {error && (
        <div className="error-quiz">
          <div className="error-modal">
            <img src={errorIcon} alt="error icon" />
            <h3>Server disconnected 😫 please try again</h3>
            <button onClick={handleCloseQuiz}>CLOSE</button>
          </div>
        </div>
      )}

      {data && (
        <div ref={quiz} className="quiz-modal">
          <div className="quiz-counter">
            <p>
              {questionNum}/{quizLimit}
            </p>
          </div>

          <div className="quiz-img">
            <img src={data[0].flags.svg} alt="flag img" />
          </div>

          <div className="quiz-choices">
            <button className="choice" onClick={handleChoice}>
              {randomCountry[0]}
            </button>
            <button className="choice" onClick={handleChoice}>
              {randomCountry[1]}
            </button>
            <button className="choice" onClick={handleChoice}>
              {randomCountry[2]}
            </button>
            <button className="choice" onClick={handleChoice}>
              {randomCountry[3]}
            </button>
          </div>

          <div className="quiz-modal-handle">
            <button
              disabled={disableNext}
              className="next-quiz"
              onClick={handleNext}
            >
              NEXT
            </button>
            <button onClick={handleCloseQuiz}>CLOSE</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
