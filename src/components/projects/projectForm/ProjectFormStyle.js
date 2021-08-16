import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  radius: {
    borderRadius: 10,
  },
  field: {
    marginTop: 20,
    marginBottom: 20,
    width: 500,
    display: "block",
  },
  divide: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 20,
  },
  closeIcon: {
    "&:hover": {
      color: "purple",
    },
    marginRight: 50,
    cursor: "pointer",
    marginTop: 20,
  },
  title: {
    marginLeft: 25,
  },
  save: {
    marginBottom: 25,
  },
});

export { useStyles };
