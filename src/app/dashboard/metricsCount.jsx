import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardMetrics } from "../../store/app/dashboard";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const DashboardMetrics = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { metrics, loading, error } = useSelector(
    (state) => state.dashboardReducer
  );

  useEffect(() => {
    dispatch(fetchDashboardMetrics());
  }, [dispatch]);

  if (loading || !metrics) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={200}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center">
        Failed to load metrics.
      </Typography>
    );
  }

  const { totalTelecallers, totalCallsMade, totalConnectedCalls } = metrics;

  const metricsData = [
    { label: "Total Telecallers", value: totalTelecallers },
    { label: "Total Calls Made", value: totalCallsMade },
    { label: "Total Customers Contacted", value: totalConnectedCalls },
  ];

  return (
    <Box px={isMobile ? 2 : 4} py={4}>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
      >
        {metricsData.map((item, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                height: "100%",
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  gutterBottom
                  align="center"
                >
                  {item.label}
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  align="center"
                  color="primary"
                >
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardMetrics;
