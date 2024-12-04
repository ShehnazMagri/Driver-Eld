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
import { getallterminallistActionByOwner, getloginuserAction } from '../../../Redux/Action/adminauth';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDataAction } from '../../../Redux/Action/commonAction';
import CommonTable from 'components/common/CommanTable';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const AllTerminal = () => {
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTerminal, setSelectedTerminal] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // State for search input
  const [pagination, setPagination] = useState({
    totalPages: 1,
    totalDrivers: 0,
  });
  const [pageSize] = useState(10);
  const loginuserlist = useSelector( (state) => state.login.loginuserlist.user || []);
  const allterminal = useSelector((state) => state.login.allterminalbyIdlist);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ownerId = loginuserlist?.id; // Assuming 'id' is the ownerId


  useEffect(() => {
    dispatch(getloginuserAction());
  }, [dispatch]);

  const fetchTerminalData = async(ownerId,page) => {
    try {
      const response = await dispatch(getallterminallistActionByOwner(ownerId,page));
      if(response){
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
    if (ownerId) {
      fetchTerminalData(ownerId,currentPage) 
    }
  }, [dispatch, ownerId , currentPage]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setCurrentPage(1)
  };

  const handleActionMenuOpen = (event, terminal) => {
    setSelectedTerminal(terminal);
    setAnchorEl(event.currentTarget);
  };

  const handleActionMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAddTerminal = () => {
    navigate('/admin/add-terminal');
  };


  const handleEditTerminal = (id) => {
    navigate(`/admin/edit_terminal/${id}`);
    setAnchorEl(null); // Close the menu after selection
  };

  const handleDelete = (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this data?")) {
        dispatch(deleteDataAction({
          id: id,
          modelName: "Terminal"
        }));
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDetails = (id) => {
    navigate(`/admin/details_terminal/${id}`);
  };
  const handlePageChange = async (userId, page) => {
    setCurrentPage(page); // Update the current page state in parent
    const response = await dispatch(getallterminallistActionByOwner( userId, page ));
  };
  const filteredTerminals = allterminal?.terminals?.filter((terminal) =>
    terminal.terminalName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredDrivers = () => {
    switch (tabValue) {
      case 0: // Active tab
        return filteredTerminals;
      case 1: 
        return filteredTerminals?.filter(terminal => terminal?.status === 'pending'); 
      case 2: 
        return filteredTerminals?.filter(terminal => terminal?.status === 'deleted'); 
      default:
        return filteredTerminals;
    }
};
const columns = [
  { title: "Sr.", field: "Sr." },
  { title: "Terminal Name", field: "terminalName" },
  // { title: "Terminal Time Zone", field: "terminalTimeZone" },
  // { title: "Terminal Address", field: "terminalAddress" },
  // { title: "Terminal Contact", field: "terminalContact" },
  { title: "Drivers", field: "" },
  { title:"Assets" , field: "" },
  { title: "Status", field: "status" },
  { title: "Created Date", field: "createdAt" },
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
    <Card
      style={{
        padding: '30px',
        borderRadius: '12px',
        marginBottom: '30px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ margin: 0, fontWeight: '600', fontSize: '1.5rem' }}>
          Terminals
        </h2>
        <div className="d-flex">
          <input
            type="text"
            className="form-control mr-2"
            placeholder="Search by Terminal Name"
            value={searchTerm} // Bind search input to state
            onChange={(e) => setSearchTerm(e.target.value)} 
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
            onClick={handleAddTerminal}
          >
            <AddCircleOutlineIcon/> Add Terminal
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
        <Tab
          label="All"
          style={{
            textTransform: 'none',
            fontWeight: tabValue === 0 ? 'bold' : 'normal',
            fontSize: '1rem',
          }}
        />
        <Tab
          label="Inactive"
          style={{
            textTransform: 'none',
            fontWeight: tabValue === 1 ? 'bold' : 'normal',
            fontSize: '1rem',
          }}
        />
        <Tab
          label="Deleted"
          style={{
            textTransform: 'none',
            fontWeight: tabValue === 1 ? 'bold' : 'normal',
            fontSize: '1rem',
          }}
        />
      </Tabs>

      <div className="mt-4">
      <CommonTable
        columns={columns}
        data={filteredDrivers()}
        pagination={pagination}
        onEdit={(id) => handleEditTerminal(id)}
        onDelete={(id) => handleDelete(id)}
        onDetails={(id) => handleDetails(id)}
        // onAssignTask={handleAssignTaskOpen}
        handlePageChange={handlePageChange}
        userId={loginuserlist?.id}
        pageSize={pageSize}
        currentTab={tabValue}
        currentPage={currentPage}
      />
      </div>
    </Card >
  );
};

export default AllTerminal;
