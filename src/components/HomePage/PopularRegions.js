import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import ImageCard from "./ImageCard";
import regions from "./regions";
import useWindowPosition from "./useWindowPosition";

const useStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    paddingBottom: "4rem",
    paddingTop: "2rem",
    marginTop: "4rem",
    borderTop: "1px solid #ccc6",
    borderBottom: "1px solid #ccc6",
  },
  regionCards: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: "4rem",
    gap: "1rem",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  title: {
    fontWeight: "bold",
    fontSize: "2rem",
    textTransform: "uppercase",
    color: "#3bb2d0",
    marginTop: "2rem",
  },
  button: {
    color: "white",
    backgroundColor: "tomato",
    marginTop: "3rem",
    "&:hover": {
      backgroundColor: "tomato",
    },
  },
}));

export default function PopularRegions() {
  const classes = useStyle();
  const checked = useWindowPosition("heroImage");

  return (
    <div className={classes.root}>
      <Container fixed>
        <Typography variant="h2" gutterBottom className={classes.title}>
          Popular regions
        </Typography>
        <Typography variant="body1" gutterBottom>
          Discover handpicked cycling regions in Poland with our beautiful
          region guides
        </Typography>
        <section className={classes.regionCards}>
          <ImageCard region={regions[0]} checked={checked} />
          <ImageCard region={regions[1]} checked={checked} />
          <ImageCard region={regions[2]} checked={checked} />
          <ImageCard region={regions[3]} checked={checked} />
          <ImageCard region={regions[4]} checked={checked} />
          <ImageCard region={regions[5]} checked={checked} />
        </section>
        <Button
          size="large"
          component={Link}
          to="/regions"
          variant="contained"
          className={classes.button}
        >
          Explore All Regions
        </Button>
      </Container>
    </div>
  );
}
