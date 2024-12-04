import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  // AllVehiclesAction,
  getVehiclesByOwnerAction,
  deleteVehicleAction,
} from "../../Redux/Action/vehicle.js";
import { getloginuserAction } from "../../Redux/Action/adminauth.js";
import { useNavigate } from "react-router-dom";
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

function Vehicles() {
  const dispatch = useDispatch();
  const { vehicles, pagination, loading, error } = useSelector(
    (state) => state.vehicle
  );
  const navigate = useNavigate();
  const loginuserlist = useSelector((state) => state.login.loginuserlist || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  useEffect(() => {
    dispatch(getloginuserAction());
  }, [dispatch]);
  useEffect(() => {}, [loginuserlist]);

  useEffect(() => {
    if (loginuserlist?.status && loginuserlist.user) {
      const userId = loginuserlist.user.id;
      if (userId) {
        dispatch(getVehiclesByOwnerAction(userId, currentPage, pageSize));
      } else {
        toast.error("User data is not available.");
      }
    }
  }, [loginuserlist, dispatch, currentPage, pageSize]);

  const sortedVehicles = vehicles
    ? vehicles
        .slice()
        .sort((a, b) => new Date(b.idleEventStart) - new Date(a.idleEventStart))
    : [];

  const handleEdit = (id) => {
    navigate(`/owner/updatevehicle/${id}`);
  };

  const handleView = (id) => {
    navigate(`/owner/vehicledetails/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteVehicleAction(id));
    }
  };

  // Dynamic message based on vehicle data
  const subtitleMessage = sortedVehicles.length
    ? "Here is the list of your vehicles."
    : "No vehicles found. Please add a vehicle.";

  const handleAddVehicle = () => {
    navigate("/owner/addvehicles");
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {/* <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title as="h4">Vehicles List</Card.Title>
                  <p className="card-category">{subtitleMessage}</p>
                </div>
                <button className="btn btn-primary" onClick={handleAddVehicle}>
                  <i className="fa fa-plus fa-lg"></i> Add Vehicle
                </button>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">SR</th>
                      <th className="border-0">Vehicle</th>
                      <th className="border-0">Idle Event Start</th>
                      <th className="border-0">Idle Event End</th>
                      <th className="border-0">Idle Event Duration</th>
                      <th className="border-0">Pro Status</th>
                      <th className="border-0">Fuel Used</th>
                      <th className="border-0">Address</th>
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedVehicles.length > 0 ? (
                      sortedVehicles.map((vehicle,index) => (
                        <tr key={vehicle.id}>
                          <td>{index+1}</td>
                          <td>{vehicle.name}</td>
                          <td>{vehicle.idleEventStart}</td>
                          <td>{vehicle.idleEventEnd}</td>
                          <td>{vehicle.idleEventDuration}</td>
                          <td>{vehicle.proStatus}</td>
                          <td>{vehicle.fuelUsed}</td>
                          <td>{vehicle.vehicleNumber}</td>
                          <td>
                            <button
                              className="btn btn-warning btn-sm mr-2"
                              onClick={() => handleEdit(vehicle.id)}
                            >
                              <i className="fa fa-edit fa-lg"></i>
                            </button>
                            <button
                              className="btn btn-danger btn-sm mr-2"
                              onClick={() => handleDelete(vehicle.id)}
                            >
                              <i className="fa fa-trash fa-lg"></i>
                            </button>
                            <button
                              className="btn btn-info btn-sm "
                              onClick={() => handleView(vehicle.id)}
                            >
                              <i className="fa fa-eye fa-lg"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center">
                          No vehicles available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>

                <div className="text-center">
                  <nav aria-label="Page navigation">
                    <ul className="pagination pagination-sm justify-content-center">
                      {pagination?.totalPages > 1 &&
                        Array.from(
                          { length: pagination.totalPages },
                          (_, index) => (
                            <li
                              className={`page-item ${
                                index + 1 === currentPage ? "active" : ""
                              }`}
                              key={index}
                              onClick={() => handlePageChange(index + 1)}
                            >
                              <button className="page-link">{index + 1}</button>
                            </li>
                          )
                        )}
                    </ul>
                  </nav>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container> */}
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <div>
                  <h4>Assets</h4>
                </div>
                <div className="d-flex align-items-center">
                  <input
                    type="text"
                    placeholder="Search by driver name or vehicle"
                    className="form-control mr-2"
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handleAddVehicle}
                  >
                    <i className="fa fa-plus"></i> Add Vehicle
                  </button>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="mb-3">
                  <button className="btn btn-link active">Vehicles</button>
                  <button className="btn btn-link">Trailers</button>
                </div>
                <Table hover className="mb-0">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Unit no.</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>Current Driver</th>
                      <th>Last Trip</th>
                      <th>VIN Number</th>
                      <th>Created At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedVehicles.length > 0 ? (
                      sortedVehicles.map((vehicle, index) => (
                        <tr key={vehicle.id}>
                          <td>
                            <input type="checkbox" />
                          </td>
                          <td>{vehicle.name}</td>
                          <td>
                            <i className="fa fa-map-marker-alt text-success"></i>{" "}
                            {vehicle.location || "NA"}
                          </td>
                          <td>
                            <span
                              className={`badge bg-${getStatusColor(
                                vehicle.status
                              )}`}
                            >
                              {vehicle.status || "No Connection"}
                            </span>
                          </td>
                          <td>{vehicle.currentDriver || "---"}</td>
                          <td>{formatLastTrip(vehicle.lastTrip)}</td>
                          <td>{vehicle.vinNumber}</td>
                          <td>{formatDate(vehicle.createdAt)}</td>
                          <td>
                            <button
                              // className="btn btn-custom-view btn-link btn-sm"
                              //  class="btn-simple btn-link p-1 btn btn-secondary"
                                className="btn btn-secondary btn-link p-1"
                              onClick={() => handleView(vehicle.id)}
                            >
                              <i className="fa fa-eye"></i>
                            </button>
                            <button
                              // className="btn btn-custom-edit btn-link btn-sm"
                              // className="btn-simple btn-link p-1 btn btn-success"
                               className="btn btn-success btn-link p-1"
                              onClick={() => handleEdit(vehicle.id)}
                            >
                              <i className="fa fa-edit"></i>
                            </button>
                            <button
                              // className="btn btn-custom-delete btn-link btn-sm"
                              // class="btn-simple btn-link p-1 btn btn-danger"
                              className="btn btn-danger btn-link p-1"
                              onClick={() => handleDelete(vehicle.id)}
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </td>

                          {/* <td>
                          <button className="btn btn-link" onClick={() => handleView(vehicle.id)}>
                            <i className="fa fa-eye"></i>
                          </button>
                          <button className="btn btn-link" onClick={() => handleEdit(vehicle.id)}>
                            <i className="fa fa-edit"></i>
                          </button>
                          <button className="btn btn-link text-danger" onClick={() => handleDelete(vehicle.id)}>
                            <i className="fa fa-trash"></i>
                          </button>
                        </td> */}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center">
                          No vehicles available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                {/* Pagination controls (keep existing code) */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Vehicles;
// Helper functions
function getStatusColor(status) {
  switch (status?.toLowerCase()) {
    case "assigned":
      return "success"; // Use a warning class for yellow
    case "no connection":
      return "secondary"; // Use a secondary class for gray
    case "pending":
      return "danger"; // Use a danger class for red
    default:
      return "light"; // Default light color
  }
}

function formatLastTrip(lastTrip) {
  // Implement logic to format last trip (e.g., "2 days ago", "6 days ago", etc.)
  return lastTrip || "NA";
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
