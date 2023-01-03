import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpGetOrder } from "../../api/api";

const initialState = {
  order: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: "",
};

export const getOrderDetails = createAsyncThunk("order/details", httpGetOrder);

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {},
  extraReducers: {
    [getOrderDetails.pending]: (state) => {
      state.isLoading = true;
    },
    [getOrderDetails.fulfilled]: (state, { payload }) => {
      state.order = payload;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.errorMessage = "";
    },
    [getOrderDetails.rejected]: (state, { payload }) => {
      state.order = null;
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = payload;
    },
  },
});

export default orderDetailsSlice.reducer;
