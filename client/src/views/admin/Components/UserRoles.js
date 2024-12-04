import React from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Button, Checkbox, Typography, Grid, Box, Card, CardContent,
  Switch, IconButton, Tooltip
} from '@mui/material';
import { 
  Add as AddIcon, 
  Refresh as RefreshIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const UserRoles = () => {
  const userColumns = ['Name', 'Email', 'Role', 'Terminal', 'Session Activity', 'Actions'];
  const roles = [
    'Category', 'Logbook', 'Locations', 'IFTA', 'Company Profile', 'Reports',
    'Vehicles', 'Devices', 'Messages', 'Drivers', 'DOT Inspection', 'Billing',
    'User Roles', 'Terminals'
  ];

  const users = [
    { name: 'John Doe', email: 'john@example.com', role: 'Admin', terminal: 'Terminal A', sessionActivity: 'Active' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'User', terminal: 'Terminal B', sessionActivity: 'Inactive' },
  ];

  return (
    <Box sx={{ p: 4, minHeight: '100vh' }}>
      <Grid container spacing={4}>
        {/* Users Section */}
        <Grid item xs={12} lg={6}>
        <Card  elevation={3} style={{ padding: "30px", borderRadius: "12px", marginBottom: "30px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" fontWeight="bold">USERS</Typography>
                <Button style={{
              backgroundColor: '#846cf9',
              color: 'white',
              padding: '10px 20px',
              textTransform: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
            }} startIcon={<AddIcon />}>
                  Add User
                </Button>
              </Box>
              <Typography variant="body2" color="text.secondary" mb={1}>
                Users can be categorized as active or inactive. Admins can create new users.
              </Typography>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Button variant="outlined" startIcon={<RefreshIcon />}>
                  Reset Password
                </Button>
                <Box>
                  <Typography variant="body2" component="span" mr={1}>Show inactive</Typography>
                  <Switch size="small" />
                </Box>
              </Box>
              
              <TableContainer component={Paper} elevation={0}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      {userColumns.map((col, index) => (
                        <TableCell key={index} sx={{ fontWeight: 'bold' }}>{col}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user, index) => (
                      <TableRow key={index}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.terminal}</TableCell>
                        <TableCell>
                          <Tooltip title={user.sessionActivity}>
                            <Box
                              sx={{
                                width: 10,
                                height: 10,
                                borderRadius: '50%',
                                backgroundColor: user.sessionActivity === 'Active' ? 'green' : 'red',
                                display: 'inline-block',
                                marginRight: 1
                              }}
                            />
                          </Tooltip>
                          {user.sessionActivity}
                        </TableCell>
                        <TableCell>
                          <IconButton size="small"><EditIcon fontSize="small" /></IconButton>
                          <IconButton size="small"><DeleteIcon fontSize="small" /></IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Roles Section */}
        <Grid item xs={12} lg={6}>
        <Card  elevation={3} style={{ padding: "30px", borderRadius: "12px", marginBottom: "30px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" fontWeight="bold">ROLES</Typography>
                <Button variant="contained" startIcon={<AddIcon />} style={{
              backgroundColor: '#846cf9',
              color: 'white',
              padding: '10px 20px',
              textTransform: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
            }}>
                  Add Role
                </Button>
              </Box>
              <TableContainer component={Paper} elevation={0}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>View/Edit/Delete</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Extra Permission</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {roles.map((role, index) => (
                      <TableRow key={index}>
                        <TableCell>{role}</TableCell>
                        <TableCell>
                          <Checkbox size="small" />
                        </TableCell>
                        <TableCell>
                          {role === 'Reports' && 'Download'}
                          {(role === 'Vehicles' || role === 'Devices' || role === 'Drivers') && 'Assign'}
                          {role === 'Messages' && 'Direct Message Broadcast'}
                          {role === 'Billing' && 'Upgrade'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography variant="body2" color="text.secondary" mt={2}>
                To create a role, the admin must provide a role name and select permissions.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserRoles;