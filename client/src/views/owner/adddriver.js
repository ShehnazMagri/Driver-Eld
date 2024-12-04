import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { addDriverAction } from "../../Redux/Action/driver";
import { toast } from "react-toastify";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AssignVehicleDriverForm from "./assignvehicledriver";
import { getTaskByOwnerId, getVehiclesByOwnerAction } from "../../Redux/Action/vehicle";

function AddDriverForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [taskOption, setTaskOption] = useState([]);
  const [vehicleDropdown, setVehicleDropdown] = useState([]);
  const loginuserlist = useSelector((state) => state.login.loginuserlist.user || []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm();

  useEffect(() => {
    if (loginuserlist.id) {
      handleVehicleDropdown();
      handleTaskDropdown();
    }
  }, [loginuserlist]);

  const onSubmit = (data) => {
    dispatch(addDriverAction({ ...data, role: "driver" }));
    reset()
    // toast.success("Driver added successfully!");
  };

  const handleAssignDriverClick = () => {
    setShowAssignForm(!showAssignForm);
  };

  const handleTaskDropdown = async () => {
    try {
      const response = await dispatch(getTaskByOwnerId(loginuserlist.id));
      if (response.status === true) {
        setTaskOption(response.tasks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleVehicleDropdown = async () => {
    try {
      const response = await dispatch(getVehiclesByOwnerAction(loginuserlist.id));
      if (response.status === true) {
        setVehicleDropdown(response.vichels);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="custom-bg py-3 py-md-5">
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={12} lg={8} xl={7} xxl={6}>
            <div className="custom-card p-4 p-md-5">
              <Row>
                <Col xs={12}>
                  <div className="mb-5">
                    <h3>Add Driver</h3>
                  </div>
                </Col>
              </Row>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="gy-3 gy-md-4 overflow-hidden">
                  <Col xs={12}>
                    <Form.Label htmlFor="username">Username</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("username", { required: "Username is required" })}
                      id="username"
                      placeholder="Username"
                    />
                    {errors.username && <span className="text-danger">{errors.username.message}</span>}
                  </Col>

                  <Col xs={12}>
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email address",
                        },
                      })}
                      id="email"
                      placeholder="name@example.com"
                    />
                    {errors.email && <span className="text-danger">{errors.email.message}</span>}
                  </Col>

                  <Col xs={12}>
                    <Form.Group>
                      <Form.Label htmlFor="vehicleNumber">Assign Vehicle</Form.Label>
                      <Form.Select {...register("vehicleNumber")} onClick={handleVehicleDropdown}>
                        <option value="">Select a vehicle</option>
                        {vehicleDropdown?.map((vehicle, index) => (
                          <option key={index} value={vehicle.id}>
                            {vehicle.name} ---------- {vehicle.vehicleNumber}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col xs={12}>
                    <Form.Group>
                      <Form.Label htmlFor="taskId">Assign Task</Form.Label>
                      <Form.Select {...register("taskId")} onClick={handleTaskDropdown}>
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
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control
                      type="password"
                      {...register("password", { required: "Password is required" })}
                      id="password"
                      placeholder="Password"
                    />
                    {errors.password && <span className="text-danger">{errors.password.message}</span>}
                  </Col>

                  <Col xs={12}>
                    <div className="d-grid">
                      <Button className="custom-button" type="submit">
                        Add Driver
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
  );
}

export default AddDriverForm;
