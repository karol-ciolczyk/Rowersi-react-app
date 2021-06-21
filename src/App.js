import React from "react";

import Navbar from "./components/Navbar";
import RegisterForm from "./components/SignUp/SignUp";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
      </div>
      <RegisterForm />
    </React.Fragment>
  );
}

export default App;
