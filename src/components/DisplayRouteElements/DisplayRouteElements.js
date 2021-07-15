import React, { useEffect, useState, useContext } from "react";
import UserSessionContext from "../context/userSession-context";
import firebase from "firebase";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { CircularProgress, Grid } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 365,
    boxShadow: "0 3px 5px 2px #adadad",
    margin: "20px auto",
  },
  gridRoot: {
    flexGrow: "1",
    margin: "auto",
    width: "90%",
  },
  gridItem: {
    borderRight: "1px solid black",
  },
  media: {
    height: 180,
  },
  routeDescription: {
    overflow: "auto",
    height: "70px",
  },
});

const DisplayRouteElements = () => {
  const [routesData, setRoutesData] = useState([]);
  const ctx = useContext(UserSessionContext);
  const classes = useStyles();

  console.log(ctx);

  const progressElement = routesData.length > 0 ? "" : <CircularProgress />;

  useEffect(() => {
    // firebase
    //   .firestore()
    //   .collection("routes")
    //   .get()
    //   .then((response) => {
    //     const doscsArray = response.docs;
    //     const routeDataObjects = doscsArray.map((object) => {
    //       const seconds = object.data().duration;
    //       const time = new Date(seconds * 1000).toISOString().substr(11, 8);
    //       const distanceInKm = (object.data().distance / 1000).toFixed(3);
    //       return {
    //         ...object.data(),
    //         routeId: object.id,
    //         duration: time,
    //         distance: distanceInKm,
    //       };
    //     });
    //     setRoutesData(routeDataObjects.slice(0, 4)); // show only 4 objects from data base - first four objects from the array
    //   });

    //////////////////////////////////////////////////////////////////////////////////////
    const users = firebase.firestore().collection("users");
    const userRef = firebase.firestore().doc(`users/${ctx.userUid}`);
    console.log(users);

    users.get().then((object) => {
      const usersIdArray = object.docs.map((obj) => obj.id);
      let routeObjectFinished = [];
      usersIdArray.map((id, index) => {
        firebase
          .firestore()
          .doc(`users/${id}`)
          .collection("routes")
          .get()
          .then((response) => {
            // console.log(response.docs);
            const routeDocs = response.docs;
            const rotesData = routeDocs.map((obj) => {
              return { ...obj.data(), id: obj.id };
            });
            const routeDataObjects = rotesData.map((object) => {
              const seconds = object.duration;
              const time = new Date(seconds * 1000).toISOString().substr(11, 8);
              const distanceInKm = (object.distance / 1000).toFixed(3);
              return {
                ...object,
                routeId: object.id,
                duration: time,
                distance: distanceInKm,
              };
            });
            // console.log(routeDataObjects);
            routeObjectFinished = routeObjectFinished.concat(routeDataObjects);
            if (index === usersIdArray.length - 1) {
              console.log(routeObjectFinished);
              setRoutesData(routeObjectFinished);
            }
          });
      });
    });
    //////////////////////////////////////////////////////////////////////////////////////
  }, [ctx.userUid]);

  return (
    <div className={classes.gridRoot}>
      {progressElement}
      <Grid container spacing={0}>
        {routesData.map((object) => (
          <Grid key={object.routeId} item xs={3}>
            <Card className={classes.root}>
              <Link
                to={`/route/${object.routeId}`}
                style={{ textDecoration: "none", color: "#222222" }}
              >
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={object.img}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {object.routeTitle}
                    </Typography>
                    <div className={classes.routeDescription}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {object.routeDescription}
                      </Typography>
                    </div>
                  </CardContent>
                </CardActionArea>
              </Link>
              <CardActions>
                <Grid container spacing={0}>
                  <Grid className={classes.gridItem} item xs={3}>
                    <Typography
                      align="center"
                      variant="h6"
                      display="block"
                      gutterBottom
                    >
                      {object.duration}
                    </Typography>
                    <Typography
                      align="center"
                      variant="caption"
                      display="block"
                      gutterBottom
                    >
                      time
                    </Typography>
                  </Grid>
                  <Grid className={classes.gridItem} item xs={3}>
                    <Typography
                      align="center"
                      variant="h6"
                      display="block"
                      gutterBottom
                    >
                      {object.distance}
                    </Typography>
                    <Typography
                      align="center"
                      variant="caption"
                      display="block"
                      gutterBottom
                    >
                      distance KM
                    </Typography>
                  </Grid>
                  <Grid className={classes.gridItem} item xs={3}>
                    <Typography
                      align="center"
                      variant="h6"
                      display="block"
                      gutterBottom
                    >
                      {object.originElevation}
                    </Typography>
                    <Typography
                      align="center"
                      variant="caption"
                      display="block"
                      gutterBottom
                    >
                      Heighest A
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      align="center"
                      variant="h6"
                      display="block"
                      gutterBottom
                    >
                      {object.destinationElevation}
                    </Typography>
                    <Typography
                      align="center"
                      variant="caption"
                      display="block"
                      gutterBottom
                    >
                      Heighest B
                    </Typography>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default DisplayRouteElements;

// <img src={`${routeData.img}`} width="800px" height="400px" alt="map screen" />;
