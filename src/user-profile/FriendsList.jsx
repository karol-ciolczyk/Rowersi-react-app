import firebase from "firebase";
import UserSessionContext from "../components/context/userSession-context.js";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { UserAvatar } from "./avatar";

export function FriendsList() {
  const userSessionContext = useContext(UserSessionContext);
  const { userUid } = userSessionContext;
  const [friendsList, setFriendsList] = useState([]);
  const [friendsData, setFriendsData] = useState([]);


  useEffect(() => {
    return firebase
      .firestore()
      .collection("usersTest")
      .doc(userUid)
      .get()
      .then( doc => setFriendsList(doc.data().following))
      .catch( error => console.log(error));
  }, [userUid]);
  


  useEffect(() => {
   if(friendsList){
       (async function(){
           try{
               const allPictures = await Promise.all(
                   friendsList.map(uid => {
                       return handleUserAvatar(uid)
                   }))
                const allNames = await Promise.all(
                    friendsList.map(uid => {
                        return handleUserName(uid)
                    }))
                const combineData = allPictures.map( (item, index) => [item, allNames[index]]);             
                setFriendsData(combineData)
           } catch (error) {
               console.log(error)
           }
       })()
   }
}, [friendsList]);
      
  function handleUserAvatar(uid) {
    return firebase
      .storage()
      .ref()
      .child("usersTest/" + uid + "/avatar/")
      .listAll()
      .then( response => response.items[0].getDownloadURL())
      .then( response => response)
  };

  function handleUserName(uid) {
    return firebase
      .firestore()
      .collection("usersTest")
      .doc(uid)
      .get()
      .then( doc => doc.data().name)
      .catch( error => console.log(error));
  };

if (!friendsList) { 
  return (
  <h2 className="friendsList_noFriends">
    Try to find some awsome friends !
  </h2>)
}
else {
return (
    <>
      <div className="friendsListWrapper">
        <div className="friendsWidget">
            {friendsData.map(item => <div className="userCard">
                <UserAvatar url={item[0]} name={item[1]}/>               
            </div>)}
        </div>
      </div>
    </>
  );
}  
}
