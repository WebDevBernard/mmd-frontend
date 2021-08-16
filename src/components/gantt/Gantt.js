import React, { useContext } from "react";
import TimeLine from "react-gantt-timeline";
import ProjectContext from "../../context/ProjectContext";
import { useParams } from "react-router-dom";
import { Box } from "@material-ui/core";

function Gantt() {
  const { projects, updateTask } = useContext(ProjectContext);

  const projectId = useParams().id;
  const params = {
    header: {
      //Targert the time header containing the information month/day of the week, day and time.
      top: {
        //Tartget the month elements
        style: { backgroundColor: "#406f7f", fontSize: "15px" }, //The style applied to the month elements
      },
      middle: {
        //Tartget elements displaying the day of week info
        style: { backgroundColor: "#114B5F" }, //The style applied to the day of week elements
        selectedStyle: { backgroundColor: "#b13525", fontSize: 13 }, //The style applied to the day of week elements when is selected
      },
      bottom: {
        //Tartget elements displaying the day number or time
        style: { background: "#406f7f", fontSize: 13 }, //the style tp be applied
        selectedStyle: { backgroundColor: "#FFFF" }, //the style tp be applied  when selected
      },
    },
    taskList: {
      //the right side task list
      title: {
        //The title od the task list
        label: "Tasks", //The caption to display as title
        style: {
          backgroundColor: "#114B5F",
          borderBottom: "solid 1px silver",
          color: "white",
          textAlign: "center",
          fontSize: "20px",
        }, //The style to be applied to the title
      },
      task: {
        // The items inside the list diplaying the task
        style: {
          backgroundColor: "#fbf9f9",
          textAlign: "right",
          paddingRight: "0.7em",
          fontSize: 12.5,
          color: "#114B5F",
        }, // the style to be applied
      },
      verticalSeparator: {
        //the vertical seperator use to resize he width of the task list
        style: { backgroundColor: "#0b3442" }, //the style
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
          color: "#FFF",
          textAlign: "center",
          backgroundColor: "#114B5F",
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
  const onUpdateTask = (item, props) => {
    updateTask(item.id, props.start, props.end);
  };

  const sortedTasks = projects[projectId].tasks.sort((a, b) => {
    return new Date(a.start).getTime() - new Date(b.start).getTime();
  });

  // const containerStyle = {
  //   margin: 0,
  // };
  return (
    // <Container style={containerStyle}>
    <Box width={1 / 3}>
      <TimeLine
        data={sortedTasks}
        config={params}
        onUpdateTask={onUpdateTask}
      />
    </Box>
    // </Container>
  );
}

export default Gantt;
