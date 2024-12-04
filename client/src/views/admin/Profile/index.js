import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ForgotPasswordAction,getloginuserAction,} from "../../../Redux/Action/adminauth";
import { updateuservehicleAction } from "../../../Redux/Action/vehicle";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import {Badge,Button, Card, Form, Container, Row, Col, Table,} from "react-bootstrap";
import { Avatar, Tab, Tabs, Box, TableBody,Typography,TableRow,TableCell} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";


const REACT_APP_BACKEND_API = process.env.REACT_APP_BACKEND_URL;

const Profile = () => {
  const [tabValue, setTabValue] = React.useState("overview");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.login.loginuserlist?.user);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    officeAddress: "",
    phoneNumber: "",
    carrierName: "",
    cycleTimezone: "",
    dot: "",
    // profileImage: "",
    profileImage: null,
  });
const {register,  handleSubmit, formState: { errors },   reset,} = useForm();


  // Set initial form data when the user details are loaded
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        // email: user.email || "",
        officeAddress: user.officeAddress || "",
        phoneNumber: user.phoneNumber || "",
        carrierName: user.carrierName || "",
        cycleTimezone: user.cycleTimezone || "",
        dot: user.dot || "",
        // profileImage: user.profileImage || "",
        profileImage: null, // Reset profileImage to null on user change
      });
    }
  }, [user]);

  useEffect(() => {
    dispatch(getloginuserAction());
  }, [dispatch]);


  // Allowed image types
  const allowedTypes = /image\/(jpeg|jpg|png)/;
  const maxImageSize = 5 * 1024 * 1024; // 5MB
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if the file's MIME type matches the allowed types
      if (!allowedTypes.test(file.type)) {
        toast.error("Invalid file type. Please upload a JPG or PNG image only.");
        e.target.value = ''; // Reset file input
        return;
      }
      // Check file size (5MB limit)
      if (file.size > maxImageSize) {
        toast.error("File is too large. Please upload an image smaller than 5MB.");
        e.target.value = ''; // Reset file input
        return;
      }
      // If valid, proceed with the file upload
      setFormData(prev => ({
        ...prev,
        profileImage: file
      }));
    }
  };

  const validateImage = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => reject(false);
      img.src = URL.createObjectURL(file);
    });
  };
  

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submit for upadte profile
 const onSubmit = async (e) => {
  e.preventDefault();
  try {
    setLoading(true);
    if (formData.profileImage) {
      try {
        await validateImage(formData.profileImage);
      } catch (error) {
        toast.error("Invalid image file. Please upload a valid image.");
        setLoading(false);
        return;
      }
    }
    // Create FormData object
    const data = new FormData();
    let hasChanges = false;
    Object.keys(formData).forEach((key) => {
      if (key === 'profileImage') {
        if (formData[key] instanceof File) {
          data.append(key, formData[key]); // Append image file to FormData
          hasChanges = true;
        }
      } else {
        const value = formData[key]?.trim();
        if (value && value !== user[key]) {
          data.append(key, value); // Append text fields
          hasChanges = true;
        }
      }
    });
    if (!hasChanges) {
      toast.info("No changes detected to update.");
      return;
    }
    // Send data to the backend
    const result = await dispatch(updateuservehicleAction(data, user.id));
    if (result?.status) {
      window.location.reload();
      // toast.success("Profile updated successfully!");
    }
  } catch (error) {
    console.error("Update failed:", error);
    // if (error?.response?.data?.message) {
    //   toast.error(error.response.data.message);
    // } else {
    //   toast.error("Failed to update profile. Please try again.");
    // }
    if (error.message === "Invalid image type") {
      toast.error("Invalid image type. Please upload a JPG or PNG image only.");
    } else if (error?.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Failed to update profile. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Reset Paasoed functionalty
  const onSubmits = async (data) => {
    setLoading(true);
    try {
      const response = await dispatch(
        ForgotPasswordAction({ email: data.email })
      );
      if (response && response.status !== 200) {
        console.error(response.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
    reset(); // Reset the form after submission
  };

  return (
    <Card
      style={{
        padding: "30px",
        borderRadius: "12px",
        marginBottom: "30px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Profile Header */}
      {/* <Box className="mt-5 mb-3 d-flex align-items-center">
        <Avatar
          src={user?.profileImage  ? `${REACT_APP_BACKEND_API}/api/profile/${user.profileImage}`  : "/images/red.jpg"} alt="Profile Picture"   sx={{ width: 100, height: 100 }}  />
        <Box className="ml-3">
          <h2>{user?.role}</h2>
          <p>   <i className="bi bi-envelope"></i> {user?.email}  </p>
        </Box>
      </Box> */}
       {/* Profile Banner */}
  <Box sx={{  height: "330px",  backgroundImage: `url(${
        user?.coverphoto ? `${REACT_APP_BACKEND_API}/api/profile/${user.coverphoto}` : "/images/free-photo.jpeg"
      })`, backgroundSize: "cover", backgroundPosition: "center",  borderRadius: "12px 12px 0 0",   }} />

  {/* Profile Header */}
  <Box   sx={{ display: "flex",  alignItems: "center",   mt: -5,   pl: 2,   }} >
    <Avatar src={  user?.profileImage  ? `${REACT_APP_BACKEND_API}/api/profile/${user.profileImage}`   : "/images/red.jpg" }  alt="Profile Picture"  sx={{ width: 100, height: 100, border: "3px solid white" }}/>
    <Box sx={{ ml: 3 }}>
      <h2 style={{ paddingTop: '9px' }}>{user?.role}</h2>
      <p>  <i className="bi bi-envelope"></i> {user?.email} </p>
    </Box>
  </Box>

      {/* Tabs */}
      <div className="text-center" style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="Profile Tabs"
          indicatorColor="primary"
          textColor="primary"
          sx={{
            width: 'auto', // Let tabs take the available space
            display: 'flex', // Make sure it's a flex container
            justifyContent: 'center',
          }}
        >
          <Tab label="Overview" value="overview" />
          <Tab label="Update" value="edit" />
          <Tab label="Reset Password" value="resetPassword" />
        </Tabs>
      </div>

      {/* Profile Details */}
      <Box mt={3}>
      {tabValue === "overview" && (
      <Card sx={{ boxShadow: 3, borderRadius: 3, marginBottom: 4 }}>
        <Card.Body>
         <Row className="mt-4">
        <Col md={12}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 3, color: '#5E636E' }}>
            Profile Details
          </Typography>
          <Table sx={{ minWidth: 650, borderCollapse: 'collapse' }}>
            <TableBody>
              <TableRow>
                <TableCell sx={{ color: '#5E636E', padding: '12px' }}>First Name</TableCell>
                <TableCell sx={{ padding: '12px', color: '#5E636E' }}>{user?.firstName || "Not Provided"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ color: '#5E636E', padding: '12px' }}>Last Name</TableCell>
                <TableCell sx={{ padding: '12px', color: '#5E636E' }}>{user?.lastName || "Not Provided"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ color: '#5E636E', padding: '12px' }}>Email</TableCell>
                <TableCell sx={{ padding: '12px', color: '#5E636E' }}>{user?.email || "Not Provided"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ color: '#5E636E', padding: '12px' }}>Phone Number</TableCell>
                <TableCell sx={{ padding: '12px', color: '#5E636E' }}>{user?.phoneNumber || "Not Provided"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ color: '#5E636E', padding: '12px' }}>Address</TableCell>
                <TableCell sx={{ padding: '12px', color: '#5E636E' }}>{user?.officeAddress || "Not Provided"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ color: '#5E636E', padding: '12px' }}>Timezone</TableCell>
                <TableCell sx={{ padding: '12px', color: '#5E636E' }}>{user?.cycleTimezone || "Not Provided"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ color: '#5E636E', padding: '12px' }}>DOT</TableCell>
                <TableCell sx={{ padding: '12px', color: '#5E636E' }}>{user?.dot || "Not Provided"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Col>
         </Row>
        </Card.Body>
    </Card>
      )}

        {/* Placeholder for Edit and Reset Password tabs */}
        {tabValue === "edit" && (
          <>
            <Card>
              <Card.Body>
                <h5
                  className="mb-0 font-weight-bold"
                  style={{ letterSpacing: "0.05em", paddingBottom: "30px" }}
                >
                  Update Profile
                </h5>
                <Form
                //  onSubmit={handleSubmit(onSubmit)}
                onSubmit={onSubmit}
                >
                  <h5 className="mb-3">User Details</h5>
                  <Row className="mb-3">
                    <Col>
                      <Form.Group controlId="firstName">
                        <Form.Label>First Name *</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter first name"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="lastName">
                        <Form.Label>Last Name *</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter last name"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <Form.Group controlId="phoneNumber">
                        <Form.Label>Phone Number *</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="(201) 555-0123"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="carrierName">
                        <Form.Label>Carrier Name *</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter carrier name"
                          name="carrierName"
                          value={formData.carrierName}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <Form.Group controlId="officeAddress">
                        <Form.Label>Address *</Form.Label>
                        <Form.Control
                          type="text"
                          name="officeAddress"
                          placeholder="Enter Address"
                          value={formData.officeAddress}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="cycleTimezone">
                        <Form.Label>Timezone</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Timezone"
                          name="cycleTimezone"
                          value={formData.cycleTimezone}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <Form.Group controlId="dot">
                        <Form.Label>DOT</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Dot"
                          name="dot"
                          value={formData.dot}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  

                  <Row className="mb-3">
                    <Col>
                      <Form.Group controlId="profileImage">
                        <Form.Label>Profile Image</Form.Label>
                        <Form.Control
                          type="file"
                          name="profileImage"
                        // accept="image/jpeg, image/jpg, image/png"
                         accept=".jpg, .jpeg, .png"
                          onChange={handleImageChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="text-end mt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      className="custom-button"
                      disabled={loading }
                    >
                    {loading ? 'Updating...' : 'Update User'}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </>
        )}

        {tabValue === "resetPassword" && (
          <>
            <Card>
              <Card.Body>
                <h5
                  className="mb-0 font-weight-bold"
                  style={{ letterSpacing: "0.05em", paddingBottom: "30px" }}
                >
                  Reset Password
                </h5>
                <Form onSubmit={handleSubmit(onSubmits)}>
                  <h5 className="mb-3">
                  Enter your email address and you will receive a link to reset your password
                  </h5>
                  <Row className="mb-3">
                    <Col>
                      <Form.Group controlId="email">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control
                          type="email" // Use email type for better validation
                          placeholder="Enter your email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^\S+@\S+\.\S+$/, // Updated pattern for better email validation
                              message: "Email is invalid",
                            },
                          })}
                          isInvalid={!!errors.email} // Use isInvalid for Bootstrap validation styling
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email?.message} {/* Display error message */}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="text-end mt-4">
                    {/* <Button
                      type="submit"
                      variant="primary"
                      className="custom-button"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Forget Password"}
                    </Button> */}
                    <Button
                      variant="contained"
                      className={`custom-button ${loading ? "loading" : ""}`}
                      type="submit"
                      fullWidth
                      sx={{
                        marginTop: "20px",
                        padding: "10px 0",
                        border: "none", // Ensure no border
                        fontSize: "1.25rem", // Larger font size
                      }}
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Forget Password"}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </>
        )}
      </Box>
    </Card>
  );
};

export default Profile;


