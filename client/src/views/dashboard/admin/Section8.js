import React from 'react';
import { Card } from 'react-bootstrap';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LabelList
} from 'recharts';

const Section8 = ({vichels,trailersCount}) => {

  const utilizationData = [
    { date: '2023-09-01', utilization: vichels?.total },
    { date: '2023-09-02', utilization: trailersCount },
    { date: '2023-09-03', utilization: 78 },
    { date: '2023-09-04', utilization: 85 },
    { date: '2023-09-05', utilization: 80 },
  ];

  return (
    <div>
      <Card.Header className="bg-gradient-dark text-black p-4" style={{ borderBottom: '4px solid #007bff' }}>
        <h5 className="mb-0 font-weight-bold" style={{ letterSpacing: '0.05em' }}>Utilization of Trucks/Trailers</h5>
      </Card.Header>
      <Card.Body className="">
        <ResponsiveContainer width="100%" height={275}>
          <BarChart
            data={utilizationData}
            margin={{ top: 5, right: 40, left: 20, bottom: 20 }}
            barSize={60}
          >
            <defs>
              <linearGradient id="barColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#007bff" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#00c8ff" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="date" tick={{ fill: '#555', fontWeight: 500, fontSize: 12 }} />
            <YAxis domain={[0, 100]} tick={{ fill: '#555', fontWeight: 500, fontSize: 12 }} />
            <Tooltip 
              formatter={(value) => `${value}%`}
              contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', padding: '10px', boxShadow: '0px 4px 8px rgba(0,0,0,0.1)' }}
              labelStyle={{ color: '#007bff', fontWeight: 'bold' }}
            />
            <Legend 
              verticalAlign="top" 
              align="right" 
              wrapperStyle={{ top: 0, right: 0, fontSize: '14px', color: '#555' }}
            />
            <Bar
              dataKey="utilization"
              fill="url(#barColor)"
              radius={[10, 10, 0, 0]}
              name="Utilization %"
              animationDuration={1000}
              isAnimationActive
            >
              <LabelList 
                dataKey="utilization" 
                position="top" 
                style={{ fill: '#007bff', fontSize: 12, fontWeight: 'bold' }} 
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div >
          <h6 className="text-muted mb-2">Vehicle Utilization Rate Formula:</h6>
          <p className="mb-0 font-weight-bold" style={{ fontSize: '1rem', lineHeight: '1.5' }}>
            Utilization Rate = 
            <span className="text-primary"> (Total Fleet Miles Driven) </span> 
            / 
            <span className="text-success"> (Total Mileage Capacity)</span>
          </p>
        </div>
      </Card.Body>
    </div>
  );
};

export default Section8;
