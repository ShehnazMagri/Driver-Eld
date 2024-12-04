import React, { useState, useEffect, useRef } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

// dayjs.extend(isBetween);
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DateRangePicker } from "@mui/x-date-pickers-pro";
dayjs.extend(isBetween);
import { DateRangePicker, LocalizationProvider } from "@mui/x-date-pickers-pro";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Section1 = ({ driver, vichels, trailer, Voilation }) => {
  const [activeData, setActiveData] = useState("drivers");
  const [dynamicData, setDynamicData] = useState({
    drivers: [],
    vehicles: [],
    trailers: [],
    voilations: [],
  });
  const [activeTab, setActiveTab] = useState("all");
  const [dateRange, setDateRange] = useState([null, null]);
  // const [startDate, endDate] = dateRange;
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const endDateInputRef = useRef(null);
  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (endDateInputRef.current) {
      console.log(endDateInputRef.current);
      endDateInputRef.current.input.focus();
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  useEffect(() => {
    const generateDynamicData = () => {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      // Initialize monthly data arrays
      const monthlyData = {
        drivers: Array(12).fill(0),
        vehicles: Array(12).fill(0),
        trailers: Array(12).fill(0),
        voilation: Array(12).fill(0),
      };
      const isWithinDateRange = (date) => {
        if (!startDate || !endDate) return true;
        const checkDate = new Date(date);
        return checkDate >= startDate && checkDate <= endDate;
      };

      // Count drivers added per month
      if (driver?.payload?.drivers) {
        driver?.payload?.drivers?.forEach((driver) => {
          const createdAt = new Date(driver.createdAt);
          const monthIndex = createdAt.getMonth();
          //   monthlyData.drivers[monthIndex] += 1;
          // Check if the driver's createdAt date is within the selected date range
          if (isWithinDateRange(driver.createdAt)) {
            monthlyData.drivers[monthIndex] += 1; // Increment count if within range
          }
        });
      }
      // Count vehicles per month
      if (Array.isArray(vichels?.vichels)) {
        vichels?.vichels?.forEach((vehicle) => {
          //   if (isWithinDateRange(vehicle.createdAt)) {
          const createdAt = new Date(vehicle.createdAt);
          const monthIndex = createdAt.getMonth(); // `getMonth()` returns month index (0-11)
          if (isWithinDateRange(vehicle.createdAt)) {
            monthlyData.vehicles[monthIndex] += 1; // Increment the count for the respective month
          }
        });
      }
      // Count trailers added per month
      if (trailer?.payload?.trailers) {
        trailer?.payload?.trailers?.forEach((trailer) => {
          const createdAt = new Date(trailer.createdAt);
          const monthIndex = createdAt.getMonth();
          if (isWithinDateRange(trailer.createdAt)) {
            monthlyData.trailers[monthIndex] += 1;
          }
        });
      }
      // Count violations per month
      if (Array.isArray(Voilation?.payload?.violations)) {
        Voilation?.payload?.violations?.forEach((violation) => {
          const createdAt = new Date(violation.createdAt);
          const monthIndex = createdAt.getMonth();
          if (isWithinDateRange(violation.createdAt)) {
            monthlyData.voilation[monthIndex] += 1;
          }
        });
      }

      if (!startDate && !endDate) {
        monthlyData.drivers[9] = driver.payload?.total;
        monthlyData.vehicles[9] = vichels?.total;
        monthlyData.trailers[9] = trailer?.payload?.total || 0;
        monthlyData.voilation[9] = Voilation.payload?.total || 0;
      }
      // else {
      //   // Total values distributed across months for All tab
      //   const totalDrivers = driver.payload?.total || 0;
      //   const totalVehicles = vichels?.total || 0;
      //   const totalTrailers = trailer?.payload?.total || 0;
      //   const totalViolations = Voilation?.payload?.total || 0;

      //   // Distribute totals across months (showing full total in October)
      //   monthlyData.drivers[9] = totalDrivers;
      //   monthlyData.vehicles[9] = totalVehicles;
      //   monthlyData.trailers[9] = totalTrailers;
      //   monthlyData.voilation[9] = totalViolations;
      // }
      return {
        drivers: months.map((month, index) => ({
          name: month,
          value: monthlyData.drivers[index],
        })),
        vehicles: months.map((month, index) => ({
          name: month,
          value: monthlyData.vehicles[index],
        })),
        trailers: months.map((month, index) => ({
          name: month,
          value: monthlyData.trailers[index],
        })),
        voilation: months.map((month, index) => ({
          name: month,
          value: monthlyData.voilation[index],
        })),
      };
    };
    setDynamicData(generateDynamicData());
  }, [driver, vichels, trailer, Voilation, startDate, endDate]);

  const handleCardClick = (dataKey) => {
    setActiveData(dataKey);
  };

  // Calculate filtered totals based on date range
  const getFilteredTotal = (type) => {
    if (!startDate || !endDate) {
      switch (type) {
        case "drivers":
          return driver.payload?.total || 0;
        case "vehicles":
          return vichels?.total || 0;
        case "trailers":
          return trailer?.payload?.total || 0;
        case "voilation":
          return Voilation?.payload?.total || 0;
        default:
          return 0;
      }
    }
    return dynamicData[type]?.reduce((acc, item) => acc + item.value, 0) || 0;
  };

  const getFilteredWithoutDateRangeTotal = (type) => {
    switch (type) {
      case "drivers":
        return driver.payload?.total || 0;
      case "vehicles":
        return vichels?.total || 0;
      case "trailers":
        return trailer?.payload?.total || 0;
      case "voilation":
        return Voilation?.payload?.total || 0;
      default:
        return 0;
    }
  };

  // witg date range
  const cards = [
    {
      title: "All Drivers",
      value: getFilteredTotal("drivers"),
      key: "drivers",
    },
    {
      title: "All Trucks",
      value: getFilteredTotal("vehicles"),
      key: "vehicles",
    },
    {
      title: "All Trailers",
      value: getFilteredTotal("trailers"),
      key: "trailers",
    },
    {
      title: "Violations",
      value: getFilteredTotal("voilation"),
      key: "voilation",
    },
  ];

  // without date raneg
  const cardss = [
    {
      title: "All Drivers",
      value: getFilteredWithoutDateRangeTotal("drivers"),
      key: "drivers",
    },
    {
      title: "All Trucks",
      value: getFilteredWithoutDateRangeTotal("vehicles"),
      key: "vehicles",
    },
    {
      title: "All Trailers",
      value: getFilteredWithoutDateRangeTotal("trailers"),
      key: "trailers",
    },
    {
      title: "Violations",
      value: getFilteredWithoutDateRangeTotal("voilation"),
      key: "voilation",
    },
  ];

  // Create chart data for the All tab
  const chartDataAll = [
    { name: "Drivers", value: getFilteredWithoutDateRangeTotal("drivers") },
    { name: "Trucks", value: getFilteredWithoutDateRangeTotal("vehicles") },
    { name: "Trailers", value: getFilteredWithoutDateRangeTotal("trailers") },
    {
      name: "Violations",
      value: getFilteredWithoutDateRangeTotal("voilation"),
    },
  ];

  // This function formats the tooltip content
  const formatTooltip = (value, name) => {
    const driverCount = getFilteredWithoutDateRangeTotal("drivers");
    const truckCount = getFilteredWithoutDateRangeTotal("vehicles");
    const trailerCount = getFilteredWithoutDateRangeTotal("trailers");
    const violationCount = getFilteredWithoutDateRangeTotal("violations");

    switch (name) {
      case "Drivers":
        return [
          `Drivers: ${value}`,
          `Trucks: ${truckCount}`,
          `Trailers: ${trailerCount}`,
          `Violations: ${violationCount}`,
        ];
      case "Trucks":
        return [
          `Trucks: ${value}`,
          `Drivers: ${driverCount}`,
          `Trailers: ${trailerCount}`,
          `Violations: ${violationCount}`,
        ];
      case "Trailers":
        return [
          `Trailers: ${value}`,
          `Drivers: ${driverCount}`,
          `Trucks: ${truckCount}`,
          `Violations: ${violationCount}`,
        ];
      case "Violations":
        return [
          `Violations: ${value}`,
          `Drivers: ${driverCount}`,
          `Trucks: ${truckCount}`,
          `Trailers: ${trailerCount}`,
        ];
      default:
        return [value];
    }
  };

  const cardColors = {
    // drivers: { bg: "#EDE9FE", color: "#6D28D9" },
    // vehicles: { bg: "#FEF3C7", color: "#D97706" },
    // trailers: { bg: "#D1FAE5", color: "#059669" },
    // voilation: { bg: "#DBEAFE", color: "#2563EB" },
    drivers: { bg: "#EDE9FE", color: "#7F3FFF" },
    vehicles: { bg: "#FEF3C7", color: "#D97706" },
    trailers: { bg: "#D1FAE5", color: "#61ae41" },
    voilation: { bg: "#DBEAFE", color: "#dc3545" },
  };

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

  const datastatic = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  
const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};


  return (
    
    <div className="card fleetPerformance_card">

    

      <div className="report-snapshot-header">
        <h5
          className="card-title mb-0 font-weight-bold"
          style={{ letterSpacing: "0.05em" }}
        >
          {" "}
          Fleet Performance Overview{" "}
        </h5>
        <div className="relative">
          <div
            style={{
              display: "flex",
              borderRadius: "5px",
              overflow: "hidden",
              backgroundColor: "#ffffff",
              alignItems: "center",
            }}
          >
            {activeTab === "overview" && (
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
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateRangePicker
                    calendars={1}
                    startText="Select Start Date"
                    endText="Select End Date"
                    value={dateRange}
                    onChange={(newValue) => setDateRange(newValue)}
                    renderInput={(startProps, endProps) => (
                      <div>
                        <input
                          {...startProps}
                          placeholder="Select Start Date"
                          className="select-date-button"
                        />
                        <input
                          {...endProps}
                          placeholder="Select End Date"
                          className="select-date-button"
                        />
                      </div>
                    )}
                  />
                  
                  </LocalizationProvider> */}
                <div className="date-range-container">
                  <div>
                    <DatePicker
                      selected={startDate}
                      onChange={handleStartDateChange}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      dateFormat="MM/dd/yyyy"
                      placeholderText="Select Start Date"
                    />
                  </div>
                  <div>
                    <DatePicker
                      selected={endDate}
                      onChange={handleEndDateChange}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate} // Prevent selecting end date before start date
                      dateFormat="MM/dd/yyyy"
                      placeholderText="Select End Date"
                      ref={endDateInputRef}
                    />
                  </div>
                </div>
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
                    <DatePicker
                      calendars={1}
                      label="Start Date"
                      value={dateRange[0]} // Use the first value in dateRange for the start date
                      onChange={(newValue) =>
                        setDateRange([newValue, dateRange[1]])
                      } // Update only the start date
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select Start Date"
                          className="select-date-button"
                        />
                      )}
                    />
                    <DatePicker
                      label="End Date"
                      value={dateRange[1]} // Use the second value in dateRange for the end date
                      onChange={(newValue) =>
                        setDateRange([dateRange[0], newValue])
                      } // Update only the end date
                      minDate={dateRange[0]} // Ensure the end date is after the start date
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select End Date"
                          className="select-date-button"
                        />
                      )}
                    />
                  </Box>
                </LocalizationProvider> */}
              </div>
            )}

            {["All", "overview"].map((tab) => (
              <button
                key={tab}
                className={`px-3 py-1 text-sm ${
                  activeTab === tab.toLowerCase()
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

      {/* Show the AreaChart only if the All tab is active */}
      {activeTab === "all" && (
        <>
          <div className="cards-grid">
            {cardss.map((card) => {
              const cardColor = cardColors[card.key] || {
                bg: "#f0f0f0",
                color: "#000",
              };
              const { bg, color } = cardColor;

              const isActive = activeData === card.key;

              return (
                <div
                  key={card.key}
                  className="card-item"
                  style={{
                    backgroundColor: isActive ? bg : "#f0f0f0",
                    color: isActive ? color : "#000",
                    cursor: "pointer",
                    padding: "1rem",
                    borderRadius: "8px",
                  }}
                  onClick={() => handleCardClick(card.key)}
                >
                  <h2>{card.title}</h2>
                  <p>{card.value}</p>
                </div>
              );
            })}
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height={350}>
{/* 
            <BarChart
  width={500}
  height={300}
  data={chartDataAll}
  margin={{
    top: 20,
    right: 30,
    left: 20,
    bottom: 5,
  }}
>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip formatter={(value, name) => [value, name]} />
  <Bar
    dataKey="value" // Use the same `dataKey` as in AreaChart
    fill="#8884d8"
    shape={<TriangleBar />}
    label={{ position: 'top' }}
  >
    {chartDataAll?.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={colors[index % 20]} />
    ))}
  </Bar>
</BarChart> */}


            
              <AreaChart
                data={chartDataAll}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={cardColors["drivers"].color}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={cardColors["drivers"].color}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={formatTooltip} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={cardColors["drivers"].color}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {/* Show the AreaChart only if the Overview tab is active */}
      {activeTab === "overview" && (
        <div className="relative">
          <div className="cards-grid">
            {cards.map((card) => {
              const { bg, color } = cardColors[card.key];
              const isActive = activeData === card.key;
              return (
                <div
                  key={card.key}
                  className="card-item"
                  style={{
                    backgroundColor: isActive ? bg : "#f0f0f0",
                    color: isActive ? color : "#000",
                    cursor: "pointer",
                    padding: "1rem",
                    borderRadius: "8px",
                  }}
                  onClick={() => setActiveData(card.key)}
                >
                  <h2>{card.title}</h2>
                  <p>{card.value}</p>
                </div>
              );
            })}
          </div>

          <div className="chart-container">
            <ResponsiveContainer
              width="100%"
              height={350}
              style={{ marginTop: "2rem" }}
            >
              <AreaChart
                data={dynamicData[activeData]} // Use dynamic data from API
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={cardColors[activeData].color} // Dynamic color for the gradient
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={cardColors[activeData].color}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [value, activeData]} />
                <Area
                  type="monotone"
                  dataKey="value" // Adjust dataKey to match the API's data structure
                  stroke={cardColors[activeData].color}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Section1;
