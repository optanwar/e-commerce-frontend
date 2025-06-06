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

// ✅ Async thunk: Get all orders of logged-in user
export const fetchMyOrders = createAsyncThunk(
  'order/fetchMyOrders',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/orders/me`);
      return data.orders; // Adjust depending on your backend response
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch orders');
    }
  }
);

// ✅ Slice
const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderDetails: null,
    myOrders: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearOrder: (state) => {
      state.orderDetails = null;
      state.loading = false;
      state.error = null;
    },
    clearMyOrders: (state) => {
      state.myOrders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchOrderById
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
      })

      // fetchMyOrders
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.myOrders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrder, clearMyOrders } = orderSlice.actions;
export default orderSlice.reducer;
