import React from 'react'
import { Paper, Typography } from "@material-ui/core";
import { getTaskForProject } from 'hooks/helpers';
import DashboardTask from './DashboardTask';
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  list: {
    width: "300px",
    backgroundColor: "#EDECF0",
    marginRight: theme.spacing(4),
    padding: theme.spacing(1)
  },
  title: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
    background: "#114B5F"
  },
  text: {
    color: "#fff",
    fontWeight: "500"
  }
}));


function DashbordProject({ title, tasks }) {
  const classes = useStyle();
  const tasksForProject = getTaskForProject(tasks, title);
  const displayTasks = tasksForProject.map((task) => <DashboardTask
    task={task} />)
  return (
    <Paper className={classes.list}>
      <Paper className={classes.title}>
        <Typography className={classes.text}>
          {title}
        </Typography>
      </Paper>
      {displayTasks}
    </Paper>
  )
}

export default DashbordProject
