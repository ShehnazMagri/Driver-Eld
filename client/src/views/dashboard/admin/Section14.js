import React, { useState } from "react";
import {
  LineChart,
  BarChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Bar,
} from "recharts";
import { TextField, Box } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const Section14 = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Updated marketData to include speed for each date
  const marketData = [
    {
      TruckNumber: "PB 02 3354",
      date: "2 Oct",
      value: 2.2,
      volume: 20,
      speed: 20,
    },
    {
      TruckNumber: "PB 02 3904",
      date: "2 Oct",
      value: 2.2,
      volume: 20,
      speed: 20,
    },
    {
      TruckNumber: "Hp 02 4897",
      date: "2 Oct",
      value: 2.2,
      volume: 20,
      speed: 20,
    },
    { date: "4 Oct", value: 2.1, volume: 30, speed: 45 },
    { date: "6 Oct", value: 2.15, volume: 40, speed: 50 },
    { date: "8 Oct", value: 2.25, volume: 50, speed: 40 },
    { date: "10 Oct", value: 2.3, volume: 50, speed: 60 },
    {
      TruckNumber: "Hp 02 0094",
      date: "12 Oct",
      value: 2.35,
      volume: 27,
      speed: 55,
    },
    {
      TruckNumber: "MP 02 0909",
      date: "14 Oct",
      value: 2.4,
      volume: 49,
      speed: 48,
    },
    {
      TruckNumber: "DL 02 0764",
      date: "16 Oct",
      value: 2.45,
      volume: 92,
      speed: 52,
    },
    {
      TruckNumber: "MP 02 4455",
      date: "18 Oct",
      value: 2.43,
      volume: 66,
      speed: 35,
    },
    {
      TruckNumber: "DL 02 4356",
      date: "20 Oct",
      value: 2.43,
      volume: 9,
      speed: 35,
    },
    {
      TruckNumber: "NL 02 3354",
      date: "22 Oct",
      value: 2.43,
      volume: 86,
      speed: 35,
    },
    {
      TruckNumber: "HR 02 3354",
      date: "24 Oct",
      value: 2.43,
      volume: 26,
      speed: 35,
    },
    {
      TruckNumber: "CH 02 3354",
      date: "26 Oct",
      value: 2.43,
      volume: 86,
      speed: 60,
    },
  ];

  // Filter data based on the selected date range
  // const filteredData = marketData.filter((item) => {
  //   const itemDate = new Date(item.date);
  //   return (
  //     (!startDate || itemDate >= startDate) && (!endDate || itemDate <= endDate)
  //   );
  // });
  // Convert date strings in marketData to Date objects

  //  Function to show date bas eon date Range
 
  const isWithinDateRange = (date) => {
    if (!startDate || !endDate) return true;
    const checkDate = dayjs(date, "DD MMM").toDate(); // Convert the date format correctly
    // return checkDate >= startDate && checkDate <= endDate;
    return checkDate >= startDate.toDate() && checkDate <= endDate.toDate();
  };

  // Filter data based on the selected date range
  // const filteredData = marketData.filter((item) => {
  //   const itemDate = dayjs(item.date, "DD MMM").toDate();
  //   return isWithinDateRange(item.date);
  // });
  const filteredData = marketData.filter((item) => isWithinDateRange(item.date));
  const noDataFound = filteredData.length === 0;

  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        borderRadius: "16px",
        // boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        backgroundColor: "#ffffff",
      }}
    >
      {/* <div
        // style={{ padding: "24px" }}
        > */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h5
          className="mb-0 font-weight-bold"
          style={{ letterSpacing: "0.05em" }}
        >
          {" "}
          Driving Hours/Miles/Idling{" "}
        </h5>
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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/* <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
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
                  </Box> */}
                    <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
                    <DatePicker label="Start Date" value={startDate} onChange={(newValue) => setStartDate(newValue)} renderInput={(params) => <TextField {...params} />} />
                    <DatePicker label="End Date" value={endDate} onChange={(newValue) => setEndDate(newValue)} minDate={startDate} renderInput={(params) => <TextField {...params} />} />
                  </Box>
                </LocalizationProvider>
              </div>
            )}
            {/* Show the buttons only if the All tab is active */}
            {["All", "Time Period"].map((tab) => (
              <button
                key={tab}
                className={`px-3 py-1 text-sm ${
                  activeTab === tab.toLowerCase()
                    ? "text-gray-500 hover:text-gray-900"
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

      {/* Show the AreaChart only if the All tab is active */}
      {activeTab === "all" && (
        <div style={{ height: "400px", marginTop: "22px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={marketData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  color: "#ffffff",
                  borderRadius: "8px",
                  border: "none",
                }}
                labelStyle={{ color: "#9CA3AF" }}
                itemStyle={{ color: "#10B981" }}
              />
              <Area
                type="monotone"
                dataKey="speed"
                stroke="#10B981"
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Show the AreaChart only if the Time Period tab is active */}
      {activeTab === "time period" && (
        <div style={{ height: "400px", marginTop: "22px" }}>
          <h6
            style={{
              fontWeight: "bold",
              marginBottom: "16px",
              color: "#1F2937",
            }}
          >
          </h6>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              // data={filteredData}
              data={noDataFound ? [{ date: "", speed: 0 }] : filteredData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              {/* Gradient for advanced color fill */}
              <defs>
                <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4D79FF" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#1F2937" stopOpacity={0.2} />
                </linearGradient>
              </defs>

              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              {/* Tooltip with enhanced styling */}
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  color: "#ffffff",
                  borderRadius: "8px",
                  border: "none",
                }}
                labelStyle={{ color: "#9CA3AF" }}
                itemStyle={{ color: "#4D79FF" }}
                formatter={(value) => [`${value} km/h`, "Speed"]}
              />

              <Legend
                verticalAlign="top"
                height={36}
                iconType="circle"
                iconSize={10}
              />

              {/* Bar with gradient and shadow */}
              <Bar
                dataKey="speed"
                fill="url(#colorSpeed)"
                barSize={30}
                radius={[10, 10, 0, 0]}
              />
            </BarChart>

            {noDataFound && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#9CA3AF",
                  textAlign: "center",
                  pointerEvents: "none",
                  zIndex: 1, 
                }}
              >
                <h6>No Data Found</h6>
              </div>
            )}
          </ResponsiveContainer>
        </div>
      )} 
      {/* </div> */}
    </div>
  );
};

export default Section14;



