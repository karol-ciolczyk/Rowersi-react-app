import React from "react";

import LoginForm from "./components/LoginForm/LoginForm";
import TransitionsModal from "./components/Modal/TransitionsModal";

import "./App.css";

function App() {
  return (
    <React.Fragment>
      <TransitionsModal 
      numberOfModalButtons={2} 
      buttonText={`LogIn // SignUp`}>
        <LoginForm />
      </TransitionsModal>
    </React.Fragment>
  );
}

export default App;
