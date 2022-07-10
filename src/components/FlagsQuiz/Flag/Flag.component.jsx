import { Fragment, useEffect, useState } from "react";
import Choices from "./Choices/Choices.component";

const Flag = ({
  data,
  countryChoices,
  setUrl,
  countryNames,
  increment,
  incrementScore,
}) => {
  const [randomChoice, setRandomChoice] = useState([]);

  useEffect(() => {
    setRandomChoice([
      countryChoices(),
      countryChoices(),
      countryChoices(),
      countryChoices(),
    ]);
  }, []);

  if (!randomChoice.includes(data[0].name.common)) {
    randomChoice[Math.floor(Math.random() * 4)] = data[0].name.common;
  }
  const correctAnswer = data[0].name.common;

  return (
    <Fragment>
      {data && (
        <Fragment>
          <img src={data[0].flags.svg} alt="country flag" />
          <Choices
            randomChoice={randomChoice}
            correctAnswer={correctAnswer}
            countryNames={countryNames}
            setUrl={setUrl}
            increment={increment}
            incrementScore={incrementScore}
            setRandomChoice={setRandomChoice}
            countryChoices={countryChoices}
            data={data}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Flag;
