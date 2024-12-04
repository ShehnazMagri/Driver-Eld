import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useDropzone } from 'react-dropzone';
import {
  Badge,
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
  Spinner
} from "react-bootstrap";
import { getVichelsByIdAction, updateVehicleBy_idAction, allusersAction } from "../../../Redux/Action/adminauth";

function EditVehicleByAdmin() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [vehicleImage, setVehicleImage] = useState(null);
  const vehicle = useSelector((state) => state.login.allvicheleby_detalsIdlist.vichel);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      vehicleType: "",
      vehicleNumber: "",
      vin: "",
      terminalAddress: "",
      truckType: "",
      vehicleModel: "",
      fuelTankCapacity: "",
      hoursAvailablePerDay: "",
      dormancyThreshold: "",
      registrationNumber: "",
      registrationExpiryDate: "",
      liabilityInsuranceName: "",
      liabilityInsuranceNumber: "",
      liabilityInsuranceExpiryDate: "",
      cargoInsuranceName: "",
      cargoInsuranceNumber: "",
      fuelType: "",
      license: "",
    }
  });

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    setVehicleImage(Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxFiles: 1
  });

  useEffect(() => {
    dispatch(getVichelsByIdAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (vehicle) {
      setValue("vehicleType", vehicle.vehicleType || "");
      setValue("vehicleNumber", vehicle.vehicleNumber || "");
      setValue("vin", vehicle.vin || "");
      setValue("terminalAddress", vehicle.terminalAddress || "");
      setValue("truckType", vehicle.truckType || "");
      setValue("vehicleModel", vehicle.vehicleModel || "");
      setValue("fuelTankCapacity", vehicle.fuelTankCapacity || "");
      setValue("hoursAvailablePerDay", vehicle.hoursAvailablePerDay || "");
      setValue("dormancyThreshold", vehicle.dormancyThreshold || "");
      setValue("registrationNumber", vehicle.registrationNumber || "");
      setValue("registrationExpiryDate", vehicle.registrationExpiryDate || "");
      setValue("liabilityInsuranceName", vehicle.liabilityInsuranceName || "");
      setValue("liabilityInsuranceNumber", vehicle.liabilityInsuranceNumber || "");
      setValue("liabilityInsuranceExpiryDate", vehicle.liabilityInsuranceExpiryDate || "");
      setValue("cargoInsuranceName", vehicle.cargoInsuranceName || "");
      setValue("cargoInsuranceNumber", vehicle.cargoInsuranceNumber || "");
      setValue("fuelType", vehicle.fuelType || "");
      setValue("license", vehicle.license || "");
      setValue("vehicleImage", vehicle.vehicleImage || "");
    }
  }, [vehicle, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    if (vehicleImage) {
      formData.append('vehicleImage', vehicleImage);
    }

    try {
      await dispatch(updateVehicleBy_idAction(formData, id));
      navigate('/admin/all-vehicle');
    } catch (error) {
      console.error("Error updating vehicle:", error);
    } finally {
      setLoading(false);
    }
  };

 

  useEffect(() => {
    dispatch(allusersAction());
  }, [dispatch]);

  return (
    <Card>
      <Card.Body>
        <h5 className="mb-0 font-weight-bold" style={{ letterSpacing: '0.05em', paddingBottom: '30px' }}>
          Edit Vehicle
        </h5>
        <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="vehicleType">
                <Form.Label>Vehicle Type *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type here..."
                  {...register('vehicleType', { required: 'Vehicle Type is required' })}
                />
                {errors.vehicleType && <p className="text-danger">{errors.vehicleType.message}</p>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="vehicleNumber">
                <Form.Label>Vehicle Number *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Vehicle Number here..."
                  {...register('vehicleNumber', { required: 'Vehicle Number is required' })}
                />
                {errors.vehicleNumber && <p className="text-danger">{errors.vehicleNumber.message}</p>}
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="vehicleModel">
                <Form.Label>Vehicle Model *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Vehicle Model here..."
                  {...register('vehicleModel', { required: 'Vehicle Model is required' })}
                />
                {errors.vehicleModel && <p className="text-danger">{errors.vehicleModel.message}</p>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="vin">
                <Form.Label>VIN *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter VIN here..."
                  {...register('vin', { required: 'VIN is required' })}
                />
                {errors.vin && <p className="text-danger">{errors.vin.message}</p>}
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="fuelTankCapacity">
                <Form.Label>Fuel Tank Capacity *</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Fuel Tank Capacity here..."
                  {...register('fuelTankCapacity', { required: 'Fuel Tank Capacity is required' })}
                />
                {errors.fuelTankCapacity && <p className="text-danger">{errors.fuelTankCapacity.message}</p>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="terminalAddress">
                <Form.Label>Terminal Address *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Terminal Address here..."
                  {...register('terminalAddress', { required: 'Terminal Address is required' })}
                />
                {errors.terminalAddress && <p className="text-danger">{errors.terminalAddress.message}</p>}
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="hoursAvailablePerDay">
                <Form.Label>Hours Available Per Day *</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Hours Available Per Day here..."
                  {...register('hoursAvailablePerDay', { required: 'Hours Available Per Day is required' })}
                />
                {errors.hoursAvailablePerDay && <p className="text-danger">{errors.hoursAvailablePerDay.message}</p>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="dormancyThreshold">
                <Form.Label>Dormancy Threshold *</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Dormancy Threshold here..."
                  {...register('dormancyThreshold', { required: 'Dormancy Threshold is required' })}
                />
                {errors.dormancyThreshold && <p className="text-danger">{errors.dormancyThreshold.message}</p>}
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="registrationNumber">
                <Form.Label>Registration Number *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Registration Number here..."
                  {...register('registrationNumber', { required: 'Registration Number is required' })}
                />
                {errors.registrationNumber && <p className="text-danger">{errors.registrationNumber.message}</p>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="registrationExpiryDate">
                <Form.Label>Registration Expiry Date *</Form.Label>
                <Form.Control
                  type="date"
                  
                />
                
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="liabilityInsuranceName">
                <Form.Label>Liability Insurance Name *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Liability Insurance Name here..."
                  {...register('liabilityInsuranceName', { required: 'Liability Insurance Name is required' })}
                />
                {errors.liabilityInsuranceName && <p className="text-danger">{errors.liabilityInsuranceName.message}</p>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="liabilityInsuranceNumber">
                <Form.Label>Liability Insurance Number *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Liability Insurance Number here..."
                  {...register('liabilityInsuranceNumber', { required: 'Liability Insurance Number is required' })}
                />
                {errors.liabilityInsuranceNumber && <p className="text-danger">{errors.liabilityInsuranceNumber.message}</p>}
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="liabilityInsuranceExpiryDate">
                <Form.Label>Liability Insurance Expiry Date *</Form.Label>
                <Form.Control
                  type="date"
                  
                />
                
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="cargoInsuranceName">
                <Form.Label>Cargo Insurance Name *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Cargo Insurance Name here..."
                  {...register('cargoInsuranceName', { required: 'Cargo Insurance Name is required' })}
                />
                {errors.cargoInsuranceName && <p className="text-danger">{errors.cargoInsuranceName.message}</p>}
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="cargoInsuranceNumber">
                <Form.Label>Cargo Insurance Number *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Cargo Insurance Number here..."
                  {...register('cargoInsuranceNumber', { required: 'Cargo Insurance Number is required' })}
                />
                {errors.cargoInsuranceNumber && <p className="text-danger">{errors.cargoInsuranceNumber.message}</p>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="fuelType">
                <Form.Label>Fuel Type *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Fuel Type here..."
                  {...register('fuelType', { required: 'Fuel Type is required' })}
                />
                {errors.fuelType && <p className="text-danger">{errors.fuelType.message}</p>}
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="license">
                <Form.Label>License *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter License here..."
                  {...register('license', { required: 'License is required' })}
                />
                {errors.license && <p className="text-danger">{errors.license.message}</p>}
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="vehicleImage">
                <Form.Label>Vehicle Image *</Form.Label>
                <div
                  {...getRootProps()}
                  className={`dropzone ${isDragActive ? 'active' : ''}`}
                  style={{
                    border: '2px dashed #007bff',
                    borderRadius: '8px',
                    padding: '20px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: '#f9f9f9',
                    position: 'relative',
                    height: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <input {...getInputProps()} />
                  {vehicleImage ? (
                    <img
                      src={vehicleImage.preview}
                      alt="Preview"
                      style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        objectFit: 'contain',
                        borderRadius: '8px',
                      }}
                    />
                  ) : (
                    <p>Drag & drop an image here, or click to select one</p>
                  )}
                </div>
              </Form.Group>
            </Col>
          </Row>

          {/* Submit Button */}
          <div className="text-end">
                        <Button type="submit" variant="primary" disabled={loading} className="custom-button">
                            {loading ? (
                                <>
                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />{' '}
                                    update Vehicle...
                                </>
                            ) : (
                                'Submit Form'
                            )}
                        </Button>
                    </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default EditVehicleByAdmin;