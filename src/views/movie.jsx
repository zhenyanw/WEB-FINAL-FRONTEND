import {
  makeStyles,
  Typography,
  TextField,
  Button,
  IconButton,
  Box,
  CssBaseline,
  Container,
  Grid,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { useParams } from "react-router-dom";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import PageBase from "../components/pageBase.jsx";
import Review from "../components/review.jsx";

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "center",
    display: "block",
  },
  reviewContainer: {
    display: "block",
    marginTop: theme.spacing(3),
  },
  card: {
    position: "relative",
    display: "flex",
    height: 800,
    overflow: "hidden",
    borderRadius: 10,
    boxShadow: "0px 0px 120px -25px rgba(0,0,0, 0.5)",
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(10),
  },
  image: {
    width: "30%",
    height: "80%",
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(3),
  },
  info: {
    position: "relative",
    padding: 25,
    display: "block",
  },
  rating: {
    display: "flex",
    alignItems: "center",
  },
}));

function Movie() {
  const classes = useStyles();
  const params = useParams();
  const movieName = params.movieName;
  const [inDatabase, setInDatabase] = useState(false);
  const [movie, setMovie] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [movieReviews, setMovieReviews] = useState([]);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    Axios.get(
      "https://movie-rating-server.herokuapp.com/api/movie/" + movieName
    )
      .then((response) => {
        if (response.data.results != null) {
          for (let i = 0; i < response.data.results.length; i++) {
            if (response.data.results[i].movieName === movieName) {
              setMovie(response.data.results[i]);
              break;
            }
          }
        } else {
          setInDatabase(true);
          setMovie(response.data);
        }
      })
      .catch((error) => console.log(error));

    Axios.get(
      "https://movie-rating-server.herokuapp.com/api/movieReview/" + movieName
    )
      .then((response) => {
        let list = [];
        if (response.data != null && response.data.length > 0) {
          for (let i = 0; i < response.data.length; i++) {
            list.push(response.data[i]);
            if (
              response.data[i].username === localStorage.getItem("username")
            ) {
              setUserRating(response.data[i].rating);
              setUserComment(response.data[i].comment);
            }
          }
          setMovieReviews(list);
        }
      })
      .catch((error) => console.log(error));

    Axios.get(
      "https://movie-rating-server.herokuapp.com/api/user/favorites/" +
        localStorage.getItem("username") +
        "/" +
        movieName
    )
      .then((response) => {
        setFavorite(response.data.message);
      })
      .catch((error) => console.log(error));
  }, []);

  const title = movie?.movieName ?? null;
  const imgPath =
    "http://image.tmdb.org/t/p/original" + movie?.posterPath ?? null;
  const overView = movie?.overView ?? null;
  const date = movie?.releaseDate ?? null;
  const movieId = movie?.movieId ?? null;
  const rating = movie?.externalRating;
  const language = movie?.originalLanguage;

  if (movie == null) {
    return <></>;
  }

  function handleAdd(e) {
    e.preventDefault();
    Axios.post("https://movie-rating-server.herokuapp.com/api/movie", {
      movieName: movie.movieName,
      externalRating: movie.externalRating,
      posterPath: movie.posterPath,
      movieId: movie.mivieId,
      releaseDate: movie.releaseDate,
      overView: movie.overView,
      originalLanguage: movie.originalLanguage,
    })
      .then((response) => {
        setInDatabase(true);
      })
      .catch((error) => {
        console.log(error);
      });
    return;
  }

  function onReviewChange(e, newValue) {
    e.preventDefault();
    setUserRating(newValue);
  }

  function onCommentChange(e) {
    e.preventDefault();
    setUserComment(String(e.target.value));
  }

  function findReview() {
    for (let i = 0; i < movieReviews.length; i++) {
      if (movieReviews[i].username === localStorage.getItem("username")) {
        return movieReviews[i].rating;
      }
    }

    return null;
  }

  function onReviewSubmit(e) {
    e.preventDefault();

    const prevRating = findReview();

    if (prevRating !== null) {
      Axios.delete(
        "https://movie-rating-server.herokuapp.com/api/movieReview",
        {
          data: {
            movieName: title,
            username: localStorage.getItem("username"),
          },
        }
      )
        .then((response) => {
          Axios.put("https://movie-rating-server.herokuapp.com/api/movie/", {
            movieName: title,
            rating: 0 - prevRating,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }

    Axios.post("https://movie-rating-server.herokuapp.com/api/movieReview", {
      username: localStorage.getItem("username"),
      movieId: movieId,
      movieName: title,
      rating: userRating,
      comment: userComment,
    })
      .then(() => {
        Axios.put("https://movie-rating-server.herokuapp.com/api/movie/", {
          movieName: title,
          rating: userRating,
        });
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleFavorite(e) {
    e.preventDefault();
    if (favorite) {
      Axios.delete(
        "https://movie-rating-server.herokuapp.com/api/user/favorites",
        {
          data: {
            username: localStorage.getItem("username"),
            movieName: title,
          },
        }
      )
        .then(() => {
          setFavorite(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Axios.put(
        "https://movie-rating-server.herokuapp.com/api/user/favorites",
        {
          username: localStorage.getItem("username"),
          movieName: title,
        }
      )
        .then(() => {
          setFavorite(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <PageBase>
      <div className={classes.root}>
        <div className={classes.card}>
          <img src={imgPath} alt="cover" className={classes.image} />
          <div className={classes.info}>
            <Typography variant="h2" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {language.toUpperCase()} | {date}
            </Typography>
            <div className={classes.rating}>
              <Rating
                name="read-only"
                value={rating}
                readOnly
                max={10}
                precision={0.5}
              />
              {
                <Box ml={1}>
                  <Typography
                    component="legend"
                    variant="h5"
                    style={{ color: "#ffc107" }}
                  >
                    {rating}
                  </Typography>
                </Box>
              }
            </div>
            <Typography
              style={{ paddingTop: 5 }}
              variant="body1"
              color="textSecondary"
              component="p"
            >
              {overView}
            </Typography>
            {inDatabase && localStorage.getItem("username") ? (
              <>
                <Typography
                  variant="h5"
                  component="h5"
                  style={{ paddingTop: 50 }}
                >
                  Leave your thoughts
                </Typography>
                <div className={classes.rating}>
                  <Typography
                    component="legend"
                    variant="body1"
                    color="textSecondary"
                  >
                    FAVORITE THIS MOVIE:
                  </Typography>
                  <IconButton
                    aria-label="add to favorites"
                    color={favorite ? "secondary" : "#bdbdbd"}
                    onClick={(e) => handleFavorite(e)}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </div>
              </>
            ) : null}
            {inDatabase ? (
              <></>
            ) : (
              <div style={{ paddingTop: 50 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => handleAdd(e)}
                >
                  Add to our database to review
                </Button>
              </div>
            )}
            {inDatabase && localStorage.getItem("username") != null ? (
              <>
                <Typography
                  component="legend"
                  variant="body1"
                  color="textSecondary"
                >
                  YOUR RATING:
                </Typography>
                <div className={classes.rating}>
                  <Rating
                    name="userRating"
                    value={userRating}
                    max={10}
                    precision={0.5}
                    onChange={(e, newValue) => {
                      onReviewChange(e, newValue);
                    }}
                  />
                  {
                    <Box ml={1}>
                      <Typography
                        component="legend"
                        variant="h5"
                        style={{ color: "#ffc107" }}
                      >
                        {userRating}
                      </Typography>
                    </Box>
                  }
                </div>
                <Typography
                  component="legend"
                  variant="body1"
                  color="textSecondary"
                  style={{ paddingTop: 20 }}
                >
                  COMMENT:
                </Typography>
                <TextField
                  id="standard-full-width"
                  label={""}
                  style={{ margin: 8 }}
                  placeholder="Leave a comment for your review"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => onCommentChange(e)}
                />
                <div style={{ paddingTop: 20 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                      onReviewSubmit(e);
                    }}
                  >
                    Submit Review
                  </Button>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className={classes.root}>
        <div className={classes.card}>
          <CssBaseline>
            <Container className={classes.reviewContainer}>
              <Grid
                container
                justify="space-between"
                className={classes.spacing}
              >
                <Grid item>
                  <Typography
                    className={classes.header}
                    variant="h4"
                    gutterBottom
                  >
                    Reviews
                  </Typography>
                </Grid>
              </Grid>

              <Review reviews={movieReviews} />
            </Container>
          </CssBaseline>
        </div>
      </div>
    </PageBase>
  );
}

export default Movie;
