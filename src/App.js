import React from "react";

import Navbar from "./components/Navbar";
import "./App.css";
import CreateRouteForm from "./components/Route/CreateRouteForm";
import CreateNewRoute from "./components/CreateNewRoute/CreateNewRoute";

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <header className="App-header">
          <Navbar onLoggedInData={loggedInDataHandler} />
        </header>
        {/* <main>
          <CreateRouteForm />
        </main> */}
        <CreateNewRoute />
      </div>
    </React.Fragment>
  );
}

export default App;
