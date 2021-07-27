import React, { useRef, useEffect, useState, useContext } from "react";
import UserSessionContext from "../context/userSession-context";
import firebase from "firebase";
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
import { Slider } from "./Slider";

const RouteData = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [routeData, setRouteData] = useState({ urls: [] });
  const [chartData, setChartData] = useState([]);
  const [rateValue, setRateValue] = useState(undefined);
  const { routeId } = useParams();
  const ctx = useContext(UserSessionContext);
  const isChartDataLoaded = chartData.length > 0;

  console.log(ctx);

  const getFilesUrlFromStorage = async function () {
    try {
      const storageRef = await firebase.storage().ref();

      const listAll = await storageRef
        .child(`usersTest/${ctx.userUid}/routes/${routeId}`)
        .listAll();

      const urls = await Promise.all(
        listAll.items.map((item) => {
          return (async () => {
            try {
              const src = await item.getDownloadURL();
              return src;
            } catch (error) {
              alert(error);
            }
          })();
        })
      );

      setRouteData((previousState) => {
        console.log("setRouteUURLRURLRU", urls);
        return {
          ...previousState,
          urls,
        };
      });
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getFilesUrlFromStorage();
  }, []);

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
      inputs: false,
      instructions: false,
      profileSwitcher: true,
    },
    zoom: 10,
  });

  const nav = new mapboxgl.NavigationControl();

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
  }, [rateValue]);

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
    map.current.on("mouseover", "LineString", function () {
      console.log(
        "A mouseover event has occurred on a visible portion of the poi-label layer."
      );
    });
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
          directions.setOrigin(routeData.origin);
          directions.setDestination(routeData.destination);
          const bbox = [routeData.origin, routeData.destination];
          map.current.fitBounds(bbox, {
            padding: 100,
            // duration: 2000,
          });
        });
    });
  });

  useEffect(() => {
    return () => {
      directions.removeRoutes();
      map.current.remove();
    };
  }, []);

  async function fetchDirectionData() {
    const coordinatesString = `${routeData.origin.join()};${routeData.destination.join()}`;
    console.log(coordinatesString);
    try {
      let response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/cycling/${coordinatesString}?geometries=geojson&access_token=pk.eyJ1Ijoia2FyY2lvIiwiYSI6ImNrcTd6YjExejAxc3kyb3BrcnBzY252em4ifQ.emytj-LkRX7RcGueM2S9HA`
      );
      let data = await response.json();
      console.log(data);
      const allCoordinates = data.routes[0].geometry.coordinates;
      let step = (Number(routeData.distance) / allCoordinates.length).toFixed(
        3
      );
      // return;
      const allResponses = await Promise.all(
        allCoordinates.map((coordinates, index) => {
          const stringCoordinate = coordinates.join();
          return (async () => {
            try {
              const response = await fetch(
                `https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/${stringCoordinate}.json?layers=contour&limit=50&access_token=pk.eyJ1Ijoia2FyY2lvIiwiYSI6ImNrcTd6YjExejAxc3kyb3BrcnBzY252em4ifQ.emytj-LkRX7RcGueM2S9HA`
              );
              const data = await response.json();
              const allFeatures = data.features;
              const elevations = allFeatures.map(
                (object) => object.properties.ele
              );
              const highestElevetion = Math.max(...elevations);
              const distance = (step * (index + 1)).toFixed(2);
              const chartObject = {
                distance: distance,
                coordinates: coordinates,
                elevation: highestElevetion,
              };
              return chartObject;
            } catch (err) {
              alert(err);
            }
          })();
        })
      );
      setChartData(allResponses);
    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    if (routeData.origin && routeData.destination) {
      console.log("async function started");
      fetchDirectionData();
    }
  }, [routeData.origin, routeData.destination]);

  const manageMarker = (object) => {
    if (!object.isTooltipActive) return;
    if (!object.activePayload) return; // before render chart with data
    if (map.current._markers[0]) map.current._markers[0].remove();
    if (object.activePayload[0]) {
      const elevation = object.activePayload[0].payload.elevation;
      const coordinates = object.activePayload[0].payload.coordinates;
      const marker = new mapboxgl.Marker({
        color: "#f36046",
        draggable: false,
        scale: 0.8,
      })
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
    if (map.current._markers[0]) map.current._markers[0].remove();
  };

  const chart = (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart
        data={chartData}
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

  console.log(routeData);

  return (
    <div className={classes.flexContainer}>
      <div className={classes.flexchild1}>
        {routeData.urls.length > 0 ? <Slider urls={routeData.urls} /> : ""}
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
              {routeData.isDataLoaded
                ? routeData.routeDescription
                : [<Skeleton />, <Skeleton />]}
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
              <Typography variant="h3" style={{ padding: "20px" }}>
                {routeData.votesAverage}
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
            {isChartDataLoaded ? (
              chart
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
