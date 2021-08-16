import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Task from "./Task";
import ListTitle from "./ListTitle";
import NewTask from "./NewTask";
import { Droppable } from "react-beautiful-dnd";

const useStyle = makeStyles((theme) => ({
  list: {
    width: "300px",
    backgroundColor: "#EDECF0",
    marginRight: theme.spacing(4),
    padding: theme.spacing(1),
  },
  divide: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function List({
  list,
  title,
  onSubmit,
  deleteTask,
  updateTask,
  projectUsers,
}) {
  const classes = useStyle();
  
  const sortedTasks = list.tasks.sort((a, b) => {
    
    return (a.priority - b.priority || a.end.localeCompare(b.end));
  });

  return (
    <Paper className={classes.list}>
      <ListTitle title={title} length={list.tasks.length} />
      {title === "In Progress" ? <NewTask /> : null}
      <Droppable droppableId={list.id.toString()}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {sortedTasks.map((task, index) => (
              <Task
                task={task}
                key={task.id}
                index={index}
                deleteTask={deleteTask}
                updateTask={updateTask}
                projectUsers={projectUsers}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Paper>
  );
}
