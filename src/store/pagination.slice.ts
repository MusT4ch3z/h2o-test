import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface paginationState {
  page: number;
  rowsPerPage: number;
}

const initialState: paginationState = {
  page: 1,
  rowsPerPage: 5,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setRowsPerPage(state, action: PayloadAction<number>) {
      console.log(action.payload);
      state.rowsPerPage = action.payload;
    },
  },
});

export const paginationActions = paginationSlice.actions;
export const paginationReducer = paginationSlice.reducer;
