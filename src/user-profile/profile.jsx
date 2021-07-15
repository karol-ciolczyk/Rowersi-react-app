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

  const [ avatarUrl, setAvatarUrl ] = useState("https://picsum.photos/950/300")

  handleUserWallpaper(userUid)

  function handleUserWallpaper(uid) {
    // console.log('#20 uid: '+ uid);
    // console.log(firebase
    //   .storage()
    //   .ref("usersTest/" + uid + "/wallpaper/background.jpg")
    //   .getDownloadURL()
    //   .catch(()=>"https://picsum.photos/950/300"));
      firebase
      .storage()
      .ref("usersTest/" + uid + "/wallpaper/background.jpg")
      .getDownloadURL()
      .then( url => {
        setAvatarUrl(url)})
      .catch(()=>"https://picsum.photos/950/300");
  }

  function handleUserAvatar(uid) {
    //if user has uploaded avatar picture use it or get default avatar
    return "https://picsum.photos/150/150";
  }

  function renderUserName(uid) {
    // render user name along avatar pic, if there is no name use placeholder
    return "Anonymus";
  }
  return (
    <>
      <UserWallpaper url={avatarUrl} />
      <div className="userProfile_navBar">
        <UserAvatar url={handleUserAvatar(userUid)} />
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
