/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import { Room } from "@material-ui/icons";
import { useFetchPlaceData } from "../../hooks/use-fetch-for-input";

export default function WaypointInput(props) {
  const [inputValue, setInputValue] = useState(props.inputValue);
  const [value, setValue] = useState(props.initialInputValue);
  const placesObject = useFetchPlaceData();

  const placesName = placesObject.map((obj) => obj.placeName);

  return (
    <Autocomplete
      inputValue={inputValue ? inputValue : ""} // needed to avoid changing from uncontrolled to controlled component due to undefined initial value of inputValue
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      value={value}
      onChange={(event, newValue, reason) => {
        setValue(newValue);
        // console.log(placesObject.find((obj) => obj.placeName === value));
        const selectedPlaceData = placesObject.find(
          (obj) => obj.placeName === newValue
        );
        props.onSelectWaypoint(
          selectedPlaceData,
          props.waypointNumber
          // props.waypoints
        );
      }}
      id="combo-box-demo"
      options={placesName}
      getOptionLabel={(option) => option}
      renderOption={(option) => option}
      style={{ width: 300 }}
      filterOptions={(options, state) => options}
      renderInput={(params) => (
        <TextField {...params} placeholder="Choose additional waypoint" />
      )}
    />
  );
}
