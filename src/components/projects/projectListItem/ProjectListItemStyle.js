import { makeStyles } from "@material-ui/core";
import { green, pink, yellow } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
  listItem: {
    minWidth: 275,
    maxWidth: 400,
    borderRadius: 10,
  },
  status: {
    color: (project) => {
      if (project.status === "On hold") {
        return yellow[700];
      }
      if (project.status === "Cancelled") {
        return pink[500];
      }
      return green[700];
    },
  },
  content: {
    marginBottom: 20,
  },

  person: {
    height: 0,
    padding: 0,
    margin: theme.spacing(1),
    width: theme.spacing(3),
  },
  footer: {
    padding: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tooltip: {
    cursor: "pointer",
    backgroundColor: "#406f7f",
  },
}));

export { useStyles };
