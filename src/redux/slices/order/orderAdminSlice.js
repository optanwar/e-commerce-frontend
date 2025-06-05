import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/axiosInstance'; // adjust path if needed

// ✅ Async thunk: fetch all orders
export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/admin/orders');
      return response.data.orders;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Failed to fetch orders';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const orderSlice = createSlice({
  name: 'ordersAdmin',
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearOrderErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderErrors } = orderSlice.actions;

export default orderSlice.reducer;
