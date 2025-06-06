import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/axiosInstance';

// Async thunk to update a product
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/admin/product/${id}`, updatedData);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to update product');
    }
  }
);

const updateProductSlice = createSlice({
  name: 'updateProduct',
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    clearUpdateState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUpdateState } = updateProductSlice.actions;
export default updateProductSlice.reducer;
