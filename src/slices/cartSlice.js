import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Each item: { id, name, price, quantity, image, ... }
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const {  product, quantity } = action.payload;
   
      const existingItem = state.items.find(item => item.id === product._id);

      // if (existingItem) {
      //   existingItem.quantity += quantity;
      // } else {
      //   state.items.push({ ...product, quantity });
      // }
      
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    state.items.push({ ...product, id: product._id, quantity }); // Normalize id
  }

      state.totalQuantity += quantity;
      state.totalAmount += product.price * quantity;
    },

    increaseQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        existingItem.quantity++;
        state.totalQuantity++;
        state.totalAmount += existingItem.price;
      }
    },

    decreaseQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(item => item.id !== id);
        } else {
          existingItem.quantity--;
        }

        state.totalQuantity--;
        state.totalAmount -= existingItem.price;
      }
    },

    removeFromCart(state, action) {
      const id = action.payload;
      const itemToRemove = state.items.find(item => item.id === id);

      if (itemToRemove) {
        state.totalQuantity -= itemToRemove.quantity;
        state.totalAmount -= itemToRemove.price * itemToRemove.quantity;
        state.items = state.items.filter(item => item.id !== id);
      }
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    }
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
