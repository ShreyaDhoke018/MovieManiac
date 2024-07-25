import React from "react";
import "./Navbar.css";
import DarkMode from "../DarkMode/DarkMode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ onSearch }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <nav className="navbar">
      <h1>MovieManiac</h1>

      <div className="navbar_links">
        <div className="search">
          <button className="search_button">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="search_icon" />
          </button>
          <input
            type="text"
            className="searchbar"
            placeholder="Search movies.."
            onChange={handleInputChange}
          ></input>
        </div>

        <DarkMode />
      </div>
    </nav>
  );
};

export default Navbar;
