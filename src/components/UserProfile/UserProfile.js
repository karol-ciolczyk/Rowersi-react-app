import { UserCard } from "./UserCard";

import style from "./UserProfile.module.css";

export const UserProfile = function () {
  return (
    <>
      <div className={style.userCard}>
        <UserCard />
      </div>
      <section className={style.userProfileContent}>
        <div>background photo</div>
        <div>content of the userPage</div>
      </section>
    </>
  );
};
