import React, { useState, useEffect } from "react";
import PageBase from "../components/pageBase.jsx";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Axios from "axios";
import { makeStyles, ButtonBase } from "@material-ui/core";
import MovieCard from "../components/movieCard.jsx";
import Movie from "./movie.jsx";

const useStyles = makeStyles((theme) => ({
  column: {
    marginBottom: 20,
  },
}));

function MovieList() {
  const params = useParams();
  const searchValue = params.searchValue;

  const [movieSelected, setMovieSelected] = useState(null);
  const [movies, setMovies] = useState([]);
  const classes = useStyles();

  function handleClick(e, movie) {
    e.preventDefault();
    setMovieSelected(movie);
  }

  const movieColumns = movies
    ? movies.map((movie, index) => (
        <Col classe={classes.column} key={index} xs={12} sm={4} md={3} lg={3}>
          <MovieCard movie={movie} />
        </Col>
      ))
    : null;

  useEffect(() => {
    Axios.get(
      "https://movie-rating-server.herokuapp.com/api/movie/" + searchValue
    )
      .then((response) => {
        if (response.data.results != null) {
          setMovies(response.data.results);
        } else {
          const list = [];
          list.push(response.data);
          setMovies(list);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  if (movieSelected != null) {
    console.log(movieSelected);
    return <Movie movie={movieSelected} />;
  }

  if (movies.length === 0) {
    return (
      <PageBase>
        <div>No Movies Found</div>
      </PageBase>
    );
  }
  return (
    <PageBase>
      <Row>{movieColumns}</Row>
    </PageBase>
  );
}

export default MovieList;
