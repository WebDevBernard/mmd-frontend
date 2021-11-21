import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogContent, Divider, Typography } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import Message from "./message/Message";
import Members from "./members/Members";
import { Tooltip } from "@material-ui/core";
import "./Chat.css";
import { makeStyles } from "@material-ui/core";
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
const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
    fontSize: 14,
  },
}))(Tooltip);

const useStyles = makeStyles({
  dialog: {
    position: "absolute",
    // left: "125vh",
    bottom: "9vh",
    width: "45vh",
    height: "69vh",
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Chat({ project }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  return (
    <div>
      <HtmlTooltip
        style={{ cursor: "pointer" }}
        title={
          <React.Fragment>
            <Typography color="inherit">Chat Feature Not Enabled</Typography>
          </React.Fragment>
        }
      >
        <QuestionAnswerIcon
          style={{
            cursor: "pointer",
            width: 40,
            height: 40,
            color: "#8561c5",
          }}
//           onClick={handleClickOpen}
        />
      </HtmlTooltip>
      <Dialog
        BackdropProps={{ style: { backgroundColor: "transparent" } }}
        PaperProps={{
          style: {
            backgroundColor: "rgba(64, 111, 127, 0.31)",
            borderRadius: "10px",
            border: "rgba(255, 255, 255, 0.25)",
            boxShadow: "none",
            backdropFilter: "blur(15px)",
          },
        }}
        classes={{
          paper: classes.dialog,
        }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        {/* <DialogTitle id="alert-dialog-slide-title">
          Chat Room: {project.name}
          Team Members
        </DialogTitle> */}
        <DialogContent>
          {/* <Members usersInProject={project.users} /> */}
          <Message project={project} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
