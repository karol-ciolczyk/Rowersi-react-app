import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  InputBase,
  alpha,
  makeStyles,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import styled from "styled-components";

import SignUpModal from "./SignUpModal/SignUpModal";
import LoginModal from "./LoginModal/LoginModal";

import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { LogOutButton } from "./LogOutButton/LogOutButton";

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

  function newRouteButtonClickHandler() {
    history.push("/newRoute");
  }

  const isSignUpLinkClickedHandler = function () {
    setTimeout(() => {
      if (isSignUpClicked) setIsSignUpClicked(false);
      if (!isSignUpClicked) setIsSignUpClicked(true);
    }, 350);
  };

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
              <Button
                variant="contained"
                onClick={newRouteButtonClickHandler}
                style={{
                  marginRight: "7px",
                  color: "white",
                  backgroundColor: "tomato",
                }}
              >
                New Route
              </Button>
              <LoginModal
                onLoggedInData={props.onLoggedInData}
                isSignUpLinkClickedHandler={isSignUpLinkClickedHandler}
              />
              <SignUpModal isSignUpClicked={isSignUpClicked} />
              <LogOutButton />
              <Link to="/profile">
                <IconButton aria-label="account">
                  <AccountCircle />
                </IconButton>
              </Link>
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
