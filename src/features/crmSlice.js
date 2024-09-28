import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departments: [],
};

const crmSlice = createSlice({
  name: "crm",
  initialState,
  reducers: {
    setDepartments: (state, action) => {
      state.departments = action.payload.data;
    },
  },
});

export const { setDepartments } = crmSlice.actions;
export default crmSlice.reducer;
