import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVehicleAction, getTaskByOwnerId } from "../../Redux/Action/vehicle.js";
import { toast } from "react-toastify";
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AssignVehicleDriverForm from "../owner/assignvehicledriver.js";
import { getDriversByOwnerAction } from "../../Redux/Action/driver.js";
import { useForm } from "react-hook-form"; // Import useForm

function AddVehicle() {
  const dispatch = useDispatch();
  const loginuserlist = useSelector(
    (state) => state.login.loginuserlist.user || []
  );
  const { register, handleSubmit, formState: { errors }, reset } = useForm(); // Initialize useForm
  const navigate = useNavigate();
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [driverDropdown, setDriverDropdown] = useState([]);
  const [taskOption, setTaskOption] = useState([]);

  const handleDriverDropdown = async () => {
    try {
      const response = await dispatch(addVehicleAction(formData));
      if (response.data.status) {
        // toast.success("Vehicle added successfully!");
        setFormData({
          name: "",
          vehicleNumber: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddVehicle = () => {
    navigate("/owner/adddriver");
  };

  const handleAssignDriverClick = () => {
    setShowAssignForm(!showAssignForm);
  };

  return (
    <>
      <div className="custom-bg py-3 py-md-5">
        <Container>
          <Row className="justify-content-md-center">
            <Col xs={12} md={11} lg={8} xl={7} xxl={6}>
              <div className="custom-card p-4 p-md-5">
                <Row>
                  <Col xs={12}>
                    <div className="mb-5">
                      <h3>Add Vehicle</h3>
                    </div>
                  </Col>
                </Row>
                {/* Use handleSubmit from React Hook Form */}
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row className="gy-3 gy-md-4 overflow-hidden">
                    <Col xs={12}>
                      <Form.Label htmlFor="name">Vehicle Name</Form.Label>
                      <Form.Control
                        type="text"
                        id="name"
                        placeholder="Enter vehicle name"
                        {...register("name", { required: true })} // Register field
                      />
                      {errors.name && <span className="text-danger">Vehicle Name is required</span>}
                    </Col>
                    <Col xs={12}>
                      <Form.Label htmlFor="vehicleNumber">Vehicle Number</Form.Label>
                      <Form.Control
                        type="text"
                        id="vehicleNumber"
                        placeholder="Enter vehicle number"
                        {...register("vehicleNumber", { required: true })} // Register field
                      />
                      {errors.vehicleNumber && <span className="text-danger">Vehicle Number is required</span>}
                    </Col>
                    <Col xs={12}>
                      <Form.Group>
                        <Form.Label htmlFor="assignDriver">Assign Driver</Form.Label>
                        <Form.Select
                          id="assignDriver"
                          {...register("driverId")} // Register field
                          onClick={handleDriverDropdown}
                        >
                          <option value="">Select a Driver</option>
                          {driverDropdown.map((driver, index) => (
                            <option key={index} value={driver.id}>
                              {driver.username}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group>
                        <Form.Label htmlFor="assignTask">Assign Task</Form.Label>
                        <Form.Select
                          id="assignTask"
                          {...register("taskId")} // Register field
                          onClick={handleTaskDropdown}
                        >
                          <option value="">Select a Task</option>
                          {taskOption
                            .filter((task) => task.status === "unassigned")
                            .map((task, index) => (
                              <option key={index} value={task.id}>
                                {task.taskName}
                              </option>
                            ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <div className="d-grid">
                        <Button className="custom-button" type="submit">
                          Add Vehicle
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
        <Col md="6" className="text-left">
          {showAssignForm && <AssignVehicleDriverForm />}
        </Col>
      </div>
    </>
  );
}

export default AddVehicle;
