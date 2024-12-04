import React from 'react';
// import ApexCharts from 'react-apexcharts';


import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const FuelBarChart = ({ chartData = {} }) => {
  console.log(chartData)
  const data = {
    labels: chartData.categories || [],
    datasets: [
      {
        label: 'Total Fuel Quantity',
        data: chartData.series?.[0]?.data || [],
        backgroundColor: 'rgba(0, 123, 255, 1)',
        borderColor: 'rgba(0, 123, 255, 1)', 
        borderWidth: 1,
        barThickness: 40, // Reduce bar width
        yAxisID: 'y1', // Use the second y-axis
      },
      {
        label: 'Total Fuel Amount',
        data: chartData.series?.[1]?.data || [],
        backgroundColor: 'rgba(92, 184, 92, 1)',
        borderColor: 'rgba(92, 184, 92, 1)', 
        borderWidth: 1,
        barThickness: 40, // Reduce bar width
        yAxisID: 'y2', // Use the first y-axis
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Fuel Chart',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
        grid: {
          display: false, // Hide grid lines for x-axis
        },
        border: {
          color: 'rgba(0, 0, 0, 0.8)', // Dark line for x-axis border
          width: 1, // Width of the x-axis border
        },
      },
      y1: {
        title: {
          display: true,
          text: 'Fuel Quantity',
        },
        beginAtZero: true,
        grid: {
          display: false, // Hide grid lines for y1-axis
        },
        border: {
          color: 'rgba(0, 0, 0, 0.8)', // Dark line for y1-axis border
          width: 1, // Width of the y1-axis border
        },
      },
      y2: {
        title: {
          display: true,
          text: 'Fuel Amount',
        },
        beginAtZero: true,
        position: 'right', // Position the second y-axis on the right
        grid: {
          display: false, // Hide grid lines for y2-axis
        },
        border: {
          color: 'rgba(0, 0, 0, 0.8)', // Dark line for y2-axis border
          width: 1, // Width of the y2-axis border
        },
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default FuelBarChart;

// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// const FuelBarChart = ({ chartData = {} }) => {
//   const data = {
//     labels: chartData.categories || [],
//     datasets: [
//       {
//         label: 'Total Fuel Quantity',
//         data: chartData.series?.[0]?.data || [],
//         backgroundColor: 'rgba(0, 123, 255, 1)',
//         borderColor: 'rgba(0, 123, 255, 1)', 
//         borderWidth: 1,
//         barThickness: 40,
//         yAxisID: 'y1',
//       },
//       {
//         label: 'Total Fuel Amount',
//         data: chartData.series?.[1]?.data || [],
//         backgroundColor: 'rgba(92, 184, 92, 1)',
//         borderColor: 'rgba(92, 184, 92, 1)', 
//         borderWidth: 1,
//         barThickness: 40,
//         yAxisID: 'y2',
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Fuel Chart',
//       },
//     },
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: 'Date',
//         },
//         grid: {
//           display: false,
//         },
//         border: {
//           color: 'rgba(0, 0, 0, 0.8)',
//           width: 1,
//         },
//       },
//       y1: {
//         title: {
//           display: true,
//           text: 'Fuel Quantity',
//         },
//         beginAtZero: true,
//         grid: {
//           display: false,
//         },
//         border: {
//           color: 'rgba(0, 0, 0, 0.8)',
//           width: 1,
//         },
//       },
//       y2: {
//         title: {
//           display: true,
//           text: 'Fuel Amount',
//         },
//         beginAtZero: true,
//         position: 'right',
//         grid: {
//           display: false,
//         },
//         border: {
//           color: 'rgba(0, 0, 0, 0.8)',
//           width: 1,
//         },
//       },
//     },
//   };

//   return (
//     <div>
//       <Bar data={data} options={options} />
//     </div>
//   );
// };

// export default FuelBarChart;
