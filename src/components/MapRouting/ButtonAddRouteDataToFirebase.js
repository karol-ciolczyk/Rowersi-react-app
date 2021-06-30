import React, {useContext} from 'react';
import addRouteDataToFirebase from "../../firebase/addRouteDataToFirebase";
import UserSessionContext from '../context/userSession-context';

const ButtonAddRouteDataToFirebase = ({routeData})=>{

  console.log(routeData)

  const ctx = useContext(UserSessionContext);
  const userUid = ctx.userUid
  const routeDataObject = { ...routeData, user: userUid };
  console.log(ctx);


  const buttonClickHandler = () => {
    addRouteDataToFirebase(routeDataObject);
  };

  return (
    <button onClick={buttonClickHandler}>Add route data to firebase</button>
  );
};

export default ButtonAddRouteDataToFirebase;