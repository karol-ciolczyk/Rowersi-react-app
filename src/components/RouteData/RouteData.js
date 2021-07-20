import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Directions from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";

const RouteData = (props) => {
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

  return (
    <div>
      <div></div>
      <div></div>
    </div>
  );
};

export default RouteData;
