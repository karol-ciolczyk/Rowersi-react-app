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
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import DirectionsIcon from "@material-ui/icons/Directions";
import HeightIcon from "@material-ui/icons/Height";
import MouseOverPopover from "./MouseOverPopover";

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
    paddingBottom: "20px",
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  routeDetailsItem: {
    width: theme.spacing(16),
    flexGrow: "1",
    height: "100px",
    margin: "1px",
    padding: "5px 3px",
  },
}));

export default function CreateRouteForm(props) {
  const classes = useStyles();
  const [routeDescription, setRouteDescription] = useState({
    region: "",
    routeTitle: "",
    routeDescription: "",
  });
  const { distance, duration, originElevation, destinationElevation } =
    props.routeData;
  const ctx = useContext(UserSessionContext);
  console.log(ctx);

  const handleChange = (event) => {
    setRouteDescription((previousState) => {
      return {
        ...previousState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const allRouteData = { ...routeDescription, ...props.routeData, ...ctx };

    console.log(allRouteData);
    addRouteDataToFirebase(allRouteData);
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Paper elevation={7} className={classes.paper}>
        <CssBaseline />
        <div>
          <Typography className={classes.title} variant="h5" noWrap>
            Create New Route
          </Typography>

          <form
            onSubmit={onSubmitHandler}
            className={classes.root}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                name="routeTitle"
                className={classes.formFullWidth}
                label="Enter a title for your route"
                variant="outlined"
                onChange={handleChange}
              />
              <TextField
                name="routeDescription"
                className={classes.formFullWidth}
                label="Description"
                multiline
                rows={3}
                variant="outlined"
                onChange={handleChange}
              />
              <div className={classes.routeDetails}>
                <Paper
                  variant="outlined"
                  elevation={0}
                  className={classes.routeDetailsItem}
                >
                  <div className={classes.routeDetailsContainer}>
                    <div>
                      <MouseOverPopover data="duration" />
                    </div>
                    <div>{duration}</div>
                  </div>
                </Paper>
                <Paper
                  variant="outlined"
                  elevation={0}
                  className={classes.routeDetailsItem}
                >
                  <div className={classes.routeDetailsContainer}>
                    <div>
                      <MouseOverPopover data="distance" />
                    </div>
                    <div>{distance} km</div>
                  </div>
                </Paper>
                <Paper
                  variant="outlined"
                  elevation={0}
                  className={classes.routeDetailsItem}
                >
                  <div className={classes.routeDetailsContainer}>
                    <div>
                      <MouseOverPopover data="elevation" />
                    </div>
                    <div>{originElevation} m</div>
                  </div>
                </Paper>
              </div>

              <FormControl variant="outlined" className={classes.formFullWidth}>
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
                  <MenuItem value={"Greater Poland"}>Greater Poland</MenuItem>
                  <MenuItem value={"Kuyavia"}>Kuyavia</MenuItem>
                  <MenuItem value={"Mazury"}>Mazury</MenuItem>
                  <MenuItem value={"Podhale"}>Podhale</MenuItem>
                  <MenuItem value={"Pomerania"}>Pomerania</MenuItem>
                  <MenuItem value={"Silesia"}>Silesia</MenuItem>
                </Select>
              </FormControl>
            </div>
            <UploadImages />
            <Button
              type="submit"
              variant="contained"
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
        </div>
      </Paper>
    </Container>
  );
}
