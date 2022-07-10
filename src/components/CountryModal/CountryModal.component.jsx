import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import "./CountryModal.style.css";
import loading from "../../icons/loading-svgrepo-com.svg";

const CountryModal = ({ search, handleCloseModal }) => {
  // Fetching data from RESTcountries API and applying the user search keyward to access the country data
  const [url, setUrl] = useState(`https://restcountries.com/v2/name/${search}`);
  const { data: country, isPending, error } = useFetch(url);

  return (
    <div className="country-modal">
      {/* When the data still loading */}
      {isPending && (
        <div className="loading">
          <img src={loading} alt="loading logo" className="loading-logo" />
        </div>
      )}

      {/* When an error accord */}
      {error && (
        <div className="error">
          <p>Invalid Name, Please try again</p>
          <button
            className="close-modal"
            type="button"
            onClick={handleCloseModal}
          >
            Close
          </button>
        </div>
      )}

      {/* When the user enter the correct country name */}
      {country && (
        <div className="country-layout">
          <img src={country[0].flags.svg} alt="country flag" />
          <h3>{country[0].name}</h3>

          <div className="country-info">
            <p>
              Contenents: <span>{country[0].region}</span>
            </p>
            <p>
              Region: <span>{country[0].subregion}</span>
            </p>
            <p>
              Capital: <span>{country[0].capital}</span>
            </p>
            <p>
              Area:
              <span>
                {new Intl.NumberFormat("en-us").format(country[0].area)} km
                <sup>2</sup>
              </span>
            </p>
            <p>
              Population:
              <span>
                {new Intl.NumberFormat("en-us").format(country[0].population)}
              </span>
            </p>
            <p>
              Language: <span>{country[0].languages[0].name}</span>
            </p>
            <p>
              Currency: <span>{country[0].currencies[0].name}</span>
            </p>
          </div>

          <button
            className="close-modal"
            type="button"
            onClick={handleCloseModal}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default CountryModal;
