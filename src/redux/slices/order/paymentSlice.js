// src/redux/slices/paymentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/axiosInstance';

// ✅ Get Stripe API Key
export const getStripeApiKey = createAsyncThunk(
  'payment/getStripeApiKey',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get('/stripeapikey');
      return data.stripeApiKey;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ✅ Process Stripe Payment
export const processPayment = createAsyncThunk(
  'payment/processPayment',
  async (amount, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post('/payment/process', { amount });
      console.log("Payment response:", data);
      return data.client_secret;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ✅ Slice
const paymentSlice = createSlice({
  name: 'stripe',
  initialState: {
    loading: false,
    stripeApiKey: '',
    clientSecret: '',
    error: null,
  },
  reducers: {
    clearPaymentError: (state) => {
      state.error = null;
    },
    resetStripe: (state) => {
      state.clientSecret = '';
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔵 Get Stripe Key
      .addCase(getStripeApiKey.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStripeApiKey.fulfilled, (state, action) => {
        state.loading = false;
        state.stripeApiKey = action.payload;
      })
      .addCase(getStripeApiKey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔵 Process Payment
      .addCase(processPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(processPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.clientSecret = action.payload;
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPaymentError, resetStripe } = paymentSlice.actions;
export default paymentSlice.reducer;
