import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/axiosInstance';

// ✅ Async thunk: Get single order by ID
export const fetchOrderById = createAsyncThunk(
  'order/fetchOrderById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/order/${id}`);
      return data.order;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Something went wrong');
    }
  }
);

// ✅ Slice
const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderDetails: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearOrder: (state) => {
      state.orderDetails = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
