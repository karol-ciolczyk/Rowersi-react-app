import React from "react";

import MapRouting from "../MapRouting/MapRouting";
import CreateRouteForm from "../Route/CreateRouteForm";

import style from "./CreateNewRoute.module.css"

const CreateNewRoute = ()=>{

  const routeDataHandler = (routeData) =>{
    console.log("here is create new route", routeData)
  };

  return (
    <div className={style.container}>
      <MapRouting
        isInteractive={false}
        isInput={true}
        onRouteData={routeDataHandler}
      />
      <main>
        <CreateRouteForm />
      </main>
    </div>
  );
};

export default CreateNewRoute;