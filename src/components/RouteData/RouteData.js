import React, { useRef, useEffect, useState, useContext, useMemo } from "react";
import UserSessionContext from "../context/userSession-context";
import firebase from "firebase/app";
import "firebase/firestore";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Directions from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import { Avatar, Paper, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { Skeleton } from "@material-ui/lab";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";
import RatingElement from "./RatingElement";

import classes from "./RouteData.module.css";
import style from "../mapStyle/directions-styles";
import "./MapPopup.css";
import { Slider } from "./Slider/Slider";

const RouteData = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [routeData, setRouteData] = useState({});
  const [rateValue, setRateValue] = useState(undefined);
  const { routeId } = useParams();
  const ctx = useContext(UserSessionContext);

  let directions = useMemo(() => {
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
      zoom: 10,
    });
  }, []);

  const nav = useMemo(() => {
    return new mapboxgl.NavigationControl();
  }, []);

  // Add listener in route collection in firebase to watch changes in route documents which have "isvote = true" field
  // the following useEffect applies changing rating average live
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("routes")
      .where("isVote", "==", true)
      .onSnapshot((querySnapshot) => {
        // console.log(querySnapshot); it shows how many objects from collection are listenned (passed the where("isVote", "==", true) condition) in next forEach function in first render. Then after each change shows only changed element
        querySnapshot.docChanges().forEach((change) => {
          if (change.type === "modified") {
            const votesArray = change.doc.data().votes;
            const numberOfVotes = votesArray.length;
            const average =
              votesArray
                .map((object) => +object.rate)
                .reduce((acc, number) => acc + number) / votesArray.length;

            setRouteData((previousState) => {
              return {
                ...previousState,
                numberOfVotes,
                votesAverage: average.toFixed(1),
              };
            });
          }
        });
      });
    return () => {
      unsubscribe();
    };
  }, []);

  // Add new vote object to votes field in routes collection in firestoreDatabase in route with current route ID
  useEffect(() => {
    if (rateValue) {
      const routeRef = firebase.firestore().collection("routes").doc(routeId);
      routeRef.update({
        votes: firebase.firestore.FieldValue.arrayUnion({
          user: ctx.userUid ? ctx.userUid : "nie ma user uid", // finally here will be userUID
          rate: rateValue,
        }),
      });
    }
  }, [rateValue, ctx.userUid, routeId]);

  // the following useEffect applies add map to component, add map load listener once which invokes fetch route-data
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/karcio/ckr3m2igg5uin18p3iolzcdmp",
      center: [19.433605529438495, 52.09458858099802],
      zoom: 6,
    });
    map.current.addControl(new mapboxgl.FullscreenControl(), "bottom-left");
    map.current.addControl(nav, "bottom-left");
    map.current.addControl(directions, "top-left");
    map.current.once("load", () => {
      firebase
        .firestore()
        .collection("routes")
        .doc(`${routeId}`)
        .get()
        .then((response) => {
          const routeData = response.data();
          const time = routeData.duration;
          const distanceInKm = routeData.distance;
          const votesAverage = (
            routeData.votes
              ? routeData.votes
                  .map((object) => +object.rate)
                  .reduce((acc, number) => acc + number) /
                routeData.votes.length
              : 0
          ).toFixed(1);
          setRouteData((previousState) => {
            return {
              ...previousState,
              ...routeData,
              duration: time,
              distance: distanceInKm,
              votes: routeData.votes,
              votesAverage,
              isDataLoaded: true,
            };
          });
          for (const number in routeData.waypoints) {
            const coordinates = routeData.waypoints[number];
            directions.addWaypoint(number, coordinates);
          }

          directions.setOrigin(routeData.origin);
          new mapboxgl.Marker({
            color: "tomato",
          })
            .setLngLat(routeData.origin)
            .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>"))
            .addTo(map.current);

          directions.setDestination(routeData.destination);
          new mapboxgl.Marker({
            color: "tomato",
          })
            .setLngLat(routeData.destination)
            .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>"))
            .addTo(map.current);

          const bbox = [routeData.origin, routeData.destination];
          map.current.fitBounds(bbox, {
            padding: 100,
            // duration: 2000,
          });
        });
    });
    return () => {
      directions.removeRoutes();
      map.current.remove();
    };
  }, [directions, routeId, nav]);

  //  The following useEffect applies to cleaning map data and direction data after unmounting a component
  // useEffect(() => {
  //   return () => {
  //     directions.removeRoutes();
  //     map.current.remove();
  //   };
  // }, [directions]);

  const marker = new mapboxgl.Marker({
    color: "#3bb2d0",
    draggable: false,
    scale: 0.9,
  });

  const manageMarker = (object) => {
    if (!object.isTooltipActive) return;
    if (!object.activePayload) return; // before render chart with data
    if (map.current._markers.length === 3) marker.remove();
    if (object.activePayload[0]) {
      const elevation = object.activePayload[0].payload.elevation;
      const coordinates = object.activePayload[0].payload.coordinates;
      marker
        .setLngLat(coordinates)
        .setPopup(
          new mapboxgl.Popup({ closeOnClick: false }).setHTML(
            `<h4>Elevation: ${elevation}<h4/>`
          )
        )
        .addTo(map.current);

      marker.togglePopup();
    }
  };

  const removeMarker = (event) => {
    if (map.current._markers.length === 3) marker.remove();
  };

  const Chart = function () {
    return (
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          data={routeData.chartData}
          onMouseMove={manageMarker}
          onMouseLeave={removeMarker}
        >
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2451B7" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#2451B7" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="elevation"
            stroke="#2451B7"
            fill="url(#color)"
          />
          <XAxis
            dataKey="distance"
            axisLine={false}
            tickLine={false}
            // tickFormatter={(number) => `${number} m`}
          />
          <YAxis
            dataKey="elevation"
            axisLine={false}
            tickLine={false}
            tickCount={10}
            // tickFormatter={(number) => `${number} m`}
          />
          {/* <Tooltip content={<CustomTooltip />} /> */}
          <Tooltip />
          <CartesianGrid opacity={0.2} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className={classes.flexContainer}>
      <div className={classes.flexchild1}>
        <Slider />
        <div className={classes.flexchild__routeData}>
          <header className={classes.header}>
            <div>
              <Avatar
                alt="Remy Sharp"
                src="https://picsum.photos/150/150"
                style={{ height: "100px", width: "100px", margin: "auto" }}
              />
              <div>
                <h2>Stefek Stafański</h2>
              </div>
            </div>
            <div className={classes.routeData}>
              <div>
                <Typography variant="h4" component="div" gutterBottom>
                  {routeData.isDataLoaded ? routeData.routeTitle : <Skeleton />}
                </Typography>
              </div>
              <div className={classes.routeNumbersDataContainer}>
                {routeData.isDataLoaded ? (
                  <Paper style={{ padding: "10px", margin: "5px" }}>
                    <Typography variant="overline">Distance: </Typography>
                    <Typography variant="subtitle2">
                      {routeData.distance} km
                    </Typography>
                  </Paper>
                ) : (
                  <div style={{ margin: "5px" }}>
                    <Skeleton variant="rect" width={80} height={70} />
                  </div>
                )}
                {routeData.isDataLoaded ? (
                  <Paper style={{ padding: "10px", margin: "5px" }}>
                    <Typography variant="overline">Time: </Typography>
                    <Typography variant="subtitle2">
                      {routeData.duration}
                    </Typography>
                  </Paper>
                ) : (
                  <div style={{ margin: "5px" }}>
                    <Skeleton variant="rect" width={80} height={70} />
                  </div>
                )}
                {routeData.isDataLoaded ? (
                  <Paper style={{ padding: "10px", margin: "5px" }}>
                    <Typography variant="overline">Elevation1: </Typography>
                    <Typography variant="subtitle2">
                      {routeData.destinationElevation} m
                    </Typography>
                  </Paper>
                ) : (
                  <div style={{ margin: "5px" }}>
                    <Skeleton variant="rect" width={80} height={70} />
                  </div>
                )}
              </div>
            </div>
          </header>
          <div className={classes.routeDescriptionContainer}>
            <Typography variant="h6" style={{ padding: "10px" }}>
              Route description:
            </Typography>
            <Typography variant="subtitle1" style={{ padding: "10px" }}>
              {routeData.isDataLoaded ? (
                routeData.routeDescription
              ) : (
                <>
                  <Skeleton />
                  <Skeleton />
                </>
              )}
            </Typography>
          </div>
          <div className={classes.chart}></div>
          <div className={classes.rateRouteContainer}>
            <div className={classes.rating}>
              <Typography variant="subtitle1" style={{ padding: "5px" }}>
                Rating
              </Typography>
            </div>
            <div>
              <Typography
                variant="h3"
                style={{ padding: "20px 20px 5px 20px" }}
              >
                {routeData.votesAverage}
              </Typography>
              <Typography
                variant="subtitle2"
                style={{ padding: "5px", color: "#808080" }}
              >
                {routeData.numberOfVotes
                  ? `(${routeData.numberOfVotes} votes)`
                  : routeData.votes
                  ? `( ${routeData.votes.length} votes)`
                  : "( votes )"}
              </Typography>
            </div>
            <div>
              <RatingElement
                routeData={routeData}
                setRateValue={setRateValue}
              />
            </div>
          </div>
          <div className={classes.chart}>
            {routeData.chartData ? (
              <Chart />
            ) : (
              <Paper elevation={0} component="div">
                <Skeleton variant="rect" height={180} />
              </Paper>
            )}
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
