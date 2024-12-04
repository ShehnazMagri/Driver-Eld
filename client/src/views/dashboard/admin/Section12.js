import { Button, Table, TableHead, TableBody, TableRow, TableCell, Pagination, Box } from "@mui/material";

import { display } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from "recharts";

const Section12 = ({ driver }) => {
  const [drivers, setDrivers] = useState([]);
  const [tripDetails, setTripDetails] = useState({});
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);

  const handleShowModal = (driver) => {
    setSelectedDriver(driver);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDriver(null);
  };

  useEffect(() => {
    if (driver && driver.payload && driver.payload.drivers) {
      setDrivers(driver.payload.drivers);
      const firstDriver = driver.payload.drivers[0];
      const startDate = new Date(firstDriver.startDate);
      const formattedDate = startDate.toISOString().split("T")[0];
      const formattedStartTime = startDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      const formattedDateTime = `${formattedDate} - ${formattedStartTime}`;

      setTripDetails({
        startLocation: firstDriver.terminalAddress,
        endLocation: "San Francisco",
        startTime: formattedDateTime,
        endTime: "03:30 PM",
        odometer: "25,000",
        stops: firstDriver.restBreak || 0,
      });
    }
  }, [driver]);

 
  const indexOfLastDriver = currentPage * itemsPerPage;
  const indexOfFirstDriver = indexOfLastDriver - itemsPerPage;
  const currentDrivers = drivers.slice(indexOfFirstDriver, indexOfLastDriver);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle "Next" and "Previous" page buttons
  const handleNext = () => {
    if (currentPage < Math.ceil(drivers.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const data = [
    { month: "Jan", value: 11315, reference: 10000 },
    { month: "Feb", value: 25000, reference: 15000 },
    { month: "Mar", value: 23000, reference: 20000 },
    { month: "Apr", value: 25000, reference: 25000 },
    { month: "May", value: 24000, reference: 28000 },
    { month: "Jun", value: 28000, reference: 30000 },
    { month: "Jul", value: 29000, reference: 32000 },
    { month: "Aug", value: 28089, reference: 35000 },
    { month: "Sep", value: 32000, reference: 38000 },
    { month: "Oct", value: 45000, reference: 42000 },
    { month: "Nov", value: 55000, reference: 45000 },
    { month: "Dec", value: 60049, reference: 48000 },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: "#1a1a1a",
            padding: "8px 12px",
            borderRadius: "6px",
            color: "white",
            fontSize: "13px",
          }}
        >
          {/* {`Highest: $${payload[0].value.toLocaleString()}`} */}
          {`Month: ${payload[0].payload.month
            } \n Value: $${payload[0].value.toLocaleString()}`}
        </div>
      );
    }
    return null;
  };

  const CustomizedDot = (props) => {
    const { cx, cy, value } = props;
    if (value === 28089) {
      return (
        <g>
          <circle cx={cx} cy={cy} r={4} fill="#2563eb" />
          <foreignObject x={cx - 45} y={cy - 45} width="90" height="40">
            <div
              style={{
                background: "#1a1a1a",
                color: "white",
                padding: "4px 8px",
                borderRadius: "6px",
                fontSize: "12px",
                textAlign: "center",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            >
              ${value.toLocaleString()}
            </div>
          </foreignObject>
        </g>
      );
    }
    return <circle cx={cx} cy={cy} r={2} fill="#2563eb" />;
  };

  return (
    <div
      style={{
        display: "flex",
        // background: 'white',
        // borderRadius: '8px',
        // boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        width: "100%",
        height: 513,
        padding: "24px",
        borderRadius: "16px",
      }}
    >
      {/* Left Side - Chart */}
      <div style={{ flex: 2, paddingRight: "-2px" }}>
        {/* <h5
        className="mb-0 font-weight-bold"
         style={{ 
          fontSize: '18px',
          fontWeight: '600',
          marginBottom: '16px',
          color: '#111827',
          width:'400px',
          letterSpacing: '0.05em'
        }}> Trip History </h5> */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          {activeTab === "all" ? (
            <h5
              className="mb-0 font-weight-bold"
              style={{ letterSpacing: "0.05em" }}
            >
              {" "}
              Trip History{" "}
            </h5>
          ) : (
            <h5
              className="mb-0 font-weight-bold"
              style={{ letterSpacing: "0.05em" }}
            >
              Trip Summary
            </h5>
          )}
          <div style={{ position: "relative" }}>
            <div
              style={{
                display: "flex",
                borderRadius: "5px",
                overflow: "hidden",
                backgroundColor: "#f5f5f5",
              }}
            >
              {["All", "overview"].map((tab) => (
                <button
                  key={tab}
                  className={`px-3 py-1 text-sm ${activeTab === tab.toLowerCase()
                    ? // ? "bg-white text-gray-900"
                    // :
                    "text-gray-500 hover:text-gray-900"
                    : "bg-white text-gray-900"
                    }`}
                  style={{ border: "none", margin: "0" }}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {activeTab === "all" && (
          <div style={{ height: "400px", marginTop: "24px" }}>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e0e0e0"
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                  width={60}
                />
                <Tooltip content={<CustomTooltip />} cursor={false} />
                <Line
                  type="monotone"
                  dataKey="reference"
                  stroke="#E5E7EB"
                  strokeDasharray="5 5"
                  dot={false}
                  strokeWidth={1.5}
                  style={{ opacity: 0.5 }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={<CustomizedDot />}
                  activeDot={{ r: 6, fill: "#2563eb" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
        {activeTab === "overview" && (

          <div className="driving-hours-container">
            <Box sx={{ minHeight: '400px' }}>
              <Table striped>
                <TableHead>
                  <TableRow>
                    <TableCell>Vehicle Number</TableCell>
                    <TableCell>Start Time</TableCell>
                    <TableCell>End Time</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Dynamically generate table rows for each driver */}
                  {currentDrivers.map((driver, index) => {
                    const startDate = new Date(driver.startDate);
                    const startTime = startDate.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    });
                    // Assuming that you have an endTime available in the driver object or you can calculate it
                    const endTime = "03:30 PM"; // Example end time, update this logic as needed
                    return (
                      <TableRow key={index}>
                        <TableCell>{driver.vehicleNumber}</TableCell>
                        <TableCell>{startTime}</TableCell>
                        <TableCell>{endTime}</TableCell>
                        <TableCell>
                          <Button
                            style={{ backgroundColor: '#846CF9', borderColor: '#846CF9' }}
                            className="btn btn-sm text-white"
                            onClick={() => handleShowModal(driver)}
                          >
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
            {/* Pagination */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
              <Pagination
                count={Math.ceil(drivers.length / itemsPerPage)}
                page={currentPage}
                onChange={(event, value) => paginate(value)}
                color="#846CF9"  // Default color is blue, we will override it
                siblingCount={1}
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "#846CF9",  // Change the color of pagination items to purple
                  },
                  "& .MuiPaginationItem-ellipsis": {
                    color: "#846CF9",  // Make ellipsis color purple
                  },
                  "& .MuiPaginationItem-page.Mui-selected": {
                    backgroundColor: "#846CF9", // Highlight selected page with purple
                    color: "#fff",  // Make the text color white when selected
                  },
                }}
              />
            </Box>

          </div>
        )}

        {selectedDriver && (
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Trip Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="driving-hours-container">
                <table
                  className="driving-hours-table"
                  style={{ height: "400px" }}
                >
                  <tbody>
                    {/* <tr>
              <td className="label">Vehicle Number</td>
              <td className="value">{selectedDriver.vehicleNumber}</td>
            </tr> */}
                    <tr>
                      <td className="label">Start & End Destination</td>
                      <td className="value">
                        {selectedDriver.terminalAddress}
                      </td>
                    </tr>
                    <tr>
                      <td className="label">Start Time</td>
                      <td className="value">
                        {new Date(selectedDriver.startDate).toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td className="label">End Time</td>
                      <td className="value">
                        {new Date(selectedDriver.startDate).toLocaleString() ||
                          "0"}
                      </td>
                    </tr>
                    <tr>
                      <td className="label">Odometer</td>
                      <td className="value">
                        {selectedDriver.odometer || "200"}
                      </td>
                    </tr>
                    <tr>
                      <td className="label">Number of Stops</td>
                      <td className="value">
                        {selectedDriver.restBreak || "0"}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* <p><strong>Duty Status:</strong> {selectedDriver.specialDutyStatus}</p> */}
              </div>
            </Modal.Body>
          </Modal>
        )}
      </div>
    </div>
  );
};

const SummaryItem = ({ title, value }) => (
  <div>
    <div style={{ color: "#6B7280", fontSize: "14px", marginBottom: "4px" }}>
      {title}
    </div>
    <div style={{ fontSize: "16px", fontWeight: "500", color: "#111827" }}>
      {value}
    </div>
  </div>
);
export default Section12;
