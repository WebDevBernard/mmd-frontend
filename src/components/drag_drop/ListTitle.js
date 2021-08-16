import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
    background: "#114B5F",
  },
  text: {
    color: "#fff",
    // fontSize: '1.2rem',
    fontWeight: "500",
    // textAlign: "center"
  },
}));

export default function ListTitle(props) {
  const classes = useStyle();
  return (
    <Paper className={classes.title}>
      <Typography className={classes.text}>
        {props.title} ({props.length})
      </Typography>
    </Paper>
  );
}
