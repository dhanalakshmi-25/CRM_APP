import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { dispatch } from "../../../store";
// import { dispatch } from "../../../store/Store";
import { login } from "../../../store/app/auth";
// import { textFieldStyles, toggleVisibilityIconStyle } from "../textFieldStyle";

const AuthLogin = () => {
  const navigate = useNavigate();
  const { userInfo, error } = useSelector((state) => state.authReducer);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isSmallScreen = useMediaQuery("(max-width:400px)");
  const isSlightlyLargerScreen = useMediaQuery("(max-width:414px)");
  const isMediumScreen = useMediaQuery("(max-width:912px)");
  const isLargeScreen = useMediaQuery("(max-width:1200px)");

  // useEffect(() => {
  //   if (userInfo?.user && userInfo?.user?.role === "admin") {
  //     navigate("/dashboard");
  //   } else if (userInfo?.user && userInfo?.user?.role === "telecaller") {
  //     navigate("/telecaller");
  //   }
  // }, [navigate, userInfo]);

  const signIn = async () => {
    setLoading(true);
    const res = await dispatch(
      login({
        email: username,
        password: password,
      })
    );
    setLoading(false);

    console.log("Re:", res);
    // You should directly navigate based on the returned result
    if (res?.user && res.user.role === "admin") {
      navigate("/dashboard");
    } else if (res?.user && res.user.role === "telecaller") {
      navigate("/telecaller");
    } else {
      console.error("Invalid role or missing user info");
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      signIn();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const getPaddingRight = () => {
    if (isSmallScreen) return 2;
    if (isSlightlyLargerScreen) return 1;
    if (isMediumScreen) return 2;
    if (isLargeScreen) return 3;
    return 2.5; // Default for screens >1200px
  };

  const paddingRight = getPaddingRight();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      height="100%"
      minWidth={"100%"}
    >
      <Grid sx={{ width: "100%" }}>
        <Stack py={2} alignItems="center">
          <Box
            component="form"
            sx={{
              width: "100%",
              maxWidth: 500,
              mx: "auto",
              px: { xs: 2, sm: 4 },
              "& .MuiFormControl-root": {
                mb: 2,
              },
            }}
            noValidate
            autoComplete="off"
            onKeyDown={handleKeyDown}
          >
            <Box>
              <Typography sx={{ fontWeight: 600, mb: 1 }}>
                Email or Username
              </Typography>
              <TextField
                id="email"
                name="email"
                placeholder="me@gmail.com"
                value={username}
                fullWidth
                onChange={(e) => setUsername(e.target.value)}
              />
            </Box>

            <Box>
              <Typography sx={{ fontWeight: 600, mb: 1 }}>Password</Typography>
              <Box sx={{ position: "relative" }}>
                <TextField
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  fullWidth
                  onChange={(e) => setPassword(e.target.value)}
                />
                <IconButton
                  onClick={togglePasswordVisibility}
                  aria-label="toggle password visibility"
                  aria-pressed={showPassword}
                  edge="end"
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </Box>
            </Box>

            {error && (
              <Typography sx={{ color: "red", mt: 1 }}>{error}!</Typography>
            )}
          </Box>

          {/* <Stack justifyContent="end" direction="row" sx={{ width: "100%" }}>
            <Typography
              component={Link}
              to="/auth/forgot-password"
              fontWeight="500"
              sx={{
                textDecoration: "underline",
                fontFamily: "Montserrat",
                color: "#007AFF",
                fontSize: { xs: "12px", sm: "14px" },
                padding: "0 10px",
              }}
            >
              Forgot Password
            </Typography>
          </Stack> */}
        </Stack>

        <Box style={{ display: "flex", justifyContent: "center" }}>
          <Button
            className="button"
            type="submit"
            onClick={signIn}
            disabled={loading}
            sx={{
              fontFamily: "Montserrat",
              marginTop: 2,
              width: "140px",
              fontSize: "16px",
              color: "white",
              backgroundColor: loading ? "#cccccc" : "#6ca6cd",
              borderRadius: "10px",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </Box>

        {/* Sign-Up Link */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 2 }}>
          <Typography>Don't have an account?</Typography>
          <Typography
            component={Link}
            to="/auth/register"
            fontWeight="500"
            sx={{
              textDecoration: "underline",
              fontFamily: "Montserrat",
              color: "#007AFF",
              fontSize: { xs: "12px", sm: "14px" },
            }}
          >
            Sign Up
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AuthLogin;
