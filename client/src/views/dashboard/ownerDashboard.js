import React, { useEffect, useState } from "react";
import ChartistGraph from "react-chartist";
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
  Modal,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { allusersAction } from "../../Redux/Action/adminauth";
import { getTaskByOwnerId, getVehiclesByOwnerAction } from "../../Redux/Action/vehicle";
import { getDriversByOwnerAction } from "../../Redux/Action/driver";
import getLoginUser from "components/common/loginUserDetail";
import ApexCharts from "react-apexcharts";
import { BuyPlan } from "views/owner/plan";
import { CircularProgress } from "views/owner/circularprogress";

function OwnerDashboard() {
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
  const [data, setData] = useState({ drivers: 0, vehicles: 0 });
  const [taskOption, setTaskOption] = useState([]);
  const [assignedTasksCount, setAssignedTasksCount] = useState(0);
  const [fuelUsed, setFuelUsed] = useState(0);
  const [totalMilesDriven, setTotalMilesDriven] = useState(0);
  const [tasksAssignedToday, setTasksAssignedToday] = useState(0);

  // Total counts
  const totalDrivers = drivers.length || 0;
  const totalVehicles = pagination?.total || 0;
  const [totalTasks, setTotalTasks] = useState(0);
  const [totalFuel, setTotalFuel] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check if user is logged in

  // Simulate a login
  const login = () => {
    // Mocking successful login
    setIsLoggedIn(true);
  };

  // Show modal after user login
  useEffect(() => {
    if (loginuserlist) {
      setShowModal(true);
    }
  }, [isLoggedIn]); // This effect will run whenever `isLoggedIn` changes

  const handleClose = () => setShowModal(false);

  // useEffect(() => {
  //   if (loginuserlist?.id) {
  //     const userId = loginuserlist.id;
  //     dispatch(
  //       getDriversByOwnerAction({ userId, page: currentPage, size: pageSize })
  //     );
  //     dispatch(getVehiclesByOwnerAction(userId, 1, 10));
  //   }
  // }, [loginuserlist, dispatch, currentPage, pageSize]);
  useEffect(() => {
    const fetchData = async () => {
      if (loginuserlist?.id) {
        const userId = loginuserlist.id;

        try {
          // Fetch drivers
          const driversResponse = await dispatch(
            getDriversByOwnerAction({
              userId,
              page: currentPage,
              size: pageSize,
            })
          );
          // Fetch vehicles
          const vehiclesResponse = await dispatch(
            getVehiclesByOwnerAction(userId, 1, 10)
          );
          // Fetch tasks
          const tasksResponse = await dispatch(getTaskByOwnerId(userId));

          // Update total tasks and count assigned tasks if the response is valid
          if (tasksResponse && tasksResponse.status === true) {
            setTotalTasks(tasksResponse.pagination.totalTasks); // Total tasks
            const assignedTasks = tasksResponse.tasks.filter(
              (task) => task.status === "assigned"
            );
            setAssignedTasksCount(assignedTasks.length); // Count of assigned tasks
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [loginuserlist, dispatch, currentPage, pageSize]);

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

  useEffect(() => {
    // console.log("Drivers:", drivers);
    // console.log("Vehicles Pagination:", vehicles);
  }, [drivers, pagination, vehicles]);

  const formatDateTime = (isoDateTime) => {
    const date = new Date(isoDateTime);
    return date
      .toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
      .replace(",", "");
  };

  // Function to show driver nd vehiles
  const chartOptions = {
    chart: {
      type: "donut",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    labels: ["Drivers", "Vehicles"],
    colors: ["#FF9500", "#87CB16"],
    legend: {
      position: "bottom",
    },
  };
  const chartSeries = [totalDrivers, totalVehicles];

  // Function to show task completed pending in Graph
  const options = {
    series: [
      {
        name: "Tasks",
        data: [totalTasks, assignedTasksCount],
      },
    ],
    chart: {
      height: 350,
      type: "bar",
    },
    colors: [
      "#FF4560", // Total Tasks
      "#00E396", // Assigned Tasks
    ],
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
    },
    xaxis: {
      categories: ["Total Tasks", "Assigned Tasks"],
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
  };

  return (
    <>
      <div>
        <Modal
          show={showModal}
          onHide={handleClose}
          size="lg"
          className="custom-modal-width custom-modal-top"
          dialogClassName="modal-dialog-top"
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <BuyPlan />
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
      <Container fluid>
        {/* <div className="row">
          <div className="col-md-3">
            <div className="custom-card text-center dashboard-icons">
              <div>
                <i className="fa fa-car fa-3x text-primary"></i>{" "}
              </div>
              <div>
                <h5 className="card-title">Total Vehicles</h5>
                <h2 className="card-value"> {totalVehicles || 0}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="custom-card text-center dashboard-icons">
              <div>
                <i className="fa fa-user-tie fa-3x text-primary"></i>{" "}
              </div>
              <div>
                <h5 className="card-title">Total Drivers</h5>
                <h2 className="card-value"> {totalDrivers || 0}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="custom-card text-center dashboard-icons">
              <div>
                <i className="fa fa-gas-pump fa-3x text-primary"></i>{" "}
              </div>
              <div>
                <h5 className="card-title">Fuel Used</h5>
                <h2 className="card-value"> 200 gl</h2>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="custom-card text-center dashboard-icons">
              <div>
                <i className="fa fa-tasks fa-3x text-primary"></i>{" "}
              </div>
              <div>
                <h5 className="card-title">Total Task </h5>
                <h2 className="card-value"> {totalTasks}</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <div className="custom-card text-center dashboard-icons">
              <div>
                <i className="fa fa-calendar-check fa-3x text-primary"></i>{" "}
              </div>
              <div>
                <h5 className="card-title"> Task Completed</h5>
                <h2 className="card-value"> {assignedTasksCount}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="custom-card text-center dashboard-icons">
              <div>
                <i className="fa fa-car fa-3x text-primary"></i>{" "}
              </div>
              <div>
                <h5 className="card-title">Total Miles Driven</h5>
                <h2 className="card-value"> 140 </h2>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="custom-card text-center dashboard-icons">
              <div>
                <i className="fa fa-tasks fa-3x text-primary"></i>{" "}
              </div>
              <div>
                <h5 className="card-title">Task Assign Today</h5>
                <h2 className="card-value"> 12 </h2>
              </div>
            </div>
          </div>
        </div> */}
        <div className="row">
          <Row>
            <Col md={3}>
              <CircularProgress
                percentage={(totalDrivers / 100) * 100}
                total={totalDrivers}
                title="Drivers"
                colors={["#4e73df", "#36b9cc", "#1cc88a"]}
                legend={[
                  { label: "SB" },
                  { label: "OFF" },
                  { label: "D" },
                  { label: "ON" },
                ]}
              />
            </Col>
            <Col md={3}>
              <CircularProgress
                percentage={(totalVehicles / 100) * 100}
                total={totalVehicles}
                title="Vehicles"
                colors={["#1cc88a", "#e74a3b", "#1cc88a"]}
                legend={[{ label: "Active" }, { label: "Inactive" }]}
              />
            </Col>
            <Col md={3}>
              <CircularProgress
                percentage={(assignedTasksCount / totalTasks) * 100}
                total={totalTasks}
                title="Total Tasks"
                colors={["#36b9cc", "#4e73df", "#1cc88a"]}
                legend={[
                  { label: `Assigned: ${assignedTasksCount}` },
                  { label: `Pending: ${totalTasks - assignedTasksCount}` },
                ]}
              />
            </Col>
            <Col md={3}>
              <CircularProgress
                percentage={(fuelUsed / totalFuel) * 100}
                total={totalFuel}
                title="Total Fuel"
                colors={["#36b9cc", "#4e73df", "#1cc88a"]}
                legend={[{ label: `Used: ${fuelUsed}` }]}
              />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={3}>
              <CircularProgress
                percentage={(assignedTasksCount / 100) * 100}
                total={assignedTasksCount}
                title="Assigned Tasks"
                colors={["#4e73df", "#36b9cc", "#1cc88a"]}
                legend={[
                  { label: `Assigned: ${assignedTasksCount}` },
                  { label: `Pending: ${totalTasks - assignedTasksCount}` },
                ]}
              />
            </Col>
            <Col md={3}>
              <CircularProgress
                percentage={(totalMilesDriven / 100) * 100}
                total={totalMilesDriven}
                title="Miles Driven"
                colors={["#1cc88a", "#e74a3b", "#1cc88a"]}
                legend={[{ label: `Miles Driven: ${totalMilesDriven}` }]}
              />
            </Col>
          </Row>
        </div>

        {/* <div  className="row">
      <Row>
          <Col md={3}>
            <CircularProgress
              percentage={(totalDrivers / 100) * 100} // Adjust percentage
              total={totalDrivers}
              title="Drivers"
              colors={["#4e73df", "#36b9cc", "#1cc88a"]}
              legend={[
                { label: "SB" },
                { label: "OFF" },
                { label: "D" },
                { label: "ON" },
              ]}
            />
          </Col>
          <Col md={3}>
            <CircularProgress
              percentage={(totalVehicles / 100) * 100} // Adjust percentage
              total={totalVehicles}
              title="Vehicles"
              colors={["#1cc88a", "#e74a3b", "#1cc88a"]}
              legend={[{ label: "Active" }, { label: "Inactive" }]}
            />
          </Col>
          <Col md={3}>
            <CircularProgress
              percentage={(assignedTasksCount / totalTasks) * 100} // Dynamic percentage for assigned tasks
              total={totalTasks}
              title="Total Tasks"
              colors={["#36b9cc", "#4e73df", "#1cc88a"]}
              legend={[
                { label: `Assigned: ${assignedTasksCount}` },
                { label: `Pending: ${totalTasks - assignedTasksCount}` },
              ]}
            />
          </Col>
          <Col md={3}>
            <CircularProgress
              percentage={(assignedTasksCount / totalTasks) * 100} // Dynamic percentage for assigned tasks
              total={totalTasks}
              title="Total Fuel"
              colors={["#36b9cc", "#4e73df", "#1cc88a"]}
              legend={[
                { label: `Assigned: ${assignedTasksCount}` },
                { label: `Pending: ${totalTasks - assignedTasksCount}` },
              ]}
            />
          </Col>
        </Row>
      </div> */}

        {userRole === "owner" ? (
          <Row className="mt-4">
            <Col md="6">
              <div className="custom-card">
                <h4 className="card-category">
                  Drivers and Vehicles Statistics Overview
                </h4>
                <p className="card-category">Drivers and Vehicles</p>
                <Card.Body>
                  <div id="chart">
                    <ApexCharts
                      options={chartOptions}
                      series={chartSeries}
                      type="donut"
                      height={340}
                    />
                  </div>
                </Card.Body>
              </div>
            </Col>
            <Col md="6">
              <div className="custom-card">
                {/* <Card.Header>
                  <Card.Title as="h4">Driver Status Overview</Card.Title>
                  <p className="card-category">Drivers and Vehicles</p>
                </Card.Header> */}
                <h4 className="card-category">
                  Driver & Task Statistics Overview
                </h4>
                {/* <p className="card-category">Drivers and Vehicles</p> */}
                <Card.Body>
                  <div className="card-body">
                    <div id="chart">
                      <ApexCharts
                        options={options}
                        series={options.series}
                        type="bar"
                        height={290}
                      />
                    </div>
                  </div>
                </Card.Body>
              </div>
            </Col>
          </Row>
        ) : null}

        <Row style={{ margintTop: "7px" }}>
          <Col md="12">
            <div className="custom-card">
              <h4 className="card-category">
                Driver Vehicle Assignments for Today
              </h4>
              <Card.Body>
                <div className="table-full-width">
                  <Table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Vechicle No</th>
                        <th>Status</th>
                        <th>CheckIn Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {drivers.map((driver, index) => (
                        <tr key={driver.id}>
                          <td>{index + 1}</td>
                          <td>{driver.username}</td>
                          <td>{driver.email}</td>
                          <td>{driver.id}</td>
                          <td>{formatDateTime(driver.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </div>
          </Col>
          {/* )} */}
        </Row>
      </Container>
    </>
  );
}
export default OwnerDashboard;
