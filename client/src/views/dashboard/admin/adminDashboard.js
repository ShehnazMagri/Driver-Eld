import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {allusersAction, getloginuserAction, getTrailersByOwnerAction, getViolationsByOwnerAction,getAllDataByOwnerAction} from "../../../Redux/Action/adminauth";
import {getDriversByOwnerAction,getFuelDetailsAction,} from "../../../Redux/Action/driver";
import { getVehiclesByOwnerAction } from "../../../Redux/Action/vehicle";
import { getTaskByOwnerId } from "../../../Redux/Action/vehicle";
import "../../dash.css";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Section5 from "./Section5";
import Section6 from "./Section6";
import Section from "./Section";
import Section7 from "./Section7";
import Section8 from "./Section8";
import Drivinghours from "./Drivinghours";
import DriverScore from "./DriverScore";
import Section9 from "./section9";
import Section10 from "./Section10";
import { Section11 } from "./Section11";
import Section12 from "./Section12";
import Section13 from "./Section13";
import Section14 from "./Section14";
import Section15 from "./Section15";
import Section16 from "./Section16";

import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const dispatch = useDispatch();
  const [totalTrailers, setTotalTrailers] = useState("");
  const [trailerData, setTrailerData] = useState([]);
  const [Voilations, setVoilations] = useState([]);
  const [voilationData, setVoilationData] = useState([]);
  const [fueldata, setFuelData] = useState([]);
  const [driverData, setDriverData] = useState([]);
  const [vehcileData, setVehicleData] = useState([]);
  const allusers = useSelector((state) => state.login.userlist?.users || []);
  const loginuserlist = useSelector(
    (state) => state.login.loginuserlist.user || []
  );
  const ownerid = loginuserlist?.id;
  const user = useSelector((state) => state.login.loginuserlist?.user);
  // const { vehicles = [], pagination = {} } = useSelector((state) => state.vehicle);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  // const { fuelDetails, loading, error } = useSelector((state) => state.driver);

  useEffect(() => {
    dispatch(allusersAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getloginuserAction());
  }, [dispatch]);

  // total driver vehciles sheo here
  useEffect(() => {
    const fetchData = async () => {
      if (loginuserlist?.id) {
        const userId = loginuserlist.id;
        try {
          const driversResponse = await dispatch(
            getDriversByOwnerAction({
              userId,
              page: currentPage,
              size: pageSize,
            })
          );
          setDriverData(driversResponse);
          // Fetch vehicles
          const vehiclesResponse = await dispatch(
            getVehiclesByOwnerAction(userId, 1, 10)
          );
          setVehicleData(vehiclesResponse);

          const trailerResponse = await dispatch(
            getTrailersByOwnerAction(userId, 1, 10)
          );
          setTrailerData(trailerResponse);
          // const VoilationsResponse = await dispatch( getViolationsByOwnerAction(userId, 1, 10));
          // setVoilationData(VoilationsResponse)
          // Fetch all violations
          let allViolations = [];
          let totalPages = 1;
          for (let page = 1; page <= totalPages; page++) {
            const violationsResponse = await dispatch(
              getViolationsByOwnerAction(userId, page, 10)
            );
            allViolations = [
              ...allViolations,
              ...violationsResponse.payload.violations,
            ];
            totalPages = violationsResponse.payload.totalPages; // Update totalPages
          }
          setVoilationData({
            total: allViolations.length,
            violations: allViolations,
          });

          const FueldetailsResponse = await dispatch(
            getFuelDetailsAction(userId, 1, 10)
          );
          setFuelData(FueldetailsResponse);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [loginuserlist, dispatch, currentPage, pageSize]);

  const tasks = [
    {
      id: 1,
      title: "Meeting about plan for Admin Template 2018",
      time: "10:00 AM",
      color: "#e74c3c",
    },
    {
      id: 2,
      title: "Create new task for Dashboard",
      time: "11:00 AM",
      color: "#f39c12",
    },
    {
      id: 3,
      title: "Meeting about plan for Admin Template 2018",
      time: "02:00 PM",
      color: "#3498db",
    },
    {
      id: 4,
      title: "Create new task for Dashboard",
      time: "03:30 PM",
      color: "#2ecc71",
    },
  ];


  const navigate = useNavigate();
  const handlesignup = () => {
    navigate("/admin/create_task");
  };

  return (
    <>
      <Container fluid>
          <Section            
            userData={allusers}
            vichels={vehcileData}
            driver={driverData}
            loginuser={user}
            trailer={trailerData}
            Voilation={{
              payload: {
                violations: voilationData.violations,
                total: voilationData.total,
              },
            }}
          />
          
        <Row style={{ paddingTop: "14px" }}>
          <Col md={8}>
            <Section1
              userData={allusers}
              vichels={vehcileData}
              driver={driverData}
              loginuser={user}
              trailer={trailerData}
              Voilation={{
                payload: {
                  violations: voilationData.violations,
                  total: voilationData.total,
                },
              }}
            />
          </Col>
          <Col md={4}>
            <Section2 driver={driverData} />
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Card>
              <Section3 vichels={vehcileData} trailer={trailerData} />
            </Card>
          </Col>
          <Col md={4}>
            <Section4
              fuel={fueldata}
              vichels={vehcileData}
              trailer={trailerData}
              Voilation={{
                payload: {
                  violations: voilationData.violations,
                  total: voilationData.total,
                },
              }}
            />
          </Col>
          <Col md={4}>
            <Card>
              <Section5 vichels={vehcileData} trailer={trailerData} />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Section15 driver={driverData} /> 
          </Col>
          <Col md={6}>
            <Section16 Voilation={{
                payload: {
                  violations: voilationData?.violations,
                  total: voilationData?.total,
                },
              }}/>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            {/* <Card> */}
            <Section6 driver={driverData} />
            {/* </Card> */}
          </Col>

          <Col md={4}>
            {/* <Section9 Voilation={voilationData}  /> */}
            <Section9
              Voilation={{
                payload: {
                  violations: voilationData.violations,
                  total: voilationData.total,
                },
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Card>
              <Section8 vichels={vehcileData} trailersCount={totalTrailers} />
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <Drivinghours />
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Card>
              <Section10 trailer={trailerData} />
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              {/* <Section11  driver={driverData} /> */}
              <Section13 vichels={vehcileData} driver={driverData} />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <div className="bg-white rounded shadow-sm overflow-hidden">
              <div className="bg-black text-white p-3 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <svg
                    className="me-2"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <span>26 April, 2021 Task List</span>
                </div>
                <button
                  className="btn btn-light rounded-circle p-0 d-flex align-items-center justify-content-center"
                  style={{ width: "24px", height: "24px" }}
                  onClick={handlesignup}
                >
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="p-3">
                <h6 className="text-muted mb-3">All Tasks list</h6>
                {tasks.map((task) => (
                  <div key={task.id} className="d-flex mb-3">
                    <div
                      className="me-3"
                      style={{ width: "4px", backgroundColor: task.color }}
                    ></div>
                    <div>
                      <p className="mb-0 small">{task.title}</p>
                      <small className="text-muted">{task.time}</small>
                    </div>
                  </div>
                ))}
                {/* <button className="btn btn-secondary w-100 mt-2">
                    LOAD MORE
                  </button> */}
              </div>
            </div>
          </Col>

          <Col md="6">
            <div className="bg-white rounded shadow-sm overflow-hidden">
              <div className="bg-black text-white p-3 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <svg
                    className="me-2"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <span>Recent Assign task</span>
                </div>
              </div>
              <div className="p-3">
                <h6 className="text-muted mb-3">All Tasks list</h6>
                {tasks.map((task) => (
                  <div key={task.id} className="d-flex mb-3">
                    <div
                      className="me-3"
                      style={{ width: "4px", backgroundColor: task.color }}
                    ></div>
                    <div>
                      <p className="mb-0 small">{task.title}</p>
                      <small className="text-muted">{task.time}</small>
                    </div>
                  </div>
                ))}
                {/* <button className="btn btn-secondary w-100 mt-2">
                    LOAD MORE
                  </button> */}
              </div>
            </div>
          </Col>
        </Row>

        <Row style={{ paddingTop: "20px" }}>
          <Col md={12}>
            <Card>
              <Section14 driver={driverData} />
            </Card>
          </Col>
        </Row>

        <Row style={{ paddingTop: "20px" }}>
          <Col md={6}>
            <Card>
              <Section12 driver={driverData} />
            </Card>
          </Col>
          <Col md={6} driver={driverData}>
            <Card>
              <Section11 driver={driverData} />
            </Card>
          </Col>
        </Row>
        <Row style={{ paddingTop: "20px" }}>
          <Col md={12}>
            <Card>
              <Section7 />
            </Card>
          </Col>
        </Row>

        <Row style={{ paddingTop: "20px" }}>
          <Col md={12}>
            <Card style={{ backgroundColor: "#846CF91A" }}>
              <DriverScore
                scoreLabel="Driver Score"
                value={80}
                total={100}
                amount="7,040"
                historyMessage="Trip History: May be shown later"
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AdminDashboard;
