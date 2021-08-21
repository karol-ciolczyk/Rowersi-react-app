import { UserCard } from "./UserCard";

import style from "./UserProfile.module.css";

export const UserProfile = function () {
  return (
    <>
      <div className={style.userCard}>
        <UserCard />
      </div>
      <section className={style.userProfileContent}>
        <div className={style.userProfileContent__backgroundGraphic}>
          background photo
        </div>
        <div className={style.userProfileContent__data}>
          content of the userPage
        </div>
      </section>
    </>
  );
};
