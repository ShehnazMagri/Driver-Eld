import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import {
  assignVehicleToDriverAction,
  getTaskByOwnerId,
  getVehiclesByOwnerAction,
} from "../../Redux/Action/vehicle";
import { getDriversByOwnerAction } from "../../Redux/Action/driver";
import { getloginuserAction } from "../../Redux/Action/adminauth";

function AssignVehicleDriverForm() {
  const dispatch = useDispatch();
  const loginuserlist = useSelector((state) => state.login.loginuserlist || []);
  const { drivers } = useSelector((state) => state.driver);
  const { vehicles } = useSelector((state) => state.vehicle);
  const [taskOption, setTaskOption] = useState([]);

  const { register, handleSubmit,reset, formState: { errors },watch, setValue } = useForm();

  useEffect(() => {
    dispatch(getloginuserAction());
  }, [dispatch]);

  useEffect(() => {
    if (loginuserlist?.status && loginuserlist.user) {
      const userId = loginuserlist.user.id;
      if (userId) {
        dispatch(getDriversByOwnerAction({ userId }));
        dispatch(getVehiclesByOwnerAction(userId, 1, 10));
      } else {
        toast.error("User ID is not available.");
      }
    }
  }, [loginuserlist, dispatch]);

  const onSubmit = async (data) => {
    // const { driverId, vehicleId,taskId } = data;
    const result = await dispatch(assignVehicleToDriverAction(data));
    if (result.status) {
      console.log("Vehicle assigned successfully:", result.message);
      reset();
    } else {
      console.log("Failed to assign vehicle:", result.message);
    }
  };

  const handleTaskDropdown = async () => {
    try {
      const response = await dispatch(
        getTaskByOwnerId(loginuserlist?.user?.id)
      );
      if (response.status === true) {
        setTaskOption(response.tasks);
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
                    <h3>Assign Driver to Vehicle</h3>
                  </div>
                </Col>
              </Row>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="gy-3 gy-md-4 overflow-hidden">
                  <Col xs={12}>
                    <Form.Group>
                      <Form.Label htmlFor="driverId">Select Driver</Form.Label>
                      <Form.Select
                        {...register("driverId", {
                          required: "Driver is required",
                        })}
                        id="driverId"
                      >
                        <option value="">Select Driver</option>
                        {drivers.length > 0 ? (
                          drivers.map((driver) => (
                            <option key={driver.id} value={driver.id}>
                              {driver.username}
                            </option>
                          ))
                        ) : (
                          <option value="">No drivers available</option>
                        )}
                      </Form.Select>
                      {errors.driverId && (
                        <span className="text-danger">
                          {errors.driverId.message}
                        </span>
                      )}
                    </Form.Group>
                  </Col>
                  {/* Vehicle Dropdown */}
                  <Col xs={12}>
                    <Form.Group>
                      <Form.Label htmlFor="vehicleId">
                        Select Vehicle
                      </Form.Label>
                      <Form.Select
                        {...register("vehicleId", {
                          required: "Vehicle is required",
                        })}
                        id="vehicleId"
                      >
                        <option value="">Select Vehicle</option>
                        {vehicles.length > 0 ? (
                          vehicles.map((vehicle) => (
                            <option key={vehicle.id} value={vehicle.id}>
                              {vehicle.vehicleNumber}
                            </option>
                          ))
                        ) : (
                          <option value="">No vehicles available</option>
                        )}
                      </Form.Select>
                      {errors.vehicleId && (
                        <span className="text-danger">
                          {errors.vehicleId.message}
                        </span>
                      )}
                    </Form.Group>
                  </Col>

                  {/* Task Dropdown */}
                  <Col xs={12}>
                    <Form.Group>
                      <Form.Label htmlFor="taskId">Assign Task</Form.Label>
                      <Form.Select
                        {...register("taskId", {
                          required: "Task is required",
                        })}
                        id="taskId"
                        onClick={handleTaskDropdown}
                      >
                        <option value="">Select a Task</option>{" "}
                        {taskOption
                          .filter((task) => task.status === "unassigned")
                          .map((task) => (
                            <option key={task.id} value={task.id}>
                              {task.taskName}
                            </option>
                          ))}
                      </Form.Select>
                      {errors.taskId && (
                        <span className="text-danger">
                          {errors.taskId.message}
                        </span>
                      )}
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <div className="d-grid">
                      <Button className="custom-button" type="submit">
                        Assign Driver to Vehicle
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AssignVehicleDriverForm;
