import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from 'axios';
import Swal from "sweetalert2";

export const loginUser = createAsyncThunk("login/user", async (authInput) => {
  try {
    return await fetch(`https://fakestoreapi.com/auth/login`, {
      method: "POST",
      "Access-Control-Allow-Origin": "*",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authInput),
    })
      .then((data) => data.json())
      .then((data) => localStorage.setItem("token", data.token));
  } catch (error) {
    console.log(error);
    throw error;
  }
});

let defaultAdmin = {
  email: "admin@bukapedia.com",
  password: "admin123",
  admin: false,
};
let arrayAdmin = [...[], defaultAdmin];

const initialState = {
  isLogin: localStorage.getItem("token") ? true : false,
  email: "John@gmail.com",
  username: null,
  token: localStorage.getItem("token"),
  loading: false,
  isError: false,
  role: null,
  setAdmin: [localStorage.setItem("admin", JSON.stringify(...[], arrayAdmin))],
  admin: JSON.parse(localStorage.getItem("admin")) || [],
  value: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    emailUser: (state, action) => {
      if (state.email === action.payload) {
        state.username = "johnd";
        state.role = "user";
        localStorage.setItem("email", state.email);
      } else {
        state.role = "admin";
      }
    },
    logoutUser: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      state.isLogin = false;
      state.admin.map((admin) => {
        admin.admin = false;
      });
      localStorage.setItem("admin", JSON.stringify(state.admin));
    },
    loginAdmin: (state, action) => {
      state.admin.forEach((acc) => {
        var BreakException = {};

        if (
          acc.email === action.payload.emailInput &&
          acc.password === action.payload.passwordInput
        ) {
          state.admin.map((admin) => {
            admin.admin = true;
          });
          localStorage.setItem("admin", JSON.stringify(state.admin));

          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Successfully logged in",
          });
          throw BreakException;
        } else if (
          state.email === action.payload.emailInput &&
          "m38rmF$" === action.payload.passwordInput
        ) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Successfully logged in",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: "Email or Password are wrong",
          });
        }
      });
    },
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
  },
});

export const { emailUser, logoutUser, loginAdmin } = loginSlice.actions;
export const loginSelector = (state) => state.login;
export default loginSlice.reducer;
