import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "../../api/api";

const initialState = {
  products: [],
  isLoading: false,
  isSuccess: false,
  error: "",
};

//createAsyncThunk already generates pending, fulfilled and rejected action types
export const fetchProductsList = createAsyncThunk(
  "getAllProducts",
  fetchProducts
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProductsList.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchProductsList.fulfilled]: (state, { payload }) => {
      state.products = payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.error = "";
    },
    [fetchProductsList.rejected]: (state, { payload }) => {
      state.products = [];
      state.isLoading = false;
      state.isSuccess = false;
      state.error = payload;
    },
  },
});

export default productsSlice.reducer;
