import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axios/axiosInstance';

// Async thunk for processing payment
export const processPayment = createAsyncThunk(
  'payment/processPayment',
  async ({ amount, token }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        '/payment/process',
        { amount: Math.round(amount * 100) }, // amount in cents
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200 || response.data.success === false) {
        return rejectWithValue(response.data.message || 'Payment failed');
      }

      return response.data; // e.g. client_secret or payment confirmation
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    loading: false,
    success: false,
    error: null,
    paymentData: null,
  },
  reducers: {
    resetPaymentState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.paymentData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(processPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(processPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.paymentData = action.payload;
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        state.success = false;
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;

export default paymentSlice.reducer;
