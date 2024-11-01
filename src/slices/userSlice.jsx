import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";

const initialState = {
  user: null,
  error: false,
  success: false,
  loading: false,
  message: null,
};

export const profile = createAsyncThunk(
  "user/profile",
  async (user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await userService.profile(user, token);
    return data;
  }
);

export const updateAdmin = createAsyncThunk(
  "user/update",
  async (user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const id = user.newAdmin;
    const data = await userService.updateProfile(user._id, id, token);
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  }
);

export const getUserDetails = createAsyncThunk(
  "user/get",
  async (id, thunkAPI) => {
    const data = await userService.getUserDetails(id);
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(profile.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.user = action.payload;
      })
      .addCase(updateAdmin.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.user = action.payload;
        state.message = action.payload.message;
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.success = false;
        state.message = action.payload.message;
        
      })
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success - false;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.user = action.payload;
      });;
  },
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;
