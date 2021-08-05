import firebase from "firebase/app";
import "firebase/firestore";

const addRouteDataToFirebase = (routeDataObject) => {
  return firebase
    .firestore()
    .collection("routes")
    .add(routeDataObject)
    .then((response) => {
      if (response) {
        return response;
      }
    })
    .catch(console.log);
};

export default addRouteDataToFirebase;
