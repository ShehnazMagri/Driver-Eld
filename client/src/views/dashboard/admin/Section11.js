import React, { useMemo, useState } from "react";
import {ResponsiveContainer,LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,Label, BarChart,Legend,Bar} from "recharts";
import { TextField, Box } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Calendar } from "lucide-react";


export const Section11 = ({ driver }) => {
  const drivers = driver?.payload?.drivers || [];
  const [truckNumber, setTruckNumber] = useState(drivers.length > 0 ? drivers[0]?.vehicleNumber : ""); // Default to first truck if available
  const [activeTab, setActiveTab] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Get the selected driver based on the selected truck number
  const selectedDriver = drivers.find(d => d.vehicleNumber === truckNumber);
  

  // Use the driver's speed data for display
  const displayData = useMemo(() => {
    if (!selectedDriver) {
      // Show all drivers' average speed data when no vehicle is selected
      return drivers.map(driver => ({
        time: driver.vehicleNumber,
        speed: driver.averageSpeed || 2, 
      }));
    } else {
      // If a specific driver is selected, show their hourly speed data
      return [
        { time: "08:00", vehicleNumber: selectedDriver.vehicleNumber, speed: selectedDriver.speed?.morning || 5 }, 
        { time: "12:00", vehicleNumber: selectedDriver.vehicleNumber, speed: selectedDriver.speed?.noon || 2 },     
        { time: "16:00", vehicleNumber: selectedDriver.vehicleNumber, speed: selectedDriver.speed?.afternoon || 3 },
        { time: "20:00", vehicleNumber: selectedDriver.vehicleNumber, speed: selectedDriver.speed?.evening || 4 },  
      ];
    }
  }, [drivers, selectedDriver]);

  const noDataFound = displayData.length === 0;

  return (
    <div className="driving-hours-container" style={{ width: "100%", height: 510, padding: "24px", borderRadius: "16px" }}>
       <div style={{display: "flex", justifyContent: "space-between", alignItems: "center",  marginBottom: "24px",  }} >
          <h5 className="mb-0 font-weight-bold" style={{ letterSpacing: "0.05em" }} > Driver Speed Analysis </h5>
          <div style={{ position: "relative", height: "55px" }}>
            <div
              style={{
                display: "flex",
                //  gap: "10px"
                borderRadius: "5px",
                overflow: "hidden",
                // backgroundColor: "#f5f5f5",
                height: "56px",
              }}
            >
              {activeTab === "time period" && (
                <div
                  className="date-picker-container"
                  style={{
                    // backgroundColor: "#f0f0f0",
                    color: "#000",
                    cursor: "pointer",
                    // padding: "0.8rem",
                    borderRadius: "8px",
                    width: "fit-content",
                    // marginTop: "1.5rem",
                    // boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                   <div style={{ position: "relative",width: "fit-content" }}>
          <select
            value={truckNumber}
            onChange={(e) => setTruckNumber(e.target.value)}
            style={{ marginRight: "10px", padding: "10px", borderRadius: "8px", border: "2px solid #e0e0e0" }}
          >
       <option value="" disabled> Select Vehicle </option>
            {drivers.length > 0 ? (
              drivers.map((driver) => (
                <option key={driver.id} value={driver.vehicleNumber}>
                  {driver.vehicleNumber}
                </option>
              ))
            ) : (
              <option disabled>No vehicles available</option>
            )}
          </select>
        </div>
                  {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
                    <DatePicker
                        calendars={1} 
                        label="Start Date"
                        value={startDate}
                        onChange={(newValue) => setStartDate(newValue)}
                        renderInput={(params) => <TextField {...params} />}
                      />
                      <DatePicker
                        label="End Date"
                        value={endDate}
                        onChange={(newValue) => setEndDate(newValue)}
                        minDate={startDate} // Ensures end date is after start date
                        renderInput={(params) => <TextField {...params} />}
                      /> 
                    </Box>
                  </LocalizationProvider> */}
                </div>
              )}
              {["All", "Time Period"].map((tab) => (
                <button
                  key={tab}
                  className={`px-3 py-1 text-sm ${
                    activeTab === tab.toLowerCase()
                      ?  "text-gray-500 hover:text-gray-900"
                      : "bg-white text-gray-900"
                  }`}
                  style={{ border: "none", margin: "12px" }}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

       
        {/* {activeTab === "all" && (
          <ResponsiveContainer width="100%" height={400}>
    <BarChart
      data={noDataFound ? [{ vehicleNumber: '', speed: 0 }] : displayData}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <defs>
        <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#4D79FF" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#1F2937" stopOpacity={0.2} />
        </linearGradient>
      </defs>

      <XAxis dataKey="vehicleNumber" stroke="#9CA3AF" tickLine={false} />
      <YAxis stroke="#9CA3AF" tickLine={false} />
      
      <Tooltip
        contentStyle={{
          backgroundColor: "#1F2937",
          color: "#ffffff",
          borderRadius: "8px",
          border: "none",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
        labelStyle={{ color: "#9CA3AF" }}
        itemStyle={{ color: "#4D79FF" }}
        formatter={(value, name, props) => {
          // Display both vehicle number and speed
          const vehicleNumber = props.payload.vehicleNumber;
          return [
            `${value} km/h`,
            // `Speed (${vehicleNumber})`
               `Speed`
          ];
        }}
      />

      <Legend
        verticalAlign="top"
        height={36}
        iconType="circle"
        iconSize={10}
        wrapperStyle={{ paddingBottom: 10 }}
      />

      <Bar
        dataKey="speed"
        fill="url(#colorSpeed)"
        barSize={30}
        radius={[10, 10, 0, 0]}
        stroke="#1F2937"
        strokeWidth={2}
        isAnimationActive={true}
        animationDuration={500}
      />

      <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />

      {noDataFound && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#9CA3AF",
          textAlign: "center",
          pointerEvents: "none",
          zIndex: 1,
          fontSize: "1.2rem",
          fontWeight: "bold",
        }}>
          <h6>No Data Found</h6>
        </div>
      )}
    </BarChart>
         </ResponsiveContainer>
        )} */}

      {/*  For all tab  */}
      {activeTab === "all" && (
  <ResponsiveContainer width="100%" height={400}>
    <BarChart
      data={noDataFound ? [{ vehicleNumber: '', speed: 0 }] : displayData}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <defs>
        <linearGradient id="totalDriversGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#6B21A8" stopOpacity={0.85} /> {/* Start color */}
          <stop offset="95%" stopColor="#A855F7" stopOpacity={0.3} /> {/* End color */}
        </linearGradient>
      </defs>

      <XAxis dataKey="vehicleNumber" stroke="#9CA3AF" tickLine={false} />
      <YAxis stroke="#9CA3AF" tickLine={false} />

      <Tooltip
        contentStyle={{
          backgroundColor: "#1F2937",
          color: "#ffffff",
          borderRadius: "8px",
          border: "none",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
        labelStyle={{ color: "#9CA3AF" }}
        itemStyle={{ color: "#8B5CF6" }}
        formatter={(value, name, props) => {
          const vehicleNumber = props.payload.vehicleNumber || 0;
          return [`${value} km/h`, `Speed (${vehicleNumber})`];
        }}
      />

      <Legend
        verticalAlign="top"
        height={36}
        iconType="circle"
        iconSize={10}
        wrapperStyle={{ paddingBottom: 10, color: "#8B5CF6", fontWeight: "bold" }}
      />

      <Bar
        dataKey="speed"
        fill="url(#totalDriversGradient)" // Using the totalDriversGradient
        barSize={35}
        radius={[10, 10, 0, 0]}
        stroke="#4F46E5" // Darker stroke for contrast
        strokeWidth={1.5}
        isAnimationActive={true}
        animationDuration={700}
        label={{ position: 'top', fill: '#4F46E5', fontWeight: 'bold', fontSize: 14 }} // Darker text for contrast
      />

      <CartesianGrid strokeDasharray="5 5" stroke="#ddd" />

      {noDataFound && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#9CA3AF",
          textAlign: "center",
          pointerEvents: "none",
          zIndex: 1,
          fontSize: "1.3rem",
          fontWeight: "bold",
        }}>
          <h6>No Data Found</h6>
        </div>
      )}
    </BarChart>
  </ResponsiveContainer>
)}



     {/* Time Period */}
      {activeTab === "time period" && (
     <div>
        <ResponsiveContainer width="100%" height={400}>
        <LineChart data={displayData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time">
            <Label value="Time" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis
            label={{ value: "Speed (km/h)", angle: -90, position: "insideLeft" }}
            tickFormatter={(value) => `${value} km/h`} // Add unit label to Y-axis
          />
          <Tooltip formatter={(value) => `${value} km/h`} /> {/* Add unit to tooltip */}
          <Line type="monotone" dataKey="speed" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
    )}
    </div>
  );
};
