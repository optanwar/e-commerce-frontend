import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axios/axiosInstance';

// Async thunk to create a new order
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async ({ orderData, token }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/order/new', orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 201) {
        return rejectWithValue('Failed to create order');
      }

      return response.data; // Return created order data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk to fetch order details
export const getOrderDetails = createAsyncThunk(
  'order/getOrderDetails',
  async ({ orderId, token }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        return rejectWithValue('Failed to fetch order details');
      }

      return response.data; // Return order details
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk to fetch current user's orders
export const getMyOrders = createAsyncThunk(
  'order/getMyOrders',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/orders/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        return rejectWithValue('Failed to fetch user orders');
      }

      return response.data; // return user's orders list
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    loading: false,
    success: false,
    error: null,
    order: null,
    orderDetails: null,
    myOrders: [],
  },
  reducers: {
    resetOrderState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.order = null;
      state.orderDetails = null;
      state.myOrders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Create order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        state.success = false;
      })

      // Get order details
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Get current user's orders
      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.myOrders = action.payload;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetOrderState } = orderSlice.actions;

export default orderSlice.reducer;
