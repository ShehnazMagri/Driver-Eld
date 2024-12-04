import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Row, Col, Card, Spinner, Form } from 'react-bootstrap';
import { TerminalAction } from '../../../Redux/Action/adminauth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const AddTerminal = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const navigate =useNavigate();
    const dispatch = useDispatch();
    const onSubmit = async (data) => {
        setLoading(true);
        try {
            console.log("Form Data:", data);
            const newTerminalData = {
                terminalName: data.terminalName,
                terminalTimeZone: data.timezone,
                terminalAddress: data.terminalAddress,
                terminalContact: data.terminalContact
            };
            await dispatch(TerminalAction(newTerminalData,navigate));
            reset(); 
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
                <h5 className="mb-0 font-weight-bold" style={{ letterSpacing: '0.05em', paddingBottom: '30px' }}>
                    Add New Terminal
                </h5>

                {/* Form */}
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="terminalName">
                                <Form.Label>Terminal Name *</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Type here..."
                                    {...register('terminalName', { required: 'Terminal Name is required' })}
                                />
                                {errors.terminalName && <p className="text-danger">{errors.terminalName.message}</p>}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="terminalAddress">
                                <Form.Label>Terminal Address *</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Type here..."
                                    {...register('terminalAddress', { required: 'Terminal Address is required' })}
                                />
                                {errors.terminalAddress && <p className="text-danger">{errors.terminalAddress.message}</p>}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId="timezone" className="mb-3">
                        <Form.Label>Timezone *</Form.Label>
                        <Form.Control
                            as="select"
                            {...register('timezone', { required: 'Timezone is required' })}
                        >
                            <option value="">Select Timezone</option>
                            <option value="PST">Pacific Standard Time (PST)</option>
                            <option value="EST">Eastern Standard Time (EST)</option>
                            <option value="CST">Central Standard Time (CST)</option>
                        </Form.Control>
                        {errors.timezone && <p className="text-danger">{errors.timezone.message}</p>}
                    </Form.Group>

                    <Form.Group controlId="contact" className="mb-3">
                        <Form.Label>Select Terminal Contact *</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter contact info"
                            {...register('terminalContact', { required: 'Contact info is required' })}
                        />
                        {errors.terminalContact && <p className="text-danger">{errors.terminalContact.message}</p>}
                    </Form.Group>

                    {/* Submit Button */}
                    <div className="text-end">
                        <Button type="submit" variant="primary" disabled={loading} 
                        // className="custom-button"
                        className={`custom-button ${loading ? 'loading-state' : ''}`}
                        style={{
                            color: loading ? 'black' : 'white',   
                            backgroundColor: loading ? '#846CF9' : ''
                          }}
                        >
                            {loading ? (
                                <>
                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />{' '}
                                    Submitting...
                                </>
                            ) : (
                                'Add Terminal'
                            )}
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default AddTerminal;
