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

export { useStyles };
