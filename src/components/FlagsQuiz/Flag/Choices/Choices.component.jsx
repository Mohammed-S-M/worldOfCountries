import { useState } from "react";

const Choices = ({
  randomChoice,
  correctAnswer,
  setUrl,
  countryNames,
  increment,
  incrementScore,
  setRandomChoice,
  countryChoices,
}) => {
  const [disabledNext, setDisabledNext] = useState(true);

  const handleChoices = (event) => {
    setDisabledNext(false);
    if (event.target.innerHTML === correctAnswer) {
      incrementScore();
      event.target.classList.add("correct");
      const theRest = document.querySelectorAll(".choices");
      theRest.forEach((rest) => {
        rest.disabled = true;
      });
    } else {
      event.target.classList.add("incorrect");
      const theRest = document.querySelectorAll(".choices");
      theRest.forEach((rest) => {
        if (rest.innerHTML === correctAnswer) {
          rest.classList.add("correct");
          rest.disabled = true;
        } else {
          rest.disabled = true;
        }
      });
    }
  };

  return (
    <div className="choice-selection">
      <button className={`choices`} onClick={handleChoices}>
        {randomChoice[0]}
      </button>
      <button className={`choices`} onClick={handleChoices}>
        {randomChoice[1]}
      </button>
      <button className={`choices`} onClick={handleChoices}>
        {randomChoice[2]}
      </button>
      <button className={`choices`} onClick={handleChoices}>
        {randomChoice[3]}
      </button>

      <button
        disabled={disabledNext}
        className="next"
        onClick={() => {
          setUrl(
            `https://restcountries.com/v3.1/name/${
              countryNames[Math.floor(Math.random() * 250)]
            }`
          );

          const choices = document.querySelectorAll(".choices");
          choices.forEach((choice) => {
            choice.disabled = false;
            choice.classList.remove("correct");
            choice.classList.remove("incorrect");
          });

          increment();
          setDisabledNext(true);

          setRandomChoice((prev) => {
            prev = [];
            const newChoice = [
              countryChoices(),
              countryChoices(),
              countryChoices(),
              countryChoices(),
            ];
            if (!newChoice.includes(correctAnswer)) {
              newChoice[Math.floor(Math.random() * 4)] = correctAnswer;
            }

            console.log(prev);
            console.log(newChoice);
            return newChoice;
          });
        }}
      >
        NEXT
      </button>
    </div>
  );
};

export default Choices;
