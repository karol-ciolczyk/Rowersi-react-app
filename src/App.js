import React, { useState } from "react";
import UserSessionContext from "./components/context/userSession-context";

import Navbar from "./components/Navbar";
import CreateNewRoute from "./components/CreateNewRoute/CreateNewRoute";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Profile } from "./user-profile/profile.jsx";

function App() {
  const [userUid, setUserUid] = useState();

  const loggedInDataHandler = (uid) => {
    console.log(uid)
    setUserUid(uid);
  };

  return (
    <UserSessionContext.Provider
      value={{
        userUid: userUid,
      }}
    >
      <Router>
        <div className="App">
          <header className="App-header">
            <Navbar onLoggedInData={loggedInDataHandler}/>
          </header>
          <Switch>
            <Route exact path="/" component={CreateNewRoute}/>
            <Route path="/profile" component={Profile}/>
            {/* Tu trzeba wstawić inne widoki, czyli tworzenie tras, homepage itp */}
          </Switch>
      </div>
      </Router>
    </UserSessionContext.Provider>
  );
}

export default App;


