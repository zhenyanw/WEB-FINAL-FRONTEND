import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { render } from "@testing-library/react";
import Home from "./views/home.jsx";
import SignUp from "./views/signup.jsx";
import SignIn from "./views/signin.jsx";
import MovieList from "./views/movieList.jsx";
import Movie from "./views/movie.jsx";
import Profile from "./views/profile.jsx";

render(
  <Router forceRefresh={true}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/movieList:searchValue?" component={MovieList} />
      <Route exact path="/movie:movieName" component={Movie} />
      <Route exact path={"/profile"} component={Profile} />
      <Route exact path={"/signin"} component={SignIn} />
      <Route exact path={"/signup"} component={SignUp} />
      <Route render={() => <h1>Not found!</h1>} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
