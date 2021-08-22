import React, { useContext } from "react";
import UserSessionContext from "../context/userSession-context";

import { Button } from "@material-ui/core";
import SignUpModal from "../SignUpModal/SignUpModal";
import LoginModal from "../LoginModal/LoginModal";
import { AccountButton } from "./AccountButton";

import style from "./NavbarButtons.module.css";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: "0px 5px",
    backgroundColor: "Tomato",
    color: "#fff",
    "&:hover, &:focus": {
      backgroundColor: "#db543c",
    },
  },
}));

export const NavbarButtons = function (props) {
  const classes = useStyles();
  const ctx = useContext(UserSessionContext);
  const navButtons = ctx.userUid ? (
    <div className={style.buttons}>
      <Button
        className={classes.button}
        variant="contained"
        onClick={props.newRouteButtonClickHandler}
      >
        New Route
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
