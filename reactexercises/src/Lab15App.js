import React, { useState } from "react";
import { Route, Link, Redirect } from "react-router-dom";
import Reorder from "@material-ui/icons/Reorder";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import Lab13HomeComponent from "./week7/class2/Lab13HomeComponent";
//import socket from "./week10/socketclient";
import lab15 from "./week10/lab15client";
import AllRooms from "./week10/allrooms";
import TrafficLight from "./week11/trafficlight";
import Street from "./week11/street";
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
            INFO3139 - Labs
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
            <MenuItem component={Link} to="/lab15" onClick={handleClose}>
              LAB15
            </MenuItem>
            <MenuItem component={Link} to="/allRooms" onClick={handleClose}>
              All Rooms
            </MenuItem>
            <MenuItem component={Link} to="/trafficlight" onClick={handleClose}>
              LAB 16
            </MenuItem>
            <MenuItem component={Link} to="/street" onClick={handleClose}>
              LAB 16 street
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <div>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route path="/home" component={Lab13HomeComponent} />
        <Route path="/lab15" component={lab15} />
        <Route path="/allRooms" component={AllRooms} />
        <Route path="/trafficlight" component={TrafficLight} />
        <Route path="/street" component={Street} />
      </div>
    </MuiThemeProvider>
  );
};
export default App;
