import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async ({ keyword = "", page = 1 } = {}, { rejectWithValue }) => {
    try {
      const link = keyword
        ? `/api/v1/products?keyword=${encodeURIComponent(keyword)}&page=${page}`
        : `/api/v1/products?page=${page}`;

      const { data } = await axios.get(link);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// Get Single Product
export const getProductDetails = createAsyncThunk(
  "product/getProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/products/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const productSlice = createSlice({
  name: "product",

  initialState: {
    products: [],
    product: null,
    loading: false,
    error: null,
    resultsPerPage: 4,
    totalPages: 0,
    currentPage: 1,
  },

  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // All Products
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.resultsPerPage = action.payload.resultsPerPage;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.products = [];
        state.error = action.payload;
      })

      // Single Product
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.singleProduct;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { removeErrors } = productSlice.actions;

export default productSlice.reducer;