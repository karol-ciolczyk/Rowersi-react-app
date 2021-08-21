import { Paper, Typography } from "@material-ui/core";
import React from "react";

import style from "./DropMenu.module.css";

export const DropMenu = function (props) {
  return (
    <Paper
      elevation={3}
      className={
        props.isAccountClicked
          ? style["dropMenu--visible"]
          : style["dropMenu--hide"]
      }
    >
      <div> Twój profil / Wyświetl profil </div>
      <div> Ustawienia konta </div>
      <div> Logout button </div>
    </Paper>
  );
};
