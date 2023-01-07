import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "context/AuthContext";
import axios from "axios";
import {
  getIncompleteTasks,
  getProjectsWithTasks,
  getProjectNames,
} from "../../hooks/helpers";
import { Paper, Box, Typography, makeStyles, Tooltip } from "@material-ui/core";
import DashbordProject from "./DashbordProject";

import { withStyles } from "@material-ui/core/styles";
const options = ["Edit", "Delete"];
const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 14,
  },
}))(Tooltip);
const useStyle = makeStyles((theme) => ({
  text: {
    color: "black",
    fontWeight: "500",
  },
}));

function Dashboard() {
  const classes = useStyle();
  const { user } = useContext(AuthContext);
  const [userState, setUserState] = useState({
    tasks: [],
  });
  useEffect(() => {
    axios
      .get("https://mmdapi-production.up.railway.app/api/tasks")
      .then((result) => {
        setUserState((prev) => ({ ...prev, tasks: result.data }));
      });
  }, []);

  console.log("user", user);

  if (!userState.tasks.length) {
    return null;
  }
  console.log(userState);
  let incompleteTasks = getIncompleteTasks(userState.tasks, user.id);

  let projects = getProjectNames(incompleteTasks);
  const displayProjects = projects.map((project, index) => (
    <LightTooltip style={{ cursor: "pointer" }} title={project.name}>
      <DashbordProject title={project} key={index} tasks={incompleteTasks} />
    </LightTooltip>
  ));

  return (
    <div>
      <h2>Welcome back, {user.user_name}</h2>
      <Typography className={classes.text}>
        you have {incompleteTasks.length} incomplete tasks in {projects.length}{" "}
        projects
      </Typography>
      <Box display="flex" flexDirection="row">
        {displayProjects}
      </Box>
    </div>
  );
}

export default Dashboard;
