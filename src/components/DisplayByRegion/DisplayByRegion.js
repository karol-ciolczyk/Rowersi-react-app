import React, { useEffect, useState } from "react";
import { PhotoButton } from "./PhotoButton";
import Pagination from "@material-ui/lab/Pagination";
import { useParams } from "react-router-dom";

import { DisplayRoutes } from "./DisplayRoutes";
import firebase from "firebase/app";
import "firebase/firestore";

import classes from "./DisplayByRegion.module.css";
import { Typography } from "@material-ui/core";

export const DisplayByRegion = function () {
  const [routes, setRoutes] = useState([]);
  const [paginationValue, setPaginationValue] = useState(1);
  const { selectedRegion } = useParams();

  const handleChange = function (event, value) {
    setPaginationValue(value);
  };

  useEffect(() => {
    let isUnmounted = false;
    (async function () {
      try {
        const routesRef = await firebase.firestore().collection("routes");
        const querySnapshot = await routesRef.get();
        let arrMay = [];
        querySnapshot.forEach((doc) => {
          const obj = { ...doc.data(), routeId: doc.id };
          arrMay = [...arrMay, obj];
        });
        if (isUnmounted) return;
        setRoutes(arrMay);
      } catch (error) {
        alert("second error");
        alert(error);
      }
    })();
    return () => {
      isUnmounted = true;
    };
  }, []);

  return (
    <div className={classes.container}>
      <nav className={classes.nav}>
        <PhotoButton />
      </nav>
      <section className={classes.section}>
        <div className={classes.routeElementsContainer}>
          <dvi className={classes.header}>
            <Typography
              variant="h5"
              display="block"
              style={{ marginLeft: "20px", color: "#3bb2d0" }}
            >
              Explore region:
            </Typography>
            <Typography
              variant="h5"
              display="block"
              style={{ marginLeft: "20px", color: "#3bb2d0" }}
            >
              {selectedRegion.replace("-", " ")}
            </Typography>
          </dvi>
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
