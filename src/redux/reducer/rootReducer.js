// src/redux/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../slices/auth/authSlice';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Only persist the auth slice
};

const rootReducer = combineReducers({
  auth: authReducer,
});

export default persistReducer(persistConfig, rootReducer);
