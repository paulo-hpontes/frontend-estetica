import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import daysOffService from "../services/daysOffService";

const initialState = {
  daysOff: [],
  dayoff: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

export const getAllDays = createAsyncThunk(
    "daysoff/getAll",
    async (_, thunkAPI) => {
      const data = await daysOffService.getAllDays();
      if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0]);
      }
      return data;
    }
  );

  export const newDayOff = createAsyncThunk(
    "dayoff/publish",
    async (date, thunkAPI) => {
      const token = thunkAPI.getState().auth.user.token
      const data = await daysOffService.newDayOff(date, token);
      if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0]);
      }
  
      return data;
    }
  );

  export const deleteDayOff = createAsyncThunk(
    "dayoff/delete",
    async (id, thunkAPI) => {
      const token = thunkAPI.getState().auth.user.token;
      const data = await daysOffService.deleteDayOff(id, token);
  
      if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0]);
      }
  
      return data;
    }
  );

  export const daysOffSlice = createSlice({
    name: "dayoff",
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
        .addCase(getAllDays.pending, (state) => {
          state.loading = true;
          state.error = false;
          state.success = false;
        })
        .addCase(getAllDays.fulfilled, (state, action) => {
          state.loading = false;
          state.daysOff = action.payload;
        })
        .addCase(getAllDays.rejected, (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = true;
          state.message = action.payload.message;
        })
        .addCase(newDayOff.pending, (state) => {
          state.loading = true;
          state.error = false;
          state.success = false;
        })
        .addCase(newDayOff.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.error = false;
          state.dayoff = action.payload.data;
          state.daysOff.push(state.dayoff);
          state.message = action.payload.message;
        })
        .addCase(newDayOff.rejected, (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = true;
          state.message = action.payload.message;
        })
        .addCase(deleteDayOff.pending, (state) => {
          state.loading = true;
          state.error = false;
          state.success = false;
        })
        .addCase(deleteDayOff.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.error = false;
          state.daysOff = state.daysOff.filter((day) => {
            return day._id !== action.payload.data._id;
          });
          state.message = action.payload.message;
        })
        .addCase(deleteDayOff.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.success = false;
          state.message = action.payload.message;
        });
    },
  });
  
  export const { reset } = daysOffSlice.actions;
  export default daysOffSlice.reducer;