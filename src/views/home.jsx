import React from "react";
import PageBase from "../components/pageBase.jsx";
import { makeStyles, Paper, Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainBkg: {
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
  },
  mainContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

function Home() {
  const classes = useStyles();

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
                Here you can find your favorite movies and share your thoughts
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </PageBase>
  );
}

export default Home;
