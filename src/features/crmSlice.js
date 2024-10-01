/* eslint-disable no-prototype-builtins */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departments: [],
  categories: [],
  products: [],
  customers: [],
  sales: [],
  events: [],
  users: [],
  notes: [],
  reviews: [],
  loading: false,
  error: null,
};

const crmSlice = createSlice({
  name: "crm",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },

    setError: (state) => {
      state.error = true;
      state.loading = false;
    },

    setData: (state, action) => {
      const { entity, data } = action.payload;
      if (state.hasOwnProperty(entity)) {
        state[entity] = data.data;
      }
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setData, setLoading, setError } = crmSlice.actions;
export default crmSlice.reducer;
