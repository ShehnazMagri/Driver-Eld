import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import jsPDF from "jspdf";

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels); // Register the plugin

const Section10 = ({ trailer }) => {
  const TotalCount = trailer?.payload?.total || 0; 

  // Function to calculate trailer data by status
  const calculateTrailerData = () => {
    if (!trailer?.payload?.trailers) return {};
    return trailer.payload.trailers.reduce((acc, curr) => {
      const status = curr.status || "Unknown"; // Default to 'Unknown' if no status
      acc[status] = (acc[status] || 0) + 1; 
      return acc;
    }, {});
  };

  const statusData = calculateTrailerData();
  const total = Object.values(statusData).reduce(
    (sum, count) => sum + count,
    0
  );

// Handle the download of the trailer report as PDF
const handleDownloadTrailerReport = () => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Trailer Status Analysis", 20, 20);
  doc.setFontSize(12);
  doc.text(`Total Trailers: ${TotalCount}`, 20, 30);
  
  // Table with statuses and counts
  let yPosition = 40;
  doc.text("Status", 20, yPosition);
  doc.text("Count", 100, yPosition);
  yPosition += 10;
  
  Object.entries(statusData).forEach(([status, count]) => {
    doc.text(status, 20, yPosition);
    doc.text(count.toString(), 100, yPosition);
    yPosition += 10;
  });

  // Generate and embed the chart as an image in the PDF
  const canvas = document.querySelector("canvas");
  if (canvas) {
    const chartImage = canvas.toDataURL("image/png");
    doc.addImage(chartImage, "PNG", 20, yPosition, 160, 90);
  }

  // Save the PDF with a filename
  doc.save("Trailer_Status_Report.pdf");
};
  
  // Dynamically set chart data based on available statuses
  const labels = Object.keys(statusData); // Extract unique statuses as labels
  const data = {
    labels: labels,
    datasets: [
      {
        data: labels.map((label) => statusData[label]), // Map count of each status
        backgroundColor: labels.map((label, index) => {
          const colors = [
            // "#36A2EB", // Light blue
            // "#FF6384", // Pink
            // "#FFCE56", // Yellow
            // "#4BC0C0", // Teal
            // "#FF9F40", // Orange
            // "#FF8E00", // Dark orange
            // "#E1FF8E", // Light yellow
            // "#9E6BFF", // Purple
            'rgba(0, 123, 255, 0.7)',   // Blue
            'rgba(255, 99, 132, 0.7)',   // Red
            'rgba(54, 162, 235, 0.7)',   // Light Blue
            'rgba(75, 192, 192, 0.7)',   // Green
            'rgba(153, 102, 255, 0.7)',  // Purple
            'rgba(255, 159, 64, 0.7)',   // Orange
            'rgba(255, 205, 86, 0.7)',   // Yellow
            'rgba(201, 203, 207, 0.7)',  // Grey
            'rgba(255, 99, 71, 0.7)',
          ];
          return colors[index % colors.length]; // Cycle through colors
        }),
        borderColor: "#ffffff",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle",
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(0);
            return `${context.label}: ${percentage}%`; // Show percentage in tooltip
          },
        },
      },
      datalabels: {
        color: "#ffffff",
        font: {
          weight: "bold",
          size: 16,
        },
        formatter: (value) => {
          const percentage = ((value / total) * 100).toFixed(0);
          return `${percentage}%`; // Show percentage inside the pie chart
        },
        align: "center", // Align label in the center
        anchor: "center", // Anchor the label to the center
      },
    },
  };

  // Style for container
  const containerStyle = {
    width: "60%",
    height: "60%",
    margin: "0 auto",
    position: "relative",
    padding: "20px",
  };

  return (
    <div className="chart">
      <div className="container">
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
            Trailer Status Analysis <span className="text-xl">({TotalCount})</span>
          </h5>
          <div style={{ marginRight: "-10px" }}>
            <button
               onClick={handleDownloadTrailerReport}
              className="download-btn"
              style={{ marginRight: "1px", marginTop: "-1rem" }}
            >
              Download
            </button>
          </div>
        </div>
      </div>

      {/* Pie chart */}
      <div
        style={{
          width: "100%",
          height: "100%",
          paddingTop: "2rem",
          maxWidth: "376px",
          margin: "0 auto",
        }}
      >
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default Section10;

