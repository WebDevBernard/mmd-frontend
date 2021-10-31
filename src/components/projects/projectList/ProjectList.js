import React, { useState } from "react";
import Masonry from "react-masonry-css";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import ProjectForm from "../projectForm/ProjectForm";
import ProjectListItems from "../projectListItem/ProjectListItem";
import useProjectData from "hooks/useProjectData";
import classes from "./ProjectList.css";
import avatar from "images/avatar.jpg";
import { MessageContextProvider } from "context/MessageContext";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import UserSelector from "../userSelector/UserSelector";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { wrap } from "lodash";

export default function ProjectList() {
  const {
    handleClickOpen,
    state,
    selectedDate,
    handleDateChange,
    handleClose,
    handleSubmit,
    open,
    titleError,
    descriptionError,
    setdescription,
    description,
    title,
    setTitle,
    status,
    setStatus,
    getUserIds,
    userId,
    breakpoints,
    HaveProjectWithUsers,
    handleDelete,
  } = useProjectData();

  const [filteredProjects, setFilteredProjects] = useState(null);
  const [filteredProcess, setFilteredProcess] = useState(null);
  const [filteredUser, setFilteredUser] = useState(null);

  const resetAllFilter = () => {
    setFilteredProjects(null);
    setFilteredProcess(null);
    setFilteredUser(null);
  };

  const filterByUser = (value) => {
    setFilteredProjects(null);
    setFilteredProcess(null);
    setFilteredUser(value);

    const userId = value?.id;
    const newProjects = [...state.projects].reverse().filter((project) => {
      const foundId = project.users.find((id) => id === parseInt(userId));
      return foundId === parseInt(userId);
    });
    setFilteredProjects(newProjects);
  };

  const filterByStatus = (status) => {
    setFilteredProjects(null);
    setFilteredUser(null);
    setFilteredProcess(status);
    console.log(status);
    const newProjects = [...state.projects].reverse().filter((project) => {
      return status && project.status.toLowerCase() === status.toLowerCase();
    });
    setFilteredProjects(newProjects);
  };

  const projects = filteredProjects
    ? filteredProjects
    : [...state.projects].reverse();

  const sortedProjects = projects.map((project, index) => (
    <div key={index}>
      <ProjectListItems
        project={HaveProjectWithUsers(project, state.users)}
        handleDelete={handleDelete}
        handleClickOpen={handleClickOpen}
      />
    </div>
  ));

  return (
    <div>
      <div className="project_top_section">
        <Button
          style={{ minWidth: "220px" }}
          variant="contained"
          value={"Create"}
          color="primary"
          onClick={handleClickOpen}
          startIcon={<AddIcon />}
        >
          CREATE NEW PROJECT
        </Button>

        <ProjectForm
          handleDateChange={handleDateChange}
          selectedDate={selectedDate}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          open={open}
          titleError={titleError}
          descriptionError={descriptionError}
          setdescription={setdescription}
          description={description}
          title={title}
          setTitle={setTitle}
          status={status}
          setStatus={setStatus}
          getUserIds={getUserIds}
          userId={userId}
        />
        {/* <RadioGroup
          className="filter_by_status_radio_row"
          style={{flexDirection: 'row', flexWrap: 'none' }}
          value={filteredProcess}
          onChange={(e) => filterByStatus(e.target.value)}
        >
          <FormControlLabel
            value="In progress"
            control={<Radio />}
            label="In progress"
          />
          <FormControlLabel
            value="Completed"
            control={<Radio />}
            label="Completed"
          />
          <FormControlLabel
            value="On hold"
            control={<Radio />}
            label="On hold"
          />
          <FormControlLabel
            value="Cancelled"
            control={<Radio />}
            label="Cancelled"
          />
        </RadioGroup> */}
        <div className="filter_by_users">
          <div className="filter_by_users_Info">
            <Autocomplete
              onChange={(event, value) => filterByUser(value)}
              onClick={filterByUser}
              id="multiple-limit-tags"
              options={state.users}
              value={filteredUser}
              getOptionLabel={(user) => user.user_name}
              renderOption={(user) => (
                <div className="filter_by_users_options">
                  <img
                    className="avatar"
                    alt={user.name}
                    // src={user.avatar}
                    src={avatar}
                  />
                  <p>
                    {user.user_name}
                    <br />
                    {user.email}
                  </p>
                </div>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  variant="outlined"
                  label="Filter Project by User"
                  // placeholder="Find Project by Team Member"
                  color="secondary"
                />
              )}
            />
          </div>
          <Button
            startIcon={<RotateLeftIcon />}
            onClick={resetAllFilter}
            variant="outlined"
            size="large"
            color="primary"
            style={{ marginLeft: "7px", borderRadius: "0px" }}
          >
            RESET
          </Button>
        </div>
      </div>
      <br />
      <body>
        <MessageContextProvider>
          <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {sortedProjects.length === 0 ? (
              <p style={{ fontSize: "1rem", position: "absolute" }}>
                Please wait, Heroku back-end is sleeping.
              </p>
            ) : (
              sortedProjects
            )}
          </Masonry>
        </MessageContextProvider>
      </body>
    </div>
  );
}
