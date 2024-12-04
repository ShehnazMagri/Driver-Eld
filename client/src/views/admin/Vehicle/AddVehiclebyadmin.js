import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Row, Col, Card, Form, Spinner } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addVehicleByAdminAction } from "../../../Redux/Action/adminauth";

const AddVehiclebyadmin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch(); // Initialize dispatch
  const [loading, setLoading] = useState(false);
  const [vehicleImage, setVehicleImage] = useState(null); // State to store uploaded image
  const navigate = useNavigate();
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setVehicleImage(
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*", // Accept only image files
    maxFiles: 1,
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Convert the form data to FormData for file upload
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      if (vehicleImage) {
        formData.append("vehicleImage", vehicleImage);
      }

      await dispatch(addVehicleByAdminAction(formData, navigate));

      setLoading(false);
      reset();
      setVehicleImage(null);
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
      alert("Form submission failed.");
    }
  };

  return (
    <Card>
      <Card.Body>
        <h5
          className="mb-0 font-weight-bold"
          style={{ letterSpacing: "0.05em", paddingBottom: "30px" }}
        >
          Add New Vehicle
        </h5>

        {/* Form */}
        <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          {/* Vehicle Type */}
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="vehicleType">
                <Form.Label>Vehicle Type *</Form.Label>
                {/* <Form.Control
                  type="text"
                  placeholder="Type here..."
                {...register('vehicleType', { required: 'Vehicle Type is required' })}
                 />
               {errors.vehicleType && <p className="text-danger">{errors.vehicleType.message}</p>} */}
                <Form.Control
                  as="select"
                  {...register("vehicleType", {
                    required: "Please select a vehicleType",
                  })}
                >
                  <option value="">Select Vehicle Type</option>
                  <option value="Truck">Truck</option>
                  <option value="Bus">Bus</option>
                  <option value="Car">Car</option>
                  <option value="Bike">Bike</option>
                  <option value="Plane">Plane</option>
                  <option value="Locomotive">Locomotive</option>
                  <option value="Boat">Boat</option>
                  <option value="RV">RV</option>
                  <option value="Van">Van</option>
                  <option value="Motorcycle">Motorcycle</option>
                  <option value="Ambulance">Ambulance</option>
                  <option value="Bulldozer">Bulldozer</option>
                  <option value="Cement Mixer">Cement Mixer</option>
                  <option value="Crane">Crane</option>
                  <option value="Dump Truck">Dump Truck</option>
                  <option value="Forklift">Forklift</option>
                  <option value="Other">Other</option>
                </Form.Control>
                {errors.vehicleType && (
                  <p className="text-danger">{errors.vehicleType.message}</p>
                )}
              </Form.Group>
            </Col>
            {/* Vehicle Number */}
            <Col>
              <Form.Group controlId="vehicleNumber">
                <Form.Label>Vehicle Number *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Vehicle Number here..."
                  {...register("vehicleNumber", {
                    required: "Vehicle Number is required",
                  })}
                />
                {errors.vehicleNumber && (
                  <p className="text-danger">{errors.vehicleNumber.message}</p>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            {/* Terminal Address */}
            <Col>
              <Form.Group controlId="terminalAddress">
                <Form.Label>Terminal Address *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Terminal Address here..."
                  {...register("terminalAddress", {
                    required: "Terminal Address is required",
                  })}
                />
                {errors.terminalAddress && (
                  <p className="text-danger">
                    {errors.terminalAddress.message}
                  </p>
                )}
              </Form.Group>
            </Col>

            {/* VIN Field */}

            <Col>
              <Form.Group controlId="vin">
                <Form.Label>VIN *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter VIN here..."
                  {...register("vin", { required: "VIN is required" })}
                />
                {errors.vin && (
                  <p className="text-danger">{errors.vin.message}</p>
                )}
              </Form.Group>
            </Col>
          </Row>

          {/* Fuel Tank Capacity */}
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="fuelTankCapacity">
                <Form.Label>Fuel Tank Capacity </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Fuel Tank Capacity here..."
                  {...register("fuelTankCapacity")}
                />
              </Form.Group>
            </Col>
            {/* Vehicle Model */}
            <Col>
              <Form.Group controlId="vehicleModel">
                <Form.Label>Vehicle Model </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Vehicle Model here..."
                  {...register("vehicleModel")}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Hours Available Per Day */}
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="hoursAvailablePerDay">
                <Form.Label>Hours Available Per Day </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Hours Available Per Day here..."
                  {...register("hoursAvailablePerDay")}
                />
              </Form.Group>
            </Col>
            {/* Dormancy Threshold */}

            <Col>
              <Form.Group controlId="dormancyThreshold">
                <Form.Label>Dormancy Threshold </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Dormancy Threshold here..."
                  {...register("dormancyThreshold")}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Registration Number */}
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="registrationNumber">
                <Form.Label>Registration Number </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Registration Number here..."
                  {...register("registrationNumber")}
                />
              </Form.Group>
            </Col>

            {/* Registration Expiry Date */}

            <Col>
              <Form.Group controlId="registrationExpiryDate">
                <Form.Label>Registration Expiry Date </Form.Label>
                <Form.Control
                  type="date"
                  {...register("registrationExpiryDate")}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Liability Insurance Name */}
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="liabilityInsuranceName">
                <Form.Label>Liability Insurance Name </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type here..."
                  {...register("liabilityInsuranceName")}
                />
              </Form.Group>
            </Col>
            {/* Liability Insurance Number */}

            <Col>
              <Form.Group controlId="liabilityInsuranceNumber">
                <Form.Label>Liability Insurance Number </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type here..."
                  {...register("liabilityInsuranceNumber")}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Liability Insurance Expiry Date */}
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="liabilityInsuranceExpiryDate">
                <Form.Label>Liability Insurance Expiry Date </Form.Label>
                <Form.Control
                  type="date"
                  {...register("liabilityInsuranceExpiryDate")}
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="liabilityInsuranceExpiryDate">
                <Form.Label>Truck Type </Form.Label>
                <Form.Control as="select" {...register("truckType")}>
                  <option value="">Select Truck Type</option>
                  <option value="Semi Trailer Truck">Semi Trailer Truck</option>
                  <option value="18 wheeler truck">18 wheeler truck</option>
                  <option value="Flatbed">Flatbed</option>
                  <option value="Box truck">Box truck</option>
                  <option value="Van">Van</option>
                  <option value="Refrigerator Truck">Refrigerator Truck</option>
                  <option value="Pickup Truck">Pickup Truck</option>
                  <option value="Power unit only">Power unit only</option>
                  <option value="Other">Other</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          {/* Cargo Insurance Number */}
          <Row className="mb-3">
            {/* Cargo Insurance Name */}
            <Col>
              <Form.Group controlId="cargoInsuranceName">
                <Form.Label>Cargo Insurance Name </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type here..."
                  {...register("cargoInsuranceName")}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="cargoInsuranceNumber">
                <Form.Label>Cargo Insurance Number </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type here..."
                  {...register("cargoInsuranceNumber")}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="fuelType">
                <Form.Label>Fuel Type </Form.Label>
                <Form.Control
                  //   type="text"
                  //   placeholder="Enter Fuel Type here..."
                  as="select"
                  {...register("fuelType")}
                >
                  <option value="">Select Fuel Type</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Petrol">Petrol</option>
                  <option value="CNG">CNG</option>
                  <option value="Other">Other</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="license">
                <Form.Label>License </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter License Number here..."
                  {...register("license")}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Drag-and-Drop Zone for Image Upload */}
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="vehicleImage">
                <Form.Label>Vehicle Image </Form.Label>
                <div
                  {...getRootProps()}
                  className={`dropzone ${isDragActive ? "active" : ""}`}
                  style={{
                    border: "2px dashed #007bff",
                    borderRadius: "8px",
                    padding: "20px",
                    textAlign: "center",
                    cursor: "pointer",
                    background: "#f9f9f9",
                    position: "relative",
                    height: "200px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <input {...getInputProps()} />
                  {vehicleImage ? (
                    <img
                      src={vehicleImage.preview}
                      alt="Preview"
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                        borderRadius: "8px",
                      }}
                    />
                  ) : (
                    <p>Drag & drop an image here, or click to select one</p>
                  )}
                </div>
                {errors.vehicleImage && (
                  <p className="text-danger">{errors.vehicleImage.message}</p>
                )}
              </Form.Group>
            </Col>
          </Row>

          {/* Submit Button */}
          <div className="text-end">
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              // className="custom-button"
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
                "Add Vehicle"
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddVehiclebyadmin;
