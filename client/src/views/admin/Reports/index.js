import { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DutyStatusReports from './dutyStatusReports';
import DormancyReports from './dormancyReports';
import LogEditHistory from './logEditHistory';
import HosViolations from './hosViolations';
import PrePostInspection from './prePostInspection';
import UtilizationTrucks from './utlizationTrucks';
import TripHistory from './triphistory';

const FuelReports = () => {
    const [activeComponent, setActiveComponent] = useState('Duty Status Report');

    const components = {
        "Duty Status Report": <DutyStatusReports />,
        "Dormancy Reports": <DormancyReports />,
        "Log Edit History": <LogEditHistory />,
        "HOS Violations": <HosViolations />,
        "Pre/Post Trip Inspection": <PrePostInspection />,
        "Utilization": <UtilizationTrucks />,
        "Trip History": <TripHistory />,
    };

    return (
        <div className="container-fluid">
            <Row>
                <Col md={3} className="p-3">
                    <h5 className="text-black">Fuel Reports</h5>
                    <ul className="list-group" style={{ border: 'none', padding: 0 }}>
                        {Object.keys(components).map((key) => (
                            <li 
                                key={key}
                                className={`list-group-item ${activeComponent === key ? 'active' : ''}`}
                                style={{ 
                                    cursor: 'pointer', 
                                    backgroundColor: activeComponent === key ? '#846cf9' : '#fff', 
                                    border: 'none', // Remove border from individual list items
                                    margin: 0 // Optional: Remove any default margin
                                }}
                                onClick={() => setActiveComponent(key)}
                            >
                                {key.replace('Reports', ' Reports')}
                            </li>
                        ))}
                    </ul>
                </Col>

                <Col md={9} className="p-4">
                    <Card>
                        <Card.Body>
                            {components[activeComponent] || components['Duty Status Report']}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default FuelReports;
