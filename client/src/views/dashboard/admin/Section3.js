import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { generatePDF } from "components/common/pdfUtils";

const Section3 = ({ vichels = { total: 0 }, trailer = { total: 0 } }) => {
  // const [seriesData, setSeriesData] = useState([vichels?.total || 1, trailer?.payload?.total || 1]);
  const [trailerTypes, setTrailerTypes] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [seriesData, setSeriesData] = useState([
    vehicleTypes.length > 0 ? vichels?.total || 0 : 1, 
    trailerTypes.length > 0 ? trailer?.payload?.total || 0 : 1, 
  ]);
  useEffect(() => {
    if (vichels?.vichels && vichels?.vichels?.length > 0) {
      const types = vichels?.vichels?.map(
        (vehicle) => vehicle?.vehicleType || 0
      );
      setVehicleTypes(types);
    } else if (vichels && !Array.isArray(vichels.vichels)) {
      // console.error("No vehicles available");
    }
  }, [vichels]);


  useEffect(() => {
    const hasTrailers = trailer?.payload?.trailers && trailer?.payload.trailers.length > 0;
    if (hasTrailers) {
      const types = trailer.payload.trailers.map(trailer => trailer.trailerType);
      setTrailerTypes(types);
    } else {;
      setTrailerTypes([]); // Reset if no trailers available
    }
  }, [trailer?.payload?.trailers]);

 
  useEffect(() => {
    if (vichels?.total || trailer?.payload?.total) {
      setSeriesData([vichels?.total || 0, trailer?.payload?.total || 0]);
    }
  }, [vichels, trailer?.payload?.trailers ]);


  // Count vehicle types
  const vehicleTypeCount = vehicleTypes.reduce((acc, type) => {
    acc[type] = (acc[type] || 0) + 1; 
    return acc;
  }, {});

  const trailerTypeCount = trailerTypes.reduce((acc, type) => {
    acc[type] = (acc[type] || 0) + 1; 
    return acc;
  }, {});


  // Function for downlaod pdf file
  const handleDownloadVehicleTrailerReport = () => {
    generatePDF({
      title: "Vehicle and Trailer Report",
      generalInfo: [
        `Total Trucks: ${vichels.total}`,
        `Total Trailers: ${trailer?.payload?.total || 0}`,
      ],
      tables: [
        {
          headers: ["Vehicle Type", "Count"],
          rows: Object.entries(vehicleTypeCount).map(([type, count]) => [
            type,
            count,
          ]),
        },
        {
          headers: ["Trailer Type", "Count"],
          rows: Object.entries(trailerTypeCount).map(([type, count]) => [
            type,
            count,
          ]),
        },
      ],
      filename: "Vehicle_Trailer_Report.pdf",
    });
  };


  const chartOptions = {
    series: seriesData,
    chart: {
      type: "donut",
    },
    // labels: ['TotalTruck', 'TotalTrailer'], // Adjust labels as needed
    labels: [
      vehicleTypes.length > 0 ? "Total Truck" : "No Truck Data", 
      trailerTypes.length > 0 ? "Total Trailer" : "No Trailer Data", 
    ],
    // colors: ["#7F3FFF", "#61ae41"], // Adjust colors as needed
    colors: ["rgb(251, 156, 12)", "rgb(99, 91, 255)", "rgb(99, 91, 255)"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    tooltip: {
      y: {
        formatter: (val, { seriesIndex }) => {
          if (seriesIndex === 0 && vehicleTypes.length > 0) {
            return `${val} Truck Types: ${Object.values(
              vehicleTypeCount
            ).reduce((sum, count) => sum + count, 0)}`;
          }
          if (seriesIndex === 1 && trailerTypes.length > 0) {
            return `${val} Trailers Types: ${Object.values(
              trailerTypeCount
            ).reduce((sum, count) => sum + count, 0)}`;
            //  return `${val} Total Trailers: ${totalTrailers}<br>Trailer Count: ${val}`;
          }
          return val; // Default tooltip for other sections
        },
      },
    },
  };


  return (
    <div className="chart">
      {/* <h5 className="mb-0 font-weight-bold" style={{ letterSpacing: "0.05em" }}>  Vehicle Types Overview{" "} </h5> */}
      <div class="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <h5
            className="mb-0 font-weight-bold"
            style={{ letterSpacing: "0.05em" }}
          >
            Vehicle Types Overview{" "}
          </h5>
          <div class="" style={{ marginRight: "-10px" }}>
            <button
              onClick={handleDownloadVehicleTrailerReport} 
              // className="bg-blue-500 text-black px-1 py-0 text-sm rounded hover:bg-blue-600 transition duration-300"
              className="download-btn"
              style={{ marginRight: "1px" }}
            >
              Download
            </button>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "65%",
          height: "320px",
          paddingTop: "1rem",
          paddingLeft: "3rem",
        }}
      >
        <Chart
          options={chartOptions}
          series={seriesData}
          type="donut"
          width="380"
          // height={320}
          height="320px"
        />
      </div>
    </div>
  );
};

export default Section3;
