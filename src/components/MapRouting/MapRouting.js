import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Directions from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import { Paper } from "@material-ui/core";

import style from "../mapStyle/directions-styles";
import classes from "./MapRouting.module.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2FyY2lvIiwiYSI6ImNrcTd6YjExejAxc3kyb3BrcnBzY252em4ifQ.emytj-LkRX7RcGueM2S9HA";

export default function Mapbox(props) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  // const [routeData, setRouteData] = useState({ distance: "", duration: "" });

  // Function to retrieve from api the highest elevation of a point ( specified: lng, lat ) of the map

  async function getElevation(coordinates, setRouteData) {
    try {
      const elevationArray = await Promise.all(
        coordinates.map((coordinates) => {
          return (async () => {
            try {
              const response = await fetch(
                `https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/${coordinates}.json?layers=contour&limit=50&access_token=pk.eyJ1Ijoia2FyY2lvIiwiYSI6ImNrcTd6YjExejAxc3kyb3BrcnBzY252em4ifQ.emytj-LkRX7RcGueM2S9HA`
              );
              const data = await response.json();
              const allFeatures = data.features;
              const elevations = allFeatures.map(
                (object) => object.properties.ele
              );
              const highestElevetion = Math.max(...elevations);
              return highestElevetion;
            } catch (err) {
              alert(err);
            }
          })();
        })
      );
      setRouteData((previoueState) => {
        return {
          ...previoueState,
          originElevation: elevationArray[0],
          destinationElevation: elevationArray[1],
        };
      });
    } catch (err) {
      alert(err);
    }
  }

  const directions = new Directions({
    accessToken: mapboxgl.accessToken,
    profile: "mapbox/cycling",
    unit: "metric",
    styles: style,
    interactive: false,
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

  const getOnRouteData = (object) => {
    const originCoordinates = directions.getOrigin().geometry.coordinates;
    const destinationCoordinates =
      directions.getDestination().geometry.coordinates;

    const bbox = [originCoordinates, destinationCoordinates];
    map.current.fitBounds(bbox, {
      padding: 200,
      // duration: 2000,
    });

    const coordinates = [originCoordinates, destinationCoordinates];
    getElevation(coordinates, props.setRouteData);

    map.current.once("idle", () => {
      props.setRouteData((previousState) => {
        return {
          ...previousState,
          img: map.current.getCanvas().toDataURL(),
        };
      });
    });

    const seconds = object.route[0].duration;
    const time = new Date(seconds * 1000).toISOString().substr(11, 8);
    const distanceInKm = (object.route[0].distance / 1000).toFixed(3);

    props.setRouteData((previousState) => {
      return {
        ...previousState,
        distance: distanceInKm,
        duration: time,
        origin: originCoordinates,
        destination: destinationCoordinates,
      };
    });
  };

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/karcio/ckr3m2igg5uin18p3iolzcdmp",
      center: [19.52, 50.1],
      zoom: 11,
    });
    map.current.addControl(new mapboxgl.FullscreenControl(), "bottom-left");
    map.current.addControl(nav, "bottom-left");
    map.current.addControl(directions, "top-left");

    return () => map.current.remove();
  }, []);

  useEffect(() => {
    if (directions.actions.eventSubscribe().events.route) return;
    directions.on("route", getOnRouteData);

    return () => {
      delete directions.actions.eventSubscribe().events.route;
      delete directions.actions.eventSubscribe().events.undefined;
      directions.removeRoutes();
    };
  }, []);

  return (
    <Paper
      elevation={5}
      style={{
        width: "auto",
        height: "100vh",
        margin: "auto",
      }}
    >
      <div ref={mapContainer} className={classes["map-container"]} />
    </Paper>
  );
}
