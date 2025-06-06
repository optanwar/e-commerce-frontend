import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/axiosInstance'; // Make sure this points to your configured axios

// ----------------------
// Thunks
// ----------------------

// 1. Fetch all users
export const fetchUsers = createAsyncThunk('users/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get('/admin/users');
    return data.users;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to fetch users';
    return rejectWithValue(message);
  }
});

// 2. Delete user by ID
export const deleteUser = createAsyncThunk('users/delete', async (userId, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/admin/user/${userId}`);
    return userId;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to delete user';
    return rejectWithValue(message);
  }
});

// 3. Update user role/details
export const updateUserRole = createAsyncThunk(
  'users/updateRole',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/admin/user/${id}`, updatedData);
      return data.user; // return updated user
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to update user';
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  users: [],
  loading: false,
  error: null,
};

// ----------------------
// Slice
// ----------------------
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUserErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // FETCH USERS
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE USER
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE USER
      .addCase(updateUserRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex((u) => u._id === action.payload._id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserErrors } = userSlice.actions;

export default userSlice.reducer;
