import React, { useEffect, useState, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import jsPDF from 'jspdf';

const Section13 = ({ driver }) => {
  const driverData = driver.payload?.drivers;
  const [chartOptions, setChartOptions] = useState(null);
  const [totalTrucks, setTotalTrucks] = useState(0);

  
  useEffect(() => {
    if (driverData && driverData.length > 0) {
      const total = driverData.length;
      setTotalTrucks(total);

      // Calculate trucks by country, making country names case-insensitive
      const trucksByCountry = driverData.reduce((acc, driver) => {
        if (driver.country) {
          const countryKey = driver.country.toLowerCase(); // Make country names lowercase
          acc[countryKey] = (acc[countryKey] || 0) + 1;
        }
        return acc;
      }, {});

      // Set options for Highcharts
      setChartOptions({
        chart: {
          type: 'bar',
        },
        title: {
          text: 'Truck Status Analysis',
        },
        xAxis: {
          categories: Object.keys(trucksByCountry).map(
            (country) => country.charAt(0).toUpperCase() + country.slice(1) // Capitalize for display
          ),
          title: {
            text: 'States',
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Number of Trucks',
          },
        },
        series: [
          {
            name: 'Trucks',
            data: Object.values(trucksByCountry),
            colorByPoint: true,
            colors: [
              // '#00CC96', '#36A2EB', '#8B5CF6', '#4BC0C0', '#9966FF', '#FF9F40',
              // '#E7E9ED', '#2DCE89', '#5E72E4', '#F5365C'
              "#00747C","#00BBC9","#CACACA","#878787","#202022","#00747C","#00BBC9","#CACACA","#878787","#202022","#00747C","#00BBC9","#CACACA","#878787","#202022"
            ],
          },
        ],
        tooltip: {
          formatter: function () {
            return `<b>${this.x}</b><br>Number of trucks: ${this.y}`;
          },
        },
        legend: {
          enabled: false,
        },
      });
    }
  }, [driverData]);

  // PDF Download
  const handleDownloadTruckReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Truck Status Overview", 20, 20);
    doc.setFontSize(12);
    doc.text(`Total Trucks: ${totalTrucks}`, 20, 30);

    // Add truck count data by country
    let yPosition = 40;
    doc.text("Country", 20, yPosition);
    doc.text("Count", 100, yPosition);
    yPosition += 10;

    const trucksByCountry = driverData.reduce((acc, driver) => {
      if (driver.country) {
        const countryKey = driver.country.toLowerCase();
        acc[countryKey] = (acc[countryKey] || 0) + 1;
      }
      return acc;
    }, {});

    // Add table data with capitalized country names
    Object.entries(trucksByCountry).forEach(([country, count]) => {
      const formattedCountry = country.charAt(0).toUpperCase() + country.slice(1);
      doc.text(formattedCountry, 20, yPosition);
      doc.text(count.toString(), 100, yPosition);
      yPosition += 10;
    });

    // Download the PDF
    doc.save("Truck_Status_Report.pdf");
  };

  return (
    <div className="chart">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <h5 className="mb-0 font-weight-bold" style={{ letterSpacing: '0.05em' }}>
            Truck Status Analysis 
            {/* <span className="text-xl">({totalTrucks})</span> */}
          </h5>
          <button className="download-btn" onClick={handleDownloadTruckReport} style={{ marginRight: '10px' }}>
            Download 
          </button>
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
        {chartOptions && (
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
          />
        )}
      </div>
    </div>
  );
};

export default Section13;





