import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Bell, Search, Plus, Settings, MessageSquare, Moon } from 'lucide-react';

// const CircularProgress = ({ percentage, total, title, legend, colors }) => (
    export const CircularProgress = ({ percentage, total, title, legend, colors }) => (
  <Card className="h-100 border-0 shadow-sm">
    <Card.Body className="d-flex flex-column align-items-center justify-content-center">
      <h6 className="mb-3">{title}</h6>
      <div className="position-relative" style={{width: '150px', height: '150px'}}>
        <svg viewBox="0 0 36 36" className="circular-chart">
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#eee"
            strokeWidth="2"
          />
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke={colors[0]}
            strokeWidth="2"
            strokeDasharray={`${percentage}, 100`}
          />
        </svg>
        <div className="position-absolute top-50 start-50 translate-middle text-center">
          <h3 className="mb-0">{total}</h3>
          {title !== "HOS Violations" && <small>TOTAL</small>}
          {title === "HOS Violations" && <small>COMPLIANT</small>}
        </div>
      </div>
      <a href="#" className="mt-3 text-primary">View Details</a>
      <div className="mt-3 d-flex justify-content-center flex-wrap">
        {legend && legend.map((item, index) => (
          <span key={index} className="mx-2 small">
            <span style={{color: colors[index + 1]}}>●</span> {item.label}
          </span>
        ))}
      </div>
    </Card.Body>
  </Card>
);

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