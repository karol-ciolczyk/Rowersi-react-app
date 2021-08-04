import React, { useState } from "react";

import MapRouting from "../MapRouting/MapRouting";
import CreateRouteForm from "../Route/CreateRouteForm";

import style from "./CreateNewRoute.module.css";

const CreateNewRoute = () => {
  const [routeData, setRouteData] = useState({});
  console.log(routeData);

  return (
    <div className={style.container}>
      <MapRouting
        routeId={routeData.routeId}
        isInput={true}
        setRouteData={setRouteData}
      />
      <CreateRouteForm routeData={routeData} setRouteData={setRouteData} />
    </div>
  );
};

export default CreateNewRoute;
