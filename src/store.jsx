import { configureStore } from "@reduxjs/toolkit";


import authReducer from "./slices/authSlice";
import productReducer from "./slices/productsSlice";
import userReducer from './slices/userSlice';
import schedulingReducer from './slices/schedulingSlice';
import dayOffReducer from './slices/dayOffSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    scheduling: schedulingReducer,
    user: userReducer,
    dayOff: dayOffReducer,
  },
});
