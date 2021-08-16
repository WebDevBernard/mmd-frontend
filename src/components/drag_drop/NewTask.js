import React, { useState } from "react";
import { Collapse, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TaskInput from "./TaskInput";

const useStyle = makeStyles((theme) => ({
  top: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  new_task: {
    cursor: "pointer",
    backgroundColor: "#482880",
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
    // color: "blue",
    "&:hover": {
      backgroundColor: "#8561c5",
    },
  },
}));

export default function NewTask(props) {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  return (
    <div className={classes.top}>
      <Collapse in={open}>
        <TaskInput setOpen={setOpen} />
      </Collapse>
      <Collapse in={!open}>
        <Paper
          className={classes.new_task}
          elevation={0}
          onClick={() => setOpen(!open)}
        >
          <Typography style={{ color: "#fff" }}>+ Create a task</Typography>
        </Paper>
      </Collapse>
    </div>
  );
}
