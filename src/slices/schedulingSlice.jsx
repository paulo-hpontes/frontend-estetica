import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import schedulingService from "../services/schedulingService";

const initialState = {
  schedulings: [],
  scheduling: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

export const newScheduling = createAsyncThunk(
  "scheduling/post",
  async (scheduling, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await schedulingService.newScheduling(scheduling, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  }
);

export const getAllScheduling = createAsyncThunk(
    "scheduling/getall",
    async (_, thunkAPI) => {
      const data = await schedulingService.getAllScheduling();
      if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0]);
      }
      return data;
    }
  );

export const schedulingSlice = createSlice({
  name: "scheduling",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(newScheduling.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(newScheduling.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.scheduling = action.payload.data;
        state.schedulings.push(state.scheduling);
        state.message = action.payload.message;
      })
      .addCase(newScheduling.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.scheduling = {};
        state.schedulings.push(state.scheduling);
        state.message = action.payload.message;
      })
      .addCase(getAllScheduling.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(getAllScheduling.fulfilled, (state, action) => {
        state.loading = false;
        state.schedulings = action.payload;
      })
      .addCase(getAllScheduling.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.schedulings = {};
        state.message = action.payload.message;
      });
  },
});

export const { reset } = schedulingSlice.actions;
export default schedulingSlice.reducer;