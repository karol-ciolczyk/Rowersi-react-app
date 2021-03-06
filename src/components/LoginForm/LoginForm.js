import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import signInWithEmailAndPassword from "../../firebase/signInWithEmailAndPassword";
import { LinearProgress } from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "tomato",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#3bb2d0",
    color: "#fff",
    "&:hover, &:focus": {
      backgroundColor: "#3bb2d0",
    },
  },
  progress: {
    width: "300px",
    position: "absolute",
    top: "300px",
  },
  formFullWidth: {
    "& label.Mui-focused": {
      color: "#3bb2d0",
    },
    "&.Mui-focused fieldset": {
      borderColor: "green",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#c9c9c9",
      },
      "&:hover fieldset": {
        borderColor: "#3bb2d0",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3bb2d0",
      },
    },
  },
  link: {
    color: "#3bb2d0",
  },
}));

export default function LoginForm(props) {
  const classes = useStyles();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    uid: undefined,
  });
  const [progress, setProgress] = useState(false);

  const { email, password } = userData;

  const userDataChangeHandler = (event) => {
    setUserData((lastState) => {
      return {
        ...lastState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setProgress(true);
    signInWithEmailAndPassword(email, password).then((object) => {
      if (!object) return;
      setUserData((previousState) => {
        return {
          ...previousState,
          uid: object.uid,
        };
      });
    });

    setUserData({
      email: "",
      password: "",
    });
  };

  const linkClickHandler = function () {
    props.setOpen(false);
    props.isSignUpLinkClickedHandler();
  };

  useEffect(() => {
    if (userData.uid) {
      props.onSubmitButton(); // to close modal after submit
      props.onLoggedInData(userData.uid);
    }
  }, [userData.uid, props]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {progress ? <LinearProgress className={classes.progress} /> : ""}
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <form onSubmit={submitHandler} className={classes.form} noValidate>
          <TextField
            className={classes.formFullWidth}
            onChange={userDataChangeHandler}
            value={email}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            className={classes.formFullWidth}
            onChange={userDataChangeHandler}
            value={password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link className={classes.link} href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                className={classes.link}
                href="#"
                variant="body2"
                onClick={linkClickHandler}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
