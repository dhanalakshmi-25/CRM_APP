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
import "../login/index.css";
import SignUpForm from "./singUpForm";

const SignUP = () => {
  // const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  return (
    // <PageContainer title="SignUp" description="this is SignUp page">
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
            // paddingTop: isMobile ? "" : 60,
          }}
        >
          <Card
            elevation={9}
            sx={{
              p: 3,
              zIndex: 1,
              maxWidth: "1000px",
              width: { xs: "90%", md: "500px" },
              borderRadius: "20px",
              mt: { xs: -2, md: 0 },
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
              mb={-2}
              mt={-1}
            >
              {/* <img
                src={Logo}
                alt="img"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              /> */}
            </Box>
            <SignUpForm />
          </Card>
        </div>
      </Grid>
    </Box>
    // </PageContainer>
  );
};

export default SignUP;
