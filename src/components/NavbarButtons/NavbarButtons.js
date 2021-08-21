import React, { useContext } from "react";
import UserSessionContext from "../context/userSession-context";

import { IconButton, Button } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";

import SignUpModal from "../SignUpModal/SignUpModal";
import LoginModal from "../LoginModal/LoginModal";

import { Link } from "react-router-dom";

import { LogOutButton } from "../LogOutButton/LogOutButton";
import { AccountButton } from "./AccountButton";

export const NavbarButtons = function (props) {
  const ctx = useContext(UserSessionContext);
  const navButtons = ctx.userUid ? (
    <>
      <Link to="/profile">
        <IconButton aria-label="account">
          <AccountCircle />
        </IconButton>
      </Link>
      <Button
        variant="contained"
        onClick={props.newRouteButtonClickHandler}
        style={{
          marginRight: "7px",
          color: "white",
          backgroundColor: "tomato",
        }}
      >
        New Route
      </Button>
      <LogOutButton />
      <AccountButton />
    </>
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
