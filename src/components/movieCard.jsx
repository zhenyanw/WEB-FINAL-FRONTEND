import {
  Card,
  CardMedia,
  makeStyles,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    paddingTop: "56.25%",
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
      <CardMedia className={classes.media} image={imgPath} title={title} />
      <CardContent>
        <Typography noWrap gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography noWrap variant="body2" color="textSecondary" component="p">
          {overView}
        </Typography>
      </CardContent>
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
