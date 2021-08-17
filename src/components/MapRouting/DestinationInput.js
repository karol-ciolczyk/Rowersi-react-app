/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";
import { useFetchPlaceData } from "../../hooks/use-fetch-for-input";

export default function DestinationInput(props) {
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState(null);
  const placesObject = useFetchPlaceData(inputValue);

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
