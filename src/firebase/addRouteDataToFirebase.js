import firebase from "firebase";

const addRouteDataToFirebase = (routeDataObject)=>{
  firebase.firestore().collection("routes").add(routeDataObject)
  .then((response)=>{
    if(response){
      alert("your new route added")
    }
  });
}

export default addRouteDataToFirebase;