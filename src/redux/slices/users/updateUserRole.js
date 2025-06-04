import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Update User Role (Admin Only)
export const updateUserRole = createAsyncThunk(
  'user/updateUserRole',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/admin/user/${id}`, updatedData);
      return data.user; // Assuming response returns { user }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // updateUserRole
      .addCase(updateUserRole.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        // Optional: Update users array if needed
        const updatedIndex = state.users.findIndex(
          (u) => u._id === action.payload._id
        );
        if (updatedIndex !== -1) {
          state.users[updatedIndex] = action.payload;
        }
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export default userSlice.reducer;
