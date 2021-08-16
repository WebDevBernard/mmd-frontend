import {
  Grid,
  Box,
  makeStyles,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Link,
  CircularProgress,
  Grow,
  Paper,
  Dialog,
} from "@material-ui/core";
import axios from "axios";
import { AuthContext } from "context/AuthContext";
import React from "react";
import { useContext } from "react";
import { useRef } from "react";
import { GoogleLogin } from "react-google-login";
import { Avatar } from "@material-ui/core";

import Slide from "@material-ui/core/Slide";
const useStyles = makeStyles({
  dialog: {
    position: "absolute",
    // left: "125vh",
    top: "15vh",
    width: "40vh",
    height: "50vh",
    padding: "2em",
    display: "flex",
  },
  grid: { minHeight: "100%" },
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
function Login(props) {
  const { openPopup, closePopup, setOpenPopup } = props;
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const loginCall = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/login", userCredential);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  const responseGoogle = (response) => {
    response.profileObj?.email &&
      loginCall({ email: response.profileObj.email }, dispatch);
  };
  const classes = useStyles();
  return (
    <Dialog
      BackdropProps={{ style: { backgroundColor: "transparent" } }}
      PaperProps={{
        style: {
          backgroundColor: "rgba(64, 111, 127, 0.50)",
          borderRadius: "25px",
          border: "rgba(255, 255, 255, 0.25)",
          boxShadow: "none",
          backdropFilter: "blur(15px)",
        },
      }}
      classes={{
        paper: classes.dialog,
      }}
      TransitionComponent={Transition}
      keepMounted
      onClose={closePopup}
      open={openPopup}
    >
      <br /> <br />
      <Grid style={{ display: "flex", justifyContent: "center" }}>
        <Avatar style={{ backgroundColor: "red" }}></Avatar>
      </Grid>
      <br />
      <Typography
        variant="h6"
        style={{ display: "flex", justifyContent: "center", fontWeight: "700" }}
        color="secondary"
      >
        Log In
      </Typography>
      <br />
      <GoogleLogin
        render={(renderProps) => (
          <Button
            variant="contained"
            type="submit"
            color="secondary"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Sign in with Google
          </Button>
        )}
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="or Login with Google "
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />{" "}
      <br />{" "}
      <Typography
        style={{ display: "flex", justifyContent: "center", fontWeight: "700" }}
        color="secondary"
      >
        or
      </Typography>
      <br />
      <form onSubmit={submitHandler}>
        <TextField
          fullWidth
          variant="outlined"
          color="secondary"
          label="Email Address"
          // placeholder="Enter Email Address"
          required
          type="email"
          inputRef={email}
        />
        <br />
        <br />
        <TextField
          fullWidth
          variant="outlined"
          color="secondary"
          label="Password"
          type="password"
          required
          inputRef={password}
        />

        <div className="divide">
          {/* <Typography>Forgot password?</Typography> */}

          <FormControlLabel
            style={{ color: "#673ab7" }}
            control={<Checkbox name="checkedB" />}
            label="Remember me"
          />
        </div>
        <Button
          variant="contained"
          type="submit"
          color="secondary"
          fullWidth
          disabled={isFetching}
        >
          {isFetching ? (
            <CircularProgress color="primary" size="16px" />
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
      {/* <Typography align="center">
        Don't have an account? <Link>Sign up</Link>
      </Typography> */}
      <br></br>
    </Dialog>
  );
}

export default Login;
