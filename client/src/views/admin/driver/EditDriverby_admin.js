import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { getdriverby_adminIdAction, updateDriverby_adminBy_idAction } from "../../../Redux/Action/adminauth";

function EditDriverby_admin() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // React Hook Form setup
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      // email: "",
      firstName: "",
      lastName: "",
      cell: "",
      license: "",
      country: "",
      vehicleNumber: "",
      licenseState: "",
      licenseExpiration: "",
      cargoType: "",
      os: "",
    }
  });

  const driver = useSelector((state) => state.login.getby_iddriverby_detalsIdlist?.driver);

  useEffect(() => {
    dispatch(getdriverby_adminIdAction(id)); // Fetch driver data by id
  }, [dispatch, id]);

  useEffect(() => {
    if (driver) {
      // setValue("email", driver.email || "");
      // Set values for the new fields
      setValue("firstName", driver.firstName || "");
      setValue("lastName", driver.lastName || "");
      setValue("cell", driver.cell || "");
      setValue("license", driver.license || "");
      setValue("country", driver.country || "");
      setValue("vehicleNumber", driver.vehicleNumber || "");
      setValue("licenseState", driver.licenseState || "");
      setValue("licenseExpiration", driver.licenseExpiration || "");
      setValue("cargoType", driver.cargoType || "");
      setValue("os", driver.os || "");
    }
  }, [driver, setValue]);

  const onSubmit = async (data) => {
    const updatedDriver = {
      // email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      cell: data.cell,
      license: data.license,
      country: data.country,
      vehicleNumber: data.vehicleNumber,
      licenseState: data.licenseState,
      licenseExpiration: data.licenseExpiration,
      cargoType: data.cargoType,
      os: data.os,
    };
    await dispatch(updateDriverby_adminBy_idAction(updatedDriver, id));
    navigate('/admin/all-driver');
  };
  


  return (

    <Card>
    <Card.Body>
      <h5 className="mb-0 font-weight-bold" style={{ letterSpacing: '0.05em', paddingBottom: '30px' }}>
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
                {...register('firstName', { required: 'First name is required' })}
              />
              {errors.firstName && <p className="text-danger">{errors.firstName.message}</p>}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                {...register('lastName', { required: 'Last name is required' })}
              />
              {errors.lastName && <p className="text-danger">{errors.lastName.message}</p>}
            </Form.Group>
          </Col>
        </Row>

        {/* <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email Address *</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <p className="text-danger">{errors.email.message}</p>}
        </Form.Group> */}

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="cell">
              <Form.Label>Phone Number *</Form.Label>
              <Form.Control
                type="text"
                placeholder="(201) 555-0123"
                {...register('cell', { required: 'Phone number is required' })}
              />
              {errors.cell && <p className="text-danger">{errors.cell.message}</p>}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="license">
              <Form.Label>License Details *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter license details"
                {...register('license', { required: 'License details are required' })}
              />
              {errors.license && <p className="text-danger">{errors.license.message}</p>}
            </Form.Group>
          </Col>
        </Row>

        <h5 className="mt-4 mb-3">Additional Details</h5>

       

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="country">
              <Form.Label>Country *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country"
                {...register('country', { required: 'Country is required' })}
              />
              {errors.country && <p className="text-danger">{errors.country.message}</p>}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="vehicleNumber">
              <Form.Label>Vehicle Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter vehicle number"
                {...register('vehicleNumber')}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="licenseState">
              <Form.Label>State of Issue</Form.Label>
              <Form.Control
                type="text"
                placeholder="CA-California"
                {...register('licenseState')}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="licenseExpiration">
              <Form.Label>Expiration Date</Form.Label>
              <Form.Control
                type="date"
                {...register('licenseExpiration')}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="cargoType">
              <Form.Label>Cargo Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter cargo type"
                {...register('cargoType')}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="os">
              <Form.Label>OS</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter OS number"
                {...register('os')}
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="text-end mt-4">
          <Button type="submit" variant="primary"  className="custom-button">
            update
          </Button>
        </div>
      </Form>
    </Card.Body>
  </Card>
 
  );
}

export default EditDriverby_admin;
