import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import AccountCircle from "@material-ui/icons/AccountCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  fonts: {
    fontWeight: "bold",
  },
  inline: {
    display: "inline",
  },
}));

function Review({ reviews }) {
  const classes = useStyles();

  function handleDelete(e, review, index) {
    e.preventDefault();

    Axios.delete("https://movie-rating-server.herokuapp.com/api/movieReview", {
      data: {
        movieName: review.movieName,
        username: review.username,
      },
    })
      .then((response) => {
        Axios.put("https://movie-rating-server.herokuapp.com/api/movie/", {
          movieName: review.movieName,
          rating: 0 - review.rating,
        });
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (reviews.length === 0) {
    return null;
  }

  return (
    <List className={classes.root}>
      {reviews.map((review, index) => {
        return (
          <React.Fragment key={index.id}>
            <ListItem key={index.id} alignItems="flex-start">
              <ListItemAvatar>
                <AccountCircle />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography className={classes.fonts}>
                    {review.username}
                  </Typography>
                }
                secondary={
                  <>
                    <Rating
                      name="read-only"
                      value={review.rating}
                      readOnly
                      max={10}
                      precision={0.5}
                      size="small"
                    />
                    <br />
                    {review.comment}
                  </>
                }
              />
              {JSON.parse(localStorage.getItem("isAdmin")) === true ? (
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon
                      onClick={(e) => {
                        handleDelete(e, review, index);
                      }}
                    />
                  </IconButton>
                </ListItemSecondaryAction>
              ) : null}
            </ListItem>
          </React.Fragment>
        );
      })}
    </List>
  );
}

export default Review;
