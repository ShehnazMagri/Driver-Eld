import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";
import routes from "routes.js";
import TimerComponent from "./timerComponent";
import getLoginUser from "../common/loginUserDetail";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCog, faTachometerAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import QuickAddModal from "views/dashboard/admin/QuickAddModal";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState([
    { id: 1, name: "Task 1", link: "/driver/tasks/taskStatus" },
    { id: 2, name: "Task 2", link: "/driver/tasks/taskStatus" },
    { id: 3, name: "Task 3", link: "/driver/tasks/taskStatus" },
    { id: 4, name: "Task 4", link: "/driver/tasks/taskStatus" },
  ]);

  const loginuserlist = useSelector(
    (state) => state.login.loginuserlist.user || []
  );
  
  const userRole = loginuserlist.role || "guest";
  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }

  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate(`/admin/profile`);
  }
  

  const handleAccount = () => {
    // Implement account navigation
  };

  const handleDashboard = () => {
    navigate(`/admin/dashboard`);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("checkinStatus");
      localStorage.removeItem("timerValue");
      navigate("/login");
    } catch (e) {
      console.error("Logout error: ", e);
    }
  };


  useEffect(() => {
    const fetch = async () => {
      try {
        await dispatch(getLoginUser());
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [dispatch]);


  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    // <Navbar bg="light" expand="lg" style={{ boxShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)" }}>
    <Navbar bg="white" expand="lg">
      <Container fluid>
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
          <Button
            variant="dark"
            className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
            onClick={mobileSidebarToggle}
          >
            <i className="fas fa-ellipsis-v"></i>
          </Button>
          <Navbar.Brand
            href="#home"
            onClick={(e) => e.preventDefault()}
            className="mr-2"
          >
            {getBrandText()}
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav mr-auto" navbar>
            {/* {userRole === "admin" && ( */}
            {(userRole === "owner" || userRole === "admin") && (
              <Nav.Item>
                <Nav.Link
                  data-toggle="dropdown"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="m-0"
                >
                  <span className="d-lg-none ml-1">Dashboard</span>
                  <span style={{color:"8b5cf6", fontWeight: "600",}}  onClick={openModal}>Quick add</span>
                  <QuickAddModal isOpen={isModalOpen} onClose={closeModal} />
                </Nav.Link>
              </Nav.Item>
            )}
          </Nav>

          <Nav className="ml-auto" navbar>
            <Nav.Item>
              {/* <Nav.Link
                className="m-0"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="no-icon">Account</span>
              </Nav.Link> */}
            </Nav.Item>

            {userRole === "owner" && (
              <Dropdown as={Nav.Item}>
                <Dropdown.Toggle
                  as={Nav.Link}
                  data-toggle="dropdown"
                  id="dropdown-67443507"
                  variant="default"
                  className="m-0"
                >
                  <i className="nc-icon nc-planet"></i>
                  <span className="notification">5</span>
                  <span className="d-lg-none ml-1">Notifications</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Notification 1
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Notification 2
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
            <div>
              <IconButton onClick={handleClick} className="m-0 d-flex align-items-center">
                <Avatar />
                <span>{loginuserlist?.username}</span>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                align="right"
              >
                <MenuItem onClick={() => { handleProfile(); handleClose(); }}>
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  Profile
                </MenuItem>
                <MenuItem onClick={() => { handleAccount(); handleClose(); }}>
                  <FontAwesomeIcon icon={faCog} className="mr-2" />
                  Account
                </MenuItem>
                <MenuItem onClick={() => { handleDashboard(); handleClose(); }}>
                  <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
                  Dashboard
                </MenuItem>
                <MenuItem onClick={() => { handleLogout(); handleClose(); }} style={{ borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  Logout
                </MenuItem>
              </Menu>
            </div>
            {/* <Dropdown as={Nav.Item}>
              <Dropdown.Toggle
                as={Nav.Link}
                id="profile-dropdown"
                className="m-0 d-flex align-items-center"
              >
              <Avatar/>
                <span>{loginuserlist?.username}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu align="right">
                <Dropdown.Item onClick={handleProfile}>
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={handleAccount}>
                  <FontAwesomeIcon icon={faCog} className="mr-2" />
                  Account
                </Dropdown.Item>
                <Dropdown.Item onClick={handleDashboard}>
                  <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
                  Dashboard
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;