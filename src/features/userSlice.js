// src/features/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.data; // Kullanıcı bilgilerini ayarlayın
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload?.refreshToken || null;
    },
    logout: (state) => {
      state.user = null; // Kullanıcı bilgisini sıfırlayın
      state.accessToken = null;
      state.refreshToken = null;
    },
    register(state, action) {
      state.user = action.payload.data;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    refresh(state, action) {
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const { login, logout, register, refresh } = userSlice.actions;
export default userSlice.reducer;
