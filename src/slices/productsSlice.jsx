import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productsService from "../services/productsService";

const initialState = {
  products: [],
  product: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

export const getAllServices = createAsyncThunk(
  "products/getAll",
  async (_, thunkAPI) => {
    const data = await productsService.getAllServices();
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  }
);

export const newProduct = createAsyncThunk(
    "photo/publish",
    async (serviceData, thunkAPI) => {
      const token = thunkAPI.getState().auth.user.token;
      const data = await productsService.newProduct(serviceData, token);
  
      if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0]);
      }
  
      return data;
    }
  );

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllServices.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllServices.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.products = action.payload;
      })
      .addCase(getAllServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(newProduct.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(newProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.product = action.payload;
        state.message = "Serviço adicionado com sucesso!";
      })
      .addCase(newProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.product = {};
      });
  },
});

export const { resetMessage } = productsSlice.actions;
export default productsSlice.reducer;