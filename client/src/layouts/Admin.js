import React, { useRef, useEffect, useState } from "react";
import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import routes from "routes.js";
import sidebarImage from "assets/img/sidebar-3.jpg";
import User from "views/UserProfile";
import Vehicles from "views/owner/vehicle";
import AddVehicle from "views/owner/addvehicle";
import UpdateVehicle from "views/owner/updatevehicle";
import AddDriver from "views/owner/adddriver";
import AssignVehicelDriver from "views/owner/assignvehicledriver"
import VehicleDetails from "views/owner/vehicledetails";
// import Profile from "../views/admin/Profile";
import Profile from "views/admin/Profile";
import { BuyPlan } from "views/owner/plan";
import { FuelDetails } from "views/owner/fueldetail";
import DriverTasksStatus from "views/driver/driverTasks";
import Allusers from "../views/admin/users/Allusers";
import Edituser from "../views/admin/users/Edituser";
import Detailsusers from "../views/admin/users/Detailsusers";
import DriverUser from "../views/driver/driverProfile";
import { useSelector } from "react-redux";
import DriverDashboard from "../views/dashboard/driverDashboard";
import AdminDashboard from "../views/dashboard/admin/adminDashboard";
import DriverList from "views/owner/driverlist";
import Checkout from "views/owner/checkout";
import UpdateDriver from "views/owner/updatedriver";
import DriverHistory from "views/driver/history";
import AddFuelDetails from "views/driver/addFuel";
import CreateTask from "views/owner/task";
import AddVehiclebyadmin from "views/admin/Vehicle/AddVehiclebyadmin";
import Editvehiclebyadmin from "views/admin/Vehicle/Editvehiclebyadmin";
import AllVehiclebyadmin from "views/admin/Vehicle/AllVehiclebyadmin";
import Details_vehiclebyadmin from "views/admin/Vehicle/Details_vehiclebyadmin";
import AddDriverby_admin from "views/admin/driver/AddDriverBy_admin";
import Alldriverby_admin from "views/admin/driver/Alldriverby_admin";
import DetailsDriverby_admin from "views/admin/driver/DetailsDriverby_admin";
import EditDriverby_admin from "views/admin/driver/EditDriverby_admin";
import Addtaskby_admin from "views/admin/Task/Addtaskby_admin";
import Tasklist from "views/admin/Task/Tasklist";
import SearchMap from "views/admin/Components/SearchMap";
import Test from "views/dashboard/test";
import AddTerminal from "views/admin/Terminal/AddTerminal";
import AllTerminal from "views/admin/Terminal/AllTerminal";
import IftaTrips from "views/admin/IFTA/IftaTrips";
import IftaReports from "views/admin/IFTA/IftaReports";
import EditTerminal from "views/admin/Terminal/EditTerminal";
import AddTrailers from "views/admin/Trailers/AddTrailers";
import AllTrailers from "views/admin/Trailers/AllTrailers";
import EditTrailers from "views/admin/Trailers/EditTrailers";
import DetailsTrailers from "views/admin/Trailers/DetailsTrailers";
import DetailsTerminal from "views/admin/Terminal/DetailsTerminal";
import FuelEnergy from "views/admin/Components/FuelEnergy";
import FuelReports from "views/admin/Reports";
import HoslogBook from "views/admin/Components/HoslogBook";
import Maps from "views/admin/Components/Maps"
import UserRoles from "views/admin/Components/UserRoles";
import AssignVehicleDriver from "views/admin/assignDriver/assignDriver";




function AdminLayout() {
  const [image, setImage] = useState(sidebarImage);
 
  const [color, setColor] = useState("black");
  
  const [hasImage, setHasImage] = useState(true);
  const location = useLocation();
  const mainPanel = useRef(null);
  const getRoutes = (routes) => {
    return routes
      .filter((prop) => prop.layout === "/admin" || prop.layout === "/owner" || prop.layout === "/driver")
      .flatMap((prop) => {
        if (prop.dropdown) {
          return [
            <Route key={prop.path} path={prop.layout + prop.path} element={<prop.component />} />,
            ...prop.dropdown.map((subProp) => (
              <Route
                key={subProp.path}
                path={prop.layout + subProp.path}
                element={<subProp.component />}
              />
            )),
          ];
        } else {
          return (
            <Route
              key={prop.path}
              path={prop.layout + prop.path}
              element={<prop.component />}
            />
          );
        }
      });
  };
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      const element = document.getElementById("bodyClick");
      if (element) {
        element.parentNode.removeChild(element);
      }
    }
  }, [location]);
  const Dashboard = () => {
    const loginuserlist = useSelector((state) => state.login.loginuserlist.user || []);
  // console.log(loginuserlist,"loginuserlistloginuserlistloginuserlist")
    switch (loginuserlist?.role) {
      case 'admin':
        return <AdminDashboard />;
         case 'owner':
        return <AdminDashboard />;
      // case 'owner':
      //   return <OwnerDashboard />;
      case 'driver':
        return <DriverDashboard />;
    }
  };
  return (
    <div className="wrapper">
      <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
      <div className="main-panel" ref={mainPanel}>
        <AdminNavbar />
        <div className="content">
          <Routes>
            {/* {getRoutes(routes)} */}
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/user" element={<User/>} />

            {/* Owner Dashboard Routes */}
            <Route path="/vehicles" element={<Vehicles/>} />
            <Route path="/addvehicles" element={<AddVehicle/>} />
            <Route path="/updatevehicle/:id" element={<UpdateVehicle/>} />
            <Route path="/adddriver" element={<AddDriver/>} />
            <Route path="/assignvehicledriver" element={<AssignVehicelDriver/>} />
            <Route path="/driverlist" element={<DriverList/>} />
            <Route path="/updatedriver/:driverId" element={<UpdateDriver/>} />
            <Route path="/vehicledetails/:id" element={<VehicleDetails/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/plan" element={<BuyPlan/>} />
            <Route path="/fueldetail" element={<FuelDetails/>} />
            <Route path="/createTask" element={<CreateTask/>} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="/tasks/taskStatus" element={<DriverTasksStatus/>} />
            {/* admin dashboard routes */}
            <Route path="/allusers" element={<Allusers/>} />
            <Route path="/edit_user/:id" element={<Edituser/>} />
            <Route path="/user_details/:id" element={<Detailsusers/>} />
            <Route path="/profile" element={<DriverUser/>} />
            <Route path="/history" element={<DriverHistory/>} />
            <Route path="/addFuel" element={<AddFuelDetails/>} />
            <Route path="/add-vehicle" element={<AddVehiclebyadmin/>} />
            <Route path="/all-vehicle" element={<AllVehiclebyadmin/>} />
            <Route path="/edit_vehicle/:id" element={<Editvehiclebyadmin/>} />
            <Route path="/vehicle_details/:id" element={<Details_vehiclebyadmin/>} />
            <Route path="/add-driver" element={<AddDriverby_admin/>} />
            <Route path="/all-driver" element={<Alldriverby_admin/>} />
            <Route path="/driver_details/:id" element={<DetailsDriverby_admin/>} />
            <Route path="/edit_driver/:id" element={<EditDriverby_admin/>} />
            <Route path="/create_task" element={<Addtaskby_admin/>} />
            <Route path="/task-list" element={<Tasklist/>} />
            <Route path="/search" element={<SearchMap/>} />
            <Route path="/add-terminal" element={<AddTerminal/>} />
            <Route path="/all-terminal" element={<AllTerminal/>} />
            <Route path="/details_terminal/:id" element={<DetailsTerminal/>} />
            <Route path="/edit_terminal/:id" element={<EditTerminal/>} />
            <Route path="/ifta-reports" element={<IftaReports/>} />
            <Route path="/ifta-trips" element={<IftaTrips/>} />
            <Route path="/add-trailer" element={<AddTrailers/>} />
            <Route path="/all-trailers" element={<AllTrailers/>} />
            <Route path="/edit-trailers/:id" element={<EditTrailers/>} />
            <Route path="/details-trailers/:id" element={<DetailsTrailers/>} />
            <Route path="/fuel-energy" element={<FuelEnergy/>} />
            <Route path="/hoslog-book" element={<HoslogBook/>} />
            <Route path="/user_roles" element={<UserRoles/>} />
            <Route path="/maps" element={<Maps/>} />
            <Route path="/test" element={<Test/>} />
            <Route path="/reports/fuel" element={<FuelReports/>} />
            <Route path="/assign" element={<AssignVehicleDriver/>}/>
         
          </Routes>
        </div>
        <Footer />
      </div>
     
    </div>
  );
}
export default AdminLayout;