import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Directions from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import { Paper } from "@material-ui/core";

import style from "./directions-styles";
import classes from "./MapRouting.module.css";

// Function to retrieve from api the highest elevation of a point ( specified: lng, lat ) of the map
function getElevation(coordinates, wayPoint, setRouteData) {
  fetch(
    `https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/${coordinates}.json?layers=contour&limit=50&access_token=pk.eyJ1Ijoia2FyY2lvIiwiYSI6ImNrcTd6YjExejAxc3kyb3BrcnBzY252em4ifQ.emytj-LkRX7RcGueM2S9HA`
  )
    .then((body) => body.json())
    .then((data) => {
      const allFeatures = data.features;
      const elevations = allFeatures.map((object) => object.properties.ele);
      const highestElevetion = Math.max(...elevations);

      console.log(highestElevetion);

      if (wayPoint === "origin") {
        setRouteData((previoueState) => {
          return {
            ...previoueState,
            originElevation: highestElevetion,
          };
        });
      } else if (wayPoint === "destination") {
        setRouteData((previoueState) => {
          return {
            ...previoueState,
            destinationElevation: highestElevetion,
          };
        });
      }
    })
    .catch(console.log);
}

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2FyY2lvIiwiYSI6ImNrcTd6YjExejAxc3kyb3BrcnBzY252em4ifQ.emytj-LkRX7RcGueM2S9HA";

export default function Mapbox(props) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(19.52);
  const [lat, setLat] = useState(50.1);
  const [zoom, setZoom] = useState(11);
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
      inputs: props.isInput,
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
    map.current.addControl(new mapboxgl.FullscreenControl());
    map.current.addControl(nav, "top-right");
    map.current.addControl(directions, "top-left");

    directions.on("route", (object) => {
      const originCoordinates = directions.getOrigin().geometry.coordinates;
      const destinationCoordinates =
        directions.getDestination().geometry.coordinates;
      // console.log(
      //   object.route[0].legs[0].steps.map((object) => object.maneuver.location)
      // );
      console.log(directions, object);

      const bbox = [originCoordinates, destinationCoordinates];
      map.current.fitBounds(bbox, {
        padding: 200,
      });

      getElevation(originCoordinates, "origin", props.setRouteData);
      getElevation(destinationCoordinates, "destination", props.setRouteData);

      map.current.once("idle", () => {
        //  console.log(map.current.getCanvas().toDataURL())
        props.setRouteData((previousState) => {
          return {
            ...previousState,
            img: map.current.getCanvas().toDataURL(),
          };
        });
      });

      props.setRouteData((previousState) => {
        return {
          ...previousState,
          distance: object.route[0].distance,
          duration: object.route[0].duration,
          origin: originCoordinates,
          destination: destinationCoordinates,
        };
      });
    });


  });

  return (
    <Paper
      elevation={5}
      style={{
        width: "auto",
        height: "auto",
        margin: "auto",
        marginTop: "100px",
      }}
    >
      <div ref={mapContainer} className={classes["map-container"]} />
    </Paper>
  );
}
