import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { addVehicleAction, createTask, getVehiclesByOwnerAction } from "../../Redux/Action/vehicle.js";
import { toast } from "react-toastify";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AssignVehicleDriverForm from "../owner/assignvehicledriver.js";
import { getDriversByOwnerAction } from "../../Redux/Action/driver.js";

const CreateTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [driverDropdown, setDriverDropdown] = useState([]);
  const [vehicleDropdown, setVehicleDropdown] = useState([]);
  const loginuserlist = useSelector(
    (state) => state.login.loginuserlist.user || []
  );
  const { register, handleSubmit, reset , formState :{errors}} = useForm();
  const onSubmit = async (data) => {
    try {
        const response = await dispatch(createTask(data))
        if(response) {
            reset()
        }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDriverDropdown = async() => {
    try {
        const userId = loginuserlist.id;
        const response = await dispatch(getDriversByOwnerAction({ userId }));
        if (response.payload.status === true) {
          setDriverDropdown(response.payload.drivers);
        }
    } catch (error) {
        console.log(error)
    }
  }

  const handleVehicleDropdown = async() => {
    try {
        const userId = loginuserlist.id;
        const response = await dispatch(getVehiclesByOwnerAction(userId));
        if (response.status === true) {
          setVehicleDropdown(response.vichels);
        }
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <div className="custom-bg py-3 py-md-5">
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={11} lg={8} xl={7} xxl={6}>
            <div className="custom-card p-4 p-md-5">
              <Row>
                <Col xs={12}>
                  <div className="mb-5">
                    <h3>Create Tasks</h3>
                  </div>
                </Col>
              </Row>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="gy-3 gy-md-4 overflow-hidden">
                  <Col xs={12}>
                    <Form.Label htmlFor="name">Name</Form.Label>
                    <Form.Control
                      type="text"
                      id="name"
                      placeholder="Enter task name"
                      {...register("taskName", { required: true })}
                      />
                      {errors.taskName && <p>Name is required!</p>}
                  </Col>
                  <Col xs={12}>
                    <Form.Label htmlFor="vehicleNumber">Description</Form.Label>
                    <Form.Control
                      type="text"
                      id="vehicleNumber"
                      placeholder="Enter task description"
                      {...register("description", { required: true })}
                    />
                    {errors.description && <p>description is required!</p>}
                  </Col>
                  <Col xs={12}>
                    <Form.Label htmlFor="route">Route</Form.Label>
                    <Form.Control
                      type="text"
                      id="route"
                      placeholder="Enter route details"
                      {...register("route", { required: true })}
                    />
                    {errors.route && <p>Route is required!</p>}
                  </Col>
                  <Col xs={12}>
                    <Form.Group>
                      <Form.Label htmlFor="driver">Assign Driver</Form.Label>
                      <Form.Select id="driver" {...register("driverId")} onClick={handleDriverDropdown}>
                        <option value="">Select a Driver</option>
                        {driverDropdown.map((driver, index) => (
                            <option key={index} value={driver.id}>{driver.username}</option>
                        ))}
                        {/* Add more options as needed */}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group>
                      <Form.Label htmlFor="task">Assign Vehicle</Form.Label>
                      <Form.Select id="task" {...register("vehicleId")} onClick={handleVehicleDropdown}>
                        <option value="">Select a vehicle</option>
                        {vehicleDropdown.map((vehicle, index) => (
                            <option key={index} value={vehicle.id}>{vehicle.name}</option>
                        ))}
                        {/* Add more options as needed */}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <div className="d-grid">
                      <Button className="custom-button" type="submit">
                        Create Task
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
        <Col md="6" className="text-left">
          {showAssignForm && <AssignVehicleDriverForm />}
        </Col>
      </Container>
    </div>
  );
}

export default CreateTask;
