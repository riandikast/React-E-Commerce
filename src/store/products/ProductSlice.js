import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProduct = createAsyncThunk("product/all", async () => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products`);
    console.log("All Product", response);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const getDetailProduct = createAsyncThunk(
  "product/detail",
  async ({ id }) => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      console.log("Detail Product", response);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getCategory = createAsyncThunk(
  "product/category",
  async ({ category }) => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/category/${category}`
      );
      console.log("All Product", response);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  product: [],
  loading: false,
  isError: null,
  stockProduct: JSON.parse(localStorage.getItem("product")) || [],
  saved: JSON.parse(localStorage.getItem("cart")) || [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    checkoutProduct: (state, action) => {
      state.stockProduct.forEach((product) => {

        for (let i = 0; i < state.saved.length; i++) {
            if (product.title === state.saved[i].title) {
                if (product.stock > 1) {
                  product.stock = product.stock - state.saved[i].quantity;
           
                } else {
                  product.stock = 0;
                }
              } else {
                product.stock = product.stock;
              }
              localStorage.setItem("product", JSON.stringify(state.stockProduct));
        }
         
        });

    },
  },

  extraReducers: {
    [getAllProduct.pending]: (state) => {
      state.loading = true;
    },
    [getAllProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.product = action.payload;
      var saveToLocal = true;
      state.product.map((product) => {
        console.log("cds", product.title);
        let stockProduct = {
          title: product.title,
          image: product.image,
          category: product.category,
          id: product.id,
          price: product.price,
          desc: product.description,
          rating: product.rating,
          stock: 20,
        };
        const data = JSON.parse(localStorage.getItem("product") || "[]");
        for (let i = 0; i < data.length; i++) {
          if (stockProduct.title === data[i].title) {
            saveToLocal = false;
            break;
          } else {
            saveToLocal = true;
          }
        }
        if (saveToLocal) {
          localStorage.setItem(
            "product",
            JSON.stringify([...data, stockProduct])
          );
        }
      });
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
  },
});

export const productSelector = (state) => state.product;
export const { checkoutProduct } = productSlice.actions;
export default productSlice.reducer;
