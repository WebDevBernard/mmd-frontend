import clsx from "clsx";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";

import { useTheme } from "@material-ui/core/styles";
// import { useStyles } from "./LayoutStyle";

import {
  Avatar,
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Tooltip,
  Button,
} from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import SubjectOutlined from "@material-ui/icons/SubjectOutlined";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import HomeIcon from "@material-ui/icons/Home";
import AssignmentIcon from "@material-ui/icons/Assignment";
import MenuIcon from "@material-ui/icons/Menu";
import { useContext } from "react";
import { AuthContext } from "context/AuthContext";
import Landing from "components/landing_page/Landing";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    background: "#114B5F",

    zIndex: theme.zIndex.drawer + 2,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    color: "#FFF",
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    // background: "#114B5F",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    // background: "#114B5F",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    // flexGrow: 1,
    padding: theme.spacing(3),
  },
  active: {
    color: "#114B5F",

    // padding: "5px",
    // color: "black",
  },
  icons: {
    marginLeft: "5px",
  },
  avatar: { backgroundColor: "#406f7f", color: "#FFF" },
  app: {
    flexGrow: 1,
  },
  // sidebar: {
  //   background: "blue",
  // },
  btnbtn: {
    fontWeight: "500",
    borderRadius: "0px",
    marginRight: "25px",
    color: "#FFF",
    backgroundColor: "#406f7f",
    "&:hover": {
      backgroundColor: "#406f7f",
      boxShadow: "none",
    },
  },
}));
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

export default function MiniDrawer({ children }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    // {
    //   text: (
    //     <LightTooltip style={{ cursor: "pointer" }} title={"Dashboard"}>
    //       <Typography variant="body2">Dashboard</Typography>
    //     </LightTooltip>
    //   ),
    //   icon: <HomeIcon className={classes.icons} />,
    //   path: "/dashboard",
    // },
    {
      text: <Typography variant="body2">Projects</Typography>,
      icon: (
        <LightTooltip style={{ cursor: "pointer" }} title={"Projects"}>
          <AssignmentIcon className={classes.icons} />
        </LightTooltip>
      ),
      path: "/projects",
    },
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { user } = useContext(AuthContext);

  return (
    <>
      {user ? (
        <Landing />
      ) : (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            elevation={2}
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar>
              <HtmlTooltip
                title={
                  <React.Fragment>
                    <Typography color="inherit">
                      Drawer Open Feature Not Enabled
                    </Typography>{" "}
                  </React.Fragment>
                }
              >
                <IconButton
                  // color="inherit"
                  aria-label="open "
                  // onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, {
                    [classes.hide]: open,
                  })}
                >
                  <MenuIcon />
                </IconButton>
              </HtmlTooltip>
              <Typography variant="h6" noWrap className={classes.app}>
                {/* <strong>MAKE MY DAY</strong> */}
              </Typography>
              <div>
                <HtmlTooltip
                  title={
                    <React.Fragment>
                      <Typography color="inherit">
                        Visit the Github Repo:
                      </Typography>
                      <br />
                      <em>{"https://github.com/byeongjae-kang/MakeMyDay"}</em>
                    </React.Fragment>
                  }
                >
                  <Button
                    variant="outlined"
                    size="small"
                    className={classes.btnbtn}
                    onClick={() =>
                      window.open("https://github.com/byeongjae-kang/MakeMyDay")
                    }
                    startIcon={<GitHubIcon />}
                  >
                    Github
                  </Button>
                </HtmlTooltip>
                {/* <Typography>WELCOME!! {user && user.user_name}</Typography> */}
              </div>
              <HtmlTooltip
                style={{ cursor: "pointer" }}
                title={
                  <React.Fragment>
                    <Typography color="inherit">
                      User Login Feature Not Enabled
                    </Typography>
                  </React.Fragment>
                }
              >
                <Avatar className={classes.avatar}></Avatar>
              </HtmlTooltip>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }),
            }}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </div>

            {/* <Divider /> */}
            <br />

            <List>
              {menuItems.map((item) => (
                <ListItem
                  button
                  key={item.text}
                  onClick={() => history.push(item.path)}
                  className={
                    location.pathname === item.path ? classes.active : null
                  }
                >
                  <ListItemIcon
                    className={
                      location.pathname === item.path ? classes.active : null
                    }
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText>{item.text}</ListItemText>
                </ListItem>
              ))}
            </List>
            {/* <Divider /> */}
          </Drawer>
          <div className={classes.content}>
            <div className={classes.toolbar}></div>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
