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
import { AccessTime, Call } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { connectedCalls } from "../../store/app/dashboard";

const formatDateTime = (datetime) =>
  new Date(datetime).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

const ConnectedCalls = () => {
  const dispatch = useDispatch();
  const { calldetails } = useSelector((state) => state.dashboardReducer);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    dispatch(connectedCalls());
  }, [dispatch]);

  return (
    <Box p={isMobile ? 2 : 4}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        📞 Connected Calls
      </Typography>

      <Grid container spacing={3} alignItems="stretch">
        {calldetails && calldetails.length > 0 ? (
          calldetails.map((call, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: "flex" }}>
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
                    👤 {call.customerName}
                  </Typography>

                  <Stack spacing={0.5} mt={1}>
                    <Typography variant="body2" color="text.secondary">
                      🧑 Telecaller: <b>{call.telecallerName}</b>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      🗣️ Response: <b>{call.callResponse}</b>
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="flex"
                      alignItems="center"
                      gap={0.5}
                    >
                      <AccessTime fontSize="inherit" />
                      {formatDateTime(call.callDateTime)}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              No connected calls found.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ConnectedCalls;
