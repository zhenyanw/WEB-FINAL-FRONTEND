import React, { useState, useEffect } from "react";
import PageBase from "../components/pageBase.jsx";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { makeStyles, Container, Grid } from "@material-ui/core";
import MovieCard from "../components/movieCard.jsx";

const useStyles = makeStyles((theme) => ({
  column: {
    marginBottom: 20,
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

function MovieList() {
  const params = useParams();
  const searchValue = params.searchValue;
  const [movies, setMovies] = useState([]);
  const classes = useStyles();

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

  if (movies == null || movies.length === 0) {
    return (
      <PageBase>
        <div>No Movies Found</div>
      </PageBase>
    );
  }
  return (
    <PageBase>
      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {movies.map((movie, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </PageBase>
  );
}

export default MovieList;
