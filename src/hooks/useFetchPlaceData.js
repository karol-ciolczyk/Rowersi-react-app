import { useEffect, useState } from "react";

export const useFetchPlaceData = function (inputValue) {
  const [placesObject, setPlacesObject] = useState([]);

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

  return placesObject;
};
