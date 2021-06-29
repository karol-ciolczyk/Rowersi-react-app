import React from "react";
import MapRouting from "./components/MapRouting/MapRouting"

import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
      </div>
      <MapRouting isInteractive={false} isInput={true} />
    </React.Fragment>
  );
}

export default App;
