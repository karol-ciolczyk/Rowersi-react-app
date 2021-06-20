import React from "react";

import LoginForm from './components/LoginForm/LoginForm'
import Modal from './components/Modal/Modal'

import "./App.css";

function App() {
  return (
    <React.Fragment>
      <Modal buttonName={'Login'}>
        <LoginForm />
      </Modal>
    </React.Fragment>
  );
}

export default App;