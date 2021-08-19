import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    minHeight: "15rem",
    backgroundColor: "#3bb2d0",
    padding: "1.5rem",
  },
  iconBox: {
    display: "flex",
  },
  listItem: {
    paddingLeft: "0",
    paddingRight: "0",
    maxWidth: "4.5rem",
  },
  avatar: {
    backgroundColor: "#fafafa",
  },
  icon: {
    color: "#3bb2d0",
  },
  title: {
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: "left",
    lineHeight: "3rem",
  },
  text: {
    color: "#fff",
    textAlign: "left",
  },
  moreText: {
    color: "#fff",
    textAlign: "left",
    paddingRight: "9rem",
    [theme.breakpoints.down("sm")]: {
      paddingRight: "3rem",
    },
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Container fixed>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" className={classes.title}>
              Our goal
            </Typography>
            <div className={classes.moreText}>
              Our application was created to promote cycling as a form of
              sustainable tourism and to encourage an active and healthy
              lifestyle.
              <br />
              <br />
              Our goal is to promote the best bicycle routes and places in
              Poland among Polish and foreign cyclists.
            </div>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" className={classes.title}>
              Authors
            </Typography>
            <Typography variant="body1" className={classes.text}>
              Karol Ciolczyk
              <br />
              Ilona Kozak
              <br />
              Michal Lachowski
              <br />
              Adam Szumski
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h4" className={classes.title}>
              Rowersi...
            </Typography>
            <Typography variant="body1" className={classes.text}>
              Made in Poland with love!
            </Typography>
            <List className={classes.iconBox}>
              <Link
                to={{ pathname: "https://www.facebook.com" }}
                target="_blank"
                aria-label="facebook"
              >
                <ListItem className={classes.listItem}>
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      <FacebookIcon className={classes.icon} />
                    </Avatar>
                  </ListItemAvatar>
                </ListItem>
              </Link>
              <Link
                to={{ pathname: "https://twitter.com" }}
                target="_blank"
                aria-label="twitter"
              >
                <ListItem className={classes.listItem}>
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      <TwitterIcon className={classes.icon} />
                    </Avatar>
                  </ListItemAvatar>
                </ListItem>
              </Link>
              <Link
                to={{ pathname: "https://www.instagram.com" }}
                target="_blank"
                aria-label="instagram"
              >
                <ListItem className={classes.listItem}>
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      <InstagramIcon className={classes.icon} />
                    </Avatar>
                  </ListItemAvatar>
                </ListItem>
              </Link>
            </List>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}
