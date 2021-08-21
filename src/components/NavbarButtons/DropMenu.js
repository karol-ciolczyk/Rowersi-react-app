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
          <div className={style["dropMenu__userInfo--avatar"]}></div>
          <Typography className={style["dropMenu__userInfo--userName"]}>
            Amelia Ameliowska
          </Typography>
        </div>
      </Link>
      <hr></hr>
      <div>
        <Typography>Ustawienia konta</Typography>
      </div>
      <div>
        <Typography>Logout button</Typography>
      </div>
    </Paper>
  );
};
