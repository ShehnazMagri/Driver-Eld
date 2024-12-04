import React from "react";
import { Row, Col } from "react-bootstrap";
import admin from "../../../assets/img/admin.png";

// Import MUI icons
import PersonIcon from "@mui/icons-material/Person";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import WarningIcon from "@mui/icons-material/Warning";
import { Button } from "@mui/material";

const Section = ({ vichels, driver,loginuser,trailer,Voilation,}) => {
  // Mapping of titles to Material-UI icons
  const getIconForTitle = (title) => {
    switch (title) {
      case "Drivers":
        return <PersonIcon fontSize="large" />;
      case "Trucks":
        return <LocalShippingIcon fontSize="large" />;
      case "Trailer":
        return <InventoryIcon fontSize="large" />;
      case "Violations":
        return <WarningIcon fontSize="large" />;
      default:
        return <PersonIcon fontSize="large" />; // Default to person icon
    }
  };

  return (
    <Row>
      <Col md={12} className="mb-4">
        <div className="cardeed welcome-card text-white flex-fill">
          <div className="card-body d-flex flex-column h-100">
            <div className="row align-items-center">
              <div className="col-12 col-md-8 col-xl-10">
                <h2 className="card-title">Welcome Back</h2>
                <h3 className="card-subtitle">
                  {loginuser?.firstName + " " + loginuser?.lastName}
                </h3>
                <div className="row align-items-center">
                  <div className="col-6 col-lg-4 col-xl-3">
                    <div className="task-card">
                      <p className="task-label">Total Drivers</p>
                      <p className="task-value">{driver?.payload?.total || 0}</p>
                    </div>
                  </div>
                  <div className="col-6 col-lg-4 col-xl-3">
                    <div className="task-card">
                      <p className="task-label">Total Vehicles</p>
                      <p className="task-value">{vichels?.total || 0}</p>
                    </div>
                  </div>              
                </div>
              </div>
              <div className="col-12 col-md-4 col-xl-2 text-center">
                <img
                  src={admin}
                  alt="Admin Image"
                  className="img-fluid"
                />
              </div>
            </div>            
          </div>
        </div>
      </Col>

      <Col md={12}>
        <div className="card admin_fourBox">
            <div className="card-body p-0 d-flex flex-column h-100">
            <Row className="d-flex flex-fill">
              {[
                {
                  title: "Drivers",
                  value: driver?.payload?.total || 0,
                  colorClass: "text-purple",
                  background: "linear-gradient(180deg, rgba(99, 91, 255, .20) 0, rgba(99, 91, 255, .03) 100%)",
                },
                {
                  title: "Trucks",
                  value: vichels?.total || 0,
                  colorClass: "text-success",
                  background: "linear-gradient(180deg,rgba(248,194,10,.20) 0,rgba(248,194,10,.03) 100%)",
                }, // Remove curly braces around userData.length
                {
                  title: "Trailer",
                  value: trailer?.payload?.total || 0,
                  colorClass: "text-danger",
                  background: "linear-gradient(180deg,rgba(20,233,226,.20) 0,rgba(20,233,226,.03) 100%)",
                },
                {
                  title: "Violations",
                  value: Voilation?.payload?.total || 0,
                  colorClass: "text-info",
                  background: "linear-gradient(180deg,rgba(255,102,146,.20) 0,rgba(255,102,146,.03) 100%)",
                },
              ].map((stat, index) => (
                <Col key={index} md={3} sm={12} className="d-flex">
                  <div className="card mb-md-0 flex-fill" style={{ background: stat.background }} >
                    <div className="card-body dash_cards">
                      <div className={`icon-circle ${stat.colorClass}-bg mb-3`}>
                        {/* Use dynamic Material-UI icons based on title */}
                        {getIconForTitle(stat.title)}
                      </div>
                      <h3 className="card-subtitle fs-5 fw-normal mb-1">
                        {stat.title}
                      </h3>
                      <p className={`card-title`}>
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Section;
