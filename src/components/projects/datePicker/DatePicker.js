import React from "react";
import TextField from "@material-ui/core/TextField";
import { useStyles } from "./DatePickerStyle";

export default function DatePickers({ selectedDate, handleDateChange }) {
  const classes = useStyles();

  return (
    <div className={classes.container} noValidate>
      <TextField
        id="date"
        color="secondary"
        label="Due Date"
        type="date"
        value={selectedDate}
        onChange={(e) => handleDateChange(e.target.value)}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  );
}
