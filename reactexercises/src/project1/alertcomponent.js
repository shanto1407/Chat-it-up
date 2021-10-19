import React, { useReducer, useEffect } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import logo from "./img/logo.png";
import { Card, CardHeader, CardContent, CardMedia } from "@material-ui/core";
//import Autocomplete from "@material-ui/lab/Autocomplete";
import theme from "./theme";
import "../App.css";
const AlertComponenet = (props) => {
  const initialState = {
    responseMsg: [],
  };
  // const GRAPHURL = "http://localhost:5000/graphql";
  const GRAPHURL = "/graphql";
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  useEffect(() => {
    loadReponse();
  }, []);
  const loadReponse = async () => {
    props.dataFromAlert("running setup ...");
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    try {
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({ query: "{ setupAlerts {results} }" }),
      });
      let json = await response.json();
      setState({
        responseMsg: json.data.setupAlerts.results
          .replace(/([.])\s*(?=[A-Z])/g, "$1|")
          .split("|"),
      });
      props.dataFromAlert("Alerts collection setup completed!");
    } catch (error) {
      props.dataFromAlert(error.message);
    }
  };

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
        <CardContent
          color="secondary"
          style={{ textAlign: "center", fontFamily: "sans-serif" }}
        >
          Alert Setup - Details
        </CardContent>
        <Table size="small" aria-label="a dense table">
          <TableBody>
            {state.responseMsg.map((row) => (
              <TableRow key={row}>
                <TableCell align="center">{row}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </MuiThemeProvider>
  );
};
export default AlertComponenet;
