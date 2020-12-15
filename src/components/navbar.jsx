import React, { useState, useEffect } from "react";
import {
  fade,
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import SearchBar from "material-ui-search-bar";
import { useHistory } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  appbar: {
    background: "#84C7CE",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
}));

function NavBar() {
  const classes = useStyles();

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [searchValue, setSearchValue] = useState(null);

  let history = useHistory();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setIsSignedIn(true);
    }
  }, []);

  function handleSignOut() {
    setIsSignedIn(false);
    localStorage.clear();
    window.location.reload();
  }

  function onSignUpClick(e) {
    e.preventDefault();
    history.push("/signup");
  }

  function onSignInClick(e) {
    e.preventDefault();
    history.push("/signin");
  }

  function onProfileClick(e) {
    e.preventDefault();
    history.push("/profile");
  }

  function onSearchClick() {
    if (searchValue == null || searchValue.length === 0) {
      return;
    }
    history.push("/movieList" + searchValue);
  }

  function onTitleClick() {
    history.push("/");
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            Movie Review
          </Typography>
          <SearchBar
            className={classes.search}
            onChange={(e) => setSearchValue(e)}
            onRequestSearch={() => onSearchClick()}
          />
          {isSignedIn ? (
            <div>
              <Button color="inherit" onClick={(e) => handleSignOut(e)}>
                SignOut
              </Button>
              <IconButton
                aria-label="profile"
                color="inherit"
                onClick={(e) => onProfileClick(e)}
              >
                <AccountCircleIcon />
              </IconButton>
            </div>
          ) : (
            <div>
              <Button
                color="inherit"
                onClick={(e) => {
                  onSignInClick(e);
                }}
              >
                SignIn
              </Button>
              <Button
                color="inherit"
                onClick={(e) => {
                  onSignUpClick(e);
                }}
              >
                SignUp
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
