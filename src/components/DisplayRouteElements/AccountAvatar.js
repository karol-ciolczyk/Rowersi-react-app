import React, { useState } from "react";

import style from "./AccountAvatar.module.css";

export const AccountAvatar = function () {
  const [isAnimated, setIsAnimated] = useState(false);

  return (
    <div
      className={
        isAnimated ? style.avatarContainerAnimation : style.avatarContainer
      }
      onMouseEnter={() => {
        setIsAnimated(true);
      }}
      onMouseLeave={() => {
        setIsAnimated(false);
      }}
    >
      <div className={style.avatar}></div>
      <div className={style.link}>
        <a href="#"> This is account name</a>
      </div>
    </div>
  );
};
