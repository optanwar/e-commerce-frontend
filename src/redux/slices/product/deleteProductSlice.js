// redux/slices/deleteProductSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/axiosInstance'; // Your configured axios

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/admin/product/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Something went wrong');
    }
  }
);

const deleteProductSlice = createSlice({
  name: 'deleteProduct',
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    clearDeleteProductState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { clearDeleteProductState } = deleteProductSlice.actions;

export default deleteProductSlice.reducer;
