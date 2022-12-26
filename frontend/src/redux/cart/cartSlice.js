import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProduct } from "../../api/api";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingDetails: localStorage.getItem("shippingDetails")
    ? JSON.parse(localStorage.getItem("shippingDetails"))
    : null,
  paymentMethod: localStorage.getItem("paymentMethod")
    ? JSON.parse(localStorage.getItem("paymentMethod"))
    : null,
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
    saveShippingDetails: (state, { payload }) => {
      state.shippingDetails = payload;
      localStorage.setItem(
        "shippingDetails",
        JSON.stringify(state.shippingDetails)
      );
    },
    savePaymentMethod: (state, { payload }) => {
      state.paymentMethod = payload;
      localStorage.setItem(
        "paymentMethod",
        JSON.stringify(state.paymentMethod)
      );
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

export const { removeFromCart, saveShippingDetails, savePaymentMethod } =
  cartSlice.actions;
export default cartSlice.reducer;
