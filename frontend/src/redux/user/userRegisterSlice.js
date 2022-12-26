import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signup } from "../../api/api";

const initialState = {
  registeredUser: null,
  isSuccess: false,
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const userSignup = createAsyncThunk("user/signup", signup);

const userRegisterSlice = createSlice({
  name: "userRegister",
  initialState,
  reducers: {},
  extraReducers: {
    [userSignup.pending]: (state) => {
      state.isLoading = true;
    },
    [userSignup.fulfilled]: (state, { payload }) => {
      state.registeredUser = payload;
      state.isSuccess = payload.message;
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";

      //   localStorage.setItem(
      //     "registeredUserEmail",
      //     JSON.stringify(state.registeredUser)
      //   );
    },
    [userSignup.rejected]: (state, { payload }) => {
      state.isSuccess = false;
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = payload;
    },
  },
});

// export const { userLogout } = userRegisterSlice.actions;
export default userRegisterSlice.reducer;
