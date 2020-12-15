import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Paper,
  Box,
  makeStyles,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import Copyright from "../components/copyright.jsx";

const INCORRECT_CREDENTIAL_WARNING =
  "Please check if your username and password are correct";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function validate(str) {
  if (str == null || str.length === 0) {
    return false;
  }
  return true;
}

function SignIn() {
  const classes = useStyles();
  let history = useHistory();

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const [signInFailMsg, setSignInFailMsg] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setIsSignedIn(true);
    }
  }, []);

  function validateForm() {
    return validate(username) && validate(password);
  }

  function onSubmit(e) {
    e.preventDefault(e);

    if (!validateForm()) {
      setSignInFailMsg(INCORRECT_CREDENTIAL_WARNING);
      return;
    }

    Axios.get(
      "https://movie-rating-server.herokuapp.com/api/user/" +
        username +
        "/" +
        password
    )
      .then((response) => {
        if (response.status === 200) {
          setIsSignedIn(true);
          localStorage.setItem("username", username);
          localStorage.setItem("email", response.data.emailAddress);
          localStorage.setItem("password", response.data.password);
          localStorage.setItem("isAdmin", response.data.isAdmin);
        } else {
          setSignInFailMsg(INCORRECT_CREDENTIAL_WARNING);
        }
      })
      .catch((error) => console.log(error));
    return;
  }

  function backToHomeClick(e) {
    e.preventDefault();
    history.push("/");
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        {isSignedIn ? (
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Successfully signed in as {username}
            </Typography>
            <Button
              type="back"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => backToHomeClick(e)}
            >
              Go To Home
            </Button>
          </div>
        ) : (
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="username"
                    name="username"
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    autoFocus
                    onChange={(e) => {
                      setSignInFailMsg(null);
                      setUsername(String(e.target.value));
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => {
                      setSignInFailMsg(null);
                      setPassword(String(e.target.value));
                    }}
                  />
                </Grid>
              </Grid>
              {signInFailMsg ? (
                <Alert severity="error">{signInFailMsg}</Alert>
              ) : (
                <></>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(e) => onSubmit(e)}
              >
                Sign In
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link
                    href="https://web-final-frontend.herokuapp.com/signup"
                    variant="body2"
                  >
                    Don't have an account? Sign up
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        )}
        <Box mt={8}>
          <Copyright />
        </Box>
      </Grid>
    </Grid>
  );
}

export default SignIn;
