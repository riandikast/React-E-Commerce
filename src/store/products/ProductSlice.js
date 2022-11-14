import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const getAllProduct = createAsyncThunk("product/all", async ()=> {
    try {
        const response = await axios.get(`https://fakestoreapi.com/products`);
        console.log('All Product', response);
        return response.data;
    } catch (error) {
        throw(error);
    }
});

export const getDetailProduct = createAsyncThunk("product/detail", async ({id})=> {
    try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        console.log('Detail Product', response);
        return response.data;
    } catch (error) {
        throw(error);
    }
});

export const getCategory = createAsyncThunk("product/category", async ({category})=> {
    try {
        const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
        console.log('All Product', response);
        return response.data;
    } catch (error) {
        throw(error);
    }
});

const initialState = {
    product: [],
    loading: false,
    isError: null,
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
    },
    extraReducers: {
        
        [getAllProduct.pending]: (state) => {
            state.loading = true;
        },
        [getAllProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.product = action.payload;
            console.log(action.payload)
        },
        [getAllProduct.rejected]: (state) => {
            state.isError = true;
        },
        [getDetailProduct.pending]: (state) => {
            state.loading = true;
        },
        [getDetailProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.product = action.payload;
        },
        [getDetailProduct.rejected]: (state) => {
            state.isError = true;
        },
        // [getCategory.pending]: (state) => {
        //     state.loading = true;
        //     state.product = null;
        //     state.isError = null;
        // },
        // [getCategory.fulfilled]: (state, {payload}) => {
        //     state.loading = false;
        //     state.product = payload;
        //     state.isError = null;
        // },
        // [getCategory.rejected]: (state) => {
        //     state.loading = false;
        //     state.product = null;
        //     state.isError = true;
        // },
    }
})

export const productSelector = state => state.product
export default productSlice.reducer;