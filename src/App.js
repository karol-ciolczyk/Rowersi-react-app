import React from "react";

import Navbar from "./components/Navbar";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Profile } from './user-profile/Profile.jsx';

function App() {
  return (
    <Router>
    <React.Fragment>
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
    </React.Fragment>
    </Router>
  );
}

export default App;
