import React, { useState } from "react";
import { Route, Link, Redirect } from "react-router-dom";
import Reorder from "@material-ui/icons/Reorder";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import Lab13HomeComponent from "./week7/class2/Lab13HomeComponent";
import senario1 from "./project2/scenario1test";
import senario2 from "./project2/scenario1and2test";
import senario3 from "./project2/scenario123test";
import senario4 from "./project2/scenario1234test";
import senarioEn from "./project2/scenariosenhanced";
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
            <MenuItem component={Link} to="/senario1" onClick={handleClose}>
              LAB 18 S1
            </MenuItem>
            <MenuItem component={Link} to="/senario2" onClick={handleClose}>
              LAB 18 S2
            </MenuItem>
            <MenuItem component={Link} to="/senario3" onClick={handleClose}>
              LAB 19 S3
            </MenuItem>
            <MenuItem component={Link} to="/senario4" onClick={handleClose}>
              LAB 19 S4
            </MenuItem>
            <MenuItem component={Link} to="/senarioEn" onClick={handleClose}>
              LAB 19 En
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <div>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route path="/home" component={Lab13HomeComponent} />
        <Route path="/senario1" component={senario1} />
        <Route path="/senario2" component={senario2} />
        <Route path="/senario3" component={senario3} />
        <Route path="/senario4" component={senario4} />
        <Route path="/senarioEn" component={senarioEn} />
      </div>
    </MuiThemeProvider>
  );
};
export default App;
