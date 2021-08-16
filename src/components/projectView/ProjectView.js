import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProjectContext from "../../context/ProjectContext";
import { Button, Box, Typography, Tooltip, Icon } from "@material-ui/core";
import axios from "axios";
// import FilterIcon from '@material-ui/icons/Filter';
// import Filter1Icon from '@material-ui/icons/Filter1';
import {
  reformatState,
  deleteTask,
  HaveProjectWithUsers,
  findIndex,
} from "hooks/helpers";
import Gantt from "components/gantt/Gantt";
import TasksBody from "components/drag_drop/TasksBody";
import cloneDeep from "lodash/cloneDeep";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import ListIcon from "@material-ui/icons/List";
import { withStyles } from "@material-ui/core/styles";
import avatar from "images/avatar.jpg";
const options = ["Edit", "Delete"];
const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 14,
  },
}))(Tooltip);
function ProjectView() {
  const [projects, setState] = useState({});
  const [users, setUsers] = useState({});
  const [view, setView] = useState(true);
  const [filter, setFilter] = useState(false);
  const [userId, setUserId] = useState();

  useEffect(() => {
    Promise.all([
      axios.get("/api/users"),
      axios.get("/api/projects"),
      axios.get("/api/tasks"),
    ])
      .then((result) => {
        // console.log("result in useEfect", result);
        setState((prev) => ({
          ...prev,
          ...reformatState(result[2].data, result[1].data),
        }));
        setUsers((prev) => ({
          ...prev,
          ...HaveProjectWithUsers(result[1].data, result[0].data),
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  const projectId = useParams().id;
  // console.log("users", users)
  const updateTask = function (id, start_date, end_date) {
    axios
      .put(`http://localhost:8080/api/tasks/${id}`, {
        start: start_date,
        end: end_date,
      })
      .then((result) => {
        return axios.get(
          `http://localhost:8080/api/tasks/${result.data[0].id}`
        );
      })
      .then((response) => {
        let project = cloneDeep(projects[response.data[0].project_id]);
        let tasks = project.tasks;
        tasks = deleteTask(response.data[0].id, tasks);
        const newTask = [...tasks, response.data[0]];
        project.tasks = newTask;
        setState((prev) => ({
          ...prev,
          [response.data[0].project_id]: project,
        }));
      })
      .catch((err) => console.log(err));
  };

  const listSchema = [
    {
      id: "1",
      name: "In Progress",
      tasks: [],
    },
    {
      id: "2",
      name: "Backlog",
      tasks: [],
    },
    {
      id: "3",
      name: "On Hold",
      tasks: [],
    },
    {
      id: "4",
      name: "Completed",
      tasks: [],
    },
  ];

  const updateDragDrop = function (destinationId, draggableId) {
    let id = parseInt(draggableId);
    let newStatus = listSchema[destinationId - 1].name;

    axios
      .put(`http://localhost:8080/api/tasks/${id}`, { status: newStatus })
      .then((result) => {
        // console.log("result in drag and drop---", result);
        let project = cloneDeep(projects[result.data[0].project_id]);
        let tasks = project.tasks;
        let index = findIndex(result.data[0].id, tasks);
        project.tasks[index].status = result.data[0].status;
        setState((prev) => ({ ...prev, [result.data[0].project_id]: project }));
      });
  };

  const createTask = function (name, id) {
    axios
      .post("http://localhost:8080/api/tasks", { name: name, project_id: id })
      .then((result) => {
        console.log("result  after post req", result);
        return axios.get(
          `http://localhost:8080/api/tasks/${result.data[0].id}`
        );
      })
      .then((responce) => {
        console.log("response after get------", responce);
        let project = cloneDeep(projects[responce.data[0].project_id]);
        project.tasks.push(responce.data[0]);
        setState((prev) => ({
          ...prev,
          [responce.data[0].project_id]: project,
        }));
      })
      .catch((err) => console.log(err));
  };

  const deleteTasks = function (id) {
    axios.delete(`http://localhost:8080/api/tasks/${id}`).then((result) => {
      let project = cloneDeep(projects[result.data[0].project_id]);
      let newTask = deleteTask(result.data[0].id, project.tasks);
      project.tasks = newTask;
      setState((prev) => ({ ...prev, [result.data[0].project_id]: project }));
    });
  };

  if (!Object.keys(projects).length && !projects[projectId]) {
    return null;
  }

  function toggleView() {
    setView(!view);
  }

  function toggleFilter(id) {
    setFilter(!filter);
    setUserId(id);
  }

  const stateData = {
    projects,
    setState,
    updateTask,
    updateDragDrop,
    createTask,
    deleteTasks,
    users,
    userId,
    filter,
  };

  if (!Object.keys(users).length) {
    return null;
  }

  const projectUsers = users[projectId].users;

  const avatars = projectUsers.map((each, index) => (
    <LightTooltip style={{ cursor: "pointer" }} title={each.user_name}>
      <img
        key={index}
        className="avatar1"
        alt={each.user_name}
        // src={each.avatar}
        src={avatar}
        onClick={() => toggleFilter(each.id)}
      />
    </LightTooltip>
  ));

  return (
    <ProjectContext.Provider value={stateData}>
      <Box display="flex" onclick={() => setFilter(false)}>
        <Box display="flex" flexGrow={1}>
          <Typography
            style={{ marginTop: "5px", marginRight: "10px" }}
            variant="body2"
          >
            Project / {projects[projectId].name}
          </Typography>

          {/* <h4>{view ? "Project View" : "Gantt View"}</h4> */}
          <LightTooltip
            title={view ? "Switch to Gantt Chart" : "Switch to Kanban Board"}
          >
            <Button
              size="small"
              type="submit"
              color={view ? "primary" : "secondary"}
              startIcon={view ? <EventAvailableIcon /> : <ListIcon />}
              variant="contained"
              onClick={toggleView}
            >
              {view ? "Kanban Board" : "Gantt Chart"}
            </Button>
          </LightTooltip>
        </Box>

        <Box>{avatars}</Box>
      </Box>

      <br />
      {view && <TasksBody />}
      {!view && <Gantt />}
    </ProjectContext.Provider>
  );
}

export default ProjectView;
