import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import logo from "./img/logo.png";
import { Card, CardHeader, CardContent, CardMedia } from "@material-ui/core";
//import Autocomplete from "@material-ui/lab/Autocomplete";
import theme from "./theme";
import "../App.css";
const Project1ComponenetFunction = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Card color="primary" style={{ marginTop: "2%" }}>
        <CardMedia
          component="img"
          alt="Global Travel Logo"
          height="100%"
          image={logo}
          title="Global Travel Logo"
        />
        <CardHeader
          color="secondary"
          title="World Wide Travel Alerts"
          style={{ textAlign: "center" }}
        />
        <CardContent style={{ textAlign: "end" }}>@INFO3139- 2021</CardContent>
      </Card>
    </MuiThemeProvider>
  );
};
export default Project1ComponenetFunction;
