import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  makeStyles,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
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

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);

  const [signUpSuccess, setSignUpSuccess] = useState(false);

  function validateForm() {
    return validate(username) && validate(password) && validate(email);
  }

  function onSubmit(e) {
    e.preventDefault(e);
    if (!validateForm()) {
      return;
    }
    console.log("lala");
    Axios.post("https://movie-rating-server.herokuapp.com/api/user", {
      username: username,
      password: password,
      emailAddress: email,
      isAdmin: false,
    })
      .then((response) => {
        setSignUpSuccess(true);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
    return;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {signUpSuccess ? (
        <Typography component="h1" variant="h3">
          Sign Up Success
        </Typography>
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
                  onChange={(e) => setUsername(String(e.target.value))}
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
                  onChange={(e) => setEmail(String(e.target.value))}
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
                  onChange={(e) => setPassword(String(e.target.value))}
                />
              </Grid>
            </Grid>
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
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      )}
    </Container>
  );
}

export default SignUp;
