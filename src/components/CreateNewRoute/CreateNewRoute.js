import React, { useState } from "react";
import ReactDOM from "react-dom";

import MapRouting from "../MapRouting/MapRouting";
import CreateRouteForm from "../Route/CreateRouteForm";
import SimpleBackdrop from "../SimpleBackdrop/SimpleBackdrop";

import style from "./CreateNewRoute.module.css";

const CreateNewRoute = () => {
  const [routeData, setRouteData] = useState({});
  const [backdrop, setBackdrop] = useState(false);

  const switchOnBackdropHandler = (boolean) => {
    setBackdrop(boolean);
  };

  return (
    <div className={style.container}>
      {ReactDOM.createPortal(
        <SimpleBackdrop backdrop={backdrop} />,
        document.querySelector("#backdrop")
      )}
      <MapRouting
        routeId={routeData.routeId}
        isInput={true}
        setRouteData={setRouteData}
      />
      <CreateRouteForm
        switchOnBackdropHandler={switchOnBackdropHandler}
        routeData={routeData}
        setRouteData={setRouteData}
      />
    </div>
  );
};

export default CreateNewRoute;
