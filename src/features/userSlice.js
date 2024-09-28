// src/features/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.data; // Kullanıcı bilgilerini ayarlayın
      state.token = action.payload.accessToken;
    },
    logout: (state) => {
      state.user = null; // Kullanıcı bilgisini sıfırlayın
      state.token = null;
    },
    register(state, action) {
      state.user = action.payload.data;
      state.token = action.payload.accessToken;
    },
  },
});

export const { login, logout, register } = userSlice.actions;
export default userSlice.reducer;
