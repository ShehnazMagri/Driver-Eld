import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  // AllVehiclesAction,
 getVehicleDetailsAction,} from "../../Redux/Action/vehicle.js";
import { useNavigate, useParams } from "react-router-dom";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { toast } from "react-toastify";

function VehicleDetails() {
    const {id} =useParams();
  const dispatch = useDispatch();
  const [vehicle, setVehicle] = useState(null); 
//   const { vehicles, pagination } = useSelector((state) => state.vehicle);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getVehicleDetailsAction(id));
        if (response && response.status) {
          const { vichel } = response;
          if (vichel) {
            setVehicle(vichel);
          } else {
            toast.error("Vehicle details not found!");
          }
        }
      } catch (error) {
        toast.error("Failed to fetch vehicle details!");
      }
    };
    fetchData();
  }, [dispatch, id]);


  return (
    <>
     <Container fluid>
      <Row>
        <Col md="12">
          <Card className="mt-4">
            <Card.Body>
              <Card.Title>Vehicle Details</Card.Title>
              {vehicle ? (
                <div>
                  <div className="mb-3">
                    <strong>ID:</strong> {vehicle.id}
                  </div>
                  <div className="mb-3">
                    <strong>Name:</strong> {vehicle.name}
                  </div>
                  <div className="mb-3">
                    <strong>Vehicle Number:</strong> {vehicle.vehicleNumber}
                  </div>
                  {/* <div className="mb-3">
                    <strong>Created At:</strong> {vehicle.createdAt}
                  </div>
                  <div className="mb-3">
                    <strong>Updated At:</strong> {vehicle.updatedAt}
                  </div>
                  <div className="mb-3">
                    <strong>User ID:</strong> {vehicle.userId}
                  </div> */}
                  <Button variant="primary" onClick={() => window.history.back()}>
                    Back
                  </Button>
                </div>
              ) : (
                <p>No vehicle details available</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default VehicleDetails;
