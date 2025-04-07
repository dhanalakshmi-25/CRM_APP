import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  //   Theme,
  Typography,
  useMediaQuery,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../../store/app/auth";
import { useDispatch } from "../../../store";
// import { textFieldStyles, toggleVisibilityIconStyle } from "../textFieldStyle";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [userType, setUserType] = useState("");

  //   const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
  };

  const validateEmail = (email) => {
    // Regular expression to validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const confirmPasswordHandler = async (value) => {
    setConfirmPassword(value);
    if (value && password) {
      if (value !== password) {
        setPasswordError("Password and confirm password do not match");
      } else {
        setPasswordError("");
      }
    } else {
      setPasswordError("");
    }
  };

  const handleSignUP = async () => {
    const payload = {
      name: name,
      email: email,
      //   student_mobile_number: mobile,
      //   username: username,
      password: password,
      //   email: email,
      role: userType,
    };

    // const isEmailExit = await dispatch(emailValidation(email));
    if (
      name !== "" &&
      email !== "" &&
      //   mobile !== "" &&
      //   username !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      userType !== ""
    ) {
      if (password !== confirmPassword) {
        setError("Please Match the password and confirm password");
      } else if (
        !validateEmail(email)
        // ||
        // (Array.isArray(isEmailExit) && isEmailExit?.length > 0)
      ) {
        setError(
          "Check email is invaild or email already existing in the user"
        );
      } else {
        dispatch(register(payload));
        // dispatch(signUp(payload));
        navigate("/auth/login");
      }
    } else {
      setError("Please enter the required fields");
    }
  };

  return (
    <>
      <Grid item xs={12}>
        <Stack py={2} alignItems="center">
          {/* @ts-ignore */}
          <Box
            component="form"
            // onSubmit={handleSubmit}
            sx={{
              "& > :not(style)": {
                m: 1,
                // m: isMobile ? 1 : 1.5,
                pl: 2,
                pr: 2,
                width: { xs: "100%", sm: "50ch" },
              },
            }}
            autoComplete="off"
            gap={20}
          >
            <Box display="flex" justifyContent="center">
              <Typography variant="h5" sx={{ fontWeight: "650" }}>
                Sign Up
              </Typography>
            </Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  justifyItems: "center",
                  gap: 0.5,
                }}
              >
                <Typography sx={{ fontWeight: "600" }}>Name</Typography>
                <Typography color="error">*</Typography>
              </Box>{" "}
              <TextField
                id="Name"
                name="Name"
                placeholder="Enter full name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                required
                // sx={textFieldStyles}
                // slotProps={{
                //   input: {
                //     endAdornment: (
                //       <InputAdornment position="end">
                //         <Typography color="error">*</Typography>
                //       </InputAdornment>
                //     ),
                //   },
                // }}
              />
            </Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  justifyItems: "center",
                  gap: 0.5,
                }}
              >
                <Typography sx={{ fontWeight: "600" }}>
                  Username (Email)
                </Typography>
                <Typography color="error">*</Typography>
              </Box>
              <TextField
                id="username"
                name="username"
                placeholder="Choose a unique username"
                value={username}
                // sx={textFieldStyles}
                onChange={(event) => {
                  setUsername(event.target.value);
                  setEmail(event.target.value);
                }}
                required
                // slotProps={{
                //   input: {
                //     endAdornment: (
                //       <InputAdornment position="end">
                //         <Typography color="error">*</Typography>
                //       </InputAdornment>
                //     ),
                //   },
                // }}
              />
            </Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  justifyItems: "center",
                  gap: 0.5,
                }}
              >
                <Typography sx={{ fontWeight: "600" }}>Password</Typography>
                <Typography color="error">*</Typography>
              </Box>{" "}
              <Box sx={{ position: "relative" }}>
                <TextField
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a unique password"
                  value={password}
                  //   sx={textFieldStyles}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  required
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={togglePasswordVisibility}
                            edge="end"
                            // sx={{
                            //   ...toggleVisibilityIconStyle,
                            //   mr: "6px",
                            // }}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                          {/* <Typography color="error">*</Typography> */}
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Box>
            </Box>
            <Box>
            <Box sx={{display:'flex' ,justifyContent:'center' ,justifyItems:'center' ,gap:0.5
             }}>
             <Typography sx={{ fontWeight: "600" }}>
                Confirm Password
              </Typography>
              <Typography color="error">*</Typography>
             </Box>
              <Box sx={{ position: "relative" }}>
                <TextField
                  id="Confirm Password"
                  name="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  //   sx={textFieldStyles}
                  onChange={(event) =>
                    confirmPasswordHandler(event.target.value)
                  }
                  required
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={toggleConfirmPasswordVisibility}
                            edge="end"
                            // sx={{
                            //   ...toggleVisibilityIconStyle,
                            //   mr: "6px",
                            // }}
                          >
                            {showConfirmPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                          {/* <Typography color="error">*</Typography> */}
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Box>
            </Box>
            <Box>
              {passwordError && (
                <Typography sx={{ fontFamily: "Montserrat" }} color="red">
                  {passwordError} !
                </Typography>
              )}
            </Box>
    
        

            <Box>
            <Box sx={{display:'flex' ,justifyContent:'center' ,justifyItems:'center' ,gap:0.5
             }}>
             <Typography sx={{ fontWeight: "600" }}>
                User Role
              </Typography>
              <Typography color="error">*</Typography>
             </Box>
              <FormControl fullWidth required>
                <InputLabel id="user-type-label">Select Type</InputLabel>
                <Select
                  labelId="user-type-label"
                  id="user-type"
                  value={userType}
                  label="Select Type"
                  onChange={(event) => setUserType(event.target.value)}
                >
                  <MenuItem value="telecaller">Telecaller</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box>
              {error && (
                <Typography sx={{ fontFamily: "Montserrat" }} color="red">
                  {error} !
                </Typography>
              )}
            </Box>
            <Button
              className="button"
              type="submit"
              onClick={handleSignUP}
              sx={{
                // padding: '10px 20px',
                fontFamily: "Montserrat",
                marginTop: 2,
                width: "140px",
                fontSize: "16px",
                color: "white", // Set text color to white
                backgroundColor: "#6ca6cd", // Set background color
                border: "none", // Optional: Remove border if needed
                borderRadius: "10px", // Optional: Add some rounding
                cursor: "pointer", // Optional: Add pointer cursor on hover
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Stack>
      </Grid>
    </>
  );
};

export default SignUpForm;
