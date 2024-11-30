import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import paymentService from "../services/paymentService";

const initialState = {
  payments: [],
  link: null,
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

export const generatePaymentLink = createAsyncThunk(
  "payment/post",
  async(paymentData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await paymentService.paymentLink(paymentData, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
)

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
      .addCase(generatePaymentLink.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(generatePaymentLink.fulfilled, (state,action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.link = action.payload;
      })
      .addCase(generatePaymentLink.rejected, (state, action) => {
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
      });
  },
});

export const { resetPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
