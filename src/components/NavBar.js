import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = ({ theme, toggleTheme, setSearchQuery }) => {
  const [inputText, setInputText] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      setSearchQuery(inputText.trim());
    }
  };

  const handleCategoryClick = () => {
    setInputText("");
    setSearchQuery("");
  };

  return (
    <div>
      <nav className={`navbar fixed-top navbar-expand-lg ${theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light"} border-bottom`} style={{ borderBottomColor: "var(--border-color)" }}>
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/" onClick={handleCategoryClick}>
            NewsMonkey
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={handleCategoryClick}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/business" onClick={handleCategoryClick}>
                  Business
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/entertainment" onClick={handleCategoryClick}>
                  Entertainment
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/general" onClick={handleCategoryClick}>
                  General
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/health" onClick={handleCategoryClick}>
                  Health
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/science" onClick={handleCategoryClick}>
                  Science
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sports" onClick={handleCategoryClick}>
                  Sports
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/technology" onClick={handleCategoryClick}>
                  Technology
                </Link>
              </li>
            </ul>

            <form className="d-flex" onSubmit={handleSearchSubmit}>
              <input
                className="form-control search-input"
                type="search"
                placeholder="Search news..."
                aria-label="Search"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button className="btn search-btn" type="submit">
                Search
              </button>
            </form>

            <button
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === "dark" ? (
                // Sun Icon SVG
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#ffc107"
                  className="bi bi-sun-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
                </svg>
              ) : (
                // Moon Icon SVG
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#5c5c5c"
                  className="bi bi-moon-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.79.79 0 0 1 .81.616 7.3 7.3 0 0 1-12.558-4.592C2.312 4.143 5.036 1.3 8.35.105a.78.78 0 0 1 .802.173z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;