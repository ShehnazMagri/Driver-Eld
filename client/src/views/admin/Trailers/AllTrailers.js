import React, { useState ,useEffect } from 'react';
import {
  Tabs,
  Tab,
  Button,
  Table,
  Card,
  Menu,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,

} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getTrailersByOwnerAction } from '../../../Redux/Action/adminauth';
import { deleteDataAction } from '../../../Redux/Action/commonAction';
import CommonTable from 'components/common/CommanTable';

const AllTrailers = () => {
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  // const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedTrailers, setSelectedTrailers] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [vehicle, setVehicle] = useState('');
  const [additionalField, setAdditionalField] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize] = useState(10);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    totalDrivers: 0,
  });
  const navigate = useNavigate();
 const dispatch = useDispatch();
 const loginuserlist = useSelector(
  (state) => state.login.loginuserlist.user || []
);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setCurrentPage(1)
  };

  const handleActionMenuOpen = (event, trailer) => {
    setSelectedTrailers(trailer);
    setAnchorEl(event.currentTarget);
  };

  const handleActionMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAssignTaskOpen = () => {
    setModalOpen(true);
    handleActionMenuClose();
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setVehicle('');
    setAdditionalField(''); // Reset additional field
  };

  const alltrailers = useSelector((state) => state.login.gettrailers_urllist);
  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update the search query
  };
 
  const handlePageChange = async (userId, page) => {
    setCurrentPage(page); // Update the current page state in parent
    const response = await dispatch(getTrailersByOwnerAction({ userId, page, size: pageSize }));
  };
  const fetchTrailerData = async(userId,page) => {
    try {
      const response = await dispatch(getTrailersByOwnerAction(userId,page));
    if(response.payload){
      setPagination({
        totalPages:response?.payload.totalPages,
        totalDrivers:response?.payload.total
      })
    }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(loginuserlist?.id){
      fetchTrailerData(loginuserlist?.id, currentPage)
    }
  }, [dispatch , loginuserlist?.id,currentPage]);


  const handleAddTrailer = () => {
    navigate('/admin/add-trailer');
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-trailers/${id}`);
  };

  const handleDetails = (id) => {
    navigate(`/admin/details-trailers/${id}`);
  };

  const handleDelete = (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this data?")) {
        dispatch(deleteDataAction({
          id: id,
          modelName: "Trailer"
        }));
      }
    } catch (error) {
      console.log(error)
    }
  };
 

// Update this function to filter based on the search query and the selected tab
const filteredTrailers = () => {
  const trailers = alltrailers?.trailers || [];
  let filtered = [];
  switch (tabValue) {
    case 0: // Active tab
      filtered = trailers; // Get all active trailers
      break;
    case 1: // Inactive tab
      filtered = trailers.filter(elem => elem.status === 'pending');
      break;
    case 2: // Deleted tab
      filtered = trailers.filter(elem => elem.status === 'deleted');
      break;
    default:
      filtered = trailers;
  }
  // Now filter based on the search query
  return filtered.filter(trailer => 
    trailer.trailerNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );
}
 
 const handleEditTrailer = (id) => {
  navigate(`/admin/edit-trailers/${id}`)
 }

const columns = [
  {title:"Sr.",field:"Sr."},
  {title:"Trailer Number",field:"trailerNumber"},
  {title:"Vin",field:"vin"},
  {title:"Trailer Manufacturer",field:"trailerManufacturer"},
  // {title:"Model",field:"model"},
  {title:"Trailer Type",field:"trailerType"},
  // {title:"License Authority",field:"licenseAuthority"},
  {title:"Battery Level",field:""},
  // {title:"Ownership Type",field:"ownershipType"},
  {title:"Status",field:"status"},
]
  return (
    <Card style={{ padding: '30px', borderRadius: '12px', marginBottom: '30px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ margin: 0, fontWeight: '600', fontSize: '1.5rem' }}>All Trailers</h2>
        <div className="d-flex">
          <input
            type="text"
            className="form-control mr-2"
            placeholder="Search by Trailer Number"
            value={searchQuery}
            onChange={handleSearchChange}
            style={{
              width: '250px',
              padding: '10px 15px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
              marginRight: '12px',
            }}
          />
          <Button
            variant="contained"
            color="primary"
            style={{
              backgroundColor: '#846cf9',
              color: 'white',
              padding: '10px 20px',
              textTransform: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
            }}
            onClick={handleAddTrailer}
          >
            + Add Trailer
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
        <Tab label="Deleted" style={{ textTransform: 'none', fontWeight: tabValue === 2 ? 'bold' : 'normal', fontSize: '1rem' }} />
      </Tabs>

      <div className="mt-4">
      <Table className="table table-hover" style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>


    <CommonTable
        columns={columns}
        // data={filteredDrivers()}
        data={filteredTrailers()}
        pagination={pagination}
        onEdit={(id) => handleEditTrailer(id)}
        onDelete={(id) => handleDelete(id)}
        onDetails={(id) => handleDetails(id)}
        onAssignTask={handleAssignTaskOpen}
        handlePageChange={handlePageChange}
        userId={loginuserlist?.id}
        pageSize={pageSize}
        currentTab={tabValue}
        currentPage={currentPage}
      />
    
</Table>

      </div>

      <Dialog open={modalOpen} onClose={handleModalClose} maxWidth="sm" fullWidth>
        <DialogTitle>Assign Task to Driver</DialogTitle>
        <DialogContent>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="driver">
                <Form.Label>Driver *</Form.Label>
                <Form.Control type="text" placeholder="john@gmail...." required />
              </Form.Group>
            </Col>

          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="expirationDate">
                <Form.Label>Curent Vehicle *</Form.Label>
                <Form.Control type="text" placeholder='28' required />
              </Form.Group>
            </Col>
          </Row>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => { /* Assign logic here */ handleModalClose(); }} className='custom-button'>
            Assign
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default AllTrailers;