import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const loginUser = createAsyncThunk("login/user", async ()=> {
    try {
        // const response = await axios.get(``);
        // console.log('Login User', response);
        // return response;
    } catch (error) {
        throw(error);
    }
});

const initialState = {
    login: null,
    loading: false,
    isError: null,
}

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
    },
    extraReducers: {
        [loginUser.pending]: (state) => {
            state.loading = true;
            state.login = null;
            state.isError = null;
        },
        [loginUser.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.login = payload;
            state.isError = null;
        },
        [loginUser.rejected]: (state) => {
            state.loading = false;
            state.login = null;
            state.isError = true;
        },
    }
})

export const loginSelector = state => state.login
export default loginSlice.reducer;