import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/axiosInstance';

// ✅ Fetch all orders
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

// ✅ Update order status
export const updateOrderStatus = createAsyncThunk(
  'orders/updateStatus',
  async ({ id, status }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`/admin/order/${id}`, { status });
      return { id, status }; // return payload to update local state
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Failed to update order status';
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
    updateSuccess: false,
  },
  reducers: {
    clearOrderErrors: (state) => {
      state.error = null;
    },
    resetUpdateSuccess: (state) => {
      state.updateSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Fetch All Orders
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
      })

      // ✅ Update Order Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.updateSuccess = true;

        // ✅ Update the local order list status too
        const { id, status } = action.payload;
        state.orders = state.orders.map((order) =>
          order._id === id ? { ...order, orderStatus: status } : order
        );
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.updateSuccess = false;
      });
  },
});

export const { clearOrderErrors, resetUpdateSuccess } = orderSlice.actions;

export default orderSlice.reducer;
