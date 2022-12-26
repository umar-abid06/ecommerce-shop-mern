import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../../api/api";

const initialState = {
  userInfo: localStorage.getItem("loggedInUser")
    ? JSON.parse(localStorage.getItem("loggedInUser"))
    : null,
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const userLogin = createAsyncThunk("user/login", login);

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    userLogout: (state, { payload }) => {
      state.userInfo = null;
      localStorage.removeItem("loggedInUser");
      // window.location.href = "/";
    },
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.userInfo = payload;
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";

      localStorage.setItem("loggedInUser", JSON.stringify(state.userInfo));
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.userInfo = null;
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = payload;
    },
  },
});

export const { userLogout } = userAuthSlice.actions;
export default userAuthSlice.reducer;
