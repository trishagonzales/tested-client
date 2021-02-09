import { createContext } from 'react';
import { GlobalState, GlobalAction } from '../reducers/global.reducer';

export interface GlobalContext {
  globalState: GlobalState;
  globalDispatch: React.Dispatch<GlobalAction>;
}
export const initialGlobalState: GlobalState = {
  user: null,
  isAdmin: false,
  wishlist: [],
  cart: [],
  orders: [],
};

export const GlobalContext = createContext({} as GlobalContext);
export const GlobalProvider = GlobalContext.Provider;
