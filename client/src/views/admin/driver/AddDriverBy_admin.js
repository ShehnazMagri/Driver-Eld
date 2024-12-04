import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Form, Button, Row, Col, Card, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addDriverByAdminAction } from "../../../Redux/Action/adminauth";
import { toast } from "react-toastify";
import { getVehiclesByOwnerAction } from "../../../Redux/Action/vehicle";
const AddDriverBy_admin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await dispatch(addDriverByAdminAction(data));
      if (response && response.message) {
        toast.success(response.message);
        reset();
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error adding driver. Please try again.");
      }
    } finally {
      setLoading(false);
      reset();
    }
  };

  const vehicleDataByOwnerId = useSelector((state) => state.vehicle.vehicles);
  const vehiclese = vehicleDataByOwnerId || [];
  // console.log(vehiclese,"************************************************")
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // Handle vehicle selection
  const handleVehicleChange = (event) => {
    const vehicleNumber = event.target.value;
    const vehicle = vehiclese.find((v) => v.vehicleNumber === vehicleNumber);
    setSelectedVehicle(vehicle);
  };

  // Filter vehicles excluding those with status "assigned"
  const availableVehicles = vehiclese.filter(
    (vehicle) => vehicle.status !== "assigned"
  );
  const fetchVichelsData = async (userId, page) => {
    try {
      const response = await dispatch(getVehiclesByOwnerAction(userId, page));
      if (response.vichels) {
        setPagination({
          totalPages: response.totalPages,
          totalDrivers: response.total,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <Card.Body>
        <h5
          className="mb-0 font-weight-bold"
          style={{ letterSpacing: "0.05em", paddingBottom: "30px" }}
        >
          Add New Driver
        </h5>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h5 className="mb-3">Demographic Details</h5>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="firstName">
                <Form.Label>First Name *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                />
                {errors.firstName && (
                  <p className="text-danger">{errors.firstName.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                />
                {errors.lastName && (
                  <p className="text-danger">{errors.lastName.message}</p>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email Address *</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="cell">
                <Form.Label>Cell *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="(201) 555-0123"
                  {...register("cell", {
                    required: "Phone number is required",
                  })}
                />
                {errors.cell && (
                  <p className="text-danger">{errors.cell.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="license">
                <Form.Label>License Details *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter license details"
                  {...register("license", {
                    required: "License details are required",
                  })}
                />
                {errors.license && (
                  <p className="text-danger">{errors.license.message}</p>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="cargoType">
                <Form.Label>Cargo Type</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter cargo type"
                  {...register("cargoType", {
                    required: "Cargo type is required",
                  })}
                />
                {errors.cargoType && (
                  <p className="text-danger">{errors.cargoType.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="cycle">
                <Form.Label>Cycle *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="cycle"
                  {...register("cycle", { required: "Cycle is required" })}
                />
                {errors.cycle && (
                  <p className="text-danger">{errors.cycle.message}</p>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="restBreak">
                <Form.Label>Rest Break *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Rest Break"
                  {...register("restBreak", {
                    required: "Rest break is required",
                  })}
                />
                {errors.restBreak && (
                  <p className="text-danger">{errors.restBreak.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="restartHours">
                <Form.Label>Restart Hours *</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Restart Hours"
                  {...register("restartHours", {
                    required: "Restart hours is required",
                    valueAsNumber: true,
                  })}
                />
                {errors.restartHours && (
                  <p className="text-danger">{errors.restartHours.message}</p>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="terminalAddress">
                <Form.Label>Terminal Address *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="terminalAddress"
                  {...register("terminalAddress", {
                    required: "Terminal address is required",
                  })}
                />
                {errors.terminalAddress && (
                  <p className="text-danger">
                    {errors.terminalAddress.message}
                  </p>
                )}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="country">
                <Form.Label>Country *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter country"
                  {...register("country", { required: "Country is required" })}
                />
                {errors.country && (
                  <p className="text-danger">{errors.country.message}</p>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="licenseState">
                <Form.Label>License State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="CA-California"
                  {...register("licenseState", {
                    required: "License State is required",
                  })}
                />
                {errors.licenseState && (
                  <p className="text-danger">{errors.licenseState.message}</p>
                )}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="licenseExpiration">
                <Form.Label>License Expiration</Form.Label>
                <Form.Control
                  type="date"
                  {...register("licenseExpiration", {
                    required: "License Expiration is required",
                  })}
                />
                {errors.licenseExpiration && (
                  <p className="text-danger">
                    {errors.licenseExpiration.message}
                  </p>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3"></Row>

          <h5 className="mt-4 mb-3">Additional Details</h5>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="startDate">
                <Form.Label>Start Date </Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter start date"
                  {...register("startDate")}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="vehicleNumber">
                <Form.Label>Vehicle Number</Form.Label>
                <Form.Control
                  as="select"
                  {...register("vehicleNumber")}
                  onChange={handleVehicleChange}
                >
                  <option value="">Select a vehicle number</option>
                  {availableVehicles.length > 0 ? (
                    availableVehicles.map((vehicle) => (
                      <option key={vehicle.id} value={vehicle.vehicleNumber}>
                        {vehicle.vehicleNumber}
                      </option>
                    ))
                  ) : (
                    <option disabled>No vehicles available</option>
                  )}
                </Form.Control>
                {/* {errors.vehicleNumber && <p className="text-danger">{errors.vehicleNumber.message}</p>} */}
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="os">
                <Form.Label>OS</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter OS number"
                  {...register("os")}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="appVersion">
                <Form.Label>App Version</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter app version"
                  {...register("appVersion")}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="exemptions">
                <Form.Label>Exemptions</Form.Label>
                {/* <Form.Control
                  type="text"
                  placeholder="Enter exemptions"
                  {...register('exemptions')}
                /> */}
                <Form.Control as="select" {...register("exemptions")}>
                  <option value="">Select Exemption</option>
                  <option value="Adverse Driving">Adverse Driving</option>
                  <option value="Short Haul">Short Haul</option>
                  <option value="Agricultural Exemption">
                    Agricultural Exemption
                  </option>
                  <option value="Oversize Exemption">Oversize Exemption</option>
                  <option value="Emergency Exemptions">
                    Emergency Exemptions
                  </option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="specialDutyStatus">
                <Form.Label>Special Duty Status</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter special duty status"
                  {...register("specialDutyStatus")}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="text-end mt-4">
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              //  className="custom-button"
              className={`custom-button ${loading ? "loading-state" : ""}`}
              style={{
                color: loading ? "black" : "white",
                backgroundColor: loading ? "#846CF9" : "",
              }}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />{" "}
                  Submitting...
                </>
              ) : (
                "Add Driver"
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddDriverBy_admin;
