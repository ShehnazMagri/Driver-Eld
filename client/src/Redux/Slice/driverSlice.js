import { createSlice } from "@reduxjs/toolkit";
import checkIn, { addFuel, getDriversTaskByDate, getFuelDetailsAction, updateDriverAction } from "../Action/driver";
import { getDriversByOwnerAction } from "../Action/driver"; // Import the new action
import { getDriverDetailsAction } from "../Action/driver";

const extra = (builder) => {
  const { pending: checkInPending, fulfilled: checkInFulfilled, rejected: checkInRejected } = checkIn;
  const { pending: getDriversPending, fulfilled: getDriversFulfilled, rejected: getDriversRejected } = getDriversByOwnerAction;
  const {pending: getDriversTaskPending, fulfilled: getDriversTaskFulfilled, rejected: getDriversTaskRejected} = getDriversTaskByDate
  const {pending: addFuelPending, fulfilled: addFuelFulfilled, rejected: addFuelRejected} = addFuel;
  builder
    .addCase(checkInPending, (state, action) => {
      state.loading = true;
    })
    .addCase(checkInFulfilled, (state, action) => {
      state.driver.push(action.payload.data);
      state.loading = false;
    })
    .addCase(checkInRejected, (state, action) => {
      state.loading = false;
      // Optionally handle the error state
    })

    //get driver task by date
    .addCase(getDriversTaskPending, (state, action) => {
      state.loading = true;
    })
    .addCase(getDriversTaskFulfilled, (state, action) => {
      state.currentDateTask.push(action.payload.drivers);
      state.loading = false;
    })
    .addCase(getDriversTaskRejected, (state, action) => {
      state.loading = false;
      // Optionally handle the error state
    })
    .addCase(getDriversByOwnerAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDriversByOwnerAction.fulfilled, (state, action) => {
        state.drivers = action.payload.drivers || []; 
        state.loading = false;
      })
      .addCase(getDriversByOwnerAction.rejected, (state, action) => {
        console.log('teeeeerrrr',action.payload)
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(updateDriverAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateDriverAction.fulfilled, (state, action) => {
        state.loading = false;
        state.driver = action.payload.driver;
        state.success = true;
        state.error = null;
      })
      .addCase(updateDriverAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getDriverDetailsAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDriverDetailsAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.driverDetails = action.payload.driver;
      })
      .addCase(getDriverDetailsAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addFuelPending, (state, action) => {
        state.loading = true;
      })
      .addCase(addFuelFulfilled, (state, action) => {
        state.fuelDetails.push(action.payload.fuelEntry);
        state.loading = false;
      })
      .addCase(addFuelRejected, (state, action) => {
        state.loading = false;
      })  .addCase(getFuelDetailsAction.pending, (state) => {
        state.loading = true;
    })
    .addCase(getFuelDetailsAction.fulfilled, (state, action) => {
        state.fuelDetails = action.payload.fuelData;
        state.loading = false;
    })
    .addCase(getFuelDetailsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    });
};

const driverSlice = createSlice({
  name: 'driver',
  initialState: {
    drivers: [], // Use `drivers` to store the list of drivers
    driver: [], // Keep the existing `driver` state if needed
    currentDateTask:[],
    fuelDetails:[],
    loading: false,
    error: null,
  },
  reducers: {
    checkIn, 
  },
  extraReducers: extra,
});

export default driverSlice.reducer;
