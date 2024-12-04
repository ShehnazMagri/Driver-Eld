import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  IconButton,
  Link,
  CircularProgress,
} from "@mui/material";
import {
  Google,
  GitHub,
  Facebook,
  Twitter,
  Email,
  VpnKey,
} from "@mui/icons-material";
import CustomTextField from "./CustomTextField";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CommonLeftSide from "./CommonLeftSide";
import truk1 from "../../assets/img/truk1.jpg";
import truck2 from "../../assets/img/truck2.jpg";
import truckbg from "../../assets/img/truckbg.jpg";
import { useDispatch } from "react-redux";

import { ForgotPasswordAction } from "../../Redux/Action/adminauth";

const ForgetPassword = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const slides = [
    { id: 1, image: truckbg },
    { id: 2, image: truck2 },
    { id: 3, image: truk1 },
  ];

  const onSubmit = async (data) => {
    setLoading(true); // Start loading when form is submitted
    try {
      await dispatch(ForgotPasswordAction({ email: data.email }));
    } finally {
      setLoading(false); // Stop loading after response
    }
    reset(); // Reset the form after submission
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      {/* Left Side */}
      <Grid item xs={12} sm={6} md={6}>
        <CommonLeftSide slides={slides} />
      </Grid>

      {/* Right Side */}
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        sx={{
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "auto",
        }}
      >
        <Paper
          elevation={0}
          sx={{ padding: "40px", maxWidth: "600px", width: "100%" }}
        >
          <Typography variant="h4" gutterBottom>
            Forget Password
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            style={{ paddingBottom: "3rem" }}
          >
            Enter your email address and we will send you a link to reset your
            password.
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CustomTextField
                  control={control}
                  name="email"
                  label="Email Address"
                  icon={<Email />}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/,
                      message: "Email is invalid",
                    },
                  }}
                  error={!!errors.email}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{
                    marginTop: "20px",
                    backgroundColor: "#7B61FF",
                    color: "#fff",
                    padding: "10px 0",
                  }}
                  disabled={loading}
                >
                  {/* Forget Password */}
                  {/* {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Forget Password'} */}
                  {loading ? "Loading..." : "Forget Password"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ForgetPassword;
