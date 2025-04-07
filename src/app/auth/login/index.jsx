import {
  Box,
  Card,
  Grid,
  // Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
// import Logo from "../../../assets/images/Login/Aram_Logo_fb12a707d4 1.png";
// import PageContainer from "../../../widgets/container/PageContainer";
import AuthLogin from "./AuthLogin";
import "./index.css";

const Login = () => {
  // const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  return (
    // <PageContainer title="Login" description="this is Login page">
    <Box className="container" sx={{ borderRadius: "0", height: "100vh" }}>
      <Grid container spacing={0} justifyContent="center">
        <div
          style={{
            display: "flex",
            // flexDirection: isMobile ? "column" : "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            // paddingTop: isMobile ? "" : 150,
          }}
        >
         

          {/* Card */}
          <Card
            elevation={12}
            sx={{
              p: 2,
              zIndex: 1,
              width: { xs: "90%", sm: "50%", md: "380px" }, // Adjust width for different screen sizes
              // ml: { xs: 2, md: 3 },
              // mr: { xs: 2, md: 3 },
              borderRadius: "20px",
              mt: { xs: -3, md: 0 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              flexDirection="column"
              justifyContent="center"
            >
              {/* <Box mb={2}>
                <img
                  // src={Logo}
                  alt="img"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </Box> */}
              <Typography
                variant="body1"
                color="black"
                textAlign="center"
                sx={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  fontFamily: "Montserrat",
                }}
              >
                Sign In
              </Typography>
            </Box>
            <AuthLogin />
          </Card>
        </div>
      </Grid>
    </Box>
    // </PageContainer>
  );
};

export default Login;
