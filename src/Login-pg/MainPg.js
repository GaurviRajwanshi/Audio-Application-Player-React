import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import CountryField from "./CountryField";

const CenteredPageWithLeftAlignedText = () => {
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isError, setIsError] = useState(false);

  const handlePhoneNumberChange = (newPhoneNumber) => {
    setPhoneNumber(newPhoneNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleButtonClick();
  };

  const url = "https://dev.api.goongoonalo.com/v1/auth/login";
  const handleButtonClick = () => {
    setLoading(true);
    const formData = {
      phoneNumber: phoneNumber,
    };

    console.log("Form data submitted:", formData);
    let jsonPh = JSON.stringify(formData);
    jsonPh = JSON.parse(jsonPh);

    console.log(jsonPh);

    axios
      .post(url, jsonPh)
      .then((response) => {
        setIsError(false);
        console.log("Response:", jsonPh);
        console.log(response);
        console.log(response.data.requestId);
        localStorage.setItem("phoneNumber", phoneNumber);
        localStorage.setItem("requestId", response.data.requestId);
        window.location.replace("/OTP");
      })
      .catch((error) => {
        setIsError(true);
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
        <Box textAlign="left" width="100%" maxWidth="400px">
          {isError && (
            <Alert severity="error" sx={{ padding: 2, marginBottom: 2 }}>
              Error: Try Again
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <Typography variant="h4" component="h1" gutterBottom>
              Sign In
            </Typography>
            <Typography variant="body1" paragraph>
              Please enter your mobile number to login. We will send an OTP to
              verify your number.
            </Typography>
            <div>
              <CountryField
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: 16, marginBottom: 16 }}
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Sign in"}
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default CenteredPageWithLeftAlignedText;
