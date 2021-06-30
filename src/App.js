import React, { useState } from "react";
import UserSessionContext from "./components/context/userSession-context";

import Navbar from "./components/Navbar";
import CreateNewRoute from "./components/CreateNewRoute/CreateNewRoute";
import "./App.css";

function App() {
  const [userUid, setUserUid] = useState();

  const loggedInDataHandler = (uid) => {
    setUserUid(uid);
  };

  return (
    <UserSessionContext.Provider
      value={{
        userUid: userUid,
      }}
    >
      <div className="App">
        <header className="App-header">
          <Navbar onLoggedInData={loggedInDataHandler} />
        </header>
        <CreateNewRoute />
      </div>
    </UserSessionContext.Provider>
  );
}

export default App;
