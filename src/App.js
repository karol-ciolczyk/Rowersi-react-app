import React, {useState} from "react";
import MapRouting from "./components/MapRouting/MapRouting";
import UserSessionContext from "./components/context/userSession-context";

import Navbar from "./components/Navbar";
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
      </div>
      <MapRouting isInteractive={true} isInput={true} />
    </UserSessionContext.Provider>
  );
}

export default App;
