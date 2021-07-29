import firebase from "firebase";
import UserSessionContext from "../components/context/userSession-context.js";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { UserAvatar } from "./avatar";

export function FriendsList() {
  const userSessionContext = useContext(UserSessionContext);
  const { userUid } = userSessionContext;
  const [friendsList, setFriendsList] = useState();

  useEffect(() => {
    return firebase
      .firestore()
      .collection("usersTest")
      .doc(userUid)
      .get()
      .then( doc => setFriendsList(doc.data().following))
      .catch( error => console.log(error));
  }, [userUid]);

let RenderFriends = null
  if (!friendsList) {
      RenderFriends = "Try to find some awsome friends"
  } else {
    RenderFriends = friendsList.map((item) => {
            return (
                <div className="userCard" key={item}>  
                    <UserAvatar url={handleUserAvatar(item)} />
                    <span>{item}</span>
                </div>
            );
    });
};
         
  function handleUserAvatar(uid) {
    firebase
      .storage()
      .ref("usersTest/" + uid + "/avatar/avatar.jpg")
      .getDownloadURL()
      .then( url => url)
      .catch((error )=>console.log(error));
  };

//   function renderUserName(uid) {
//     // render user name, if there is no name use placeholder
//     return "Anonymus";
//   };

  return (
    <>
      <div className="friendsListWrapper">
        <div className="friendsWidget">
            <ul>{RenderFriends}</ul>
        </div>
        <div className="TBA"></div>
      </div>
    </>
  );
}
