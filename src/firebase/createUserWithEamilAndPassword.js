import firebase from "firebase";

const createUserWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;

      firebase.auth().signOut();

      return user;
      // ...
    })
    .catch((reason) => {
      console.log(reason);
      alert(reason.message);
    });
};

export default createUserWithEmailAndPassword;
