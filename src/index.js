import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase/app";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD7z3NPK-jq7jWALT70TfXzbADX0Dk7X5c",
  authDomain: "rowersi.firebaseapp.com",
  projectId: "rowersi",
  storageBucket: "rowersi.appspot.com",
  messagingSenderId: "451720621710",
  appId: "1:451720621710:web:d860e992ccacd01c8363df",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
