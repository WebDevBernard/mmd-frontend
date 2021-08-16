import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { Avatar, CardActions, Divider, Tooltip } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useStyles } from "./ProjectListItemStyle";
import Chat from "../chat/Chat";
import "../projectList/ProjectList.css";
import Button from "@material-ui/core/Button";
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

export default function ProjectListItems({
  project,
  handleDelete,
  handleClickOpen,
}) {
  const classes = useStyles(project);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();
  const currentRoute = useRouteMatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e, projectId) => {
    const value = e.target.getAttribute("value");
    if (value === "Delete") {
      handleDelete(projectId);
    }
    if (value === "Edit") {
      handleClickOpen(projectId, value);
      history.push(`${currentRoute.url}/${projectId}`);
    }

    setAnchorEl(null);
  };

  return (
    <Card elevation={1} className={classes.listItem} variant="outlined">
      <CardHeader
        title={
          <Typography
            onClick={() =>
              history.push(`${currentRoute.url}/${project.id}/tasks`)
            }
            variant="h5"
            fontSize="15"
            style={{
              wordBreak: "break-word",
              cursor: "pointer",
              paddingRight: "5px",
            }}
          >
            {project.name}
          </Typography>
        }
        style={{ color: "#406f7f" }}
        action={
          <div>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
            >
              {options.map((option) => (
                <MenuItem
                  key={option}
                  value={option}
                  onClick={(e) => handleClose(e, project.id)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
        }
      />

      <Divider />

      <CardContent
        style={{ cursor: "pointer" }}
        className={classes.content}
        onClick={() => history.push(`${currentRoute.url}/${project.id}/tasks`)}
      >
        <Typography style={{ wordBreak: "break-word" }} variant="body3">
          {project.description}
        </Typography>
      </CardContent>

      <div className={classes.footer}>
        <Typography
          className={classes.status}
          variant="body2"
          color="textSecondary"
        >
          {project.status}
        </Typography>
        <CardActions>
          {project.users.map((user) => {
            return (
              <LightTooltip
                title={user.user_name}
                className={classes.light}
                aria-label="add"
              >
                <IconButton key={user.id} className={classes.person}>
                  <img
                    className="avatar"
                    // src={user.avatar}
                    src={avatar}
                  />

                  {/* <Avatar alt={user.name} src={user.avatar} /> */}
                </IconButton>
              </LightTooltip>
            );
          })}
          <Chat project={project} />
        </CardActions>
      </div>
    </Card>
  );
}
