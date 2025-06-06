// src/redux/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../slices/auth/loginSlice';
import createProductReducer from '../slices/product/createProductSlice';
import productReducer from '../slices/product/productSlice';
import productDetailReducer from '../slices/product/productDetailSlice';
import productUpdateReducer from '../slices/product/updateProductSlice';
import productDeleteReducer from '../slices/product/deleteProductSlice';
import userReducer from '../slices/users/userSlice';
import userDetailsAdminReducer from '../slices/users/userDetailsSlice';
import orderAdminReducer from '../slices/order/orderAdminSlice';
import orderReducer from '../slices/order/orderSlice';
import profileReducer from '../slices/users/profileSlice';
import reviewReducer from '../slices/reviews/reviewsSlice';
import cartReducer from '../slices/cart/cartSlice'
import createOrderReducer from '../slices/order/createOrderSlice'
import stripeReducer from '../slices/order/paymentSlice'

import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'products', 'users','cart','stripe'], // Only persist the auth slice
};

const rootReducer = combineReducers({
  auth: authReducer,
  createProduct: createProductReducer,
  products: productReducer,
  productDetail: productDetailReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  user: userReducer,
  userDetailsAdmin: userDetailsAdminReducer,
  ordersAdmin: orderAdminReducer,
  order: orderReducer,
  profile: profileReducer,
  review: reviewReducer,
  cart: cartReducer,
  stripe:stripeReducer,
  createOrder:createOrderReducer,
});

export default persistReducer(persistConfig, rootReducer);
