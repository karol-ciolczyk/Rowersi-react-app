/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import { Room } from "@material-ui/icons";

export const OriginInput = function (props) {
  // const [inputText, setInputText] = useState("")
  // const [places, setPlaces] = useState([]);
  const [inputValue, setInputValue] = useState("Polska");
  const [placesObject, setPlacesObject] = useState([]);

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

  const placesName = placesObject.map((obj) => obj.placeName);

  return (
    <Autocomplete
      onInputChange={(event, newInputValue) => {
        // setInputText(newInputValue);
        setInputValue(newInputValue);
      }}
      onChange={(event, newValue, reason) => {
        const selectedPlaceData = placesObject.find(
          (obj) => obj.placeName === newValue
        );
        // props.onSelectOrigin(selectedPlaceData, "origin");   ///////////      !!!! to uncomment later !!!!
      }}
      id="combo-box-origin"
      options={placesName}
      getOptionLabel={(option) => option}
      renderOption={(option) => option}
      style={{ width: 300 }}
      filterOptions={(options, state) => options}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Choose origin"
          // variant="outlined"
          // size="small"
        />
      )}
    />
  );
};
