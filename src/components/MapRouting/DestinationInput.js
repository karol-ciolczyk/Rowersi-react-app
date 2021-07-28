/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";

export default function DestinationInput(props) {
  // const [inputText, setInputText] = useState("")
  // const [places, setPlaces] = useState([]);
  const [inputValue, setInputValue] = useState("Polska");
  const [placesObject, setPlacesObject] = useState([]);
  const [value, setValue] = useState(null);

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

  ///////////////////////////////  useEffect to clean input value after add new waypoint by new waypoint button in Mapbox.js
  useEffect(() => {
    if (props.destinationInputValueCleaner === null)
      setValue(props.destinationInputValueCleaner);
  }, [props.destinationInputValueCleaner]);

  const placesName = placesObject.map((obj) => obj.placeName);

  return (
    <Autocomplete
      onInputChange={(event, newInputValue) => {
        // setInputText(newInputValue);
        setInputValue(newInputValue);
      }}
      value={value}
      onChange={(event, newValue, reason) => {
        setValue(newValue);
        const selectedPlaceData = placesObject.find(
          (obj) => obj.placeName === newValue
        );
        props.onSelectOrigin(selectedPlaceData, "destination");
      }}
      id="combo-box-destination"
      options={placesName}
      getOptionLabel={(option) => option}
      renderOption={(option) => option}
      style={{ width: 300 }}
      filterOptions={(options, state) => options}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Choose destination"
          variant="outlined"
          // size="small"
        />
      )}
    />
  );
}
