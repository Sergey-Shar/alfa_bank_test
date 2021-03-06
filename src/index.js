import React from "react";
import ReactDOM from "react-dom";
import Navigation from "./navigation";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducer";
import { ThemeProvider, createTheme } from "@mui/material";
import "./index.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(234,33,25)",
    },
    secondary: {
      main: "rgb(149,149,149)",
    },
  },
});

const store = createStore(reducer);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Navigation />
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);
