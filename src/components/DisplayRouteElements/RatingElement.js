import React from "react";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { Box } from "@material-ui/core";

export const RatingElement = (props) => {
  return (
    <Box
      component="fieldset"
      borderColor="transparent"
      style={{ padding: "2px" }}
    >
      <Rating
        name="customized-empty"
        value={+props.votesAverage}
        precision={0.1}
        emptyIcon={<StarBorderIcon fontSize="inherit" />}
        readOnly={true}
      />
    </Box>
  );
};
