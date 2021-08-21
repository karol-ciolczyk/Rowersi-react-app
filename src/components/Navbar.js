import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  alpha,
  makeStyles,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { NavbarButtons } from "./NavbarButtons/NavbarButtons";

import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  title: {
    textTransform: "uppercase",
    fontWeight: "bold",
    justifyContent: "flex-start",
    borderRight: "1px solid #ccc",
    paddingRight: "25px",
    display: "block",
    color: "#3bb2d0",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
      borderRight: "none",
      paddingRight: "10px",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Navbar(props) {
  const classes = useStyles();
  const history = useHistory();
  const [isSignUpClicked, setIsSignUpClicked] = useState(null);
  const [loader, setLoader] = useState(true);

  function newRouteButtonClickHandler() {
    history.push("/newRoute");
  }

  const isSignUpLinkClickedHandler = function () {
    setTimeout(() => {
      if (isSignUpClicked) setIsSignUpClicked(false);
      if (!isSignUpClicked) setIsSignUpClicked(true);
    }, 350);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1500);
  }, []);

  return (
    <div className={classes.root}>
      <AppBar color="default">
        <Toolbar>
          <Typography
            component={Link}
            to={"/"}
            className={classes.title}
            variant="h4"
            noWrap
            style={{ textDecoration: "none" }}
          >
            Rowersi
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <RightBox>
            <div>
              {loader ? (
                "loading..."
              ) : (
                <NavbarButtons
                  newRouteButtonClickHandler={newRouteButtonClickHandler}
                  onLoggedInData={props.onLoggedInData}
                  isSignUpLinkClickedHandler={isSignUpLinkClickedHandler}
                  isSignUpClicked={isSignUpClicked}
                />
              )}
            </div>
          </RightBox>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const RightBox = styled.div`
  margin-left: auto;
`;
