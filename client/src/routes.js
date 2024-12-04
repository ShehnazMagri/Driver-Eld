
import AssignVehicelDriver from "views/admin/assignDriver/assignDriver";
import DriverTasksStatus from "views/driver/driverTasks";
import { task } from "views/driver/driverTasks";
import Allusers from "views/admin/users/Allusers";
import OwnerDashboard from "views/dashboard/ownerDashboard";
import DriverDashboard from "views/dashboard/driverDashboard";
import AdminDashboard from "views/dashboard/admin/adminDashboard";
import { FuelDetails } from "views/owner/fueldetail";
import Maps from "views/admin/Components/Maps";



const dashboardRoutes = [

  {
    path: "/dashboard",
    name: "Dashboard",
    icon:"fas fa-th",
    component: OwnerDashboard,
    layout: "/admin",
    roles:["owner"]
  },
  // start admin routing
  {
    path: "/dashboard",
    name: "Dashboard",
    icon:"fas fa-th",
    component: AdminDashboard,
    layout: "/admin",
    roles:["admin"]
  },
  {
    path: "/search",
    name: "Search",
    icon:"fas fa-search",
    component: AdminDashboard,
    layout: "/admin",
    roles:["admin","owner"]
  },
  {
    path: "/over-view",
    name: "Over view",
    icon: "fas fa-clipboard-list",
    component: AdminDashboard,
    layout: "/admin",
    roles:["admin","owner"]
  },
  {
    path: "/safety",
    name: "Safety",
    icon: "fas fa-shield-alt",
    component: AdminDashboard,
    layout: "/admin",
    roles:["admin","owner"]
  },
  {
    path: "/Compliance",
    name: "Compliance",
    icon: "fas fa-clipboard-check",
    component: AdminDashboard,
    layout: "/admin",
    roles:["admin","owner"]
  },
  {
    path: "/maintenance",
    name: "Maintenance",
    icon: "fas fa-tools",
    component: AdminDashboard,
    layout: "/admin",
    roles:["admin","owner"]
  },
  {
    path: "/dispatch",
    name: "Dispatch",
    icon: "fas fa-map-marker-alt",
    component: AdminDashboard,
    layout: "/admin",
    roles:["admin","owner"]
  },
  {
    path: "/fuel-energy",
    name: "Fuel & Energy",
    icon: "fas fa-gas-pump",
    component: AdminDashboard,
    layout: "/admin",
    roles:["admin","owner"]
  },
  {
    path: "/documents",
    name: "Documents",
    icon: "fas fa-file-alt",
    component: AdminDashboard,
    layout: "/admin",
    roles:["admin","owner"]
  },
  {
    path: "/hoslog-book",
    name: "HOS LogBook",
    icon: "fas fa-file-alt",
    component: AdminDashboard,
    layout: "/admin",
    roles:["admin","owner"]
  },
  {
    path: "/user_roles",
    name: "User & Roles",
    icon: "fas fa-file-alt",
    component: AdminDashboard,
    layout: "/admin",
    roles:["admin","owner"]
  },
  {
    path: "/tasks",
    name: "Reports",
    icon: "fas fa-chart-bar",
    component: AdminDashboard,
    layout: "/admin",
    roles:["admin","owner"],
    dropdown: [
      {
        path: "/reports/fuel",
        name: "Fuel",
        icon: "fas fa-gas-pump",
        component: FuelDetails,
        layout: "/admin",
      }]},
    
  {
    path: "/tasks",
    name: "IFTA",
    icon: "fas fa-user",
    component: DriverTasksStatus,
    layout: "/admin",
    roles:["admin","owner"],
    dropdown: [
      {
        path: "/ifta-reports",
        name: "IFTA Reports",
        icon: "fas fa-plus",
        component: task,
        layout: "/admin",
      },
      {
       path: "/ifta-trips",
       name: "IFTA Trips",
        icon: "fas fa-list",
        component: task,
        layout: "/admin",
      },
    ]
  },


    // end admin routing
  {
    path: "/dashboard",
    name: "Dashboard",
    icon:"fas fa-th",
    component: DriverDashboard,
    layout: "/admin",
    roles:["driver"]
  },
 

  // {
  //   path: "/user",
  //   name: "User Profile",
  //   icon: "fas fa-user",
  //   component: UserProfile,
  //   layout: "/admin",
  //   roles:["admin","owner"]
  // },
  {
    path: "/assign",
    name: "Assign Driver",
    icon:"nc-icon nc-simple-add",
    component: AssignVehicelDriver,
    layout: "/admin",
    roles:["admin","owner"]
  },
  {
    path: "/all-trailers",
    name: "All Trailers",
    icon: "fas fa-user",
    component: Allusers,
    layout: "/admin",
    roles:["admin","owner"]
  },
 
  // {
  //   path: "/vehicles",
  //   name: "Vehicles List",
  //   icon: "fas fa-truck",
  //   component: Vehicles,
  //   layout: "/owner",
  //   roles:["owner"]
  // },
  // {
  //   path: "/driverlist",
  //   name: "Driver List",
  //   icon: "fas fa-list",
  //   component: DriverList,
  //   layout: "/owner",
  //   roles:["owner"]
  // },
  // {
  //   path: "/addvehicles",
  //   name: "Add Vehicles",
  //   icon: "fas fa-car",
  //   component: AddVehicle,
  //   layout: "/owner",
  //   roles:["owner"]
  // },
  // {
  //   path: "/adddriver",
  //   name: "Add Driver",
  //   icon: "fas fa-user-tie",
  //   component: AddDriver,
  //   layout: "/owner",
  //   roles:["owner"]
  // },
  // {
  //   path: "/assignvehicledriver",
  //   name: "Assign Driver",
  //   icon: "nc-icon nc-simple-add",
  //   component: AssignVehicelDriver,
  //   layout: "/owner",
  //   roles:["admin","owner"]
  // },
  // {
  //   path: "/createTask",
  //   name: "Create Tasks",
  //   icon: "fas fa-tasks",
  //   component: CreateTask,
  //   layout: "/owner",
  //   roles:["owner"]
  // },

  // {
  //   path: "/plan",
  //   name: "Buy Plan",
  //   icon: "fas fa-shopping-cart",
  //   component: BuyPlan,
  //   layout: "/owner",
  //   roles: ["owner"]
  // },  

  // {
  //   path: "/fueldetail",
  //   name: "Fuel Details",
  //   icon: "fas fa-gas-pump",
  //   component: BuyPlan,
  //   layout: "/owner",
  //   roles: ["owner"]
  // },
  // {
  //   path: "/checkout",
  //   name: "Checkout",
  //   icon: "fas fa-gas-pump",
  //   component: Checkout,
  //   layout: "/owner",
  //   roles: ["owner"]
  // },

  // {
  //   path: "/tasks",
  //   name: "Driver",
  //   icon: "fas fa-id-card",
  //   component: DriverTasksStatus,
  //   layout: "/driver",
  //   roles:["driver"],
  //   dropdown: [
  //     {
  //       path: "/tasks/taskStatus",
  //       name: "Task Status",
  //       icon: "fas fa-exclamation",
  //       component: task,
  //       layout: "/driver",
  //     },
  //     {
  //       path: "/tasks/task2",
  //       name: "Completed",
  //       icon: "nc-icon nc-notes"
  //     }
  //   ]
  // },

  // {
  //   path: "/history",
  //   name: "History",
  //   icon: "fas fa-history",
  //   component: DriverHistory,
  //   layout: "/driver",
  //   roles:["driver"]
  // },
  // {
  //   path: "/addFuel",
  //   name: "Fuel Filling",
  //   icon: "fas fa-gas-pump",
  //   component: AddFuelDetails,
  //   layout: "/driver",
  //   roles:["driver"]
  // },


  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin",
    roles:["admin","owner"]
  },

  {
    path: "/tasks",
    name: "Task",
    icon: "fas fa-tasks",
    // component: AdminTasksStatus,
    layout: "/admin",
    roles:["admin","owner"],
    dropdown: [
      {
        path: "/create_task",
        name: "Add Status",
        icon: "fas fa-plus",
        component: task,
        layout: "/admin",
      },
      {
        path: "/task-list",
        name: "Completed",
        icon: "nc-icon nc-notes"
      }
    ]
  },


  {
    path: "/tasks",
    name: "Vehicle",
    icon: "fas fa-truck",
    component: DriverTasksStatus,
    layout: "/admin",
    roles:["admin","owner"],
    dropdown: [
      {
        path: "/add-vehicle",
        name: "Add Vehicle",
        icon: "fas fa-plus",
        component: task,
        layout: "/admin",
      },
      {
       path: "/all-vehicle",
        name: "All Vehicle",
        icon: "fas fa-list",
        component: task,
        layout: "/admin",
      },
    ]
  },
  {
    path: "/tasks",
    name: "Driver",
    icon: "fas fa-user",
    component: DriverTasksStatus,
    layout: "/admin",
    roles:["admin","owner"],
    dropdown: [
      {
        path: "/add-driver",
        name: "Add Driver",
        icon: "fas fa-plus",
        component: task,
        layout: "/admin",
      },
      {
       path: "/all-driver",
        name: "All Driver",
        icon: "fas fa-list",
        component: task,
        layout: "/admin",
      },
    ]
  },

  {
    path: "/tasks",
    name: "Terminal",
    icon: "fas fa-user",
    component: DriverTasksStatus,
    layout: "/admin",
    roles:["admin","owner"],
    dropdown: [
      {
        path: "/add-terminal",
        name: "Add Terminal",
        icon: "fas fa-plus",
        component: task,
        layout: "/admin",
      },
      {
       path: "/all-terminal",
        name: "All Terminal",
        icon: "fas fa-list",
        component: task,
        layout: "/admin",
      },
    ]
  },
  
 
  
];
export default dashboardRoutes;