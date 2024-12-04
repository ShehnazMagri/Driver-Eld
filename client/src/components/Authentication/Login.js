import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  IconButton,
  Link,
  TextField,
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

import { LoginAction } from "../../Redux/Action/adminauth";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const slides = [
    { id: 1, image: truckbg },
    { id: 2, image: truck2 },
    { id: 3, image: truk1 },
  ];

  const onSubmit = async (data) => {
    console.log(data)
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      const response = await dispatch(LoginAction(formData));
      if (response?.status === 201) {
        navigate("/admin/dashboard");
      } else {
        console.log("Login failed. Resetting form...");
        reset();
      }
    } catch (error) {
      console.error("Error during login:", error);
      reset(); // Reset the form even if an error occurs
    }
  };
  
  const handleSignup = () => {
    navigate("/signup");
  };

  const handleForgotPassword = () => {
    navigate("/forget-password"); // Redirect to the forgot password page
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
            Log In
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            style={{ paddingBottom: "3rem" }}
          >
            Enter your email and password to log in.
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {/* <CustomTextField
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
                /> */}
                <TextField
                  label="Email Address"
                  type="email"
                  fullWidth
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/,
                      message: "Email is invalid",
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ""}
                  InputProps={{
                    startAdornment: <Email sx={{ marginRight: "8px" }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                {/* <CustomTextField
                  control={control}
                  name="password"
                  label="Password"
                  type="password"
                  icon={<VpnKey />}
                  rules={{ required: "Password is required" }}
                  error={!!errors.password}
                /> */}
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  {...register("password", {
                    required: "Password is required",
                  })}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ""}
                  InputProps={{
                    startAdornment: <VpnKey sx={{ marginRight: "8px" }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ textAlign: "right", marginTop: "10px" }}>
                  <Link
                    underline="none"
                    color="primary"
                    onClick={handleForgotPassword}
                    sx={{ cursor: "pointer" }}
                  >
                    Forgot Password?
                  </Link>
                </Typography>
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
                >
                  Log In
                </Button>
              </Grid>
              <Grid
                container
                justifyContent="center"
                sx={{ marginTop: "30px" }}
              >
                <IconButton>
                  <Google color="error" />
                </IconButton>
                <IconButton>
                  <GitHub color="inherit" />
                </IconButton>
                <IconButton>
                  <Facebook color="primary" />
                </IconButton>
                <IconButton>
                  <Twitter color="primary" />
                </IconButton>
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ marginTop: "20px", textAlign: "center" }}>
                  Don’t have an account?{" "}
                  <Link
                    href="#"
                    underline="none"
                    color="primary"
                    onClick={handleSignup}
                  >
                    Sign Up
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
