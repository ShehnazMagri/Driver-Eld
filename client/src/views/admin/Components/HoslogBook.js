import React, { useState } from 'react';
import {
  Box, Typography, Tabs, Tab, Card, CardContent, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Chip, IconButton, Tooltip, Grid, Avatar, LinearProgress,
  Button, useTheme, useMediaQuery
} from '@mui/material';
import {
  Person as PersonIcon,
  DirectionsCar as CarIcon,
  Warning as WarningIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  MoreVert as MoreVertIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

const HoslogBook = () => {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`logbook-tabpanel-${index}`}
        aria-labelledby={`logbook-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  };

  const renderStatusChip = (status) => {
    let color = 'default';
    switch (status.toLowerCase()) {
      case 'active': color = 'success'; break;
      case 'inactive': color = 'error'; break;
      case 'warning': color = 'warning'; break;
    }
    return <Chip label={status} color={color} size="small" sx={{ fontWeight: 'bold' }} />;
  };

  const renderProgressBar = (value, max) => {
    const percentage = (value / max) * 100;
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" value={percentage} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(percentage)}%`}</Typography>
        </Box>
      </Box>
    );
  };

  const renderActiveTable = () => (
    <TableContainer component={Paper} elevation={0}>
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Driver & Vehicle</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>HOS</TableCell>
            <TableCell>Drive Left</TableCell>
            <TableCell>Duty Left</TableCell>
            <TableCell>Cycle Left</TableCell>
            <TableCell>App Status</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Violations</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Sample data row */}
          <TableRow>
            <TableCell>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ mr: 2 }}>JD</Avatar>
                <Box>
                  <Typography variant="subtitle2">John Doe</Typography>
                  <Tooltip title="Vehicle Number">
                    <Chip icon={<CarIcon />} label="TRK-123" size="small" sx={{ mt: 0.5 }} />
                  </Tooltip>
                </Box>
              </Box>
            </TableCell>
            <TableCell>{renderStatusChip('Active')}</TableCell>
            <TableCell>
              <Tooltip title="Remaining time until break">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TimeIcon sx={{ mr: 1, fontSize: 'small' }} />
                  2h 30m
                </Box>
              </Tooltip>
            </TableCell>
            <TableCell>{renderProgressBar(4.25, 11)}</TableCell>
            <TableCell>{renderProgressBar(6.75, 14)}</TableCell>
            <TableCell>{renderProgressBar(32.33, 70)}</TableCell>
            <TableCell>{renderStatusChip('Online')}</TableCell>
            <TableCell>
              <Tooltip title="Latest location/Time">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationIcon sx={{ mr: 1, fontSize: 'small' }} />
                  Chicago, IL
                </Box>
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="3 violations in last 30 days">
                <IconButton size="small" color="warning">
                  <WarningIcon />
                </IconButton>
              </Tooltip>
            </TableCell>
            <TableCell>
              <IconButton size="small">
                <MoreVertIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );

  const violationData = [
    { name: 'HOS', violations: 12 },
    { name: 'Speed', violations: 8 },
    { name: 'Log', violations: 5 },
    { name: 'Break', violations: 3 },
  ];

  return (
    <Box sx={{ width: '100%' }}>
     
  
      <Card  elevation={3} style={{ padding: "30px", borderRadius: "12px", marginBottom: "30px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
        <CardContent>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant={isMobile ? "fullWidth" : "standard"}
            sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
          >
            <Tab label="Active Drivers" icon={<PersonIcon />} iconPosition="start" />
            <Tab label="Inactive Drivers" icon={<PersonIcon />} iconPosition="start" />
            <Tab label="Violations" icon={<WarningIcon />} iconPosition="start" />
          </Tabs>
          <TabPanel value={activeTab} index={0}>
            <Typography variant="subtitle1" gutterBottom>
              Drivers logged in within the past 30 days
            </Typography>
            {renderActiveTable()}
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            <Typography variant="subtitle1" gutterBottom>
              Drivers not logged in for over 30 days
            </Typography>

          </TabPanel>

          <TabPanel value={activeTab} index={2}>
            <Typography variant="subtitle1" gutterBottom>
              Drivers with logbook violations in the past 7 days
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUpIcon sx={{ mr: 1 }} />
                    Violation Types
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={violationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip />
                      <Bar dataKey="violations" fill={theme.palette.primary.main} />
                    </BarChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <WarningIcon sx={{ mr: 1 }} />
                    Recent Violations
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HoslogBook;