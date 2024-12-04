import React, { useEffect, useState } from "react";
import ChartistGraph from "react-chartist";
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
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { allusersAction } from "../../Redux/Action/adminauth";
import {
  getVehiclesByOwnerAction,
  deleteVehicleAction,
} from "../../Redux/Action/vehicle";
import {
  deleteDriverAction,
  getDriversByOwnerAction,
  updateDriverAction,
} from "../../Redux/Action/driver";
import getLoginUser from "components/common/loginUserDetail";
import { useNavigate } from "react-router-dom";

function DriverList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginuserlist = useSelector(
    (state) => state.login.loginuserlist.user || []
  );
  const {
    drivers = [],
    loading: driversLoading,
    error: driversError,
  } = useSelector((state) => state.driver);
  const { vehicles = [], pagination = {} } = useSelector(
    (state) => state.vehicle
  );
  const userRole = loginuserlist.role || "guest";
  const allusers = useSelector((state) => state.login.userlist?.users || []);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  useEffect(() => {
    dispatch(allusersAction());
  }, [dispatch]);

  useEffect(() => {
    if (loginuserlist?.id) {
      const userId = loginuserlist.id;
      dispatch(
        getDriversByOwnerAction({ userId, page: currentPage, size: pageSize })
      );
      // dispatch(getVehiclesByOwnerAction(userId, 1, 10));
    }
  }, [loginuserlist, dispatch, currentPage, pageSize]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (loginuserlist?.id) {
      dispatch(
        getDriversByOwnerAction({
          userId: loginuserlist.id,
          page: pageNumber,
          size: pageSize,
        })
      );
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        await dispatch(getLoginUser());
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [dispatch]);

  useEffect(() => {}, [drivers, pagination]);

  const handleEdit = (driverId) => {
    navigate(`/owner/updatedriver/${driverId}`);
  };

  const handleDelete = (driverId) => {
    if (window.confirm("Are you sure you want to delete this driver?")) {
      dispatch(deleteDriverAction(driverId));
    }
  };
  // const handleView = (id) => {
  //   navigate(`/owner/fueldetails/${id}`);
  // };
  function getStatusColor(status) {
    switch (status?.toLowerCase()) {
      case 'assigned':
        return 'success'; // Green for idle
      case 'no connection':
        return 'secondary'; // Gray for secondary
      case 'pending':
        return 'danger'; // Red for pending
      default:
        return 'light'; // Default light color
    }
  }
  

  return (
    <>
      <Container fluid>
        <Row>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Sr</th>
                <th scope="col">UserName</th>
                <th scope="col">Email</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {drivers.length > 0 ? (
                drivers.map((driver, index) => (
                  <tr key={driver.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{driver.username}</td>
                    <td>{driver.email}</td>
                    <td>
                      <span
                        className={`badge bg-${getStatusColor(driver.status)}`}
                      >
                        {driver.status || "No Connection"}
                      </span>
                    </td>
                    <td className="td-actions text-right">
                      <OverlayTrigger
                        overlay={
                          <Tooltip id={`tooltip-edit-${driver.id}`}>
                            Edit Driver
                          </Tooltip>
                        }
                      >
                        <Button
                          className="btn-simple btn-link p-1"
                          type="button"
                          variant="success"
                          onClick={() => handleEdit(driver.id)}
                        >
                          <i className="fas fa-edit"></i>
                        </Button>
                      </OverlayTrigger>

                      {/* Delete button (red) */}
                      <OverlayTrigger
                        overlay={
                          <Tooltip id={`tooltip-delete-${driver.id}`}>
                            Delete Driver
                          </Tooltip>
                        }
                      >
                        <Button
                          className="btn-simple btn-link p-1"
                          type="button"
                          variant="danger"
                          onClick={() => handleDelete(driver.id)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </Button>
                      </OverlayTrigger>
                      {/* Fuel Details button (red) */}
                      {/* <OverlayTrigger
                        overlay={
                          <Tooltip id={`tooltip-delete-${driver.id}`}>
                            Fuel History
                          </Tooltip>
                        }
                      >
                        <Button
                          className="btn-simple btn-link p-1"
                          type="button"
                          variant="secondary"
                          onClick={() => handleView(driver.id)}
                        >
                          <i className="fa fa-eye fa-lg"></i>
                        </Button>
                      </OverlayTrigger> */}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No drivers available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Row>
        <hr />
        <div
          className="text-center"
          style={{ marginTop: "16px", display: "flow" }}
        >
          <nav aria-label="Page navigation">
            <ul className="pagination pagination-sm justify-content-center">
              {pagination.totalPages > 1 &&
                Array.from({ length: pagination.totalPages }, (_, index) => (
                  <li
                    className={`page-item ${
                      index + 1 === currentPage ? "active" : ""
                    }`}
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    style={{ cursor: "pointer" }}
                  >
                    <button className="page-link">{index + 1}</button>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
      </Container>
    </>
  );
}

export default DriverList;
