import { Paper } from "@material-ui/core";

import style from "./UserCard.module.css";

export const UserCard = function () {
  return (
    <Paper elevation={3}>
      <section className={style.container}>
        <div className={style.container__photoContainer}> Photo </div>
        <div className={style.container__userDescription}>User Description</div>
      </section>
    </Paper>
  );
};
