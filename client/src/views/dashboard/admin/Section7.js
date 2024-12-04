import React from 'react';
import { ResponsiveContainer, ComposedChart, Line, XAxis, YAxis, Tooltip, Legend, Area } from 'recharts';

const Section7 = () => {
  // Sample data - replace with your actual data
  const data = [
    { year: '2007', utilization: 91, rates: 5 },
    { year: '2008', utilization: 89, rates: 10 },
    { year: '2009', utilization: 85, rates: -15 },
    { year: '2010', utilization: 92, rates: 8 },
    { year: '2011', utilization: 95, rates: 12 },
    { year: '2012', utilization: 90, rates: 5 },
    { year: '2013', utilization: 88, rates: 0 },
    { year: '2014', utilization: 91, rates: 2 },
    { year: '2015', utilization: 93, rates: -5 },
    { year: '2016', utilization: 87, rates: -8 },
    { year: '2017', utilization: 94, rates: 10 },
    { year: '2018', utilization: 98, rates: 15 },
    { year: '2019', utilization: 92, rates: 5 },
    { year: '2020', utilization: 85, rates: -10 },
    { year: '2021', utilization: 97, rates: 20 },
    { year: '2022', utilization: 93, rates: 15 },
    { year: '2023', utilization: 91, rates: -1.37 },
  ];

  return (
    <div style={{ width: '100%', height: 500, backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px' }}>
      <ResponsiveContainer>
        <ComposedChart data={data}>
          <XAxis dataKey="year" stroke="#333" />
          <YAxis yAxisId="left" stroke="#333" domain={[80, 100]} />
          <YAxis yAxisId="right" orientation="right" stroke="#333" domain={[-20, 25]} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#f5f5f5', border: '1px solid #ccc' }}
            labelStyle={{ color: '#333' }}
            itemStyle={{ color: '#333' }}
          />
          <Legend verticalAlign="top" height={36} wrapperStyle={{ color: '#333' }} />
          <defs>
            <linearGradient id="colorUtilization" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#846cf9" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#846CF91A" stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <Area 
            type="monotone" 
            dataKey="utilization" 
            stroke="#846cf9" 
            fillOpacity={1} 
            fill="url(#colorUtilization)" 
            yAxisId="left"
            name="Active Truck Utilization"
          />
          <Line 
            type="monotone" 
            dataKey="rates" 
            stroke="#846cf9" 
            yAxisId="right"
            name="Truckload Rates Ex-Fuel Surcharge YoY % Change"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Section7;
