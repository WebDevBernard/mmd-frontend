import React, { useContext } from "react";
import List from "./List";
import { Box } from "@material-ui/core";
import { DragDropContext } from "react-beautiful-dnd";
import { listForProject, listForUser } from "hooks/helpers";
import { useParams } from "react-router-dom";
import ProjectContext from "../../context/ProjectContext";
import cloneDeep from "lodash/cloneDeep";

export default function TasksBody() {

  const { projects, updateDragDrop, userId, filter } = useContext(ProjectContext);

  const projectID = useParams().id;
  const projectList = listForProject(projects[projectID].tasks);
  let listCopy = cloneDeep(projectList)
  const userLists = listForUser(listCopy, userId)

  const onDragEnd = ({ destination, source, draggableId }) => {
    if (!destination) {
      return;
    }

    const sourceList = projectList.filter((list) => {
      return list.id === source.droppableId;
    });

    const taskToBeMoved = sourceList[0].tasks[source.index];

    sourceList[0].tasks.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceList[0].tasks.splice(destination.index, 0, taskToBeMoved);

      updateDragDrop(destination.droppableId, draggableId);
    } else {
      const destinationList = projectList.filter((list) => {
        return list.id === destination.droppableId;
      });
      destinationList[0].tasks.splice(destination.index, 0, taskToBeMoved);

      updateDragDrop(destination.droppableId, draggableId);
    }
  };

  const lists = projectList.map((list, index) => (
    <List
      title={list.name}
      list={list}
      key={list.id}
      index={index}
    />
  ));

  const userList = userLists.map((list, index) => (
    <List
      title={list.name}
      list={list}
      key={list.id}
      index={index}
    />
  ));

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Box display="flex" flexDirection="row">

          {filter ? userList : lists}
        </Box>
      </div>
    </DragDropContext>
  );
}
