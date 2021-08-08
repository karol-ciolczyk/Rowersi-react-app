import { Button } from "@material-ui/core";
import firebase from "firebase/app";
import "firebase/auth";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: "0px 5px",
    backgroundColor: "#3BB2D0",
    color: "#fff",
    "&:hover, &:focus": {
      backgroundColor: "#3BB2D0",
    },
  },
}));

export const LogOutButton = function () {
  const history = useHistory();
  const classes = useStyles();
  const onClickHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        alert("Error:", error);
      });
  };
  return (
    <Button
      variant="contained"
      className={classes.button}
      onClick={onClickHandler}
    >
      Log Out
    </Button>
  );
};
