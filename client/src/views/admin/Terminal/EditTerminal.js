import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Row, Col, Card, Spinner, Form } from 'react-bootstrap';
import { Navigate, useNavigate, useParams } from 'react-router-dom'; // Importing useParams
import { useDispatch, useSelector } from 'react-redux';
import { getterminal_IdAction, updateterminalAction } from '../../../Redux/Action/adminauth';

const EditTerminal = () => {
  const { id } = useParams(); // Access the terminal ID from URL params
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // React Hook Form setup
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      terminalName: '',
      terminalAddress: '',
      timezone: '',
      terminalContact: '',
    },
  });
  const terminal = useSelector((state) => state.login.getid_terminalbyIdlist);
  const [loading, setLoading] = useState(false); // Manage loading state

  useEffect(() => {
    if (id) {
      dispatch(getterminal_IdAction(id)); // Fetch terminal data
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (terminal) {
      // Populate the form with existing terminal data
      setValue('terminalName', terminal.terminalName || '');
      setValue('terminalAddress', terminal.terminalAddress || '');
      setValue('terminalTimeZone', terminal.terminalTimeZone || '');
      setValue('terminalContact', terminal.terminalContact || '');
    }
  }, [terminal, setValue]);


  const onSubmit = async (data) => {
    const updatedterminal = {
      terminalName: data.terminalName,
      terminalTimeZone: data.terminalTimeZone,
      terminalAddress: data.terminalAddress,
      terminalContact: data.terminalContact,
    };
    setLoading(true); // Set loading state before the update
    await dispatch(updateterminalAction(updatedterminal, id)); // Dispatch the update action
    navigate('/admin/all-terminal');
    setLoading(false);
  };

  
  return (
    <Card>
      <Card.Body>
        <h5
          className="mb-0 font-weight-bold"
          style={{ letterSpacing: '0.05em', paddingBottom: '30px' }}
        >
          Edit Terminal
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
              
            >
              <option value="">Select Timezone</option>
              <option value="PST">Pacific Standard Time (PST)</option>
              <option value="EST">Eastern Standard Time (EST)</option>
              <option value="CST">Central Standard Time (CST)</option>
            </Form.Control>
           
          </Form.Group>

          <Form.Group controlId="terminalContact" className="mb-3">
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
            <Button type="submit" variant="primary" disabled={loading} className="custom-button">
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />{' '}
                  Submitting...
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
};

export default EditTerminal;
