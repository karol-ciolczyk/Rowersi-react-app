import { UserAvatar } from "./avatar";
import { UserWallpaper } from "./user-wallpaper";
import "./Profile.css";
import UserProfileTabs from "./profileTab";
import { Switch, Route } from "react-router-dom";
import { FriendsList } from "./FriendsList";
import { Dashboard } from "./Dashboard";
import { ProfileSettings } from "./ProfileSettings";
import UserSessionContext from "../components/context/userSession-context.js";
import { useContext, useState, useEffect } from "react";
import firebase from "firebase/app";

export function Profile() {
  const userSessionContext = useContext(UserSessionContext);
  const { userUid } = userSessionContext;

  const [wallpaperUrl, setWallpaperUrl] = useState(
    "https://picsum.photos/1200/600"
  );
  const [avatarUrl, setAvatarUrl] = useState("/assets/defaultAvatar.JPG");
  const [userName, setUserName] = useState("Anonymus");

  useEffect(() => {
    firebase
      .storage()
      .ref("usersTest/" + userUid + "/wallpaper/background.jpg")
      .getDownloadURL()
      .then((url) => {
        setWallpaperUrl(url);
      });
  }, [userUid]);

  useEffect(() => {
    firebase
      .storage()
      .ref("usersTest/" + userUid + "/avatar/avatar.jpg")
      .getDownloadURL()
      .then((url) => {
        setAvatarUrl(url);
      });
  }, [userUid]);

  useEffect(() => {
    if (userUid) {
      try {
        firebase
          .firestore()
          .collection("usersTest")
          .doc(userUid)
          .get()
          .then((doc) => {
            if (doc.data().name) {
              setUserName(doc.data().name);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [userUid]);

  return (
    <>
      <UserWallpaper url={wallpaperUrl} />
      <div className="userProfile_navBar">
        <UserAvatar url={avatarUrl} name={userName} />
      </div>
      <UserProfileTabs />
      <div className="userProfile_SwitchArea">
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
