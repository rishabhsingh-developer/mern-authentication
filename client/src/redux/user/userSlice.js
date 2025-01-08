import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  err: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.err = false;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.err = action.payload;
    },
    signOut: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.err = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.err = false;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.err = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.err = false;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.err = action.payload;
    },
  },
});
export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signOut,
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,

  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
} = userSlice.actions;
export default userSlice.reducer;
