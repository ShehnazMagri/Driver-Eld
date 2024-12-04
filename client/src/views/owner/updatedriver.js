import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDriverAction } from "../../Redux/Action/driver";
import { getDriverDetailsAction } from "../../Redux/Action/driver";
import { useParams } from "react-router-dom";
import { Card, Col, Container, Row, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

export default function UpdateDriver() {
  //   const { id } = useParams();
  const { driverId } = useParams();
  const dispatch = useDispatch();
  const driverDetails = useSelector((state) => state.driver.driverDetails);

  const [driverData, setDriverData] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getDriverDetailsAction(driverId));
        if (response && response.status) {
          const { vichel } = response;
          if (vichel) {
            setVehicle(vichel);
          } else {
            toast.error("Vehicle details not found!");
          }
        }
      } catch (error) {
        toast.error("Failed to fetch vehicle details!");
      }
    };
    fetchData();
  }, [dispatch, driverId]);

  // Update the state with fetched driver details
  useEffect(() => {
    if (driverDetails) {
      setDriverData({
        username: driverDetails.username || "",
        email: driverDetails.email || "",
      });
    }
  }, [driverDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDriverData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateDriverAction({ id: driverId, driverData }))
      // .then(() => toast.success('Driver updated successfully!'))
      .catch((error) =>
        toast.error(error.message || "Failed to update driver.")
      );
  };

  return (
    <div className="custom-bg py-3 py-md-5">
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={11} lg={8} xl={7} xxl={6}>
            <div className="custom-card p-4 p-md-5">
              <Row>
                <Col xs={12}>
                  <div className="mb-5">
                    <h3>Update Driver</h3>
                  </div>
                </Col>
              </Row>
              <Form onSubmit={handleSubmit}>
                <Row className="gy-3 gy-md-4 overflow-hidden">
                  <Col xs={12}>
                    <Form.Label htmlFor="email">
                      Email <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      id="email"
                      placeholder="name@example.com"
                      value={driverData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </Col>
                  <Col xs={12}>
                    <Form.Label htmlFor="username">
                      Username <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Username"
                      value={driverData.username}
                      onChange={handleInputChange}
                      required
                    />
                  </Col>
                  <Col xs={12}>
                    <div className="d-grid">
                      <Button className="custom-button" type="submit">
                        Update Driver
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
