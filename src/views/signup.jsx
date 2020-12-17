import React, { useState } from "react";
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
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Axios from "axios";
import Copyright from "../components/copyright.jsx";
import { useHistory } from "react-router-dom";

const USERNAME_ALREADY_USED =
  "The username has been used, please choose another one";
const INVALID_INPUT =
  "Please check your username, email and password are valid";

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

function SignUp() {
  const classes = useStyles();
  let history = useHistory();

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);

  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [signUpFailMsg, setSignUpFailMsg] = useState(null);

  function validateForm() {
    return validate(username) && validate(password) && validate(email);
  }

  function onSubmit(e) {
    e.preventDefault(e);
    if (!validateForm()) {
      setSignUpFailMsg(INVALID_INPUT);
      return;
    }
    Axios.post("https://movie-rating-server.herokuapp.com/api/user/signup", {
      username: username,
      password: password,
      emailAddress: email,
      isAdmin: isAdmin,
    })
      .then((response) => {
        setSignUpSuccess(true);
      })
      .catch((error) => {
        if (error.response.status === 409) {
          setSignUpFailMsg(USERNAME_ALREADY_USED);
        }
        console.log(error);
      });
    return;
  }

  function toSignInClick(e) {
    e.preventDefault();
    history.push("/signin");
  }

  function onAdminChange(e) {
    e.preventDefault();
    if (e.target.checked) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        {signUpSuccess ? (
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Successfully signed up
            </Typography>
            <Button
              type="back"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => toSignInClick(e)}
            >
              Go To Sign In
            </Button>
          </div>
        ) : (
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
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
                      setUsername(String(e.target.value));
                      setSignUpFailMsg(null);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => {
                      setEmail(String(e.target.value));
                      setSignUpFailMsg(null);
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
                      setPassword(String(e.target.value));
                      setSignUpFailMsg(null);
                    }}
                  />
                </Grid>
              </Grid>
              {signUpFailMsg ? (
                <Alert severity="error">{signUpFailMsg}</Alert>
              ) : (
                <></>
              )}
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    onChange={(e) => onAdminChange(e)}
                  />
                }
                label="Sign Up As An Admin User"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(e) => onSubmit(e)}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link
                    href="https://web-final-frontend.herokuapp.com/signin"
                    variant="body2"
                  >
                    Already have an account? Sign in
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

export default SignUp;
