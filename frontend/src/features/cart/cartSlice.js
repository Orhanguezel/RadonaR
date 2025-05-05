import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiCall } from '@/api/apiCall'

// Initial State
const initialState = {
  cart: null,
  loading: false,
  error: null,
  message: null,
}

// Async Thunks

// Get user cart
export const getCart = createAsyncThunk(
  'cart/getCart',
  async (_, thunkAPI) => {
    try {
      return await apiCall({ url: '/cart', method: 'GET' })
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

// Add product to cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (data, thunkAPI) => {
    try {
      return await apiCall({ url: '/cart/add', method: 'POST', data })
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

// Increase quantity
export const increaseQuantity = createAsyncThunk(
  'cart/increaseQuantity',
  async (productId, thunkAPI) => {
    try {
      return await apiCall({
        url: `/cart/increase/${productId}`,
        method: 'PATCH',
      })
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

// Decrease quantity
export const decreaseQuantity = createAsyncThunk(
  'cart/decreaseQuantity',
  async (productId, thunkAPI) => {
    try {
      return await apiCall({
        url: `/cart/decrease/${productId}`,
        method: 'PATCH',
      })
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

// Remove from cart
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId, thunkAPI) => {
    try {
      return await apiCall({
        url: `/cart/remove/${productId}`,
        method: 'DELETE',
      })
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

// Clear entire cart
export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, thunkAPI) => {
    try {
      return await apiCall({ url: '/cart/clear', method: 'DELETE' })
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

// Slice

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCartMessages: (state) => {
      state.error = null
      state.message = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Cart
      .addCase(getCart.pending, (state) => {
        state.loading = true
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false
        state.cart = action.payload
        state.error = null
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false
        state.cart = action.payload
        state.message = 'Produkt erfolgreich zum Warenkorb hinzugefügt'
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Increase Quantity
      .addCase(increaseQuantity.pending, (state) => {
        state.loading = true
      })
      .addCase(increaseQuantity.fulfilled, (state, action) => {
        state.loading = false
        state.cart = action.payload
        state.message = 'Menge erhöht'
      })
      .addCase(increaseQuantity.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Decrease Quantity
      .addCase(decreaseQuantity.pending, (state) => {
        state.loading = true
      })
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        state.loading = false
        state.cart = action.payload
        state.message = 'Menge verringert'
      })
      .addCase(decreaseQuantity.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false
        state.cart = action.payload
        state.message = 'Produkt aus dem Warenkorb entfernt'
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Clear Cart
      .addCase(clearCart.pending, (state) => {
        state.loading = true
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.loading = false
        state.cart = action.payload
        state.message = 'Warenkorb geleert'
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearCartMessages } = cartSlice.actions
export default cartSlice.reducer
