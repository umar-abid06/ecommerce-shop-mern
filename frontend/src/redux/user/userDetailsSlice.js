import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserDetails, updateUserProfile } from "../../api/api";

const initialState = {
  user: null,
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const userProfile = createAsyncThunk("user/profile", getUserDetails);
export const userUpdateProfile = createAsyncThunk(
  "user/updateProfile",
  updateUserProfile
);

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {},
  extraReducers: {
    [userProfile.pending]: (state) => {
      state.isLoading = true;
    },
    [userProfile.fulfilled]: (state, { payload }) => {
      state.user = payload;
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
    },
    [userProfile.rejected]: (state, { payload }) => {
      state.user = null;
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    [userUpdateProfile.pending]: (state) => {
      state.isLoading = true;
    },
    [userUpdateProfile.fulfilled]: (state, { payload }) => {
      state.user = payload;
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
    },
    [userUpdateProfile.rejected]: (state, { payload }) => {
      state.user = null;
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = payload;
    },
  },
});

export const { userLogout } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
