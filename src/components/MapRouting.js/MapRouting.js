import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Directions from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";

import classes from "./MapRouting.module.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2FyY2lvIiwiYSI6ImNrcTd6YjExejAxc3kyb3BrcnBzY252em4ifQ.emytj-LkRX7RcGueM2S9HA";

export default function Mapbox(props) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(19.52);
  const [lat, setLat] = useState(50.1);
  const [zoom, setZoom] = useState(11);

  const directions = new Directions({
    accessToken: mapboxgl.accessToken,
    profile: "mapbox/cycling",
    unit: "metric",
    interactive: props.isInteractive,
    alternatives: true,
    language: "pl",
    congestion: true, // ???????? nie musi byc dodane później
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

    // const marker = new mapboxgl.Marker({
    //   color: "red",
    //   draggable: true,
    // })
    //   .setLngLat([-116.5616667, 32.93583333])
    //   .addTo(map.current);

    map.current.on("load", () => {
      console.log("map load");

      directions.setOrigin([19.6278, 50.0824]);
      directions.addWaypoint(0, [19.6278, 50.0824]);
      directions.addWaypoint(1, [19.1278, 50.9124]);
      directions.setDestination([19.1278, 50.9124]);
    });
  });

  // useEffect(() => {
  //   if (!map.current) return; // wait for map to initialize
  //   map.current.on("move", () => {
  //     setLng(map.current.getCenter().lng.toFixed(4));
  //     setLat(map.current.getCenter().lat.toFixed(4));
  //     setZoom(map.current.getZoom().toFixed(2));
  //   });
  // });

  directions.on("route", (object) => {
    console.log(directions);
    console.log("route event");
    console.log(object.route);
  });

  // const addRouteHandler = (event)=>{
  //   event.preventDefault()
  //   console.log(event.target.name)

  //  directions.setOrigin([19.6278, 50.0824]);
  //  directions.addWaypoint(0, [19.6278, 50.0824]);
  //  directions.addWaypoint(1, [19.1278, 50.9124]);
  //  // directions.addWaypoint(2, [-115.5616667, 31.93583333]);
  //  // directions.setDestination([-115.5616667, 31.93583333]);
  //  // directions.addWaypoint(3, [-116.3616667, 32.53583333]);
  //  directions.setDestination([19.1278, 50.9124]);

  console.log(directions);

  return (
    <>
      <div>
        <div className={classes.sidebar}>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div ref={mapContainer} className={classes["map-container"]} />
      </div>
      <form>
        <label>start</label>
        <input type="number" />
        <label>end</label>
        <input type="number" />
        {/* <button name="route1" type="submit" onClick={addRouteHandler}>
          add route
        </button>
        <button name="route2" type="submit" onClick={addRouteHandler}> */}
        {/* add route2
        </button> */}
      </form>
    </>
  );
}
