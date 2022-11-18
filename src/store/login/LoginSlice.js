import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk("login/user", async (authInput) => {
  try {
    return await fetch(`https://fakestoreapi.com/auth/login`, {
      method: "POST",
      "Access-Control-Allow-Origin": "*",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authInput),
    }).then((data) => data.json())

  } catch (error) {
    throw error;
  }
});

let defaultAdmin = {
  email: "admin@bukapedia.com",
  password: "admin123",
  admin: false,
};
let arrayAdmin = [...[], defaultAdmin];
const setAdmin = ()=> {
  const data = JSON.parse(localStorage.getItem("admin")) 
  if (data === null || data.length === 0){
    return localStorage.setItem("admin", JSON.stringify(...[], arrayAdmin))
  }

}
const initialState = {
  isLogin: localStorage.getItem("token") ? true : false,
  emailUser: "John@gmail.com",
  emailAdmin: "admin@bukapedia.com",
  username: "johnd",
  token: localStorage.getItem("token"),
  loading: false,
  isError: false,
  setAdmin: setAdmin(),
  admin: JSON.parse(localStorage.getItem("admin")) || [],
  value: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.token = null
      localStorage.removeItem("token");
      state.isLogin = false;
      state.admin.map((admin) => {
        admin.admin = false;
      });
      localStorage.setItem("admin", JSON.stringify(state.admin));
    },
    loginAdmin: (state, action) => {
      state.admin.forEach((acc) => {
        if (
          acc.email === action.payload.emailInput &&
          acc.password === action.payload.passwordInput
        ) {
          state.admin.map((admin) => {
            admin.admin = true;
          });
          localStorage.setItem("admin", JSON.stringify(state.admin));
          state.isLogin = true;
        } else {
          state.isError = true;
        }
      });
    },
    reset: (state) => {
      state.isError = false;
    }
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.isLogin = true;
      localStorage.setItem("token", action.payload.token)
      state.token = action.payload.token
      state.isError = false;
    },
    [loginUser.rejected]: (state) => {
      state.loading = false;
      state.isError = true;
    },
  },
});

export const { emailCheck, logoutUser, loginAdmin, reset } = loginSlice.actions;
export const loginSelector = (state) => state.login;
export default loginSlice.reducer;
