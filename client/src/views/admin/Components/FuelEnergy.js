import React from 'react';
import { BarChart, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Line } from 'recharts'; // Ensure Line is imported
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import BoltIcon from '@mui/icons-material/Bolt';
import AirIcon from '@mui/icons-material/Air';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// Sample data remains the same as before
const fuelData = [
  { source: 'Oil', amount: 28, color: '#FF6B6B', efficiency: 85, cost: 2.8 },
  { source: 'Natural Gas', amount: 32, color: '#4ECDC4', efficiency: 92, cost: 2.1 },
  { source: 'Coal', amount: 18, color: '#45B7D1', efficiency: 78, cost: 1.9 },
  { source: 'Solar', amount: 12, color: '#FFB900', efficiency: 95, cost: 1.2 },
  { source: 'Wind', amount: 10, color: '#96BB7C', efficiency: 94, cost: 1.1 },
];

const consumptionTrend = [
  { month: 'Jan', consumption: 250, forecast: 245, cost: 875 },
  { month: 'Feb', consumption: 280, forecast: 265, cost: 980 },
  { month: 'Mar', consumption: 300, forecast: 285, cost: 1050 },
  { month: 'Apr', consumption: 270, forecast: 290, cost: 945 },
  { month: 'May', consumption: 290, forecast: 280, cost: 1015 },
  { month: 'Jun', consumption: 310, forecast: 300, cost: 1085 },
];

const incidents = [
  { date: '2024-03-15', type: 'Maintenance', duration: '2h', impact: 'Minor' },
  { date: '2024-03-22', type: 'Outage', duration: '1h', impact: 'Moderate' },
  { date: '2024-04-01', type: 'Optimization', duration: '3h', impact: 'Positive' },
  { date: '2024-04-08', type: 'Inspection', duration: '4h', impact: 'None' },
];

const StatCard = ({ title, value, icon: Icon, desc, trend }) => (
  <Card sx={{ mb: 3 }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Icon color="action" />
      </Box>
      <Typography variant="h4" component="div">
        {value}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        <Typography
          variant="body2"
          color={trend >= 0 ? 'success.main' : 'error.main'}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
          {desc}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

const FuelEnergy = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      
      {/* Statistics Section */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Total Consumption" 
            value="1,836 kWh"
            icon={BoltIcon}
            desc="vs last month"
            trend={14.6}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Renewable Usage" 
            value="22%"
            icon={AirIcon}
            desc="vs last quarter"
            trend={4.2}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Average Cost" 
            value="$0.14/kWh"
            icon={LocalGasStationIcon}
            desc="vs industry average"
            trend={-8.3}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Efficiency Rate" 
            value="88.7%"
            icon={TrendingUpIcon}
            desc="vs target"
            trend={2.1}
          />
        </Grid>
      </Grid>

      {/* Fuel Source Distribution */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Fuel Source Distribution
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Current energy mix by source type
          </Typography>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={fuelData}
                  dataKey="amount"
                  nameKey="source"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {fuelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>

      {/* Consumption Trends */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Consumption Trends
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Actual vs Forecast
          </Typography>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={consumptionTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="consumption" stroke="#8884d8" name="Actual" />
                <Line type="monotone" dataKey="forecast" stroke="#82ca9d" name="Forecast" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>

      {/* Efficiency Analysis Table */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Efficiency Analysis
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Fuel Source</TableCell>
                  <TableCell>Usage (%)</TableCell>
                  <TableCell>Efficiency Rate</TableCell>
                  <TableCell>Cost ($/kWh)</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fuelData.map((fuel) => (
                  <TableRow key={fuel.source}>
                    <TableCell>{fuel.source}</TableCell>
                    <TableCell>{fuel.amount}%</TableCell>
                    <TableCell>{fuel.efficiency}%</TableCell>
                    <TableCell>${fuel.cost.toFixed(2)}</TableCell>
                    <TableCell>
                      <Chip
                        label={fuel.efficiency > 90 ? 'Optimal' : fuel.efficiency > 80 ? 'Good' : 'Needs Improvement'}
                        color={fuel.efficiency > 90 ? 'success' : fuel.efficiency > 80 ? 'warning' : 'error'}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Recent Incidents Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Incidents
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Impact</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {incidents.map((incident) => (
                  <TableRow key={incident.date}>
                    <TableCell>{incident.date}</TableCell>
                    <TableCell>{incident.type}</TableCell>
                    <TableCell>{incident.duration}</TableCell>
                    <TableCell>{incident.impact}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FuelEnergy;
