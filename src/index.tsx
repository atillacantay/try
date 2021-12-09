import { CssBaseline } from "@mui/material";
import "firebase";
import CustomThemeProvider from "providers/CustomThemeProvider";
import React from "react";
import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter as Router } from "react-router-dom";
import i18n from "./i18n";
import "./index.css";
import App from "./pages/App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <CustomThemeProvider>
        <Router>
          <CssBaseline />
          <App />
        </Router>
      </CustomThemeProvider>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
