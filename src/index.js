import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase/app";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAcsH6qKhte6RWbFH7iQAfb_M8g7PO4NNE",
  authDomain: "rowersi-karcio.firebaseapp.com",
  projectId: "rowersi-karcio",
  storageBucket: "rowersi-karcio.appspot.com",
  messagingSenderId: "197882555965",
  appId: "1:197882555965:web:977c2848ba3656c1a60454",
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
