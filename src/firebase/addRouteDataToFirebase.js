import firebase from "firebase";

const addRouteDataToFirebase = (routeDataObject)=>{
  firebase.collection("routes").add(routeDataObject);
}

export default addRouteDataToFirebase;