import React, {
  useRef,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Directions from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import { Paper, Button } from "@material-ui/core";
import { OriginInput } from "./OriginInput";

import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import RoomIcon from "@material-ui/icons/Room";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { IconButton } from "@material-ui/core";
import { Tooltip } from "@material-ui/core";

import style from "../mapStyle/directions-styles";
import classes from "./MapRouting.module.css";
import "./waypoint.css";
import DestinationInput from "./DestinationInput";
import WaypointInput from "./WaypointInput";

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
      interactive: false,
      alternatives: false,
      language: "pl",
      congestion: true,
      steps: true,
      controls: {
        inputs: false,
        instructions: false,
        profileSwitcher: true,
      },
      zoom: 7,
    });
  }, []);

  const addRoute = useCallback(
    (routePoints, waypoints) => {
      directions.removeRoutes(); // must be here to prevent duplicating waypoints

      if (directions._map?._markers[0]) directions._map._markers[0].remove();
      if (routePoints.origin) {
        directions.setOrigin(routePoints.origin);
        const el = document.createElement("div");
        el.className = "originElement";
        const coordinates = routePoints.origin;
        new mapboxgl.Marker(el)
          .setLngLat(coordinates)
          .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>"))
          .addTo(map.current);
      }
      if (routePoints.destination) {
        directions.setDestination(routePoints.destination);
        const coordinates = routePoints.destination;
        new mapboxgl.Marker({
          color: "red",
        })
          .setLngLat(coordinates)
          .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>"))
          .addTo(map.current);
      }
      if (Object.keys(waypoints).length > 0) {
        const waypointNumbers = Object.keys(waypoints);
        waypointNumbers.forEach((number) => {
          const coordinates = waypoints[number];
          const figure = Number(number);
          directions.addWaypoint(figure, coordinates);
        });
      }
    },
    [directions]
  );

  const cleanPreviousWaypoints = (previousWaypoints) => {
    const waypointNumbers = Object.keys(previousWaypoints);
    waypointNumbers.forEach(() => {
      // const figure = Number(number);
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

  const selectWaypointHandler = (selectedPlaceData) => {
    if (selectedPlaceData) {
      const coordinates = selectedPlaceData.coordinates;
      const waypointNumbers = Object.keys(waypoints);
      const nextNumber = waypointNumbers.length; // this is next number of addition waypoint
      setWaypoints((previousState) => {
        if (previousState) cleanPreviousWaypoints(previousState);
        return {
          ...previousState,
          [nextNumber]: coordinates,
        };
      });
    }
  };

  const { setRouteData } = props;

  useEffect(() => {
    setRouteData((previousState) => {
      return {
        ...previousState,
        waypoints,
      };
    });
  }, [waypoints, setRouteData]);

  useEffect(() => {
    if (routePoints.origin || routePoints.destination || waypoints) {
      addRoute(routePoints, waypoints);
    }
  }, [routePoints, waypoints, addRoute]);

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

    setTimeLineItemContentData((previousState) => {
      return {
        waypointNumber: previousState.waypointNumber + 1,
        timeLineItemContent: [
          ...previousState.timeLineItemContent,
          <TimelineItem key={Math.random()}>
            <TimelineSeparator style={{ paddingRight: "4px" }}>
              <RadioButtonUncheckedIcon
                style={{
                  fontSize: "17px",
                  color: "#f36046",
                  margin: "10px 0px",
                }}
              />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <WaypointInput
                initialInputValue={routePoints.destinationName}
                waypointNumber={previousState.waypointNumber}
                onSelectWaypoint={selectWaypointHandler}
              />
            </TimelineContent>
          </TimelineItem>,
        ],
      };
    });
  };

  ////////////////////  useEffect to reset destinatioInputValueCleaner to initial state
  useEffect(() => {
    setDestinatioInputValueCleaner(undefined);
  }, [destinatioInputValueCleaner]);

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
    directions.on("route", (object) => {
      ///////////// first function to get route screen and to invoke getElevation function /////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////
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
      const distanceInKm = (object.route[0].distance / 1000).toFixed(2);

      props.setRouteData((previousState) => {
        return {
          ...previousState,
          distance: distanceInKm,
          duration: time,
          origin: originCoordinates,
          destination: destinationCoordinates,
        };
      });

      /////////// second function to add markers for waypoints and set isDisabled for add new point button/////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////
      const markersArrray = directions._map._markers;
      const waypointsArray = [
        directions.getOrigin(),
        ...directions.getWaypoints(),
      ];

      ////// clear up markers
      for (let i = 0; i < 100; i++) {
        if (markersArrray.length > 0) {
          markersArrray.forEach((marker) => {
            if (marker._color === "red") return;
            marker.remove();
          });
        } else {
          break;
        }
      }

      if (waypointsArray.length > 0) {
        waypointsArray.forEach((waypoint) => {
          const el = document.createElement("div");
          el.className = "waypointElement";
          const coordinates = waypoint.geometry.coordinates;
          new mapboxgl.Marker(el)
            .setLngLat(coordinates)
            .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>"))
            .addTo(map.current);
          // marker.on("dragend", (event) => {
          //   const mapOfWaypoints = event.target._map._markers.map(
          //     (object, index) => {
          //       return [index, [object._lngLat.lng, object._lngLat.lat]];
          //     }
          //   );
          //   const waypointsObject = Object.fromEntries(mapOfWaypoints);
          //   setWaypoints(waypointsObject);
          // });
        });
      }

      // set if addNewPoint button is Disabled
      const lastWaypointCoordinates =
        directions.getWaypoints().length > 0
          ? directions.getWaypoints()[directions.getWaypoints().length - 1]
              .geometry.coordinates
          : null;
      if (destinationCoordinates === lastWaypointCoordinates) {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    });

    return () => {
      delete directions.actions.eventSubscribe().events.route;
      delete directions.actions.eventSubscribe().events.undefined;
    };
  }, [directions, props]);

  return (
    <section className={classes.contentContaner}>
      <div className={classes.directionsContainer}>
        <Timeline>
          <TimelineItem>
            <TimelineSeparator>
              <MyLocationIcon
                style={{
                  fontSize: "25px",
                  color: "#f36046",
                  margin: "10px 0px",
                }}
              />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <OriginInput
                onSelectOriginDestination={selectOriginDestinationHandler}
              />
            </TimelineContent>
          </TimelineItem>
          {timeLineItemContentData.timeLineItemContent}
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot style={{ backgroundColor: "#3bb2d0" }}>
                <RoomIcon style={{ fontSize: "16px" }} />
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent>
              <DestinationInput
                onSelectOriginDestination={selectOriginDestinationHandler}
                destinationInputValueCleaner={destinatioInputValueCleaner}
              />
            </TimelineContent>
          </TimelineItem>
        </Timeline>
        <Tooltip
          title={isDisabled ? "fill in the missing fields" : "add new point"}
          placement="bottom"
        >
          <div>
            <IconButton
              // size="small"
              disabled={isDisabled}
              style={isDisabled ? { color: "#9e9e9e86" } : { color: "#3bb2d0" }}
              aria-label="upload picture"
              component="span"
              onClick={addWaypointHandler}
            >
              <AddCircleOutlineIcon fontSize="medium" />
            </IconButton>
            <Button
              disabled={isDisabled}
              variant="contained"
              style={
                isDisabled
                  ? { backgroundColor: "#9e9e9e86", color: "#fff" }
                  : { backgroundColor: "#3bb2d0", color: "#fff" }
              }
              size="small"
              onClick={addWaypointHandler}
            >
              Add new point
            </Button>
          </div>
        </Tooltip>
      </div>
      <div className={classes.mapContainer}>
        <Paper
          elevation={0}
          style={{
            width: "100%",
            height: "100%",
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
