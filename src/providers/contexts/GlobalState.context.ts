import { createContext } from 'react';
import { GlobalStateAction, GlobalState } from '../../reducers/globalState.reducer';

export interface GlobalStateContext {
  globalState: GlobalState;
  globalDispatch: React.Dispatch<GlobalStateAction>;
}
export const initialGlobalState: GlobalState = {
  user: null,
  isAdmin: false,
  wishlist: [],
  cart: [],
  orders: [],
};

export const GlobalStateContext = createContext({} as GlobalStateContext);
