import { UserAvatar } from "./avatar";
import { UserWallpaper } from "./user-wallpaper";
import "./Profile.css";
import UserProfileTabs from "./profileTab";
import { Switch, Route } from "react-router-dom";
import { FriendsList } from "./FriendsList";
import { Dashboard } from "./Dashboard";
import { ProfileSettings } from "./ProfileSettings";
import UserSessionContext from '../components/context/userSession-context.js';
import { useContext, useState } from "react";
import firebase from "firebase";

export function Profile() {

  const userSessionContext = useContext(UserSessionContext);
  const { userUid } = userSessionContext;

  const [ wallpaperUrl, setWallpaperUrl ] = useState("https://picsum.photos/950/300");
  const [ avatarUrl, setAvatarUrl ] = useState("https://picsum.photos/150/150");

  handleUserWallpaper(userUid);
  handleUserAvatar(userUid);

  function handleUserWallpaper(uid) {
      firebase
      .storage()
      .ref("usersTest/" + uid + "/wallpaper/background.jpg")
      .getDownloadURL()
      .then( url => {
        setWallpaperUrl(url)})
      .catch(()=>{
        setAvatarUrl("https://picsum.photos/950/300");
      });
  }

  function handleUserAvatar(uid) {
    firebase
      .storage()
      .ref("usersTest/" + uid + "/avatar/avatar.jpg")
      .getDownloadURL()
      .then( url => {
        setAvatarUrl(url)})
      .catch(()=>{
        setAvatarUrl("https://picsum.photos/150/150");
      });
  }
  

  function renderUserName(uid) {
    // render user name along avatar pic, if there is no name use placeholder
    return "Anonymus";
  }
  return (
    <>
      <UserWallpaper url={wallpaperUrl} />
      <div className="userProfile_navBar">
        <UserAvatar url={avatarUrl} />
        <span>{renderUserName(userUid)}</span>
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
