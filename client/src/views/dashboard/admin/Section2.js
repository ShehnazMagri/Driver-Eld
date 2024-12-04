import React, { useState } from "react";
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
} from "recharts";
import { Button } from "react-bootstrap";
import "./admin.css";
import { generatePDF } from "components/common/pdfUtils";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Box, LinearProgress, Typography } from "@mui/material";

const CardContent = ({ children }) => (
  <div style={{ padding: "0.5rem" }}>{children}</div>
);


const Section2 = ({ driver }) => {
  const users = driver.payload?.drivers || [];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;


  // Get current date and date 7 days ago
  const currentDate = new Date();
  const sevenDaysAgo = new Date(
    currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
  );
  const fourteenDaysAgo = new Date(
    currentDate.getTime() - 14 * 24 * 60 * 60 * 1000
  );
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  
  
  const recentDrivers = users.filter(
    (d) => new Date(d.createdAt) >= sevenDaysAgo
  );

  // Drivers added in the previous 7 days (last week)
  const lastWeekDrivers = users.filter(
    (d) =>
      new Date(d.createdAt) >= fourteenDaysAgo &&
      new Date(d.createdAt) < sevenDaysAgo
  );
  const hasIncreasedDrivers = recentDrivers.length > lastWeekDrivers.length;

  // Count recent users per country (only from last 7 days)
  const userCountByCountry = recentDrivers.reduce((acc, user) => {
    const country = user.country.toLowerCase();
    acc[country] = (acc[country] || 0) + 1;
    return acc;
  }, {});

  // Prepare chart data for Highcharts (add percentage calculation)
  const chartData = Object.entries(userCountByCountry).map(([country, count]) => ({
    name: country.charAt(0).toUpperCase() + country.slice(1),
    y: count,
    color: getRandomColor(), 
  }));
  const totalDrivers = chartData.reduce((total, data) => total + data.y, 0);

  chartData.forEach((data) => {
    data.percentage = ((data.y / totalDrivers) * 100).toFixed(1);
  });

  const handleDownloadDriverReport = () => { };

  // Pagination for table data
  const totalPages = Math.ceil(
    Object.entries(userCountByCountry).length / itemsPerPage
  );
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = Object.entries(userCountByCountry).slice(
    startIdx,
    startIdx + itemsPerPage
  );


  // Highcharts options configuration with dataLabels to show percentage on top of each bar
  const options = {
    title:null,
    chart: {
      type: "column",
      height: 250,
    },
    accessibility: {
      announceNewData: {
        enabled: true,
      },
    },
    xAxis: {
      type: "category",
      categories: chartData.map((data) => data.name),
    },
    yAxis: {
      title: {
        text: "Number of Drivers",
      },
      labels: {
        formatter: function () {
          return this.value; // Format Y axis labels
        },
      },
    },
    tooltip: {
      pointFormat: "{point.name}: <b>{point.y} drivers ({point.percentage}%)</b>",
    },
    plotOptions: {
      series: {
        borderWidth: 0, // No borders around bars
        pointWidth: 50, // Set the bar width (like `barSize={30}` in Recharts)
        pointPadding: 0.2, // Adjust this value to reduce the gap between bars
        groupPadding: 0.1,
        dataLabels: {
          enabled: true,
          format: "{point.percentage:.1f}%", // Show percentage on top of bars
          style: {
            fontWeight: "bold",
            color: "black",
            textOutline: "none", // No outline around text
          },
        },
      },
    },
    legend: {
      enabled: false, // Hide the legend
    },
    series: [
      {
        name: "Drivers",
        colorByPoint: true, // Different color for each bar
        data: chartData,
      },
    ],
  };

  const maxCount = Math.max(...currentItems.map(([_, count]) => count));
  const totalCount = currentItems.reduce((acc, [_, count]) => acc + count, 0);
  return (
    <div className="card dashboard-card" style={{ minHeight: "629px" }}>
      <CardContent>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0 font-weight-bold">Weekly Driver Overview</h5>
          <div className="users-count ">
            <span className="count-number">{recentDrivers.length || 0}</span>
            {hasIncreasedDrivers ? (
              <span className="count-change-up">↑</span>
            ) : (
              <span className="count-change-down">↓</span>
            )}
          </div>
        </div>
        <div mb-5>
          <h5>Drivers by States (Last 7 Days)</h5>
          <ResponsiveContainer width="100%">
            <div className="highcharts-figure">
              <HighchartsReact highcharts={Highcharts} options={options}/>
            </div>
          </ResponsiveContainer>
        </div>

        <div className="d-flex justify-content-between my-3">
          <div mb-5>Drivers by States (Last 7 Days)</div>
          <button onClick={handleDownloadDriverReport} className="download-btn">
            Download
          </button>
        </div>

        <div className="table-container" style={{ height: "200px", overflowY: "auto" }}>

          <table className="table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr className="table-head">
                <th>State</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map(([state, count], index) => (
                  <tr key={`${state}-${index}`} className="table-row">
                    <td>{state}</td>
                    <td>
                      <Box display="flex" alignItems="center" width="100%">
                        <LinearProgress
                          variant="determinate"
                          value={(count / totalCount) * 100}
                          sx={{
                            width: "100%",
                            height: "8px",
                            marginRight: "8px",
                            borderRadius: "4px",
                            backgroundColor: "#e0e0e0",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: chartData.find(elem => elem.name.toLowerCase() === state.toLowerCase())
                                ? chartData.find(elem => elem.name.toLowerCase() === state.toLowerCase()).color
                                : "#00CC96", 
                            },
                          }}
                        />


                        <span>{count}</span>
                      </Box>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <nav aria-label="Page navigation" className="mt-4">
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  aria-label="Previous"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                >
                  &laquo;
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <li
                    key={page}
                    className={`page-item ${page === currentPage ? "active" : ""
                      }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  </li>
                )
              )}
              <li
                className={`page-item ${currentPage === totalPages ? "disabled" : ""
                  }`}
              >
                <button
                  className="page-link"
                  aria-label="Next"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                >
                  &raquo;
                </button>
              </li>
            </ul>
          </nav>
        )}
      </CardContent>
    </div>
  );
};

export default Section2;























// const Section2 = ({ driver }) => {
//   const users = driver.payload?.drivers || [];
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   // Get current date and date 7 days ago
//   const currentDate = new Date();
//   const sevenDaysAgo = new Date(
//     currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
//   );
//   const fourteenDaysAgo = new Date(
//     currentDate.getTime() - 14 * 24 * 60 * 60 * 1000
//   );

//   const recentDrivers = users.filter(
//     (d) => new Date(d.createdAt) >= sevenDaysAgo
//   );

//   // Drivers added in the previous 7 days (last week)
//   const lastWeekDrivers = users.filter(
//     (d) =>
//       new Date(d.createdAt) >= fourteenDaysAgo &&
//       new Date(d.createdAt) < sevenDaysAgo
//   );

//   const hasIncreasedDrivers = recentDrivers.length > lastWeekDrivers.length;

//   // Count recent users per country (only from last 7 days)
//   const userCountByCountry = recentDrivers.reduce((acc, user) => {
//     const country = user.country.toLowerCase();
//     // acc[user.country] = (acc[user.country] || 0) + 1;
//     acc[country] = (acc[country] || 0) + 1;
//     return acc;
//   }, {});

//   // Convert to array for pagination
//   const countryData = Object.entries(userCountByCountry).map(
//     ([country, count]) => [
//       country.charAt(0).toUpperCase() + country.slice(1),
//       count,
//     ]
//   );

//   // Calculate pagination
//   const totalPages = Math.ceil(countryData.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentItems = countryData.slice(startIndex, endIndex);

//   // Prepare chart data based on recent drivers by country
//   const chartData = Object.entries(userCountByCountry).map(
//     ([country, count]) => ({
//       country: country.charAt(0).toUpperCase() + country.slice(1), // Capitalize the first letter
//       value: count,
//     })
//   );

//  // New function to download PDF
// const handleDownloadDriverReport = () => {
//   generatePDF({
//     title: "Weekly Driver Overview",
//     generalInfo: [`New Drivers in the Last 7 Days: ${recentDrivers.length}`],
//     tables: [
//       {
//         headers: ["State", "Count"],
//         rows: currentItems.map(([country, count]) => [country, count]),
//       },
//     ],
//     filename: "weekly_driver_overview.pdf",
//   });
// };

// const options = {
//   chart: {
//     type: 'column'
//   },
//   title: {
//     align: 'left',
//     text: 'Browser market shares. January, 2022'
//   },
//   subtitle: {
//     align: 'left',
//     text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
//   },
//   accessibility: {
//     announceNewData: {
//       enabled: true
//     }
//   },
//   xAxis: {
//     type: 'category'
//   },
//   yAxis: {
//     title: {
//       text: 'Total percent market share'
//     }
//   },
//   legend: {
//     enabled: false
//   },
//   plotOptions: {
//     series: {
//       borderWidth: 0,
//       dataLabels: {
//         enabled: true,
//         format: '{point.y:.1f}%'
//       }
//     }
//   },
//   tooltip: {
//     headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
//     pointFormat: '<span style="color:{point.color}">{point.name}</span>: ' +
//       '<b>{point.y:.2f}%</b> of total<br/>'
//   },
//   series: [
//     {
//       name: 'Browsers',
//       colorByPoint: true,
//       data: [
//         { name: 'Chrome', y: 63.06, drilldown: 'Chrome' },
//         { name: 'Safari', y: 19.84, drilldown: 'Safari' },
//         { name: 'Firefox', y: 4.18, drilldown: 'Firefox' },
//         { name: 'Edge', y: 4.12, drilldown: 'Edge' },
//         { name: 'Opera', y: 2.33, drilldown: 'Opera' },
//         { name: 'Internet Explorer', y: 0.45, drilldown: 'Internet Explorer' },
//         { name: 'Other', y: 1.582, drilldown: null }
//       ]
//     }
//   ],
//   drilldown: {
//     breadcrumbs: {
//       position: {
//         align: 'right'
//       }
//     },
//     series: [
//       {
//         name: 'Chrome',
//         id: 'Chrome',
//         data: [
//           ['v65.0', 0.1],
//           ['v64.0', 1.3],
//           ['v63.0', 53.02],
//           ['v62.0', 1.4],
//           ['v61.0', 0.88],
//           ['v60.0', 0.56],
//           ['v59.0', 0.45],
//           ['v58.0', 0.49],
//           ['v57.0', 0.32],
//           ['v56.0', 0.29],
//           ['v55.0', 0.79],
//           ['v54.0', 0.18],
//           ['v51.0', 0.13],
//           ['v49.0', 2.16],
//           ['v48.0', 0.13],
//           ['v47.0', 0.11],
//           ['v43.0', 0.17],
//           ['v29.0', 0.26]
//         ]
//       },
//       {
//         name: 'Firefox',
//         id: 'Firefox',
//         data: [
//           ['v58.0', 1.02],
//           ['v57.0', 7.36],
//           ['v56.0', 0.35],
//           ['v55.0', 0.11],
//           ['v54.0', 0.1],
//           ['v52.0', 0.95],
//           ['v51.0', 0.15],
//           ['v50.0', 0.1],
//           ['v48.0', 0.31],
//           ['v47.0', 0.12]
//         ]
//       },
//       {
//         name: 'Internet Explorer',
//         id: 'Internet Explorer',
//         data: [
//           ['v11.0', 6.2],
//           ['v10.0', 0.29],
//           ['v9.0', 0.27],
//           ['v8.0', 0.47]
//         ]
//       },
//       {
//         name: 'Safari',
//         id: 'Safari',
//         data: [
//           ['v11.0', 3.39],
//           ['v10.1', 0.96],
//           ['v10.0', 0.36],
//           ['v9.1', 0.54],
//           ['v9.0', 0.13],
//           ['v5.1', 0.2]
//         ]
//       },
//       {
//         name: 'Edge',
//         id: 'Edge',
//         data: [
//           ['v16', 2.6],
//           ['v15', 0.92],
//           ['v14', 0.4],
//           ['v13', 0.1]
//         ]
//       },
//       {
//         name: 'Opera',
//         id: 'Opera',
//         data: [
//           ['v50.0', 0.96],
//           ['v49.0', 0.82],
//           ['v12.1', 0.14]
//         ]
//       }
//     ]
//   }
// };
//   return (
//
//        <div>
//       <div className="card dashboard-card" style={{ height: "629px" }}>
//         <CardContent>    <div className="d-flex justify-content-between">
//             <h5 className="mb-0 font-weight-bold">Weekly Driver Overview</h5>
//             <div className="users-count">
//               <span className="count-number">{recentDrivers.length || 0}</span>
//               {hasIncreasedDrivers ? (
//                 <span className="count-change-up">↑</span>
//               ) : (
//                 <span className="count-change-down">↓</span>
//               )}
//             </div>
//           </div>
//           {/* <p className="text-sm text-gray-500">
//             {hasIncreasedDrivers ? (
//               <span className="text-green-500">
//                 +{recentDrivers.length} new drivers in last 7 days
//               </span>
//             ) : (
//               <span className="text-red-500">
//                 No new drivers in last 7 days
//               </span>
//             )}
//           </p> */}

//           {/* <p className="time-period">In Last 30 Minutes</p> */}
//           <h5> Drivers by States (Last 7 Days)</h5>
//           <ResponsiveContainer width="100%" height={179}>
//             <BarChart
//               // data={chartData}
//               data={
//                 chartData && chartData.length > 0
//                   ? chartData
//                   : [{ day: "No Data", value: 0 }]
//               }
//             >
//               <XAxis dataKey="day" tick={false} />
//               <YAxis />
//               <Tooltip
//                 cursor={{ fill: "transparent" }}
//                 formatter={(value, name, props) => [
//                   `Drivers: ${value}`,
//                   `Country: ${props.payload.country || 0}`,
//                 ]}
//               />
//               <Bar dataKey="value" fill="#6D28D9" barSize={30} />
//             </BarChart>
//           </ResponsiveContainer>

//           {/* <h2> Drivers by States (Last 7 Days)</h2> */}
//           <div class="container">
//             <div style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
//               <div class="">Drivers by States (Last 7 Days)</div>
//               <div class="" style={{marginRight:"-15px"}}>
//                 <button
//                   onClick={handleDownloadDriverReport} // Function to handle download action
//                   // className="bg-blue-500 text-black px-1 py-0 text-sm rounded hover:bg-blue-600 transition duration-300"
//                   className="download-btn"
//                 >
//                   Download
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="table-container" style={{ height: "200px", overflowY: "auto" }}>
//             <table className="table">
//               <thead>
//                 <tr className="table-head">
//                   <th>States</th>
//                   <th> Count</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentItems.length > 0 ? (
//                   currentItems.map(([country, count], index) => (
//                     <tr key={`${country}-${index}`} className="table-row">
//                       <td>{country}</td>
//                       <td>{count}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="2" style={{ textAlign: "center" }}>
//                       No data found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//             {/* Pagination Controls */}
//             {totalPages > 1 && (
//               <nav aria-label="Page navigation example" className="mt-4">
//                 <ul className="pagination justify-content-center">
//                   {/* Previous Button */}
//                   <li
//                     className={`page-item ${
//                       currentPage === 1 ? "disabled" : ""
//                     }`}
//                   >
//                     <a
//                       className="page-link"
//                       href="#"
//                       aria-label="Previous"
//                       onClick={() =>
//                         setCurrentPage((prev) => Math.max(prev - 1, 1))
//                       }
//                     >
//                       <span aria-hidden="true">&laquo;</span>
//                     </a>
//                   </li>

//                   {/* Page Numbers */}
//                   {Array.from({ length: totalPages }, (_, i) => i + 1).map(
//                     (page) => (
//                       <li
//                         key={page}
//                         className={`page-item ${
//                           page === currentPage ? "active" : ""
//                         }`}
//                       >
//                         <a
//                           className="page-link"
//                           href="#"
//                           onClick={() => setCurrentPage(page)}
//                         >
//                           {page}
//                         </a>
//                       </li>
//                     )
//                   )}
//                   {/* Next Button */}
//                   <li
//                     className={`page-item ${
//                       currentPage === totalPages ? "disabled" : ""
//                     }`}
//                   >
//                     <a
//                       className="page-link"
//                       href="#"
//                       aria-label="Next"
//                       onClick={() =>
//                         setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                       }
//                     >
//                       <span aria-hidden="true">&raquo;</span>
//                     </a>
//                   </li>
//                 </ul>
//               </nav>
//             )}
//           </div>
//         </CardContent>
//       </div>
//     </div>
//     // <div className="highcharts-figure">
//     //   <HighchartsReact highcharts={Highcharts} options={options} />
//     //   <p className="highcharts-description">
//     //     Chart showing browser market shares. Clicking on individual columns brings up more detailed data. This chart makes use of the drilldown feature in Highcharts to easily switch between datasets.
//     //   </p>
//     // </div>
//   );
// };