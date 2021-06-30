import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Directions from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import ButtonAddRouteDataToFirebase from "./ButtonAddRouteDataToFirebase";

import classes from "./MapRouting.module.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2FyY2lvIiwiYSI6ImNrcTd6YjExejAxc3kyb3BrcnBzY252em4ifQ.emytj-LkRX7RcGueM2S9HA";

export default function Mapbox(props) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(19.52);
  const [lat, setLat] = useState(50.1);
  const [zoom, setZoom] = useState(11);
  const [routeData, setRouteData] = useState({ distance: "", duration: "" });

  const directions = new Directions({
    accessToken: mapboxgl.accessToken,
    profile: "mapbox/cycling",
    unit: "metric",
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

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.addControl(directions, "top-left");

    directions.on("route", (object) => {
      const originCoordinates = directions.getOrigin().geometry.coordinates;
      const destinationCoordinates = directions.getOrigin().geometry.coordinates;

      setRouteData((previousState) => {
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

  
  console.log(routeData);


  return (
    <>
      <div>
        <div className={classes.sidebar}>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div ref={mapContainer} className={classes["map-container"]} />
      </div>
      <ButtonAddRouteDataToFirebase routeData={routeData} />
    </>
  );
}
