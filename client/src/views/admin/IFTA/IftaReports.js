import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Nav,
  Table
} from 'react-bootstrap';
import { FaSearch, FaCalendar, FaDownload, FaFilter, FaSort } from 'react-icons/fa';

const vehicleData = [
  { id: '111', state: 'Arizona', distance: 362, gallons: 0, amount: 0 },
  { id: '111', state: 'California', distance: 1297, gallons: 0, amount: 0 },
  { id: '111', state: 'Iowa', distance: 495, gallons: 0, amount: 0 },
  { id: '111', state: 'Kansas', distance: 407, gallons: 0, amount: 0 },
  { id: '111', state: 'Minnesota', distance: 309, gallons: 0, amount: 0 },
  { id: '111', state: 'Missouri', distance: 122, gallons: 0, amount: 0 },
  { id: '111', state: 'Nebraska', distance: 457, gallons: 0, amount: 0 },
  { id: '111', state: 'New Mexico', distance: 390, gallons: 0, amount: 0 },
  { id: '111', state: 'Oklahoma', distance: 61, gallons: 0, amount: 0 },
  { id: '111', state: 'Texas', distance: 88, gallons: 0, amount: 0 },
  { id: '111', state: 'Wyoming', distance: 126, gallons: 0, amount: 0 },
];

const vehicleList = [
  { id: 'A', label: 'All Units', count: 14 },
  { id: '0', label: '07', count: 1 },
  { id: '1', label: '104', count: 1 },
  { id: '1', label: '106', count: 1 },
  { id: '1', label: '111', count: 1 },
  { id: '1', label: '115', count: 1 },
  { id: '1', label: '124', count: 1 },
  { id: '1', label: '133', count: 1 },
  { id: '1', label: '142', count: 1 },
  { id: '1', label: '151', count: 1 },
  { id: '1', label: '16', count: 1 },
  { id: '1', label: '17', count: 1 },
  { id: '1', label: '18', count: 1 },
  { id: '2', label: '23', count: 1 },
];

export default function IftaReports() {
  const [activeTab, setActiveTab] = useState('active');

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h2>Vehicles</h2>
          <p className="text-muted">Please select a vehicle to view individual reports.</p>
        </Col>
        <Col xs="auto" className="d-flex align-items-center">
          <Button variant="outline-secondary" className="me-2">
            <FaFilter className="me-2" /> Filters
          </Button>
          <Button variant="outline-secondary" className="me-2">
            <FaDownload className="me-2" /> Export
          </Button>
          <Button variant="primary">Report Actions</Button>
        </Col>
      </Row>

      <Row>
        <Col md={3}>
          <Card>
            <Card.Body>
              <Nav variant="tabs" className="mb-3">
                <Nav.Item>
                  <Nav.Link 
                    active={activeTab === 'active'} 
                    onClick={() => setActiveTab('active')}
                  >
                    Active Vehicles
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    active={activeTab === 'deleted'} 
                    onClick={() => setActiveTab('deleted')}
                  >
                    Deleted Vehicles
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Search vehicles"
                  className="mb-3"
                />
              </Form.Group>

              <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                {vehicleList.map((vehicle) => (
                  <Button
                    key={vehicle.label}
                    variant={vehicle.label === '111' ? 'primary' : 'outline-secondary'}
                    className="d-flex justify-content-between align-items-center w-100 mb-2"
                  >
                    <span>
                      <span className="me-2 badge rounded-pill bg-light text-dark">
                        {vehicle.id}
                      </span>
                      {vehicle.label}
                    </span>
                    <span className="badge bg-secondary">{vehicle.count}</span>
                  </Button>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={9}>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between mb-4">
                <Button variant="outline-secondary">
                  <FaCalendar className="me-2" />
                  29 Jul, 2024 - Today
                  <span className="ms-2">×</span>
                </Button>
              </div>

              <Table hover>
                <thead>
                  <tr>
                    <th>
                      Truck <FaSort />
                    </th>
                    <th>
                      State <FaSort />
                    </th>
                    <th>
                      Distance (mi) <FaSort />
                    </th>
                    <th>
                      Gallons <FaSort />
                    </th>
                    <th>
                      Amount <FaSort />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {vehicleData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.id}</td>
                      <td>{row.state}</td>
                      <td>{row.distance.toLocaleString()}</td>
                      <td>{row.gallons}</td>
                      <td>${row.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}