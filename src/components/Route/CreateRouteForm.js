import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import UploadImages from "../ImageUpload/UploadImages";
import UserSessionContext from "../context/userSession-context";
import addRouteDataToFirebase from "../../firebase/addRouteDataToFirebase";
import { Tooltip } from "@material-ui/core";
import DirectionsIcon from "@material-ui/icons/Directions";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import HeightIcon from "@material-ui/icons/Height";
import firebase from "firebase/app";
import "firebase/storage";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  container: {
    marginRight: "0px",
    position: "absolute", ////////   added by Karol
    zIndex: "1", ////////   added by Karol
    right: "20px", ////////   added by Karol
    top: "20px", ////////   added by Karol
  },
  paper: {
    marginTop: "20px",
    paddingBottom: "0px",
  },
  title: {
    color: "#3bb2d0",
    textTransform: "uppercase",
    fontWeight: "bold",
    paddingTop: "20px",
    paddingBottom: "10px",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  formFullWidth: {
    margin: theme.spacing(2),
    width: "55ch",
    "& label.Mui-focused": {
      color: "#3bb2d0",
    },
    "&.Mui-focused fieldset": {
      borderColor: "green",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "grey",
      },
      "&:hover fieldset": {
        borderColor: "#8fdef2",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3bb2d0",
      },
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  submit: {
    color: "white",
    backgroundColor: "tomato",
    width: "55ch",
    margin: "10px auto",
    padding: "10px",
  },
  routeDetailsContainer: {
    display: "flex",
    flexDirection: "column",
  },
  routeDetails: {
    width: "55ch",
    margin: "auto",
    marginBottom: "10px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  routeDetailsItem: {
    width: theme.spacing(16),
    flexGrow: "1",
    height: "100px",
    margin: "1px",
    padding: "10px 3px",
  },
  accordionSummary: {
    backgroundColor: "#3bb2d0",
    "&:hover": {
      backgroundColor: "#34bfe2",
    },
  },
}));

export default function CreateRouteForm(props) {
  const classes = useStyles();
  const [routeDescription, setRouteDescription] = useState({
    region: "",
    routeTitle: "",
    routeDescription: "",
  });
  const [routeFiles, setRouteFiles] = useState([]);
  const {
    distance,
    origin,
    destination,
    duration,
    originElevation,
    waypoints,
  } = props.routeData;
  const ctx = useContext(UserSessionContext);

  const handleChange = (event) => {
    setRouteDescription((previousState) => {
      return {
        ...previousState,
        [event.target.name]: event.target.value,
      };
    });
  };

  async function fetchRouteDataForChart(
    origin,
    destination,
    distance,
    waypoints
  ) {
    const waypointsString = Object.keys(waypoints)
      .map((number) => waypoints[number])
      .map((array) => array.join())
      .join(";");
    const coordinatesString = `${origin.join()};${waypointsString};${destination.join()}`;
    try {
      let response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/cycling/${coordinatesString}?geometries=geojson&access_token=pk.eyJ1Ijoia2FyY2lvIiwiYSI6ImNrcTd6YjExejAxc3kyb3BrcnBzY252em4ifQ.emytj-LkRX7RcGueM2S9HA`
      );
      let data = await response.json();
      const allCoordinates = data.routes[0].geometry.coordinates;
      let step = (Number(distance) / allCoordinates.length).toFixed(3);
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
      console.log(allResponses);
      return allResponses;
    } catch (err) {
      alert(err);
    }
  }

  async function addRouteData(allRouteData, routeFiles) {
    console.log(allRouteData);
    console.log(routeFiles);
    try {
      const response = await addRouteDataToFirebase(allRouteData);
      const routeAddedId = response.id;

      routeFiles.files.forEach((filesObject) => {
        const routeFileName = filesObject.name;
        firebase
          .storage()
          .ref(
            `usersTest/${ctx.userUid}/routes/${routeAddedId}/${routeFileName}`
          )
          .put(filesObject);
      });
      alert("new route with images added to dataBase");
    } catch (error) {
      alert(error);
    }
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    (async function () {
      try {
        const chartData = await fetchRouteDataForChart(
          origin,
          destination,
          distance,
          waypoints
        );
        const allRouteData = {
          ...routeDescription,
          ...props.routeData,
          ...ctx,
          chartData,
          isVote: true, // only to recognise for firebase subscribe (listening) function onSnapshot in RouteData.js
        };
        addRouteData(allRouteData, routeFiles);
      } catch (error) {
        console.log(error);
      }
    })();

    setRouteDescription((previousState) => {
      return {
        ...previousState,
        routeDescription: "",
        routeTitle: "",
        region: "",
      };
    });
  };

  console.log("createRouteForm comonent, routeData:", props.routeData);

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Paper elevation={7} className={classes.paper}>
        <CssBaseline />
        <div>
          <Typography className={classes.title} variant="h5" noWrap>
            Create New Route
          </Typography>

          <div className={classes.routeDetails}>
            <Paper
              variant="outlined"
              elevation={0}
              className={classes.routeDetailsItem}
            >
              <div className={classes.routeDetailsContainer}>
                <Tooltip title="Duration" placement="bottom">
                  <div>
                    <QueryBuilderIcon
                      style={{ fontSize: 45, color: "#b8b8b8" }}
                    />
                  </div>
                </Tooltip>
                <div>{duration}</div>
              </div>
            </Paper>
            <Paper
              variant="outlined"
              elevation={0}
              className={classes.routeDetailsItem}
            >
              <div className={classes.routeDetailsContainer}>
                <Tooltip title="Distance" placement="bottom">
                  <div>
                    <DirectionsIcon
                      style={{ fontSize: 45, color: "#b8b8b8" }}
                    />
                  </div>
                </Tooltip>
                <div>{distance} km</div>
              </div>
            </Paper>
            <Paper
              variant="outlined"
              elevation={0}
              className={classes.routeDetailsItem}
            >
              <div className={classes.routeDetailsContainer}>
                <Tooltip title="Elevation" placement="bottom">
                  <div>
                    <HeightIcon style={{ fontSize: 45, color: "#b8b8b8" }} />
                  </div>
                </Tooltip>
                <div>{originElevation} m</div>
              </div>
            </Paper>
          </div>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              // style={{ backgroundColor: "#3bb2d0" }}
              className={classes.accordionSummary}
            >
              <Typography variant="subtitle1" style={{ marginRight: "60px" }}>
                Description:
              </Typography>
              <Typography variant="subtitle1" style={{ color: "white" }}>
                Add route descritpion here
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <form
                onSubmit={onSubmitHandler}
                className={classes.root}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    name="routeTitle"
                    value={routeDescription.routeTitle}
                    className={classes.formFullWidth}
                    label="Enter a title for your route"
                    variant="outlined"
                    onChange={handleChange}
                  />
                  <TextField
                    name="routeDescription"
                    value={routeDescription.routeDescription}
                    className={classes.formFullWidth}
                    label="Description"
                    multiline
                    rows={3}
                    variant="outlined"
                    onChange={handleChange}
                  />

                  <FormControl
                    variant="outlined"
                    className={classes.formFullWidth}
                  >
                    <InputLabel id="select-region">Region</InputLabel>
                    <Select
                      name="region"
                      labelId="select-region"
                      id="select-region"
                      value={routeDescription.region}
                      onChange={handleChange}
                      label="Region"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"Greater Poland"}>
                        Greater Poland
                      </MenuItem>
                      <MenuItem value={"Kuyavia"}>Kuyavia</MenuItem>
                      <MenuItem value={"Mazury"}>Mazury</MenuItem>
                      <MenuItem value={"Podhale"}>Podhale</MenuItem>
                      <MenuItem value={"Pomerania"}>Pomerania</MenuItem>
                      <MenuItem value={"Silesia"}>Silesia</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <UploadImages setRouteFiles={setRouteFiles} />
                <Button
                  type="submit"
                  variant="contained"
                  className={classes.submit}
                >
                  Submit
                </Button>
              </form>
            </AccordionDetails>
          </Accordion>
        </div>
      </Paper>
    </Container>
  );
}
