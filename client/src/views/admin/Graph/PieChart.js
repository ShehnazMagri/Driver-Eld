import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const ViolationPieChart = () => {
  const data = [
    { name: 'Insufficient distance from the front vehicle', value: 36 },
    { name: 'Driving off lane', value: 16 },
    { name: 'Fatigue driving', value: 14 },
    { name: 'Illegal overtaking', value: 13 },
    { name: 'Violation of traffic sign markings', value: 9 },
    { name: 'Over load', value: 5 },
    { name: 'Over-speed driving', value: 3 },
    { name: 'Illegal parking', value: 2 },
    { name: 'Drunk driving', value: 2 }
  ];

  const COLORS = [
    '#36A2EB',  // Light blue
    '#4BC0C0',  // Teal
    '#1E3F8B',  // Dark blue
    '#8B4513',  // Brown
    '#FF6B6B',  // Red
    '#FF9F40',  // Orange
    '#FFCD56',  // Yellow
    '#C9CBCF',  // Gray
    '#FF6384'   // Pink
  ];

  return (
    <div className="w-full h-[400px] bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Violation Distribution</h3>
      <div className="w-full h-[320px] flex justify-center">
        <PieChart width={400} height={320}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={130}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => `${value}%`}
          />
        </PieChart>
      </div>
    </div>
  );
};

export default ViolationPieChart;




// import React from 'react';
// import ApexCharts from 'react-apexcharts';

// const PieChart = ({ adminCount, driverCount, ownerCount }) => {
//   // Data for the pie chart
//   const series = [adminCount, driverCount, ownerCount];
//   const options = {
//     chart: {
//       width: 380,
//       type: 'pie',
//     },
//     labels: ['Total Owner', 'Driver', 'Owner'],
//     responsive: [{
//       breakpoint: 480,
//       options: {
//         chart: {
//           width: 200
//         },
//         legend: {
//           position: 'bottom'
//         }
//       }
//     }]
//   };

//   return (
//     <div id="chart">
//       <ApexCharts
//         options={options}
//         series={series}
//         type="pie"
//         width={380}
//       />
//     </div>
//   );
// };

// export default PieChart;
