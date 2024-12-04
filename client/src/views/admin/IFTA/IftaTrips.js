import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Nav,
  Table,
  Button,
  Alert
} from 'react-bootstrap';
import {
  Select,
  MenuItem,
  IconButton
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

const vehicleList = [
  { id: '0', label: '07' },
  { id: '1', label: '104' },
  { id: '2', label: '106' },
  { id: '3', label: '111' },
  { id: '4', label: '115' },
  { id: '5', label: '124' },
  { id: '6', label: '133' },
  { id: '7', label: '142' },
  { id: '8', label: '151' },
  { id: '9', label: '16' },
  { id: '10', label: '17' },
  { id: '11', label: '18' },
  { id: '12', label: '23' },
];

const tripData = [
  { date: '2024-07-29', state: 'Nebraska', startOdo: 412571, endOdo: 412907, distance: 336, gallons: 0 },
  { date: '2024-07-29', state: 'Iowa', startOdo: 412907, endOdo: 413214, distance: 307, gallons: 0 },
  { date: '2024-07-29', state: 'Illinois', startOdo: 413214, endOdo: 413303, distance: 89, gallons: 0 },
  { date: '2024-07-30', state: 'Illinois', startOdo: 413303, endOdo: 413505, distance: 202, gallons: 0 },
  { date: '2024-07-30', state: 'Iowa', startOdo: 413505, endOdo: 413618, distance: 113, gallons: 0 },
  { date: '2024-07-31', state: 'Nebraska', startOdo: 413618, endOdo: 414387, distance: 769, gallons: 0 },
  { date: '2024-07-31', state: 'Wyoming', startOdo: 414387, endOdo: 414796, distance: 409, gallons: 0 },
  { date: '2024-08-01', state: 'Wyoming', startOdo: 414796, endOdo: 414806, distance: 10, gallons: 0 },
  { date: '2024-08-01', state: 'Utah', startOdo: 414806, endOdo: 415016, distance: 210, gallons: 0 },
];

const defaultMapCenter = { lat: 40.0, lng: -98.5795 };
const position = [30.704649, 76.717873]; 

// Component to force Leaflet to resize the map properly
const ResizeMap = () => {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [map]);
  return null;
};

export default function IftaTrips() {
  const [activeVehicle, setActiveVehicle] = useState('106');
  const [selectedState, setSelectedState] = useState('');

  return (
    <Container fluid>
      <Alert variant="warning" className="mb-3">
        <i className="fas fa-info-circle me-2"></i>
        Important: IFTA will work if and only if driver has vehicle assigned and device is connected to logbook app while driving.
      </Alert>

      <Row>
        <Col md={3}>
          <h4>Vehicles</h4>
          <p className="text-muted">Please select a vehicle to view individual reports.</p>

          <Nav variant="pills" className="mb-3">
            <Nav.Item>
              <Nav.Link active className="px-4">Active Vehicles</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="px-4">Deleted Vehicles</Nav.Link>
            </Nav.Item>
          </Nav>

          <div className="vehicle-list">
            {vehicleList.map((vehicle) => (
              <Button
                key={vehicle.id} // Use unique id for key
                variant={vehicle.label === activeVehicle ? 'primary' : 'outline-secondary'}
                className="d-flex align-items-center mb-2 w-100"
                onClick={() => setActiveVehicle(vehicle.label)}
              >
                <span className="me-2 badge rounded-pill bg-light text-primary">
                  {vehicle.id}
                </span>
                {vehicle.label}
              </Button>
            ))}
          </div>
        </Col>

        <Col md={9}>
          {/* Option 1: Using React Leaflet */}
          <MapContainer center={position} zoom={13} style={{ height: '50vh', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>A pretty popup. <br /> Easily customizable.</Popup>
            </Marker>
            <ResizeMap /> {/* Ensures map resizes properly */}
          </MapContainer>

          {/* Option 2: Using iframe for OpenStreetMap */}
          {/* <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=-98.5795%2C40.0&layer=mapnik"
            style={{ height: '50vh', width: '100%' }}
            allowFullScreen=""
            loading="lazy"
            title="Map"
          ></iframe> */}

          <div className="d-flex justify-content-between align-items-center mb-3">
            <Button variant="outline-secondary">
              29 Jul, 2024 - Today
              <span className="ms-2">×</span>
            </Button>

            <Select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              displayEmpty
              className="ms-2"
              style={{ width: 200 }}
            >
              <MenuItem value="">Choose State (All by default)</MenuItem>
              <MenuItem value="Nebraska">Nebraska</MenuItem>
              <MenuItem value="Iowa">Iowa</MenuItem>
              <MenuItem value="Illinois">Illinois</MenuItem>
              <MenuItem value="Wyoming">Wyoming</MenuItem>
              <MenuItem value="Utah">Utah</MenuItem>
            </Select>

            <Button variant="primary">Report Actions</Button>
          </div>

          <Table hover>
            <thead>
              <tr>
                <th></th>
                <th>Date (PDT)</th>
                <th>State</th>
                <th>Start Odometer</th>
                <th>End Odometer</th>
                <th>Distance (miles)</th>
                <th>Gallons</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tripData.map((trip, index) => (
                <tr key={index}>
                  <td>
                    <IconButton size="small">
                      <AddIcon />
                    </IconButton>
                  </td>
                  <td>{trip.date}</td>
                  <td>{trip.state}</td>
                  <td>{trip.startOdo}</td>
                  <td>{trip.endOdo}</td>
                  <td>{trip.distance}</td>
                  <td>{trip.gallons} (Add)</td>
                  <td>
                    <Button variant="link" className="p-0">Edit | View Route</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
