import { useState, useEffect } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { getAllDataByOwnerAction } from '../../../Redux/Action/adminauth';
import { useDispatch,useSelector } from 'react-redux';


const Section15 = () => {
  const dispatch = useDispatch();
  // const driverData = driver.payload?.drivers || [];
  
  const driverData = useSelector((state) => state.login.getallModeldata_byownerlist);
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    dispatch(getAllDataByOwnerAction("Driver"));
  }, []);

  useEffect(() => {
    const statusCount = {};
    let firstDate = null;
    let lastDate = null;
  
    // Loop through each driver and build the status count
    driverData.forEach((driver) => {
      const status = driver.status;
      const createdDate = new Date(driver.createdAt);
      const monthYear = createdDate.toLocaleString('default', { month: 'short', year: 'numeric' });
  
      // Track the first and last dates
      if (!firstDate || createdDate < firstDate) {
        firstDate = createdDate;
      }
      if (!lastDate || createdDate > lastDate) {
        lastDate = createdDate;
      }
  
      // Initialize month-year in the statusCount if it doesn't exist
      if (!statusCount[monthYear]) {
        statusCount[monthYear] = { pending: 0, assigned: 0 };
      }
  
      // Increment the status count
      if (status === 'pending') {
        statusCount[monthYear].pending += 1;
      } else if (status === 'assigned') {
        statusCount[monthYear].assigned += 1;
      }
    });
  
    // Sort the months for proper chronological order
    const months = Object.keys(statusCount).sort((a, b) => {
      const [aMonth, aYear] = a.split(' ');
      const [bMonth, bYear] = b.split(' ');
      return new Date(`${aYear}-${aMonth}-01`) - new Date(`${bYear}-${bMonth}-01`);
    });
  
    // Prepare the data for the chart
    const processData = (type) => months.map((month) => {
      const [monthName, year] = month.split(' ');
      const date = new Date(Date.UTC(year, new Date(`${monthName} 1`).getMonth(), 1));
      return [date.getTime(), statusCount[month][type]];
    });
  
    // Set startYear and endYear dynamically based on the first and last dates
    const startYear = firstDate ? firstDate.getFullYear() : 2023;
    const endYear = lastDate ? lastDate.getFullYear() : 2024;
  
    // Set the range for the x-axis dynamically using the first and last date
    const minDate = firstDate ? firstDate.getTime() : Date.UTC(startYear, 0, 1);
    const maxDate = lastDate ? lastDate.getTime() : Date.UTC(endYear, 11, 31);
  
    // Set the chart options
    setChartOptions({
      chart: {
        type: 'line',
        zoomType: 'x',
        backgroundColor: 'transparent',
        style: {
          fontFamily: 'Arial',
        },
      },
      title: {
        text: `Driver Status Analysis (${driverData.length})`,
        align: 'left',
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
        },
      },
      xAxis: {
        type: 'datetime',
        tickInterval: 30 * 24 * 3600 * 1000,  // One month in milliseconds
        min: minDate,  // Dynamic start date
        max: maxDate,  // Dynamic end date
        labels: {
          format: '{value:%b %Y}',  // Display Month and Year (e.g., Nov 2023)
          style: {
            fontSize: '10px',
            color: '#666666',
          },
        },
      },
      yAxis: {
        title: {
          text: null,
        },
        labels: {
          style: {
            color: '#666666',
          },
        },
        gridLineWidth: 0,
      },
      tooltip: {
        shared: true,
        xDateFormat: '%b %Y',  // Format for displaying tooltip
        pointFormat:
          '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>',
      },
      legend: {
        enabled: true,
      },
      plotOptions: {
        series: {
          marker: {
            enabled: true,
            symbol: 'circle',
            radius: 3,
            fillColor: '#FFFFFF',
            lineWidth: 2,
            lineColor: '#8B5CF6',
          },
          lineWidth: 2,
          dashStyle: 'ShortDash',
        },
      },
      series: [
        {
          name: 'Pending',
          data: processData('pending'),
          color: '#8B5CF6',
        },
        {
          name: 'Assigned',
          data: processData('assigned'),
          color: '#00CC96',
        },
        {
          name: 'Pending (Bar)',
          type: 'column',
          data: processData('pending'),
          color: '#8B5CF6',
          opacity: 0.3,
          enableMouseTracking: false,
        },
        {
          name: 'Assigned (Bar)',
          type: 'column',
          data: processData('assigned'),
          color: '#00CC96',
          opacity: 0.3,
          enableMouseTracking: false,
        },
      ],
    });
  }, [driverData]);
  

  // useEffect(() => {
  //   const statusCount = {};
  //   driverData.forEach((driver) => {
  //     const status = driver.status;
  //     const createdDate = new Date(driver.createdAt);
  //     const monthYear = createdDate.toLocaleString('default', { month: 'short', year: 'numeric' });
  //     if (!statusCount[monthYear]) {
  //       statusCount[monthYear] = { pending: 0, assigned: 0 };
  //     }
  //     if (status === 'pending') {
  //       statusCount[monthYear].pending += 1;
  //     } else if (status === 'assigned') {
  //       statusCount[monthYear].assigned += 1;
  //     }
  //   });
  //   const months = Object.keys(statusCount).sort((a, b) => {
  //     const [aMonth, aYear] = a.split(' ');
  //     const [bMonth, bYear] = b.split(' ');
  //     return new Date(`${aYear}-${aMonth}-01`) - new Date(`${bYear}-${bMonth}-01`);
  //   });
  //   const processData = (type) => months.map((month) => {
  //     const [monthName, year] = month.split(' ');
  //     const date = new Date(Date.UTC(year, new Date(`${monthName} 1`).getMonth(), 1));
  //     return [date.getTime(), statusCount[month][type]];
  //   });
  //   const startYear = 2024;  // Set this to the starting year of your data
  //   const endYear = 2024;    // Set this to the ending year of your data
  //   setChartOptions({
  //     chart: {
  //       type: 'line',
  //       zoomType: 'x',
  //       backgroundColor: 'transparent',
  //       style: {
  //         fontFamily: 'Arial',
  //       },
  //     },
  //     title: {
  //       text: 'Driver Status Analysis',
  //       align: 'left',
  //       style: {
  //         fontSize: '16px',
  //         fontWeight: 'bold',
  //       },
  //     },
  //     xAxis: {
  //       type: 'datetime',
  //       tickInterval: 30 * 24 * 3600 * 1000,  // One month in milliseconds
  //       min: Date.UTC(startYear, 0, 1),
  //       max: Date.UTC(endYear, 11, 31),
  //       labels: {
  //         format: '{value:%b %Y}',
  //         style: {
  //           fontSize: '10px',
  //           color: '#666666',
  //         },
  //       },
  //     },
  //     yAxis: {
  //       title: {
  //         text: null,
  //       },
  //       labels: {
  //         style: {
  //           color: '#666666',
  //         },
  //       },
  //       gridLineWidth: 0,
  //     },
  //     tooltip: {
  //       shared: true,
  //       xDateFormat: '%b %Y',
  //       pointFormat:
  //         '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>',
  //     },
  //     legend: {
  //       enabled: true,
  //     },
  //     plotOptions: {
  //       series: {
  //         marker: {
  //           enabled: true,
  //           symbol: 'circle',
  //           radius: 3,
  //           fillColor: '#FFFFFF',
  //           lineWidth: 2,
  //           lineColor: '#8B5CF6',
  //         },
  //         lineWidth: 2,
  //         dashStyle: 'ShortDash',
  //       },
  //     },
  //     series: [
  //       {
  //         name: 'Pending',
  //         data: processData('pending'),
  //         color: '#8B5CF6',
  //       },
  //       {
  //         name: 'Assigned',
  //         data: processData('assigned'),
  //         color: '#00CC96',
  //       },
  //       {
  //         name: 'Pending (Bar)',
  //         type: 'column',
  //         data: processData('pending'),
  //         color: '#8B5CF6',
  //         opacity: 0.3,
  //         enableMouseTracking: false,
  //       },
  //       {
  //         name: 'Assigned (Bar)',
  //         type: 'column',
  //         data: processData('assigned'),
  //         color: '#00CC96',
  //         opacity: 0.3,
  //         enableMouseTracking: false,
  //       },
  //     ],
  //   });
  // }, [driver]);


  return (
    <div className="card" style={{ height: "96%", width: "678px" }}>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};
export default Section15;