import React, { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import { generatePDF } from "components/common/pdfUtils";

const Section5 = ({ vichels = { total: 0 } }) => {
  const [fuelTypeCounts, setFuelTypeCounts] = useState({});
  const chartRef = useRef();

  useEffect(() => {
    // Extract and count occurrences of each fuel type from the vichels array
    if (vichels?.vichels && vichels?.vichels?.length > 0) {
      const counts = {};
      vichels?.vichels?.forEach((vehicle) => {
        const fuelType = vehicle?.fuelType
          ? vehicle.fuelType.toLowerCase()
          : "unknown";
        counts[fuelType] = (counts[fuelType] || 0) + 1; // Increment the count for this fuel type
      });
      setFuelTypeCounts(counts);
    } else {
      // console.error("No vehicles available");
    }
  }, [vichels]);

  const TotalCount = vichels?.total || 0;

 
 
  // const chartData = {
  //   series:
  //     Object.values(fuelTypeCounts).length > 0
  //       ? Object.values(fuelTypeCounts)
  //       : [1],
  //   options: {
  //     chart: {
  //       type: "donut",
  //     },
  //     labels: Object.keys(fuelTypeCounts).map((type) => {
  //       return type.charAt(0).toUpperCase() + type.slice(1);
  //     }),
  //     colors: [
  //       '#2f73b4', // Blue
  //       '#61ae41', // Green
  //       '#4a4a4a', // Black
  //       '#f26448', // Pink
  //     ],
  //     legend: {
  //       position: "bottom",
  //     },
  //     plotOptions: {
  //       pie: {
  //         donut: {
  //           size: "70%",
  //           labels: {
  //             show: true,
  //             name: {
  //               show: true,
  //               fontSize: "18px",
  //               offsetY: -10,
  //               formatter: (val) => `${val}`,
  //             },
  //             value: {
  //               show: true,
  //               fontSize: "24px",
  //               offsetY: 10,
  //               formatter: (val) => {
  //                 const total = Object.values(fuelTypeCounts).reduce(
  //                   (a, b) => a + b,
  //                   0
  //                 );
  //                 const percentage = total ? ((val / total) * 100).toFixed(1) : 0;
  //                 return `
  //                  ${val}
  //                  (${percentage}%)`; // Display count and percentage
  //               },
  //             },
  //             total: {
  //               show: true,
  //               label: "Total",
  //               formatter: () =>
  //                 Object.values(fuelTypeCounts).reduce((a, b) => a + b, 0) ||
  //                 "0", // Display total in the center
  //             },
  //           },
  //         },
  //       },
  //     },
  //     dataLabels: {
  //       enabled: false, // Disable percentage labels
  //     },
  //     responsive: [
  //       {
  //         breakpoint: 480,
  //         options: {
  //           chart: {
  //             width: 300,
  //           },
  //           legend: {
  //             position: "bottom",
  //           },
  //         },
  //       },
  //     ],
  //   },
  // };
  
  const chartData = {
    series: Object.values(fuelTypeCounts).length > 0 ? Object.values(fuelTypeCounts) : [1],
    options: {
      chart: {
        type: "donut",
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 1000
          }
        }
      },
      labels: Object.keys(fuelTypeCounts).map((type) => type.charAt(0).toUpperCase() + type.slice(1)),
      colors: ['#2f73b4', '#61ae41',  '#f26448','#4a4a4a',],
      legend: {
        position: "bottom",
        fontSize: "14px",
        fontFamily: "inherit",
        offsetY: 10,
        onItemHover: {
          highlightDataSeries: true
        }
      },
      plotOptions: {
        pie: {
          donut: {
            size: "70%",
            labels: {
              show: true,
              showAlways: true,
              label: "Total Users",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#333",
              name: {
                show: true,
                fontSize: "18px",
                offsetY: -10,
                formatter: (val) => `${val}`,
                onItemHover: {
                  style: {
                    fontSize: "20px",
                    fontWeight: "bold"
                  }
                }
              },
              value: {
                show: true,
                fontSize: "24px",
                offsetY: 10,
                formatter: (val) => {
                  const total = Object.values(fuelTypeCounts).reduce((a, b) => a + b, 0);
                  const percentage = total ? ((val / total) * 100).toFixed(1) : 0;
                  // return `${val} (${percentage}%)`;
                  return `${percentage}%`;
                },
                onItemHover: {
                  style: {
                    fontSize: "26px",
                    fontWeight: "bold"
                  }
                }
              },
              total: {
                show: true,
                label: "Total",
                formatter: () => Object.values(fuelTypeCounts).reduce((a, b) => a + b, 0) || "0",
                onItemHover: {
                  style: {
                    fontSize: "26px",
                    fontWeight: "bold"
                  }
                }
              }
            }
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    }
  };
  
  
  const handleDownloadFuelReport = () => {
    generatePDF({
      title: "Fuel Types Overview",
      generalInfo: [`Total Vehicles: ${TotalCount}`],
      tables: [
        {
          headers: ["Fuel Type", "Count"],
          rows: Object.entries(fuelTypeCounts).map(([fuelType, count]) => [
            fuelType.charAt(0).toUpperCase() + fuelType.slice(1),
            count,
          ]),
        },
      ],
      filename: "fuel_types_overview.pdf",
    });
  };
  
  

  return (
    <div className="chart">
      {/* <h5 className="mb-0 font-weight-bold" style={{ letterSpacing: '0.05em' }}>Fuel Types Overview ({TotalCount})  </h5> */}
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
            Fuel Types Overview ({TotalCount}){" "}
          </h5>
          <div class="" style={{ marginRight: "-10px" }}>
            <button
              onClick={handleDownloadFuelReport} 
              // className="bg-blue-500 text-black px-1 py-0 text-sm rounded hover:bg-blue-600 transition duration-300"
              className="download-btn"
              style={{ marginRight: "1px" }}
            >
              Download
            </button>
          </div>
        </div>
      </div>
      <div  ref={chartRef} style={{ width: "65%", height: "320px", paddingTop: "1rem" }}>
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="donut"
          width="380"
          height={270}
        />
      </div>
    </div>
  );
};



export default Section5;
