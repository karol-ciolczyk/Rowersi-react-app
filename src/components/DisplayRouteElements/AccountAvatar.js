import React, { useState } from "react";

import style from "./Avatar.module.css";

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
      <div className={isAnimated ? style.avatarAnimation : style.avatar}></div>
      <div className={isAnimated ? style.linkAnimation : style.link}>
        <a href="#"> Mustafa Mustafin</a>
      </div>
    </div>
  );
};
