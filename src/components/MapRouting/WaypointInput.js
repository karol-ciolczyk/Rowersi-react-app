/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import { Room } from "@material-ui/icons";

export default function WaypointInput(props) {
  const [placesObject, setPlacesObject] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState(props.initialInputValue);
  useEffect(() => {
    if (inputValue) {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${inputValue}.json?country=pl&access_token=pk.eyJ1Ijoia2FyY2lvIiwiYSI6ImNrcTd6YjExejAxc3kyb3BrcnBzY252em4ifQ.emytj-LkRX7RcGueM2S9HA`
      )
        .then((response) => response.json())
        .then((object) => {
          const placesArray = object.features.map((obj) => {
            return {
              placeName: obj.place_name,
              coordinates: obj.center,
            };
          });
          setPlacesObject(placesArray);
        });
    }
  }, [inputValue]);

  useEffect(() => {
    console.log(props.inputValue);
    if (props.inputValue) {
      setInputValue(props.inputValue);
      // setValue(props.inputValue);
    } // this set destinaton input value after add new point button after add new waypoint
  }, [props.inputValue]);

  const placesName = placesObject.map((obj) => obj.placeName);

  return (
    <Autocomplete
      inputValue={inputValue}
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
