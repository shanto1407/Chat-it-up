import React, { useState } from "react";
import { Route, Link, Redirect } from "react-router-dom";
import Reorder from "@material-ui/icons/Reorder";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import Lab13Component from "./week7/class2/Lab13Component";
import Lab13HomeComponent from "./week7/class2/Lab13HomeComponent";
import AddUserComponentComponent from "./week8/class1/materialuiex6";
import MaterialUIEx7aComponent from "./week8/class1/materialuiex7a";
import {
  Toolbar,
  AppBar,
  Menu,
  MenuItem,
  IconButton,
  Typography,
} from "@material-ui/core";
const App = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <MuiThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            INFO3139 - Lab 13
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
            <MenuItem component={Link} to="/ex3" onClick={handleClose}>
              Search Users
            </MenuItem>
            <MenuItem component={Link} to="/addUser" onClick={handleClose}>
              Add Users
            </MenuItem>
            <MenuItem component={Link} to="/me7a" onClick={handleClose}>
              me7a
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <div>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route path="/ex3" render={() => <Lab13Component />} />
        <Route path="/home" component={Lab13HomeComponent} />
        <Route path="/addUser" component={AddUserComponentComponent} />
        <Route path="/me7a" component={MaterialUIEx7aComponent} />
      </div>
    </MuiThemeProvider>
  );
};
export default App;
