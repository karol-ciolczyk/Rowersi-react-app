import React from "react";

import MapRouting from "../MapRouting/MapRouting";
import CreateRouteForm from "../Route/CreateRouteForm";

const CreateNewRoute = ()=>{
  return (
    <div>
      <MapRouting />
      <CreateRouteForm />
    </div>
  )
};

export default CreateNewRoute;