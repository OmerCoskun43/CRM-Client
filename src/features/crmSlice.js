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
};

const crmSlice = createSlice({
  name: "crm",
  initialState,
  reducers: {
    setData: (state, action) => {
      const { entity, data } = action.payload;
      if (state.hasOwnProperty(entity)) {
        state[entity] = data.data;
      }
    },
  },
});

export const { setData } = crmSlice.actions;
export default crmSlice.reducer;
