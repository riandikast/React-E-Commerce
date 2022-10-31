import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './login/LoginSlice'
import productReducer from './products/ProductSlice'

export const store = configureStore({
    reducer: {
        login: loginReducer,
        product: productReducer
    },
})