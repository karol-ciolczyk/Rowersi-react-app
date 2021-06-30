import firebase from "firebase";

const addRouteDataToFirebase = (routeDataObject)=>{
  firebase.firestore().collection("routes").add(routeDataObject);
}

export default addRouteDataToFirebase;