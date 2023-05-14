import { configureStore } from "@reduxjs/toolkit";
import { usersDataReducer } from "./usersData.slice";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { editModeReducer } from "./editMode.slice";

export const store = configureStore({
  reducer: {
    usersData: usersDataReducer,
    editMode: editModeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
