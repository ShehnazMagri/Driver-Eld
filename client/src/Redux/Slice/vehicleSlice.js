import { createSlice } from "@reduxjs/toolkit";

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState: {
    vehicles: [],
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    },
    loading: false, 
    error: null, 
  },
  reducers: {
    setVehicles: (state, action) => {
      state.vehicles = action.payload.vehicles;
      state.pagination = action.payload.pagination;
    },
    setVehicleDetails: (state, action) => {
      state.vehicleDetails = action.payload;
    },
    deleteVehicle: (state, action) => {
      state.vehicles = state.vehicles.filter(vehicle => vehicle.id !== action.payload);
    },
    detailsVehicles: (state, action) => {
      state.vehicleDetails = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload; 
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const vehicleReducer = vehicleSlice.reducer;

export const { setVehicles,setVehicleDetails, detailsVehicles, deleteVehicle, setLoading, setError } = vehicleSlice.actions;
