import React, { useEffect, useState } from "react";
import { FaClock, FaMapMarkerAlt, FaTag } from "react-icons/fa";
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
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FuelPieChart from "views/driver/Graph/pie";
import { getDriversTaskByDate, getTotalFuelData } from "../../Redux/Action/driver";
import FuelBarChart from "views/driver/Graph/pie";

function DriverDashboard() {
  const dispatch = useDispatch();
  const [todayTasks, setTodayTasks] = useState([]);
  const [fuelChart, setFuelChart] = useState({ categories: [], series: [] });
  console.log(todayTasks, "todayTaskstodayTaskstodayTaskstodayTasks");
  const loginuserlist = useSelector(
    (state) => state.login.loginuserlist.user || []
  );
  // const calculateTotals = (data) => {
  //   return data.reduce((totals, item) => {
  //     totals.fuelQuantity += item.fuelQuantity;
  //     totals.fuelAmount += item.fuelAmount;
  //     return totals;
  //   }, { fuelQuantity: 0, fuelAmount: 0 });
  // };
  // const totals = calculateTotals(fuelChart);
  // console.log(totals,"totaltotaltotaltotaltotal")

  const prepareChartData = (aggregatedData) => {
    const dates = Object.keys(aggregatedData);
    const quantities = dates.map(date => aggregatedData[date].fuelQuantity);
    const amounts = dates.map(date => aggregatedData[date].fuelAmount);
  
    return {
      categories: dates,
      series: [
        {
          name: 'Total Fuel Quantity',
          data: quantities
        },
        {
          name: 'Total Fuel Amount',
          data: amounts
        }
      ]
    };
  };
  const aggregateDataByDate = (data) => {
    return data.reduce((acc, item) => {
      const date = new Date(item.fillingDateTime).toISOString().split('T')[0]; // Extract date part only
      if (!acc[date]) {
        acc[date] = { fuelQuantity: 0, fuelAmount: 0 };
      }
      acc[date].fuelQuantity += item.fuelQuantity;
      acc[date].fuelAmount += item.fuelAmount;
      return acc;
    }, {});
  };
    



  const fetchData = async () => {
    if (!loginuserlist || !loginuserlist.id) {
      console.log("User ID not available");
      return;
    }

    try {
      const currentDateTime = new Date();
      const id = loginuserlist.id;

      const currentDate = `${currentDateTime.getFullYear()}-${String(
        currentDateTime.getMonth() + 1
      ).padStart(2, "0")}-${String(currentDateTime.getDate()).padStart(
        2,
        "0"
      )}`;

      const response = await dispatch(getDriversTaskByDate(id, currentDate));

      console.log(response, "Response data");
      if (response.payload.status === true) {
        setTodayTasks(response.payload.drivers);
      }
    } catch (error) {
      console.log("Error fetching driver's tasks:", error);
    }
  };
  const fuelChartData = async () => {
    try {
      const response = await dispatch(getTotalFuelData());
      if (response?.payload?.status === true) {
        const aggregatedData = aggregateDataByDate(response?.payload?.fuelData);
        console.log(aggregatedData,"aggregatedData")
        const chartData = prepareChartData(aggregatedData);
        console.log(chartData,"chardata")
        setFuelChart(chartData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    if (loginuserlist && loginuserlist.id) {
      fetchData();
    }
  }, []);
  useEffect(() => {
    fuelChartData()
  },[])
  // useEffect(() => {
  //   const fetch = await 
  // },[])
  const driverStats = [
    {month: "January",totalRides: 120,completedRides: 100,pendingRides: 20,earnings: "$1,200"},
    {month: "February",totalRides: 110,completedRides: 95,pendingRides: 15,earnings: "$1,150"},
    {month: "March",totalRides: 130,completedRides: 115,pendingRides: 15,earnings: "$1,300"},
    {month: "April",totalRides: 140,completedRides: 125,pendingRides: 15,earnings: "$1,400"},
    {month: "May",totalRides: 150,completedRides: 130,pendingRides: 20,earnings: "$1,500"},
    {month: "June",totalRides: 160,completedRides: 140,pendingRides: 20,earnings: "$1,600"},
    {month: "July",totalRides: 170,completedRides: 150,pendingRides: 20,earnings: "$1,700"},
    {month: "August",totalRides: 180,completedRides: 160,pendingRides: 20,earnings: "$1,800"},
    {month: "September",totalRides: 190,completedRides: 170,pendingRides: 20,earnings: "$1,900"},
    {month: "October",totalRides: 200,completedRides: 180,pendingRides: 20,earnings: "$2,000"},
    {month: "November",totalRides: 210,completedRides: 190,pendingRides: 20,earnings: "$2,100"},
    {month: "December",totalRides: 220,completedRides: 200,pendingRides: 20,earnings: "$2,200"},
  ];

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="9">
            <div className="custom-card ">
              <div className="today-clock">Overview</div>
              <div className="clocks progress-container">
                <Card.Body className="p-0">
                  <div className="progress-circle">
                    <div className="progress-background"></div>
                    <div
                      className="progress-bar"
                      style={{ transform: "rotate(270deg)" }}
                    ></div>
                    <div className="progress-text">
                      {/* <TimerComponent /> */}Pending
                    </div>
                    {/* <div className="progress-info">Current Time</div> */}
                  </div>
                </Card.Body>
                <Card.Body className="p-0">
                  <div className="progress-circle">
                    <div className="progress-background"></div>
                    <div
                      className="progress-bar"
                      style={{ transform: "rotate(180deg)" }}
                    ></div>
                    <div className="progress-text">10</div>
                    <div className="progress-info">Current Tasks</div>
                  </div>
                </Card.Body>
                <Card.Body className="p-0">
                  <div className="progress-circle">
                    <div className="progress-background"></div>
                    <div
                      className="progress-bar"
                      style={{ transform: "rotate(225deg)" }}
                    ></div>
                    <div className="progress-text">18,256</div>
                    <div className="progress-info">Total Miles Driven</div>
                  </div>
                </Card.Body>
                <Card.Body className="p-0">
                  <div className="progress-circle">
                    <div className="progress-background"></div>
                    <div
                      className="progress-bar"
                      style={{ transform: "rotate(270deg)" }}
                    ></div>
                    <div className="progress-text">43</div>
                    <div className="progress-info">Tasks Completed</div>
                  </div>
                </Card.Body>
              </div>
            </div>
          </Col>
          <Col md="3">
            <Card className="custom-card bg-dark">
              <Card.Header
                as="h4"
                className="bg-dark text-white d-flex justify-content-center align-items-center mb-4 w-100"
                style={{ fontSize: '1.25rem' }} // Reduced header font size
              >
                Today's Tasks
              </Card.Header>
              <Card.Body className="p-2"> {/* Reduced padding */}
                <div className="d-flex justify-content-center align-items-center mb-3 w-100"> {/* Reduced margin */}
                  <Dropdown>
                    <DropdownButton
                      id="dropdown-tasks"
                      title="View Tasks"
                      variant="light"
                      className="w-100"
                      style={{ fontSize: '0.875rem' }} // Reduced font size for dropdown
                    >
                      {todayTasks && todayTasks.length > 0 ? (
                        todayTasks.map((task, index) => (
                          <Dropdown.Item
                            key={index}
                            className="d-flex flex-column align-items-start mb-2 p-1" // Reduced padding
                            style={{ fontSize: '0.875rem' }} // Reduced font size for dropdown items
                          >
                            <Card className="mb-1 border-light shadow-sm" style={{ fontSize: '0.875rem' }}> {/* Reduced font size */}
                              <Card.Body className="p-2"> {/* Reduced padding */}
                                {/* <Card.Title className="d-flex align-items-center">
                                  <FaTag className="me-2" /> Task Description
                                </Card.Title>
                                <Card.Text>{task.taskDescription}</Card.Text> */}
                                <Card.Title className="d-flex align-items-center">
                                  <FaClock className="me-2" /> Check-in
                                </Card.Title>
                                <Card.Text>
                                  {task.checkInDate} {task.checkinTime}
                                </Card.Text>
                                <Card.Title className="d-flex align-items-center">
                                  <FaClock className="me-2" /> Check-out
                                </Card.Title>
                                <Card.Text>
                                  {task.checkoutDate ? `${task.checkoutDate} ${task.checkoutTime}` : "N/A"}
                                </Card.Text>
                              </Card.Body>
                            </Card>
                          </Dropdown.Item>
                        ))
                      ) : (
                        <Dropdown.Item disabled>
                          No tasks available for today.
                        </Dropdown.Item>
                      )}
                    </DropdownButton>
                  </Dropdown>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="9">
            <div className="custom-card">
            <Card.Title as="h4">Fuel Management</Card.Title>
              <Card.Body>
              <FuelBarChart chartData={fuelChart}/>
              </Card.Body>
            </div>
          </Col>
          {/* <Col md="3">
            <div className="custom-card">
              <Card.Title as="h4">Fuel Management</Card.Title>
              <Card.Body>
                <div className="ct-chart ct-perfect-fourth">
                   <FuelPieChart
                    totalFuelQuantity={totals.fuelQuantity}
                    totalFuelAmount={totals.fuelAmount}
                  /> 
                   <FuelBarChart chartData={fuelChart}
                  /> 
                </div>
              </Card.Body>
            </div>
          </Col> */}
        </Row>
      </Container>
    </>
  );
}

export default DriverDashboard;
