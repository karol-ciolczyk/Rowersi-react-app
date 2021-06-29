import React from "react";

import Navbar from "./components/Navbar";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Profile } from "./user-profile/profile.jsx";

function App() {
  return (
    <React.Fragment>
      <Router>
        <div className="App">
          <header className="App-header">
            <Navbar />
          </header>
          <Switch>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
