import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  closeIcon: {
    "&:hover": {
      color: "purple",
    },
    marginRight: 20,
    cursor: "pointer",
    marginTop: 20,
  },
  divide: {
    display: "flex",
    justifyContent: "space-between",
  },
  select: {
    width: 260,
  },
  button: {
    marginTop: 100,
    marginBottom: 25,
  },
  card: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
  },
  paper: {
    backgroundColor: "primary",
    padding: theme.spacing(1, 1),
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: 260,
  },
  root: {
    color: "secondary",
    width: 500,
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
  members: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  radius: {
    borderRadius: 10,
  },
}));

export default useStyles;
