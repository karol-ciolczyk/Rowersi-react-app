import { Paper } from "@material-ui/core";

import style from "./UserCard.css";

export const UserCard = function () {
  return (
    <Paper elevation={3}>
      <section>
        <div className={style.photoContainer}> Photo </div>
        <div className={style.userDescription}>User Description</div>
      </section>
    </Paper>
  );
};
