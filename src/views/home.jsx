import React, { useEffect, useState } from "react";
import PageBase from "../components/pageBase.jsx";
import { makeStyles, Paper, Typography, Grid, Button } from "@material-ui/core";
import Axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { useHistory } from "react-router-dom";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;

const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const useStyles = makeStyles((theme) => ({
  mainBkg: {
    borderRadius: 10,
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    backgroundImage: "url(https://i.loli.net/2020/12/16/KcyjoYFvUftlNMw.jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "110vh",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
    borderRadius: 10,
  },
  mainContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  next: {
    top: "calc(50% - 20px)",
    position: "absolute",
    background: "#84C7CE",
    borderRadius: 30,
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    userSelect: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 18,
    zIndex: 2,
    right: 10,
  },

  prev: {
    top: "calc(50% - 20px)",
    position: "absolute",
    background: "#84C7CE",
    borderRadius: 30,
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    userSelect: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 18,
    zIndex: 2,
    left: 10,
    transform: "scale(-1)",
  },

  container: {
    borderRadius: 10,
    width: "98vw",
    height: "95vh",
    position: "relative",
    display: "flex",
    justifycontent: "center",
    alignitems: "center",
    background: "#599592",
  },

  img: {
    height: "95vh",
    width: "42%",
  },
}));

function Home() {
  const classes = useStyles();
  let history = useHistory();

  const [trendyMovies, setTrendyMovies] = useState([]);

  useEffect(() => {
    Axios.get(
      "https://movie-rating-server.herokuapp.com/api/movie/trending/week"
    )
      .then((response) => {
        setTrendyMovies(response.data.results);
      })
      .catch((error) => console.log(error));
  }, []);

  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, trendyMovies.length, page);
  const path = trendyMovies[imageIndex]?.posterPath ?? null;
  console.log(trendyMovies[0]);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  function onSignInClick(e) {
    e.preventDefault();
    history.push("/signin");
  }

  if (localStorage.getItem("username")) {
    return (
      <PageBase>
        <Paper className={classes.mainBkg}>
          <div className={classes.overlay} />
          <Grid container>
            <Grid item md={6}>
              <div className={classes.mainContent}>
                <Typography
                  component="h1"
                  variant="h3"
                  color="inherit"
                  gutterBottom
                >
                  Welcome to the Movie Review Website
                </Typography>
                <Typography variant="h5" color="inherit" paragraph>
                  Here you can find your favorite movies and share your
                  thoughts.
                </Typography>
                <Typography variant="h5" color="inherit" paragraph>
                  Scroll sown to see what's trending this week
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Paper>
        <div className={classes.container}>
          <AnimatePresence initial={false} custom={direction}>
            <center>
              <motion.img
                className={classes.img}
                key={page}
                src={"http://image.tmdb.org/t/p/original" + path}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
              />
            </center>
          </AnimatePresence>
          <div className={classes.next} onClick={() => paginate(1)}>
            {"‣"}
          </div>
          <div className={classes.prev} onClick={() => paginate(-1)}>
            {"‣"}
          </div>
        </div>
      </PageBase>
    );
  }

  return (
    <PageBase>
      <Paper className={classes.mainBkg}>
        <div className={classes.overlay} />
        <Grid container>
          <Grid item md={6}>
            <div className={classes.mainContent}>
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                Welcome to the Movie Review Website
              </Typography>
              <Typography variant="h6" color="inherit" paragraph>
                Here you can find your favorite movies and share your thoughts
              </Typography>
              <Button
                color="#8bc34a"
                variant="contained"
                onClick={(e) => onSignInClick(e)}
              >
                Go sign in to see more
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </PageBase>
  );
}

export default Home;
