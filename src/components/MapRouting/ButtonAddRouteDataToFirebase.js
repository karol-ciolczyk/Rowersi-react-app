import React from 'react';
import addRouteDataToFirebase from "../../firebase/addRouteDataToFirebase";

const ButtonAddRouteDataToFirebase = (props)=>{

  const buttonClickHandler = (props)=>{
    addRouteDataToFirebase(props.RouteData)
  }

  return (
    <button onClick={buttonClickHandler}>Add route data to firebase</button>
  );
};

export default ButtonAddRouteDataToFirebase;