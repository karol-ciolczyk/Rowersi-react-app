import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const createUserWithEmailAndPassword = (email, password, name) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("successfully registered, now you need to logIn");
      // Signed in
      const user = userCredential.user;
      const userUid = user.uid;
      firebase
        .firestore()
        .collection("usersTest")
        .doc(userUid)
        .set({
          name: name,
        })
        .then(() => {
          firebase.auth().signOut();
        })
        .catch(console.log);
    })
    .catch((reason) => {
      console.log(reason);
      alert(reason.message);
    });
};

export default createUserWithEmailAndPassword;
