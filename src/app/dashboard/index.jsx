import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import DashboardMetrics from "./metricsCount";
import CallTrendsChart from "./chart";
import Activities from "./activities";
import ConnectedCalls from "./connectedCalls";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSignOut = async () => {
    // Replace with actual sign-out logic
    console.log("Signing out...");
    await dispatch(logout());
    navigate("/auth/login");

    // For example: dispatch(logout()); navigate("/login");
  };

  return (
    <Container maxWidth="lg">
      <Box py={isMobile ? 2 : 4}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h4" fontWeight={700}>
            Dashboard
          </Typography>

          <Button variant="contained" color="secondary" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Box>

        <Box my={4}>
          <DashboardMetrics />
        </Box>

        <Box my={4}>
          <CallTrendsChart />
        </Box>

        <Box my={4}>
          <Activities />
        </Box>

        <Box my={4}>
          <ConnectedCalls />
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
