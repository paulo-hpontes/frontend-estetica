import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import paymentService from "../services/paymentService";

const initialState = {
  payments: [],
  error: false,
  success: false,
  loading: false,
  message: null,
};

export const getAllPayment = createAsyncThunk(
  "payment/getAll",
  async (_, thunkAPI) => {
    const data = await paymentService.getAllPayment();
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  }
);

export const deletePayment = createAsyncThunk(
  "payment/delete",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await paymentService.deletePayment(id, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const updatePayment = createAsyncThunk(
  "payment/update",
  async (paymentData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await paymentService.updatePayment(
      paymentData.paymentStatus,
      paymentData.id,
      token
    );

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    resetPayment: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPayment.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(getAllPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.payments = action.payload;
      })
      .addCase(getAllPayment.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload.message;
      })
      .addCase(deletePayment.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(deletePayment.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = false;
      })
      .addCase(deletePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.success = false;
        state.message = action.payload.message;
      })
      .addCase(updatePayment.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(updatePayment.fulfilled, (state,action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.payment = action.payload;
      })
      .addCase(updatePayment.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload.message;
      });
  },
});

export const { resetPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
