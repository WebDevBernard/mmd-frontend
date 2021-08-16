import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core";
import Layout from "./Layout";
import ProjectList from "../projects/projectList/ProjectList";
import ProjectView from "components/projectView/ProjectView";
import Dashboard from "components/dashboard/Dashboard";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat",
    fontSize: 13,
    fontWeightLight: 400,
    fontWeightRegular: 600,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
  palette: {
    primary: {
      light: "#406f7f",
      main: "#114B5F",
      dark: "#0b3442",
      contrastText: "#fff",
    },
    secondary: {
      light: "#8561c5",
      main: "#673ab7",
      dark: "#482880",
      contrastText: "#fff",
    },
  },
});

export default function Application() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Redirect to="/projects" />
            </Route>
            <Route exact path="/projects">
              <ProjectList />
            </Route>
            <Route exact path="/projects/:id">
              <ProjectList />
            </Route>
            <Route exact path="/projects/:id/tasks">
              <ProjectView />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}
