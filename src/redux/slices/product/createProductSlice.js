// src/redux/slices/product/createProductSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/axiosInstance';


// ✅ Async thunk to create a product
export const createProduct = createAsyncThunk(
  'createProduct/create',
  async ({ productData, token }, { rejectWithValue }) => {
    try {
      // productData can be a FormData object if uploading images
   console.log('Creating product with data:', productData);
   console.log('rt', token);
      const response = await axiosInstance.post('/admin/product/new', productData, {
        headers: {
          Authorization: `Bearer ${token}`,
          
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const createProductSlice = createSlice({
  name: 'createProduct',
  initialState: {
    product: null,
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    // ✅ Reset state after submission or navigation
    resetCreateProductState: (state) => {
      state.product = null;
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.product = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetCreateProductState } = createProductSlice.actions;
export default createProductSlice.reducer;
