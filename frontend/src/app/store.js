import { configureStore } from '@reduxjs/toolkit'
import productReducer from '@/features/product/productSlice'
import cartReducer from '@/features/cart/cartSlice'
import authReducer from '@/features/auth/authSlice'
import accountReducer from '@/features/auth/accountSlice'
import userCrudReducer from '@/features/auth/userCrudSlice'
import userStatusReducer from '@/features/auth/userStatusSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    auth: authReducer,
    account: accountReducer,
    userCrud: userCrudReducer,
    userStatus: userStatusReducer,
  },
})
