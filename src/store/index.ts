import create, { GetState, SetState, StoreApi } from "zustand";
import { devtools } from "zustand/middleware";
import { IUserSlice, userSlice } from "./userSlice";

export interface IStore {
  userInfo: IUserSlice;
}

export const useStore = create(
  devtools<IStore>((set, get, api) => ({
    userInfo: {
      ...userSlice(
        set as unknown as SetState<IUserSlice>,
        get as unknown as GetState<IUserSlice>,
        api as unknown as StoreApi<IUserSlice>
      ),
    },
  }))
);

export default useStore;

export const useUser = () => useStore((store: IStore) => store.userInfo.user);
