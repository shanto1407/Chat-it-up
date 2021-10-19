import React, { useReducer, useEffect } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import logo from "./img/logo.png";
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  TextField,
  Button,
} from "@material-ui/core";
//import Autocomplete from "@material-ui/lab/Autocomplete";
import theme from "./theme";
import "../App.css";
const AddAdvisory = (props) => {
  const initialState = {
    username: "",
    selectedCountry: "",
    alerts: [],
    countries: [],
    text: "",
    date: "",
    value: "",
    selectedValue: "",
  };
  // const GRAPHURL = "http://localhost:5000/graphql";
  const GRAPHURL = "/graphql";
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  useEffect(() => {
    fethcCountry();
  }, []);
  const fethcCountry = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    try {
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          query: "{ alerts {country,name,text,date,region,subregion}}",
        }),
      });
      let json = await response.json();
      let entries = json.data.alerts.length;
      setState({
        alerts: json.data.alerts,
        countries: json.data.alerts.map((n) => n.name),
      });
      props.dataFromAdvisory(entries + " countries loaded");
    } catch (error) {
      props.dataFromAdvisory(error.message);
    }
  };

  const handleNameInput = (e) => {
    setState({ username: e.target.value });
  };
  const onChange = (e, selectedOption) => {
    setState({ selectedCountry: selectedOption });
  };
  const onAddAdvisory = async () => {
    let adviosryObject = state.alerts.find(
      (country) => country.name === state.selectedCountry
    );

    let query = `mutation ($username: String, $country: String,$text: String, $date: String ) {
      addadvisory(username: $username, country: $country, text:$text,  date: $date){username,country,text,date}
      }`;
    var username = state.username;
    var country = state.selectedCountry;
    var text = adviosryObject.text;
    var date = Date().toLocaleString();
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    try {
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          query,
          variables: { username, country, text, date },
        }),
      });
      let json = await response.json();
      props.dataFromAdvisory("added advisory on " + json.data.addadvisory.date);
      setState({
        username: "",
        selectedValue: "",
      });
    } catch (error) {
      props.dataFromAdvisory(error.message);
    }
  };
  const emptyorundefined =
    state.username === undefined ||
    state.username === "" ||
    state.selectedCountry === undefined ||
    state.selectedCountry === "";
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
          Add Advisory
        </CardContent>
        <TextField
          onChange={handleNameInput}
          placeholder="Travelers Name"
          value={state.username}
        />
        <br />
        <br />
        <Autocomplete
          options={state.countries}
          getOptionLabel={(option) => option}
          style={{ width: 300 }}
          value={state.selectedValue}
          onChange={onChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="countires"
              variant="outlined"
              fullWidth
            />
          )}
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          style={{
            fontWeight: "bold",
            textAlign: "center",
            width: "100%",
          }}
          onClick={onAddAdvisory}
          disabled={emptyorundefined}
        >
          Add Advisory
        </Button>
      </Card>
    </MuiThemeProvider>
  );
};
export default AddAdvisory;
