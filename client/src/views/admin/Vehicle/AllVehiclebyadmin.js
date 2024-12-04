import React, { useState, useEffect } from 'react';
import {
  Tabs,
  Tab,
  Button,
  Table,
  Card,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { deleteDataAction } from '../../../Redux/Action/commonAction';
import CommonTable from 'components/common/CommanTable';
import { getVehiclesByOwnerAction } from '../../../Redux/Action/vehicle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const AllVehiclebyadmin = () => {
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
    totalPages: 1,
    totalDrivers: 0,
  });
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const vehicleDataByOwnerId = useSelector((state) => state.vehicle.vehicles);
  const vehiclese = vehicleDataByOwnerId || [];
  
  const loginuserlist = useSelector(
    (state) => state.login.loginuserlist.user || []
  );
  const fetchVichelsData = async(userId,page) => {
    try {
      const response = await dispatch(getVehiclesByOwnerAction(userId,page))
      if(response.vichels){
        setPagination({
          totalPages: response.totalPages,
          totalDrivers: response.total,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if(loginuserlist?.id){
      const userId = loginuserlist?.id
    fetchVichelsData(userId,currentPage)
    }
  }, [loginuserlist, dispatch , currentPage]);

  const handleTabChange = (_event, newValue) => {
    setTabValue(newValue);
    setCurrentPage(1);
  };

  const handleActionMenuOpen = (event, vehicle) => {
    setSelectedVehicle(vehicle);
    setAnchorEl(event.currentTarget);
  };

  const handleActionMenuClose = () => {
    setAnchorEl(null);
  };

  const getVehiclesData = () => {
    return vehiclese; // Return the list of vehicles directly from the state
  };

  const currentVehicles = getVehiclesData();

  const handleAddVehicle = () => {
    navigate('/admin/add-vehicle');
  };

  const handleEditVehicles = (id) => {
    // Redirect to the edit page for the selected user
    navigate(`/admin/edit_vehicle/${id}`);
  };
  const handleDetails = (id) => {
    // Redirect to the edit page for the selected user
    navigate(`/admin/vehicle_details/${id}`);
  };


  const handleDelete = (id) => {
    try {
      // const id = selectedVehicle.id;
      if (window.confirm("Are you sure you want to delete this data?")) {
        dispatch(deleteDataAction({
          id: id,
          modelName: "Vichel"
        }));
      }
    } catch (error) {
      console.log(error)
    }
  };
  const handlePageChange = async (page) => {
    // debugger
    setCurrentPage(page); // Update the current page state in parent
    // const response = await dispatch(getVehiclesByOwnerAction( userId, page ));
  };
 // Filter vehicles based on the search query
 const filteredVehicles = vehiclese.filter(vehicle =>
  vehicle.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase())
);
const filteredVechicles = () => {
  switch (tabValue) {
    case 0: // Active tab
      return filteredVehicles;
    case 1: 
      return filteredVehicles?.filter(elem => elem?.status === 'pending'); 
    case 2: 
      return filteredVehicles?.filter(elem => elem?.status === 'deleted'); 
    default:
      return filteredVehicles;
  }
};
const columns = [
  { title: "Sr.", field: "Sr." },
  { title: "Vehicle Number", field: "vehicleNumber" },
  { title: "VIN", field: "vin" },
  { title: "Vehicle Type", field: "vehicleType" },
  { title: "Vehicle Model", field: "vehicleModel" },
  { title: "Fuel Tank Capacity", field: "fuelTankCapacity" },
  // { title: "Driver " , field:""},
  // { title: "Current Location" , field:""},
  // { title: "Fault Code" , field:""},
  // { title: "Date Added" , field:"" },
  // { title: "Fuel Status" , field:""},
  { title: "License", field: "license" },
  // { title: "Last Time it Moved", field:"" },
  { title: "Status", field: "status" },
  // { title: "Terminal Address", field: "terminalAddress" },
  // { title: "Hours Available Per Day", field: "hoursAvailablePerDay" },
  // { title: "Dormancy Threshold", field: "dormancyThreshold" },
  // { title: "Registration Number", field: "registrationNumber" },
  // { title: "Registration Expiry Date", field: "registrationExpiryDate" },
  // { title: "Liability Insurance Name", field: "liabilityInsuranceName" },
  // { title: "Liability Insurance Number", field: "liabilityInsuranceNumber" },
  // { title: "Liability Insurance Expiry Date", field: "liabilityInsuranceExpiryDate" },
  // { title: "Cargo Insurance Name", field: "cargoInsuranceName" },
  // { title: "Cargo Insurance Number", field: "cargoInsuranceNumber" },
  // { title: "Cargo Insurance Expiry Date", field: "cargoInsuranceExpiryDate" },
  // { title: "Fuel Type", field: "fuelType" },
  // { title: "Owner ID", field: "ownerId" },
  // {
  //   render: (rowData) => (
  //     <IconButton onClick={(event) => handleActionMenuOpen(event, rowData)}>
  //       <MoreVertIcon />
  //     </IconButton>
  //   ),
  // },
];

  return (
    <Card style={{ padding: '30px', borderRadius: '12px', marginBottom: '30px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ margin: 0, fontWeight: '600', fontSize: '1.5rem' }}>Vehicles</h2>
        <div className="d-flex">
          <input
            type="text"
            className="form-control mr-2"
            placeholder="Search by Vehicle Number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '250px', padding: '10px 15px', borderRadius: '8px', border: '1px solid #ddd', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)', marginRight: '12px' }}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: '#846cf9', color: 'white', padding: '10px 20px', textTransform: 'none', borderRadius: '8px', fontWeight: 'bold', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
            onClick={handleAddVehicle}
          >
           <AddCircleOutlineIcon/>  Add Vehicle
          </Button>
        </div>
      </div>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        style={{ marginBottom: '20px' }}
      >
        <Tab label="All" style={{ textTransform: 'none', fontWeight: tabValue === 0 ? 'bold' : 'normal', fontSize: '1rem' }} />
        <Tab label="Inactive" style={{ textTransform: 'none', fontWeight: tabValue === 1 ? 'bold' : 'normal', fontSize: '1rem' }} />
        <Tab label="Delete" style={{ textTransform: 'none', fontWeight: tabValue === 1 ? 'bold' : 'normal', fontSize: '1rem' }} />
      </Tabs>

      <div className="mt-4" style={{ overflowX: 'auto' }}>
        <CommonTable
        columns={columns}
        data={filteredVechicles()}
        pagination={pagination}
        onEdit={(id) => handleEditVehicles(id)} 
        onDelete={(id) => handleDelete(id)}
        onDetails={(id) => handleDetails(id)}
        handlePageChange={handlePageChange}
        // onAssignTask={handleAssignTaskOpen}
        userId={loginuserlist?.id}
        pageSize={pageSize}
        currentPage={currentPage}
        currentTab={tabValue}
      />
      </div>
    </Card>
  );
};

export default AllVehiclebyadmin;
