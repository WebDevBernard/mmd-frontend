import React from "react";
import ReactDOM from "react-dom";
import Application from "./components/application/Application";
import { AuthContextProvider } from "context/AuthContext";
import axios from "axios";

if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}

ReactDOM.render(
  <AuthContextProvider>
    <Application />
  </AuthContextProvider>,
  document.getElementById("root")
);
