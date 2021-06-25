import React from "react";

import Navbar from "./components/Navbar";
import "./App.css";
import CreateRouteForm from "./components/Route/CreateRouteForm";

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
<main>
<CreateRouteForm />
</main>
      </div>
    </React.Fragment>
  );
}

export default App;
