import { UserAvatar } from "./avatar";
import { UserWallpaper } from "./user-wallpaper";
import "./Profile.css";
import UserProfileTabs from "./profileTab";
import { Switch, Route } from "react-router-dom";
import { FriendsList } from "./FriendsList";
import { Dashboard } from "./Dashboard";
import { ProfileSettings } from "./ProfileSettings";

export function Profile() {
  function handleUserWallpaper() {
    //if user has uploaded wallpaper use it or get default wallpaper
    return "https://picsum.photos/950/300";
  }

  function handleUserAvatar() {
    //if user has uploaded avatar picture use it or get default avatar
    return "https://picsum.photos/150/150";
  }

  function renderUserName() {
    // render user name along avatar pic, if there is no name use placeholder
    return "Anonymus";
  }
  return (
    <>
      <UserWallpaper url={handleUserWallpaper()} />
      <div className="userProfile_navBar">
        <UserAvatar url={handleUserAvatar()} />
        <span>{renderUserName()}</span>
      </div>
      <UserProfileTabs />
      <div>
        <Switch>
          <Route path="/profile/profilesettings">
            <ProfileSettings />
          </Route>
          <Route path="/profile/friendslist">
            <FriendsList />
          </Route>
          <Route path="/profile/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </>
  );
}
