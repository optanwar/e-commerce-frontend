import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/axiosInstance'; // Adjust path if needed

// Fetch single user details by ID
export const fetchUserDetails = createAsyncThunk(
  'userDetails/fetch',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/admin/user/${userId}`);
      return data.user; // Adjust based on your actual API response
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Failed to fetch user details';
      return rejectWithValue(message);
    }
  }
);

const userDetailsSlice = createSlice({
  name: 'userDetailsAdmin',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearUserDetails: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserDetails } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
