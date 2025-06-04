import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/axiosInstance'; // Your configured axios

// Async thunk to fetch all products
export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/products');
      // Assuming response data structure: { products: [...] }
      return response.data.products;
    } catch (error) {
      // Extract a meaningful error message or fallback to error.message
      const message =
        error.response?.data?.message || error.message || 'Failed to fetch products';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearErrors(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearErrors } = productsSlice.actions;

export default productsSlice.reducer;
