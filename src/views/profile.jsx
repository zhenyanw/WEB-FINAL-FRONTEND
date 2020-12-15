import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Copyright from "../components/copyright.jsx";
import { useHistory } from "react-router-dom";
import Axios from "axios";

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
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
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

function Profile() {
  const classes = useStyles();
  let history = useHistory();

  function backToSignIn(e) {
    e.preventDefault();
    history.push("/signin");
  }

  function backToHomeClick(e) {
    e.preventDefault();
    history.push("/");
  }

  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [password, setPassword] = useState(localStorage.getItem("password"));
  const [updated, setUpdated] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    const newEmail = validate(email) ? email : localStorage.getItem("email");
    const newPassword = validate(password)
      ? password
      : localStorage.getItem("password");

    Axios.put("https://movie-rating-server.herokuapp.com/api/user", {
      username: localStorage.getItem("username"),
      password: newPassword,
      emailAddress: newEmail,
    })
      .then((response) => {
        setUpdated(true);
      })
      .catch((error) => console.log(error));
  }

  if (localStorage.getItem("username") == null) {
    return (
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          You are not signed in
        </Typography>
        <Button
          type="back"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={(e) => backToSignIn(e)}
        >
          Go To Sign In
        </Button>
      </div>
    );
  }

  if (updated) {
    return (
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Profile Updated
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
    );
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit Profile
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              disabled
              fullWidth
              id="username"
              label={"Your username is " + localStorage.getItem("username")}
              helperText="Username can't be updated"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              helperText="Empty input will not update after submit"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => {
                setEmail(String(e.target.value));
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              helperText="Empty input will not update after submit"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(String(e.target.value));
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => onSubmit(e)}
            >
              Submit
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default Profile;
