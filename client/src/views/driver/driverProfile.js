import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { getloginuserAction } from "../../Redux/Action/adminauth";

function DriverUser() {
  const dispatch = useDispatch();

  // Fetching the user details from Redux state
  const user = useSelector((state) => state.login.loginuserlist?.user);

  // Dispatch the action to fetch user details on component mount
  
  useEffect(() => {
    dispatch(getloginuserAction());
  }, [dispatch]);

  return (
    <Container className="driver-container" fluid>
      <Row className="justify-content-center">
        <Col md="8">
          <Card className="driver-card">
            
            {/* Top-right "Edit Profile" button */}
            <div className="d-flex justify-content-end mb-2">
              <Button className="btn-warning btn-sm">
                <i className="fa fa-edit fa-lg"></i> Edit Profile
              </Button>
            </div>

            {/* Driver's Image at the top, centered */}
            <div className="driver-image-container text-center">
              <img
                alt="Driver"
                className="driver-image"
                src={require("assets/img/faces/face-3.jpg")}
              />
            </div>

            <Card.Body className="text-center">
              <h4 className="driver-name">{user?.username || "Driver Name"}</h4>
              <p className="driver-email">{user?.email || "Driver Email"}</p>

              {/* Driver details */}
              <Row className="driver-details">
                <Col md="6">
                  <Form.Group>
                    <label>Username:</label>
                    <p>{user?.username || "N/A"}</p>
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group>
                    <label>Email address:</label>
                    <p>{user?.email || "N/A"}</p>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>

            {/* Social media buttons */}
            <Card.Footer className="text-center">
              <div className="social-buttons">
                <Button className="btn-simple btn-icon" variant="link">
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button className="btn-simple btn-icon" variant="link">
                  <i className="fab fa-twitter"></i>
                </Button>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DriverUser;
