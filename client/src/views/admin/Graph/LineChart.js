import React from 'react';
import ApexCharts from 'react-apexcharts';

const LineChart = ({ userData }) => {

  const monthCounts = userData.reduce((acc, user) => {
    const month = new Date(user.createdAt).toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  // Prepare data for the chart
  const months = Object.keys(monthCounts).sort(); 
  const counts = months.map(month => monthCounts[month]);

  const options = {
    chart: {
      type: 'line',
      height: 350
    },
    title: {
      text: 'Owner Creation by Month',
      align: 'left'
    },
    xaxis: {
      categories: months,
      title: {
        text: 'Month'
      }
    },
    yaxis: {
      title: {
        text: 'Number of Owners'
      }
    },
    stroke: {
      curve: 'smooth'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      }
    }
  };

  return (
    <div id="chart">
      <ApexCharts 
        options={options}
        series={[{ name: 'No of Owner', data: counts }]}
        type="line"
        height={420}
      />
    </div>
  );
};

export default LineChart;
