import firebase from "firebase";

const addRouteDataToFirebase = (routeDataObject)=>{
  firebase.firestore().collection("routes").add(routeDataObject).then(console.log);
}

export default addRouteDataToFirebase;