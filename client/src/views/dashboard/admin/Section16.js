import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Section16 = ({ Voilation }) => {
  const fuelConsumedData = [
    [1388534400000, 120],
    [1420070400000, 140],
    [1451606400000, 160],
    [1483228800000, 180],
    [1514764800000, 200],
    [1546300800000, 210],
    [1577836800000, 230],
    [1609459200000, 250],
    [1640995200000, 270],
    [1672531200000, 300],
  ];

  const fuelEfficiencyData = [
    [1388534400000, 5],
    [1420070400000, 6],
    [1451606400000, 6.5],
    [1483228800000, 7],
    [1514764800000, 7.2],
    [1546300800000, 7.5],
    [1577836800000, 8],
    [1609459200000, 8.5],
    [1640995200000, 9],
    [1672531200000, 9.5],
  ];

  // Calculate static data
  const totalFuelConsumed = fuelConsumedData.reduce((sum, [, value]) => sum + value, 0);
  const averageFuelEfficiency =
    fuelEfficiencyData.reduce((sum, [, value]) => sum + value, 0) / fuelEfficiencyData.length;

  const [options, setOptions] = useState({
    chart: {
      zoomType: 'x',
      alignTicks: false,
    },
    title: {
      text: 'Fuel Consumed',
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
      },
    },
    subtitle: {
      text: null,
    },
    xAxis: {
      type: 'datetime',
      gridLineWidth: 0,
      labels: {
        format: '{value:%b %Y}',
        style: {
          fontSize: '10px',
          color: '#666666',
        },
      },
    },
    yAxis: [
      {
        title: {
          text: 'Fuel Consumed (L)',
        },
        labels: {
          formatter: function () {
            return `${this.value} L`; // Adjust unit if necessary
          },
        },
      },
      {
        title: {
          text: 'Fuel Efficiency (km/L)',
        },
        opposite: true,
        labels: {
          formatter: function () {
            return `${this.value} km/L`; // Adjust unit if necessary
          },
        },
      },
    ],
    tooltip: {
      shared: true,
      xDateFormat: '%b %Y',
      pointFormat:
        '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y:,.2f}</b><br/>',
    },
    legend: {
      enabled: false,
      align: 'center',
      verticalAlign: 'bottom',
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        marker: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: 'Fuel Consumed',
        type: 'line',
        data: fuelConsumedData,
        color: '#00CC96',
      },
      {
        name: 'Fuel Efficiency',
        type: 'column',
        yAxis: 1,
        data: fuelEfficiencyData,
        color: '#A9A9A9',
        opacity: 0.4,
      },
    ],
  });

  return (
    <div className="card" style={{ height: "96%", width: "665px" }}>
      {/* <div className="stats">
        <p>Total Fuel Consumed: <strong>{totalFuelConsumed} L</strong></p>
        <p>Average Fuel Efficiency: <strong>{averageFuelEfficiency.toFixed(2)} km/L</strong></p>
      </div> */}
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Section16;






// const Section16 = ({Voilation}) => {
//   const [options, setOptions] = useState({
//     chart: {
//       zoomType: 'x',
//       alignTicks: false,
//     },
//     title: {
//       text: 'Fuel Consumed',
//       align: 'left',
//       style: {
//         fontSize: '16px',
//         fontWeight: 'bold',
//       },
//     },
//     subtitle: { 
//       text: null,
//     },
//     xAxis: {
//       type: 'datetime',
//       gridLineWidth: 0,
//       labels: {
//         format: '{value:%b %Y}',
//         style: {
//           fontSize: '10px',
//           color: '#666666',
//         },
//       },
//     },
//     yAxis: [
//       {
//         title: {
//           text: null,
//         },
//         labels: {
//           formatter: function () {
//             return `$${(this.value / 1e12).toFixed(2)}T`;
//           },
//         },
//       },
//       {
//         title: {
//           text: null,
//         },
//         opposite: true,
//         labels: {
//           formatter: function () {
//             return `$${(this.value / 1e9).toFixed(2)}B`;
//           },
//         },
//       },
//     ],
//     tooltip: {
//       shared: true,
//       xDateFormat: '%b %Y',
//       pointFormat:
//         '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>${point.y:,.2f}</b><br/>',
//     },
//     legend: {
//       enabled: false,
//     },
//     plotOptions: {
//       series: {
//         label: {
//           connectorAllowed: false,
//         },
//         marker: {
//           enabled: false,
//         },
//       },
//     },
//     series: [
//       {
//         name: 'Fuel Consumed',
//         type: 'line',
//         data: [
//           [1388534400000, 120],  // Year 2014
//           [1420070400000, 140],  // Year 2015
//           [1451606400000, 160],  // Year 2016
//           [1483228800000, 180],  // Year 2017
//           [1514764800000, 200],  // Year 2018
//           [1546300800000, 210],  // Year 2019
//           [1577836800000, 230],  // Year 2020
//           [1609459200000, 250],  // Year 2021
//           [1640995200000, 270],  // Year 2022
//           [1672531200000, 300],  // Year 2023
//         ],
//         color: '#00CC96',
//       },
//       {
//         name: 'Fuel Efficiency',
//         type: 'column',
//         yAxis: 1,
//         data: [
//           [1388534400000, 5],
//           [1420070400000, 6],
//           [1451606400000, 6.5],
//           [1483228800000, 7],
//           [1514764800000, 7.2],
//           [1546300800000, 7.5],
//           [1577836800000, 8],
//           [1609459200000, 8.5],
//           [1640995200000, 9],
//           [1672531200000, 9.5],
//         ],
//         color: '#A9A9A9',
//         opacity: 0.4,
//       },
//     ],
//   });

//   return (
//     <div className='card'>
//       <HighchartsReact highcharts={Highcharts} options={options} />
//     </div>
//   );
// };

// export default Section16;