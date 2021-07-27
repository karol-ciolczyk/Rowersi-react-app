import React from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import DirectionsIcon from "@material-ui/icons/Directions";
import HeightIcon from "@material-ui/icons/Height";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

export default function MouseOverPopover({ data }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const Icon = function whichIconDisplay() {
    if (data === "duration")
      return <AccessTimeIcon style={{ fontSize: 40, color: "#c2c2c2" }} />;
    if (data === "distance")
      return <DirectionsIcon style={{ fontSize: 40, color: "#c2c2c2" }} />;
    if (data === "elevation")
      return <HeightIcon style={{ fontSize: 40, color: "#c2c2c2" }} />;
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Typography
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <Icon />
      </Typography>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: -30,
          horizontal: 80,
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>{data}</Typography>
      </Popover>
    </div>
  );
}
