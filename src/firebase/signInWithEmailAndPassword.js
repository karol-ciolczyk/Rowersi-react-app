import firebase from "firebase";

const signInWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      return user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorCode, errorMessage);
    });
};

export default signInWithEmailAndPassword;
