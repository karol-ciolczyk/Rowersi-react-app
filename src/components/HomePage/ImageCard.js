import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Collapse } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: 380,
    boxShadow: "0 3px 5px 2px #adadad;",
    marginBottom: "1.3rem",
  },
  media: {
    height: 392,
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    textTransform: "uppercase",
    color: "#242424",
  },
});

export default function ImageCard({ region, checked }) {
  const classes = useStyles();

  return (
    <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
      <Link to={region.linkPath} style={{ textDecoration: "none" }}>
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={region.imageUrl}
            title="Popular Region"
          />
          <CardContent>
            <Typography gutterBottom component="h3" className={classes.title}>
              {region.title}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Collapse>
  );
}
