import "./App.css";
import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const pageSize = 12;
  const apiKey = process.env.REACT_APP_GNEWS_API;
  
  const [progress, setProgress] = useState(0);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="news-container">
      <Router>
        <LoadingBar color="#f11946" progress={progress} />
        <NavBar 
          theme={theme} 
          toggleTheme={toggleTheme} 
          setSearchQuery={setSearchQuery} 
        />
        <Switch>
          <Route exact path="/">
            <News 
              setProgress={setProgress} 
              apiKey={apiKey} 
              key="general" 
              pageSize={pageSize} 
              country="us" 
              category="general"
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </Route>
          <Route exact path="/business">
            <News 
              setProgress={setProgress} 
              apiKey={apiKey} 
              key="business" 
              pageSize={pageSize} 
              country="us" 
              category="business"
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </Route>
          <Route exact path="/entertainment">
            <News 
              setProgress={setProgress} 
              apiKey={apiKey} 
              key="entertainment" 
              pageSize={pageSize} 
              country="us" 
              category="entertainment"
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </Route>
          <Route exact path="/general">
            <News 
              setProgress={setProgress} 
              apiKey={apiKey} 
              key="general-cat" 
              pageSize={pageSize} 
              country="us" 
              category="general"
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </Route>
          <Route exact path="/health">
            <News 
              setProgress={setProgress} 
              apiKey={apiKey} 
              key="health" 
              pageSize={pageSize} 
              country="us" 
              category="health"
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </Route>
          <Route exact path="/science">
            <News 
              setProgress={setProgress} 
              apiKey={apiKey} 
              key="science" 
              pageSize={pageSize} 
              country="us" 
              category="science"
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </Route>
          <Route exact path="/sports">
            <News 
              setProgress={setProgress} 
              apiKey={apiKey} 
              key="sports" 
              pageSize={pageSize} 
              country="us" 
              category="sports"
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </Route>
          <Route exact path="/technology">
            <News 
              setProgress={setProgress} 
              apiKey={apiKey} 
              key="technology" 
              pageSize={pageSize} 
              country="us" 
              category="technology"
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;