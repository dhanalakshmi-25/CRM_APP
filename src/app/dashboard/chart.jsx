import React, { useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { callTrendDetails } from "../../store/app/dashboard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const CallTrendsChart = () => {
  const dispatch = useDispatch();
  const { callTrends } = useSelector((state) => state.dashboardReducer);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    dispatch(callTrendDetails());
  }, [dispatch]);

  const xLabels = callTrends?.map((entry) => entry.date);
  const callCounts = callTrends?.map((entry) => entry.calls);

  return (
    <Box p={isMobile ? 2 : 4}>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 3,
          transition: "transform 0.2s",
          "&:hover": { transform: "scale(1.01)" },
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            fontWeight={600}
            mb={2}
            display="flex"
            alignItems="center"
            gap={1}
            color="primary"
          >
            <TrendingUpIcon /> Call Trends Over the Past Week
          </Typography>

          {callTrends?.length > 0 ? (
            <BarChart
              xAxis={[{ data: xLabels, scaleType: "band" }]}
              series={[{ data: callCounts, label: "Calls" }]}
              height={300}
              margin={{ top: 20, bottom: 40, left: 50, right: 10 }}
            />
          ) : (
            <Typography variant="body2" color="text.secondary">
              No call trend data available.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default CallTrendsChart;
