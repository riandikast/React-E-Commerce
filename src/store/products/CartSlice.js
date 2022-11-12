import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
var valid: Boolean;

export const saveSlice = createSlice({
  name: "cart",
  initialState: {
    saved: JSON.parse(localStorage.getItem("cart")) || [],
    value: "",
  },
  reducers: {

    addProduct: (state, action) => {
      if (valid) {
        state.saved = [...state.saved, action.payload];
        localStorage.setItem("cart", JSON.stringify(state.saved));
      } else {
        state.saved.forEach((saved) => {
          var BreakException = {};
          if (saved.title === action.payload.title) {
            saved.quantity = saved.quantity + 1;
            localStorage.setItem("cart", JSON.stringify(state.saved));
          
          } else {
            saved.quantity = saved.quantity;
            localStorage.setItem("cart", JSON.stringify(state.saved));
          }
        });
      }
      Swal.fire({
        icon: "success",
        title: "",
        text: "Product added to cart",
      });
    },

    deleteProduct: (state, action) => {
      if (!valid) {
        state.saved = state.saved.filter(
          (saved) => saved.title !== action.payload.title
        );
        localStorage.setItem("cart", JSON.stringify(state.saved));
      }
    },

    deleteFromSaved: (state, action) => {
      state.saved = state.saved.filter(
        (saved) => saved.title !== action.payload.title
      );
      localStorage.setItem("cart", JSON.stringify(state.saved));
    },

    checkData: (state, action) => {
      valid = true;
      for (let i = 0; i < state.saved.length; i++) {
        if (state.saved[i].title === action.payload.title) {
          valid = false;
          break;
        } else {
          valid = true;
        }
      }
    },

    incrementCart: (state, action) => {
      state.saved.forEach((saved) => {
        var BreakException = {};
        if (saved.title === action.payload.title) {
          saved.quantity = saved.quantity + 1;
          localStorage.setItem("cart", JSON.stringify(state.saved));
        
        } 
      });
    },

    decrementCart: (state, action) => {
      state.saved.forEach((saved) => {
        var BreakException = {};
        if (saved.title === action.payload.title) {
          if (saved.quantity > 1){
            saved.quantity = saved.quantity - 1;
          }
          localStorage.setItem("cart", JSON.stringify(state.saved));
        
        } 
      });
    },

    
  },
});

export const saveSelector = (state) => state.saved;
export const { addProduct, deleteProduct, deleteFromSaved, checkData, incrementCart, decrementCart } =
  saveSlice.actions;
export default saveSlice.reducer;
