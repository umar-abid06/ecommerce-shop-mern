import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductById } from "../../api/api";

const initialState = {
  product: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

//createAsyncThunk already generates pending, fulfilled and rejected action types

export const fetchSingleProduct = createAsyncThunk(
  "getProductById",
  fetchProductById
);
const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    goBack: (state, action) => {
      state.product = [];
      // window.location.href = action.payload;
    },
  },
  extraReducers: {
    [fetchSingleProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchSingleProduct.fulfilled]: (state, { payload }) => {
      state.product = payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.error = "";
    },
    [fetchSingleProduct.rejected]: (state, { payload }) => {
      state.product = [];
      state.isLoading = false;
      state.isSuccess = false;
      state.error = payload;
    },
  },
});

export const { goBack } = productDetailsSlice.actions;
export default productDetailsSlice.reducer;
