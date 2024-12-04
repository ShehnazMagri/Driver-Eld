import React from "react";
import "./drivinghours.css";

// Sample data for driving hours/miles
const drivingData = [
  { label: "Miles", value: "5000" },
  { label: "Total Driving Time", value: "120 hours" },
  { label: "Start Odometer", value: "50000" },
  { label: "End Odometer", value: "55000" },
  { label: "Average Speed", value: "55 mph" },
  { label: "Idle Time", value: "10 hours" },
];

const Drivinghours = () => {
  return (
    <div className="driving-hours-container">
     <h5 className="mb-0 font-weight-bold" style={{ letterSpacing: '0.05em' }}>Driving Hours/Miles/Idling</h5>
      <table className="driving-hours-table"  style={{ height: '390px' }}>
        <tbody>
          {drivingData.map((data, index) => (
            <tr key={index}>
              <td className="label">{data.label}</td>
              <td className="value">{data.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Drivinghours;
