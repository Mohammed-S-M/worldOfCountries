// Importing SearchBar component style
import "./SearchBar.styles.css";

const SearchBar = ({ handleShowModal, handleChange, handleEnterKeyPress }) => {
  return (
    <div className="search-form">
      <p className="search-label">Enter a country name</p>
      <input
        className="search-bar"
        type="search"
        placeholder="Enter a country"
        onChange={handleChange}
        onKeyDown={handleEnterKeyPress}
      />
      <button className="search-btn" type="button" onClick={handleShowModal}>
        search
      </button>
    </div>
  );
};

export default SearchBar;
