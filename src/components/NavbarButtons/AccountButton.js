import React, { useState } from "react";

import { DropMenu } from "./DropMenu";

import style from "./AccountButton.module.css";

export const AccountButton = function () {
  const [isAccount, setIsAccount] = useState(false);

  const accountClickHandler = function () {
    setIsAccount(!isAccount);
  };

  return (
    <div className={style.accountButton} onClick={accountClickHandler}>
      <DropMenu isAccountClicked={isAccount} />
    </div>
  );
};
