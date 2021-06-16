import React, {useState} from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import TransitionsModal from "../Modal/TransitionsModal";
import LoginForm from '../LoginForm/LoginForm'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: 250,
  }
}));

export default function AutoGrid() {
  const classes = useStyles();
  const [isLogIn, setIsLogIn] = useState(false);


  const isLogInHandler = (isLogIn) => {
    setIsLogIn(isLogIn);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs>
          <TransitionsModal
            onIsLogInHandler={isLogInHandler}
            buttonText={`LogIn`}
          >
            <LoginForm isLogIn={isLogIn} />
          </TransitionsModal>
        </Grid>
        <Grid item xs>
          <TransitionsModal
            onIsLogInHandler={isLogInHandler}
            buttonText={`SignUp`}
          >
            <LoginForm isLogIn={isLogIn} />
          </TransitionsModal>
        </Grid>
      </Grid>
    </div>
  );
}
