import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Row, Col, Card, Spinner, Form } from "react-bootstrap";
import { TrailersAction } from "../../../Redux/Action/adminauth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const AddTrailers = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const newTrailerData = {
        trailerNumber: data.trailerNumber,
        vin: data.vin,
        trailerManufacturer: data.trailerManufacturer,
        model: data.model,
        numberOfAxels: data.numberOfAxels,
        licenseAuthority: data.licenseAuthority,
        ownershipType: data.ownershipType,
        licensePlateNumber: data.licensePlateNumber,
        gvwr: data.gvwr,
        length: data.length,
        trailerType: data.trailerType,
      };
      await dispatch(TrailersAction(newTrailerData, navigate));
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
      // reset();
      setTimeout(() => {
        // setLoading(false);
        reset();
      }, 1000);
    }
  };

  return (
    <Card>
      <Card.Body>
        <h5
          className="mb-0 font-weight-bold"
          style={{ letterSpacing: "0.05em", paddingBottom: "30px" }}
        >
          Add New Trailer
        </h5>
        {/* Form */}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="trailerNumber">
                <Form.Label>Trailer Number *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter trailer number"
                  {...register("trailerNumber", {
                    required: "Trailer Number is required",
                  })}
                />
                {errors.trailerNumber && (
                  <p className="text-danger">{errors.trailerNumber.message}</p>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="vin">
                <Form.Label>VIN *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter VIN"
                  {...register("vin", { required: "VIN is required" })}
                />
                {errors.vin && (
                  <p className="text-danger">{errors.vin.message}</p>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="trailerManufacturer">
                <Form.Label>Trailer Manufacturer *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter manufacturer"
                  {...register("trailerManufacturer", {
                    required: "Manufacturer is required",
                  })}
                />
                {errors.trailerManufacturer && (
                  <p className="text-danger">
                    {errors.trailerManufacturer.message}
                  </p>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="model">
                <Form.Label>Model </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter model"
                  {...register("model")}
                />
                {/* {errors.model && <p className="text-danger">{errors.model.message}</p>} */}
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="numberOfAxels">
                <Form.Label>Number of Axels </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter number of axels"
                  {...register("numberOfAxels")}
                />
                {/* {errors.numberOfAxels && <p className="text-danger">{errors.numberOfAxels.message}</p>} */}
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="licenseAuthority">
                <Form.Label>License Authority </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter license authority"
                  {...register("licenseAuthority")}
                />
                {/* {errors.licenseAuthority && <p className="text-danger">{errors.licenseAuthority.message}</p>} */}
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="ownershipType">
                <Form.Label>Ownership Type </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter ownership type"
                  {...register("ownershipType")}
                />
                {/* {errors.ownershipType && <p className="text-danger">{errors.ownershipType.message}</p>} */}
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="licensePlateNumber">
                <Form.Label>License Plate Number </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter license plate number"
                  {...register("licensePlateNumber")}
                />
                {/* {errors.licensePlateNumber && <p className="text-danger">{errors.licensePlateNumber.message}</p>} */}
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="gvwr">
                <Form.Label>GVWR (lbs) </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter GVWR"
                  {...register("gvwr")}
                />
                {/* {errors.gvwr && <p className="text-danger">{errors.gvwr.message}</p>} */}
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="length">
                <Form.Label>Length (ft) </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter trailer length"
                  {...register("length")}
                />
                {/* {errors.length && <p className="text-danger">{errors.length.message}</p>} */}
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="trailerType">
                <Form.Label>Trailer Type </Form.Label>
                {/* <Form.Control
                                    type="text"
                                    placeholder="Enter trailer type"
                                    {...register('trailerType')}
                                /> */}
                {/* {errors.trailerType && <p className="text-danger">{errors.trailerType.message}</p>} */}
                <Form.Control as="select" {...register("trailerType")}>
                  <option value="">Select Trailer Type</option>
                  <option value="Auto hauler">Auto hauler</option>
                  <option value="Conestoga">Conestoga</option>
                  <option value="Curtain Side">Curtain Side</option>
                  <option value="Double Drop">Double Drop</option>
                  <option value="Dry Van Trailer">Dry Van Trailer</option>
                  <option value="Flatbed">Flatbed</option>
                  <option value="Lowboy">Lowboy</option>
                  <option value="Reefer">Reefer</option>
                  <option value="Tanker Trailers">Tanker Trailers</option>
                  <option value="Other">Other</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          {/* Submit Button */}
          <div className="text-end">
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
                "Add Trailer"
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddTrailers;
