import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getLoginUser from "../../components/common/loginUserDetail";
import { toast } from "react-toastify";

const REACT_APP_BACKEND_API = process.env.REACT_APP_BACKEND_URL;

 const checkIn = createAsyncThunk('checkIn',async(data) => {
    try {
        const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
        const response = await axios.post(`${REACT_APP_BACKEND_API}/api/driver/check-in/check-out`,data,config)
        if(response.status === 201){
          toast.success(response.data.message)
        }
        if(response.status === 200){
          toast.success(response.data.message)
        }
        return response;
    } catch (e) {
        if (e.response && e.response.data) {
            toast.error(e.response.data.message || "An error occurred.");
          } else {
            toast.error("An error occurred.");
          }
    }
})
export default checkIn;



// Create async thunk for adding a driver
export const addDriverAction = createAsyncThunk("driver/add",async (driverData, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("authToken"); // Fetch token from localStorage
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.post(
          `${REACT_APP_BACKEND_API}/api/driver/add`,
          driverData,
          config
        );
        if (response.status === 201) {
          toast.success(response.data.message || "Driver added successfully!");
          return response.data; 
        }
      } catch (e) {
        if (e.response) {
          const { status, data } = e.response;
          if (status === 403) {
            toast.error("Access denied. You are not authorized.");
            return rejectWithValue(data.message || "Access denied.");
          }
          if (status === 400) {
            toast.error(data.message || "Validation error occurred.");
            return rejectWithValue(data.message || "Validation error.");
          }
          toast.error(data.message || "An error occurred while adding the driver.");
          return rejectWithValue(data.message || "Server error occurred.");
        } else {
          toast.error("An unknown error occurred.");
          return rejectWithValue("Unknown error");
        }
      }
    }
  );


  // Function to fetch all drivers by owner to sheo in lising in admin dashboard
  export const getDriversByOwnerAction = createAsyncThunk("driver/getDriversByOwner",async ({ userId, page, limit, sortBy, order }, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("authToken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: page || 1,
            limit: limit || 10,
            sortBy: sortBy || "createdAt",
            order: order || "DESC",
          },
        };
        const response = await axios.get(
          `${REACT_APP_BACKEND_API}/api/driver/get/${userId}`,
          config
        );
        // console.log("firstredux",response.data)
        if (response.status === 200) {
          return response.data; // Ensure this matches the backend response structure
        }
      } catch (e) {
        if (e.response) {
          const { status, data } = e.response;
          if (status === 403) {
            // toast.error("Access denied. You are not authorized.");
            return rejectWithValue(data.message || "Access denied.");
          }
          if (status === 400) {
            // toast.error(data.message || "Validation error.");
            return rejectWithValue(data.message || "Validation error.");
          }
          // toast.error(data.message || "Error fetching drivers.");
          return rejectWithValue(data.message || "Server error.");
        } else {
          // toast.error("An unknown error occurred.");
          return rejectWithValue("Unknown error");
        }
      }
    }
  );



// drivers task by current date
export const getDriversTaskByDate = createAsyncThunk("driversTaskByDate", async (id, currentDate) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(`${REACT_APP_BACKEND_API}/api/driver/chekin-checkout/${id}`, 
      {currentDate},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.data) {
      // toast.error(error.response.data.message || "An error occurred.");
    } else {
      toast.error("An error occurred.");
    }
  }
});


export const getDriverAllTasks = createAsyncThunk("getDriverAllTasks", async (queryParams) => {
  try {
    const token = localStorage.getItem("authToken");
    // Construct URL with query parameters
    const url = `${REACT_APP_BACKEND_API}/api/driver/checkin-checkout?${new URLSearchParams(queryParams)}`;
    const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.data) {
      toast.error(error.response.data.message || "An error occurred.");
    } else {
      toast.error("An error occurred.");
    }
  }
});


// Async thunk to update driver
export const updateDriverAction = createAsyncThunk(
  "driver/update",
  async ({ id, driverData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        `${REACT_APP_BACKEND_API}/api/driver/${id}`,
        driverData,
        config
      );
      if (response.status === 200) {
        toast.success("Driver updated successfully!");
        return response.data;
      }
    } catch (e) {
      if (e.response) {
        const { status, data } = e.response;
        if (status === 403) {
          toast.error("Access denied. You are not authorized.");
          return rejectWithValue(data.message || "Access denied.");
        }
        if (status === 404) {
          toast.error("Driver not found.");
          return rejectWithValue("Driver not found.");
        }
        if (status === 400) {
          toast.error(data.message || "Validation error occurred.");
          return rejectWithValue(data.message || "Validation error.");
        }
        toast.error(data.message || "An error occurred while updating the driver.");
        return rejectWithValue(data.message || "Server error occurred.");
      } else {
        toast.error("An unknown error occurred.");
        return rejectWithValue("Unknown error");
      }
    }
  }
);


// Function to get Driver detaisl by id
export const getDriverDetailsAction = createAsyncThunk( 'driver/getDetails', async (driverId, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${REACT_APP_BACKEND_API}/api/driver/${driverId}`,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data.message || 'An error occurred.');
    } else {
      return rejectWithValue('An unknown error occurred.');
    }
  }
}
);

// Async thunk to delete a driver
export const deleteDriverAction = createAsyncThunk(
  "driver/delete",
  async (driverId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(
        `${REACT_APP_BACKEND_API}/api/driver/${driverId}`,
        config
      );
      if (response.status === 200) {
        toast.success("Driver deleted successfully!");
        return response.data;
      }
    } catch (e) {
      if (e.response) {
        const { status, data } = e.response;
        if (status === 403) {
          toast.error("Access denied. You are not authorized.");
          return rejectWithValue(data.message || "Access denied.");
        }
        if (status === 404) {
          toast.error("Driver not found.");
          return rejectWithValue("Driver not found.");
        }
        toast.error(data.message || "An error occurred while deleting the driver.");
        return rejectWithValue(data.message || "Server error.");
      } else {
        toast.error("An unknown error occurred.");
        return rejectWithValue("Unknown error");
      }
    }
  }
);

// Function to fetch fuel details show in owner
// export const getFuelDetailsAction = createAsyncThunk(
//   "fuel/getFuelDetails",
//   async ({ page = 1, limit = 10, orderBy = "fillingDateTime", sortBy = "DESC", driverId, vehicleId }, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("authToken");
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         params: {
//           page,
//           limit,
//           orderBy,
//           sortBy,
//           driverId,
//           vehicleId,
//         },
//       };
//       const response = await axios.get(`${REACT_APP_BACKEND_API}/api/fuel-details`, config);
//       if (response.status === 200) {
//         return response.data;  // return fuel details data
//       }
//     } catch (e) {
//       if (e.response) {
//         const { status, data } = e.response;
//         if (status === 403) {
//           toast.error("Access denied. You are not authorized.");
//           return rejectWithValue(data.message || "Access denied.");
//         }
//         toast.error(data.message || "Error fetching fuel details.");
//         return rejectWithValue(data.message || "Error fetching fuel details.");
//       } else {
//         toast.error("An unknown error occurred.");
//         return rejectWithValue("Unknown error");
//       }
//     }
//   }
// );
export const getFuelDetailsAction = createAsyncThunk("fuel/getFuelDetails", async (params, { rejectWithValue }) => {
  const { page, limit, orderBy, sortBy, driverId, vehicleId } = params;
  try {
      const token = localStorage.getItem("authToken");
      if (!token) {
          throw new Error("No token found. Please log in.");
      }
      const config = {
          headers: {
              Authorization: `Bearer ${token}`,
          },
          params: {
              page,
              limit,
              orderBy,
              sortBy,
              driverId,
              vehicleId,
          },
      };
      const response = await axios.get(`${REACT_APP_BACKEND_API}/api/fuel/fuel-details`, config);
      if (response.status === 200) {
          return response.data;
      }
  } catch (error) {
      if (error.response) {
          const { status, data } = error.response;
          toast.error(data.message || "Error fetching fuel details.");
          return rejectWithValue(data.message || "Error fetching fuel details.");
      } else {
          toast.error("An unknown error occurred.");
          return rejectWithValue("Unknown error");
      }
  }
});


export const addFuel = createAsyncThunk("addFuel", async(data) => {
  try {
    const token = localStorage.getItem("authToken");
    const { fuelQuantity,fuelAmount,fillingDateTime } = data;
    const response = await axios.post(`${REACT_APP_BACKEND_API}/api/add-fuel`,{fuelQuantity,fuelAmount,fillingDateTime},{ headers:{ Authorization: `Bearer ${token}` } })
    if(response.status === 201){
      toast.success("Fuel entry added successfully!");
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.data) {
      toast.error(error.response.data.message || "An error occurred.");
    } else {
      toast.error("An error occurred.");
    }
  }
})

export const getFuelByDate = createAsyncThunk('getFuelByDate', async (date, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.post(
      `${REACT_APP_BACKEND_API}/api/fuel/by-date`,
      { date },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      toast.error(`Unexpected response status: ${response.status}`);
      return rejectWithValue('Unexpected response status');
    }
  } catch (error) {
    if (error.response && error.response.data) {
      toast.error(error.response.data.message || 'An error occurred.');
      return rejectWithValue(error.response.data.message || 'An error occurred.');
    } else {
      toast.error('An error occurred.');
      return rejectWithValue('An error occurred.');
    }
  }
});


export const getTotalFuelData = createAsyncThunk("getTotalFuelData", async() => {
  try {
    const token = localStorage.getItem('authToken');
    // const query  = {
    //   limit:50
    // }
    const response = await axios.get(`${REACT_APP_BACKEND_API}/api/fuel/all`,{ headers : { Authorization:`Bearer ${token}` }})
    if(response.status === 200) {
      return response.data;
    }
  } catch (error) {
     throw error
  }
})