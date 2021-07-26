import firebase from "firebase";

const addRouteDataToFirebase = (routeDataObject) => {
  return firebase
    .firestore()
    .collection("routes")
    .add(routeDataObject)
    .then((response) => {
      if (response) {
        alert("your new route added");
        return response;
      }
    })
    .catch(console.log);
};

export default addRouteDataToFirebase;
