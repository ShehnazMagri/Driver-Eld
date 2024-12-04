import axios from "axios";
import { toast } from "react-toastify";
import { setVehicles, setVehicleDetails, setLoading, setError } from "../Slice/vehicleSlice";
import { getloginuserslice } from "../Slice/adminauthSlice";

const REACT_APP_BACKEND_API = process.env.REACT_APP_BACKEND_URL;


// Add Vehicle Function
export const addVehicleAction = (vehicleData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const addVehicleUrl = `${REACT_APP_BACKEND_API}/api/vichels/add`;
    const res = await axios.post(addVehicleUrl, vehicleData, config);
    if (res.status === 201) {
      toast.success(res.data.message);
      // dispatch(AllVehiclesAction()); 
      return { status: true, message: res.data.message };
    }
  } catch (e) {
    const errorMessage = e.response ? e.response.data.message : "An error occurred.";
    // dispatch(setError(e.response ? e.response.data.message : "An error occurred."));
    dispatch(setError(errorMessage));
    // toast.error(e.response ? e.response.data.message : "An error occurred.");
    toast.error(errorMessage);
    return { status: false, message: errorMessage };
  } finally {
    dispatch(setLoading(false));
  }
}


// Fetch Vehicles by Owner (userId)
export const getVehiclesByOwnerAction = (userId, page = 1, limit = 10, sortBy = 'createdAt', order = 'DESC') => async (dispatch) => {
  try {
    // console.log(userId,"userIduserIduserId");
    dispatch(setLoading(true));
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `${REACT_APP_BACKEND_API}/api/vichels/get/${userId}?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`;
    const res = await axios.get(url, config);
    if (res.status === 200) {
      dispatch(setVehicles({
        vehicles: res.data.vichels,
        pagination: {
          page: res.data.page,
          limit: res.data.limit,
          total: res.data.total,
          totalPages: res.data.totalPages,
        }
      }));
      return res.data
    }
  } catch (e) {
    const errorMessage = e.response ? e.response.data.message : "An error occurred.";
    dispatch(setError(errorMessage));
    // toast.error(errorMessage);
  } finally {
    dispatch(setLoading(false));
  }
};




// export const AllVehiclesAction = (page = 1, limit = 10, sortBy = 'createdAt', order = 'DESC') => async (dispatch) => {
//   try {
//     dispatch(setLoading(true));
//     const token = localStorage.getItem("authToken");
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     const getVehiclesUrl = `${REACT_APP_BACKEND_API}/api/vichels/all?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`;
//     const res = await axios.get(getVehiclesUrl, config);
//     if (res.status === 200) {
//       dispatch(setVehicles({
//         vehicles: res.data.vichels,
//         pagination: {
//           page: res.data.page,
//           limit: res.data.limit,
//           total: res.data.total,
//           totalPages: res.data.totalPages,
//         }
//       }));
//     }
//   } catch (e) {
//     dispatch(setError(e.response ? e.response.data.message : "An error occurred."));
//     // toast.error(e.response ? e.response.data.message : "An error occurred.");
//   } finally {
//     dispatch(setLoading(false));
//   }
// };


// Update Vehicle Function
export const updateVehicleAction = (id, vehicleData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const updateVehicleUrl = `${REACT_APP_BACKEND_API}/api/vichels/update/${id}`;
    const res = await axios.put(updateVehicleUrl, vehicleData, config);
    if (res.status === 200) {
      toast.success(res.data.message);
      // dispatch(AllVehiclesAction());
    }
  } catch (e) {
    dispatch(setError(e.response ? e.response.data.message : "An error occurred."));
    toast.error(e.response ? e.response.data.message : "An error occurred.");
  } finally {
    dispatch(setLoading(false));
  }
};


// Fetch Vehicle Details by ID for update details
export const getVehicleDetailsAction = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `${REACT_APP_BACKEND_API}/api/vichels/view/${id}`;
    const response = await axios.get(url, config);

    if (response.status === 200) {
      dispatch(setVehicleDetails(response.data.vichel));
      return response.data; // Ensure to return the data
    }
  } catch (e) {
    const errorMessage = e.response ? e.response.data.message : 'An error occurred.';
    dispatch(setError(errorMessage));
    toast.error(errorMessage);
  } finally {
    dispatch(setLoading(false));
  }
};


// Delete Vehicle Function
export const deleteVehicleAction = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const deleteVehicleUrl = `${REACT_APP_BACKEND_API}/api/vichels/delete/${id}`;
    const res = await axios.delete(deleteVehicleUrl, { data: { id }, ...config });

    // Check the response status and show appropriate messages
    if (res.status === 200) {
      toast.success(res.data.message);
      dispatch(deleteVehicleAction()); // Refresh the vehicle list
    } else {
      toast.error('Unexpected response status');
    }
  } catch (e) {
    // Handle errors based on response status or fallback
    const errorMessage = e.response ? e.response.data.message : 'An error occurred.';
    dispatch(setError(errorMessage));
    toast.error(errorMessage);
  } finally {
    dispatch(setLoading(false));
  }
};


// Assign Vehicle to Driver Action
// export const assignVehicleToDriverAction = (driverId, vehicleId, taskId) => async (dispatch) => {
//   try {
//     dispatch(setLoading(true));
//     const token = localStorage.getItem("authToken");
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     const data = {
//       driverId,
//       vehicleId,
//       taskId,
//     };
//     const res = await axios.post(`${REACT_APP_BACKEND_API}/api/vichel/assigned`, data, config);
//     console.log('ssign response',res)
//     if (res.status === 200) {
//       toast.success(res.data.message);
//       return { status: true, message: res.data.message }; 
//     }
//   } catch (error) {
//     const errorMessage = error.response ? error.response.data.message : "An error occurred.";
//     dispatch(setError(errorMessage));
//     toast.error(errorMessage); 
//     return { status: false, message: errorMessage }; 
//   } finally {
//     dispatch(setLoading(false)); 
//   }
// };
export const assignVehicleToDriverAction = ({ driverId, vehicleId, taskId }) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const data = {
      driverId,
      vehicleId,
      taskId,
    };
    const res = await axios.post(`${REACT_APP_BACKEND_API}/api/vichel/assigned`, data, config);
    if (res.status === 200) {
      toast.success(res.data.message);
      return { status: true, message: res.data.message };
    }
  } catch (error) {
    console.error("Error details:", error); // Log full error details
    const errorMessage = error.response ? error.response.data.message : "An error occurred.";
    dispatch(setError(errorMessage));
    toast.error(errorMessage);
    return { status: false, message: errorMessage };
  } finally {
    dispatch(setLoading(false));
  }
};





// update userprofile api
// export const updateuservehicleAction = (formData, id) => async () => {
//   try {
//     const token = localStorage.getItem("authToken");
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     const updateUser_url = `${REACT_APP_BACKEND_API}/api/user/${id}`;
//     const res = await axios.put(updateUser_url, formData, config);
//     if (res.status === 200) {
//       toast.success(res.data.message);
//       // navigate("/admin/allusers")
//     }
//   } catch (e) {
//     if (e?.response?.data.error) {
//       toast.error(e.response.data.error);
//     }
//   }
// };

export const updateuservehicleAction = (formData, id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
    };
    const updateUser_url = `${REACT_APP_BACKEND_API}/api/user/${id}`;
    // console.log("FormData being sent:", formData);
    const res = await axios.put(updateUser_url, formData, config);
    // console.log("Response from the server:", res);
    if (res.status === 200) {
      toast.success(res.data.message);
      // Update user data in Redux store if needed
      dispatch({ 
        type: 'UPDATE_USER_SUCCESS', 
        payload: res.data.user 
      });
      return res.data;
    }
  } catch (e) {
    console.error("Error updating user:", e);
    if (e?.response?.data?.message) {
      toast.error(e.response.data.message); 
    } else {
      toast.error("An error occurred while updating the user.");
    }
    throw e;
  }
};
// export const updateuservehicleAction = (formData, id, existingUserData) => async () => {
//   try {
//     const token = localStorage.getItem("authToken");
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     // Prepare updated fields only
//     const updatedData = {};
//     for (const key in formData) {
//       if (formData[key] !== existingUserData[key]) {
//         updatedData[key] = formData[key];
//       }
//     }
//     // Proceed only if there's something to update
//     if (Object.keys(updatedData).length === 0) {
//       throw new Error("No fields have been updated.");
//     }
//     const updateUser_url = `${REACT_APP_BACKEND_API}/api/user/${id}`;
//     const res = await axios.put(updateUser_url, updatedData, config);
//     console.log("updater user reponse", res);
//     if (res.status === 200) {
//       toast.success(res.data.message);
//     }
//   } catch (e) {
//     // Handle error based on backend response
//     if (e?.response?.data?.message) {
//       toast.error(e.response.data.message);
//     } else {
//       toast.error("An error occurred while updating the user.");
//     }
//   }
// };


// create task by owner api 
export const createTask = (data) => async (dispatch) => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const createTask_url = `${REACT_APP_BACKEND_API}/api/create/task-by-owner`;
    const res = await axios.post(createTask_url, data, config);
    if (res.status === 201) {
      toast.success(res.data.message);
      return res.data
    }
  } catch (e) {
    if (e?.response?.data.error) {
      toast.error(e.response.data.error);
    }
  }
}

// get tasks by owner id
export const getTaskByOwnerId = (ownerId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // const getTask_url = `${REACT_APP_BACKEND_API}/api/tasks/owner/${ownerId}`;
    const getTask_url = `${REACT_APP_BACKEND_API}/api/tasks/owner/${id}`;
    const res = await axios.get(getTask_url, config);
    if (res.status === 200) {
      return res.data
    }
  } catch (error) {
    if (error?.response?.data.error) {
      toast.error(error.response.data.error);
    }
  }
}

// SHOW subscription plains
export const getPlans = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("authToken"); // Get auth token from local storage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
      },
    };

    const getPlansUrl = `${REACT_APP_BACKEND_API}/api/get-plan`; // Adjust the URL to match your endpoint
    const res = await axios.get(getPlansUrl, config);
    if (res.status === 200) {
      return res.data.plans;
    }
  } catch (error) {
    // Display an error message using toast if there’s an error
    if (error?.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Error fetching plans");
    }
  }
};

//  Action to create a checkout session
export const createCheckoutSession = (numberOfUsers, price, planType) => async (dispatch) => {
  debugger
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    const body = {
      numberOfUsers,
      price,
      planType,
    };
    const createCheckoutUrl = `${REACT_APP_BACKEND_API}/api/create-checkout-session`; // Adjust this URL if needed
    const res = await axios.post(createCheckoutUrl, body, config);
    console.log(res)
    if (res.status === 200) {
      // Redirect user to the Stripe checkout URL
      window.location.href = res.data.url;
    }
  } catch (error) {
    // Display an error message using toast if there’s an error
    if (error?.response?.data?.error) {
      toast.error(error.response.data.error);
    } else {
      toast.error("Error creating checkout session");
    }
  }
};