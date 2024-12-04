import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./Slice/adminauthSlice";
import { vehicleReducer } from "./Slice/vehicleSlice";
import  driverSlice  from "./Slice/driverSlice";
const reducer = combineReducers({
  login: authReducer,
  vehicle: vehicleReducer,
  driver: driverSlice,
});

const store = configureStore({
  reducer,
});

export default store;