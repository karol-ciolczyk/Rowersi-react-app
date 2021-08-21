import React from "react";
import { Link } from "react-router-dom";
import { Paper, Typography } from "@material-ui/core";

import style from "./DropMenu.module.css";

export const DropMenu = function (props) {
  return (
    <Paper
      elevation={6}
      className={
        props.isAccountClicked
          ? style["dropMenu--visible"]
          : style["dropMenu--hide"]
      }
    >
      <Link to="/profile" style={{ textDecoration: "none" }}>
        <div className={style.dropMenu__userInfo}>
          <div className={style["dropMenu__userInfo__avatar"]}></div>
          <Typography
            variant="h6"
            className={style["dropMenu__userInfo__userName"]}
          >
            Amelia Ameliowska
          </Typography>
        </div>
      </Link>
      <div>
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <button
            className={style["dropMenu__userInfo__button--showProfilePage"]}
          >
            <Typography variant="subtitle2"> show profile </Typography>
          </button>
        </Link>
      </div>
      <hr></hr>
      <div className={style.dropMenu__account}>
        <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
          Account
        </Typography>
        <Link to="/userData" className={style.dropMenu__account__link}>
          <Typography variant="body2">User Data</Typography>
        </Link>
        <Link to="/userData" className={style.dropMenu__account__link}>
          <Typography variant="body2">Friends</Typography>
        </Link>
        <Link to="/userData" className={style.dropMenu__account__link}>
          <Typography variant="body2">Events</Typography>
        </Link>
      </div>
      <div>
        <Typography>Logout button</Typography>
      </div>
    </Paper>
  );
};
