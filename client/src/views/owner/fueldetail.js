import React, { useEffect, useState } from 'react';
import { getDriversByOwnerAction, getFuelDetailsAction } from '../../Redux/Action/driver';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Container, Row, Col, Table } from "react-bootstrap";
import { getVehiclesByOwnerAction } from '../../Redux/Action/vehicle';

export const FuelDetails = () => {
  const [fuelData, setFuelData] = useState([]);
  const [dataFetched, setDataFetched] = useState(false); // Track if data was fetched
  const [driverName, setDriverName] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [driverDropdown, setDriverDropdown] = useState([]);
  const [vehicleDropdown, setVehicleDropdown] = useState([]);
  const dispatch = useDispatch();
  const loginuserlist = useSelector(
    (state) => state.login.loginuserlist.user || []
  );

  const handleFuelData = async () => {
    try {
      const driverId = driverName;
      const vehicleId = vehicleName;
  
      if (!driverId || !vehicleId) {
        alert("Please select both Driver and Vehicle.");
        return; 
      }
  
      const response = await dispatch(getFuelDetailsAction({ driverId, vehicleId }));
      setDataFetched(true);
      if (response.payload.status === true) {
        setFuelData(response.payload.fuelData);
      } else {
        setFuelData([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleDriverChange = (e) => setDriverName(e.target.value);
  const handleVehicleChange = (e) => setVehicleName(e.target.value);

  const handleDriverDropdown = async () => {
    try {
      const userId = loginuserlist.id;
      const response = await dispatch(getDriversByOwnerAction({ userId }));
      if (response.payload.status === true) {
        setDriverDropdown(response.payload.drivers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleVehicleDropdown = async () => {
    try {
      const userId = loginuserlist.id;
      const response = await dispatch(getVehiclesByOwnerAction(userId));
      if (response.status === true) {
        setVehicleDropdown(response.vichels);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col md={6}>
          <Form.Group controlId="driverName">
            <Form.Label>Driver Name</Form.Label>
            <Form.Control as="select" value={driverName} onClick={handleDriverDropdown} onChange={handleDriverChange}>
              <option value="">Select Driver</option>
              {driverDropdown.map((driver, index) => (
                <option key={index} value={driver.id}>{driver.username}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="vehicleName">
            <Form.Label>Vehicle Name</Form.Label>
            <Form.Control as="select" value={vehicleName} onClick={handleVehicleDropdown} onChange={handleVehicleChange}>
              <option value="">Select Vehicle</option>
              {vehicleDropdown.map((vehicle, index) => (
                <option key={index} value={vehicle.id}>{vehicle.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Button variant="primary" onClick={handleFuelData}>Fetch Fuel Data</Button>

      <div className="mt-4">
        {dataFetched && fuelData.length === 0 ? (
          <div>
        <h5>Fuel Data:</h5>
          <p>No fuel data available.</p>
          </div>
        ) : (
          fuelData.length > 0 && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Sr</th>
                  <th>Fuel Quantity</th>
                  <th>Fuel Amount</th>
                  <th>Filling Date/Time</th>
                  <th>Driver ID</th>
                  <th>Vehicle ID</th>
                </tr>
              </thead>
              <tbody>
                {fuelData.map((fuel, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{fuel.fuelQuantity}</td>
                    <td>{fuel.fuelAmount}</td>
                    <td>{new Date(fuel.fillingDateTime).toLocaleString()}</td>
                    <td>{fuel.driverId}</td>
                    <td>{fuel.vehicleId}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )
        )}
      </div>
    </Container>
  );
};
// import React from 'react';
// import { Container, Row, Col, Card } from 'react-bootstrap';
// import { Bell, Search, Plus, Settings, MessageSquare, Moon } from 'lucide-react';

// const CircularProgress = ({ percentage, total, title, legend, colors }) => (
//   <Card className="h-100 border-0 shadow-sm">
//     <Card.Body className="d-flex flex-column align-items-center justify-content-center">
//       <h6 className="mb-3">{title}</h6>
//       <div className="position-relative" style={{width: '150px', height: '150px'}}>
//         <svg viewBox="0 0 36 36" className="circular-chart">
//           <path
//             d="M18 2.0845
//               a 15.9155 15.9155 0 0 1 0 31.831
//               a 15.9155 15.9155 0 0 1 0 -31.831"
//             fill="none"
//             stroke="#eee"
//             strokeWidth="2"
//           />
//           <path
//             d="M18 2.0845
//               a 15.9155 15.9155 0 0 1 0 31.831
//               a 15.9155 15.9155 0 0 1 0 -31.831"
//             fill="none"
//             stroke={colors[0]}
//             strokeWidth="2"
//             strokeDasharray={`${percentage}, 100`}
//           />
//         </svg>
//         <div className="position-absolute top-50 start-50 translate-middle text-center">
//           <h3 className="mb-0">{total}</h3>
//           {title !== "HOS Violations" && <small>TOTAL</small>}
//           {title === "HOS Violations" && <small>COMPLIANT</small>}
//         </div>
//       </div>
//       <a href="#" className="mt-3 text-primary">View Details</a>
//       <div className="mt-3 d-flex justify-content-center flex-wrap">
//         {legend && legend.map((item, index) => (
//           <span key={index} className="mx-2 small">
//             <span style={{color: colors[index + 1]}}>●</span> {item.label}
//           </span>
//         ))}
//       </div>
//     </Card.Body>
//   </Card>
// );

// export const FuelDetails = () => {
//   return (
//     <div className="bg-light min-vh-100">
//       {/* Dashboard content */}
//       <Container fluid className="py-4">
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h2 className="mb-0">Dashboard</h2>
//           <div>
//             <span className="me-2 text-primary fw-bold">HOS</span>
//             <span className="text-muted">DVIR</span>
//           </div>
//         </div>
//         <Row>
//           <Col md={4}>
//             <CircularProgress 
//               percentage={70} 
//               total={10} 
//               title="Drivers"
//               colors={['#4e73df', '#4e73df', '#858796', '#1cc88a', '#36b9cc']}
//               legend={[
//                 {label: 'SB'},
//                 {label: 'OFF'},
//                 {label: 'D'},
//                 {label: 'ON'}
//               ]}
//             />
//           </Col>
//           <Col md={4}>
//             <CircularProgress 
//               percentage={50} 
//               total="50%" 
//               title="HOS Violations"
//               colors={['#1cc88a', '#e74a3b', '#1cc88a']}
//               legend={[
//                 {label: '0% 0s In Violation'},
//                 {label: '0% 0s Compliant'}
//               ]}
//             />
//           </Col>
//           <Col md={4}>
//             <CircularProgress 
//               percentage={80} 
//               total="43,792" 
//               title="Total Hours"
//               colors={['#36b9cc', '#4e73df', '#1cc88a', '#f6c23e', '#36b9cc', '#e74a3b']}
//               legend={[
//                 {label: '142 SB'},
//                 {label: '270 OFF'},
//                 {label: '170 D'},
//                 {label: '796 ON'},
//                 {label: '-16 P'}
//               ]}
//             />
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }