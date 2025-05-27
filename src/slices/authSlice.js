import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axios/axiosInstance';

// Async thunk for user signup
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData, { rejectWithValue }) => {
   
    try {
      const response = await axiosInstance.post('/registerUser', userData);
     

      if (response.data.success === false || response.status !== 200) {
        throw new Error(response.data.message);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/loginUser', credentials);

      if (response.data.success === false || response.status !== 200) {
        throw new Error(response.data.message);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk for forgot password
export const forgotPasswordUser = createAsyncThunk(
  'auth/forgotPasswordUser',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/password/forgot', { email });

      if (response.data.success === false || response.status !== 200) {
        throw new Error(response.data.message);
      }

      return response.data.message; // usually success message
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    forgotPasswordMessage: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    clearForgotPasswordMessage: (state) => {
      state.forgotPasswordMessage = null;
    },
    clearError: (state) => {
      state.error = null;
    }, 
    setCredentials: (state, action) => {
  state.token = action.payload.token;
  state.user = action.payload.user || null;
  // state.isAuthenticated = !!action.payload.token;
}

  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("Login fulfilled:", action.payload);
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Forgot Password
      .addCase(forgotPasswordUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.forgotPasswordMessage = null;
      })
      .addCase(forgotPasswordUser.fulfilled, (state, action) => {
        state.loading = false;
        state.forgotPasswordMessage = action.payload;
      })
      .addCase(forgotPasswordUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { logout, clearForgotPasswordMessage,clearError ,setCredentials } = authSlice.actions;
export default authSlice.reducer;
