import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Row, Col, Card, Spinner, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { gettrailers_IdAction, updatetrailersAction } from '../../../Redux/Action/adminauth';
import { useParams, useNavigate } from "react-router-dom";

const EditTrailers = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const { id } = useParams();
    const trailers = useSelector((state) => state.login.gettrailers_urllistby_id.trailer);
    console.log(trailers,'trailerstrailers')

    useEffect(() => {
        dispatch(gettrailers_IdAction(id));
    }, [dispatch, id]);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            trailerNumber: "",
            vin: "",
            trailerManufacturer: "",
            model: "",
            numberOfAxels: "",
            licenseAuthority: "",
            ownershipType: "",
            licensePlateNumber: "",
            gvwr: "",
            length: "",
            trailerType: "",
        }
    });

    useEffect(() => {
        if (trailers) {
            // Populate the form with existing trailer data
            setValue('trailerNumber', trailers.trailerNumber || '');
            setValue('vin', trailers.vin || '');
            setValue('trailerManufacturer', trailers.trailerManufacturer || '');
            setValue('model', trailers.model || '');
            setValue('numberOfAxels', trailers.numberOfAxels || '');
            setValue('licenseAuthority', trailers.licenseAuthority || '');
            setValue('ownershipType', trailers.ownershipType || '');
            setValue('licensePlateNumber', trailers.licensePlateNumber || '');
            setValue('gvwr', trailers.gvwr || '');
            setValue('length', trailers.length || '');
            setValue('trailerType', trailers.trailerType || '');
        }
    }, [trailers, setValue]);

    const onSubmit = async (data) => {
        console.log(data,"datatadtad")
        const updatedTrailers = {
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

        setLoading(true); // Set loading state before the update
        await dispatch(updatetrailersAction(data, id)); // Dispatch the update action
        setLoading(false); // Reset loading after submission
      
    };

    return (
        <Card>
            <Card.Body>
                <h5 className="mb-0 font-weight-bold" style={{ letterSpacing: '0.05em', paddingBottom: '30px' }}>
                    Edit Trailer
                </h5>

                {/* Form */}
                <Form onSubmit={handleSubmit(onSubmit)}>
                    {/* Trailer Number */}
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="trailerNumber">
                                <Form.Label>Trailer Number *</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter trailer number"
                                    {...register('trailerNumber', { required: 'Trailer Number is required' })}
                                />
                                {errors.trailerNumber && <p className="text-danger">{errors.trailerNumber.message}</p>}
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* VIN */}
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="vin">
                                <Form.Label>VIN *</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter VIN"
                                    {...register('vin', { required: 'VIN is required' })}
                                />
                                {errors.vin && <p className="text-danger">{errors.vin.message}</p>}
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Trailer Manufacturer */}
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="trailerManufacturer">
                                <Form.Label>Trailer Manufacturer *</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter manufacturer"
                                    {...register('trailerManufacturer', { required: 'Manufacturer is required' })}
                                />
                                {errors.trailerManufacturer && <p className="text-danger">{errors.trailerManufacturer.message}</p>}
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Model */}
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="model">
                                <Form.Label>Model *</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter model"
                                    {...register('model', { required: 'Model is required' })}
                                />
                                {errors.model && <p className="text-danger">{errors.model.message}</p>}
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Number of Axels */}
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="numberOfAxels">
                                <Form.Label>Number of Axels *</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter number of axels"
                                    {...register('numberOfAxels', { required: 'Number of Axels is required' })}
                                />
                                {errors.numberOfAxels && <p className="text-danger">{errors.numberOfAxels.message}</p>}
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* License Authority */}
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="licenseAuthority">
                                <Form.Label>License Authority *</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter license authority"
                                    {...register('licenseAuthority', { required: 'License Authority is required' })}
                                />
                                {errors.licenseAuthority && <p className="text-danger">{errors.licenseAuthority.message}</p>}
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Ownership Type */}
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="ownershipType">
                                <Form.Label>Ownership Type *</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter ownership type"
                                    {...register('ownershipType', { required: 'Ownership Type is required' })}
                                />
                                {errors.ownershipType && <p className="text-danger">{errors.ownershipType.message}</p>}
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* License Plate Number */}
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="licensePlateNumber">
                                <Form.Label>License Plate Number *</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter license plate number"
                                    {...register('licensePlateNumber', { required: 'License Plate Number is required' })}
                                />
                                {errors.licensePlateNumber && <p className="text-danger">{errors.licensePlateNumber.message}</p>}
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* GVWR */}
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="gvwr">
                                <Form.Label>GVWR (lbs) *</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter GVWR"
                                    {...register('gvwr', { required: 'GVWR is required' })}
                                />
                                {errors.gvwr && <p className="text-danger">{errors.gvwr.message}</p>}
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Length */}
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="length">
                                <Form.Label>Length (ft) *</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter trailer length"
                                    {...register('length', { required: 'Length is required' })}
                                />
                                {errors.length && <p className="text-danger">{errors.length.message}</p>}
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Trailer Type */}
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="trailerType">
                                <Form.Label>Trailer Type *</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter trailer type"
                                    {...register('trailerType', { required: 'Trailer Type is required' })}
                                />
                                {errors.trailerType && <p className="text-danger">{errors.trailerType.message}</p>}
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Submit Button */}
                    <div className="text-end">
                        <Button type="submit" variant="primary" disabled={loading} className="custom-button">
                            {loading ? (
                                <>
                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    Saving...
                                </>
                            ) : (
                                'Update Trailer'
                            )}
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default EditTrailers;
