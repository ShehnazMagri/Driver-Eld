import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Form,
  Dropdown,
  Table,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import format from 'date-fns/format';
import { useDispatch } from "react-redux";
import { addFuel, getFuelByDate } from "../../Redux/Action/driver";

const AddFuelDetails = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const dispatch = useDispatch();
  const [fillingDateTime, setFillingDateTime] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [fuelHistory, setFuelHistory] = useState([]);
  const [showFuelHistory, setShowFuelHistory] = useState(false); 

  const onSubmit = async (data) => {
    try {
      const formattedDate = fillingDateTime ? format(fillingDateTime, "yyyy-MM-dd HH:mm") : null;
      data.fillingDateTime = formattedDate;
      const response = await dispatch(addFuel(data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFuelByDate = async (date) => {
    try {
      setFuelHistory([]);
      if (date) {
        const formattedDate = format(date, 'yyyy-MM-dd');
        setStartDate(formattedDate);

        const response = await dispatch(getFuelByDate(formattedDate));

        if (response?.payload?.status === true) {
          setFuelHistory(response.payload.fuelData);
          setShowCalendar(false);
          setShowFuelHistory(true); // Show fuel history dropdown
        } else {
          console.log('No fuel data available for the selected date.');
        }
      } else {
        console.log('No date selected');
      }
    } catch (error) {
      console.error('Error fetching fuel history:', error);
    }
  };

  return (
    <Container>
      <Row className="my-3">
        <Col>
          <Button variant="primary" onClick={() => setShowCalendar(prev => !prev)}>
            {showCalendar ? 'Close' : 'Fuel History'}
          </Button>
          {showFuelHistory && (
            <Button variant="secondary" onClick={() => setShowFuelHistory(false)} style={{marginLeft:'10px'}} >
            Back
          </Button>
          )}
          {showCalendar && (
            <div style={{ position: 'absolute', zIndex: 11, marginTop: '20px' }}>
              <DatePicker
                selected={startDate}
                onChange={handleFuelByDate}
                inline
              />
            </div>
          )}
        </Col>
      </Row>

      {showFuelHistory ? (
        <>
          {fuelHistory.length > 0 && (
            <Row>
              <div style={{ position: 'absolute', zIndex: 10, marginTop: '10px' }}>
                <Col>
                  <Card>
                    <Card.Header>Fuel History</Card.Header>
                    <Card.Body>
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          Select Fuel Entry
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {fuelHistory.map((fuel, index) => (
                            <Dropdown.Item key={fuel.id}>
                              Fuel Quantity: {fuel.fuelQuantity} L | Amount: ${fuel.fuelAmount} | Date: {new Date(fuel.fillingDateTime).toLocaleDateString()}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>

                      <Table striped bordered hover responsive className="mt-3">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Fuel Quantity (L)</th>
                            <th>Fuel Amount ($)</th>
                            <th>Filling Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {fuelHistory.map((fuel, index) => (
                            <tr key={fuel.id}>
                              <td>{index + 1}</td>
                              <td>{fuel.fuelQuantity} L</td>
                              <td>$ {fuel.fuelAmount}</td>
                              <td>{new Date(fuel.fillingDateTime).toLocaleDateString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </Col>
              </div>
            </Row>
          )}
        </>
      ) : (
        <>
          <Row className="justify-content-md-center">
            <Col md={6}>
              <h2>Add Fuel Details</h2>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="fuelQuantity">
                  <Form.Label>Fuel Quantity (liters)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter fuel quantity"
                    {...register("fuelQuantity", { required: "Fuel quantity is required" })}
                  />
                  {errors.fuelQuantity && (
                    <Form.Text className="text-danger">{errors.fuelQuantity.message}</Form.Text>
                  )}
                </Form.Group>

                <Form.Group controlId="fuelAmount">
                  <Form.Label>Fuel Amount ($)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter fuel amount"
                    {...register("fuelAmount", { required: "Fuel amount is required" })}
                  />
                  {errors.fuelAmount && (
                    <Form.Text className="text-danger">{errors.fuelAmount.message}</Form.Text>
                  )}
                </Form.Group>

                <Form.Group controlId="fillingDateTime">
                  <Form.Label>Filling Date & Time</Form.Label>
                  <DatePicker
                    selected={fillingDateTime}
                    onChange={(date) => {
                      setFillingDateTime(date);
                      setValue("fillingDateTime", date);
                    }}
                    showTimeSelect
                    dateFormat="Pp"
                    placeholderText="Select filling date & time"
                    className="form-control"
                  />
                  {errors.fillingDateTime && (
                    <Form.Text className="text-danger">{errors.fillingDateTime.message}</Form.Text>
                  )}
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default AddFuelDetails;
