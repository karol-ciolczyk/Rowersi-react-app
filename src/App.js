import React from "react";
import MapRouting from "./components/MapRouting/MapRouting"

import Navbar from "./components/Navbar";
import "./App.css";

function App() {

  const loggedInDataHandler = (uid)=>{
    console.log(uid)
  };


  return (
    <React.Fragment>
      <div className="App">
        <header className="App-header">
          <Navbar onLoggedInData={loggedInDataHandler} />
        </header>
      </div>
      <MapRouting isInteractive={true} isInput={true} />
    </React.Fragment>
  );
}

export default App;
