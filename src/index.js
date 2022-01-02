import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Navigation from "./navigation";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducer";
import { ThemeProvider, createTheme } from "@mui/material";

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
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
