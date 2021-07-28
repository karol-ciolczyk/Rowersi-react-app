import React, {
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useState,
} from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Directions from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import { Paper } from "@material-ui/core";
import { OriginInput } from "./OriginInput";

import style from "../mapStyle/directions-styles";
import classes from "./MapRouting.module.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2FyY2lvIiwiYSI6ImNrcTd6YjExejAxc3kyb3BrcnBzY252em4ifQ.emytj-LkRX7RcGueM2S9HA";

export default function Mapbox(props) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [routePoints, setRoutePoints] = useState({
    origin: null,
    destination: null,
  });
  const [waypoints, setWaypoints] = useState({});
  const [timeLineItemContentData, setTimeLineItemContentData] = useState({
    waypointNumber: 0,
    timeLineItemContent: [],
  });
  const [destinatioInputValueCleaner, setDestinatioInputValueCleaner] =
    useState(undefined);

  const directions = useMemo(() => {
    return new Directions({
      accessToken: mapboxgl.accessToken,
      profile: "mapbox/cycling",
      unit: "metric",
      styles: style,
      interactive: true,
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
  }, []);

  const addRoute = (routePoints, waypoints) => {
    directions.removeRoutes();
    if (routePoints.origin) directions.setOrigin(routePoints.origin);
    if (routePoints.destination)
      directions.setDestination(routePoints.destination);
    if (Object.keys(waypoints).length > 0) {
      const waypointNumbers = Object.keys(waypoints);
      waypointNumbers.forEach((number) => {
        const coordinates = waypoints[number];
        const figure = Number(number);
        directions.addWaypoint(figure, coordinates);
      });
    }
  };

  const cleanPreviousWaypoints = (previousWaypoints) => {
    console.log("removing", previousWaypoints);
    const waypointNumbers = Object.keys(previousWaypoints);
    console.log(waypointNumbers);
    waypointNumbers.forEach(() => {
      // const figure = Number(number);
      // console.log("removeing");
      directions.removeWaypoint(0);
    });
  };

  const selectOriginDestinationHandler = (obj, whichLocation) => {
    if (obj) {
      const coordinates = obj.coordinates;
      whichLocation === "origin"
        ? setRoutePoints((previousState) => {
            return { ...previousState, origin: coordinates };
          })
        : setRoutePoints((previousState) => {
            return {
              ...previousState,
              destination: coordinates,
              destinationName: obj.placeName,
            };
          });
    }
  };

  const selectWaypointHandler = (selectedPlaceData, waypointNumber) => {
    console.log("--------------------", selectedPlaceData, waypointNumber);
    if (selectedPlaceData) {
      const coordinates = selectedPlaceData.coordinates;
      const waypointNumbers = Object.keys(waypoints);
      const nextNumber = waypointNumbers.length; // this is next number of addition waypoint
      setWaypoints((previousState) => {
        if (previousState) cleanPreviousWaypoints(previousState);
        return {
          ...previousState,
          [nextNumber]: coordinates,
          ///////////////////////////////// alternative //////////////////////
          // [
          //   ...previousState.waypoints,
          //   { waypointNumber, coordinates },
          // ],
        };
      });
    }
  };

  useEffect(() => {
    if (routePoints.origin) {
      addRoute(routePoints, waypoints);
    }
  }, [routePoints.origin, addRoute, waypoints, routePoints]);

  useEffect(() => {
    if (routePoints.destination) {
      addRoute(routePoints, waypoints);
    }
  }, [routePoints.destination, routePoints, waypoints, addRoute]);

  useEffect(() => {
    console.log("waypoints useeffect started");
    // map.current._markers.forEach((marker)=> marker.remove())
    if (waypoints) {
      // console.log(Object.keys(waypoints));
      addRoute(routePoints, waypoints);
    }
  }, [waypoints, routePoints, addRoute]);

  const addWaypointHandler = () => {
    setIsDisabled(true);
    setDestinatioInputValueCleaner(null); ////// to give props to clean destination input value

    // add waypoint as last key/value to waypoints state example { 1: [lng,lat], 2:[lng,lat]}
    if (routePoints.destination) {
      const waypointNumbers = Object.keys(waypoints);
      const nextNumber = waypointNumbers.length;
      setWaypoints((previousState) => {
        return { ...previousState, [nextNumber]: routePoints.destination };
      });
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

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

  const getOnRouteData = useCallback(
    (object) => {
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
    },
    [directions, props]
  );

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/karcio/ckr3m2igg5uin18p3iolzcdmp",
      center: [19.52, 50.1],
      zoom: 11,
    });
    map.current.addControl(new mapboxgl.FullscreenControl(), "bottom-left");
    const nav = new mapboxgl.NavigationControl();
    map.current.addControl(nav, "bottom-left");
    map.current.addControl(directions, "top-left");

    return () => {
      map.current.remove();
      directions.removeRoutes();
    };
  }, [directions]);

  useEffect(() => {
    if (!directions) return;
    if (directions.actions.eventSubscribe().events.route) return;
    directions.on("route", getOnRouteData);

    return () => {
      delete directions.actions.eventSubscribe().events.route;
      delete directions.actions.eventSubscribe().events.undefined;
    };
  }, [directions, getOnRouteData]);

  return (
    <section className={classes.contentContaner}>
      <div className={classes.directionsContainer}>
        <OriginInput />
      </div>
      <div className={classes.mapContainer}>
        <Paper
          elevation={0}
          style={{
            width: "100%",
            height: "900px",
            // margin: "auto",
            // marginTop: "100px",
          }}
        >
          <div ref={mapContainer} className={classes["map-container"]} />
        </Paper>
      </div>
    </section>
  );
}
