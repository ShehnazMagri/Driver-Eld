import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getloginuserAction } from "../Redux/Action/adminauth";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";

function User() {
  const dispatch = useDispatch();

  // Fetching the user details from Redux state
  const user = useSelector((state) => state.login.loginuserlist?.user);
  // Dispatch the action to fetch user details on component mount
  useEffect(() => {
    dispatch(getloginuserAction());
  }, [dispatch]);

  return (
    <>
      <Container fluid>
        <Row>
          {/* <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edit Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>                  
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Username</label>
                        <Form.Control
                          defaultValue={user?.username || ""}
                          placeholder="Username"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Email address</label>
                        <Form.Control
                          defaultValue={user.email || ""}
                          placeholder="Email"
                          type="email"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col> */}
          <Col md="6">
            {" "}
            {/* Reduced container width */}
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edit Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md="12" className="mt-3">
                      <Form.Group>
                        <label>Email address</label>
                        <Form.Control
                          defaultValue={user?.email || ""}
                          placeholder="Email"
                          type="email"
                          style={{
                            fontSize: "0.875rem",
                            padding: "0.375rem 0.75rem",
                          }} // Adjust font size and padding
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="12" className="mt-3">
                      <Form.Group>
                        <label>Username</label>
                        <Form.Control
                          defaultValue={user?.username || ""}
                          placeholder="Username"
                          type="text"
                          style={{
                            fontSize: "0.875rem",
                            padding: "0.375rem 0.75rem",
                          }} // Adjust font size and padding
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                {/* Static Image */}
                <img
                  alt="..."
                  src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/faces/face-3.jpg")} // Static image retained
                    ></img>
                    <h5 className="title">{user?.username || "User"}</h5>
                  </a>
                  <p className="description">{user?.email || ""}</p>
                </div>
                <p className="description text-center">
                  {/* Static User Description */}
                  "Lamborghini Mercy <br></br>
                  Your chick she so thirsty <br></br>
                  I'm in that two-seat Lambo"
                </p>
              </Card.Body>
              <hr></hr>
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-twitter"></i>
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default User;
