// src/redux/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../slices/auth/loginSlice';
import createProductReducer from '../slices/product/createProductSlice';
import productReducer from '../slices/product/productSlice';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth',"createProduct","products"], // Only persist the auth slice
};

const rootReducer = combineReducers({
  auth: authReducer,
  createProduct: createProductReducer,
  product: productReducer,
});

export default persistReducer(persistConfig, rootReducer);
