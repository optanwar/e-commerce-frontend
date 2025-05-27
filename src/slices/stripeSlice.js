import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axios/axiosInstance';

// Async thunk to fetch Stripe API key
export const fetchStripeApiKey = createAsyncThunk(
  'stripe/fetchStripeApiKey',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/stripeapikey', {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Stripe API response:', response);

      if (response.status !== 200) {
        return rejectWithValue('Failed to fetch Stripe API key');
      }

      // Defensive: check if stripeApiKey exists in response data
      if (!response.data || !response.data.stripeApiKey) {
        return rejectWithValue('Stripe API key missing in response');
      }

      return response.data.stripeApiKey;
    } catch (error) {
      console.error('Error fetching Stripe API key:', error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const stripeSlice = createSlice({
  name: 'stripe',
  initialState: {
    apiKey: '',
    loading: false,
    error: null,
  },
  reducers: {
    resetStripeKey: (state) => {
      state.apiKey = '';
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStripeApiKey.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStripeApiKey.fulfilled, (state, action) => {
        state.loading = false;
        state.apiKey = action.payload;
      })
      .addCase(fetchStripeApiKey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetStripeKey } = stripeSlice.actions;

export default stripeSlice.reducer;
