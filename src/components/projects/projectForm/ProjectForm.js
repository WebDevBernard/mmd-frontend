import React from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Grid,
  Typography,
} from "@material-ui/core";

import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import CloseIcon from "@material-ui/icons/Close";
import DatePickers from "../datePicker/DatePicker";
import UserSelector from "../userSelector/UserSelector";
import { useStyles } from "./ProjectFormStyle";
import useProjectData from "hooks/useProjectData";

export default function ProjectForm({
  handleDateChange,
  selectedDate,
  handleClose,
  handleSubmit,
  open,
  titleError,
  descriptionError,
  description,
  setdescription,
  title,
  setTitle,
  status,
  setStatus,
  getUserIds,
  userId,
}) {
  const { state } = useProjectData();
  const classes = useStyles();
  const param = useParams();

  return (
    <div>
      <Dialog
        classes={{
          paper: classes.radius,
        }}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Grid container className={classes.divide}>
          <Grid item>
            <DialogTitle
              style={{ color: "#673ab7" }}
              className={classes.title}
              id="customized-dialog-title"
              color="textSecondary"
              onClose={handleClose}
            >
              {param.id ? "Edit" : "Create a New"} Project
            </DialogTitle>
          </Grid>
          <Grid item>
            <CloseIcon
              onClick={handleClose}
              className={classes.closeIcon}
            ></CloseIcon>
          </Grid>
        </Grid>
        <DialogContent dividers>
          <Container size="sm">
            <form
              noValidate
              autoComplete="off"
              onSubmit={(e) => handleSubmit(e, param)}
            >
              <TextField
                className={classes.field}
                inputProps={{ maxLength: 50 }}
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                label={
                  param.id
                    ? "Change Project Title (50 character limit)"
                    : "Enter a New Project Title (50 character limit)"
                }
                variant="outlined"
                color="secondary"
                fullWidth
                required
                error={titleError}
              />
              <TextField
                className={classes.field}
                onChange={(e) => setdescription(e.target.value)}
                value={description}
                inputProps={{ maxLength: 500 }}
                label="Enter a Description (500 character limit)"
                variant="outlined"
                color="secondary"
                multiline
                rows={4}
                fullWidth
                required
                error={descriptionError}
                s
              />

              <UserSelector
                color="secondary"
                users={state.users}
                getUserIds={getUserIds}
                userId={userId}
              />

              <div className={classes.divide}>
                <FormControl className={classes.field}>
                  <FormLabel color="secondary">Project Status</FormLabel>
                  <RadioGroup
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <FormControlLabel
                      value="In progress"
                      control={<Radio />}
                      label="In progress"
                    />
                    <FormControlLabel
                      value="Completed"
                      control={<Radio />}
                      label="Completed"
                    />
                    <FormControlLabel
                      value="On hold"
                      control={<Radio />}
                      label="On hold"
                    />
                    <FormControlLabel
                      value="Cancelled"
                      control={<Radio />}
                      label="Cancelled"
                    />
                  </RadioGroup>
                </FormControl>

                <DatePickers
                  color="secondary"
                  selectedDate={selectedDate}
                  handleDateChange={handleDateChange}
                />
              </div>
              <Grid group className={classes.divide}>
                <Grid />
                <Grid>
                  <Button
                    className={classes.save}
                    type="submit"
                    color="secondary"
                    variant="contained"
                    endIcon={<KeyboardArrowRightIcon />}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
}
