import { useState, useEffect } from "react";
import axios from "axios";
import cloneDeep from "lodash/cloneDeep";
export default function useApplicationData() {
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
  const params = {
    header: {
      //Targert the time header containing the information month/day of the week, day and time.
      top: {
        //Tartget the month elements
        style: { backgroundColor: "#333333", fontSize: "15px" }, //The style applied to the month elements
      },
      middle: {
        //Tartget elements displaying the day of week info
        style: { backgroundColor: "chocolate" }, //The style applied to the day of week elements
        selectedStyle: { backgroundColor: "#b13525" }, //The style applied to the day of week elements when is selected
      },
      bottom: {
        //Tartget elements displaying the day number or time
        style: { background: "grey", fontSize: 9 }, //the style tp be applied
        selectedStyle: { backgroundColor: "#b13525", fontWeight: "bold" }, //the style tp be applied  when selected
      },
    },
    taskList: {
      //the right side task list
      title: {
        //The title od the task list
        label: "Tasks", //The caption to display as title
        style: {
          backgroundColor: "#333333",
          borderBottom: "solid 1px silver",
          color: "white",
          textAlign: "center",
          fontSize: "20px",
        }, //The style to be applied to the title
      },
      task: {
        // The items inside the list diplaying the task
        style: { backgroundColor: "#fbf9f9" }, // the style to be applied
      },
      verticalSeparator: {
        //the vertical seperator use to resize he width of the task list
        style: { backgroundColor: "#333333" }, //the style
        grip: {
          //the four square grip inside the vertical separator
          style: { backgroundColor: "#cfcfcd" }, //the style to be applied
        },
      },
    },
    dataViewPort: {
      //The are where we display the task
      rows: {
        //the row constainting a task
        style: {
          backgroundColor: "#fbf9f9",
          borderBottom: "solid 0.5px #cfcfcd",
        },
      },
      task: {
        showLabel: false, //If the task display the a lable
        style: {
          position: "absolute",
          borderRadius: 14,
          color: "white",
          textAlign: "center",
          backgroundColor: "grey",
        },
        selectedStyle: {}, //the style tp be applied  when selected
      },
    },
    links: {
      //The link between two task
      color: "black",
      selectedColor: "#ff00fa",
    },
  };
  const [state, setState] = useState({
    tasks: [],
    lists: listSchema,
    params: params,
  });

  function tasksFilter(tasks, listTitle) {
    let tasksForList = [];
    for (let task of tasks) {
      let taskDetails = {};
      if (task.status === listTitle) {
        taskDetails["id"] = task.id;
        taskDetails["name"] = task.name;
        taskDetails["priority"] = task.priority;
        taskDetails["status"] = task.status;
        taskDetails["end"] = task.end;
        taskDetails["start"] = task.start;
        taskDetails["description"] = task.description;

        tasksForList.push(taskDetails);
      }
    }
    return tasksForList;
  }

  function updateLists(lists, tasks) {
    // console.log("lists outside loop", lists);
    for (let list of lists) {
      list.tasks = [...tasksFilter(tasks, list.name)];
    }
    // console.log("lists after loop", lists);
    return [lists, tasks];
  }

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/tasks")
      .then((result) => {
        let [initialListState, tasks] = updateLists(listSchema, result.data);

        setState((prev) => ({
          ...prev,
          tasks: tasks,
          lists: initialListState,
        }));
      })
      .catch((err) => console.log(err));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateDragDrop(destinationId, draggableId) {
    let id = parseInt(draggableId);
    let newStatus = listSchema[destinationId - 1].name;

    axios
      .put(`http://localhost:8080/api/tasks/${id}`, { status: newStatus })
      .then((result) => {
        // console.log("result in drag and drop---", result);
        let [listState, tasks] = updateLists(state.lists, result.data);
        setState((prev) => ({ ...prev, tasks: tasks, lists: listState }));
      });
  }

  function createTasks(name) {
    // eslint-disable-next-line no-unused-vars
    const stateCopy = cloneDeep(state);

    axios
      .post("http://localhost:8080/api/tasks", { name: name })
      .then((result) => {
        // console.log("result------", result);
        let [listState, tasks] = updateLists(state.lists, result.data);

        setState((prev) => ({ ...prev, tasks: tasks, lists: listState }));
      })
      .catch((err) => console.log(err));
  }

  function updateTask(id, name, start_date, end_date, status, priority) {
    axios
      .put(`http://localhost:8080/api/tasks/${id}`, {
        name: name,
        status: status,
        start: start_date,
        end: end_date,
        priority: priority,
      })
      .then((result) => {
        // console.log("result in gantt---", result.data);
        let [listState, tasks] = updateLists(state.lists, result.data);
        // console.log();
        setState((prev) => ({ ...prev, tasks: tasks, lists: listState }));
      })
      .catch((err) => console.log(err));
  }

  function deleteTask(id) {
    const task = { ...state.tasks[id], tasks: null };
    const tasks = { ...state.tasks, [id]: task };
    return axios.delete(`http://localhost:8080/api/tasks/${id}`).then(() => {
      setState({ ...state, tasks });
      updateTask(id);
    });
  }

  return {
    state,
    setState,
    updateDragDrop,
    createTasks,
    updateTask,
    deleteTask,
  };
}
