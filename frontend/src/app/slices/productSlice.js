import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProductsApi, createProductApi } from "../../api/productApi";

export const fetchProductsData = createAsyncThunk(
  "product/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllProductsApi();
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await createProductApi(payload);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  products: [],
  error: null,
  success: null,
  loading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    // Fetch
    builder
      .addCase(fetchProductsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsData.fulfilled, (state, action) => {
        state.success = action.payload;
      })
      .addCase(fetchProductsData.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Create
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.error = null;
        state.success = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.success = null;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
