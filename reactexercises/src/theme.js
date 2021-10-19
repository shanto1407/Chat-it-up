import { createMuiTheme } from "@material-ui/core/styles";
export default createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    common: {
      black: "#000",
      white: "#fff",
    },
    background: {
      paper: "#fff",
      default: "#fafafa",
    },
    primary: {
      light: "rgba(241, 129, 100, 1)",
      main: "rgba(229, 103, 62, 1)",
      dark: "rgba(246, 93, 10, 1)",
      contrastText: "#fff",
    },
    secondary: {
      light: "rgba(211, 108, 87, 1)",
      main: "rgba(214, 69, 69, 1)",
      dark: "rgba(207, 3, 3, 1)",
      contrastText: "#fff",
    },
    error: {
      light: "rgba(252, 77, 77, 1)",
      main: "rgba(255, 0, 0, 1)",
      dark: "rgba(170, 0, 0, 1)",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
  },
});
