import React, { useEffect, useState } from "react";
import { PhotoButton } from "./PhotoButton";

import { DisplayRoutes } from "./DisplayRoutes";
import firebase from "firebase/app";
import "firebase/firestore";

import classes from "./DisplayByRegion.module.css";

export const DisplayByRegion = function () {
  const [clickedImage, setClickedImage] = useState("");
  const [routes, setRoutes] = useState([]);

  const imageClickedHandler = function (event) {
    const region = event.target.innerText;
    setClickedImage(region);
  };

  useEffect(() => {
    (async function () {
      try {
        const routesRef = await firebase.firestore().collection("routes");
        const querySnapshot = await routesRef.get();
        console.log(querySnapshot);
        let arrMay = [];
        querySnapshot.forEach((doc) => {
          const obj = doc.data();
          arrMay = [...arrMay, obj];
        });
        setRoutes(arrMay);
      } catch (error) {
        alert("second error");
        alert(error);
      }
    })();
  }, []);

  return (
    <div className={classes.container}>
      <nav className={classes.nav}>
        <PhotoButton imageClickedHandler={imageClickedHandler} />
      </nav>
      <section className={classes.section}>
        <div className={classes.routeElementsContainer}>
          <DisplayRoutes region={clickedImage} routes={routes} />
        </div>
      </section>
    </div>
  );
};
