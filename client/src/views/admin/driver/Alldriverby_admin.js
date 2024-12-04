import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Button,
  Card,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getDriversByOwnerAction,
  deleteDriverAction,
} from "../../../Redux/Action/driver";
import CommonTable from "../../../components/common/CommanTable";
import { Form, Row, Col } from "react-bootstrap";
import { deleteDataAction } from "../../../Redux/Action/commonAction";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Alldriverby_admin = () => {
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [vehicle, setVehicle] = useState("");
  const [additionalField, setAdditionalField] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    totalDrivers: 0,
  });

  const loginuserlist = useSelector(
    (state) => state.login.loginuserlist.user || []
  );

  const drivers = useSelector((state) => state.driver.drivers) || [];

  useEffect(() => {
    if (loginuserlist?.id) {
      const userId = loginuserlist.id;
      fetchDrivers(userId, currentPage);
    }
  }, [loginuserlist, dispatch, currentPage]);

  const fetchDrivers = (userId, page) => {
    dispatch(getDriversByOwnerAction({ userId, page, size: pageSize }))
      .then((response) => {
        const { payload } = response;
        if (payload?.drivers) {
          dispatch({ type: "SET_DRIVERS", payload: payload.drivers });
        }
        if (payload?.totalPages !== undefined && payload?.total !== undefined) {
          setPagination({
            totalPages: payload.totalPages,
            totalDrivers: payload.total,
          });
        }
      })
      .catch((error) => {
        console.error("Failed to fetch drivers:", error);
      });
  };

  const handlePageChange = async (userId, page) => {
    setCurrentPage(page); // Update the current page state in parent
    // const response = await dispatch(
    //   getDriversByOwnerAction({ userId, page, size: pageSize })
    // );
  };

  useEffect(() => {
    if (selectedDriver) {
    }
  }, [selectedDriver]);

  const handleDelete = (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this data?")) {
        dispatch(
          deleteDataAction({
            id: id,
            modelName: "Driver",
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setCurrentPage(1)
  };




  const handleModalClose = () => {
    setModalOpen(false);
    setVehicle("");
    setAdditionalField("");
  };

  const handleAssignTaskOpen = (driver) => {
    setSelectedDriver(driver);
    setModalOpen(true);
  };

  const getDriversData = () => {
    if (tabValue === 0)
      return drivers.filter((driver) => driver.status === "active");
    if (tabValue === 1)
      return drivers.filter((driver) => driver.status === "inactive");
    return drivers.filter((driver) => driver.status === "deleted");
  };

  // Update the filteredDrivers function to include the search query
  const filteredDrivers = () => {
    let filtered = drivers;
    switch (tabValue) {
      case 0: // Active tab
        filtered = drivers;
        break;
      case 1:
        filtered = filtered.filter((driver) => driver.status === "pending");
        break;
      case 2:
        filtered = filtered.filter((driver) => driver.status === "deleted");
        break;
      default:
        break;
    }
    // Filter based on search query
    if (searchQuery) {
      filtered = filtered.filter((driver) =>
        driver.firstName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    // Add style property based on driver status
    return filtered.map((driver) => ({
      ...driver,
      style:
        driver.status === "pending"
          ? "orange"
          : driver.status === "deleted"
          ? "red"
          : "inherit",
    }));
  };

  const currentDrivers = getDriversData();

  const columns = [
    { title: "Sr.", field: "Sr." },
    { title: " Name", field: "firstName" },
    { title: "Start Date", field: "startDate" },
    { title: "CellPhone", field: "cell" },
    { title: "Truck Number", field: "vehicleNumber" },
    { title: "Timezone", field: "" },
    { title: "License", field: "license" },
    { title: "Restart", field: "restartHours" },
    { title: "Break", field: "restBreak" },
    { title: "Cycle", field: "cycle" },
    // { title: "Operating System", field: "os" },
    { title: "App Version", field: "appVersion" },
    { title: "Os", field: "os" },
    { title: "Status", field: "status" },
  ];

  const handleAddDriver = () => {
    navigate("/admin/add-driver");
  };
  const handleEditDriver = (id) => {
    console.log(id, "ididi");
    navigate(`/admin/edit_driver/${id}`);
  };
  const handleDetail = (id) => {
    navigate(`/admin/driver_details/${id}`);
  };
  return (
    <Card
      style={{
        borderRadius: "12px",
        marginBottom: "30px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ margin: 0, fontWeight: "600", fontSize: "1.5rem" }}>
          Drivers
        </h2>
        <div className="d-flex">
          <input
            type="text"
            className="form-control mr-2"
            placeholder="Search by Driver ID/Name"
            style={{
              width: "250px",
              padding: "10px 15px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
              marginRight: "12px",
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            style={{
              backgroundColor: "#846cf9",
              color: "white",
              padding: "10px 20px",
              textTransform: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
            }}
            onClick={handleAddDriver}
          >
            <AddCircleOutlineIcon/> Add Driver
          </Button>
        </div>
      </div>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        style={{ marginBottom: "20px" }}
      >
        <Tab
          label="All"
          style={{
            textTransform: "none",
            fontWeight: tabValue === 0 ? "bold" : "normal",
            fontSize: "1rem",
          }}
        />
        <Tab
          label="Inactive"
          style={{
            textTransform: "none",
            fontWeight: tabValue === 1 ? "bold" : "normal",
            fontSize: "1rem",
          }}
        />
        <Tab
          label="Deleted"
          style={{
            textTransform: "none",
            fontWeight: tabValue === 2 ? "bold" : "normal",
            fontSize: "1rem",
          }}
        />
      </Tabs>

      <div className="mt-4" style={{ overflow: "auto" }}>
        <CommonTable
          columns={columns}
          data={filteredDrivers()}
          pagination={pagination}
          onEdit={(id) => handleEditDriver(id)}
          onDelete={(id) => handleDelete(id)}
          onDetails={(id) => handleDetail(id)}
          onAssignTask={handleAssignTaskOpen}
          handlePageChange={handlePageChange}
          userId={loginuserlist?.id}
          pageSize={pageSize}
          currentPage={currentPage}
          currentTab={tabValue}
        />
      </div>
      <Dialog open={modalOpen} onClose={handleModalClose}>
        <DialogTitle>Driver Details</DialogTitle>
        <DialogContent>
          <Form>
            <Row>
              <Col>
                <Form.Group controlId="vehicle">
                  <Form.Label>Vehicle</Form.Label>
                  <Form.Control
                    type="text"
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="additionalField">
                  <Form.Label>Additional Field</Form.Label>
                  <Form.Control
                    type="text"
                    value={additionalField}
                    onChange={(e) => setAdditionalField(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => console.log(selectedDriver)} color="primary">
            Assign
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Alldriverby_admin;
