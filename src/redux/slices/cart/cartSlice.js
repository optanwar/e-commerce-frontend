import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios/axiosInstance';

const initialState = {
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,
  loading: false,
  error: null,
  isGuest: true,
};

// Async Thunks (server API integration)
export const fetchCart = createAsyncThunk('cart/fetch', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get('/cart');
    return res.data.cart.items;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const addOrUpdateCart = createAsyncThunk(
  'cart/addOrUpdate',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const res = await axios.post('/cart', { productId, quantity });
      return res.data.cart.items;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const removeCartItem = createAsyncThunk('cart/remove', async (productId, { rejectWithValue }) => {
  try {
    const res = await axios.delete(`/cart/${productId}`);
    return res.data.cart.items;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const clearServerCart = createAsyncThunk('cart/clear', async (_, { rejectWithValue }) => {
  try {
    await axios.delete('/cart/clear/all');
    return [];
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const mergeGuestCart = createAsyncThunk('cart/merge', async (guestItems, { rejectWithValue }) => {
  try {
    const res = await axios.post('/cart/merge', { guestItems });
    return res.data.cart.items;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    // Guest actions (Redux Persist will keep this saved)
    addToCartGuest: (state, action) => {
      const item = action.payload;
      const existing = state.cartItems.find((i) => i._id === item._id);
      if (existing) {
        existing.quantity += item.quantity || 1;
      } else {
        state.cartItems.push({ ...item, quantity: item.quantity || 1 });
      }
    },

    removeFromCartGuest: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);
    },

    updateQuantityGuest: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((i) => i._id === id);
      if (item) {
        item.quantity = quantity;
      }
    },

    clearGuestCart: (state) => {
      state.cartItems = [];
    },

    calculateTotals: (state) => {
      let total = 0;
      let items = 0;
      state.cartItems.forEach((item) => {
        items += item.quantity;
        total += item.quantity * item.price;
      });
      state.totalItems = items;
      state.totalPrice = total;
    },

    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },

    setIsGuest: (state, action) => {
      state.isGuest = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.isGuest = false;
        state.loading = false;
      })
      .addCase(addOrUpdateCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.loading = false;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.loading = false;
      })
      .addCase(clearServerCart.fulfilled, (state) => {
        state.cartItems = [];
        state.loading = false;
      })
      .addCase(mergeGuestCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.isGuest = false;
        state.loading = false;
      })

      .addMatcher((action) => action.type.endsWith('/pending'), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher((action) => action.type.endsWith('/rejected'), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addToCartGuest,
  removeFromCartGuest,
  updateQuantityGuest,
  clearGuestCart,
  calculateTotals,
  setCartItems,
  setIsGuest,
} = cartSlice.actions;

export default cartSlice.reducer;
