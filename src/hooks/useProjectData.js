import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function useProjectData() {
  const [state, setState] = useState({
    users: [],
    projects: [],
  });

  useEffect(() => {
    Promise.all([
      axios.get("https://mmdapi-production.up.railway.app/api/users"),
      axios.get("https://mmdapi-production.up.railway.app/api/projects"),
    ]).then((all) => {
      setState({
        ...state,
        users: all[0].data,
        projects: all[1].data,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (projectId) => {
    axios
      .delete(
        `https://mmdapi-production.up.railway.app/api/projects/${projectId}`
      )
      .then((result) => {
        axios.get(`api/projects`).then((result) => {
          setState({
            ...state,
            projects: [...result.data],
          });
        });
      })
      .catch((err) => console.error("could not delete", err.message));
  };

  const HaveProjectWithUsers = (project, users) => {
    const updatedProject = project.users.map((userId) =>
      users.find((userDetail) => userDetail.id === userId)
    );

    return {
      ...project,
      users: updatedProject,
    };
  };

  const breakpoints = {
    default: 3,
  };

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [description, setdescription] = useState("");
  const [descriptionError, setdescriptionError] = useState(false);
  const [status, setStatus] = useState("In progress");
  const [userId, setuserId] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const history = useHistory();

  const handleClickOpen = (projectId, value) => {
    if ("Edit" === value) {
      handleEdit(projectId);
    } else {
      setTitle("");
      setTitleError(false);
      setdescription("");
      setdescriptionError(false);
      setStatus("In progress");
      setuserId([]);
      setSelectedDate(new Date().toISOString().split("T")[0]);
      setOpen(true);
    }
  };

  const handleEdit = (projectId) => {
    Promise.all([
      axios.get(
        `https://mmdapi-production.up.railway.app/api/projects/${projectId}`
      ),
      axios.get(
        `https://mmdapi-production.up.railway.app/api/user_projects/${projectId}`
      ),
    ]).then((result) => {
      const { name, description, status, due_date } = result[0].data[0];
      setTitle(name);
      setdescription(description);
      setStatus(status);
      setSelectedDate(due_date.split("T")[0]);
      const users = result[1].data.map((user) => user.user_id);
      setuserId(users);
      setOpen(true);
    });
  };

  const getUserIds = (selectedusers) => {
    const arrUserIds = selectedusers.map((user) => user.id);
    setuserId(arrUserIds);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleClose = () => {
    setOpen(false);
    history.push(`/projects`);
  };

  const handleSubmit = (e, param) => {
    e.preventDefault();
    setTitleError(false);
    setdescriptionError(false);

    if (title === "") {
      setTitleError(true);
    }
    if (description === "") {
      setdescriptionError(true);
    }

    const newProject = {
      name: title,
      description: description,
      status: status,
      users: userId,
      due_Date: selectedDate,
    };

    if (param.id) {
      newProject["modified_date"] = new Date().toISOString().split("T")[0];

      if (title && description) {
        axios
          .put(
            `https://mmdapi-production.up.railway.app/api/projects/${param.id}`,
            newProject
          )
          .then(() => {
            axios
              .get(`https://mmdapi-production.up.railway.app/api/projects`)
              .then((result) => {
                setState({
                  ...state,
                  projects: result.data,
                });
                handleClose();
              });
          });
      }
    } else {
      newProject["start_date"] = new Date().toISOString().split("T")[0];

      if (title && description) {
        axios
          .post(
            `https://mmdapi-production.up.railway.app/api/projects`,
            newProject
          )
          .then(() => {
            axios
              .get(`https://mmdapi-production.up.railway.app/api/projects`)
              .then((result) => {
                setState({
                  ...state,
                  projects: result.data,
                });
                handleClose();
              });
          })
          .catch((err) => console.log(err.message));
      }
    }
  };
  return {
    handleClickOpen,
    state,
    handleDateChange,
    handleClose,
    handleSubmit,
    selectedDate,
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
    handleEdit,
    handleDelete,
  };
}
