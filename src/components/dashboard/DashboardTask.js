import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  makeStyles,
  Typography,
  Grid,
} from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
const useStyle = makeStyles((theme) => ({
  card: {
    borderRadius: 8,
    marginBottom: 5,
  },
  align: {
    display: "flex",
    alignContent: "row",
    justifyContent: "space-between",
  },
}));

function DashboardTask({ task }) {
  const classes = useStyle();
  const PriorityIcon = (props) => {
    if (props.priority === "1") {
      return (
        <ArrowUpwardIcon className={classes.priority} style={{ fill: "red" }} />
      );
    } else if (props.priority === "2") {
      return (
        <ArrowUpwardIcon
          className={classes.priority}
          style={{ fill: "orange" }}
        />
      );
    } else {
      return (
        <ArrowDownwardIcon
          className={classes.priority}
          style={{ fill: "green" }}
        />
      );
    }
  };
  const endDate = new Date(task.end).toLocaleString("en-US", {
    month: "long",
    day: "2-digit",
  });

  return (
    <Card className={classes.card}>
      <CardHeader title={<Typography fontSize="16">{task.name}</Typography>} />
      <Divider />
      <CardContent>
        <Grid container className={classes.align}>
          <Typography color="primary">{endDate}</Typography>
          <PriorityIcon priority={task.priority} className={classes.priority} />
        </Grid>
      </CardContent>
    </Card>
  );
}

export default DashboardTask;
