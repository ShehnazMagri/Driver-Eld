import React from 'react';
import { Grid, Paper, Typography, Button, IconButton, Link } from '@mui/material';
import { Google, GitHub, Facebook, Twitter, Email, VpnKey } from '@mui/icons-material';
import CustomTextField from './CustomTextField';
import { useForm } from 'react-hook-form';
import { useNavigate,useParams,useLocation } from "react-router-dom";
import CommonLeftSide from './CommonLeftSide';
import truk1 from "../../assets/img/truk1.jpg";
import truck2 from "../../assets/img/truck2.jpg";
import truckbg from "../../assets/img/truckbg.jpg";
import { useDispatch } from 'react-redux';

import { ResetPasswordAction } from '../../Redux/Action/adminauth';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const { control, handleSubmit, reset,formState: { errors } } = useForm({
    mode: "onBlur",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
//   const { token } = useParams(); 
const location = useLocation(); // Get the location object
const queryParams = new URLSearchParams(location.search); // Create URLSearchParams object
const token = queryParams.get('token'); 
console.log('token:', token);

  const slides = [
    { id: 1, image: truckbg },
    { id: 2, image: truck2 },
    { id: 3, image: truk1 },
  ];


  const onSubmit = async (data) => {
    const { password, confirmPassword } = data;
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match."); // Show error message
      return;
    }
    // Dispatch the reset password action with the token and password
    const result = await dispatch(ResetPasswordAction(token, password));
    // Check if result is defined and handle the response
    if (result && result.status) {
    //   toast.success(result.message); // Show success message
      navigate("/login"); // Redirect to login page after successful password reset
    } else {
      toast.error(result ? result.message : "An unexpected error occurred."); // Show error message
    }
  
    reset(); // Reset the form after submission
  };
  
  
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      {/* Left Side */}
      <Grid item xs={12} sm={6} md={6}>
        <CommonLeftSide slides={slides} />
      </Grid>

      {/* Right Side */}
      <Grid item xs={12} sm={6} md={6} sx={{ backgroundColor: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'auto' }}>
        <Paper elevation={0} sx={{ padding: '40px', maxWidth: '600px', width: '100%' }}>
          <Typography variant="h4" gutterBottom>ResetPassword</Typography>
          <Typography variant="body1" color="textSecondary" style={{ paddingBottom: "3rem" }}>  Enter your new password below.</Typography>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CustomTextField
                  control={control}
                  name="password"
                  label="Password"
                  type="password"
                  icon={<VpnKey />}
                  rules={{ required: "Password is required" }}
                  error={!!errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  control={control}
                  name="confirmPassword"
                  label="confirmPassword"
                  type="password"
                  icon={<VpnKey />}
                  rules={{ required: "Confirm Password is required" }}
                  error={!!errors.confirmPassword} 
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{ marginTop: '20px', backgroundColor: '#7B61FF', color: '#fff', padding: '10px 0' }}
                >
                 Reset Password
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
