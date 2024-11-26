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

export const getAllProducts = createAsyncThunk(
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
  "product/publish",
  async (serviceData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await productsService.newProduct(serviceData, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await productsService.deleteService(id, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const updateProduct = createAsyncThunk(
  "product/update",
  async (productData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const dataService = {serviceName: productData.serviceName, serviceValue: productData.serviceValue}
    const data = await productsService.updateService(
      dataService,
      productData.id,
      token
    );

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
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload.message;
      })
      .addCase(newProduct.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(newProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.product = action.payload.data;
        state.products.push(state.product);
        state.message = action.payload.message;
      })
      .addCase(newProduct.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.product = {};
        state.message = action.payload.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.products = state.products.filter((prod) => {
          return prod._id !== action.payload.service._id;
        });
        state.message = action.payload.message;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.success = false;
        state.message = action.payload.message;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.products.map((prod) => {
          if (prod._id == action.payload.service._id) {
            prod.serviceName = action.payload.service.serviceName;
            prod.serviceValue = action.payload.service.serviceValue;
            return; 
          }
          return prod;
        });
        state.message = action.payload.message;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.product = {};
        state.message = action.payload.message;
      });
  },
});

export const { reset } = productsSlice.actions;
export default productsSlice.reducer;
