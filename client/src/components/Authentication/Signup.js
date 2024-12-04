import React from 'react';
import { Grid, Paper, Typography, Button, IconButton, Link } from '@mui/material';
import { Google, GitHub, Facebook, Twitter, Email, VpnKey, Person, Phone, BusinessCenter, Subscriptions, LocalShipping, AccessTime, LocationOn } from '@mui/icons-material';
import CustomTextField from './CustomTextField';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { RegisterAction } from '../../Redux/Action/adminauth';
import CommonLeftSide from './CommonLeftSide'; // Import the common left side component
import truk1 from "../../assets/img/truk1.jpg";
import truck2 from "../../assets/img/truck2.jpg";
import truckbg from "../../assets/img/truckbg.jpg";

const Signup = () => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    mode: "onBlur",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const slides = [
    { id: 1, image: truckbg },
    { id: 2, image: truck2 },
    { id: 3, image: truk1 },
  ];

  const onSubmit = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    formData.append("role", "owner");

    dispatch(RegisterAction(formData, navigate));
    reset();
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      {/* Left Side */}
      <Grid item xs={12} sm={6} md={6}>
        <CommonLeftSide slides={slides} /> {/* Use the common left side component */}
      </Grid>

      {/* Right Side */}
      <Grid item xs={12} sm={6} md={6} sx={{ backgroundColor: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'auto' }}>
        <Paper elevation={0} sx={{ padding: '40px', maxWidth: '600px', width: '100%' }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontSize: '1.875rem !important',
              lineHeight: '2.25rem !important',
              
            }}
          >
            Sign Up
          </Typography>

          <Typography variant="body1" color="textSecondary" style={{ paddingBottom: "3rem" }}>Enter your details to create an account.</Typography>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  control={control}
                  name="firstName"
                  label="First Name"
                  icon={<Person />}
                  rules={{
                    required: "First Name is required",
                    minLength: { value: 3, message: "First Name must be at least 3 characters" }
                  }}
                  error={!!errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  control={control}
                  name="lastName"
                  label="Last Name"
                  icon={<Person />}
                  rules={{ required: "Last Name is required" }}
                  error={!!errors.lastName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  control={control}
                  name="phoneNumber"
                  label="Phone Number"
                  icon={<Phone />}
                  rules={{
                    required: "Phone Number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Invalid phone number format"
                    }
                  }}
                  error={!!errors.phoneNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  control={control}
                  name="dot"
                  label="DOT"
                  icon={<BusinessCenter />}
                  rules={{ required: "DOT is required" }}
                  error={!!errors.dot}
                  helperText={errors.dot?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  control={control}
                  name="email"
                  label="Email Address"
                  icon={<Email />}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                      message: "Invalid email address"
                    }
                  }}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  control={control}
                  name="password"
                  label="Password"
                  type="password"
                  icon={<VpnKey />}
                  rules={{
                    required: "Password is required",
                    minLength: { value: 8, message: "Password must be at least 8 characters long" }
                  }}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  control={control}
                  name="subscriptionId"
                  label="Subscription ID"
                  icon={<Subscriptions />}
                  // rules={{ required: "Subscription ID is required" }}
                  error={!!errors.subscriptionId}
                  helperText={errors.subscriptionId?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  control={control}
                  name="carrierName"
                  label="Carrier Name"
                  icon={<LocalShipping />}
                  rules={{ required: "Carrier Name is required" }}
                  error={!!errors.carrierName}
                  helperText={errors.carrierName?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  control={control}
                  name="cycleTimezone"
                  label="Cycle Timezone"
                  icon={<AccessTime />}
                  rules={{ required: "Cycle Timezone is required" }}
                  error={!!errors.cycleTimezone}
                  helperText={errors.cycleTimezone?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  control={control}
                  name="officeAddress"
                  label="Office Address (Optional)"
                  icon={<LocationOn />}
                  error={!!errors.officeAddress}
                  helperText={errors.officeAddress?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{ marginTop: '20px', backgroundColor: '#7B61FF', color: '#fff', padding: '10px 0' }}
                >
                  Sign Up
                </Button>
              </Grid>
              <Grid container justifyContent="center" sx={{ marginTop: '30px' }}>
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
                <Typography sx={{ marginTop: '20px', textAlign: "center" }}>
                  Already have an account? <Link href="#" underline="none" color="primary" onClick={handleLogin}>Sign In</Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Signup;
