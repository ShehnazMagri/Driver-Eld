import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Collapse, Nav } from "reactstrap";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import getLoginUser from "components/common/loginUserDetail";

function Sidebar({ routes }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const [openDropdown, setOpenDropdown] = useState(null);
  const loginuserlist = useSelector((state) => state.login.loginuserlist.user || []);

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

  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  const toggleDropdown = (key, event) => {
    event.preventDefault();
    setOpenDropdown(openDropdown === key ? null : key);
  };

  const filteredRoutes = routes.filter((route) => route.roles.includes(loginuserlist.role));

  return (
    <div className="sidebar">
      <div className="sidebar-wrapper" style={{ backgroundColor: "#0d1b2a" }}>
        <div className="logo d-flex align-items-center justify-content-start">
          <a href="/" className="simple-text logo-mini mx-1"></a>
          <a className="simple-text" href="/">
            Drivers ELD
          </a>
        </div>
        <Nav>
          {filteredRoutes?.map((prop, key) => {
            if (prop.dropdown && prop.dropdown.length > 0) {
              return (
                <li key={key}>
                  <a
                    href="#"
                    className={`nav-link ${activeRoute(prop.layout + prop.path)}`}
                    onClick={(event) => toggleDropdown(key, event)}
                  >
                    <i className={prop.icon} />
                    <p className="d-flex align-items-center justify-content-between">
                      {prop.name}
                      {openDropdown === key ? (
                        <FaChevronDown className="dropdown-icon" />
                      ) : (
                        <FaChevronRight className="dropdown-icon" />
                      )}
                    </p>
                  </a>
                  <Collapse isOpen={openDropdown === key}>
                    <ul className="nav flex-column pl-3">
                      {prop.dropdown.map((child, childKey) => (
                        <li key={childKey} className="nav-item">
                          <NavLink
                            to={prop.layout + child.path}
                            className="nav-link"
                            activeClassName="active"
                          >
                            <i className={child.icon} />
                            <p>{child.name}</p>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </Collapse>
                </li>
              );
            }

            return (
              <li
                className={`${prop.upgrade ? "active active-pro" : activeRoute(prop.layout + prop.path)} ${
                  activeRoute(prop.layout + prop.path) ? "active-bg" : ""
                }`}
                key={key}
              >
                <NavLink
                  to={prop.layout + prop.path}
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className={prop.icon} />
                  <p>{prop.name}</p>
                </NavLink>
              </li>
            );
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
