import React, { useState, useEffect } from "react";
import UserSessionContext from "./components/context/userSession-context";

import Navbar from "./components/Navbar";
import CreateNewRoute from "./components/CreateNewRoute/CreateNewRoute";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Profile } from "./user-profile/profile.jsx";
import firebase from "firebase/app";
import "firebase/auth";
import HomePage from "./components/HomePage/HomePage";
import RouteData from "./components/RouteData/RouteData";
import Footer from "./components/Footer";
import ExploreAllRoutes from "./components/ExploreAllRoutes/ExpolreAllRoutes";
import { DisplayByRegion } from "./components/DisplayByRegion/DisplayByRegion";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";

function App() {
  const [userUid, setUserUid] = useState();

  const onLoggedInDataHandler = (uid) => {
    setUserUid(uid);
  };

  useEffect(() => {
    // this is needed to setUserUid after refreshing browser
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
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
        <ScrollToTop />
        <div className="App">
          <header className="App-header">
            <Navbar onLoggedInData={onLoggedInDataHandler} />
          </header>
          <Switch>
            <Route exact path="/newRoute" component={CreateNewRoute} />
            <Route path="/profile" component={Profile} />
            <Route exact path="/" component={HomePage} />
            {/* Tu trzeba wstawić inne widoki, czyli tworzenie tras, homepage itp */}
            <Route path="/allRoutes" component={ExploreAllRoutes} />
          </Switch>
          <Switch>
            <Route path="/route/:routeId" component={RouteData} />
            <Route
              path="/regions/:selectedRegion"
              component={DisplayByRegion}
            />
          </Switch>
          <Footer />
        </div>
      </Router>
    </UserSessionContext.Provider>
  );
}

export default App;
