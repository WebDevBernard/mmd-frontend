import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    color: "secondary",
    "& > * + *": {
      marginTop: theme.spacing(3)
    }
  },
  members: {
    display: "flex",
    alignItems: "center"
  },
  avatar: {
    width: 30,
    height: 30,
    marginRight: 20
  }
}));

export { useStyles };