import { StateCreator } from "zustand";
import produce from "immer";

export interface IMemoSlice {
  color: string;
  setColor: (value: string) => void;
  text: string;
  setText: (value: string) => void;
  user: User | undefined;
  setUser: (value: User) => void;
  reset: () => void;
}

export interface Memo {
  memo: IMemoSlice;
}

const initialState = {
  color: "",
  text: "",
  user: undefined,
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
  setText: (value: string) => {
    set(
      produce((draft) => {
        draft.memo.text = value;
      })
    );
  },
  setUser: (value: User) => {
    set(
      produce((draft) => {
        draft.memo.user = value;
      })
    );
  },
  reset: () => {
    set(
      produce((draft) => {
        draft.memo.color = "";
        draft.memo.text = "";
      })
    );
  },
});
