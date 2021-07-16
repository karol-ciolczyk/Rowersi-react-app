import React, { useState, useEffect } from "react";
import UserSessionContext from "./components/context/userSession-context";

import Navbar from "./components/Navbar";
import CreateNewRoute from "./components/CreateNewRoute/CreateNewRoute";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Profile } from "./user-profile/profile.jsx";
import firebase from "firebase";

function App() {
  const [userUid, setUserUid] = useState();

  const onLoggedInDataHandler = (uid) => {
    console.log(uid);
    setUserUid(uid);
  };
  useEffect(() => {  // this one needed to setUserUid after refreshing browser
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log(user);
        setUserUid(user.uid);
      }
    });
  }, []);

  return (
    <UserSessionContext.Provider
      value={{
        userUid: userUid,
      }}
    >
      <Router>
        <div className="App">
          <header className="App-header">
            <Navbar onLoggedInData={onLoggedInDataHandler} />
          </header>
          <Switch>
            <Route exact path="/newRoute" component={CreateNewRoute}/>
            <Route path="/profile" component={Profile}/>
            {/* Tu trzeba wstawić inne widoki, czyli tworzenie tras, homepage itp */}
          </Switch>
        </div>
      </Router>
    </UserSessionContext.Provider>
  );
}

export default App;
