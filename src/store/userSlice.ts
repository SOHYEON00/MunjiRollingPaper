import { StateCreator } from "zustand";
import produce from "immer";

export interface IUserSlice {
  user: User | undefined;
  setUser: (user: User) => void;
}

export interface IUser {
  user: IUserSlice;
}

const initialState = {
  user: undefined,
};

export interface User {
  name: string;
  image: string;
  id: string;
  created: string;
}

export const userSlice: StateCreator<IUserSlice> = (set) => ({
  ...initialState,
  setUser: (user: User) => {
    console.log("user", user);
    set(
      produce((draft) => {
        draft.userInfo.user = user;
      })
    );
  },
});
