import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiCall } from '@/api/apiCall'

// Initial State
const initialState = {
  user: null,
  loading: false,
  error: null,
  message: null,
  isAuthenticated: false,
}

// Async Thunks

// Login
export const login = createAsyncThunk(
  'auth/login',
  async (data, thunkAPI) => {
    try {
      return await apiCall({ url: '/auth/login', method: 'POST', data })
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

// Register
export const register = createAsyncThunk(
  'auth/register',
  async (data, thunkAPI) => {
    try {
      return await apiCall({ url: '/auth/register', method: 'POST', data })
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

// Fetch Current User
export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, thunkAPI) => {
    try {
      return await apiCall({ url: '/auth/me', method: 'GET' })
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

// Logout
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      return await apiCall({ url: '/auth/logout', method: 'POST' })
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

// Slice

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthMessages: (state) => {
      state.error = null
      state.message = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
        state.message = 'Anmeldung erfolgreich'
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
        state.message = 'Registrierung erfolgreich'
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Fetch Current User
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading = false
        state.user = null
        state.isAuthenticated = false
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false
        state.user = null
        state.isAuthenticated = false
        state.message = 'Erfolgreich abgemeldet'
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearAuthMessages } = authSlice.actions
export default authSlice.reducer
