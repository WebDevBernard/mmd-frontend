import React, { useContext, useState } from "react";
import { InputBase, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ProjectContext from "../../context/ProjectContext";
import { useParams } from "react-router";

const useStyle = makeStyles((theme) => ({
  task_input: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
  },
}));

export default function TaskInput(props) {
  const { createTask } = useContext(ProjectContext);
  const projectId = useParams().id;
  const [name, setName] = useState("");
  const classes = useStyle();
  const [error, setError] = useState("");

  function handleKeyPress(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    if (e.key === "Enter") {
      e.preventDefault();

      if (name.length > 1) {
        createTask(name, projectId);
        props.setOpen(false);
        setName("");
      }

      setError(name.length ? "" : props.setOpen(false));
    }
  }

  return (
    <Paper className={classes.task_input}>
      <InputBase
        multiline
        fullWidth
        placeholder={"Enter a title..."}
        // placeholder={error ? error : "Enter a title..."}
        value={name}
        onKeyDown={handleSubmit}
        onChange={handleKeyPress}
      />
    </Paper>
  );
}
