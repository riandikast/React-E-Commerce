import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './login/LoginSlice'
import productReducer from './products/ProductSlice'
import CartSlice from './products/CartSlice'
export const store = configureStore({
    reducer: {
        login: loginReducer,
        product: productReducer,
        saved: CartSlice
    },
})