import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify"; // Ensure you import toast if you're using it

const REACT_APP_BACKEND_API = process.env.REACT_APP_BACKEND_URL;

export const deleteDataAction = createAsyncThunk(
    "deletedata/delete",
    async ({ id, modelName }, { rejectWithValue }) => {

        const formData = {
            status: "deleted"
        }

       
        try {
            // Debugging messages
            const token = localStorage.getItem("authToken");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.put(
                `${REACT_APP_BACKEND_API}/api/update/status/${modelName}/${id}`,
                formData,
                config
            );

            if (response.status === 200) {
                toast.success("Data deleted successfully!");
                return response.data; // Return the response data
            }
        } catch (e) {
            if (e.response) {
                const { status, data } = e.response;
                if (status === 403) {
                    toast.error("Access denied. You are not authorized.");
                    return rejectWithValue(data.message || "Access denied.");
                }
                if (status === 404) {
                    console.log("eerrrrr",e)
                    toast.error("Data not found.");
                    return rejectWithValue("Data not found.");
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
