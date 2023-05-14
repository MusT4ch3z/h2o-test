import { createSlice } from "@reduxjs/toolkit";

interface editModeState {
  editMode: boolean;
}

const initialState: editModeState = {
  editMode: false,
};

export const editModeSlice = createSlice({
  name: "editMode",
  initialState,
  reducers: {
    switchEditMode(state) {
      state.editMode = !state.editMode;
    },
  },
});

export const editModeActions = editModeSlice.actions;
export const editModeReducer = editModeSlice.reducer;
