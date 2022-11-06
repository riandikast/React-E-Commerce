import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import axios from 'axios';

export const loginUser = createAsyncThunk("login/user", async (authInput)=> {
    try {
        return await fetch(`https://fakestoreapi.com/auth/login`, {
            method: "POST",
            'Access-Control-Allow-Origin': '*',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(authInput),
        })
        .then((data) => data.json())
        .then(data => localStorage.setItem("token", data.token))
    } catch (error) {
        console.log(error)
        throw(error);
    }
});

const initialState = {
    isLogin: localStorage.getItem("token")? true : false,
    email: "John@gmail.com",
    username: null,
    token: localStorage.getItem("token"),
    loading: false,
    isError: false,
    role: null,
}

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        emailUser: (state, action) => {
            if (state.email === action.payload) {
                state.username = "johnd";
                state.role = "user";
                localStorage.setItem("email", (state.email))
            } else {
                state.role="admin";
            }
        },
        logoutUser: (state) => {
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            state.isLogin = false;
        }
    },
    extraReducers: {
        [loginUser.pending]: (state) => {
            state.loading = true;
            state.isLogin = false;
            state.isError = null;
        },
        [loginUser.fulfilled]: (state, action) => {
            state.loading = false; 
            state.isLogin = true;
            state.role = "user";
            state.isError = null;
        },
        [loginUser.rejected]: (state) => {
            state.loading = false;
            state.isLogin = false;
            state.isError = true;
        },
    }
})

export const { emailUser, logoutUser } = loginSlice.actions;
export const loginSelector = state => state.login
export default loginSlice.reducer;