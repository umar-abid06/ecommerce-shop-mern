import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpCreateOrder } from "../../api/api";

const initialState = {
  order: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: "",
};

export const orderCreate = createAsyncThunk("order/create", httpCreateOrder);

const orderCreateSlice = createSlice({
  name: "orderCreate",
  initialState,
  reducers: {},
  extraReducers: {
    [orderCreate.pending]: (state) => {
      state.isLoading = true;
    },
    [orderCreate.fulfilled]: (state, { payload }) => {
      state.order = payload;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.errorMessage = "";
    },
    [orderCreate.rejected]: (state, { payload }) => {
      state.order = null;
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = payload;
    },
  },
});

export default orderCreateSlice.reducer;
