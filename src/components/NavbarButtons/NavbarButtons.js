import React, { useContext } from "react";
import UserSessionContext from "../context/userSession-context";
import { useHistory } from "react-router-dom";

import { Button } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import SignUpModal from "../SignUpModal/SignUpModal";
import LoginModal from "../LoginModal/LoginModal";
import { AccountButton } from "./AccountButton";

import style from "./NavbarButtons.module.css";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  button1: {
    margin: "0px 5px",
    backgroundColor: "Tomato",
    color: "#fff",
    "&:hover, &:focus": {
      backgroundColor: "#db543c",
    },
  },
  button2: {
    margin: "0px 5px",
    backgroundColor: "#3BB2D0",
    color: "#fff",
    "&:hover, &:focus": {
      backgroundColor: "#329fba",
    },
  },
}));

export const NavbarButtons = function (props) {
  const classes = useStyles();
  const history = useHistory();
  const ctx = useContext(UserSessionContext);

  const onClickHandler = function () {
    history.push("/");
  };

  const navButtons = ctx.userUid ? (
    <div className={style.buttons}>
      <Button
        className={classes.button1}
        startIcon={<DirectionsBikeIcon />}
        variant="contained"
        onClick={props.newRouteButtonClickHandler}
      >
        New Route
      </Button>
      <Button
        className={classes.button2}
        variant="contained"
        startIcon={<HomeIcon />}
        onClick={onClickHandler}
      >
        Home
      </Button>
      <AccountButton />
    </div>
  ) : (
    <>
      <LoginModal
        onLoggedInData={props.onLoggedInData}
        isSignUpLinkClickedHandler={props.isSignUpLinkClickedHandler}
      />
      <SignUpModal isSignUpClicked={props.isSignUpClicked} />
    </>
  );

  return <>{navButtons}</>;
};
