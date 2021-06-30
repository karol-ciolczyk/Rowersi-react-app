import React from "react";

import MapRouting from "../MapRouting/MapRouting";
import CreateRouteForm from "../Route/CreateRouteForm";

import style from "./CreateNewRoute.module.css"

const CreateNewRoute = ()=>{
  return (
    <div className={style.container}>
      <MapRouting isInteractive={true} isInput={true}/>
      <CreateRouteForm />
    </div>
  );
};

export default CreateNewRoute;