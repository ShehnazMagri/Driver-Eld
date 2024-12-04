import axios from "axios";
import { toast } from "react-toastify";
import {
  alluserslice,
  userbyIdslice,
  getloginuserslice,
  allvichelsslice,
  VichelsBy_idbyIdslice,
  alldriver_byadminslice,
  getdriver_byadminIdslice,
  getallplanlist_slice,
  getallterminallist_slice,
  getterminal_idslice,
  gettrailers_urllist_slice,
  gettrailers_idslice,
  getTrailerByOwnerRequest,
  Voilationsslice,
  getaupdateterminallist_slice,
  alldatbyowner_adminSlice,
} from "../Slice/adminauthSlice";
// const REACT_APP_BACKEND_API = "http://localhost:5000";

const REACT_APP_BACKEND_API = process.env.REACT_APP_BACKEND_URL;

// Functiom to Register owner
export const RegisterAction = (formData, navigate) => async () => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const signupurl = `${REACT_APP_BACKEND_API}/api/auth/register`;
    const res = await axios.post(signupurl, formData, config);
    if (res.status === 201) {
      toast.success("Register Successfully!");
      navigate("/login");
    }
  } catch (e) {
    if (e.response) {
      toast.error(e.response.data.error);
    } else {
      toast.error("An error occurred.");
    }
  }
};

// Login Api Function
export const LoginAction = (formData) => async () => {
  try {
    const loginurl = `${REACT_APP_BACKEND_API}/api/auth/login`;
    const res = await axios.post(loginurl, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 201) {
      // toast.success("Login successful!");
    }
    localStorage.setItem("authToken", res.data.token);
    // localStorage.setItem("userId", res.data.userId);
    return res;
  } catch (e) {
    if (e.response) {
      toast.error(e.response.data.error);
    } else {
      toast.error("An error occurred.");
    }
  }
};

// Function To Forget Password
export const ForgotPasswordAction = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // const forgotPasswordUrl = `${REACT_APP_BACKEND_API}/api/auth/forgot-password`;
    const forgotPasswordUrl = `${REACT_APP_BACKEND_API}/api/auth/forget-password`;
    const res = await axios.post(forgotPasswordUrl, formData, config);

    if (res.status === 200) {
      toast.success(res.data.message);
      return res;
    }
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message || "An error occurred");
    } else {
      toast.error("An error occurred while processing your request.");
    }
  }
};

// Function To Reset Password
export const ResetPasswordAction = (token, password) => async (dispatch) => {
  try {
    // Define the API endpoint
    // const resetPasswordUrl = `${process.env.REACT_APP_BACKEND_API}/api/auth/reset-password`;
    const resetPasswordUrl = `${REACT_APP_BACKEND_API}/api/auth/reset-password`;

    // Make the API call with the token and new password
    const res = await axios.post(
      resetPasswordUrl,
      { token, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status === 200) {
      toast.success(
        res.data.message || "Password has been reset successfully."
      );
      return res.data; // Return success response
    }
  } catch (e) {
    if (e.response) {
      // Show the error message from the server
      toast.error(
        e.response.data.message ||
          "An error occurred while resetting the password."
      );
    } else {
      toast.error("An unexpected error occurred.");
    }
    return null; // Return null in case of error
  }
};

export const allusersAction = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const getAllUsersurl = `${REACT_APP_BACKEND_API}/api/users`;
    const res = await axios.get(getAllUsersurl, config, "");
    await dispatch(alluserslice(res));
  } catch (e) {
    if (e) {
      // swal("error", e.response.data.message, "error");
    }
  }
};

export const deleteuserAction = (id) => async () => {
  try {
    const token = localStorage.getItem("authToken");
    // Debug token retrieval
    if (!token) {
      console.error("No auth token found in localStorage");
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const deleteUser_url = `${REACT_APP_BACKEND_API}/api/user/${id}`;
    const res = await axios.delete(deleteUser_url, config);
    if (res.status === 200) {
      toast.success(res.data.message);
      navigate("/admin/allusers");
    }
  } catch (e) {
    console.error("Error during delete:", e);
    if (e?.response?.data?.error) {
      toast.error(e.response.data.error);
    }
  }
};

export const updateuserAction = (data, id, navigate) => async () => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const updateUser_url = `${REACT_APP_BACKEND_API}/api/user/${id}`;
    const res = await axios.put(updateUser_url, data, config);
    if (res.status === 200) {
      toast.success(res.data.message);
      navigate("/admin/allusers");
    }
  } catch (e) {
    if (e?.response?.data.error) {
      toast.error(e.response.data.error);
    }
  }
};

export const getuserByIdAction = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const getuserby_id_url = `${REACT_APP_BACKEND_API}/api/user/view/${id}`;
    const res = await axios.get(getuserby_id_url, config);
    await dispatch(userbyIdslice(res));
  } catch (e) {
    if (e) {
      console.log(e);
      // swal("error", e.response.data.message, "error");
    }
  }
};

export const getloginuserAction = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const getloginuserurl = `${REACT_APP_BACKEND_API}/api/loginuser`;
    const res = await axios.get(getloginuserurl, config);
    await dispatch(getloginuserslice(res.data));
    return res
  } catch (e) {
    if (e) {
      console.error("Error fetching login user:", e.response.data.message);
      // swal("error", e.response.data.message, "error");
    }
  }
};

export const alldriverAction = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const getalldriverurl = `${REACT_APP_BACKEND_API}/api/driver/all`;
    const res = await axios.get(getalldriverurl, config, "");
    await dispatch(alldriverslice(res));
  } catch (e) {
    if (e) {
      // swal("error", e.response.data.message, "error");
    }
  }
};

export const addVehicleByAdminAction = (newFormData, navigate) => async () => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Authorization header
      },
    };
    const addVehicleby_adminUrl = `${REACT_APP_BACKEND_API}/api/vichels/add`;
    const res = await axios.post(addVehicleby_adminUrl, newFormData, config);
    if (res.status === 201) {
      toast.success(res.data.message);
      navigate("/admin/all-vehicle");
    }
  } catch (e) {
    if (e.response) {
      toast.error(e.response.data.message);
    } else {
      toast.error("An error occurred.");
    }
  }
};

export const allvichelsAction = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const getallvichelsurl = `${REACT_APP_BACKEND_API}/api/vichels/all`;
    const res = await axios.get(getallvichelsurl, config, "");
    await dispatch(allvichelsslice(res));
  } catch (e) {
    if (e) {
    }
  }
};

export const deleteVichelsAction = (id) => async () => {
  try {
    const token = localStorage.getItem("authToken");
    // Debug token retrieval
    if (!token) {
      console.error("No auth token found in localStorage");
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const deleteUser_url = `${REACT_APP_BACKEND_API}/api/vichels/delete/${id}`;
    const res = await axios.delete(deleteUser_url, config);
    if (res.status === 200) {
      toast.success(res.data.message);
      // navigate("/admin/allusers");
    }
  } catch (e) {
    console.error("Error during delete:", e);
    if (e?.response?.data?.error) {
      toast.error(e.response.data.error);
    }
  }
};

export const getVichelsByIdAction = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const getvichelsby_id_url = `${REACT_APP_BACKEND_API}/api/vichels/view/${id}`;
    const res = await axios.get(getvichelsby_id_url, config);
    await dispatch(VichelsBy_idbyIdslice(res));
  } catch (e) {
    if (e) {
      console.log(e);
      // swal("error", e.response.data.message, "error");
    }
  }
};

export const updateVehicleBy_idAction = (formData, id) => async () => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    const updatevehicleby_admin_url = `${REACT_APP_BACKEND_API}/api/vichels/update/${id}`;
    const res = await axios.put(updatevehicleby_admin_url, formData, config);
    if (res.status === 200) {
      toast.success(res.data.message || "User updated successfully");
    }
  } catch (e) {
    // Handle errors
    if (e.response && e.response.data) {
      toast.error(e.response.data.message || "An error occurred");
    } else {
      toast.error("An error occurred");
    }
    console.error("Update user error:", e);
  }
};

// export const addDriverByAdminAction = (newFormData) => async () => {
//   debugger
//   try {
//     const token = localStorage.getItem("authToken");
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`, // Authorization header
//       },
//     };
//     const addVehicleby_adminUrl = `${REACT_APP_BACKEND_API}/api/driver/add`;
//     const res = await axios.post(addVehicleby_adminUrl, newFormData, config);
//     // console.log(res, "resresresresresresresresresresresresresres")
//     if (res.status === 201) {
//       toast.success(res.data.message);
//     }
//   } catch (e) {
//     if (e.response) {
//       toast.error(e.response.data.message
//       );
//     } else {
//       toast.error("An error occurred.");
//     }
//   }
// };
export const addDriverByAdminAction = (newFormData) => async () => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Authorization header
      },
    };
    const addDriverUrl = `${REACT_APP_BACKEND_API}/api/driver/add`;
    const res = await axios.post(addDriverUrl, newFormData, config);

    if (res.status === 201) {
      return res.data; // Return response data for further handling
    }
  } catch (e) {
    if (e.response) {
      throw new Error(e.response.data.message); // Throw an error to catch in the component
    } else {
      throw new Error("An error occurred.");
    }
  }
};

export const alldriverby_adminAction = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const getalldriverby_adminsurl = `${REACT_APP_BACKEND_API}/api/driver/all`;
    const res = await axios.get(getalldriverby_adminsurl, config, "");
    await dispatch(alldriver_byadminslice(res));
  } catch (e) {
    if (e) {
    }
  }
};

export const deletedriver_byadminAction = (id) => async () => {
  try {
    const token = localStorage.getItem("authToken");
    // Debug token retrieval
    if (!token) {
      console.error("No auth token found in localStorage");
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const deletedriverby_admin_url = `${REACT_APP_BACKEND_API}/api/driver/${id}`;
    const res = await axios.delete(deletedriverby_admin_url, config);
    if (res.status === 200) {
      toast.success(res.data.message);
      // navigate("/admin/allusers");
    }
  } catch (e) {
    console.error("Error during delete:", e);
    if (e?.response?.data?.error) {
      toast.error(e.response.data.error);
    }
  }
};

export const getdriverby_adminIdAction = (driverId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const getdriverby_adminby_id_url = `${REACT_APP_BACKEND_API}/api/driver/${driverId}`;
    const res = await axios.get(getdriverby_adminby_id_url, config);
    await dispatch(getdriver_byadminIdslice(res));
  } catch (e) {
    if (e) {
      console.log(e);
      // swal("error", e.response.data.message, "error");
    }
  }
};

export const updateDriverby_adminBy_idAction = (formData, id) => async () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Authorization token not found");
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json", // Assuming the backend expects JSON
        Authorization: `Bearer ${token}`,
      },
    };

    const updatevehicleby_admin_url = `${REACT_APP_BACKEND_API}/api/driver/${id}`;
    const res = await axios.put(updatevehicleby_admin_url, formData, config);

    if (res.status === 200) {
      toast.success(res.data.message || "User updated successfully");
    }
  } catch (e) {
    // Handle errors
    if (e.response && e.response.data) {
      toast.error(e.response.data.message || "An error occurred");
    } else {
      toast.error("An error occurred");
    }
    console.error("Update user error:", e);
  }
};

// GetAll Table Dat Based On Model
export const getAllDataByOwnerAction = (modelName) => async (dispatch) => {
  try {
    const token = localStorage.getItem("authToken"); // Get the token from localStorage
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
    };
    // Send the modelName as a query parameter
    const getAllDataUrl = `${REACT_APP_BACKEND_API}/api/get/allrecord`;
    const params = { modelName }; 
    const res = await axios.get(getAllDataUrl, {
      params,
      headers: config.headers,
    });
    // dispatch(alldatbyowner_adminSlice(res.data));
    dispatch({
      type: 'user/alldatbyowner_adminSlice', // Action type
      payload: res.data, // Dispatch the API response data
    });
    return res
  } catch (e) {
    console.error(e);
    // swal("error", e.response?.data?.message || 'Something went wrong', "error");
  }
};


export const CreatePlanAction = (newFormData, navigate) => async () => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const CreatePlan_Url = `${REACT_APP_BACKEND_API}/api/create-plan`;
    const res = await axios.post(CreatePlan_Url, newFormData, config);
    onsole.log("Response from backend:", res);
    if (res.status === 201) {
      toast.success(res.data.message);
      navigate("/admin/plan-list");
    }
  } catch (e) {
    if (e.response) {
      toast.error(e.response.data.message);
    } else {
      toast.error("An error occurred.");
    }
  }
};

export const getallplanlist_Action = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const getallplanlist_url = `${REACT_APP_BACKEND_API}/api/get-plan`;
    const res = await axios.get(getallplanlist_url, config, "");
    await dispatch(getallplanlist_slice(res));
  } catch (e) {
    if (e) {
    }
  }
};

export const TerminalAction = (newTerminalData, navigate) => async () => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const terminal_Url = `${REACT_APP_BACKEND_API}/api/terminal`;
    const res = await axios.post(terminal_Url, newTerminalData, config);
    if (res.status === 201) {
      toast.success(res.data.message);
      navigate("/admin/all-terminal");
    }
  } catch (e) {
    if (e.response) {
      toast.error(e.response.data.message);
    } else {
      toast.error("An error occurred.");
    }
  }
};

export const getallterminallistActionByOwner =
  (ownerId, page = 1, limit = 10, sortBy = "firstName", order = "ASC") =>
  async (dispatch) => {
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      // Construct the URL with ownerId parameter
      const getallterminallist_url = `${REACT_APP_BACKEND_API}/api/terminal/get/${ownerId}?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`;
      // Call the API to get the terminal list
      const res = await axios.get(getallterminallist_url, config);
      // return res.data
      // Dispatch the action with the retrieved data
      await dispatch(getallterminallist_slice(res.data));
      return res.data;
    } catch (e) {
      if (e.response) {
        console.error("Error fetching terminals:", e.response.data.message);
      } else {
        console.error("An unexpected error occurred:", e.message);
      }
    }
  };

export const updateterminalAction = (formData, id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json", // Change to JSON
        Authorization: `Bearer ${token}`,
      },
    };
    const updateterminal_url = `${REACT_APP_BACKEND_API}/api/terminal/${id}`;
    // Ensure formData is JSON if you're sending plain data
    const res = await axios.put(updateterminal_url, formData, config);
    if (res.status === 200) {
      toast.success(res.data.message || "Terminal updated successfully");
      // Dispatch action to update terminal in Redux state
      dispatch({
        type: "UPDATE_TERMINAL_SUCCESS",
        payload: res.data.terminal, // Use the updated terminal data
      });
    }
  } catch (e) {
    // Handle errors
    if (e.response && e.response.data) {
      toast.error(e.response.data.message || "An error occurred");
    } else {
      toast.error("An error occurred");
    }
    console.error("Update terminal error:", e);
  }
};

export const getterminal_IdAction = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const getterminal_url = `${REACT_APP_BACKEND_API}/api/terminal/${id}`;
    const res = await axios.get(getterminal_url, config);
    await dispatch(getterminal_idslice(res.data.terminal));
  } catch (e) {
    if (e) {
      console.log(e);
      // swal("error", e.response.data.message, "error");
    }
  }
};

export const deleteterminalAction = (id) => async () => {
  try {
    const token = localStorage.getItem("authToken");
    // Debug token retrieval
    if (!token) {
      console.error("No auth token found in localStorage");
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const deletedterminal_url = `${REACT_APP_BACKEND_API}/api/terminal/${id}`;
    const res = await axios.delete(deletedterminal_url, config);
    if (res.status === 200) {
      toast.success(res.data.message);
    }
  } catch (e) {
    console.error("Error during delete:", e);
    if (e?.response?.data?.error) {
      toast.error(e.response.data.error);
    }
  }
};

// Fnction for Trailers
export const TrailersAction = (newTrailerData) => async () => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Authorization header
      },
    };
    const addtrailers = `${REACT_APP_BACKEND_API}/api/trailers/add`;
    const res = await axios.post(addtrailers, newTrailerData, config);
    if (res.status === 201) {
      toast.success(res.data.message);
    }
  } catch (e) {
    if (e.response) {
      toast.error(e.response.data.message);
    } else {
      toast.error("An error occurred.");
    }
  }
};

export const getTrailersAction = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const gettrailers_url = `${REACT_APP_BACKEND_API}/api/trailers/getall`;
    const res = await axios.get(gettrailers_url, config, "");
    await dispatch(gettrailers_urllist_slice(res));
  } catch (e) {
    if (e) {
    }
  }
};

export const gettrailers_IdAction = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const gettrailer_url = `${REACT_APP_BACKEND_API}/api/trailers/${id}`;
    const res = await axios.get(gettrailer_url, config);
    await dispatch(gettrailers_idslice(res));
  } catch (e) {
    if (e) {
      console.log(e);
      // swal("error", e.response.data.message, "error");
    }
  }
};

// Action to get trailers by owner ID

export const getTrailersByOwnerAction =
  (ownerId, page = 1, limit = 10, sortBy = "firstName", order = "ASC") =>
  async (dispatch) => {
    // debugger
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const getTrailersByOwnerUrl = `${REACT_APP_BACKEND_API}/api/trailers/get/${ownerId}?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`;

      const res = await axios.get(getTrailersByOwnerUrl, config);

      // Dispatch the trailers to the redux store
      return dispatch(gettrailers_urllist_slice(res.data));
    } catch (error) {
      console.error("Error fetching trailers by owner:", error);
      // You can handle errors here, such as displaying a message
    }
  };

export const getTrailerByOwnerAction =
  (page = 1, limit = 10) =>
  async (dispatch) => {
    try {
      // Start loading

      // Retrieve the auth token from localStorage
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No auth token found");
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const getTrailersByOwnerUrl = `${REACT_APP_BACKEND_API}/api/trailers/get?page=${page}&limit=${limit}`;

      console.log("getTrailersByOwnerUrl", getTrailersByOwnerUrl);

      // Fetch data from API
      const { data } = await axios.get(getTrailersByOwnerUrl, config);

      console.log("data", data);

      dispatch(getTrailerByOwnerSuccess(data)); // Dispatch success action
    } catch (e) {
      console.error("Error fetching trailers by owner:", e);

      // Dispatch error action and show error message
      const errorMessage =
        e.response?.data?.message || "Error fetching trailers";
      dispatch(getTrailerByOwnerFail(errorMessage));
      toast.error(errorMessage);
    }
  };

export const updatetrailersAction = (updatedTrailers, id) => async () => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    const updatetrailers_url = `${REACT_APP_BACKEND_API}/api/trailers/update/${id}`;
    const res = await axios.put(updatetrailers_url, updatedTrailers, config);
    console.log(res, "resresres");

    // Check for the 'status' field in response data instead of res.status
    if (res.data.status) {
      toast.success(res.data.message);
    } else {
      toast.warn(res.data.message || "No changes were made to the trailer.");
    }
  } catch (e) {
    if (e.response && e.response.data) {
      toast.error(e.response.data.message || "An error occurred");
    } else {
      toast.error("An error occurred");
    }
    console.error("Update trailer error:", e);
  }
};

// export const updatetrailersAction = (updatedTrailers, id) => async () => {
//   try {
//     const token = localStorage.getItem("authToken");
//     const config = {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     const updatetrailers_url = `${REACT_APP_BACKEND_API}/api/trailers/update/${id}`;
//     const res = await axios.put(updatetrailers_url, updatedTrailers, config);
//     if (res.status === 200) {
//       toast.success(res.data.message || "User updated successfully");
//     }
//   } catch (e) {
//     // Handle errors
//     if (e.response && e.response.data) {
//       toast.error(e.response.data.message || "An error occurred");
//     } else {
//       toast.error("An error occurred");
//     }
//     console.error("Update user error:", e);
//   }
// }

export const deletetrailersAction = (id) => async () => {
  try {
    const token = localStorage.getItem("authToken");
    // Debug token retrieval
    if (!token) {
      console.error("No auth token found in localStorage");
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const deletedtrailers_url = `${REACT_APP_BACKEND_API}/api/trailers/delete/${id}`;
    const res = await axios.delete(deletedtrailers_url, config);
    if (res.status === 200) {
      toast.success(res.data.message);
    }
  } catch (e) {
    console.error("Error during delete:", e);
    if (e?.response?.data?.error) {
      toast.error(e.response.data.error);
    }
  }
};

export const getViolationsByOwnerAction =
  (ownerId, page = 1, limit = 10, sortBy = "createdAt", order = "DESC") =>
  async (dispatch) => {
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const getViolationsByOwnerUrl = `${REACT_APP_BACKEND_API}/api/violations/${ownerId}?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`;
      const res = await axios.get(getViolationsByOwnerUrl, config);
      // Dispatch the violations to the Redux store
      // return dispatch(Voilationsslice(res.data));
      return dispatch({
        type: "Voilationsslice",
        payload: res.data, // directly pass the response data
      });
    } catch (error) {
      // console.error("Error fetching violations by owner:", error);
      if (error.response && error.response.status === 404) {
        // If 404, dispatch empty violations array
        return dispatch({
          type: "Voilationsslice",
          payload: { violations: [] }, // Send empty array on 404
        });
      } else {
        console.error("Error fetching violations by owner:", error);
        // Handle other errors here
      }
    }
  };

  export const assignDriverToVehicle = (data) => async (dispatch) => {
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.post(`${REACT_APP_BACKEND_API}/api/vichel/assigned`, data, config);
      if (res.status === 200) {
        toast.success(res.data.message);
        return { status: true, message: res.data.message };
      }
    } catch (error) {
      console.error("Error details:", error); // Log full error details
      const errorMessage = error.response ? error.response.data.message : "An error occurred.";
      toast.error(errorMessage);
      return { status: false, message: errorMessage };
    } finally {
    }
  };
