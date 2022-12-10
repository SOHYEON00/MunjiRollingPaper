import { StateCreator } from "zustand";
import produce from "immer";

export interface IMemoSlice {
  color: string;
  setColor: (value: string) => void;
}

export interface Memo {
  memo: IMemoSlice;
}

const initialState = {
  color: "",
};

export interface User {
  name: string;
  image: string;
  id: string;
  created: string;
}

export const memoSlice: StateCreator<IMemoSlice> = (set) => ({
  ...initialState,
  setColor: (value: string) => {
    set(
      produce((draft) => {
        draft.memo.color = value;
      })
    );
  },
});