import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { generatePDF } from 'components/common/pdfUtils';

const Section9 = ({Voilation}) => {
  const violations = Voilation?.payload?.violations || [];
  const totalViolations = Voilation?.payload?.total || 0;

  const violationCounts = violations?.reduce((acc, violation) => {
    const type = violation?.voilationtype || 0;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  // Prepare data for the pie chart
  const data = Object.entries(violationCounts).map(([name, value]) => ({
    name,
    value,
  }));

 

  // Find the most repeated violation
  const mostFrequentViolation = Object.entries(violationCounts).reduce((prev, current) => {
    return (prev[1] > current[1]) ? prev : current;
  }, ['', 0]);

  // const COLORS = [
  //   '#7F3FFF',  // blue
  //   '#61ae41',  // green
  //   // '#44b1ff',  // orange
  //   '#97d8d3',
  //   '#FF8042',  // Brown
  //   '#dc3545',  // Red
  //   '#FF9F40',  // Orange
  //   '#FFCD56',  // Yellow
  //   '#C9CBCF',  // Gray
  //   '#FF9766'   // Pink
  // ];
  // const COLORS = ['rgb(251, 156, 12)', 'rgb(21, 183, 159)', 'rgb(99, 91, 255)'];
  
  const COLORS = [
    '#4b8e8e', // Blue
    '#ff5c8d', // Coral
    '#84c9ac', // Teal
    '#f5a623', // Orange
    '#8a4fdd', // Purple
    '#f2d1a2'  // Light Yellow
  ];
  // const COLORS = ['Red', 'Orange', 'blue', 'rgb(21, 183, 159)', 'Yellow']


  // function to downalod pdf file
  const handleDownloadDriverVoilation = () => {
    generatePDF({
      title: "Drive Violations Overview",
      generalInfo: [
        `Total Violations: ${totalViolations}`,
        `Most Repeated Violation: ${mostFrequentViolation[0]} (${mostFrequentViolation[1]})`,
      ],
      tables: [
        {
          headers: ["Violation Type", "Count"],
          rows: data.map(({ name, value }) => [name, value]),
        },
      ],
      filename: "Drive_Violations_Report.pdf",
    });
  };

  return (
    <div className='card' style={{
        width: '100%',
        height: 500,
        padding: '24px',
      //   backgroundColor: '#ffffff',
        borderRadius: '16px',
      //   transition: 'all 0.3s ease'
      }}>
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
            Drive Violations Overview <span className="text-xl">({totalViolations})</span>
          </h5>
          <div class="" style={{ marginRight: "-10px" }}>
            <button
              onClick={handleDownloadDriverVoilation} 
              // className="bg-blue-500 text-black px-1 py-0 text-sm rounded hover:bg-blue-600 transition duration-300"
              className="download-btn"
              style={{ marginRight: "1px", marginTop : '-1rem' }}
            >
              Download
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-[355px] flex justify-center items-center">
        <PieChart width={275} 
        height={350}
        >
          <Pie
            // data={data}
            data={data.length > 0 ? data : [{ name: '', value: 1 }]} // 
            cx="80%"
            cy="50%"
            labelLine={true}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={130}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} fontSize={13} width={120} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value, name) => [`Count: ${value}`, `${name} `]}
          />
        </PieChart>
        <p className="mb-2 text-center">Repeated Violation: {mostFrequentViolation[0]} ( {mostFrequentViolation[1]})</p>
      </div>
    </div>
  );
};
export default Section9;




