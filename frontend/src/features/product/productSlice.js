import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiCall } from '@/api/apiCall'

// Initial State
const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
  message: null,
}

// Async Thunks

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (_, thunkAPI) => {
    try {
      return await apiCall({ url: '/products', method: 'GET' })
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const fetchProductById = createAsyncThunk(
  'product/fetchProductById',
  async (id, thunkAPI) => {
    try {
      return await apiCall({ url: `/products/${id}`, method: 'GET' })
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (data, thunkAPI) => {
    try {
      return await apiCall({ url: '/products', method: 'POST', data })
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async ({ id, data }, thunkAPI) => {
    try {
      return await apiCall({ url: `/products/${id}`, method: 'PUT', data })
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (id, thunkAPI) => {
    try {
      return await apiCall({ url: `/products/${id}`, method: 'DELETE' })
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

// Slice

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearProductMessages: (state) => {
      state.error = null
      state.message = null
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
        state.error = null
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false
        state.product = action.payload
        state.error = null
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // createProduct
      .addCase(createProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false
        state.products.push(action.payload)
        state.message = 'Product created successfully'
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // updateProduct
      .addCase(updateProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false
        state.products = state.products.map((item) =>
          item._id === action.payload._id ? action.payload : item
        )
        state.message = 'Product updated successfully'
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // deleteProduct
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false
        state.products = state.products.filter(
          (item) => item._id !== action.payload._id
        )
        state.message = 'Product deleted successfully'
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearProductMessages } = productSlice.actions
export default productSlice.reducer
