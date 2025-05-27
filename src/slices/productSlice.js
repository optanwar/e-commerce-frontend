import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axios/axiosInstance';

// Async thunk for fetching all products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async (keyword = '', page = 1, minPrice = 0, maxPrice = 1000) => {
  const response = await axiosInstance.get("/products");
  if(response.data.success === false || response.status !== 200) {
    throw new Error(response.data.message);
  }
  return response.data;
});

// Async thunk for fetching a single product by ID
export const fetchSingleProduct = createAsyncThunk(
  'products/fetchSingleProduct',
  async (productId) => {
    const response = await axiosInstance.get(`/product/${productId}`);
    
    if(response.data.success === false || response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    singleProduct: null,
    resultPerPage: 0,
    totalProducts: 0,
    loading: false,
    error: null,
    singleProductLoading: false,
    singleProductError: null,
    minPrice: 0,
    maxPrice: 1000
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // All products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.resultPerPage = action.payload.resultPerPage; 
        state.totalProducts = action.payload.productCount;
        state.minPrice = action.payload.minPrice;  
        state.maxPrice = action.payload.maxPrice;  
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Single product
      .addCase(fetchSingleProduct.pending, (state) => {
        state.singleProductLoading = true;
        state.singleProductError = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.singleProductLoading = false;
        state.singleProduct = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.singleProductLoading = false;
        state.singleProductError = action.error.message;
      });
  },
});

export default productSlice.reducer;