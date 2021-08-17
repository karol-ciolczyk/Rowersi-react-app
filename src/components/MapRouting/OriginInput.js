/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import { useFetchPlaceData } from "../../hooks/use-fetch-for-input";
import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import { Room } from "@material-ui/icons";

export const OriginInput = function (props) {
  // const [inputText, setInputText] = useState("")
  // const [places, setPlaces] = useState([]);
  const [inputValue, setInputValue] = useState("Polska");
  const placesObject = useFetchPlaceData(inputValue);

  const placesName = placesObject.map((obj) => obj.placeName);

  return (
    <Autocomplete
      onInputChange={(event, newInputValue) => {
        // setInputText(newInputValue);
        setInputValue(newInputValue);
      }}
      onChange={(event, newValue, reason) => {
        const region = newValue
          ? newValue
              .split(",")
              [newValue.split(",").length - 2].replace("Voivodeship", "")
              .replace("-", " ")
              .replace(/[^a-zA-Z śŚńŃęĘąĄćĆżŻźŹłŁ]/g, "")
          : "";
        const selectedPlaceData = placesObject.find(
          (obj) => obj.placeName === newValue
        );
        props.onSelectOriginDestination(selectedPlaceData, "origin", region);
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
