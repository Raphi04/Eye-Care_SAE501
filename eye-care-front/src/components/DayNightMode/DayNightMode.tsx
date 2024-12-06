import { useEffect, useState } from "react";

import "./DayNightMode.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

export default function DayNightMode() {
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [isChecked, setIsChecked] = useState<boolean>(() => {
    return theme == "dark";
  });

  function HandleChangeTheme() {
    let newTheme;

    if (theme == "light") {
      newTheme = "dark";
    } else {
      newTheme = "light";
    }

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    setIsChecked(!isChecked);
  }

  useEffect(() => {
    document.body.className = theme;
  }, []);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <>
      <label className="switch">
        <input type="checkbox" onChange={HandleChangeTheme} checked={isChecked}></input>
        <span className="slider">
          <FontAwesomeIcon icon={faMoon} className="moon" />
          <FontAwesomeIcon icon={faSun} className="sun" />
        </span>
      </label>
    </>
  );
}
