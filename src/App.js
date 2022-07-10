// Importing the site logo
import logo from "./icons/earth-svgrepo-com.svg";

// Importing App Style sheet
import "./App.css";

// Importing Components
import SearchBar from "./components/SearchBar/SearchBar.component";
import CountryModal from "./components/CountryModal/CountryModal.component";
import FlagsQuiz from "./components/FlagsQuiz/FlagsQuiz.component";

// Importing React Hooks
import { useState } from "react";
import { useFetch } from "./hooks/useFetch";

const App = () => {
  // Initiating the states
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  const [url, setUrl] = useState("https://restcountries.com/v3.1/all");
  const { data } = useFetch(url);

  let countryNames = [];
  if (data !== null) {
    data.forEach((data) => {
      countryNames.push(data.name.common);
    });
  }

  // A function to handle change when the user enter a value in the search bar
  const handleChange = (event) => {
    const searchField = event.target.value;
    setSearch(searchField);
  };

  // A function to show country layout when user click on the search button
  const handleShowModal = () => {
    setShowModal(true);
  };

  // A function to close country layout when user click on the close button
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // A function to handle keybaord event when the user hit the ENTER key
  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      setShowModal(true);
    }
  };

  // A function to handle keyboard event when the user hit the ESC key
  const handleEscKeyPress = (event) => {
    if (event.key === "Escape") {
      setShowModal(false);
    }
  };
  // The best use for ESC keyboard key is on the body element to be used everywhere in the program
  document.querySelector("body").addEventListener("keydown", handleEscKeyPress);

  const handleShowQuiz = () => {
    setShowQuiz(true);
  };

  const handleCloseQuiz = () => {
    setShowQuiz(false);
  };

  return (
    <div className="App">
      {showModal && (
        <CountryModal search={search} handleCloseModal={handleCloseModal} />
      )}

      {showQuiz && (
        <FlagsQuiz
          handleCloseQuiz={handleCloseQuiz}
          countryNames={countryNames}
        />
      )}
      <div className="nav_bar">
        <h1 className="header">World of Countries</h1>
      </div>

      <div className="main-section">
        <img className="logo" src={logo} alt="earth icon" />
        <SearchBar
          handleShowModal={handleShowModal}
          handleChange={handleChange}
          handleEnterKeyPress={handleEnterKeyPress}
        />
      </div>

      <div className="flags-quiz-btn">
        <button className="quiz-btn" type="button" onClick={handleShowQuiz}>
          Flags Quiz
        </button>
      </div>
    </div>
  );
};

export default App;
