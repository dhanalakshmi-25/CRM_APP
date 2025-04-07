import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AccessTime, Call, PersonAdd } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { recentActivities } from "../../store/app/dashboard";

const formatDateTime = (datetime) =>
  new Date(datetime).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

const Activities = () => {
  const dispatch = useDispatch();
  const { activities } = useSelector((state) => state.dashboardReducer);
  const { recentCalls = [], recentLeads = [] } = activities || {};
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    dispatch(recentActivities());
  }, [dispatch]);

  return (
    <Box p={isMobile ? 2 : 4}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        📝 Recent Activities
      </Typography>

      {/* ===== Recent Calls ===== */}
      <Typography
        variant="h6"
        color="primary"
        mb={2}
        display="flex"
        alignItems="center"
        gap={1}
      >
        <Call /> Recent Calls
      </Typography>

      <Grid container spacing={3} alignItems="stretch">
        {recentCalls.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No recent calls.
          </Typography>
        ) : (
          recentCalls.map((call, i) => (
            <Grid item xs={12} sm={6} md={4} key={i} sx={{ display: "flex" }}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "transform 0.2s",
                  height: "100%",
                  width: "100%",
                  "&:hover": { transform: "scale(1.02)" },
                }}
              >
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={600}>
                    📞 {call.name}
                  </Typography>
                  <Stack spacing={0.5} mt={1}>
                    <Typography variant="body2" color="text.secondary">
                      Telecaller: <b>{call.telecallerName}</b>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Status: <b>{call.status}</b> ({call.response})
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="flex"
                      alignItems="center"
                      gap={0.5}
                    >
                      <AccessTime fontSize="inherit" />
                      {formatDateTime(call.updatedAt)}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* ===== Recent Leads ===== */}
      <Typography
        variant="h6"
        color="secondary"
        mt={5}
        mb={2}
        display="flex"
        alignItems="center"
        gap={1}
      >
        <PersonAdd /> Recent Leads Added
      </Typography>

      <Grid container spacing={3} alignItems="stretch">
        {recentLeads.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No recent leads added.
          </Typography>
        ) : (
          recentLeads.map((lead, i) => (
            <Grid item xs={12} sm={6} md={4} key={i} sx={{ display: "flex" }}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "transform 0.2s",
                  height: "100%",
                  width: "100%",
                  "&:hover": { transform: "scale(1.02)" },
                }}
              >
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={600}>
                    👤 {lead.name}
                  </Typography>
                  <Stack spacing={0.5} mt={1}>
                    <Typography variant="body2" color="text.secondary">
                      📧 {lead.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      📞 {lead.phone}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="flex"
                      alignItems="center"
                      gap={0.5}
                    >
                      <AccessTime fontSize="inherit" />
                      {formatDateTime(lead.addedAt)}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default Activities;
