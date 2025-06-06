// redux/slices/productDetailSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/axiosInstance';

export const fetchProductDetail = createAsyncThunk(
  'productDetail/fetchProductDetail',
  async (id, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/product/${id}`);
      return data.product;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
    }
  }
);

const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState: {
    product: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productDetailSlice.reducer;
