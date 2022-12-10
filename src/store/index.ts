import create, { GetState, SetState, StoreApi } from "zustand";
import { devtools } from "zustand/middleware";
import { IMemoSlice, memoSlice } from "./memoSlice";

export interface IStore {
  memo: IMemoSlice;
}

export const useStore = create(
  devtools<IStore>((set, get, api) => ({
    memo: {
      ...memoSlice(
        set as unknown as SetState<IMemoSlice>,
        get as unknown as GetState<IMemoSlice>,
        api as unknown as StoreApi<IMemoSlice>
      ),
    },
  }))
);

export default useStore;
export const useColor = () => useStore((store: IStore) => store.memo.color);
export const useText = () => useStore((store: IStore) => store.memo.text);
export const useUser = () => useStore((store: IStore) => store.memo.user);
