import React, { Fragment, useState } from "react";
import Navbar from "./Navbar";
import {
  Typography,
  Button,
  Card,
  CardMedia,
  Box,
  Paper,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import TabletAndroidIcon from "@material-ui/icons/TabletAndroid";
import kanban from "images/kanban.png";
// import landing from "";
const useStyles = makeStyles({
  body: {
    display: "flex",
    justifyContent: "center",
  },

  paper_right: {
    backgroundColor: "rgba(64, 111, 127, 0.31)",
    borderRadius: "25px",
    border: "rgba(255, 255, 255, 0.25)",
    boxShadow: "none",
    backdropFilter: "blur(11px)",
    marginTop: "10em",
    padding: "1em",
    width: "50%",
    height: "50%",
  },
  paper_left: {
    backgroundColor: "#FBEECA",
    backdropFilter: "blur(11px)",
    backdropFilter: "blur(15px)",
    marginTop: "15em",
    padding: "1em",
    marginRight: "1em",
    width: "10%",
    height: "10%",
  },
  paper_left_right: {
    backgroundColor: "#D8EACC",
    backdropFilter: "blur(11px)",
    backdropFilter: "blur(15px)",
    marginTop: "15em",
    padding: "1em",
    marginRight: "1em",
    width: "10%",
    height: "10%",
  },
});

export default function Landing() {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <body className={classes.body}>
        <Paper className={classes.paper_left}>
          <Typography color="secondary" variant="h6">
            make my day
          </Typography>
          <br></br>
          <Typography variant="body2">
            A simple to use app for small teams to communicate and organize
            tasks.
          </Typography>
        </Paper>
        <Paper className={classes.paper_right}>
          <img className="landing_img" id="landing_img" src={kanban} />
        </Paper>
      </body>
    </>
  );
}
