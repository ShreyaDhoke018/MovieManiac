import React from "react";

import "./DarkMode.css";
// these are old way and doesnt work now
// import { ReactComponent as Sun } from "../../assets/Sun.svg";
// import { ReactComponent as Moon } from "../../assets/Moon.svg";
// the newly added ?react query suffix on your imported file, which allows you to use the default export and skip the ReactComponent aliasing
import Sun from "../../assets/Sun.svg?react";
import Moon from "../../assets/Moon.svg?react";

const DarkMode = () => {
  const setDarkTheme = () => {
    // data-theme is the atrribute name and dark is the value
    document.querySelector("body").setAttribute("data-theme", "dark");
    localStorage.setItem("selectedTheme", "dark");
  };

  const setLightTheme = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    localStorage.setItem("selectedTheme", "light");
  };

  const selectedTheme = localStorage.getItem("selectedTheme");

  if (selectedTheme === "light") {
    setLightTheme();
  } else {
    setDarkTheme();
  }

  const toggleTheme = (e) => {
    if (e.target.checked) {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  };

  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        onChange={toggleTheme}
        defaultChecked={selectedTheme !== "light"}
      />
      <label className="dark_mode_label" htmlFor="darkmode-toggle">
        <Sun />
        <Moon />
      </label>
    </div>
  );
};

export default DarkMode;
