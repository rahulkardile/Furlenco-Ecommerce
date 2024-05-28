import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserData } from "../../typeScript/UserTypes";

type UserState = {
  user: UserData | null;
};

const initialState: UserState = {
  user: null,
};

const UserReducer = createSlice({
  name: "User",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});

export default UserReducer.reducer;
export const { addUser, removeUser } = UserReducer.actions;
