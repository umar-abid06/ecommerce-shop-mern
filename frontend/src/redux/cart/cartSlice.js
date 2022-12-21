import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProduct } from "../../api";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  isLoading: false,
  isSuccess: false,
  error: "",
};

export const addToCart = createAsyncThunk("addToCart", fetchProduct);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeFromCart: (state, { payload }) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== payload);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
  extraReducers: {
    [addToCart.pending]: (state) => {
      state.isLoading = true;
    },
    [addToCart.fulfilled]: (state, { payload }) => {
      const item = payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);
      console.log(existItem);
      console.log(item);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems.push(item);
      }
      state.isLoading = false;
      state.isSuccess = true;
      state.error = "";

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    [addToCart.rejected]: (state, { payload }) => {
      state.cartItems = [];
      state.isLoading = false;
      state.isSuccess = false;
      state.error = payload;
    },
  },
});

export const { removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
