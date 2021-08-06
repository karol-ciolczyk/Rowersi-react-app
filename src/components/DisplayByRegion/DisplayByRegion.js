import React, { useEffect, useState } from "react";
import { PhotoButton } from "./PhotoButton";
import Pagination from "@material-ui/lab/Pagination";

import { DisplayRoutes } from "./DisplayRoutes";
import firebase from "firebase/app";
import "firebase/firestore";

import classes from "./DisplayByRegion.module.css";
import { Typography } from "@material-ui/core";

export const DisplayByRegion = function () {
  const [routes, setRoutes] = useState([]);
  const [paginationValue, setPaginationValue] = useState(1);

  const handleChange = function (event, value) {
    setPaginationValue(value);
  };

  useEffect(() => {
    (async function () {
      try {
        const routesRef = await firebase.firestore().collection("routes");
        const querySnapshot = await routesRef.get();
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
        <PhotoButton />
      </nav>
      <section className={classes.section}>
        <div className={classes.routeElementsContainer}>
          <DisplayRoutes routes={routes} paginationValue={paginationValue} />
          <div className={classes.pagination}>
            <Pagination
              count={10}
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
