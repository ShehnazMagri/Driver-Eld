import { useEffect, useState } from "react";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { assignDriverToVehicle, getAllDataByOwnerAction } from "../../../Redux/Action/adminauth";

const AssignVehicleDriver = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [drivers, setDrivers] = useState([]);
    
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();


    const onSubmit = (data) => {
        try {
            setLoading(true)
            const response = dispatch(assignDriverToVehicle(data))
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchDriverData = async () => {
        try {
            const response = await dispatch(getAllDataByOwnerAction("Driver"));
            if (response.status === 200) {
                setDrivers(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching drivers:", error);
        }
    };

    const fetchVehicleData = async () => {
        try {
            const response = await dispatch(getAllDataByOwnerAction("Vichel"));
            if (response.status === 200) {
                setVehicles(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching vehicles:", error);
        }
    };

    useEffect(() => {
        fetchDriverData();
        fetchVehicleData();
    }, [dispatch]);

    return (
        <Card>
        <Card.Body>
          <h5 className="mb-0 font-weight-bold" style={{ letterSpacing: '0.05em', paddingBottom: '30px' }}>
            Assign Driver to Vehicle
          </h5>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Form.Group style={{ marginBottom: '20px' }}>
                <Form.Label>Select Driver</Form.Label>
                <Form.Control
                  as="select"
                  {...register('driverId', { required: 'Please select a driver' })}
                >
                  <option value="">Select Driver</option>
                  { drivers.filter((elem) => elem.status === 'pending').length > 0 ? (
                    drivers.filter((elem) => elem.status === 'pending').map((driver) => (
                      <option key={driver.id} value={driver.id}>
                        {driver.firstName} {driver.lastName}
                      </option>
                    ))
                  ) : (
                    <option disabled>No drivers available</option>
                  )}
                </Form.Control>
                {errors.driverId && <p className="text-danger">{errors.driverId.message}</p>}
              </Form.Group>
      
              <Form.Group style={{ marginBottom: '20px' }}>
                <Form.Label>Select Vehicle</Form.Label>
                <Form.Control
                  as="select"
                  {...register('vehicleId', { required: 'Please select a vehicle' })}
                >
                  <option value="">Select Vehicle</option>
                  { vehicles.filter((elem) => elem.status === 'pending').length > 0 ? (
                    vehicles.filter((elem) => elem.status === 'pending').map((vehicle) => (
                      <option key={vehicle.id} value={vehicle.id}>
                        {vehicle.vehicleNumber}
                      </option>
                    ))
                  ) : (
                    <option disabled>No vehicles available</option>
                  )}
                </Form.Control>
                {errors.vehicleId && <p className="text-danger">{errors.vehicleId.message}</p>}
              </Form.Group>
            </div>
      
            <div className="text-right mt-4">
              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                className={`custom-button ${loading ? 'loading-state' : ''}`}
                style={{
                  color: loading ? 'black' : 'white',
                  backgroundColor: loading ? '#846CF9' : '',
                }}
              >
                {loading ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />{' '}
                    Assigning...
                  </>
                ) : (
                  'Assign Driver'
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      
      
      
    
    );
};

export default AssignVehicleDriver;
