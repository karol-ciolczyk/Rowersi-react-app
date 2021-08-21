import React, { useState } from "react";

import { DropMenu } from "./DropMenu";
import { AccountCircle } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

import style from "./AccountButton.module.css";

export const AccountButton = function () {
  const [isAccount, setIsAccount] = useState(false);

  const accountClickHandler = function () {
    setIsAccount(!isAccount);
  };

  return (
    <div className={style.accountButton} onClick={accountClickHandler}>
      <DropMenu isAccountClicked={isAccount} />
      <IconButton aria-label="account">
        <AccountCircle />
      </IconButton>
    </div>
  );
};
