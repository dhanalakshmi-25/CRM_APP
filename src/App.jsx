import { useState } from "react";
import { FC, useEffect } from "react";
import { ThemeProvider, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate, useRoutes } from "react-router-dom";
// import RTL from "./layouts/full/shared/customizer/RTL";
import Router, { getAuthorisedPaths } from "./routes/Router";
import { useSelector } from "react-redux";
import "./App.css";

function App() {
  const routing = useRoutes(Router);
  // const theme = ThemeSettings();
  const userInfo = useSelector((state) => state.authReducer.userInfo);
  const navigate = useNavigate();

  console.log("userInfo:", userInfo);

  useEffect(() => {
    if (!userInfo && getAuthorisedPaths().includes(window.location.pathname)) {
      navigate("/auth/login");
    }
  }, [userInfo, navigate]);

  return (
    <div>
      {/* // <ThemeProvider theme={theme}> */}
      {/* <RTL direction={customizer.activeDir}> */}
      <CssBaseline />
      {/* <ScrollToTop>{routing}</ScrollToTop> */}
      {routing}
      {/* <Typography>Hi</Typography> */}
      {/* </RTL> */}
      {/* Include IdleTimer to monitor inactivity */}
      {/* <IdleTimer /> */}
      {/* // </ThemeProvider> */}
    </div>
  );
}

export default App;
