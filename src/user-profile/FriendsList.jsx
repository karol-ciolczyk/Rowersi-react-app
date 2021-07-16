import firebase from "firebase";
import UserSessionContext from "../components/context/userSession-context.js";
import { useContext, useState } from "react";
import { useEffect } from "react";

export function FriendsList() {
  const userSessionContext = useContext(UserSessionContext);
  const { userUid } = userSessionContext;

  const [friendsList, setFriendsList] = useState();

  //   firebase.firestore().collection('usersTest').doc(userUid).get().then(doc => console.log(doc.data().following));

  useEffect(() => {
    async function fetchData() {
     const resoult = await firebase
      .firestore()
      .collection("usersTest")
      .doc(userUid)
      .get();
    //   .then(doc => setFriendsList(doc.data().following));
    setFriendsList(resoult.data().following);
    fetchData();
      console.log(friendsList)
    };
  }, []);
  ;

  //   const renderFriends = friendsList.map((item) => (
  //     <li>{item}</li>
  //   ));

  return (
    <>
      <div className="friendsListWrapper">
        <div className="friendsWidget">{/* <ul>{renderFriends}</ul> */}</div>

        <div className="TBA"></div>
      </div>
    </>
  );
}
