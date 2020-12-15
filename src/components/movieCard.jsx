import {
  Card,
  CardMedia,
  makeStyles,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
}));

function MovieCard(movie) {
  const classes = useStyles();
  let history = useHistory();
  const title = movie?.movie?.movieName ?? null;
  const imgPath =
    "http://image.tmdb.org/t/p/original" + movie?.movie?.posterPath ?? null;
  const overView = movie?.movie?.overView ?? null;

  if (movie == null || title == null || imgPath == null || overView == null) {
    return null;
  }

  function handleClick(e) {
    e.preventDefault();
    history.push("/movie" + title);
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={imgPath} title={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {overView}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

export default MovieCard;
