import React, { useContext } from "react";
import UserSessionContext from "../context/userSession-context";

import { Button } from "@material-ui/core";
import SignUpModal from "../SignUpModal/SignUpModal";
import LoginModal from "../LoginModal/LoginModal";
import { AccountButton } from "./AccountButton";

import style from "./NavbarButtons.module.css";

export const NavbarButtons = function (props) {
  const ctx = useContext(UserSessionContext);
  const navButtons = ctx.userUid ? (
    <div className={style.buttons}>
      <Button
        className={style["button--newRoute"]}
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
