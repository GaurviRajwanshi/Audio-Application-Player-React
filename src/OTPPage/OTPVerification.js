import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Link,
  CircularProgress,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Alert from "@mui/material/Alert";
import axios from "axios";
import Stack from "@mui/material/Stack";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useNavigate } from "react-router-dom";

const OTPVerification = () => {
  const navigate = useNavigate();
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
  const [resendClicked, setResendClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const handleResendClick = () => {
    setResendClicked(true);
    setTimeout(() => {
      setResendClicked(false);
    }, 4000);
  };

  const url = "https://dev.api.goongoonalo.com/v1/auth/verify_otp";

  useEffect(() => {
    if (!localStorage.getItem("requestId")) {
      navigate("/", { replace: true });
    }
  }, []);

  const submitButton = () => {
    let jsonFormat = JSON.stringify({
      phoneNumber: localStorage.getItem("phoneNumber"),
      requestId: localStorage.getItem("requestId"),
      otp: otp,
    });
    jsonFormat = JSON.parse(jsonFormat);

    setLoading(true);
    axios
      .post(url, jsonFormat)
      .then((response) => {
        setLoading(false);
        setIsPasswordCorrect(false);
        console.log("Response:", jsonFormat);
        console.log(response);
        console.log(response.data.requestId);
        window.location.replace("/dashboard");
      })
      .catch((error) => {
        setLoading(false);
        setIsPasswordCorrect(false);
        if (error.response) {
          console.error("Server responded with an error:", error.response.data);
          console.error("Status code:", error.response.status);
        } else if (error.request) {
          console.error("No response received from the server");
        } else {
          console.error("Error setting up the request:", error.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const anotherNumber = () => {
    window.location.replace("/");
    localStorage.removeItem("phoneNumber");
    localStorage.removeItem("requestId");
  };

  const handleChange = (newOtp) => {
    setOtp(newOtp);
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Box textAlign="left" width="100%" maxWidth="314px">
          {!isPasswordCorrect && (
            <Stack sx={{ width: "100%", marginBottom: 2 }} spacing={2}>
              <Alert severity="error">
                Error. Try OTP again or login again.
              </Alert>
            </Stack>
          )}
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            style={{ color: "#542582" }}
          >
            OTP Verification
          </Typography>
          <Typography variant="caption" paragraph>
            We have sent an OTP to {localStorage.phoneNumber}. Please enter the
            code received to verify.
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <MuiOtpInput value={otp} onChange={handleChange} />
          </Box>

          <Button
            variant="contained"
            color={resendClicked ? "success" : "primary"}
            fullWidth
            style={{
              marginTop: "20px",
              backgroundColor: resendClicked ? "#4CAF50" : "#542582",
            }}
            onClick={submitButton}
            endIcon={resendClicked && <CheckIcon />}
          >
            {loading ? <CircularProgress size={24} /> : ""}
            {resendClicked ? "OTP Sent" : "Verify"}
          </Button>
          <Box mt={2}>
            <Typography variant="body2" align="center">
              <Link href="#" onClick={handleResendClick} color="textSecondary">
                Resend OTP
              </Link>
            </Typography>
            <Typography variant="body2" align="center">
              <Link href="/" onClick={anotherNumber} color="textSecondary">
                Use Another Number
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default OTPVerification;
