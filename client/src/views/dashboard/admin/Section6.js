import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  AreaChart,
  LineChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Line
} from "recharts";
import { BarChart, Bar } from "recharts";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          padding: "12px",
          border: "none",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <p
          style={{
            margin: 0,
            fontWeight: "bold",
            fontSize: "14px",
            marginBottom: "8px",
          }}
        >
          {label}
        </p>
        {payload.map((entry, index) => (
          <p
            key={index}
            style={{
              margin: "4px 0",
              color: entry.color,
              fontSize: "13px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: entry.color,
                borderRadius: "50%",
                marginRight: "8px",
              }}
            ></span>
            <span>{`${entry.name}: ${entry.value}`}</span>
            {/* */}
            {entry.dataKey === "newDrivers" && (
              <span
                style={{
                  marginLeft: "8px",
                  color: entry.payload.change >= 0 ? "#10b981" : "#ef4444",
                }}
              >
                {entry.payload.change >= 0 ? "▲" : "▼"}{" "}
                {Math.abs(entry.payload.change).toFixed(2)}%
              </span>
            )}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Section6 = ({ driver }) => {
  const { drivers = [], total = 0 } = driver?.payload || {};
  const totalDrivers = driver?.payload?.total || 0;
  const [dateRange, setDateRange] = useState([null, null]);
  const [activeTab, setActiveTab] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const endDateInputRef = useRef(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (endDateInputRef.current) {
      endDateInputRef.current.input.focus();
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  // Calculate monthly data for the chart
  const monthlyData = useMemo(() => {
    const data = drivers.reduce((acc, curr) => {
      const createdAt = new Date(curr.createdAt);
      const month = format(createdAt, "MMMM yyyy");
      if (!acc[month]) {
        acc[month] = {
          date: month,
          newDrivers: 0, // This will store what was previously totalDrivers
          allDrivers: totalDrivers, // This will store the total drivers from API
        };
      }
      acc[month].newDrivers += 1; // Incrementing what was previously totalDrivers
      return acc;
    }, {});
    return data;
  }, [drivers, totalDrivers]);

  // const chartData = useMemo(() => {
  //   const data = Object.values(monthlyData)
  //     .map((item, index, array) => {
  //       if (index > 0) {
  //         const previousMonth = array[index - 1];
  //         item.change = previousMonth.newDrivers
  //           ? ((item.newDrivers - previousMonth.newDrivers) /
  //               previousMonth.newDrivers) *
  //             100
  //           : 0;
  //       } else {
  //         item.change = 0;
  //       }
  //       return item;
  //     })
  //     .filter((item) => {
  //       const itemDate = new Date(item.date);
  //       return (
  //         (!startDate || itemDate >= startDate) &&
  //         (!endDate || itemDate <= endDate)
  //       );
  //     })
  //     .sort((a, b) => new Date(a.date) - new Date(b.date));

  //   if (data.length === 0) {
  //     return [{ date: "No Data", newDrivers: 0, allDrivers: 0, change: 0 }];
  //   }
  //   return data;
  // }, [monthlyData, startDate, endDate]);
  // const chartDataWithoutDateRange = useMemo(() => {
  //   const data = Object.values(monthlyData)
  //     .map((item, index, array) => {
  //       if (index > 0) {
  //         const previousMonth = array[index - 1];
  //         item.change = previousMonth.newDrivers
  //           ? ((item.newDrivers - previousMonth.newDrivers) /
  //               previousMonth.newDrivers) *
  //             100
  //           : 0;
  //       } else {
  //         item.change = 0;
  //       }
  //       return item;
  //     })
  //     .sort((a, b) => new Date(a.date) - new Date(b.date));

  //   if (data.length === 0) {
  //     return [{ date: "No Data", newDrivers: 0, allDrivers: 0, change: 0 }];
  //   }
  //   return data;
  // }, [monthlyData]);

  const chartData = useMemo(() => {
    const data = Object.values(monthlyData)
      .map((item, index, array) => {
        if (index > 0) {
          const previousMonth = array[index - 1];
          item.change = previousMonth.newDrivers
            ? ((item.newDrivers - previousMonth.newDrivers) / previousMonth.newDrivers) * 100
            : 0;
        } else {
          item.change = 0; // No change for the first month
        }
        return item;
      })
      .filter((item) => {
        const itemDate = new Date(item.date);
        return (
          (!startDate || itemDate >= startDate) &&
          (!endDate || itemDate <= endDate)
        );
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  
    if (data.length === 0) {
      return [{ date: "No Data", newDrivers: 0, allDrivers: 0, change: 0 }];
    }
    return data;
  }, [monthlyData, startDate, endDate]);

  const chartDataWithoutDateRange = useMemo(() => {
    const data = Object.values(monthlyData)
      .map((item, index, array) => {
        if (index > 0) {
          const previousMonth = array[index - 1];
          item.change = previousMonth.newDrivers
            ? ((item.newDrivers - previousMonth.newDrivers) / previousMonth.newDrivers) * 100
            : 0;
        } else {
          item.change = 0; // No change for the first month
        }
        return item;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  
    if (data.length === 0) {
      return [{ date: "No Data", newDrivers: 0, allDrivers: 0, change: 0 }];
    }
    return data;
  }, [monthlyData]);
  
  
  return (
    <div
      className="card"
      style={{
        width: "100%",
        height: 500,
        padding: "24px",
        borderRadius: "16px",
      }}
    >
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
          Driver Monthly Growth 
        </h5>
        <div style={{ position: "relative" }}>
          <div
            style={{
              display: "flex",
              borderRadius: "5px",
              overflow: "hidden",
              backgroundColor: "#f5f5f5",
            }}
          >
            {activeTab === "overview" && (
              <div
                className="date-picker-container"
                style={{
                  color: "#000",
                  cursor: "pointer",
                  borderRadius: "8px",
                  width: "fit-content",
                }}
              >
                <div
                  className="date-range-container"
                  style={{ display: "flex", gap: "8px" }}
                >
                  <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="MM/dd/yyyy"
                    placeholderText="Select Start Date"
                  />
                  <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    dateFormat="MM/dd/yyyy"
                    placeholderText="Select End Date"
                    ref={endDateInputRef}
                  />
                </div>
              </div>
            )}

            {["All", "Overview"].map((tab) => (
              <button
                key={tab}
                className={`px-3 py-1 text-sm ${
                  activeTab === tab.toLowerCase()
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-900"
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

      {activeTab === "overview" && (
        <>
          <ResponsiveContainer width="100%" height="90%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              animationDuration={500}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#666", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#666", fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                height={36}
                iconType="circle"
                wrapperStyle={{ fontSize: "14px", fontWeight: "500" }}
              />
              <defs>
                <linearGradient
                  id="colorAllDrivers"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient
                  id="colorNewDrivers"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="allDrivers"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorAllDrivers)"
                strokeWidth={3}
                name="Total Drivers"
                activeDot={{ r: 8 }}
                label={{ position: "top", fill: "#3b82f6", fontSize: 12 }}
              />
              <Area
                type="monotone"
                dataKey="newDrivers"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorNewDrivers)"
                strokeWidth={3}
                name="New Drivers"
                activeDot={{ r: 8 }}
                label={{ position: "top", fill: "#10b981", fontSize: 12 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </>
      )}
       

      {activeTab === "all" && (
        <>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart
              data={chartDataWithoutDateRange}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              animationDuration={500}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#666", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#666", fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                height={36}
                iconType="circle"
                wrapperStyle={{ fontSize: "14px", fontWeight: "500" }}
              />
              <Bar
                dataKey="allDrivers"
                name="Total Drivers"
                fill="url(#allDriversGradient)"
                // fill="rgba(51, 191, 191, 0.85)"
                label={{ position: "top", fill: "#fff", fontSize: 12 }}
                barSize={50} // Adjust bar width
              
                barGap={5} // Adjust the gap between bars
                groupPadding={0.1} 
              />
              <Bar
                dataKey="newDrivers"
                name="New Drivers"
                fill="url(#totalDriversGradient)"
                // fill="#C7D9D2"
                label={{ position: "top", fill: "#fff", fontSize: 12 }}
                barSize={50} // Adjust bar width
              
                barGap={5} // Adjust the gap between bars
                groupPadding={0.1}
              />
              <defs>
                {/* Gradient for All Drivers - Purple (#ad8af6) */}
                <linearGradient
                  id="allDriversGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#ad8af6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ad8af6" stopOpacity={0} />
                </linearGradient>
                {/* Gradient for Total Drivers - Green */}
                <linearGradient
                  id="totalDriversGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
};

export default Section6;



// const Section6 = ({ driver }) => {
//   const { drivers = [], total = 0 } = driver?.payload || {};
//   const totaldrivers= driver?.payload?.total;
//   console.log(totaldrivers,'totaldrivers')
//   console.log(driver,'driver')
//   const [dateRange, setDateRange] = useState([null, null]);
//   // const [startDate, endDate] = dateRange;
//   const [activeTab, setActiveTab] = useState("all");
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const endDateInputRef = useRef(null);
//   const handleStartDateChange = (date) => {
//     setStartDate(date);
//     if (endDateInputRef.current) {
//       console.log(endDateInputRef.current);
//       endDateInputRef.current.input.focus();
//     }
//   };

//   const handleEndDateChange = (date) => {
//     setEndDate(date);
//   };
//   // Calculate monthly data for the chart
//   const monthlyData = useMemo(() => {
//     return drivers.reduce((acc, curr) => {
//       const createdAt = new Date(curr.createdAt);
//       const month = format(createdAt, "MMMM yyyy"); // Group by month and year
//       if (!acc[month]) {
//         acc[month] = { date: month, totalDrivers: 0, newDrivers: 0 };
//       }
//       acc[month].totalDrivers += 1; // Count total drivers
//       if (curr.isNew) acc[month].newDrivers += 1; // Count new drivers, assuming there's an isNew flag in the driver data
//       return acc;
//     }, {});
//   }, [drivers]);
//   console.log(monthlyData, 'monthlyData')

//   // console.log( monthlyData, "Driver monthly data")

//   // const chartData = useMemo(() => {
//   //   // Filter the monthlyData based on the selected date range
//   //   const data = Object.values(monthlyData)
//   //     .filter((item) => {
//   //       const itemDate = new Date(item.date);
//   //       return (
//   //         (!startDate || itemDate >= startDate) &&
//   //         (!endDate || itemDate <= endDate)
//   //       );
//   //     })
//   //     .sort((a, b) => new Date(a.date) - new Date(b.date));

//   //   // If no data, return a default point
//   //   if (data.length === 0) {
//   //     return [{ date: "No Data", totalDrivers: 0, newDrivers: 0 }];
//   //   }
//   //   return data;
//   // }, [monthlyData, startDate, endDate]);
//   // Calculate percentage change
//   // Calculate percentage change for newDrivers

//   const chartData = useMemo(() => {
//     const data = Object.values(monthlyData)
//       .map((item, index, array) => {
//         if (index > 0) {
//           const previousMonth = array[index - 1];
//           item.change = previousMonth.newDrivers
//             ? ((item.newDrivers - previousMonth.newDrivers) /
//               previousMonth.newDrivers) *
//             100
//             : 0;
//         } else {
//           item.change = 0; // No change for the first month
//         }
//         return item;
//       })
//       .filter((item) => {
//         const itemDate = new Date(item.date);
//         return (
//           (!startDate || itemDate >= startDate) &&
//           (!endDate || itemDate <= endDate)
//         );
//       })
//       .sort((a, b) => new Date(a.date) - new Date(b.date));

//     if (data.length === 0) {
//       return [{ date: "No Data", totalDrivers: 0, newDrivers: 0, change: 0 }];
//     }
//     return data;
//   }, [monthlyData, startDate, endDate]);

//   const chartDataWithoutDateRange = useMemo(() => {
//     const data = Object.values(monthlyData)
//       .map((item, index, array) => {
//         if (index > 0) {
//           const previousMonth = array[index - 1];
//           item.change = previousMonth.newDrivers
//             ? ((item.newDrivers - previousMonth.newDrivers) /
//               previousMonth.newDrivers) *
//             100
//             : 0;
//         } else {
//           item.change = 0; // No change for the first month
//         }
//         return item;
//       })
//       .sort((a, b) => new Date(a.date) - new Date(b.date));

//     if (data.length === 0) {
//       return [{ date: "No Data", totalDrivers: 0, newDrivers: 0, change: 0 }];
//     }
//     return data;
//   }, [monthlyData]);

//   return (
//     <div
//       className="card"
//       style={{
//         width: "100%",
//         height: 500,
//         padding: "24px",
//         borderRadius: "16px",
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "24px",
//         }}
//       >
//         <h5
//           className="mb-0 font-weight-bold"
//           style={{ letterSpacing: "0.05em" }}
//         >
//           Driver Report
//         </h5>
//         <div style={{ position: "relative" }}>
//           <div
//             style={{
//               display: "flex",
//               borderRadius: "5px",
//               overflow: "hidden",
//               backgroundColor: "#f5f5f5",
//             }}
//           >
//             {activeTab === "overview" && (
//               <div
//                 className="date-picker-container"
//                 style={{
//                   // backgroundColor: "#f0f0f0",
//                   color: "#000",
//                   cursor: "pointer",
//                   // padding: "0.8rem",
//                   borderRadius: "8px",
//                   width: "fit-content",
//                   // marginTop: "1.5rem",
//                   // boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
//                 }}
//               >
//                 {/* //    <LocalizationProvider dateAdapter={AdapterDayjs}>
//               //     <DateRangePicker
//               //       calendars={1} // Use 1 calendar
//               //       startText="Select Start Date"
//               //       endText="Select End Date"
//               //       value={dateRange}
//               //       onChange={(newValue) => setDateRange(newValue)} // Update date range on change
//               //       renderInput={(startProps, endProps) => (
//               //         <React.Fragment key="date-inputs">
//               //           <input
//               //             {...startProps}
//               //             placeholder="Select Start Date"
//               //             className="select-date-button"
//               //           />
//               //           <input
//               //             {...endProps}
//               //             placeholder="Select End Date"
//               //             className="select-date-button"
//               //           />
//               //         </React.Fragment>
//               //       )}
//               //     />
//               //   </LocalizationProvider>  */}
//                 <div className="date-range-container">
//                   <div>
//                     <DatePicker
//                       selected={startDate}
//                       onChange={handleStartDateChange}
//                       selectsStart
//                       startDate={startDate}
//                       endDate={endDate}
//                       dateFormat="MM/dd/yyyy"
//                       placeholderText="Select Start Date"
//                     />
//                   </div>
//                   <div>
//                     <DatePicker
//                       selected={endDate}
//                       onChange={handleEndDateChange}
//                       selectsEnd
//                       startDate={startDate}
//                       endDate={endDate}
//                       minDate={startDate}
//                       dateFormat="MM/dd/yyyy"
//                       placeholderText="Select End Date"
//                       ref={endDateInputRef}
//                     />
//                   </div>
//                 </div>

//                </div>

//             )}

//             {["All", "overview"].map((tab) => (
//               <button
//                 key={tab}
//                 className={`px-3 py-1 text-sm ${activeTab === tab.toLowerCase()
//                     ? // ? "bg-white text-gray-900"
//                     // :
//                     "text-gray-500 hover:text-gray-900"
//                     : "bg-white text-gray-900"
//                   }`}
//                 style={{ border: "none", margin: "0" }}
//                 onClick={() => setActiveTab(tab.toLowerCase())}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {activeTab === "overview" && (
//         <>
//           <ResponsiveContainer width="100%" height="90%">
//             <AreaChart
//               data={chartData}
//               margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//               animationDuration={500} // Adds animation to the areas
//             >
//               <CartesianGrid
//                 strokeDasharray="3 3"
//                 vertical={false}
//                 stroke="#f0f0f0"
//               />
//               <XAxis
//                 dataKey="date"
//                 axisLine={false}
//                 tickLine={false}
//                 tick={{ fill: "#666", fontSize: 12 }}
//               />
//               <YAxis
//                 axisLine={false}
//                 tickLine={false}
//                 tick={{ fill: "#666", fontSize: 12 }}
//               />
//               <Tooltip content={<CustomTooltip />} />
//               <Legend
//                 verticalAlign="top"
//                 height={36}
//                 iconType="circle"
//                 wrapperStyle={{ fontSize: "14px", fontWeight: "500" }}
//               />
//               <defs>
//                 <linearGradient
//                   id="colorTotalDrivers"
//                   x1="0"
//                   y1="0"
//                   x2="0"
//                   y2="1"
//                 >
//                   <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
//                   <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
//                 </linearGradient>
//                 <linearGradient
//                   id="colorNewDrivers"
//                   x1="0"
//                   y1="0"
//                   x2="0"
//                   y2="1"
//                 >
//                   <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
//                   <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
//                 </linearGradient>
//               </defs>
//               <Area
//                 type="monotone"
//                 dataKey="totalDrivers"
//                 stroke="#3b82f6"
//                 fillOpacity={1}
//                 fill="url(#colorTotalDrivers)"
//                 strokeWidth={3}
//                 name="Total Drivers"
//                 activeDot={{ r: 8 }}
//                 label={{ position: "top", fill: "#3b82f6", fontSize: 12 }} // Data labels
//               />
//               <Area
//                 type="monotone"
//                 dataKey="newDrivers"
//                 stroke="#10b981"
//                 fillOpacity={1}
//                 fill="url(#colorNewDrivers)"
//                 strokeWidth={3}
//                 name="New Drivers"
//                 activeDot={{ r: 8 }}
//                 label={{ position: "top", fill: "#10b981", fontSize: 12 }} // Data labels
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//           {drivers.length === 0 && (
//             <div
//               style={{
//                 textAlign: "center",
//                 marginTop: "16px",
//                 fontSize: "16px",
//                 color: "#666",
//               }}
//             >
//               No data available
//             </div>
//           )}
//         </>
//       )}

//       {activeTab === "all" && (
//         <>
//         <ResponsiveContainer width="100%" height="90%">
//     <BarChart
//       data={chartDataWithoutDateRange}
//       margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//       animationDuration={500} // Adds animation to the bars
//     >
//       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
//       <XAxis
//         dataKey="date"
//         axisLine={false}
//         tickLine={false}
//         tick={{ fill: "#666", fontSize: 12 }}
//       />
//       <YAxis
//         axisLine={false}
//         tickLine={false}
//         tick={{ fill: "#666", fontSize: 12 }}
//       />
//       <Tooltip content={<CustomTooltip />} />
//       <Legend
//         verticalAlign="top"
//         height={36}
//         iconType="circle"
//         wrapperStyle={{ fontSize: "14px", fontWeight: "500" }}
//       />
//       <Bar
//         dataKey="totalDrivers"
//         name="Total Drivers"
//         fill="url(#totalDriversGradient)" // Gradient fill
//         label={{ position: "top", fill: "#fff", fontSize: 12 }} // Data labels on bars
//       />
//       <Bar
//         dataKey="newDrivers"
//         name="New Drivers"
//         fill="url(#newDriversGradient)" // Gradient fill
//         label={{ position: "top", fill: "#fff", fontSize: 12 }} // Data labels on bars
//       />
//       <defs>
//         <linearGradient id="totalDriversGradient" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} /> {/* Purple Royal */}
//           <stop offset="95%" stopColor="#6D28D9" stopOpacity={0} />
//         </linearGradient>
//         <linearGradient id="newDriversGradient" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="5%" stopColor="#A78BFA" stopOpacity={0.8} /> {/* Lavender Dream */}
//           <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
//         </linearGradient>
//       </defs>
//     </BarChart>
//   </ResponsiveContainer>
//           {drivers.length === 0 && (
//             <div
//               style={{
//                 textAlign: "center",
//                 marginTop: "16px",
//                 fontSize: "16px",
//                 color: "#666",
//               }}
//             >
//               No data available
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };
