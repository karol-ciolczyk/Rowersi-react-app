import React, { useRef, useEffect, useState } from "react";
import firebase from "firebase";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Directions from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import { Avatar, Paper, Typography, Box } from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Rating from "@material-ui/lab/Rating";

import classes from "./RouteData.module.css";
import style from "./directions-styles";
import { CompassCalibrationOutlined } from "@material-ui/icons";

const RouteData = (props) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(19.52);
  const [lat, setLat] = useState(50.1);
  const [zoom, setZoom] = useState(11);
  const [routeData, setRouteData] = useState({});
  // const [routeData, setRouteData] = useState({ distance: "", duration: "" });

  const directions = new Directions({
    accessToken: mapboxgl.accessToken,
    profile: "mapbox/cycling",
    unit: "metric",
    styles: style,
    interactive: props.isInteractive,
    alternatives: false,
    language: "pl",
    congestion: true,
    steps: true,
    controls: {
      inputs: false,
      instructions: false,
      profileSwitcher: true,
    },
    zoom: 10,
  });

  const nav = new mapboxgl.NavigationControl();

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.addControl(new mapboxgl.FullscreenControl(), "bottom-left");
    map.current.addControl(nav, "bottom-left");
    map.current.addControl(directions, "top-left");

    // directions.on("route", (object) => {
    //   const originCoordinates = directions.getOrigin().geometry.coordinates;
    //   const destinationCoordinates =
    //     directions.getDestination().geometry.coordinates;
    //   // console.log(
    //   //   object.route[0].legs[0].steps.map((object) => object.maneuver.location)
    //   // );
    //   console.log(directions, object);

    //   const bbox = [originCoordinates, destinationCoordinates];
    //   map.current.fitBounds(bbox, {
    //     padding: 200,
    //   });

    //   map.current.once("idle", () => {
    //     //  console.log(map.current.getCanvas().toDataURL())
    //     props.setRouteData((previousState) => {
    //       return {
    //         ...previousState,
    //         img: map.current.getCanvas().toDataURL(),
    //       };
    //     });
    //   });

    //   props.setRouteData((previousState) => {
    //     return {
    //       ...previousState,
    //       distance: object.route[0].distance,
    //       duration: object.route[0].duration,
    //       origin: originCoordinates,
    //       destination: destinationCoordinates,
    //     };
    //   });
    // });
  });

  useEffect(() => {
    firebase
      .firestore()
      .collection("routes")
      .doc("X1bY5KGa8oxBwrc1JOVW")
      .get()
      .then((response) => {
        const routeData = response.data();
        setRouteData(routeData);
        directions.setOrigin(routeData.origin);
        directions.setDestination(routeData.destination);
      });
  }, []);

  console.log(routeData);

  return (
    <div className={classes.flexContainer}>
      <div className={classes.flexchild1}>
        <header className={classes.header}>
          <div>
            <Avatar
              alt="Remy Sharp"
              src="https://picsum.photos/150/150"
              style={{ height: "100px", width: "100px" }}
            />
            <div>
              <h2>User Name</h2>
            </div>
          </div>
          <div className={classes.routeData}>
            <div>
              <h1>Route Title: Kraków - Młoszowa-Trzebnia-Chrzanów</h1>
            </div>
            <div className={classes.routeNumberDataContainer}>
              <Paper>
                <Typography variant="h6" style={{ padding: "20px" }}>
                  Distance: 100km
                </Typography>
              </Paper>
              <Paper>
                <Typography variant="h6" style={{ padding: "20px" }}>
                  Time: 12:45:44
                </Typography>
              </Paper>
              <Paper>
                <Typography variant="h6" style={{ padding: "20px" }}>
                  Heighest Point: 350m npm
                </Typography>
              </Paper>
            </div>
          </div>
        </header>
        <div className={classes.routeDescriptionContainer}>
          <Paper>
            <Typography variant="body1" style={{ padding: "20px" }}>
              Route description: Aboute route
              Trasa fajna pełan wrażeń
              Na maksa odlotowa polecam każdemu kto chce pojeździć ostro na rowerze
            </Typography>
          </Paper>
        </div>
        <div className={classes.rateRouteContainer}>
          <div>
            <Typography variant="h3" style={{ padding: "20px" }}>
              4.6
            </Typography>
          </div>
          <div>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography component="legend">Custom empty icon</Typography>
              <Rating
                name="customized-empty"
                defaultValue={2}
                precision={0.5}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                size="large"
              />
            </Box>
          </div>
        </div>
      </div>
      <div className={classes.flexchild2}>
        <div ref={mapContainer} className={classes.mapContainer} />
      </div>
    </div>
  );
};

export default RouteData;
