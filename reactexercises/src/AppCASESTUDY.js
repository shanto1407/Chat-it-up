import React, { useState, useReducer } from "react";
import { Route, Link, Redirect } from "react-router-dom";
import Reorder from "@material-ui/icons/Reorder";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import AlertComponenet from "./project1/alertcomponent";
import ProjectHomeComponent from "./project1/project1component";
import AddAdvisory from "./project1/addadvisory";
import ListAdvisories from "./project1/listAdvisories";
import {
  Toolbar,
  AppBar,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Snackbar,
} from "@material-ui/core";
const App = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const initialState = {
    snackbarMsg: "",
    gotData: false,
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  const snackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ gotData: false });
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const msgFromChild = (msg) => {
    setState({ snackbarMsg: msg, gotData: true });
  };
  return (
    <MuiThemeProvider theme={theme}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            INFO3139 - Project #1
          </Typography>
          <IconButton
            onClick={handleClick}
            color="inherit"
            style={{ marginLeft: "auto", paddingRight: "1vh" }}
          >
            <Reorder />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={Link} to="/home" onClick={handleClose}>
              Home
            </MenuItem>
            <MenuItem component={Link} to="/resetAlert" onClick={handleClose}>
              Reset Alert
            </MenuItem>
            <MenuItem component={Link} to="/addAdvisory" onClick={handleClose}>
              Add Advisory
            </MenuItem>
            <MenuItem component={Link} to="/listAdvisory" onClick={handleClose}>
              List Advisories
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <div>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route path="/home" component={ProjectHomeComponent} />
        <Route
          path="/resetAlert"
          render={() => <AlertComponenet dataFromAlert={msgFromChild} />}
        />
        <Route
          path="/addAdvisory"
          render={() => <AddAdvisory dataFromAdvisory={msgFromChild} />}
        />
        <Route
          path="/listAdvisory"
          render={() => <ListAdvisories dataFromListAdvisory={msgFromChild} />}
        />
      </div>
      <div>
        <Snackbar
          open={state.gotData}
          message={state.snackbarMsg}
          autoHideDuration={4000}
          onClose={snackbarClose}
        />
      </div>
    </MuiThemeProvider>
  );
};
export default App;
