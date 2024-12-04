import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ForgotPasswordAction,
  getloginuserAction,
} from "../../Redux/Action/adminauth";
import { updateuservehicleAction } from "../../Redux/Action/vehicle";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Avatar, Tab, Tabs, Box } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import { Email } from "@mui/icons-material";

const Profiles = () => {
  const [tabValue, setTabValue] = React.useState("overview");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // Fetching the user details from Redux state
  const user = useSelector((state) => state.login.loginuserlist?.user);
  // Local state to store form values
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    officeAddress: "",
    phoneNumber: "",
    carrierName: "",
    cycleTimezone: "",
    dot: "",
    profileImage: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

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
        profileImage: user.profileImage || "",
      });
    }
  }, [user]);

  useEffect(() => {
    dispatch(getloginuserAction());
  }, [dispatch]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submit for upadte profile
  const onSubmit = () => {
    const id = user?.id;
    console.log("idxxx", id);
    // Dispatch the update action with the form data and existing user data
    dispatch(updateuservehicleAction(formData, id, user));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Dispatch the update action with the form data
  //   dispatch(updateuservehicleAction(formData, id));
  // };

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
      <Box className="mt-5 mb-3 d-flex align-items-center">
        <Avatar
          // src="https://via.placeholder.com/150"
          src={user?.profileImage ? user.profileImage : "/images/red.jpg"}
          alt="Profile Picture"
          sx={{ width: 100, height: 100 }}
        />
        <Box className="ml-3">
          <h2>{user?.role}</h2>
          <p>
            <i className="bi bi-envelope"></i> {user?.email}
          </p>
        </Box>
      </Box>

      {/* Tabs */}
      <div className="text-center">
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="Profile Tabs"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Overview" value="overview" />
          <Tab label="Edit" value="edit" />
          <Tab label="Reset Password" value="resetPassword" />
        </Tabs>
      </div>
      {/* Profile Details */}
      <Box mt={3}>
        {tabValue === "overview" && (
          <Row className="mt-4">
            <Col md={6}>
              <h5>Profile Details</h5>
              <table className="table">
                <tbody>
                  <tr>
                    <th>First Name</th>
                    <td>{user?.firstName || "firstName"}</td>
                  </tr>
                  <tr>
                    <th>Lat Name</th>
                    <td>{user?.lastName || "lastName"}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{user?.email || "email"}</td>
                  </tr>
                  <tr>
                    <th>Phone Number</th>
                    <td>{user?.phoneNumber || "phoneNumber"}</td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td>{user?.officeAddress || "officeAddress"}</td>
                  </tr>
                  <tr>
                    <th>Timezone</th>
                    <td>{user?.cycleTimezone || "cycleTimezone"}</td>
                  </tr>
                  <tr>
                    <th>DOT</th>
                    <td>{user?.dot || "dot"}</td>
                  </tr>
                </tbody>
              </table>
            </Col>
          </Row>
        )}

        {/* Placeholder for Edit and Reset Password tabs */}
        {/* {tabValue === "edit" && <h5>Edit Profile Form Placeholder</h5>} */}
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
                <Form onSubmit={handleSubmit(onSubmit)}>
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
                  <div className="text-end mt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      className="custom-button"
                    >
                      Update User
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </>
        )}

        {tabValue === "resetPassword" && (
          // <h5>Reset Password Form Placeholder</h5>
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
                    Enter your email address and we will send you a link to
                    reset your password.
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

export default Profiles;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getloginuserAction } from "../../Redux/Action/adminauth";
// import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
// import { updateuservehicleAction } from "../../Redux/Action/vehicle";
// // import { useParams } from "react-router-dom";

// export default function Profile() {
//   const dispatch = useDispatch();
//   // const { id } = useParams();

//   // Fetching the user details from Redux state
//   const user = useSelector((state) => state.login.loginuserlist?.user);

//   // Local state to store form values
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//   });

//   // Set initial form data when the user details are loaded
//   useEffect(() => {
//     if (user) {
//       setFormData({
//         username: user.username || "",
//         email: user.email || "",
//       });
//     }
//   }, [user]);

//   // Dispatch the action to fetch user details on component mount
//   useEffect(() => {
//     dispatch(getloginuserAction());
//   }, [dispatch]);

//   // Handle form input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Handle form submit
//   const id = user?.id;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Dispatch the update action with the form data
//     dispatch(updateuservehicleAction(formData, id));
//   };

//   return (
//     <>
//       <Container fluid>
//         <Row>
//           {/* <Col md="8">
//             <Card>
//               <Card.Header>
//                 <Card.Title as="h4">Edit Profile</Card.Title>
//               </Card.Header>
//               <Card.Body>
//                 <Form>
//                   <Row>
//                     <Col className="px-1" md="6">
//                       <Form.Group>
//                         <label>Username</label>
//                         <Form.Control
//                           defaultValue={user?.username || ""}
//                           placeholder="Username"
//                           type="text"
//                         ></Form.Control>
//                       </Form.Group>
//                     </Col>
//                     <Col className="pl-1" md="4">
//                       <Form.Group>
//                         <label>Email address</label>
//                         <Form.Control
//                           defaultValue={user.email || ""}
//                           placeholder="Email"
//                           type="email"
//                         ></Form.Control>
//                       </Form.Group>
//                     </Col>
//                   </Row>
//                   <div className="clearfix"></div>
//                 </Form>
//               </Card.Body>
//             </Card>
//           </Col> */}
//           <Col md="6">
//             <div className="custom-card">
//               <Card.Header>
//                 <Card.Title as="h4">Edit Profile</Card.Title>
//               </Card.Header>
//               <Card.Body>
//                 <Form onSubmit={handleSubmit}>
//                   <Row>
//                     <Col md="12" className="mt-3">
//                       <Form.Group>
//                         <label>Username</label>
//                         <Form.Control
//                           placeholder="Username"
//                           type="text"
//                           name="username"
//                           id="username"
//                           value={formData.username}
//                           onChange={handleChange}
//                           style={{
//                             fontSize: "0.875rem",
//                             padding: "0.375rem 0.75rem",
//                           }}
//                         ></Form.Control>
//                       </Form.Group>
//                     </Col>
//                     <Col md="12" className="mt-3">
//                       <Form.Group>
//                         <label>Email address</label>
//                         <Form.Control
//                           placeholder="Email"
//                           type="email"
//                           name="email"
//                           id="email"
//                           value={formData.email}
//                           onChange={handleChange}
//                           style={{
//                             fontSize: "0.875rem",
//                             padding: "0.375rem 0.75rem",
//                           }}
//                         ></Form.Control>
//                       </Form.Group>
//                     </Col>
//                     <Col xs={4} className="mt-3">
//                       <div className="d-grid">
//                         <Button
//                           className="custom-button"
//                           type="submit"
//                           style={{ marginTop: "15px" }} // Added margin
//                         >
//                           Update
//                         </Button>
//                       </div>
//                     </Col>
//                   </Row>
//                   <div className="clearfix"></div>
//                 </Form>
//               </Card.Body>
//             </div>
//           </Col>
//           <Col md="4">
//             <Card className="card-user custom-card">
//               <div className="card-image">
//                 {/* Static Image */}
//                 <img
//                   alt="..."
//                   src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
//                 ></img>
//               </div>
//               <Card.Body>
//                 <div className="author">
//                   <a href="#pablo" onClick={(e) => e.preventDefault()}>
//                     <img
//                       alt="..."
//                       className="avatar border-gray"
//                       src={require("assets/img/profilepic.png")} // Static image retained
//                     ></img>
//                     <h5 className="title">{user?.username || "User"}</h5>
//                   </a>
//                   <p className="description">{user?.email || ""}</p>
//                 </div>
//                 <p className="description text-center">
//                   {/* Static User Description */}
//                   "Lamborghini Mercy
//                   Your chick she so thirsty <br></br>
//                   I'm in that two-seat Lambo"
//                 </p>
//               </Card.Body>
//               <hr></hr>
//               <div className="button-container mr-auto ml-auto">
//                 <Button
//                   className="btn-simple btn-icon"
//                   href="#pablo"
//                   onClick={(e) => e.preventDefault()}
//                   variant="link"
//                 >
//                   <i className="fab fa-facebook-square"></i>
//                 </Button>
//                 <Button
//                   className="btn-simple btn-icon"
//                   href="#pablo"
//                   onClick={(e) => e.preventDefault()}
//                   variant="link"
//                 >
//                   <i className="fab fa-twitter"></i>
//                 </Button>
//               </div>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// }

// {
//   /* <Col md="6">
//             {" "}
//             <div className="custom-card">
//               <Card.Header>
//                 <Card.Title as="h4">Edit Profile</Card.Title>
//               </Card.Header>
//               <Card.Body>
//                 <Form onSubmit={handleSubmit}>
//                   <Row>
//                   <Col md="12" className="mt-3">
//                       <Form.Group>
//                         <label>Username</label>
//                         <Form.Control
//                           // defaultValue={user?.username || ""}
//                           placeholder="Username"
//                           type="text"
//                           name="username"
//                           id="username"
//                           value={formData.username}
//                           onChange={handleChange}
//                           style={{
//                             fontSize: "0.875rem",
//                             padding: "0.375rem 0.75rem",
//                           }}
//                         ></Form.Control>
//                       </Form.Group>
//                     </Col>
//                     <Col md="12" className="mt-3">
//                       <Form.Group>
//                         <label>Email address</label>
//                         <Form.Control
//                           defaultValue={user?.email || ""}
//                           placeholder="Email"
//                           type="email"
//                           name="email"
//                           id="email"
//                           value={formData.email}
//                           onChange={handleChange}
//                           style={{
//                             fontSize: "0.875rem",
//                             padding: "0.375rem 0.75rem",
//                           }}
//                         ></Form.Control>
//                       </Form.Group>
//                     </Col>
//                     <Col xs={4}>
//                     <div className="d-grid">
//                       <Button className="custom-button" type="submit">
//                      Update
//                       </Button>
//                     </div>
//                   </Col>
//                   </Row>
//                   <div className="clearfix"></div>
//                 </Form>
//               </Card.Body>
//             </div>
//           </Col> */
// }
