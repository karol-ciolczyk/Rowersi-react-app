import React from "reat";

import { AccountCircle } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

export const AccountButton = function () {
  return (
    <IconButton aria-label="account">
      <AccountCircle />
    </IconButton>
  );
};
