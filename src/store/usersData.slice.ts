import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUserData } from "../types";
import { fakeData } from "../fakeData";

interface userDataState {
  usersData: { [key: number]: IUserData };
  searchValue: null | string;
}

const initialState: userDataState = {
  usersData: Object.fromEntries(fakeData.map((i) => [i.id, i])),
  searchValue: null,
};

export const usersDataSlice = createSlice({
  name: "usersData",
  initialState,
  reducers: {
    removeUser(state, action: PayloadAction<number>) {
      const id = action.payload;
      delete state.usersData[id];
    },
    editUserCell(state, action: PayloadAction<any>) {
      const {
        userInfo: editedUser,
        cellValue,
        cellPathInDictionary,
      } = action.payload;
      state.usersData = {
        ...state.usersData,
        [editedUser.id]: { ...editedUser, [cellPathInDictionary]: cellValue },
      };
    },
    createUser(state, action: PayloadAction<IUserData>) {
      const editedUser = action.payload;
      state.usersData = { ...state.usersData, [editedUser.id]: editedUser };
    },
    setSearchValue(state, action: PayloadAction<string | null>) {
      state.searchValue = action.payload;
    },
  },
});

export const usersDataActions = usersDataSlice.actions;
export const usersDataReducer = usersDataSlice.reducer;
