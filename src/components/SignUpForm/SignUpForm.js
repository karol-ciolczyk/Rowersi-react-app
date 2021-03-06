import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import createUserWithEmailAndPassword from "../../firebase/createUserWithEamilAndPassword";

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
}));

export default function SignUpForm(props) {
  const classes = useStyles();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    nickname: "",
  });

  const { email, password, repeatPassword, nickname } = userData;

  const userDataChangeHandler = (event) => {
    setUserData((previousState) => {
      return {
        ...previousState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (
      password.trim() === repeatPassword.trim() &&
      password.trim().length > 0
    ) {
      createUserWithEmailAndPassword(email, password, nickname);
      props.onSubmitButton();
    } else alert("incorrect password");

    setUserData({
      email: "",
      password: "",
      repeatPassword: "",
      nickname: "",
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sigin Up
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
          <TextField
            className={classes.formFullWidth}
            onChange={userDataChangeHandler}
            value={repeatPassword}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="repeatPassword"
            label="Repeat Password"
            type="password"
            id="repeatPassword"
            autoComplete="current-password"
          />
          <TextField
            className={classes.formFullWidth}
            onChange={userDataChangeHandler}
            value={nickname}
            variant="outlined"
            margin="normal"
            fullWidth
            name="nickname"
            label="nickname"
            type="text"
            id="nickname"
            autoComplete="nickname"
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
            Sign Up
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
