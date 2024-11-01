import { configureStore } from "@reduxjs/toolkit";


import authReducer from "./slices/authSlice";
import productReducer from "./slices/productsSlice";
import userReducer from './slices/userSlice';
import schedulingReducer from './slices/schedulingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    scheduling: schedulingReducer,
    user: userReducer,
  },
});
