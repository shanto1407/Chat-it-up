import React, { useReducer, useEffect } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import logo from "./img/logo.png";
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  TextField,
} from "@material-ui/core";
import theme from "./theme";
import "../App.css";
const ListAdvisories = (props) => {
  const initialState = {
    advisories: [],
    advisoriesName: [],
    radioSelectedOption: "traveller",
    autoComSelectedOption: "",
    countryInfo: [],
    selectedValue: "",
  };
  // const GRAPHURL = "http://localhost:5000/graphql";
  const GRAPHURL = "/graphql";
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  const onValueChange = (event) => {
    setState({ radioSelectedOption: event.target.value });
    setState({ selectedValue: "", countryInfo: [] });
    fetchTable();
  };
  useEffect(() => {
    fetchTable();
  }, []);
  const fetchTable = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    try {
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          query: "{advisories{username, country, text, date}}",
        }),
      });
      let json = await response.json();
      let entries = json.data.advisories.length;
      let holding = json.data.advisories.map((n) => n.username);
      let final = [...new Set(holding)];
      setState({
        advisories: json.data.advisories,
        advisoriesName: final,
        radioSelectedOption: "traveller",
      });
      props.dataFromListAdvisory("found " + entries + " traveller entries");
    } catch (err) {
      props.dataFromListAdvisory(err.message);
    }
  };

  const onValueChangeRegions = async (event) => {
    setState({ selectedValue: "", countryInfo: [] });
    setState({ radioSelectedOption: event.target.value });
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    try {
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          query: "{regions}",
        }),
      });
      let json = await response.json();
      let entries = json.data.regions.length;
      setState({
        advisories: json.data.regions,
        advisoriesName: json.data.regions,
      });
      props.dataFromListAdvisory("found " + entries + " regions");
    } catch (err) {
      props.dataFromListAdvisory(err.message);
    }
  };
  const onValueChangeSubRegions = async (event) => {
    setState({ selectedValue: "", countryInfo: [] });
    setState({ radioSelectedOption: event.target.value });
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    try {
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          query: "{subregions}",
        }),
      });
      let json = await response.json();
      let entries = json.data.subregions.length;
      setState({
        advisories: json.data.subregions,
        advisoriesName: json.data.subregions,
      });
      props.dataFromListAdvisory("found " + entries + " subregions");
    } catch (err) {
      props.dataFromListAdvisory(err.message);
    }
  };
  const onChangeAuto = async (e, selectedOption) => {
    setState({ autoComSelectedOption: selectedOption, countryInfo: [] });
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    if (state.radioSelectedOption === "traveller") {
      let query = `query($username: String){alertsForTravellers(username:$username){username,country,text,date}}`;
      let username = selectedOption;
      try {
        let response = await fetch(GRAPHURL, {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify({
            query,
            variables: { username },
          }),
        });
        let json = await response.json();
        let foundAlertCount = json.data.alertsForTravellers.length;
        let countryinfos = json.data.alertsForTravellers;
        setState({
          countryInfo: countryinfos.map((c) => {
            return {
              countryname: c.country,
              countrytext: c.text,
              countryDate: c.date,
            };
          }),
        });
        props.dataFromListAdvisory(
          "Found " + foundAlertCount + " alerts for " + username
        );
      } catch (error) {
        props.dataFromListAdvisory(error.message);
      }
    } else if (state.radioSelectedOption === "region") {
      let query = `query($region: String){alertsFromRegion(region:$region){country,name,text,date,region,subregion}}`;
      let region = selectedOption;
      try {
        let response = await fetch(GRAPHURL, {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify({
            query,
            variables: { region },
          }),
        });
        let json = await response.json();
        let foundAlertCount = json.data.alertsFromRegion.length;
        let countryinfos = json.data.alertsFromRegion;
        setState({
          countryInfo: countryinfos.map((c) => {
            return {
              countryname: c.name,
              countrytext: c.text,
              countryDate: c.date,
            };
          }),
        });
        props.dataFromListAdvisory(
          "Found " + foundAlertCount + " alerts for " + region
        );
      } catch (error) {
        props.dataFromListAdvisory(error.message);
      }
    } else if (state.radioSelectedOption === "subregion") {
      let query = `query($subregion: String){alertsFromSubRegion(subregion:$subregion){country,name,text,date,region,subregion}}`;
      let subregion = selectedOption;
      try {
        let response = await fetch(GRAPHURL, {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify({
            query,
            variables: { subregion },
          }),
        });
        let json = await response.json();
        let foundAlertCount = json.data.alertsFromSubRegion.length;
        let countryinfos = json.data.alertsFromSubRegion;
        setState({
          countryInfo: countryinfos.map((c) => {
            return {
              countryname: c.name,
              countrytext: c.text,
              countryDate: c.date,
            };
          }),
        });
        props.dataFromListAdvisory(
          "Found " + foundAlertCount + " alerts for " + subregion
        );
      } catch (error) {
        props.dataFromListAdvisory(error.message);
      }
    }
  };
  return (
    <MuiThemeProvider theme={theme}>
      <Card color="primary" style={{ marginTop: "2%", marginLeft: "2%" }}>
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
          style={{
            textAlign: "center",
            fontFamily: "sans-serif",
            color: "green",
          }}
        >
          List Advisory By
        </CardContent>
        <div
          color="primary"
          style={{ textAlign: "center", fontFamily: "sans-serif" }}
        >
          <label>
            <input
              type="checkbox"
              value="traveller"
              checked={state.radioSelectedOption === "traveller"}
              onChange={onValueChange}
            />
            Traveller
          </label>
          <label>
            <input
              type="checkbox"
              value="region"
              checked={state.radioSelectedOption === "region"}
              onChange={onValueChangeRegions}
            />
            Region
          </label>
          <label>
            <input
              type="checkbox"
              value="subregion"
              checked={state.radioSelectedOption === "subregion"}
              onChange={onValueChangeSubRegions}
            />
            Sub-Region
          </label>
        </div>
        <br />
        <Autocomplete
          options={state.advisoriesName}
          getOptionLabel={(option) => option}
          style={{ width: "100%" }}
          value={state.selectedValue}
          onChange={onChangeAuto}
          renderInput={(params) => (
            <TextField
              {...params}
              label={state.radioSelectedOption}
              variant="outlined"
              fullWidth
            />
          )}
        />
        <br />
        {state.countryInfo.length > 0 && (
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Country</TableCell>
                <TableCell align="center">Alert Information</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.countryInfo.map((row) => (
                <TableRow key={row.countryname}>
                  <TableCell align="center">{row.countryname}</TableCell>
                  <TableCell align="center">
                    <div style={{ fontSize: "30" }}> {row.countrytext}</div>
                    <div>{row.countryDate}</div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </MuiThemeProvider>
  );
};
export default ListAdvisories;
