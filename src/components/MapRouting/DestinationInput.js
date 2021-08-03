/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";

export default function DestinationInput(props) {
  const [inputValue, setInputValue] = useState("");
  const [placesObject, setPlacesObject] = useState([]);
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (inputValue) {
      const specialCharactersRemoved = inputValue.replace(
        /[^a-zA-Z0-9 śŚńŃęĘąĄćĆżŻźŹłŁ]/g,
        ""
      );

      const fetchData = setTimeout(() => {
        (async function () {
          try {
            const response = await fetch(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${specialCharactersRemoved}.json?country=pl&access_token=pk.eyJ1Ijoia2FyY2lvIiwiYSI6ImNrcTd6YjExejAxc3kyb3BrcnBzY252em4ifQ.emytj-LkRX7RcGueM2S9HA`
            );
            const data = await response.json();
            const placesArray = data.features.map((obj) => {
              return {
                placeName: obj.place_name,
                coordinates: obj.center,
              };
            });
            setPlacesObject(placesArray);
          } catch (err) {
            console.log(err);
          }
        })();
      }, 200);
      return () => clearTimeout(fetchData);
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
        setInputValue(newInputValue);
      }}
      value={value}
      onChange={(event, newValue, reason) => {
        setValue(newValue);
        const selectedPlaceData = placesObject.find(
          (obj) => obj.placeName === newValue
        );
        props.onSelectOriginDestination(selectedPlaceData, "destination");
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
          // variant="outlined"
          // size="small"
        />
      )}
    />
  );
}
